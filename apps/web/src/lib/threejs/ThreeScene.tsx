/**
 * Premium Three.js Scene Component
 * Ready-to-use Three.js setup (pure Three.js, no React peer dependency conflicts)
 * 
 * Usage:
 * import { ThreeScene } from '@/lib/threejs/ThreeScene';
 * 
 * <ThreeScene
 *   onSetup={({ scene }) => {
 *     // add objects to scene
 *   }}
 * />
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useThreePauseOnHiddenOrOffscreen } from '../../hooks/useThreePauseOnHiddenOrOffscreen';

interface ThreeSceneProps {
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  /** Called once after scene/camera/renderer are created. Return optional cleanup + per-frame callback. */
  onSetup?: (ctx: ThreeSetupContext) => void | ThreeSetupResult;
  className?: string;
  style?: React.CSSProperties;
}

export type ThreeSetupContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls?: OrbitControls;
  clock: THREE.Clock;
  container: HTMLDivElement;
};

export type ThreeSetupResult = {
  onFrame?: (ctx: ThreeSetupContext) => void;
  dispose?: () => void;
};

function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyObj = obj as any;
    if (anyObj.geometry && typeof anyObj.geometry.dispose === 'function') anyObj.geometry.dispose();
    if (anyObj.material) {
      const mat = anyObj.material;
      if (Array.isArray(mat)) mat.forEach((m) => m?.dispose?.());
      else mat?.dispose?.();
    }
  });
}

/** Safe DPR cap for medium viewports to reduce GPU load (stable, no FPS-based oscillation). */
function getPixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio || 1;
  const isMedium = typeof window.matchMedia !== 'undefined' && window.matchMedia('(min-width: 768px) and (max-width: 1280px)').matches;
  return isMedium ? Math.min(dpr, 1.5) : Math.min(dpr, 2);
}

export function ThreeScene({
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  onSetup,
  className,
  style,
}: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sceneContext, setSceneContext] = useState<{ renderer: THREE.WebGLRenderer; tick: (time: number) => void } | null>(null);

  useThreePauseOnHiddenOrOffscreen(containerRef, sceneContext);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f19);

    const cam = new THREE.PerspectiveCamera(
      camera.fov ?? 75,
      1,
      0.1,
      1000
    );
    cam.position.set(...(camera.position ?? [0, 0, 5]));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(getPixelRatio());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // lights (sane defaults)
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 5, 5);
    scene.add(ambient, dir);

    let orbit: OrbitControls | undefined;
    if (controls) {
      orbit = new OrbitControls(cam, renderer.domElement);
      orbit.enableDamping = true;
      orbit.dampingFactor = 0.05;
    }

    const clock = new THREE.Clock();
    const ctx: ThreeSetupContext = { scene, camera: cam, renderer, controls: orbit, clock, container };

    const setupResult = onSetup?.(ctx);
    const onFrame = typeof setupResult === 'object' ? setupResult?.onFrame : undefined;
    const dispose = typeof setupResult === 'object' ? setupResult?.dispose : undefined;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const tick = () => {
      orbit?.update();
      onFrame?.(ctx);
      renderer.render(scene, cam);
    };
    setSceneContext({ renderer, tick });

    return () => {
      setSceneContext(null);
      ro.disconnect();
      renderer.setAnimationLoop(null);
      try {
        dispose?.();
      } catch {
        // ignore
      }
      orbit?.dispose();
      disposeScene(scene);
      renderer.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      {/* Canvas injected by Three.js */}
    </div>
  );
}
