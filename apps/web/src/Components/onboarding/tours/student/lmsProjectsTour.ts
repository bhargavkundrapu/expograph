import type { TourStep } from "../../TourEngine";

const tourKey = "lms_projects_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "projects-submit",
    title: "Submit project",
    content: "Submit your project work for review from here.",
    placement: "bottom",
  },
  {
    target: "projects-rubric-review",
    title: "Rubric & review",
    content: "See the rubric and feedback from mentors.",
    placement: "left",
  },
  {
    target: "projects-demo-day",
    title: "Demo day",
    content: "Browse the demo day gallery and see others' work.",
    placement: "top",
  },
  {
    target: "projects-portfolio-link",
    title: "Portfolio",
    content: "Link to your portfolio or project showcase.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
