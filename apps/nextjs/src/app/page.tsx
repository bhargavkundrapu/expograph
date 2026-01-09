'use client';

import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.js Premium Setup</h1>
      <p>TypeScript + Three.js + Next.js ready to use!</p>
      <div style={{ marginTop: '2rem' }}>
        <BasicCubeExample />
      </div>
    </main>
  );
}
