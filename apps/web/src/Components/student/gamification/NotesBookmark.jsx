import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiBookmark, FiEdit3, FiSave, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";

export function BookmarkButton({ lessonPath, lessonTitle, className = "" }) {
  const { isBookmarked, toggleBookmark } = useGamification();
  const bookmarked = isBookmarked(lessonPath);

  return (
    <button
      onClick={() => toggleBookmark(lessonPath, lessonTitle)}
      className={`p-2 rounded-lg transition-all ${bookmarked ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300"} ${className}`}
      title={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
    >
      <FiBookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${bookmarked ? "fill-current" : ""}`} />
    </button>
  );
}

export function LessonNotes({ lessonPath }) {
  const { isDark } = useTheme();
  const { getNote, saveNote } = useGamification();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setText(getNote(lessonPath));
  }, [lessonPath, getNote]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
    }
  }, [editing]);

  const handleSave = () => {
    saveNote(lessonPath, text);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    saveNote(lessonPath, "");
    setText("");
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setEditing(false);
    }
  };

  const hasNote = text.trim().length > 0;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${isDark ? "bg-slate-800/80 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${isDark ? "hover:bg-slate-700/30" : "hover:bg-slate-50"}`}
      >
        <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
          <FiEdit3 className="w-4 h-4 text-indigo-500" />
          My Notes
          {hasNote && !editing && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isDark ? "bg-green-500/15 text-green-400" : "bg-green-50 text-green-600"}`}>
              Saved
            </span>
          )}
        </h4>
        <div className="flex items-center gap-2">
          {saved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-green-500 font-medium"
            >
              ✓ Saved
            </motion.span>
          )}
          {expanded ? <FiChevronUp className="w-4 h-4 text-slate-400" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {/* Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`px-4 pb-4 border-t ${isDark ? "border-slate-700" : "border-slate-100"}`}>
              {editing ? (
                <div className="pt-3">
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your notes here... (Ctrl+S to save, Esc to cancel)"
                    rows={6}
                    className={`w-full text-sm rounded-xl p-4 border resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400 leading-relaxed ${isDark ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {text.length} chars • Ctrl+S to save
                    </p>
                    <div className="flex items-center gap-2">
                      {hasNote && (
                        <button
                          onClick={handleDelete}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}`}
                        >
                          <FiTrash2 className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Delete
                        </button>
                      )}
                      <button
                        onClick={() => setEditing(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? "text-slate-400 hover:bg-slate-700" : "text-slate-500 hover:bg-slate-100"}`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1"
                      >
                        <FiSave className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : hasNote ? (
                <div className="pt-3">
                  <div
                    onClick={() => setEditing(true)}
                    className={`p-3 rounded-xl cursor-text transition-all border ${isDark ? "bg-slate-700/30 border-slate-600/50 hover:border-slate-500" : "bg-slate-50/80 border-slate-100 hover:border-slate-200"}`}
                  >
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-700"}`}>{text}</p>
                  </div>
                  <p className={`text-[10px] mt-1.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Click to edit</p>
                </div>
              ) : (
                <div className="pt-3">
                  <button
                    onClick={() => setEditing(true)}
                    className={`w-full p-4 rounded-xl border-2 border-dashed text-center transition-all ${isDark ? "border-slate-600 hover:border-indigo-500/50 text-slate-500 hover:text-indigo-400" : "border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-500"}`}
                  >
                    <FiEdit3 className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-xs font-medium">Click to add notes for this lesson</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BookmarksList() {
  const { isDark } = useTheme();
  const { bookmarks } = useGamification();

  if (!bookmarks || bookmarks.length === 0) return null;

  return (
    <div className={`rounded-xl border p-4 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <h3 className={`text-sm font-bold mb-3 flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
        <FiBookmark className="w-4 h-4 text-amber-500 fill-current" /> My Bookmarks
      </h3>
      <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
        {bookmarks.slice().reverse().map(bm => (
          <a
            key={bm.path}
            href={bm.path}
            className={`block text-xs font-medium px-3 py-2 rounded-lg transition-colors truncate ${isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-50"}`}
          >
            📌 {bm.title || bm.path}
          </a>
        ))}
      </div>
    </div>
  );
}
