import React, { useState } from "react";
import { CourseContentsSidebar } from "../../Components/ui/CourseContentsSidebar";
import type { LessonItem } from "../../Components/ui/CourseContentsSidebar";

const sampleLessons: LessonItem[] = [
  { id: "1", title: "Introduction to Responsive Web Design", minutes: 40, completed: true, active: false, bookmarked: false },
  { id: "2", title: "Introduction to Responsive Web Design | Cheat Sheet", minutes: 10, completed: true, active: false, bookmarked: true },
  { id: "3", title: "Bootstrap Grid System", minutes: 50, completed: true, active: false, bookmarked: false },
  { id: "4", title: "Bootstrap Grid System | Cheat Sheet", minutes: 10, completed: false, active: true, bookmarked: false },
  { id: "5", title: "Responsive Utilities & Breakpoints", minutes: 35, completed: false, active: false, bookmarked: false },
];

export default function CourseContentsSidebarDemo() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      {sidebarVisible ? (
        <CourseContentsSidebar
          courseTitle="Responsive Web Design & Bootstrap Grid System"
          totalDuration="7 hours, 5 mins"
          lessons={sampleLessons}
          onBack={() => window.history.back()}
          onClose={() => setSidebarVisible(false)}
          onLessonSelect={(lesson) => console.log("Selected lesson:", lesson.title)}
          onBookmarkToggle={(id, bookmarked) => console.log("Bookmark", id, bookmarked)}
        />
      ) : null}
      <main className="flex-1 flex flex-col min-w-0">
        {!sidebarVisible && (
          <button
            type="button"
            onClick={() => setSidebarVisible(true)}
            className="fixed left-4 top-4 z-50 px-4 py-2 bg-[#182647] text-white text-sm font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38ABFF] focus-visible:ring-offset-2"
            aria-label="Open course contents"
          >
            Open contents
          </button>
        )}
        <div className="flex-1 flex items-center justify-center p-8 text-slate-500 text-center">
          <p className="text-lg">
            Main content area. Sidebar is {sidebarVisible ? "visible" : "hidden"}.
          </p>
        </div>
      </main>
    </div>
  );
}
