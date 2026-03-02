import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiX, FiAlertTriangle, FiHeart, FiArrowRight, FiZap } from "react-icons/fi";

const WHATS_NEW = [
  "Achievement badges and XP system to track your growth",
  "Daily challenges with bonus XP rewards",
  "Learning streak system — keep your fire burning!",
  "Share your progress on LinkedIn & Instagram",
  "Course landing pages with roadmap view",
];

export default function IdleReengagement() {
  const { isDark } = useTheme();
  const { daysSinceLastVisit, currentStreak, lastActiveDate } = useGamification();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const [type, setType] = useState(null);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    const dismissedAt = sessionStorage.getItem("idle-dismissed");
    if (dismissedAt === "true") return;

    if (daysSinceLastVisit >= 3) {
      setType("welcome-back");
    } else if (currentStreak > 0 && daysSinceLastVisit >= 1) {
      setType("streak-warning");
    }
  }, [daysSinceLastVisit, currentStreak]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("idle-dismissed", "true");
  };

  if (dismissed || !type) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-xl border overflow-hidden ${
          type === "welcome-back"
            ? isDark ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500/30" : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200"
            : isDark ? "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-500/30" : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
        }`}
      >
        <div className="flex items-start gap-3 px-4 py-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
            type === "welcome-back"
              ? isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              : isDark ? "bg-amber-500/20" : "bg-amber-100"
          }`}>
            {type === "welcome-back" ? (
              <FiHeart className="w-5 h-5 text-indigo-500" />
            ) : (
              <FiAlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {type === "welcome-back" ? (
              <>
                <p className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Welcome back! We missed you 💙
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  You were away for {daysSinceLastVisit} day{daysSinceLastVisit > 1 ? "s" : ""}. Your journey continues here!
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <button
                    onClick={() => navigate("/lms/student/courses")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    <FiArrowRight className="w-3 h-3" /> Continue Learning
                  </button>
                  <button
                    onClick={() => setShowChangelog(!showChangelog)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? "bg-white/10 text-slate-300 hover:bg-white/15" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                  >
                    <FiZap className="w-3 h-3" /> What's new
                  </button>
                </div>
                <AnimatePresence>
                  {showChangelog && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-3 p-3 rounded-lg space-y-1.5 ${isDark ? "bg-slate-800/50" : "bg-white/80"}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Recent updates</p>
                        {WHATS_NEW.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-green-500 text-xs mt-0.5">✓</span>
                            <p className={`text-[11px] ${isDark ? "text-slate-300" : "text-slate-600"}`}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <p className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Your {currentStreak}-day streak is at risk! 🔥
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Complete just one lesson today to keep your streak alive. Don't let it break!
                </p>
                <button
                  onClick={() => navigate("/lms/student/courses")}
                  className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  <FiArrowRight className="w-3 h-3" /> Save my streak
                </button>
              </>
            )}
          </div>
          <button onClick={handleDismiss} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">
            <FiX className={`w-4 h-4 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
