# Next.js Premium Setup

This is a Next.js application with TypeScript and Three.js pre-configured and ready to use.

## Features

✅ **TypeScript** - Fully configured with strict mode  
✅ **Three.js** - React Three Fiber + Drei helpers  
✅ **App Router** - Next.js 14+ App Router  
✅ **Path Aliases** - Clean imports with `@/` prefix  
✅ **Examples** - Pre-built Three.js examples  

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking

```bash
npm run type-check
```

### Build

```bash
npm run build
npm start
```

## Usage

### Using Three.js

```tsx
import { BasicCubeExample } from '@/lib/threejs/examples/BasicCube';

export default function Home() {
  return <BasicCubeExample />;
}
```

### Creating Pages

Create files in `src/app/`:

```tsx
// src/app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>;
}
```

### Path Aliases

Use `@/` prefix for clean imports:

```tsx
import { ThreeScene } from '@/lib/threejs/ThreeScene';
import { Button } from '@/components/Button';
```

## Project Structure

```
apps/nextjs/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/              # Shared libraries
│       └── threejs/      # Three.js components
├── next.config.js
├── tsconfig.json
└── package.json
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
