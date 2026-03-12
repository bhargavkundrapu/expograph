import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiFileText } from "react-icons/fi";
import ResumeBuilder from "../../../Components/resume/ResumeBuilder";
import { INITIAL_DATA } from "./resume/resumeConstants";

const STORAGE_KEY_PREFIX = "expograph_resume_draft_";

function getStorageKey(userId) {
  return `${STORAGE_KEY_PREFIX}${userId || "anon"}`;
}

export default function StudentResumeBuilder() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const userId = user?.id ?? user?.userId ?? null;
  const [data, setData] = useState(() => {
    const key = getStorageKey(userId);
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...INITIAL_DATA, ...parsed };
      }
    } catch (e) {
      console.error("Resume draft load error:", e);
    }
    return {
      ...INITIAL_DATA,
      fullName: (user?.full_name || user?.fullName || user?.name || "").trim(),
      email: (user?.email || "").trim(),
    };
  });

  const storageKey = getStorageKey(userId);
  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Resume draft save error:", e);
    }
  }, [data, storageKey]);

  useEffect(() => {
    saveDraft();
  }, [data, saveDraft]);

  const templateId = data.templateId || "clean";
  const handleTemplateIdChange = (id) => {
    setData((prev) => ({ ...prev, templateId: id }));
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 lg:rounded-tl-lg overflow-auto transition-colors duration-200 ${
        isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          <FiFileText className="w-7 h-7" /> Resume Builder
        </h1>
        <p className={`mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          Build your resume and download a PDF. Your draft is saved locally.
        </p>

        <ResumeBuilder
          data={data}
          onChange={setData}
          templateId={templateId}
          onTemplateIdChange={handleTemplateIdChange}
        />
      </div>
    </div>
  );
}
