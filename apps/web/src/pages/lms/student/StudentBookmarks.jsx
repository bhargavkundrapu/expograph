import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiBookmark, FiTrash2, FiArrowRight, FiBookOpen } from "react-icons/fi";

export default function StudentBookmarks() {
  const { isDark } = useTheme();
  const { bookmarks, toggleBookmark, notes } = useGamification();
  const navigate = useNavigate();

  const notesArray = Object.entries(notes || {}).map(([path, data]) => ({
    path,
    text: data.text,
    updated: data.updated,
  }));

  return (
    <div className={`min-h-screen rounded-t-3xl overflow-hidden md:rounded-none p-4 sm:p-6 lg:p-8 transition-colors ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
            <FiBookmark className="inline w-6 h-6 text-amber-500 mr-2 -mt-1" />
            Bookmarks & Notes
          </h1>
          <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Quick access to your saved lessons and personal notes
          </p>
        </motion.div>

        {/* Bookmarked Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`rounded-2xl border p-5 mb-6 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        >
          <h2 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
            📌 Bookmarked Lessons
            <span className={`text-xs font-normal ${isDark ? "text-slate-500" : "text-slate-400"}`}>({bookmarks?.length || 0})</span>
          </h2>

          {(!bookmarks || bookmarks.length === 0) ? (
            <div className="text-center py-8">
              <FiBookOpen className={`w-10 h-10 mx-auto mb-3 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>No bookmarks yet</p>
              <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Bookmark lessons using the 🔖 icon on any lesson page
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks.slice().reverse().map((bm, i) => (
                <motion.div
                  key={bm.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all ${isDark ? "hover:bg-slate-700/50" : "hover:bg-slate-50"}`}
                  onClick={() => navigate(bm.path)}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? "bg-amber-500/15" : "bg-amber-50"}`}>
                    <FiBookmark className="w-4 h-4 text-amber-500 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDark ? "text-white" : "text-slate-800"}`}>
                      {bm.title || "Untitled Lesson"}
                    </p>
                    <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {new Date(bm.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(bm.path, bm.title); }}
                    className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${isDark ? "hover:bg-red-500/10 text-red-400" : "hover:bg-red-50 text-red-400"}`}
                    title="Remove bookmark"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                  <FiArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* My Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl border p-5 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        >
          <h2 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
            📝 My Notes
            <span className={`text-xs font-normal ${isDark ? "text-slate-500" : "text-slate-400"}`}>({notesArray.length})</span>
          </h2>

          {notesArray.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-3xl mb-3 block">📝</span>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>No notes yet</p>
              <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Write notes on any lesson using the notes section below each lesson
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notesArray.sort((a, b) => new Date(b.updated) - new Date(a.updated)).map((note, i) => (
                <motion.div
                  key={note.path}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${isDark ? "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                  onClick={() => navigate(note.path)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className={`text-xs font-semibold truncate ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                      {note.path.split("/").pop() || "Lesson"}
                    </p>
                    <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {new Date(note.updated).toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {note.text}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
