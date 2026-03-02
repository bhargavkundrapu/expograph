import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ACCENT_COLORS = [
  { id: "blue", label: "Ocean Blue", value: "#3b82f6", ring: "ring-blue-400", bg: "bg-blue-500", text: "text-blue-400", gradient: "from-blue-600/20 to-blue-400/10" },
  { id: "violet", label: "Royal Violet", value: "#8b5cf6", ring: "ring-violet-400", bg: "bg-violet-500", text: "text-violet-400", gradient: "from-violet-600/20 to-violet-400/10" },
  { id: "emerald", label: "Fresh Emerald", value: "#10b981", ring: "ring-emerald-400", bg: "bg-emerald-500", text: "text-emerald-400", gradient: "from-emerald-600/20 to-emerald-400/10" },
  { id: "rose", label: "Soft Rose", value: "#f43f5e", ring: "ring-rose-400", bg: "bg-rose-500", text: "text-rose-400", gradient: "from-rose-600/20 to-rose-400/10" },
  { id: "amber", label: "Warm Amber", value: "#f59e0b", ring: "ring-amber-400", bg: "bg-amber-500", text: "text-amber-400", gradient: "from-amber-600/20 to-amber-400/10" },
  { id: "cyan", label: "Cool Cyan", value: "#06b6d4", ring: "ring-cyan-400", bg: "bg-cyan-500", text: "text-cyan-400", gradient: "from-cyan-600/20 to-cyan-400/10" },
];

const ThemeContext = createContext(null);

const STORAGE_KEY = "expograph-theme";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { mode: "light", accent: "blue" };
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(theme)); } catch {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme.mode]);

  useEffect(() => {
    const accent = ACCENT_COLORS.find(a => a.id === theme.accent) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty("--accent-color", accent.value);
  }, [theme.accent]);

  const toggleMode = useCallback(() => {
    setThemeState(prev => ({ ...prev, mode: prev.mode === "dark" ? "light" : "dark" }));
  }, []);

  const setAccent = useCallback((id) => {
    if (ACCENT_COLORS.find(a => a.id === id)) {
      setThemeState(prev => ({ ...prev, accent: id }));
    }
  }, []);

  const isDark = theme.mode === "dark";
  const accentColor = ACCENT_COLORS.find(a => a.id === theme.accent) || ACCENT_COLORS[0];

  return (
    <ThemeContext.Provider value={{ isDark, toggleMode, accent: accentColor, setAccent, accentColors: ACCENT_COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export { ACCENT_COLORS };
