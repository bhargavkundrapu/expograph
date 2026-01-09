/**
 * Interactive Three.js Scene Example
 * Advanced example with user interaction
 */

import { ThreeScene } from '../ThreeScene';
import * as THREE from 'three';

export function InteractiveSceneExample() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene
        onSetup={({ scene, camera, renderer, clock }) => {
          const geom = new THREE.BoxGeometry(1, 1, 1);
          const mats = [
            new THREE.MeshStandardMaterial({ color: 0xff8a00 }),
            new THREE.MeshStandardMaterial({ color: 0x22c55e }),
            new THREE.MeshStandardMaterial({ color: 0x3b82f6 }),
          ];

          const cubes = [
            new THREE.Mesh(geom, mats[0]),
            new THREE.Mesh(geom, mats[1]),
            new THREE.Mesh(geom, mats[2]),
          ];
          cubes[0].position.set(-2, 0, 0);
          cubes[1].position.set(0, 0, 0);
          cubes[2].position.set(2, 0, 0);
          cubes.forEach((c) => scene.add(c));

          const raycaster = new THREE.Raycaster();
          const pointer = new THREE.Vector2();
          let hovered: THREE.Object3D | null = null;
          const clicked = new Set<THREE.Object3D>();

          function updatePointer(ev: PointerEvent) {
            const rect = renderer.domElement.getBoundingClientRect();
            pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
          }

          function onMove(ev: PointerEvent) {
            updatePointer(ev);
          }

          function onClick() {
            if (!hovered) return;
            if (clicked.has(hovered)) clicked.delete(hovered);
            else clicked.add(hovered);
          }

          renderer.domElement.addEventListener('pointermove', onMove);
          renderer.domElement.addEventListener('click', onClick);

          return {
            onFrame: () => {
              const delta = clock.getDelta();
              cubes.forEach((c) => (c.rotation.x += delta * 0.5));

              raycaster.setFromCamera(pointer, camera);
              const hits = raycaster.intersectObjects(cubes, false);
              hovered = hits[0]?.object ?? null;

              cubes.forEach((c) => {
                const isHovered = hovered === c;
                const isClicked = clicked.has(c);
                c.scale.setScalar(isClicked ? 1.5 : 1);
                // subtle hover highlight
                const m = c.material as THREE.MeshStandardMaterial;
                m.emissive.setHex(isHovered ? 0x330033 : 0x000000);
              });
            },
            dispose: () => {
              renderer.domElement.removeEventListener('pointermove', onMove);
              renderer.domElement.removeEventListener('click', onClick);
              geom.dispose();
              mats.forEach((m) => m.dispose());
            },
          };
        }}
      />
    </div>
  );
}
