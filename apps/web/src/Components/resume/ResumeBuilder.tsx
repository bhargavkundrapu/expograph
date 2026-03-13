import React, { useRef, useCallback } from "react";
import ResumeForm from "../../pages/lms/student/resume/ResumeForm";
import { INITIAL_DATA } from "../../pages/lms/student/resume/resumeConstants";
import ResumeTemplate from "./templates/ResumeTemplate";
import { useResumePdfExport } from "./export/useResumePdfExport";
import type { ResumeData } from "./types";
import { FiDownload } from "react-icons/fi";

function normalizeData(raw: Record<string, unknown>): ResumeData {
  return {
    fullName: String(raw?.fullName ?? ""),
    professionalTitle: raw?.professionalTitle != null ? String(raw.professionalTitle) : undefined,
    email: String(raw?.email ?? ""),
    phone: raw?.phone != null ? String(raw.phone) : undefined,
    location: raw?.location != null ? String(raw.location) : undefined,
    linkedinUrl: raw?.linkedinUrl != null ? String(raw.linkedinUrl) : undefined,
    githubUrl: raw?.githubUrl != null ? String(raw.githubUrl) : undefined,
    portfolioUrl: raw?.portfolioUrl != null ? String(raw.portfolioUrl) : undefined,
    profilePhotoUrl: raw?.profilePhotoUrl != null ? String(raw.profilePhotoUrl) : undefined,
    summary: raw?.summary != null ? String(raw.summary) : undefined,
    skills: Array.isArray(raw?.skills) ? raw.skills : [],
    education: Array.isArray(raw?.education) ? raw.education as ResumeData["education"] : [],
    experience: Array.isArray(raw?.experience) ? raw.experience as ResumeData["experience"] : [],
    projects: Array.isArray(raw?.projects) ? raw.projects as ResumeData["projects"] : [],
    certifications: Array.isArray(raw?.certifications) ? raw.certifications as ResumeData["certifications"] : [],
    achievements: Array.isArray(raw?.achievements) ? (raw.achievements as string[]) : [],
  };
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-\s]/g, "").replace(/\s+/g, "_") || "Resume";
}

interface ResumeBuilderProps {
  data?: Record<string, unknown>;
  onChange?: (data: Record<string, unknown>) => void;
  templateId?: string;
  onTemplateIdChange?: (id: string) => void;
}

export default function ResumeBuilder({
  data: controlledData,
  onChange: controlledOnChange,
}: ResumeBuilderProps = {}) {
  const [internalData, setInternalData] = React.useState<Record<string, unknown>>(() => ({ ...INITIAL_DATA }));
  const isControlled = controlledData !== undefined && controlledOnChange !== undefined;
  const data = isControlled ? controlledData! : internalData;
  const setData = isControlled ? controlledOnChange! : setInternalData;

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const templateRef = useRef<HTMLDivElement>(null);
  const { generate, isGenerating, error, clearError, printForSelectablePdf } = useResumePdfExport();
  const resumeData = normalizeData(data);

  const handleDownload = useCallback(async () => {
    const fullName = (data.fullName as string) || "Resume";
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `Resume_${sanitizeFileName(fullName)}_${date}.pdf`;
    clearError();
    await generate(templateRef.current, fileName);
  }, [data.fullName, generate, clearError]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-0 relative z-0">
      <div className="lg:w-1/2 lg:min-w-0 overflow-y-auto relative z-0">
        <ResumeForm
          data={data}
          onChange={setData}
          errors={formErrors}
        />
      </div>

      <div className="lg:w-1/2 lg:min-w-0 flex flex-col relative z-0 min-w-0">
        <div className="sticky top-4 min-w-0 flex flex-col gap-4">
          <div className="min-w-0 overflow-auto rounded-lg border border-slate-200 bg-white p-4 max-h-[75vh]">
            <div
              ref={templateRef}
              className="resume-document mx-auto bg-white text-black shadow-sm"
              style={{
                maxWidth: 720,
                padding: "32px 36px",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 8,
                lineHeight: 1.35,
              }}
            >
              <ResumeTemplate data={resumeData} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiDownload className="w-5 h-5" />
              {isGenerating ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              type="button"
              onClick={() => printForSelectablePdf(templateRef.current)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Print (selectable text)
            </button>
            {error && (
              <p className="w-full mt-2 text-red-600 text-sm" role="alert">
                {error}
                <button type="button" onClick={clearError} className="ml-2 underline">
                  Dismiss
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {isGenerating && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 text-white font-medium"
          aria-live="polite"
          role="status"
          aria-label="Generating PDF"
        >
          <span className="bg-slate-800 px-4 py-2 rounded-lg shadow-lg">Generating PDF...</span>
        </div>
      )}
    </div>
  );
}
