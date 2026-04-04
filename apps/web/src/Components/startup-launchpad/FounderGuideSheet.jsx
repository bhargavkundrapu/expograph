import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FOUNDER_GUIDE_PROMPTS, GUIDE_RESPONSES } from "./launchpadConfig";
import { useLaunchPad } from "./LaunchPadContext";

export default function FounderGuideSheet({ open, onClose }) {
  const { updateProfile } = useLaunchPad();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setMessages([]);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const onPickPrompt = (p) => {
    const reply =
      GUIDE_RESPONSES[p] ||
      "Thanks for your question. Narrow it to one decision this week—then take one small action to reduce uncertainty.";
    setMessages((prev) => [...prev, { role: "user", text: p }, { role: "assistant", text: reply }]);
    updateProfile({ lastGuidePrompt: p });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close founder guide"
            className="fixed inset-0 z-[80] bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="founder-guide-title"
            className="fixed z-[90] inset-x-0 bottom-0 md:inset-auto md:right-4 md:top-24 md:w-[400px] md:max-h-[calc(100vh-6rem)] max-h-[85vh] rounded-t-3xl md:rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/80 rounded-t-3xl md:rounded-t-2xl">
              <div>
                <p id="founder-guide-title" className="text-lg font-semibold text-slate-900">
                  Founder Guide
                </p>
                <p className="text-xs text-slate-500">Decision support for your next move</p>
              </div>
              <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200/80 text-slate-600" aria-label="Close">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 space-y-3 min-h-[200px]">
              {messages.length === 0 && <p className="text-sm text-slate-600">Tap a prompt to see guidance here—no page reload needed.</p>}
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={`rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-6 bg-violet-100 text-violet-950 border border-violet-200"
                      : "mr-4 bg-slate-50 text-slate-800 border border-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 space-y-3 bg-white rounded-b-3xl md:rounded-b-2xl">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Try a prompt</p>
              <div className="flex flex-wrap gap-2">
                {FOUNDER_GUIDE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onPickPrompt(p)}
                    className="text-left text-sm px-3 py-2 rounded-xl border border-violet-200 bg-violet-50 text-violet-900 hover:bg-violet-100 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Replies are built-in for this release. Your last prompt is saved to your startup profile for continuity.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
