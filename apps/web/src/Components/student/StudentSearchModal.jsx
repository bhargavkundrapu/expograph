import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiBookOpen } from "react-icons/fi";
import { apiFetch } from "../../services/api";

const SUGGESTION_TEXTS = [
  "e.g. Introduction to React",
  "e.g. Functions and Modules",
  "e.g. API Integration",
];

export default function StudentSearchModal({ open, onClose, token }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchSearch = useCallback(
    async (q) => {
      if (!token || !q || q.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setSearchLoading(true);
      try {
        const res = await apiFetch(
          `/api/v1/student/search?q=${encodeURIComponent(q.trim())}`,
          { token }
        );
        setSearchResults(res?.data || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!open) return;
    setSearchQuery("");
    setSearchResults([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(() => fetchSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery, fetchSearch]);

  const handleSelect = (item) => {
    setSearchQuery("");
    setSearchResults([]);
    onClose?.();
    if (item.type === "lesson" && item.courseSlug && item.moduleSlug && item.lessonSlug) {
      navigate(
        `/lms/student/courses/${item.courseSlug}/modules/${item.moduleSlug}/lessons/${item.lessonSlug}`
      );
    } else if (item.type === "course" && item.courseSlug) {
      navigate(`/lms/student/courses?course=${item.courseSlug}`);
    } else if (item.type === "module" && item.courseSlug) {
      navigate(`/lms/student/courses?course=${item.courseSlug}`);
    } else {
      navigate("/lms/student/courses");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose?.();
    } else if (e.key === "Enter" && searchResults.length > 0) {
      handleSelect(searchResults[0]);
    } else if (e.key === "Enter" && searchQuery.trim()) {
      onClose?.();
      navigate(
        `/lms/student/courses?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const showDropdown =
    searchQuery.trim().length >= 2 &&
    (searchResults.length > 0 || searchLoading);

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:pt-[20vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search courses, modules, lessons..."
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 text-base"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
                    aria-label="Clear search"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Helper text - what to search */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-slate-500 text-sm">Try searching:</span>
              {SUGGESTION_TEXTS.map((text, i) => (
                <span
                  key={i}
                  className="text-slate-400 text-sm px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Results dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-800 overflow-hidden"
              >
                <div className="max-h-72 overflow-y-auto py-2">
                  {searchLoading ? (
                    <div className="px-4 py-8 text-center text-slate-400 text-sm">
                      Searching...
                    </div>
                  ) : (
                    <ul className="py-1">
                      {searchResults.map((item, idx) => (
                        <li key={`${item.type}-${item.id}-${idx}`}>
                          <button
                            type="button"
                            onClick={() => handleSelect(item)}
                            className="w-full px-4 py-3 text-left hover:bg-slate-800/80 flex flex-col gap-0.5 transition-colors"
                          >
                            <span className="text-slate-200 font-medium text-sm truncate">
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="text-slate-500 text-xs truncate flex items-center gap-1">
                                {item.type === "course" && (
                                  <FiBookOpen className="w-3 h-3 flex-shrink-0" />
                                )}
                                {item.type === "module" && (
                                  <span className="text-sky-400">Module</span>
                                )}
                                {item.type === "lesson" && (
                                  <span className="text-emerald-400">Lesson</span>
                                )}
                                {item.subtitle}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
