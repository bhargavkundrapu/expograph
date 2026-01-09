/**
 * Basic Three.js Cube Example
 * Instant example to get started with Three.js
 */

import { ThreeScene } from '../ThreeScene';
import * as THREE from 'three';

export function BasicCubeExample() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene
        onSetup={({ scene, clock }) => {
          const geom = new THREE.BoxGeometry(1, 1, 1);
          const mat = new THREE.MeshStandardMaterial({ color: 0xff8a00 });
          const cube = new THREE.Mesh(geom, mat);
          scene.add(cube);

          return {
            onFrame: () => {
              const delta = clock.getDelta();
              cube.rotation.x += delta;
              cube.rotation.y += delta * 0.5;
            },
            dispose: () => {
              geom.dispose();
              mat.dispose();
            },
          };
        }}
      />
    </div>
  );
}
