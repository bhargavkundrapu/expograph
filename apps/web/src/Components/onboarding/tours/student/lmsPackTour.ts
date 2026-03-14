import type { TourStep } from "../../TourEngine";

const tourKey = "lms_pack_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "pack-benefits",
    title: "Pack benefits",
    content: "Everything included in the pack: all courses, Real Client Lab, Resume Builder.",
    placement: "bottom",
  },
  {
    target: "pack-pricing",
    title: "Pricing",
    content: "One price for full access. No hidden fees.",
    placement: "left",
  },
  {
    target: "pack-unlocks",
    title: "What unlocks",
    content: "See exactly what you get when you upgrade.",
    placement: "top",
  },
  {
    target: "pack-buy-btn",
    title: "Buy",
    content: "Click to complete your purchase securely.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
