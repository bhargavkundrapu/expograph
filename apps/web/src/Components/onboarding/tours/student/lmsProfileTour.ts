import type { TourStep } from "../../TourEngine";

const tourKey = "lms_profile_tour";
const tourVersion = 1;

const steps: TourStep[] = [
  {
    target: "profile-update",
    title: "Update profile",
    content: "Keep your name, email, and phone up to date.",
    placement: "bottom",
  },
  {
    target: "profile-college-branch",
    title: "College & branch",
    content: "Add your college and branch if shown. Helps us personalize your experience.",
    placement: "top",
  },
  {
    target: "profile-notifications",
    title: "Notifications",
    content: "Choose how you want to be notified about courses and events.",
    placement: "left",
  },
  {
    target: "profile-support-channel",
    title: "Support",
    content: "Quick link to support and help resources.",
    placement: "top",
  },
];

export { tourKey, tourVersion, steps };
