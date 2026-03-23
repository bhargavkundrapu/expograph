import { motion } from "framer-motion";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";

export default function WeeklyStreak() {
  const { isDark } = useTheme();
  const { weeklyStreakDays, currentStreak, bestStreak } = useGamification();

  return (
    <div className={`rounded-xl p-4 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          🔥 Learning Streak
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isDark ? "text-orange-400" : "text-orange-600"}`}>
            {currentStreak} days
          </span>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="flex items-center justify-between gap-1 mb-3">
        {weeklyStreakDays.map((day, i) => (
          <motion.div
            key={day.date}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-1"
          >
            <span className={`text-[10px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>{day.label}</span>
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
              day.active
                ? "bg-green-500 text-white shadow-sm shadow-green-500/30"
                : day.date === new Date().toISOString().slice(0, 10)
                  ? isDark ? "border-2 border-dashed border-slate-600 text-slate-500" : "border-2 border-dashed border-slate-300 text-slate-400"
                  : isDark ? "bg-slate-700 text-slate-500" : "bg-slate-100 text-slate-400"
            }`}>
              {day.active ? "✓" : ""}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Streak milestones */}
      <div className="flex items-center gap-2">
        {[7, 30, 100].map(m => (
          <div key={m} className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold ${
            bestStreak >= m
              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
              : isDark ? "bg-slate-700/50 text-slate-500" : "bg-slate-50 text-slate-400"
          }`}>
            {bestStreak >= m ? "🏆" : "🔒"} {m}d
          </div>
        ))}
        <span className={`ml-auto text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Best: {bestStreak}d</span>
      </div>
    </div>
  );
}
