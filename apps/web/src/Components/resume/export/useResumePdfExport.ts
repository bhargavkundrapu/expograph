import { useCallback, useRef, useState } from "react";

/**
 * Export resume as PDF. Two modes:
 * - Download PDF: image-based (html2canvas), pixel-perfect match to preview.
 * - Print: opens print dialog; "Save as PDF" from print gives selectable text.
 */
const A4_PT = { w: 595.28, h: 841.89 };
const PX_TO_PT = 72 / 96;
/** Page margin on each side (pt). */
const PAGE_MARGIN_PT = 5;

const CAPTURE_CLASS = "resume-pdf-capture";

/** Force black-on-white for PDF so download matches the preview. */
const captureColorOverrides = `
  .${CAPTURE_CLASS} { background-color: #ffffff !important; color: #000000 !important; }
  .${CAPTURE_CLASS} * {
    color: #000000 !important;
    border-color: #000000 !important;
    outline-color: #000000 !important;
    text-decoration-color: #000000 !important;
    fill: #000000 !important;
    stroke: #000000 !important;
  }
  .${CAPTURE_CLASS} *:not(.${CAPTURE_CLASS}) { background-color: transparent !important; }
  .${CAPTURE_CLASS} h1, .${CAPTURE_CLASS} h2 { color: #000000 !important; }
  .${CAPTURE_CLASS} a { color: #000000 !important; text-decoration: underline !important; }
`;

function applyCaptureStyles(el: HTMLElement): () => void {
  el.classList.add(CAPTURE_CLASS);
  const origBg = el.style.backgroundColor;
  el.style.backgroundColor = "#ffffff";
  const style = document.createElement("style");
  style.setAttribute("data-resume-pdf-capture", "true");
  style.textContent = captureColorOverrides;
  el.insertBefore(style, el.firstChild);
  return () => {
    const s = el.querySelector("[data-resume-pdf-capture]");
    if (s) s.remove();
    el.classList.remove(CAPTURE_CLASS);
    el.style.backgroundColor = origBg;
  };
}

export interface GenerateResult {
  blobUrl: string;
  fileName: string;
}

