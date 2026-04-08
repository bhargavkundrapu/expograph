# ExpoGraph presentation (Next.js)

Single-purpose app: the **ExpoGraph product deck** at **`/presentation`**. Visiting **`/`** redirects to **`/presentation`**.

## Local

```bash
npm install
npm run dev
```

- Deck: [http://localhost:3000/presentation](http://localhost:3000/presentation) (or [http://localhost:3000](http://localhost:3000) → redirect)

## Deploy

| Platform | What to set |
|----------|-------------|
| **Vercel** | Root directory: **`apps/nextjs`**. Framework: Next.js (auto). Build: `npm run build`, Output: default. |
| **Render** | **Web Service** (not Static Site). Root: **`apps/nextjs`**. Build: `npm install && npm run build`. Start: `npm run start`. No “Publish directory”. Or use repo-root **`render.yaml`**. |

Optional env: copy **`.env.example`** → **`.env.local`** and set `NEXT_PUBLIC_EXPOGRAPH_SITE_URL` for CTAs in the deck.

## Routes

- **`/presentation`** — product deck (canonical)
- **`/`** — redirects to `/presentation`
- **`/deck`**, **`/product-story`** — permanent redirects to `/presentation`

## Structure

```
src/app/
  layout.tsx, globals.css, page.tsx   # root → redirect
  presentation/
    layout.tsx                        # deck metadata
    page.tsx                          # deck entry
src/components/presentation/          # UI
src/content/presentation/             # copy & structure (masterDeck.ts)
```
