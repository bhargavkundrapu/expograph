import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";

export default function StreakXPBar() {
  const { isDark } = useTheme();
  const { currentStreak, totalXP, currentLevel, nextLevel, levelProgress, weeklyXP, weeklyXPGoal } = useGamification();
  const weeklyPct = Math.min(100, Math.round((weeklyXP / weeklyXPGoal) * 100));

  return (
    <div className={`flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
      {/* Streak */}
      <div className="flex items-center gap-1.5 font-semibold" title={`${currentStreak}-day streak`}>
        <span className="text-base sm:text-lg">🔥</span>
        <span className={isDark ? "text-orange-400" : "text-orange-600"}>{currentStreak}</span>
      </div>

      {/* Level */}
      <div className="flex items-center gap-1.5" title={`Level ${currentLevel.level} — ${currentLevel.title}`}>
        <span className="text-base sm:text-lg">⚡</span>
        <span className="font-semibold">{totalXP.toLocaleString()} XP</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
          Lv.{currentLevel.level}
        </span>
      </div>

      {/* Weekly XP ring */}
      <div className="flex items-center gap-1.5" title={`Weekly: ${weeklyXP}/${weeklyXPGoal} XP`}>
        <div className="relative w-6 h-6 sm:w-7 sm:h-7">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="3" />
            <circle cx="12" cy="12" r="10" fill="none" stroke="#6366f1" strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 10}`}
              strokeDashoffset={`${2 * Math.PI * 10 * (1 - weeklyPct / 100)}`}
              strokeLinecap="round" />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-[8px] font-bold ${isDark ? "text-white" : "text-slate-700"}`}>
            {weeklyPct}
          </span>
        </div>
        <span className="hidden sm:inline text-[11px]">Week</span>
      </div>
    </div>
  );
}
