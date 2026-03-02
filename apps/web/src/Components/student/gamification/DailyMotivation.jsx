import { motion } from "framer-motion";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiTarget, FiArrowRight } from "react-icons/fi";

export default function DailyMotivation({ userName, onGoToLesson }) {
  const { isDark } = useTheme();
  const { greeting, todayQuote, currentStreak } = useGamification();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl overflow-hidden ${isDark ? "bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-blue-600/20 border border-indigo-500/20" : "bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100"}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className={`text-lg sm:text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              {greeting}, {userName} 👋
            </h2>
            <p className={`text-xs sm:text-sm italic leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              "{todayQuote.text}" — <span className="font-medium">{todayQuote.author}</span>
            </p>
          </div>

          {/* Today's Goal — clickable, navigates to courses */}
          <button
            onClick={onGoToLesson}
            className={`flex-shrink-0 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all group ${
              onGoToLesson
                ? isDark ? "bg-slate-800/80 border border-slate-700 hover:border-indigo-500/50 cursor-pointer" : "bg-white/80 border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer"
                : isDark ? "bg-slate-800/80 border border-slate-700" : "bg-white/80 border border-slate-200"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-amber-500/20" : "bg-amber-100"}`}>
              <FiTarget className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-left">
              <p className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>Today's Goal</p>
              <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>
                Complete 1 lesson {currentStreak > 0 && <span className="text-orange-500">🔥{currentStreak}</span>}
              </p>
            </div>
            {onGoToLesson && (
              <FiArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isDark ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}`} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
