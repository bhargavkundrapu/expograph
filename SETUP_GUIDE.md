# Premium Setup Guide: TypeScript + Three.js + Next.js

This guide explains how to use the premium setup for TypeScript, Three.js, and Next.js that's ready to use instantly.

## 📋 Table of Contents

1. [TypeScript Setup](#typescript-setup)
2. [Three.js Setup](#threejs-setup)
3. [Next.js Setup](#nextjs-setup)
4. [Quick Start Examples](#quick-start-examples)
5. [Migration Guide](#migration-guide)

---

## TypeScript Setup

### Frontend (Vite + React)

TypeScript is configured and ready to use. You can write `.ts` and `.tsx` files alongside existing `.js` and `.jsx` files.

**Configuration Files:**
- `apps/web/tsconfig.json` - Main TypeScript config
- `apps/web/tsconfig.node.json` - Node-specific config
- `apps/web/vite.config.js` - Updated with path aliases

**Path Aliases Available:**
```typescript
import { something } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/api';
```

**Type Checking:**
```bash
cd apps/web
npm run type-check        # One-time check
npm run type-check:watch  # Watch mode
```

**Usage:**
Simply create `.ts` or `.tsx` files and start using TypeScript:
```typescript
// src/components/Button.tsx
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Backend (Node.js/Express)

TypeScript is configured for gradual migration.

**Configuration Files:**
- `apps/api/tsconfig.json` - TypeScript config

**Scripts:**
```bash
cd apps/api
npm run type-check        # Check types
npm run build:ts         # Compile to JavaScript
npm run start:ts         # Run compiled code
```

**Usage:**
Create `.ts` files in `src/` directory:
```typescript
// src/utils/httpError.ts
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
```

---

## Three.js Setup

Three.js is fully configured with React Three Fiber and Drei helpers.

### Installation

Dependencies are already added to `apps/web/package.json`:
- `three` - Core Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers and abstractions

### Quick Start

**1. Use the Premium ThreeScene Component:**
```tsx
import { ThreeScene } from '@/lib/threejs/ThreeScene';

function MyComponent() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
      </ThreeScene>
    </div>
  );
}
```

**2. Use Pre-built Examples:**
```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';
import { InteractiveSceneExample } from '@/lib/threejs/examples/InteractiveScene';

// Use directly
<BasicCubeExample />
<InteractiveSceneExample />
```

**3. Create Custom Scenes:**
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function CustomScene() {
  return (
    <Canvas>
      <OrbitControls />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}
```

### Available Components

- `ThreeScene` - Premium wrapper with camera, controls, and environment
- `BasicCubeExample` - Rotating cube example
- `InteractiveSceneExample` - Interactive boxes with hover/click

### Documentation

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)

---

## Next.js Setup

Next.js is set up as a parallel application in `apps/nextjs/` directory.

### Installation

```bash
cd apps/nextjs
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Features

- ✅ TypeScript configured
- ✅ Three.js ready to use
- ✅ App Router (Next.js 14+)
- ✅ Path aliases configured
- ✅ ESLint configured

### Project Structure

```
apps/nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/
│       └── threejs/
│           ├── ThreeScene.tsx
│           └── examples/
│               └── BasicCube.tsx
├── next.config.js
├── tsconfig.json
└── package.json
```

### Usage

Create pages in `src/app/`:
```tsx
// src/app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>;
}
```

Use Three.js:
```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';

export default function Home() {
  return <BasicCubeExample />;
}
```

---

## Quick Start Examples

### Example 1: TypeScript Component

```tsx
// src/components/Counter.tsx
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

export function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Example 2: Three.js Scene

```tsx
// src/pages/3DScene.tsx
import { ThreeScene } from '@/lib/threejs/ThreeScene';

export function Scene3D() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ThreeScene>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
      </ThreeScene>
    </div>
  );
}
```

### Example 3: Type-Safe API Call

```tsx
// src/services/api.ts
import type { ApiResponse, User } from '@/lib/typescript/types';
import { handleApiResponse } from '@/lib/typescript/utils';

export async function fetchUser(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  const data: ApiResponse<User> = await response.json();
  return handleApiResponse(data);
}
```

---

## Migration Guide

### Migrating JavaScript to TypeScript

**Step 1:** Rename file from `.js` to `.ts` or `.jsx` to `.tsx`

**Step 2:** Add type annotations:
```typescript
// Before (JS)
function greet(name) {
  return `Hello, ${name}!`;
}

// After (TS)
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

**Step 3:** Use type definitions from `@/lib/typescript/types`:
```typescript
import type { User, ApiResponse } from '@/lib/typescript/types';

function processUser(user: User): void {
  // Type-safe code
}
```

### Using Three.js in Existing Components

**Option 1:** Use the premium wrapper:
```tsx
import { ThreeScene } from '@/lib/threejs/ThreeScene';

// Add to any existing component
<ThreeScene>
  {/* Your 3D content */}
</ThreeScene>
```

**Option 2:** Use examples as reference:
```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';
// Copy and modify as needed
```

---

## Troubleshooting

### TypeScript Errors

If you see type errors:
1. Run `npm run type-check` to see all errors
2. Add `// @ts-ignore` above problematic lines (temporary)
3. Gradually add proper types

### Three.js Not Rendering

1. Ensure component has explicit width/height
2. Check browser console for errors
3. Verify Three.js dependencies are installed: `npm install`

### Next.js Issues

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Check `next.config.js` for configuration issues

---

## Premium Features

✅ **Gradual Migration** - Use TypeScript alongside JavaScript  
✅ **Path Aliases** - Clean imports with `@/` prefix  
✅ **Type Definitions** - Pre-built types in `@/lib/typescript/types`  
✅ **Three.js Wrapper** - Ready-to-use `ThreeScene` component  
✅ **Examples** - Pre-built examples to get started instantly  
✅ **Next.js Ready** - Parallel Next.js app ready to use  
✅ **No Breaking Changes** - Existing code continues to work  

---

## Support

For issues or questions:
1. Check the examples in `apps/web/src/lib/threejs/examples/`
2. Review TypeScript types in `apps/web/src/lib/typescript/types.ts`
3. Check Next.js setup in `apps/nextjs/`

Happy coding! 🚀
