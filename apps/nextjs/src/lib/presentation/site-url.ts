/**
 * Main marketing site / Academy base URL for CTAs.
 * Set NEXT_PUBLIC_EXPOGRAPH_SITE_URL in production (e.g. https://your-domain.com).
 */
export function getSiteBase(): string {
  return process.env.NEXT_PUBLIC_EXPOGRAPH_SITE_URL?.replace(/\/$/, '') ?? '';
}

export function getAcademyUrl(): string {
  const base = getSiteBase();
  if (!base) return '/academy';
  return `${base}/academy`;
}

export function getCoursesUrl(): string {
  const base = getSiteBase();
  if (!base) return '/courses';
  return `${base}/courses`;
}

export function getLoginUrl(): string {
  const base = getSiteBase();
  if (!base) return '/login';
  return `${base}/login`;
}
