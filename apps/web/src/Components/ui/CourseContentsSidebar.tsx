import React, { useState } from "react";
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
  title: string;
  minutes: number;
  completed: boolean;
  active: boolean;
  /** When true, row is disabled and not clickable (e.g. locked lesson). */
  locked?: boolean;
}

export interface CourseContentsSidebarProps {
  courseTitle?: string;
  moduleTitle?: string;
  totalDuration?: string;
  lessons?: LessonItem[];
  onBack?: () => void;
  onClose?: () => void;
  onLessonSelect?: (lesson: LessonItem) => void;
  className?: string;
}

const defaultLessons: LessonItem[] = [
  { id: "1", title: "Introduction to Responsive Web Design", minutes: 40, completed: true, active: false },
  { id: "2", title: "Introduction to Responsive Web Design | Cheat Sheet", minutes: 10, completed: true, active: false },
  { id: "3", title: "Bootstrap Grid System", minutes: 50, completed: true, active: false },
  { id: "4", title: "Bootstrap Grid System | Cheat Sheet", minutes: 10, completed: false, active: true },
  { id: "5", title: "Responsive Utilities & Breakpoints", minutes: 35, completed: false, active: false },
];

export function CourseContentsSidebar({
  courseTitle = "Responsive Web Design & Bootstrap Grid System",
  moduleTitle,
  totalDuration = "7 hours, 5 mins",
  lessons = defaultLessons,
  onBack,
  onClose,
  onLessonSelect,
  className,
}: CourseContentsSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "flex flex-col w-[360px] min-w-[360px] h-screen max-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-900 text-white",
        className
      )}
      role="navigation"
      aria-label="Course contents"
    >
      {/* Header: same as main sidebar (border-slate-700/50) */}
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

      {/* Module block: slate-700/60 to match main sidebar secondary areas */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex-shrink-0 w-full px-4 py-3.5 text-left bg-slate-700/60 hover:bg-slate-700/70 border-b border-slate-700/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset flex items-start justify-between gap-3"
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse lesson list" : "Expand lesson list"}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-white leading-snug">
            {moduleTitle || courseTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
            {totalDuration}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 flex-shrink-0 text-slate-300 mt-0.5 transition-transform duration-200",
            !expanded && "rotate-[-90deg]"
          )}
          aria-hidden
        />
      </button>

      {/* Lesson list: scrollable, vertical line + check circles */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-200",
          !expanded && "max-h-0 overflow-hidden"
        )}
      >
        {expanded && lessons.length > 0 && (
          <div className="py-2">
            <ul className="space-y-0" role="list">
              {lessons.map((lesson) => {
                const active = lesson.active;
                const completed = lesson.completed;
                const locked = lesson.locked === true;
                return (
                  <li
                    key={lesson.id}
                    className={cn(
                      "flex items-stretch w-full text-left transition-all relative",
                      active
                        ? "bg-gradient-to-r from-slate-900 via-black to-slate-900 border-l-4 border-sky-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                        : "border-l-4 border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200",
                      locked && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {active && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-400 opacity-80" aria-hidden />
                    )}
                    <button
                      type="button"
                      onClick={() => !locked && onLessonSelect?.(lesson)}
                      disabled={locked}
                      className={cn(
                        "relative flex-1 min-w-0 flex items-start gap-3 pl-4 pr-2 py-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset text-left",
                        active && "pl-5",
                        locked && "cursor-not-allowed"
                      )}
                      aria-current={active ? "true" : undefined}
                      aria-label={`${lesson.title}, ${lesson.minutes} mins${completed ? ", completed" : ""}`}
                    >
                      {/* Simple disc indicator - green check if completed, empty disc if not */}
                      <div className="flex items-center justify-center w-5 h-5 flex-shrink-0 mt-0.5">
                        {completed ? (
                          <CheckCircle
                            className={cn(
                              "w-5 h-5 transition-all",
                              active ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "text-emerald-500"
                            )}
                            aria-hidden
                          />
                        ) : (
                          <div
                            className={cn(
                              "rounded-full border-2 flex-shrink-0 transition-all",
                              active
                                ? "w-4 h-4 border-sky-400 bg-sky-400/40 shadow-[0_0_8px_rgba(56,189,248,0.6)] ring-2 ring-sky-400/30"
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
                            "leading-snug transition-all",
                            active 
                              ? "text-white font-bold text-base" 
                              : "text-slate-400 font-normal text-sm"
                          )}
                          style={active ? { color: '#ffffff' } : undefined}
                        >
                          {lesson.title}
                        </p>
                        <p className={cn(
                          "text-xs mt-1.5 flex items-center gap-1.5",
                          active ? "text-sky-200 font-semibold" : "text-slate-500"
                        )}>
                          <Clock className={cn(
                            "flex-shrink-0",
                            active ? "w-4 h-4 text-sky-300" : "w-3 h-3"
                          )} aria-hidden />
                          {lesson.minutes} mins
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
    </aside>
  );
}

export default CourseContentsSidebar;
