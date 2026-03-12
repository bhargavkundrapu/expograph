declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, unknown>;
    jsPDF?: { unit?: string; format?: string; orientation?: string };
    pagebreak?: { mode?: string | string[]; before?: string; after?: string; avoid?: string };
  }
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Promise<unknown>;
  export = html2pdf;
}
