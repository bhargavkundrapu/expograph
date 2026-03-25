/**
 * Detects lazy / Vite chunk load failures (stale dev cache, flaky network, etc.).
 * Used by route error UI and root error boundaries so "Try again" can full-reload.
 */
export function isChunkLoadError(error) {
  const msg = error?.message ?? String(error ?? "");
  return (
    msg.includes("Loading chunk") ||
    msg.includes("ChunkLoadError") ||
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("Outdated Optimize Dep")
  );
}

export function chunkLoadUserMessage() {
  return "The page didn’t load completely — often after a dev server restart. Try again to refresh.";
}
