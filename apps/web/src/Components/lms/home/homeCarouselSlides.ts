/**
 * Pack marketing carousel: dynamic slides by user state.
 * NOT_PACK: 6 slides pushing pack purchase.
 * PACK: 3 slides on completion, client lab, certificates (no upsell).
 */

export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  route: string;
  variant?: "pack" | "not-pack";
};

/** Pack/pricing lives at /courses; student LMS at /lms/student/... */
const NOT_PACK_SLIDES: Slide[] = [
  {
    id: "s1",
    title: "Upgrade to Pack ₹199",
    subtitle: "All 3 courses + certificates + client slots eligibility.",
    ctaLabel: "Unlock Pack",
    route: "/courses",
    variant: "not-pack",
  },
  {
    id: "s2",
    title: "Client slots are limited",
    subtitle: "Pack users get priority access every month.",
    ctaLabel: "See Pack Benefits",
    route: "/courses",
    variant: "not-pack",
  },
  {
    id: "s3",
    title: "Finish faster (3×)",
    subtitle: "Pack path is structured: Vibe Coding → Prompt Engg → Prompt-to-Profit.",
    ctaLabel: "Upgrade Now",
    route: "/courses",
    variant: "not-pack",
  },
  {
    id: "s4",
    title: "Certificate unlocked at 100%",
    subtitle: "Pack includes all certificates. Track completion in one place.",
    ctaLabel: "View Certifications",
    route: "/lms/student/certificates",
    variant: "not-pack",
  },
  {
    id: "s5",
    title: "You already started—don't stop",
    subtitle: "Continue today and unlock pack-level perks.",
    ctaLabel: "Continue Learning",
    route: "/lms/student/courses",
    variant: "not-pack",
  },
  {
    id: "s6",
    title: "Demo Day this week",
    subtitle: "Submit 1 project. Pack users get featured first.",
    ctaLabel: "Join Demo Day",
    route: "/lms/student/client-lab",
    variant: "not-pack",
  },
];

const PACK_SLIDES: Slide[] = [
  {
    id: "p1",
    title: "You have Pack ✅",
    subtitle: "Complete courses to unlock certificates + client projects.",
    ctaLabel: "Continue",
    route: "/lms/student/courses",
    variant: "pack",
  },
  {
    id: "p2",
    title: "Real Client Lab",
    subtitle: "Complete 100% to request real client tasks.",
    ctaLabel: "Check Eligibility",
    route: "/lms/student/client-lab",
    variant: "pack",
  },
  {
    id: "p3",
    title: "Certificates",
    subtitle: "Finish → Request → Download (QR verified).",
    ctaLabel: "Open Certifications",
    route: "/lms/student/certificates",
    variant: "pack",
  },
];

export type UserCarouselState = {
  packPurchased: boolean;
  courseProgress?: Record<string, number>;
};

/**
 * Returns slides for the home carousel. Defaults to NOT_PACK if API fails or state missing.
 */
export function getHomeCarouselSlides(userState: UserCarouselState | null | undefined): Slide[] {
  if (!userState) return NOT_PACK_SLIDES;
  if (userState.packPurchased === true) return PACK_SLIDES;
  const slides = [...NOT_PACK_SLIDES];
  const progress = userState.courseProgress;
  if (progress && typeof progress === "object") {
    const pct = Object.values(progress)[0];
    if (typeof pct === "number" && pct > 0 && pct < 100) {
      const idx = slides.findIndex((s) => s.id === "s5");
      if (idx !== -1) {
        slides[idx] = {
          ...slides[idx],
          subtitle: `You're at ${Math.round(pct)}% — finish and unlock.`,
        };
      }
    }
  }
  return slides;
}
