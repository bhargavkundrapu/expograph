/**
 * Student LMS product captures for `/presentation` (Cloudinary).
 * Keys line up with `masterDeck` screenshotKey / galleryKeys.
 */

const Q = "w=1600&q=80&auto=format";

export type ScreenshotKey =
  | "academyHero"
  | "lmsHome"
  | "smartPrompts"
  | "clientLab"
  | "careerTools"
  | "launchpad"
  | "coursesCatalog"
  | "studentDashboard"
  | "lessonView"
  | "promptDrawer"
  | "projectSubmission"
  | "resumeBuilder"
  | "jobsHub"
  | "certificateView"
  | "pricingBlock"
  | "testimonialCard"
  | "bookmarksNotes"
  | "lessonErrorsTab";

export type ScreenshotMap = Record<ScreenshotKey, string>;

const U = {
  certificates:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428872/Screenshot_2026-04-08_210436_cciido.png?${Q}`,
  realClientLab:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428872/Screenshot_2026-04-08_210312_vmk9k0.png?${Q}`,
  studentDashboard:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428872/Screenshot_2026-04-08_140838_uttqfi.png?${Q}`,
  bookmarksNotes:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428872/Screenshot_2026-04-08_212716_iutjq0.png?${Q}`,
  jobsHub:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428870/Screenshot_2026-04-08_140923_khwspd.png?${Q}`,
  resumeBuilder:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428870/Screenshot_2026-04-08_141627_re8d3q.png?${Q}`,
  myLearning:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428871/Screenshot_2026-04-08_141700_s9r3rx.png?${Q}`,
  promptsTab:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428868/Screenshot_2026-04-17_175626_mxxrbe.png?${Q}`,
  commandsTab:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428868/Screenshot_2026-04-17_175637_svpzuh.png?${Q}`,
  errorsTab:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428868/Screenshot_2026-04-17_175650_w8ktrp.png?${Q}`,
  launchpad:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428868/Screenshot_2026-04-08_140906_vv8zqp.png?${Q}`,
  profile:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776428866/Screenshot_2026-04-08_212736_udbeu6.png?${Q}`,
  videoLesson:
    `https://res.cloudinary.com/da2wrgabu/image/upload/v1776666196/Screenshot_2026-04-20_115230_sxb8z1.png?${Q}`,
} as const;

export const SCREENSHOTS: ScreenshotMap = {
  academyHero: U.studentDashboard,
  lmsHome: U.myLearning,
  smartPrompts: U.promptsTab,
  clientLab: U.realClientLab,
  careerTools: U.jobsHub,
  launchpad: U.launchpad,
  coursesCatalog: U.videoLesson
  ,
  studentDashboard: U.studentDashboard,
  lessonView: U.commandsTab,
  promptDrawer: U.promptsTab,
  projectSubmission: U.realClientLab,
  resumeBuilder: U.resumeBuilder,
  jobsHub: U.jobsHub,
  certificateView: U.certificates,
  pricingBlock: U.myLearning,
  testimonialCard: U.profile,
  bookmarksNotes: U.bookmarksNotes,
  lessonErrorsTab: U.errorsTab,
};

export const SCREENSHOT_ALT: Record<ScreenshotKey, string> = {
  academyHero: "ExpoGraph student LMS dashboard with welcome, goals, and continue learning",
  lmsHome: "ExpoGraph My Learning Path — course cards with progress and continue learning",
  smartPrompts: "Lesson view — Prompts tab with copy-ready AI prompt in the editor",
  clientLab: "Real Client Lab — assigned projects and Client Lab actions",
  careerTools: "Jobs Search Hub — career presets and search configuration",
  launchpad: "Startup LaunchPad — founder path home and feature highlights",
  coursesCatalog: "Student courses — My Learning Path grid",
  studentDashboard: "Student home dashboard — streak, XP, continue learning, and syllabus",
  lessonView: "Lesson view — Commands tab with terminal-style command list",
  promptDrawer: "Lesson view — Prompts tab with structured AI prompt",
  projectSubmission: "Real Client Lab project cards and status",
  resumeBuilder: "Resume Builder — form fields and live PDF preview",
  jobsHub: "Jobs Search Hub — quick presets and search form",
  certificateView: "Certifications — progress, request flow, and download",
  pricingBlock: "Course learning overview — value and progression",
  testimonialCard: "Student profile — XP, level, streak, and personal details",
  bookmarksNotes: "Bookmarks and Notes — saved lessons and personal notes",
  lessonErrorsTab: "Lesson view — Error handling tab with AI-assisted debug template",
};