export function useResumePdfExport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPdfUrl, setLastPdfUrl] = useState<string | null>(null);
  const generatingRef = useRef(false);

  const generate = useCallback(
    async (element: HTMLElement | null, fileName: string): Promise<GenerateResult | null> => {
      if (!element) {
        setError("Preview not ready. Please try again.");
        return null;
      }
      if (generatingRef.current) return null;
      generatingRef.current = true;
      setIsGenerating(true);
      setError(null);
      setLastPdfUrl(null);

      const removeCaptureStyles = applyCaptureStyles(element);

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const elRect = element.getBoundingClientRect();
      const links: { url: string; left: number; top: number; width: number; height: number }[] = [];
      const makeAbsolute = (u: string) => {
        try {
          return new URL(u, document.baseURI || window.location.href).href;
        } catch {
          return u;
        }
      };
      element.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href")?.trim();
        if (!href || href.startsWith("#")) return;
        const url = makeAbsolute(href);
        const r = a.getBoundingClientRect();
        const relLeft = r.left - elRect.left;
        const relTop = r.top - elRect.top;
        if (r.width <= 0 || r.height <= 0) return;
        links.push({
          url,
          left: relLeft,
          top: relTop,
          width: r.width,
          height: r.height,
        });
      });

      try {
        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone(clonedDoc, clonedEl) {
            const style = clonedDoc.createElement("style");
            style.setAttribute("data-pdf-oklch-fix", "true");
            style.textContent = captureColorOverrides;
            clonedEl.insertBefore(style, clonedEl.firstChild);
            const root = clonedDoc.documentElement;
            const body = clonedDoc.body;
            if (root) root.style.backgroundColor = "#ffffff";
            if (body) body.style.backgroundColor = "#ffffff";
          },
        });

        const cw = canvas.width;
        const ch = canvas.height;
        const wPt = (cw / 2) * PX_TO_PT;
        const hPt = (ch / 2) * PX_TO_PT;
        const pageContentW = A4_PT.w - 2 * PAGE_MARGIN_PT;
        const pageContentH = A4_PT.h - 2 * PAGE_MARGIN_PT;
        // Fixed scale by width only: content always same width and starts at fixed top
        const scale = pageContentW / wPt;
        const imgW = wPt * scale;
        const imgH = hPt * scale;
        const x = PAGE_MARGIN_PT;
        const y = PAGE_MARGIN_PT;

        const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
        const elW = elRect.width;
        const elH = elRect.height;

        if (imgH <= pageContentH) {
          // Single page: draw full content at fixed position
          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(imgData, "JPEG", x, y, imgW, imgH);
          links.forEach(({ url, left, top, width, height }) => {
            const px = (left / elW) * imgW + x;
            const py = (top / elH) * imgH + y;
            const pw = (width / elW) * imgW;
            const ph = (height / elH) * imgH;
            try {
              pdf.link(px, py, pw, ph, { url });
            } catch (_) {}
          });
        } else {
          // Multi-page: slice content into page-height strips; fixed top on every page
          const numPages = Math.ceil(imgH / pageContentH);
          for (let i = 0; i < numPages; i++) {
            if (i > 0) pdf.addPage();
            const srcYPt = i * pageContentH;
            const srcHeightPt = Math.min(pageContentH, imgH - srcYPt);
            const srcYPx = (srcYPt / imgH) * ch;
            const srcHeightPx = (srcHeightPt / imgH) * ch;

            const stripCanvas = document.createElement("canvas");
            stripCanvas.width = cw;
            stripCanvas.height = Math.ceil(srcHeightPx);
            const ctx = stripCanvas.getContext("2d");
            if (ctx) {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);
              ctx.drawImage(canvas, 0, srcYPx, cw, srcHeightPx, 0, 0, cw, srcHeightPx);
            }
            const stripData = stripCanvas.toDataURL("image/jpeg", 0.95);
            pdf.addImage(stripData, "JPEG", x, y, imgW, srcHeightPt);
          }

          // Link mapping across pages
          links.forEach(({ url, left, top, width, height }) => {
            const linkX = (left / elW) * imgW + x;
            const linkYInContent = (top / elH) * imgH;
            const linkW = (width / elW) * imgW;
            const linkH = (height / elH) * imgH;
            const pageIndex = Math.floor(linkYInContent / pageContentH);
            const pyOnPage = linkYInContent - pageIndex * pageContentH + y;
            try {
              pdf.setPage(pageIndex + 1);
              pdf.link(linkX, pyOnPage, linkW, linkH, { url });
            } catch (_) {}
          });
          pdf.setPage(1);
        }

        pdf.save(fileName);
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        setLastPdfUrl(blobUrl);
        return { blobUrl, fileName };
      } catch (err) {
        const message = err instanceof Error ? err.message : "PDF generation failed.";
        setError(message);
        return null;
      } finally {
        try {
          removeCaptureStyles();
        } catch (_) {}
        generatingRef.current = false;
        setIsGenerating(false);
      }
      return null;
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  const revokeLastPdfUrl = useCallback(() => {
    if (lastPdfUrl) {
      URL.revokeObjectURL(lastPdfUrl);
      setLastPdfUrl(null);
    }
  }, [lastPdfUrl]);

  /**
   * Open the resume in a new window and trigger print. User can choose
   * "Save as PDF" in the print dialog to get a PDF with selectable text.
   */
  const printForSelectablePdf = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    const win = window.open("", "_blank");
    if (!win) {
      setError("Please allow pop-ups to print the resume.");
      return;
    }
    const styleStr =
      "body{margin:0;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:1.35;} " +
      ".resume-print-wrap{max-width:720px;margin:0 auto;padding:32px 36px;box-sizing:border-box;}";
    win.document.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume</title><style>${styleStr}</style></head><body class="resume-print-wrap">${element.innerHTML}</body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.onafterprint = () => win.close();
    }, 300);
  }, []);

  return { generate, isGenerating, error, clearError, lastPdfUrl, revokeLastPdfUrl, printForSelectablePdf };
}
