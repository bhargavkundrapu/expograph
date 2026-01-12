import { useState, useEffect, useCallback } from 'react';
import { throttle } from '../lib/utils';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number; // 0-1 scroll progress
}

/**
 * Custom hook to track scroll position and direction
 */
export function useScrollPosition(throttleMs: number = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const currentX = window.scrollX;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? currentY / documentHeight : 0;

    setScrollPosition(prev => ({
      x: currentX,
      y: currentY,
      direction: currentY > prev.y ? 'down' : currentY < prev.y ? 'up' : prev.direction,
      isAtTop: currentY < 50,
      isAtBottom: currentY >= documentHeight - 50,
      progress: Math.min(1, Math.max(0, progress)),
    }));
  }, []);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, throttleMs);
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll, throttleMs]);

  return scrollPosition;
}

/**
 * Hook to check if user has scrolled past a certain point
 */
export function useScrolledPast(threshold: number): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed: number = 0.5): number {
  const { y } = useScrollPosition();
  return y * speed;
}

export default useScrollPosition;
