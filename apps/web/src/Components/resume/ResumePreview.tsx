import React from "react";
import LatexClassic from "./templates/LatexClassic";
import type { ResumeData } from "./types";
import { LETTER_WIDTH_PX } from "./export/ResumeExportShell";

export interface ResumePreviewProps {
  data: ResumeData;
  paperRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Letter-sized preview. Same width as PDF export so what you see matches download.
 */
export default function ResumePreview({ data, paperRef }: ResumePreviewProps) {
  return (
    <div className="resume-preview-root flex flex-col min-w-0 flex-1">
      <p className="text-sm font-medium text-slate-600 mb-2 px-0.5">Preview</p>
      <div className="min-w-0 overflow-auto rounded-lg border border-slate-200 bg-slate-100 p-3 max-h-[70vh] flex justify-center">
        <div
          ref={paperRef}
          className="resume-preview-paper flex-shrink-0 shadow-md bg-white text-black"
          style={{
            width: LETTER_WIDTH_PX,
            minWidth: LETTER_WIDTH_PX,
            boxSizing: "border-box",
            overflow: "hidden",
            padding: 22,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 11,
            lineHeight: 1.35,
          }}
        >
          <LatexClassic data={data} />
        </div>
      </div>
    </div>
  );
}
