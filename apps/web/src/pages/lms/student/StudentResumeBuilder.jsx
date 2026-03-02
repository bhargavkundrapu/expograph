import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiFileText } from "react-icons/fi";
import ResumeForm from "./resume/ResumeForm";
import TemplatePicker from "./resume/TemplatePicker";
import Review from "./resume/Review";
import DownloadPanel from "./resume/DownloadPanel";
import { INITIAL_DATA, TEMPLATES } from "./resume/resumeConstants";

const STORAGE_KEY_PREFIX = "expograph_resume_draft_";

function getStorageKey(userId) {
  return `${STORAGE_KEY_PREFIX}${userId || "anon"}`;
}

function validateStep1(data) {
  const errors = {};
  if (!(data.fullName || "").trim()) errors.fullName = "Full name is required";
  if (!(data.email || "").trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email";
  return errors;
}

export default function StudentResumeBuilder() {
  const { user, token } = useAuth();
  const { isDark } = useTheme();
  const userId = user?.id ?? user?.userId ?? null;
  const [step, setStep] = useState(1);
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
  const [templateId, setTemplateId] = useState("modern");
  const [formErrors, setFormErrors] = useState({});

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

  const canNextStep1 = () => {
    const errs = validateStep1(data);
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !canNextStep1()) return;
    if (step < 4) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          <FiFileText className="w-7 h-7" /> Resume Builder
        </h1>
        <p className={`mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>Build your resume and download a PDF. Your draft is saved locally.</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s === 1 || (s === 2 && step >= 2) || (s === 3 && step >= 3) || (s === 4 && step >= 4)) {
                  if (s === 1 || (s > 1 && step > s)) setStep(s);
                  else if (s > 1 && step === s) setStep(s);
                }
              }}
              className={`px-4 py-2 rounded-xl font-medium ${
                step === s ? "bg-indigo-600 text-white" : isDark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
              }`}
            >
              {s === 1 && "Form"}
              {s === 2 && "Template"}
              {s === 3 && "Review"}
              {s === 4 && "Download"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`rounded-2xl border shadow-sm p-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <ResumeForm data={data} onChange={setData} errors={formErrors} />
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700"
                >
                  Next: Choose template <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`rounded-2xl border shadow-sm p-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>Choose a template</h2>
              <TemplatePicker selectedId={templateId} onSelect={setTemplateId} />
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`inline-flex items-center gap-2 px-6 py-3 border font-medium rounded-xl ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                >
                  <FiArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700"
                >
                  Next: Review <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`rounded-2xl border shadow-sm p-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>Review</h2>
              <Review data={data} templateId={templateId} templates={TEMPLATES} />
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700"
                >
                  Next: Download <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`rounded-2xl border shadow-sm p-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>Download PDF</h2>
              <DownloadPanel
                templateId={templateId}
                data={data}
                token={token}
              />
              <div className="mt-8 flex justify-start">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back to review
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
