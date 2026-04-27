import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { TOOL_MODAL_CONTENT } from "./launchpadConfig";
import ToolPromptPanel from "./ToolPromptPanel";

export default function FounderToolModal({ toolId, open, onClose, onSaveToProfile }) {
  const content = toolId ? TOOL_MODAL_CONTENT[toolId] : null;
  const aiSectionRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !toolId) return;
    const t = setTimeout(() => {
      aiSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 180);
    return () => clearTimeout(t);
  }, [open, toolId]);

  return (
    <AnimatePresence>
      {open && content && (
        <>
          <motion.button
            type="button"
            aria-label="Close tool"
            className="fixed inset-0 z-[85] bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="founder-tool-title"
            className="fixed z-[95] left-3 right-3 sm:left-4 sm:right-4 top-[max(0.75rem,env(safe-area-inset-top))] sm:top-[8vh] max-h-[min(88dvh,720px)] sm:max-h-[88vh] overflow-hidden flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl w-auto max-w-[calc(100vw-1.5rem)] sm:max-w-none md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg touch-manipulation"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/90 shrink-0">
              <p id="founder-tool-title" className="text-lg font-semibold text-slate-900 pr-2">
                {content.title}
              </p>
              <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200/80 text-slate-600 shrink-0" aria-label="Close">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-4 min-h-0 overscroll-y-contain [-webkit-overflow-scrolling:touch]">
              <div>
                <p className="text-sm text-slate-600">{content.description}</p>
                <ul className="mt-3 space-y-2">
                  {content.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-800">
                      <FiCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Work through the checklist in your doc or notes-saving marks this tool as used on your startup profile.
                </p>
              </div>

              <div ref={aiSectionRef} className="pt-1 border-t border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-800 mb-2">AI review prompt</p>
                <ToolPromptPanel toolId={toolId} defaultOpen />
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white flex gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[48px] rounded-xl border border-slate-300 bg-white text-slate-800 font-medium shadow-sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onSaveToProfile}
                className="flex-1 min-h-[48px] rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-md"
              >
                Save to startup profile
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
