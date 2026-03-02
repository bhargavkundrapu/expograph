import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification, ACHIEVEMENT_DEFS } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiX, FiAward } from "react-icons/fi";

const RARITY_STYLES = {
  common: { bg: "bg-slate-100 dark:bg-slate-700/50", border: "border-slate-300 dark:border-slate-600", glow: "", label: "Common", color: "text-slate-500", labelBg: "bg-slate-200 dark:bg-slate-600" },
  rare: { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-400 dark:border-blue-500/60", glow: "shadow-blue-500/15 shadow-md", label: "Rare", color: "text-blue-600 dark:text-blue-400", labelBg: "bg-blue-100 dark:bg-blue-500/20" },
  epic: { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-400 dark:border-purple-500/60", glow: "shadow-purple-500/20 shadow-lg", label: "Epic", color: "text-purple-600 dark:text-purple-400", labelBg: "bg-purple-100 dark:bg-purple-500/20" },
  legendary: { bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-400 dark:border-amber-500/60", glow: "shadow-amber-500/25 shadow-xl", label: "Legendary", color: "text-amber-600 dark:text-amber-400", labelBg: "bg-amber-100 dark:bg-amber-500/20" },
};

export function AchievementGrid({ maxShow = 8 }) {
  const { isDark } = useTheme();
  const { unlockedAchievements } = useGamification();
  const [showAll, setShowAll] = useState(false);

  const allBadges = ACHIEVEMENT_DEFS.map(a => ({
    ...a,
    unlocked: unlockedAchievements.includes(a.id),
  }));

  const unlocked = allBadges.filter(b => b.unlocked);
  const locked = allBadges.filter(b => !b.unlocked);
  const sorted = [...unlocked, ...locked];
  const displayed = showAll ? sorted : sorted.slice(0, maxShow);

  return (
    <div className={`rounded-xl border p-4 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
          <FiAward className="w-4 h-4 text-amber-500" /> Achievements
        </h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDark ? "bg-indigo-500/15 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>
          {unlockedAchievements.length}/{ACHIEVEMENT_DEFS.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {displayed.map((badge, i) => {
          const style = RARITY_STYLES[badge.rarity] || RARITY_STYLES.common;
          return (
            <motion.div
              key={badge.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`relative flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                badge.unlocked
                  ? `${style.border} ${style.glow} ${style.bg}`
                  : isDark ? "border-slate-700/50 bg-slate-700/20 opacity-50" : "border-slate-200/70 bg-slate-50/50 opacity-50"
              }`}
              title={badge.desc}
            >
              <span className="text-xl flex-shrink-0">{badge.unlocked ? badge.icon : "🔒"}</span>
              <div className="min-w-0 flex-1">
                <p className={`text-[11px] font-bold leading-tight truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                  {badge.title}
                </p>
                <p className={`text-[9px] leading-tight truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {badge.desc}
                </p>
                {badge.unlocked && (
                  <span className={`inline-block text-[8px] font-bold mt-0.5 px-1.5 py-0.5 rounded ${style.labelBg} ${style.color}`}>
                    {style.label}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {ACHIEVEMENT_DEFS.length > maxShow && (
        <button
          onClick={() => setShowAll(!showAll)}
          className={`mt-3 text-xs font-semibold w-full text-center py-2 rounded-lg transition-colors ${isDark ? "text-indigo-400 hover:bg-slate-700" : "text-indigo-600 hover:bg-indigo-50"}`}
        >
          {showAll ? "Show less" : `View all ${ACHIEVEMENT_DEFS.length} badges →`}
        </button>
      )}
    </div>
  );
}

export function AchievementToast() {
  const { isDark } = useTheme();
  const { newAchievements, clearNewAchievements } = useGamification();

  if (!newAchievements || newAchievements.length === 0) return null;

  const badge = ACHIEVEMENT_DEFS.find(a => a.id === newAchievements[0]);
  if (!badge) return null;
  const style = RARITY_STYLES[badge.rarity] || RARITY_STYLES.common;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl border-2 shadow-2xl backdrop-blur-md ${
          isDark ? "bg-slate-800/95 border-amber-500/50" : "bg-white/95 border-amber-400/50"
        }`}
      >
        <div className="text-3xl">{badge.icon}</div>
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${style.color}`}>Achievement Unlocked!</p>
          <p className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{badge.title}</p>
          <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{badge.desc}</p>
        </div>
        <button onClick={clearNewAchievements} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 ml-2">
          <FiX className="w-4 h-4 text-slate-400" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
