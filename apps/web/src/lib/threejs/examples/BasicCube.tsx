/**
 * Basic Three.js Cube Example
 * Instant example to get started with Three.js
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ThreeScene } from '../ThreeScene';

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export function BasicCubeExample() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene>
        <RotatingCube />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </ThreeScene>
    </div>
  );
}
