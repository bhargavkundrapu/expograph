'use client';

import { Suspense, lazy, useRef, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setReady(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    const obs = new ResizeObserver(() => {
      if (check()) obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fallback = (
    <div className={`w-full h-full flex items-center justify-center bg-black text-white ${className}`}>
      <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
      </svg>
    </div>
  );

  return (
    <div ref={containerRef} className={`w-full h-full ${className ?? ''}`}>
      {ready ? (
        <Suspense fallback={fallback}>
          <Spline scene={scene} className={className} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
