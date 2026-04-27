import { motion } from "framer-motion";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiCheckCircle, FiLock, FiPlay } from "react-icons/fi";

export default function LearningPath({ modules = [], courseSlug, onNavigate }) {
  const { isDark } = useTheme();

  if (modules.length === 0) return null;

  const flatLessons = [];
  modules.forEach((mod, mi) => {
    (mod.lessons || []).forEach((lesson, li) => {
      flatLessons.push({
        ...lesson,
        moduleSlug: mod.slug,
        moduleTitle: mod.title || mod.name || `Module ${mi + 1}`,
        isFirst: li === 0,
        moduleIndex: mi,
      });
    });
  });

  const currentIndex = flatLessons.findIndex(l => !l.completed);
  const totalDone = flatLessons.filter(l => l.completed).length;

  return (
    <div className={`rounded-2xl border p-4 sm:p-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          ðŸ-ºï¸ Learning Journey
        </h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDark ? "bg-green-500/15 text-green-400" : "bg-green-50 text-green-600"}`}>
          {totalDone}/{flatLessons.length} done
        </span>
      </div>

      <div className="relative">
        {/* Path line */}
        <div className={`absolute left-5 top-0 bottom-0 w-0.5 ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
        {totalDone > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${Math.min(100, (totalDone / flatLessons.length) * 100)}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500 z-10"
          />
        )}

        <div className="space-y-1 max-h-[350px] overflow-y-auto pr-2">
          {flatLessons.map((lesson, i) => {
            const isCurrent = i === currentIndex;
            const isDone = lesson.completed;
            const isLocked = !isDone && i > currentIndex + 1;

            return (
              <div key={lesson.id || i}>
                {/* Module divider */}
                {lesson.isFirst && (
                  <div className="flex items-center gap-2 pl-10 py-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {lesson.moduleTitle}
                    </span>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => {
                    if (!isLocked && onNavigate) {
                      onNavigate(courseSlug, lesson.moduleSlug, lesson.slug);
                    }
                  }}
                  className={`relative flex items-center gap-3 py-2 pl-2 pr-3 rounded-lg transition-all ${
                    isLocked
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer " + (isCurrent ? isDark ? "bg-indigo-500/10" : "bg-indigo-50" : isDark ? "hover:bg-slate-700/30" : "hover:bg-slate-50")
                  }`}
                >
                  {/* Node */}
                  <div className={`relative z-20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    isDone
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                        ? "bg-indigo-500 border-indigo-500 text-white animate-pulse"
                        : isLocked
                          ? isDark ? "bg-slate-700 border-slate-600 text-slate-500" : "bg-slate-100 border-slate-300 text-slate-400"
                          : isDark ? "bg-slate-700 border-slate-500 text-slate-300" : "bg-white border-slate-300 text-slate-500"
                  }`}>
                    {isDone ? <FiCheckCircle className="w-3 h-3" /> : isCurrent ? <FiPlay className="w-3 h-3" /> : isLocked ? <FiLock className="w-2.5 h-2.5" /> : <span className="text-[8px] font-bold">{i + 1}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${
                      isDone ? isDark ? "text-green-400" : "text-green-700"
                        : isCurrent ? isDark ? "text-indigo-300" : "text-indigo-700"
                          : isDark ? "text-slate-300" : "text-slate-700"
                    }`}>
                      {lesson.title || lesson.name || `Lesson ${i + 1}`}
                    </p>
                  </div>

                  {isCurrent && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-600"}`}>
                      YOU
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
