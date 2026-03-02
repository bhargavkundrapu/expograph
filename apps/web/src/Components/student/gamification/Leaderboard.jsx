import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useGamification, LEVELS } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FiSearch } from "react-icons/fi";

const ALL_STUDENTS = [
  { name: "Arjun Kumar", xp: 5240, streak: 24, lessons: 52, color: "from-blue-500 to-cyan-500" },
  { name: "Priya Sharma", xp: 4680, streak: 19, lessons: 46, color: "from-pink-500 to-rose-500" },
  { name: "Rohit Menon", xp: 4350, streak: 16, lessons: 41, color: "from-green-500 to-emerald-500" },
  { name: "Sneha Desai", xp: 3920, streak: 14, lessons: 37, color: "from-amber-500 to-orange-500" },
  { name: "Karthik Reddy", xp: 3550, streak: 11, lessons: 33, color: "from-purple-500 to-violet-500" },
  { name: "Meera Joshi", xp: 3280, streak: 10, lessons: 30, color: "from-teal-500 to-cyan-500" },
  { name: "Arun Nair", xp: 2960, streak: 8, lessons: 27, color: "from-red-500 to-pink-500" },
  { name: "Divya Pillai", xp: 2710, streak: 7, lessons: 24, color: "from-indigo-500 to-blue-500" },
  { name: "Vikram Patel", xp: 2430, streak: 5, lessons: 21, color: "from-slate-500 to-slate-600" },
  { name: "Lakshmi Rao", xp: 2190, streak: 4, lessons: 19, color: "from-lime-500 to-green-500" },
  { name: "Siddharth V.", xp: 1980, streak: 6, lessons: 17, color: "from-cyan-500 to-blue-500" },
  { name: "Ananya Iyer", xp: 1750, streak: 3, lessons: 15, color: "from-fuchsia-500 to-pink-500" },
  { name: "Ravi Krishnan", xp: 1530, streak: 2, lessons: 13, color: "from-orange-500 to-red-500" },
  { name: "Neha Gupta", xp: 1320, streak: 4, lessons: 11, color: "from-violet-500 to-purple-500" },
  { name: "Deepak Singh", xp: 1100, streak: 1, lessons: 9, color: "from-emerald-500 to-teal-500" },
];

const TOTAL_LEARNERS = 156;
const MEDAL = ["🥇", "🥈", "🥉"];

function getLevel(xp) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.minXP) lvl = l; }
  return lvl;
}

export default function Leaderboard() {
  const { isDark } = useTheme();
  const { totalXP, currentStreak, lessonsCompleted } = useGamification();
  const { user } = useAuth();
  const [tab, setTab] = useState("weekly");
  const [search, setSearch] = useState("");
  const seedRef = useRef(null);
  if (!seedRef.current) {
    seedRef.current = ALL_STUDENTS.map(() => 0.85 + Math.random() * 0.3);
  }

  const userName = user?.fullName || user?.full_name || user?.name || "You";
  const initial = userName.charAt(0).toUpperCase();

  const fullBoard = useMemo(() => {
    const multiplier = tab === "monthly" ? 3 : tab === "all-time" ? 8 : 1;
    const me = { id: "me", name: userName, xp: totalXP * multiplier, streak: currentStreak, lessons: lessonsCompleted, avatar: initial, isMe: true, color: "from-indigo-500 to-purple-600" };
    const all = [
      ...ALL_STUDENTS.map((e, i) => ({
        ...e,
        id: `student-${i}`,
        xp: Math.round(e.xp * multiplier * seedRef.current[i]),
        avatar: e.name.charAt(0),
      })),
      me,
    ];
    return all.sort((a, b) => b.xp - a.xp);
  }, [totalXP, userName, initial, tab, currentStreak, lessonsCompleted]);

  const filtered = useMemo(() => {
    if (!search.trim()) return fullBoard;
    const q = search.toLowerCase();
    return fullBoard.filter(e => e.name.toLowerCase().includes(q));
  }, [fullBoard, search]);

  const myRank = fullBoard.findIndex(e => e.isMe) + 1;

  return (
    <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <div className={`px-4 py-3 flex items-center justify-between border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>🏆 Leaderboard</h3>
        <div className={`flex rounded-lg p-0.5 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
          {["weekly", "monthly", "all-time"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-colors capitalize ${
                tab === t
                  ? isDark ? "bg-slate-600 text-white" : "bg-white text-slate-800 shadow-sm"
                  : isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >{t === "all-time" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
      </div>

      <div className={`px-3 py-2 border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-slate-50"}`}>
          <FiSearch className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search student..."
            className={`w-full text-xs bg-transparent border-none outline-none ${isDark ? "text-white placeholder-slate-500" : "text-slate-800 placeholder-slate-400"}`}
          />
        </div>
      </div>

      {myRank > 0 && !search && (
        <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between ${isDark ? "bg-indigo-500/10 text-indigo-300 border-b border-slate-700" : "bg-indigo-50 text-indigo-700 border-b border-slate-100"}`}>
          <span>Your rank: <strong>#{myRank}</strong> of {TOTAL_LEARNERS} learners</span>
          {myRank <= 3 && <span>🎉 Top 3!</span>}
        </div>
      )}

      <div className="max-h-[300px] overflow-y-auto">
        {filtered.length === 0 ? (
          <p className={`text-center py-6 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>No students found</p>
        ) : filtered.map((entry, i) => {
          const globalRank = fullBoard.findIndex(e => e.id === entry.id) + 1;
          const lvl = getLevel(entry.xp / (tab === "monthly" ? 3 : tab === "all-time" ? 8 : 1));
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
              } ${i < filtered.length - 1 ? isDark ? "border-b border-slate-700/50" : "border-b border-slate-50" : ""}`}
            >
              <span className="w-6 text-center text-xs font-bold flex-shrink-0">
                {globalRank <= 3 ? MEDAL[globalRank - 1] : <span className={isDark ? "text-slate-500" : "text-slate-400"}>#{globalRank}</span>}
              </span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 bg-gradient-to-br ${entry.color}`}>
                {entry.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold truncate ${entry.isMe ? isDark ? "text-indigo-300" : "text-indigo-700" : isDark ? "text-slate-200" : "text-slate-800"}`}>
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
        })}
      </div>
    </div>
  );
}
