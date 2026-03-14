import type { TourStep } from "../../TourEngine";

const tourKey = "lms_course_detail_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "course-overview",
    title: "Course overview",
    content: "What you'll learn and what's included in this course.",
    placement: "bottom",
  },
  {
    target: "modules-list",
    title: "Modules",
    content: "Lessons are grouped into modules. Complete them in order.",
    placement: "right",
  },
  {
    target: "lesson-count-progress",
    title: "Progress",
    content: "See how many lessons you've completed and total count.",
    placement: "left",
  },
  {
    target: "course-start-continue",
    title: "Start or continue",
    content: "Open the first or next lesson to continue learning.",
    placement: "top",
  },
  {
    target: "course-requirements-benefits",
    title: "Requirements & benefits",
    content: "Prerequisites and what you'll gain from this course.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
