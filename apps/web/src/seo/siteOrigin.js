/**
 * Canonical / OG URL origin. Set VITE_PUBLIC_SITE_ORIGIN in production (e.g. https://expograph.in).
 */
export function getSiteOrigin() {
  const raw = typeof import.meta !== "undefined" && import.meta.env?.VITE_PUBLIC_SITE_ORIGIN;
  if (raw && String(raw).trim()) {
    return String(raw).replace(/\/+$/, "");
  }
  return "https://expograph.in";
}

export function absoluteUrl(pathname) {
  const origin = getSiteOrigin();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}
