export type ScreenshotKey =
  | 'academyHero'
  | 'lmsHome'
  | 'smartPrompts'
  | 'clientLab'
  | 'careerTools'
  | 'launchpad'
  | 'coursesCatalog'
  | 'studentDashboard'
  | 'lessonView'
  | 'promptDrawer'
  | 'projectSubmission'
  | 'resumeBuilder'
  | 'jobsHub'
  | 'certificateView'
  | 'pricingBlock'
  | 'testimonialCard';

export type ScreenshotMap = Record<ScreenshotKey, string>;

export const SCREENSHOTS: ScreenshotMap = {
  academyHero: '/presentation/placeholder-product.svg',
  lmsHome: '/presentation/placeholder-product.svg',
  smartPrompts: '/presentation/placeholder-product.svg',
  clientLab: '/presentation/placeholder-product.svg',
  careerTools: '/presentation/placeholder-product.svg',
  launchpad: '/presentation/placeholder-product.svg',
  coursesCatalog: '/presentation/placeholder-product.svg',
  studentDashboard: '/presentation/placeholder-product.svg',
  lessonView: '/presentation/placeholder-product.svg',
  promptDrawer: '/presentation/placeholder-product.svg',
  projectSubmission: '/presentation/placeholder-product.svg',
  resumeBuilder: '/presentation/placeholder-product.svg',
  jobsHub: '/presentation/placeholder-product.svg',
  certificateView: '/presentation/placeholder-product.svg',
  pricingBlock: '/presentation/placeholder-product.svg',
  testimonialCard: '/presentation/placeholder-product.svg',
};

export const SCREENSHOT_ALT: Record<ScreenshotKey, string> = {
  academyHero: 'ExpoGraph Academy — placeholder screenshot',
  lmsHome: 'ExpoGraph LMS — placeholder screenshot',
  smartPrompts: 'ExpoGraph Smart Prompts — placeholder screenshot',
  clientLab: 'ExpoGraph Client Lab — placeholder screenshot',
  careerTools: 'ExpoGraph Career Tools — placeholder screenshot',
  launchpad: 'ExpoGraph LaunchPad — placeholder screenshot',
  coursesCatalog: 'ExpoGraph course catalog — placeholder screenshot',
  studentDashboard: 'ExpoGraph student dashboard — placeholder screenshot',
  lessonView: 'ExpoGraph lesson view — placeholder screenshot',
  promptDrawer: 'ExpoGraph prompt drawer — placeholder screenshot',
  projectSubmission: 'ExpoGraph project submission — placeholder screenshot',
  resumeBuilder: 'ExpoGraph resume builder — placeholder screenshot',
  jobsHub: 'ExpoGraph jobs hub — placeholder screenshot',
  certificateView: 'ExpoGraph certificate view — placeholder screenshot',
  pricingBlock: 'ExpoGraph pricing section — placeholder screenshot',
  testimonialCard: 'ExpoGraph social proof card — placeholder screenshot',
};

