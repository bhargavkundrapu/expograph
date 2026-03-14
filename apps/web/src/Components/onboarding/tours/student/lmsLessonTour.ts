import type { TourStep } from "../../TourEngine";

const tourKey = "lms_lesson_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "lesson-content",
    title: "Lesson content",
    content: "Watch the video and read the content here. Use the sidebar to jump between lessons.",
    placement: "top",
  },
  {
    target: "lesson-nav-prev",
    title: "Previous lesson",
    content: "Go back to the previous lesson in this module.",
    placement: "right",
  },
  {
    target: "lesson-nav-next",
    title: "Next lesson",
    content: "Move to the next lesson when you're done.",
    placement: "left",
  },
  {
    target: "lesson-complete",
    title: "Mark complete",
    content: "Mark this lesson complete to track progress and earn XP.",
    placement: "top",
  },
  {
    target: "lesson-resources",
    title: "Resources",
    content: "Downloads, cheatsheets, and links for this lesson.",
    placement: "top",
  },
  {
    target: "lesson-notes",
    title: "Notes",
    content: "Add private notes and bookmarks for this lesson.",
    placement: "top",
  },
  {
    target: "lesson-quiz",
    title: "Quiz & practice",
    content: "Test your understanding with MCQs or practice tasks if available.",
    placement: "top",
  },
  {
    target: "lesson-progress",
    title: "Progress",
    content: "Your progress in this module and course is shown here.",
    placement: "bottom",
  },
];

export { tourKey, tourVersion, steps };
