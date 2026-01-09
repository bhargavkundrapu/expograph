# Quick Start Guide - Premium Setup

Get started with TypeScript, Three.js, and Next.js in seconds!

## 🚀 Installation

### 1. Install Frontend Dependencies

```bash
cd apps/web
npm install
```

This installs:
- TypeScript
- Three.js + React Three Fiber + Drei
- All type definitions

### 2. Install Backend Dependencies

```bash
cd apps/api
npm install
```

This installs:
- TypeScript
- Type definitions for Express, Node.js, etc.

### 3. Install Next.js App (Optional)

```bash
cd apps/nextjs
npm install
```

## 📝 Usage Examples

### TypeScript - Instant Use

**Create a TypeScript component:**
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
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Use type definitions:**
```tsx
import type { User, ApiResponse } from '@/lib/typescript/types';
import { handleApiResponse } from '@/lib/typescript/utils';

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  const data: ApiResponse<User> = await res.json();
  return handleApiResponse(data);
}
```

### Three.js - Instant Use

**Option 1: Use Premium Wrapper**
```tsx
import { ThreeScene } from '@/lib/threejs/ThreeScene';

function My3DScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ThreeScene>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <ambientLight intensity={0.5} />
      </ThreeScene>
    </div>
  );
}
```

**Option 2: Use Pre-built Examples**
```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';
import { InteractiveSceneExample } from '@/lib/threejs/examples/InteractiveScene';

// Use directly
<BasicCubeExample />
<InteractiveSceneExample />
```

### Next.js - Instant Use

**Start Next.js app:**
```bash
cd apps/nextjs
npm run dev
```

**Create a page:**
```tsx
// apps/nextjs/src/app/products/page.tsx
export default function Products() {
  return <h1>Products Page</h1>;
}
```

**Use Three.js in Next.js:**
```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';

export default function Home() {
  return <BasicCubeExample />;
}
```

## 🎯 Path Aliases

Use clean imports with `@/` prefix:

```tsx
// Instead of
import { Button } from '../../../components/Button';

// Use
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/api';
```

## ✅ Type Checking

**Frontend:**
```bash
cd apps/web
npm run type-check
```

**Backend:**
```bash
cd apps/api
npm run type-check
```

**Next.js:**
```bash
cd apps/nextjs
npm run type-check
```

## 📚 Available Libraries

### TypeScript Utilities
- `@/lib/typescript/types` - Type definitions
- `@/lib/typescript/utils` - Utility functions

### Three.js Components
- `@/lib/threejs/ThreeScene` - Premium scene wrapper
- `@/lib/threejs/examples/BasicCube` - Rotating cube
- `@/lib/threejs/examples/InteractiveScene` - Interactive scene

## 🔧 Configuration Files

- `apps/web/tsconfig.json` - Frontend TypeScript config
- `apps/api/tsconfig.json` - Backend TypeScript config
- `apps/nextjs/tsconfig.json` - Next.js TypeScript config
- `apps/web/vite.config.js` - Vite config with path aliases
- `apps/nextjs/next.config.js` - Next.js config

## 🎨 Examples Location

All examples are in:
- `apps/web/src/lib/threejs/examples/`
- `apps/nextjs/src/lib/threejs/examples/`

## 📖 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for comprehensive documentation.

---

**That's it! You're ready to use TypeScript, Three.js, and Next.js instantly! 🎉**
