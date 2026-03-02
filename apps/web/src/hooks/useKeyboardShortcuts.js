import { useEffect, useCallback } from "react";

const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);

export const SHORTCUTS = [
  { keys: isMac ? "⌘ K" : "Ctrl+K", action: "openSearch", label: "Open search" },
  { keys: "?", action: "openHelp", label: "Show keyboard shortcuts" },
  { keys: "M", action: "markComplete", label: "Mark lesson as complete", context: "lesson" },
  { keys: "→", action: "nextLesson", label: "Go to next lesson", context: "lesson" },
  { keys: "←", action: "prevLesson", label: "Go to previous lesson", context: "lesson" },
  { keys: "S", action: "toggleSidebar", label: "Toggle sidebar", context: "lesson" },
  { keys: "D", action: "toggleDarkMode", label: "Toggle dark mode" },
  { keys: "Esc", action: "closeModal", label: "Close modal / dialog" },
];

export function useKeyboardShortcuts(handlers = {}, enabled = true) {
  const handleKeyDown = useCallback((e) => {
    if (!enabled) return;

    const target = e.target;
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      handlers.openSearch?.();
      return;
    }

    if (e.key === "Escape") {
      handlers.closeModal?.();
      return;
    }

    if (isInput) return;

    switch (e.key) {
      case "?":
        e.preventDefault();
        handlers.openHelp?.();
        break;
      case "m":
      case "M":
        e.preventDefault();
        handlers.markComplete?.();
        break;
      case "ArrowRight":
        e.preventDefault();
        handlers.nextLesson?.();
        break;
      case "ArrowLeft":
        e.preventDefault();
        handlers.prevLesson?.();
        break;
      case "s":
      case "S":
        e.preventDefault();
        handlers.toggleSidebar?.();
        break;
      case "d":
      case "D":
        e.preventDefault();
        handlers.toggleDarkMode?.();
        break;
    }
  }, [handlers, enabled]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
