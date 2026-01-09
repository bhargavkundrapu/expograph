/**
 * Interactive Three.js Scene Example
 * Advanced example with user interaction
 */

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ThreeScene } from '../ThreeScene';

function InteractiveBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export function InteractiveSceneExample() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene>
        <InteractiveBox position={[-2, 0, 0]} />
        <InteractiveBox position={[0, 0, 0]} />
        <InteractiveBox position={[2, 0, 0]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </ThreeScene>
    </div>
  );
}
