import React from "react";
import TemplateClean from "./templates/TemplateClean";
import type { ResumeData } from "./types";

/** A4 at 96dpi — same size as PDF capture so preview and download match exactly. */
const A4_PX = { w: 794, h: 1123 };

export interface ResumePreviewProps {
  data: ResumeData;
  paperRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Simple preview: white A4 paper with the same font and padding as the template.
 * What you see here is exactly what you get in the downloaded PDF.
 */
export default function ResumePreview({ data, paperRef }: ResumePreviewProps) {
  return (
    <div className="resume-preview-root flex flex-col min-w-0 flex-1">
      <p className="text-sm font-medium text-slate-600 mb-2 px-0.5">Preview</p>
      <div className="min-w-0 overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-3 max-h-[70vh] flex justify-center">
        <div
          ref={paperRef}
          className="resume-preview-paper flex-shrink-0 shadow-md"
          style={{
            width: A4_PX.w,
            minWidth: A4_PX.w,
            height: A4_PX.h,
            minHeight: A4_PX.h,
            boxSizing: "border-box",
            overflow: "hidden",
            padding: "20px 24px",
            backgroundColor: "#ffffff",
            color: "#000000",
            fontFamily: "'Times New Roman', Times, Georgia, serif",
            fontSize: 11,
            lineHeight: 1.4,
          }}
        >
          <TemplateClean data={data} forExport={false} />
        </div>
      </div>
    </div>
  );
}
