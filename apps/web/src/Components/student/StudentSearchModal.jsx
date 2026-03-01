import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiBookOpen,
  FiLayers,
  FiPlay,
  FiFileText,
} from "react-icons/fi";
import { apiFetch } from "../../services/api";

const TABS = [
  { key: "all", label: "All" },
  { key: "course", label: "Courses" },
  { key: "module", label: "Modules" },
  { key: "lesson", label: "Lessons" },
];

const SUGGESTION_TEXTS = [
  "e.g. Introduction to React",
  "e.g. Functions and Modules",
  "e.g. API Integration",
];

export default function StudentSearchModal({ open, onClose, token }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
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
    setActiveTab("all");
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

  const grouped = useMemo(() => {
    const courses = searchResults.filter((r) => r.type === "course");
    const modules = searchResults.filter((r) => r.type === "module");
    const lessons = searchResults.filter((r) => r.type === "lesson");
    return { course: courses, module: modules, lesson: lessons };
  }, [searchResults]);

  const counts = useMemo(
    () => ({
      all: searchResults.length,
      course: grouped.course.length,
      module: grouped.module.length,
      lesson: grouped.lesson.length,
    }),
    [searchResults, grouped]
  );

  const handleSelect = (item) => {
    setSearchQuery("");
    setSearchResults([]);
    onClose?.();
    if (
      item.type === "lesson" &&
      item.courseSlug &&
      item.moduleSlug &&
      item.lessonSlug
    ) {
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

  const hasQuery = searchQuery.trim().length >= 2;
  const hasResults = searchResults.length > 0;

  const showCourses = activeTab === "all" || activeTab === "course";
  const showModules = activeTab === "all" || activeTab === "module";
  const showLessons = activeTab === "all" || activeTab === "lesson";

  const iconForType = (type) => {
    if (type === "course")
      return <FiBookOpen className="w-4 h-4 text-blue-500" />;
    if (type === "module")
      return <FiLayers className="w-4 h-4 text-indigo-500" />;
    return <FiPlay className="w-4 h-4 text-emerald-500" />;
  };

  const bgForType = (type) => {
    if (type === "course") return "bg-blue-50";
    if (type === "module") return "bg-indigo-50";
    return "bg-emerald-50";
  };

  const renderItems = (items) =>
    items.map((item, idx) => (
      <button
        key={`${item.type}-${item.id}-${idx}`}
        type="button"
        onClick={() => handleSelect(item)}
        className="w-full px-4 py-3 text-left hover:bg-slate-800/80 flex items-center gap-3 transition-colors border-b border-slate-800/40 last:border-b-0"
      >
        <div
          className={`w-8 h-8 rounded-lg ${bgForType(
            item.type
          )} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
        >
          {iconForType(item.type)}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-slate-200 font-medium text-sm truncate block">
            {item.title}
          </span>
          {item.subtitle && (
            <span className="text-slate-500 text-xs truncate block">
              {item.subtitle}
            </span>
          )}
        </div>
      </button>
    ));

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 sm:pt-[16vh]">
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
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 pb-0">
            <div className="relative">
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
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
                >
                  <FiX className="w-5 h-5" />
                </button>
              ) : (
                <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-500 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 select-none">
                  ESC
                </kbd>
              )}
            </div>
          </div>

          {/* Tabs */}
          {hasQuery && (hasResults || searchLoading) && (
            <div className="flex items-center gap-1 px-4 pt-3 pb-0">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  {tab.label}
                  {hasResults && counts[tab.key] > 0 && (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.key
                          ? "bg-blue-500/30 text-blue-300"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {counts[tab.key]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Results / Suggestions */}
          <div className="p-3 pt-2">
            {!hasQuery ? (
              <div className="py-6 px-1">
                <div className="flex flex-wrap gap-2">
                  <span className="text-slate-500 text-sm">Try searching:</span>
                  {SUGGESTION_TEXTS.map((text, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSearchQuery(text.replace("e.g. ", ""))}
                      className="text-slate-400 text-sm px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40 hover:bg-slate-700/60 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchLoading ? (
              <div className="py-10 text-center">
                <div className="inline-block w-6 h-6 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-slate-500 mt-3">Searching...</p>
              </div>
            ) : !hasResults ? (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-500">
                  No results for &quot;{searchQuery}&quot;
                </p>
              </div>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-slate-800/50">
                {showCourses && grouped.course.length > 0 && (
                  <div>
                    {activeTab === "all" && (
                      <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                        Courses
                      </div>
                    )}
                    {renderItems(grouped.course)}
                  </div>
                )}
                {showModules && grouped.module.length > 0 && (
                  <div>
                    {activeTab === "all" && (
                      <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                        Modules
                      </div>
                    )}
                    {renderItems(grouped.module)}
                  </div>
                )}
                {showLessons && grouped.lesson.length > 0 && (
                  <div>
                    {activeTab === "all" && (
                      <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                        Lessons
                      </div>
                    )}
                    {renderItems(grouped.lesson)}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
