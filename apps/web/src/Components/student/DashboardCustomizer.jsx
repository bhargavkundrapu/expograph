import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEye, FiEyeOff, FiChevronUp, FiChevronDown, FiRefreshCw, FiSliders } from "react-icons/fi";
import { useDashboardPrefs } from "../../app/providers/DashboardPrefsProvider";
import { useTheme, ACCENT_COLORS } from "../../app/providers/ThemeProvider";

export default function DashboardCustomizer({ open, onClose }) {
  const { allWidgets, toggleWidget, reorderWidgets, resetToDefaults } = useDashboardPrefs();
  const widgets = allWidgets;
  const { accent, setAccent, accentColors } = useTheme();
  const [activeTab, setActiveTab] = useState("widgets");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[85vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <FiSliders className="w-5 h-5 text-slate-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customize Dashboard</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-700">
              {[
                { id: "widgets", label: "Widgets" },
                { id: "accent", label: "Accent Color" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? ""
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                  style={activeTab === tab.id ? { color: accent.value } : undefined}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="customizer-tab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: accent.value }} />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {activeTab === "widgets" && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Show, hide, or reorder dashboard sections.</p>
                  {widgets.map((widget, index) => (
                    <div
                      key={widget.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        widget.visible
                          ? "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50"
                          : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => index > 0 && reorderWidgets(index, index - 1)}
                          disabled={index === 0}
                          className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <FiChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => index < widgets.length - 1 && reorderWidgets(index, index + 1)}
                          disabled={index === widgets.length - 1}
                          className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <FiChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{widget.label}</span>
                      <button
                        onClick={() => toggleWidget(widget.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          widget.visible
                            ? "hover:bg-blue-50 dark:hover:bg-blue-500/10"
                            : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600"
                        }`}
                        style={widget.visible ? { color: accent.value } : undefined}
                        title={widget.visible ? "Hide widget" : "Show widget"}
                      >
                        {widget.visible ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={resetToDefaults}
                    className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <FiRefreshCw className="w-3.5 h-3.5" />
                    Reset to defaults
                  </button>
                </div>
              )}

              {activeTab === "accent" && (
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose your preferred accent color for the portal.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {accentColors.map(color => (
                      <button
                        key={color.id}
                        onClick={() => setAccent(color.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                          accent.id === color.id
                            ? "border-current shadow-md"
                            : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                        }`}
                        style={accent.id === color.id ? { borderColor: color.value } : {}}
                      >
                        <div
                          className="w-10 h-10 rounded-full shadow-md transition-transform"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{color.label}</span>
                        {accent.id === color.id && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color.value }}>
                            Active
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
