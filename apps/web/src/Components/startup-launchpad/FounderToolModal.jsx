import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { TOOL_MODAL_CONTENT } from "./launchpadConfig";

export default function FounderToolModal({ toolId, open, onClose, onSaveToProfile }) {
  const content = toolId ? TOOL_MODAL_CONTENT[toolId] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
            className="fixed z-[95] left-4 right-4 top-[10vh] max-h-[80vh] overflow-hidden flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/90">
              <p id="founder-tool-title" className="text-lg font-semibold text-slate-900 pr-2">
                {content.title}
              </p>
              <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200/80 text-slate-600 shrink-0" aria-label="Close">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              <p className="text-sm text-slate-600">{content.description}</p>
              <ul className="space-y-2">
                {content.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-800">
                    <FiCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500">Work through this in your notebook or doc—saving marks the tool as used on your startup profile.</p>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white flex gap-2">
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
