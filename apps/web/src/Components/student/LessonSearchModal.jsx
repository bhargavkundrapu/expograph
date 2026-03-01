import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiLayers,
  FiPlay,
  FiFileText,
} from "react-icons/fi";
import { apiFetch } from "../../services/api";

const TABS = [
  { key: "all", label: "All" },
  { key: "modules", label: "Modules" },
  { key: "lessons", label: "Lessons" },
  { key: "sections", label: "Content" },
];

export default function LessonSearchModal({
  open,
  onClose,
  token,
  allLessons = [],
  currentLessonId,
  courseSlug,
  onLessonSelect,
  onModuleSelect,
}) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [apiResults, setApiResults] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveTab("all");
      setApiResults([]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const fetchSearch = useCallback(
    async (q) => {
      if (!token || !q || q.trim().length < 2) {
        setApiResults([]);
        return;
      }
      setApiLoading(true);
      try {
        const res = await apiFetch(
          `/api/v1/student/search?q=${encodeURIComponent(q.trim())}`,
          { token }
        );
        setApiResults(res?.data || []);
      } catch {
        setApiResults([]);
      } finally {
        setApiLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setApiResults([]);
      return;
    }
    const t = setTimeout(() => fetchSearch(query), 250);
    return () => clearTimeout(t);
  }, [query, fetchSearch]);

  const apiModules = useMemo(
    () => apiResults.filter((r) => r.type === "module"),
    [apiResults]
  );
  const apiLessons = useMemo(
    () => apiResults.filter((r) => r.type === "lesson"),
    [apiResults]
  );

  const localSections = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const extractText = (val) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      if (Array.isArray(val))
        return val.map((v) => extractText(v)).join(" ");
      if (typeof val === "object")
        return Object.entries(val)
          .filter(([k]) => k !== "type")
          .map(([, v]) => extractText(v))
          .join(" ");
      return String(val);
    };

    const findSnippet = (text, q) => {
      const lower = text.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx < 0) return null;
      const start = Math.max(0, idx - 30);
      const end = Math.min(text.length, idx + q.length + 60);
      let snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
      if (start > 0) snippet = "..." + snippet;
      if (end < text.length) snippet = snippet + "...";
      return snippet;
    };

    const sections = [];
    allLessons.forEach((l) => {
      if (l.locked) return;
      if (!Array.isArray(l.learn_setup_steps)) return;
      l.learn_setup_steps.forEach((sec, secIdx) => {
        if (!sec || typeof sec !== "object" || !sec.type) return;
        const allText = extractText(sec);
        if (!allText.toLowerCase().includes(q)) return;
        const snippet = findSnippet(allText, q);
        const sectionName =
          sec.headline || sec.scenario || sec.description || sec.line || sec.task || sec.type;
        sections.push({
          id: `sec-${l.id}-${sec.type}-${secIdx}`,
          sectionType: sec.type,
          sectionLabel: sectionName,
          matchSnippet: snippet,
          lessonTitle: l.title,
          lessonSlug: l.slug,
          moduleSlug: l.moduleSlug,
          moduleTitle: l.moduleTitle,
          completed: l.completed,
        });
      });
    });
    return sections.slice(0, 15);
  }, [query, allLessons]);

  const counts = {
    all: apiModules.length + apiLessons.length + localSections.length,
    modules: apiModules.length,
    lessons: apiLessons.length,
    sections: localSections.length,
  };

  const showModules = activeTab === "all" || activeTab === "modules";
  const showLessons = activeTab === "all" || activeTab === "lessons";
  const showSections = activeTab === "all" || activeTab === "sections";
  const hasResults = counts.all > 0;
  const hasQuery = query.trim().length >= 2;

  const handleApiLessonClick = (item) => {
    onClose?.();
    if (item.courseSlug && item.moduleSlug && item.lessonSlug) {
      if (item.courseSlug === courseSlug && onLessonSelect) {
        onLessonSelect({
          ...item,
          slug: item.lessonSlug,
          moduleSlug: item.moduleSlug,
        });
      } else {
        navigate(
          `/lms/student/courses/${item.courseSlug}/modules/${item.moduleSlug}/lessons/${item.lessonSlug}`
        );
      }
    }
  };

  const handleApiModuleClick = (item) => {
    onClose?.();
    if (item.courseSlug === courseSlug && onModuleSelect) {
      onModuleSelect(item);
    } else if (item.courseSlug) {
      navigate(`/lms/student/courses?course=${item.courseSlug}`);
    }
  };

  const handleSectionClick = (sec) => {
    onClose?.();
    if (onLessonSelect) {
      onLessonSelect({
        ...sec,
        slug: sec.lessonSlug,
        moduleSlug: sec.moduleSlug,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 sm:pt-[16vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.18 }}
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="p-4 pb-0">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all modules, lessons, sections..."
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 focus:bg-white text-base transition-all"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setApiResults([]);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            ) : (
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 select-none">
                ESC
              </kbd>
            )}
          </div>
        </div>

        {/* Tabs */}
        {hasQuery && (hasResults || apiLoading) && (
          <div className="flex items-center gap-1 px-4 pt-3 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent"
                }`}
              >
                {tab.label}
                {!apiLoading && counts[tab.key] > 0 && (
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="p-3 pt-2">
          {!hasQuery ? (
            <div className="py-8 text-center">
              <FiSearch className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400">
                Search across all your courses &mdash; modules, lessons and
                sections
              </p>
            </div>
          ) : apiLoading ? (
            <div className="py-10 text-center">
              <div className="inline-block w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm text-slate-400 mt-3">Searching...</p>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-400">
                No results for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-slate-100">
              {/* Modules */}
              {showModules && apiModules.length > 0 && (
                <div>
                  {activeTab === "all" && (
                    <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/95 backdrop-blur-sm border-b border-slate-100">
                      Modules
                    </div>
                  )}
                  {apiModules.map((mod, idx) => (
                    <button
                      key={`mod-${mod.id}-${idx}`}
                      onClick={() => handleApiModuleClick(mod)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50/60 transition-colors border-b border-slate-50 last:border-b-0"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <FiLayers className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {mod.title}
                        </p>
                        {mod.subtitle && (
                          <p className="text-xs text-slate-400 truncate">
                            {mod.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Lessons */}
              {showLessons && apiLessons.length > 0 && (
                <div>
                  {activeTab === "all" && (
                    <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/95 backdrop-blur-sm border-b border-slate-100">
                      Lessons
                    </div>
                  )}
                  {apiLessons.map((item, idx) => (
                    <button
                      key={`les-${item.id}-${idx}`}
                      onClick={() => handleApiLessonClick(item)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-b-0 hover:bg-blue-50/60`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <FiPlay className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="text-xs text-slate-500 truncate">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Sections — shows matching content text */}
              {showSections && localSections.length > 0 && (
                <div>
                  {activeTab === "all" && (
                    <div className="sticky top-0 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/95 backdrop-blur-sm border-b border-slate-100">
                      Content
                    </div>
                  )}
                  {localSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleSectionClick(sec)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-b border-slate-50 last:border-b-0 hover:bg-blue-50/60"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiFileText className="w-4 h-4 text-violet-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        {sec.matchSnippet && (
                          <p className="text-sm text-slate-700 line-clamp-2 mb-0.5">
                            {sec.matchSnippet}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 truncate">
                          {sec.lessonTitle} &middot; {sec.moduleTitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
