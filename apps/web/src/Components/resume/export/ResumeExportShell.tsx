import React from "react";

/**
 * A4-sized wrapper for PDF export. Fixed width at 96dpi (~794px).
 * Export-only font sizes, spacing, and alignment so PDF fits one page and looks professional.
 */
const A4_WIDTH_PX = 794;
const A4_PADDING = 24;

const pageBreakStyles = `
  .resume-export-section { break-inside: avoid; page-break-inside: avoid; }
  .resume-export-shell ul, .resume-export-shell li { break-inside: avoid; page-break-inside: avoid; }
`;

/* Force hex/rgb only so html2canvas (no oklch support) can parse */
const exportColorOverrides = `
  .resume-export-shell,
  .resume-export-shell * {
    color: #1e293b !important;
    background-color: transparent !important;
    border-color: #cbd5e1 !important;
    outline-color: #cbd5e1 !important;
    text-decoration-color: #4338ca !important;
    fill: #1e293b !important;
    stroke: #cbd5e1 !important;
  }
  .resume-export-shell { background-color: #ffffff !important; }
  .resume-export-shell h1 { color: #0f172a !important; }
  .resume-export-shell h2 { color: #475569 !important; }
  .resume-export-shell a { color: #4338ca !important; }
  .resume-export-shell .bg-slate-100,
  .resume-export-shell .bg-white { background-color: #f1f5f9 !important; }
  .resume-export-shell .bg-white:first-child { background-color: #ffffff !important; }
`;

/* PDF layout: small resume-appropriate fonts, tight spacing, single-page fit, alignment */
const exportLayoutStyles = `
  .resume-export-shell,
  .resume-export-shell * {
    font-size: 7px !important;
    line-height: 1.3 !important;
    text-align: left !important;
    letter-spacing: normal !important;
    box-sizing: border-box !important;
  }
  .resume-export-shell {
    font-size: 8px !important;
  }
  .resume-export-shell .template-clean,
  .resume-export-shell .template-sidebar {
    font-size: 8px !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
  }
  .resume-export-shell h1 {
    font-size: 11px !important;
    font-weight: 700 !important;
    margin: 0 0 2px 0 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
  }
  .resume-export-shell h2 {
    font-size: 6px !important;
    font-weight: 600 !important;
    margin: 4px 0 2px 0 !important;
    padding: 0 0 1px 0 !important;
    line-height: 1.2 !important;
    letter-spacing: 0.05em !important;
  }
  .resume-export-shell p,
  .resume-export-shell li,
  .resume-export-shell span {
    font-size: 7px !important;
    margin: 0 0 1px 0 !important;
    padding: 0 !important;
    line-height: 1.3 !important;
  }
  .resume-export-shell ul {
    margin: 0 0 3px 0 !important;
    padding-left: 14px !important;
    list-style-type: disc !important;
  }
  .resume-export-shell ul ul {
    margin: 0 !important;
    padding-left: 14px !important;
  }
  .resume-export-shell .resume-export-section {
    margin-bottom: 2px !important;
  }
  .resume-export-shell .space-y-1 > * + * { margin-top: 2px !important; }
  .resume-export-shell .space-y-2 > * + * { margin-top: 3px !important; }
  .resume-export-shell .space-y-3 > * + * { margin-top: 4px !important; }
  .resume-export-shell .space-y-4 > * + * { margin-top: 4px !important; }
  .resume-export-shell .mb-1\\.5 { margin-bottom: 3px !important; }
  .resume-export-shell .mb-2 { margin-bottom: 3px !important; }
  .resume-export-shell .mb-3 { margin-bottom: 4px !important; }
  .resume-export-shell .mb-0\\.5 { margin-bottom: 1px !important; }
  .resume-export-shell .mt-0\\.5 { margin-top: 1px !important; }
  .resume-export-shell .mt-1 { margin-top: 2px !important; }
  .resume-export-shell .ml-2 { margin-left: 8px !important; }
  .resume-export-shell .pb-0\\.5 { padding-bottom: 1px !important; }
  .resume-export-shell .pl-2 { padding-left: 6px !important; }
  .resume-export-shell .pb-3 { padding-bottom: 4px !important; }
  .resume-export-shell .gap-1\\.5 { gap: 3px !important; }
  .resume-export-shell .gap-2 { gap: 4px !important; }
  .resume-export-shell .gap-4 { gap: 6px !important; }
  .resume-export-shell .flex { display: flex !important; }
  .resume-export-shell .flex-wrap { flex-wrap: wrap !important; }
  .resume-export-shell .flex-1 { flex: 1 1 0% !important; }
  .resume-export-shell .min-w-0 { min-width: 0 !important; }
  .resume-export-shell .w-14 { width: 40px !important; }
  .resume-export-shell .h-14 { height: 40px !important; }
  .resume-export-shell .resume-pdf-root {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .resume-export-shell .resume-pdf-root > div {
    margin-bottom: 4px !important;
  }
`;

export default function ResumeExportShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="resume-export-shell bg-white text-slate-900"
      style={{
        width: A4_WIDTH_PX,
        minHeight: 1122,
        padding: A4_PADDING,
        boxSizing: "border-box",
        fontFamily: "Georgia, 'Times New Roman', serif",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontSize: 8,
        lineHeight: 1.3,
      }}
    >
      <style>{pageBreakStyles}</style>
      <style>{exportColorOverrides}</style>
      <style>{exportLayoutStyles}</style>
      {children}
    </div>
  );
}

export { A4_WIDTH_PX, A4_PADDING };
