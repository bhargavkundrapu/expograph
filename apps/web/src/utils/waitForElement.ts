/**
 * Poll for a DOM element matching selector. Used by TourEngine to wait for
 * async-rendered targets (e.g. lesson content) before showing a step.
 * @param selector - CSS selector or data-tour attribute selector e.g. [data-tour="lesson-content"]
 * @param timeoutMs - Max wait time
 * @param interval - Poll interval
 * @returns true if element exists, false if timeout
 */
export function waitForElement(
  selector: string,
  timeoutMs: number = 3500,
  interval: number = 100
): Promise<boolean> {
  if (typeof document === "undefined") return Promise.resolve(false);

  // Use as-is if already a CSS selector; otherwise treat as data-tour value (e.g. "nav-courses" -> [data-tour="nav-courses"])
  const resolvedSelector =
    selector.startsWith("[") || selector.startsWith(".") || selector.startsWith("#")
      ? selector
      : "[data-tour=\"" + selector.replace(/"/g, "\\\"") + "\"]";

  return new Promise((resolve) => {
    const el = document.querySelector(resolvedSelector);
    if (el) {
      resolve(true);
      return;
    }
    const deadline = Date.now() + timeoutMs;
    const t = setInterval(() => {
      if (Date.now() >= deadline) {
        clearInterval(t);
        resolve(false);
        return;
      }
      const elem = document.querySelector(resolvedSelector);
      if (elem) {
        clearInterval(t);
        resolve(true);
      }
    }, interval);
  });
}

/**
 * Resolve the first selector that matches (for primary + fallbackTargets).
 */
export async function waitForAnyElement(
  selectors: string[],
  timeoutMs: number = 3500,
  interval: number = 100
): Promise<string | null> {
  for (const sel of selectors) {
    const found = await waitForElement(sel, timeoutMs, interval);
    if (found) return sel;
  }
  return null;
}
