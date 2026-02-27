import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MOBILE_BREAKPOINT = 768;

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
};

export interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<{ tubes?: { setColors: (c: string[]) => void; setLightsColors: (c: string[]) => void } } | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (mobile) {
      setUseFallback(true);
      return;
    }

    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        const module = await import(
          /* @vite-ignore */
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        tubesRef.current = app;
      } catch (error) {
        console.warn("TubesBackground: could not load tubes cursor lib", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      tubesRef.current = null;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current?.tubes) return;
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
      onClick={handleClick}
    >
      {useFallback ? (
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse at 20% 40%, rgba(249,103,251,0.18) 0%, transparent 55%)",
              "radial-gradient(ellipse at 75% 30%, rgba(105,88,213,0.18) 0%, transparent 55%)",
              "radial-gradient(ellipse at 50% 85%, rgba(83,188,40,0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at 60% 60%, rgba(255,0,138,0.08) 0%, transparent 45%)",
              "#0a0a0a",
            ].join(","),
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ touchAction: "none" }}
        />
      )}
      <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>
    </div>
  );
}

export default TubesBackground;
