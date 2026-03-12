import { useEffect, useRef, useState } from "react";

export interface UseNearViewportOptions {
  /** Root margin for IntersectionObserver (e.g. "300px" to trigger when within 300px of viewport). Default "300px". */
  rootMargin?: string;
  /** Threshold 0–1. Default 0 (any visibility). */
  threshold?: number;
  /** If true, once visible the observed state stays true (no unmount when scrolling away). Default true for Spline/lazy content. */
  triggerOnce?: boolean;
}

/**
 * Returns true when the element is near or inside the viewport.
 * Uses IntersectionObserver with configurable rootMargin (e.g. 300px) so content can mount before user scrolls to it.
 */
export function useNearViewport(options: UseNearViewportOptions = {}): [boolean, React.RefObject<HTMLDivElement | null>] {
  const { rootMargin = "300px", threshold = 0, triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsNear(true);
        } else if (!triggerOnce) {
          setIsNear(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return [isNear, ref];
}
