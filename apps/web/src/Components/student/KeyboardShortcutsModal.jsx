import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { SHORTCUTS } from "../../hooks/useKeyboardShortcuts";

export default function KeyboardShortcutsModal({ open, onClose, context = "global" }) {
  const filtered = SHORTCUTS.filter(s => !s.context || s.context === context || context === "all");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {filtered.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex items-center justify-between py-2.5 px-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">{shortcut.label}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.split("+").map((key, i) => (
                      <span key={i}>
                        {i > 0 && <span className="text-slate-400 text-xs mx-0.5">+</span>}
                        <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-md shadow-sm">
                          {key.trim()}
                        </kbd>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Press <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-600 rounded border border-slate-300 dark:border-slate-500">?</kbd> anytime to show this help
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
