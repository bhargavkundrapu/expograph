# Components UI

This folder follows the **shadcn-style** structure for reusable UI primitives and effects.

- **Path:** `src/Components/ui` (alias `@/components` → `src/Components`, so `@/components/ui/<name>` works).
- **Why `components/ui`?**  
  Keeps design-system and third-party-style components (e.g. isometric backgrounds, buttons, cards) in one place. If your project used `/components` instead of `/Components`, create a `components/ui` folder and add the alias `"@/components": "./src/components"` in `vite.config.js` so shadcn CLI and imports resolve correctly.

- **Stack:** Tailwind CSS (via `@tailwindcss/vite`), TypeScript (`.tsx`), and `cn()` from `@/lib/utils` for class merging. No extra setup needed for Tailwind or TypeScript in this project.

- **Current components:**
  - `isometric-wave-grid-background.tsx` — **IsoLevelWarp**: animated isometric wave grid with mouse interaction; used in the Academy hero. Props: `color` (RGB string), `speed`, `density`, `className`.

