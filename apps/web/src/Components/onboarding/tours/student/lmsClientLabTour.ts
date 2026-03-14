import type { TourStep } from "../../TourEngine";

const tourKey = "lms_clientlab_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "clientlab-eligibility",
    title: "Eligibility",
    content: "Complete the required courses and criteria to become eligible for Real Client Lab.",
    placement: "bottom",
  },
  {
    target: "clientlab-apply",
    title: "Apply",
    content: "Apply for a slot when you're eligible.",
    placement: "top",
  },
  {
    target: "clientlab-slots-priority",
    title: "Slots & priority",
    content: "Pack members may get priority. Check slot availability here.",
    placement: "left",
  },
  {
    target: "clientlab-status",
    title: "Status",
    content: "Track your application and project status here.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
