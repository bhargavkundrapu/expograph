import type { TourStep } from "../../TourEngine";

const tourKey = "lms_resume_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "resume-form-sections",
    title: "Resume sections",
    content: "Fill in your details in each section. We keep it simple and ATS-friendly.",
    placement: "right",
  },
  {
    target: "resume-live-preview",
    title: "Live preview",
    content: "See how your resume looks as you edit.",
    placement: "left",
  },
  {
    target: "resume-template-switch",
    title: "Templates",
    content: "Switch between templates to match your style.",
    placement: "bottom",
  },
  {
    target: "resume-download-pdf",
    title: "Download PDF",
    content: "Download your resume as a PDF when you're ready.",
    placement: "top",
  },
  {
    target: "resume-tips",
    title: "Tips",
    content: "Keep it to one page when possible. ATS-friendly formatting is applied automatically.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
