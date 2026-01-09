/**
 * Premium Three.js Scene Component
 * Ready-to-use Three.js setup with React Three Fiber
 * 
 * Usage:
 * import { ThreeScene } from '@/lib/threejs/ThreeScene';
 * 
 * <ThreeScene>
 *   <mesh>
 *     <boxGeometry args={[1, 1, 1]} />
 *     <meshStandardMaterial color="orange" />
 *   </mesh>
 * </ThreeScene>
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface ThreeSceneProps {
  children?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  environment?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ThreeScene({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  environment = true,
  className,
  style,
}: ThreeSceneProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={camera.position}
            fov={camera.fov}
          />
          {environment && <Environment preset="sunset" />}
          {controls && <OrbitControls enableDamping dampingFactor={0.05} />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
