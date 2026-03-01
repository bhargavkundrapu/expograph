import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Clock,
  CheckCircle,
  PanelRightClose,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface LessonItem {
  id: string;
  slug?: string;
  title: string;
  minutes: number;
  completed: boolean;
  active: boolean;
  /** When true, row is disabled and not clickable (e.g. locked lesson). */
  locked?: boolean;
  /** When true, lesson has video content */
  hasVideo?: boolean;
}

export interface ModuleItem {
  id: string;
  slug: string;
  title: string;
  lessons: LessonItem[];
  expanded?: boolean;
}

export interface CourseContentsSidebarProps {
  courseTitle?: string;
  modules?: ModuleItem[];
  totalDuration?: string;
  currentLessonId?: string;
  currentLessonSlug?: string;
  onBack?: () => void;
  onClose?: () => void;
  onLessonSelect?: (lesson: LessonItem, moduleSlug: string) => void;
  className?: string;
}

export function CourseContentsSidebar({
  courseTitle = "Course",
  modules = [],
  totalDuration = "0 mins",
  currentLessonId,
  currentLessonSlug,
  onBack,
  onClose,
  onLessonSelect,
  className,
}: CourseContentsSidebarProps) {
  // Track expanded state for each module - initialize immediately
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (modules.length > 0) {
      // Find module with current lesson immediately
      const moduleWithCurrent = modules.find((mod) =>
        mod.lessons.some(
          (l) => l.id === currentLessonId || l.slug === currentLessonSlug
        )
      );
      if (moduleWithCurrent) {
        initial.add(moduleWithCurrent.id);
      } else if (modules[0]) {
        // Expand first module if no current lesson found
        initial.add(modules[0].id);
      }
    }
    return initial;
  });

  // Update expanded modules when current lesson changes - optimized
  useEffect(() => {
    if (modules.length === 0) return;
    
    // Find module with current lesson
    let moduleWithCurrent: ModuleItem | undefined;
    for (const mod of modules) {
      if (mod.lessons.some(
        (l) => l.id === currentLessonId || l.slug === currentLessonSlug
      )) {
        moduleWithCurrent = mod;
        break;
      }
    }
    
    // Only update if module needs to be expanded
    if (moduleWithCurrent) {
      setExpandedModules((prev) => {
        // Check if already expanded to avoid unnecessary updates
        if (prev.has(moduleWithCurrent!.id)) {
          return prev;
        }
        const updated = new Set(prev);
        updated.add(moduleWithCurrent!.id);
        return updated;
      });
    }
  }, [modules, currentLessonId, currentLessonSlug]);

  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModules((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(moduleId)) {
        newExpanded.delete(moduleId);
      } else {
        newExpanded.add(moduleId);
      }
      return newExpanded;
    });
  }, []);

  // Check if a module is active (contains the current lesson)
  const isModuleActive = useCallback(
    (module: ModuleItem) => {
      return module.lessons.some(
        (l) => l.id === currentLessonId || l.slug === currentLessonSlug
      );
    },
    [currentLessonId, currentLessonSlug]
  );


  return (
    <aside
      className={cn(
        "flex flex-col w-full md:w-[360px] min-w-0 md:min-w-[360px] min-h-0 self-stretch bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-900 text-white",
        className
      )}
      role="navigation"
      aria-label="Course contents"
    >
      {/* Header */}
      <header className="flex-shrink-0 px-3 py-2.5 flex flex-col border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-300 hover:bg-slate-700/40 hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex justify-start ml-2">
            <span className="text-sky-400 font-semibold text-sm tracking-wide border-b-2 border-sky-400 pb-0.5">
              CONTENTS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:bg-slate-700/40 hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
            aria-label="Close sidebar"
          >
            <PanelRightClose className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
        {/* Course name at top */}
        {courseTitle && (
          <div className="px-2 pt-1.5 pb-0.5">
            <p className="text-xs text-slate-400 truncate" title={courseTitle}>
              {courseTitle}
            </p>
          </div>
        )}
      </header>


      {/* Modules and Lessons List - min-h-0 allows flex child to shrink and enable scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {modules.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-slate-500">No modules available</p>
          </div>
        ) : (
          <div className="py-2">
            {modules.map((module) => {
              const isExpanded = expandedModules.has(module.id);
              const hasLessons = module.lessons && module.lessons.length > 0;
              const moduleActive = isModuleActive(module);

              return (
                <div
                  key={module.id}
                  className={cn(
                    "border-b last:border-b-0",
                    moduleActive ? "border-slate-700/90" : "border-slate-900/90"
                  )}
                >
                  {/* Module Header */}
                  <button
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    disabled={!hasLessons}
                    className={cn(
                      "w-full px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset flex items-start justify-between gap-3",
                      moduleActive
                        ? "bg-slate-700/90 hover:bg-slate-700/95"
                        : "bg-slate-900/90 hover:bg-slate-800/90",
                      !hasLessons && "opacity-50 cursor-not-allowed"
                    )}
                    aria-expanded={isExpanded ? "true" : "false"}
                    aria-label={isExpanded ? `Collapse ${module.title}` : `Expand ${module.title}`}
                  >
                    <div className="min-w-0 flex-1">
                      <h2
                        className={cn(
                          "text-sm font-bold leading-snug",
                          moduleActive ? "text-sky-300" : "text-slate-100"
                        )}
                      >
                        {module.title}
                      </h2>
                      {hasLessons && (
                        <p
                          className={cn(
                            "text-xs mt-1.5",
                            moduleActive ? "text-sky-400" : "text-slate-400"
                          )}
                        >
                          {module.lessons.length}{" "}
                          {module.lessons.length === 1 ? "lesson" : "lessons"}
                        </p>
                      )}
                    </div>
                    {hasLessons && (
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-200",
                          moduleActive ? "text-sky-300" : "text-slate-300",
                          !isExpanded && "rotate-[-90deg]"
                        )}
                        aria-hidden
                      />
                    )}
                  </button>

                  {/* Lessons List */}
                  {isExpanded && hasLessons && (
                    <div className="bg-slate-800/30">
                      <ul className="space-y-0" role="list">
                        {module.lessons.map((lesson) => {
                          // Use pre-calculated active property for better performance
                          const active = lesson.active;
                          const completed = lesson.completed;
                          const locked = lesson.locked === true;

                          return (
                            <li
                              key={lesson.id}
                              className={cn(
                                "flex items-stretch w-full text-left transition-colors",
                                active
                                  ? "bg-slate-700/50"
                                  : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-200",
                                locked && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  !locked && onLessonSelect?.(lesson, module.slug)
                                }
                                disabled={locked}
                                className={cn(
                                  "relative flex-1 min-w-0 flex items-start gap-3 pl-4 pr-2 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset text-left",
                                  locked && "cursor-not-allowed"
                                )}
                                aria-current={active ? "true" : undefined}
                                aria-label={`${lesson.title}, practice${
                                  completed ? ", completed" : ""
                                }`}
                              >
                                {/* Status indicator */}
                                <div className="flex items-center justify-center w-5 h-5 flex-shrink-0 mt-0.5">
                                  {completed ? (
                                    <CheckCircle
                                      className={cn(
                                        "w-5 h-5",
                                        active ? "text-emerald-400" : "text-emerald-500"
                                      )}
                                      aria-hidden
                                    />
                                  ) : (
                                    <div
                                      className={cn(
                                        "rounded-full border-2 flex-shrink-0",
                                        active
                                          ? "w-4 h-4 border-sky-400 bg-sky-400/20"
                                          : "w-3 h-3 border-slate-500 bg-transparent"
                                      )}
                                      aria-hidden
                                    />
                                  )}
                                </div>
                                {/* Title + duration */}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={cn(
                                      "leading-snug",
                                      active
                                        ? "text-white font-semibold text-sm"
                                        : "text-slate-400 font-normal text-sm"
                                    )}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p
                                    className={cn(
                                      "text-xs mt-1.5",
                                      active ? "text-sky-300" : "text-slate-500"
                                    )}
                                  >
                                    Practice
                                  </p>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

export default CourseContentsSidebar;
