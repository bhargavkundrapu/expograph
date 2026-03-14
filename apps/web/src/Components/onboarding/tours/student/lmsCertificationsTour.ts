import type { TourStep } from "../../TourEngine";

const tourKey = "lms_certifications_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "cert-complete-to-unlock",
    title: "Complete to unlock",
    content: "Finish the course to 100% to unlock the certificate.",
    placement: "bottom",
  },
  {
    target: "cert-progress-bars",
    title: "Progress",
    content: "Track completion for each course that offers a certificate.",
    placement: "left",
  },
  {
    target: "cert-request-flow",
    title: "Request certificate",
    content: "Once eligible, request your certificate from here.",
    placement: "top",
  },
  {
    target: "cert-status-badges",
    title: "Status",
    content: "See whether a certificate is pending, issued, or ready to download.",
    placement: "bottom",
  },
  {
    target: "cert-download",
    title: "Download",
    content: "Download your issued certificate as PDF.",
    placement: "left",
  },
];

export { tourKey, tourVersion, steps };
