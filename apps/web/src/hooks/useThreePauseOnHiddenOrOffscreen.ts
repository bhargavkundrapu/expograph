import { useEffect, useRef } from "react";
import type * as THREE from "three";

export interface ThreePauseInput {
  renderer: THREE.WebGLRenderer;
  /** The loop function passed to setAnimationLoop (e.g. () => { update(); renderer.render(scene, camera); }) */
  tick: (time: number, frame?: XRSession) => void;
}

/**
 * Pauses Three.js rendering when the canvas wrapper is offscreen or document is hidden.
 * Uses IntersectionObserver + visibilitychange. Each canvas on the page should use its own instance.
 */
export function useThreePauseOnHiddenOrOffscreen(
  containerRef: React.RefObject<HTMLElement | null>,
  input: ThreePauseInput | null
) {
  const inputRef = useRef<ThreePauseInput | null>(null);
  inputRef.current = input;

  useEffect(() => {
    const container = containerRef.current;
    const state = inputRef.current;
    if (!container || !state) return;

    const { renderer, tick } = state;
    let isIntersecting = true;
    let isVisible = !document.hidden;

    const applyLoop = () => {
      if (isIntersecting && isVisible) {
        renderer.setAnimationLoop(tick);
      } else {
        renderer.setAnimationLoop(null);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (e) {
          isIntersecting = e.isIntersecting;
          applyLoop();
        }
      },
      { rootMargin: "0px", threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isVisible = !document.hidden;
      applyLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    applyLoop();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.setAnimationLoop(null);
    };
  }, [containerRef, input]);
}
