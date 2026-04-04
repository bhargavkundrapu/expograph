"use client";

import React, { Suspense, lazy, useRef, useState, useEffect } from "react";

const DEFAULT_ROOT_MARGIN = "300px";

/**
 * Uses IntersectionObserver with rootMargin so children mount only when near viewport.
 * Placeholder keeps fixed height to prevent layout shift (CLS).
 */
export interface LazyMountProps {
  children: React.ReactNode;
  /** Placeholder height (e.g. "100vh", "400px"). Prevents CLS. */
  placeholderHeight: string;
  /** IntersectionObserver rootMargin. Default "300px". */
  rootMargin?: string;
  /** Optional placeholder node (same dimensions as placeholderHeight). */
  placeholder?: React.ReactNode;
  className?: string;
  /** When true, children mount on first paint (no IntersectionObserver wait). */
  initialMount?: boolean;
}

export function LazyMount({
  children,
  placeholderHeight,
  rootMargin = DEFAULT_ROOT_MARGIN,
  placeholder,
  className,
  initialMount = false,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(initialMount);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (initialMount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) setShouldMount(true);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, initialMount]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: placeholderHeight }}
    >
      {shouldMount ? children : (placeholder ?? null)}
    </div>
  );
}

/**
 * LazyMountSpline: mounts Spline (or spline-viewer) only when near viewport.
 * Uses a placeholder div with fixed height to prevent CLS; no flicker on fast scroll.
 */
export interface LazyMountSplineProps {
  /** Spline scene URL (e.g. from Spline Export → Viewer). */
  scene: string;
  /** Placeholder height (e.g. "100vh" for hero). */
  placeholderHeight: string;
  /** rootMargin for "near viewport". Default "300px". */
  rootMargin?: string;
  className?: string;
}

const SplineLazy = lazy(() =>
  import("@splinetool/react-spline").then((m) => ({ default: m.default }))
);

export function LazyMountSpline({
  scene,
  placeholderHeight,
  rootMargin = DEFAULT_ROOT_MARGIN,
  className = "",
}: LazyMountSplineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) setShouldMount(true);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const placeholder = (
    <div
      className={`w-full bg-black flex items-center justify-center ${className}`}
      style={{ height: "100%", minHeight: placeholderHeight }}
      aria-hidden
    >
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: placeholderHeight, position: "relative" }}
    >
      {shouldMount ? (
        <Suspense fallback={placeholder}>
          <SplineLazy scene={scene} className={className} />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
