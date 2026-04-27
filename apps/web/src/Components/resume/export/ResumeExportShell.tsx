import React from "react";

/**
 * Letter-sized (8.5Ã-11) fixed-width container for PDF export.
 * Width 816px at 96dpi. Reduced margins (~30% tighter). Page-break rules only.
 */
export const LETTER_WIDTH_PX = 816;
export const LETTER_PADDING_PX = 22;

const pageBreakStyles = `
  .resume-export-section { break-inside: avoid; page-break-inside: avoid; }
  .resume-export-shell ul, .resume-export-shell li { break-inside: avoid; page-break-inside: avoid; }
  .latex-classic section { break-inside: avoid; page-break-inside: avoid; }
  .latex-classic .resume-export-section { break-inside: avoid; page-break-inside: avoid; }
`;

export default function ResumeExportShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="resume-export-shell bg-white text-black"
      style={{
        width: LETTER_WIDTH_PX,
        minHeight: 1056,
        padding: LETTER_PADDING_PX,
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <style>{pageBreakStyles}</style>
      {children}
    </div>
  );
}

export { LETTER_WIDTH_PX as A4_WIDTH_PX, LETTER_PADDING_PX as A4_PADDING };
