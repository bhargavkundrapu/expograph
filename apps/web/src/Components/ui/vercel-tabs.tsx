"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

/**
 * Vercel-style tabs: minimal, borderless bar with sliding underline on active tab.
 * - No background on tab bar
 * - Active: full-weight text + 2px bottom underline (sliding)
 * - Inactive: muted text
 * - Optional subtle bottom border under the whole row
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const initialIndex = tabs.findIndex((t) => t.id === activeTab);
    const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (activeTab !== undefined) {
        const idx = tabs.findIndex((t) => t.id === activeTab);
        if (idx >= 0) setActiveIndex(idx);
      }
    }, [activeTab, tabs]);

    const updateIndicator = React.useCallback(() => {
      const el = tabRefs.current[activeIndex];
      const list = listRef.current;
      if (el && list) {
        const listRect = list.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - listRect.left,
          width: elRect.width,
        });
      }
    }, [activeIndex]);

    useEffect(() => {
      updateIndicator();
    }, [activeIndex, tabs, updateIndicator]);

    useEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const ro = new ResizeObserver(updateIndicator);
      ro.observe(list);
      return () => ro.disconnect();
    }, [updateIndicator]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div
          ref={listRef}
          className="relative flex items-end border-b border-slate-200 dark:border-slate-700 gap-0"
        >
          {/* Sliding underline - active tab only */}
          <div
            className="absolute bottom-0 h-0.5 bg-slate-900 dark:bg-white transition-all duration-200 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-150",
                "border-b-2 border-transparent -mb-px",
                index === activeIndex
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
              onClick={() => {
                setActiveIndex(index);
                onTabChange?.(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export { Tabs };
