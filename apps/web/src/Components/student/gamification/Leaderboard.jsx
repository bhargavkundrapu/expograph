import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useGamification, LEVELS } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FiSearch } from "react-icons/fi";
import { apiFetch } from "../../../services/api";

const MEDAL = ["🥇", "🥈", "🥉"];
const XP_PER_LESSON = 50;
const AVATAR_COLORS = [
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-emerald-500",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-violet-500",
  "from-teal-500 to-cyan-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-slate-500 to-slate-600",
  "from-lime-500 to-green-500",
  "from-cyan-500 to-blue-500",
  "from-fuchsia-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-teal-500",
];

function getLevel(xp) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) lvl = l;
  }
  return lvl;
}

export default function Leaderboard() {
  const { isDark } = useTheme();
  const { totalXP, currentStreak, lessonsCompleted } = useGamification();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiFetch("/api/v1/lms/leaderboard")
      .then((res) => {
        if (cancelled) return;
        const data = res?.data;
        setServerList(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load leaderboard");
        setServerList([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const userName = user?.fullName || user?.full_name || user?.name || "You";
  const userId = user?.id || user?.sub;
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  const fullBoard = useMemo(() => {
    const others = serverList.map((row, i) => ({
      id: row.id,
      name: row.full_name || row.fullName || "Student",
      xp: (row.completed_lessons || 0) * XP_PER_LESSON,
      streak: 0,
      lessons: row.completed_lessons || 0,
      avatar: (row.full_name || row.fullName || "?")[0].toUpperCase(),
      isMe: false,
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    }));

    const meFromServer = others.find((e) => e.id === userId);
    const me = {
      id: "me",
      name: userName,
      xp: totalXP,
      streak: currentStreak,
      lessons: lessonsCompleted,
      avatar: initial,
      isMe: true,
      color: "from-indigo-500 to-purple-600",
    };

    const withoutMe = others.filter((e) => e.id !== userId);
    const combined = [...withoutMe, me];
    return combined.sort((a, b) => b.xp - a.xp);
  }, [serverList, userId, userName, initial, totalXP, currentStreak, lessonsCompleted]);

  const filtered = useMemo(() => {
    if (!search.trim()) return fullBoard;
    const q = search.toLowerCase();
    return fullBoard.filter((e) => e.name.toLowerCase().includes(q));
  }, [fullBoard, search]);

  const myRank = fullBoard.findIndex((e) => e.isMe) + 1;
  const totalLearners = fullBoard.length;

  if (error) {
    return (
      <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
        <div className="px-4 py-3 border-b border-slate-700">
          <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>🏆 Leaderboard</h3>
        </div>
        <div className={`px-4 py-6 text-center text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <div className={`px-4 py-3 flex items-center justify-between border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>🏆 Leaderboard</h3>
      </div>

      <div className={`px-3 py-2 border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-slate-50"}`}>
          <FiSearch className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className={`w-full text-xs bg-transparent border-none outline-none ${isDark ? "text-white placeholder-slate-500" : "text-slate-800 placeholder-slate-400"}`}
          />
        </div>
      </div>

      {myRank > 0 && !search && (
        <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between ${isDark ? "bg-indigo-500/10 text-indigo-300 border-b border-slate-700" : "bg-indigo-50 text-indigo-700 border-b border-slate-100"}`}>
          <span>Your rank: <strong>#{myRank}</strong> of {totalLearners} learner{totalLearners !== 1 ? "s" : ""}</span>
          {myRank <= 3 && <span>🎉 Top 3!</span>}
        </div>
      )}

      <div className="max-h-[300px] overflow-y-auto">
        {loading ? (
          <p className={`text-center py-6 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Loading leaderboard...</p>
        ) : filtered.length === 0 ? (
          <p className={`text-center py-6 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>No students found</p>
        ) : (
          filtered.map((entry, i) => {
            const globalRank = fullBoard.findIndex((e) => e.id === entry.id) + 1;
            const lvl = getLevel(entry.xp);
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-2.5 px-4 py-2.5 transition-colors ${
                  entry.isMe
                    ? isDark ? "bg-indigo-500/10" : "bg-indigo-50/80"
                    : isDark ? "hover:bg-slate-700/50" : "hover:bg-slate-50"
                } ${i < filtered.length - 1 ? (isDark ? "border-b border-slate-700/50" : "border-b border-slate-50") : ""}`}
              >
                <span className="w-6 text-center text-xs font-bold flex-shrink-0">
                  {globalRank <= 3 ? MEDAL[globalRank - 1] : <span className={isDark ? "text-slate-500" : "text-slate-400"}>#{globalRank}</span>}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 bg-gradient-to-br ${entry.color}`}>
                  {entry.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${entry.isMe ? (isDark ? "text-indigo-300" : "text-indigo-700") : isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {entry.name} {entry.isMe && "(You)"}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Lv.{lvl.level}</span>
                    <span className={`text-[9px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>🔥{entry.streak}d</span>
                    <span className={`text-[9px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>📚{entry.lessons}</span>
                  </div>
                </div>
                <span className={`text-xs font-bold whitespace-nowrap ${isDark ? "text-slate-400" : "text-slate-500"}`}>{entry.xp.toLocaleString()} XP</span>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
