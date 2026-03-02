import { createContext, useContext, useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "expograph-dashboard-prefs-v2";

const DEFAULT_WIDGETS = [
  { id: "carousel", label: "Workshop Carousel", visible: true, order: 0 },
  { id: "schedule", label: "Your Schedule", visible: true, order: 1 },
];

const DEFAULT_SIDEBAR_WIDGETS = [
  { id: "events", label: "Events", visible: true, order: 0 },
  { id: "dailyChallenge", label: "Daily Challenge", visible: true, order: 1 },
  { id: "progress", label: "Your Progress", visible: true, order: 2 },
  { id: "achievements", label: "Achievements", visible: true, order: 3 },
  { id: "leaderboard", label: "Leaderboard", visible: true, order: 4 },
];

function getInitialPrefs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const mergedWidgets = DEFAULT_WIDGETS.map(dw => {
        const saved = parsed.widgets?.find(w => w.id === dw.id);
        return saved ? { ...dw, ...saved } : dw;
      });
      const mergedSidebar = DEFAULT_SIDEBAR_WIDGETS.map(dw => {
        const saved = parsed.sidebarWidgets?.find(w => w.id === dw.id);
        return saved ? { ...dw, ...saved } : dw;
      });
      return { widgets: mergedWidgets, sidebarWidgets: mergedSidebar, pinnedCourses: parsed.pinnedCourses || [] };
    }
  } catch {}
  return { widgets: DEFAULT_WIDGETS, sidebarWidgets: DEFAULT_SIDEBAR_WIDGETS, pinnedCourses: [] };
}

const DashboardPrefsContext = createContext(null);

export function DashboardPrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(getInitialPrefs);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
  }, [prefs]);

  const toggleWidget = useCallback((id) => {
    setPrefs(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w),
      sidebarWidgets: prev.sidebarWidgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w),
    }));
  }, []);

  const reorderWidgets = useCallback((fromIndex, toIndex) => {
    setPrefs(prev => {
      const all = [...prev.widgets, ...prev.sidebarWidgets].sort((a, b) => a.order - b.order);
      const [moved] = all.splice(fromIndex, 1);
      all.splice(toIndex, 0, moved);
      const reordered = all.map((w, i) => ({ ...w, order: i }));
      const mainIds = prev.widgets.map(w => w.id);
      return {
        ...prev,
        widgets: reordered.filter(w => mainIds.includes(w.id)),
        sidebarWidgets: reordered.filter(w => !mainIds.includes(w.id)),
      };
    });
  }, []);

  const togglePinCourse = useCallback((courseSlug) => {
    setPrefs(prev => {
      const pins = prev.pinnedCourses || [];
      const isPinned = pins.includes(courseSlug);
      return { ...prev, pinnedCourses: isPinned ? pins.filter(s => s !== courseSlug) : [...pins, courseSlug] };
    });
  }, []);

  const isPinned = useCallback((courseSlug) => {
    return (prefs.pinnedCourses || []).includes(courseSlug);
  }, [prefs.pinnedCourses]);

  const resetToDefaults = useCallback(() => {
    setPrefs({ widgets: DEFAULT_WIDGETS, sidebarWidgets: DEFAULT_SIDEBAR_WIDGETS, pinnedCourses: [] });
  }, []);

  const sortedWidgets = [...prefs.widgets].sort((a, b) => a.order - b.order);
  const sortedSidebarWidgets = [...(prefs.sidebarWidgets || DEFAULT_SIDEBAR_WIDGETS)].sort((a, b) => a.order - b.order);
  const allWidgets = [...sortedWidgets, ...sortedSidebarWidgets];

  return (
    <DashboardPrefsContext.Provider value={{ widgets: sortedWidgets, sidebarWidgets: sortedSidebarWidgets, allWidgets, toggleWidget, reorderWidgets, pinnedCourses: prefs.pinnedCourses || [], togglePinCourse, isPinned, resetToDefaults }}>
      {children}
    </DashboardPrefsContext.Provider>
  );
}

export function useDashboardPrefs() {
  const ctx = useContext(DashboardPrefsContext);
  if (!ctx) throw new Error("useDashboardPrefs must be used within DashboardPrefsProvider");
  return ctx;
}
