/**
 * Placeholder paths for presentation frames.
 * Replace files in /public/presentation/ with real screenshots when available.
 */

export type ScreenshotMap = {
  hero: string;
  dashboard: string;
  lessonPrompts: string;
  clientLab: string;
  jobsHub: string;
  launchpad: string;
  certificates: string;
  pricing: string;
};

/** Default: shared placeholder - swap per key with real PNG/WebP when available */
const P = '/presentation/placeholder-product.svg';

export const SCREENSHOTS: ScreenshotMap = {
  hero: P,
  dashboard: P,
  lessonPrompts: P,
  clientLab: P,
  jobsHub: P,
  launchpad: P,
  certificates: P,
  pricing: P,
};

export const SCREENSHOT_ALT: Record<keyof ScreenshotMap, string> = {
  hero: 'ExpoGraph Academy marketing hero - placeholder for product screenshot',
  dashboard: 'Student LMS dashboard - placeholder',
  lessonPrompts: 'Lesson view with Smart Prompt library - placeholder',
  clientLab: 'Real Client Lab projects - placeholder',
  jobsHub: 'Jobs Search Hub interface - placeholder',
  launchpad: 'Startup LaunchPad - placeholder',
  certificates: 'Certificates area - placeholder',
  pricing: 'Courses and pricing - placeholder',
};
