import type { TourStep } from "../../TourEngine";

const tourKey = "lms_home_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "nav-courses",
    title: "Courses",
    content: "Jump to your courses and pick up where you left off.",
    placement: "right",
  },
  {
    target: "pack-upgrade-card",
    title: "Unlock more",
    content: "Upgrade to the full pack to get all courses, Real Client Lab, and Resume Builder.",
    placement: "bottom",
    fallbackTargets: ["pack-upgrade-btn"],
  },
  {
    target: "progress-widget",
    title: "Your progress",
    content: "See your completion %, streak, and level at a glance.",
    placement: "left",
  },
  {
    target: "certifications-shortcut",
    title: "Certificates",
    content: "Complete courses to 100% to unlock certificates you can download and share.",
    placement: "right",
  },
  {
    target: "resume-builder-shortcut",
    title: "Resume Builder",
    content: "Build an ATS-friendly resume and download it as PDF.",
    placement: "right",
  },
  {
    target: "client-lab-shortcut",
    title: "Real Client Lab",
    content: "Work on real projects once you meet the eligibility criteria.",
    placement: "right",
  },
  {
    target: "support-help-btn",
    title: "Support",
    content: "Need help? Open Support for FAQs and contact options.",
    placement: "left",
  },
];

export { tourKey, tourVersion, steps };
