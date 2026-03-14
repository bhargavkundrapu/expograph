import type { TourStep } from "../../TourEngine";

const tourKey = "lms_courses_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "courses-search-filter",
    title: "Search & filter",
    content: "Find courses quickly with search or filters.",
    placement: "bottom",
  },
  {
    target: "course-card",
    title: "Course card",
    content: "Each card shows progress and a quick way to continue.",
    placement: "top",
  },
  {
    target: "course-progress-label",
    title: "Progress",
    content: "Your completion percentage for this course.",
    placement: "bottom",
  },
  {
    target: "course-cta-continue",
    title: "Continue",
    content: "Click to open the course and resume or start lessons.",
    placement: "top",
  },
  {
    target: "pack-upsell-banner",
    title: "Get more",
    content: "Upgrade to the pack to unlock all courses and features.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
