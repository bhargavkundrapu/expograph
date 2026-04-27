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
  /** Optional background image to show in the student home carousel. */
  backgroundImage?: string;
};

// Shared background images reused across slide variants.
// (We keep a small set to avoid extra payload and keep the carousel lightweight.)
const BG_CODING =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop";
const BG_CLIENT =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";
const BG_CERTS =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop";

/** Pack/pricing lives at /courses; student LMS at /lms/student/... */
const NOT_PACK_SLIDES: Slide[] = [
  {
    id: "s1",
    title: "Upgrade to Pack â‚¹199",
    subtitle: "All 3 courses + certificates + client slots eligibility.",
    ctaLabel: "Unlock Pack",
    route: "/courses",
    variant: "not-pack",
    backgroundImage: BG_CODING,
  },
  {
    id: "s2",
    title: "Client slots are limited",
    subtitle: "Pack users get priority access every month.",
    ctaLabel: "See Pack Benefits",
    route: "/courses",
    variant: "not-pack",
    backgroundImage: BG_CLIENT,
  },
  {
    id: "s3",
    title: "Finish faster (3Ã-)",
    subtitle: "Pack path is structured: Vibe Coding â†’ Prompt Engg â†’ Prompt-to-Profit.",
    ctaLabel: "Upgrade Now",
    route: "/courses",
    variant: "not-pack",
    backgroundImage: BG_CODING,
  },
  {
    id: "s4",
    title: "Certificate unlocked at 100%",
    subtitle: "Pack includes all certificates. Track completion in one place.",
    ctaLabel: "View Certifications",
    route: "/lms/student/certificates",
    variant: "not-pack",
    backgroundImage: BG_CERTS,
  },
  {
    id: "s5",
    title: "You already started-don't stop",
    subtitle: "Continue today and unlock pack-level perks.",
    ctaLabel: "Continue Learning",
    route: "/lms/student/courses",
    variant: "not-pack",
    backgroundImage: BG_CODING,
  },
  {
    id: "s6",
    title: "Start Client Lab Projects",
    subtitle: "Get real client briefs, ship a project, and add it to your portfolio. Pack unlocks priority access.",
    ctaLabel: "Open Client Lab",
    route: "/lms/student/client-lab",
    variant: "not-pack",
    backgroundImage: BG_CLIENT,
  },
];

const PACK_SLIDES: Slide[] = [
  {
    id: "p1",
    title: "You have Pack âœ…",
    subtitle: "Complete courses to unlock certificates + client projects.",
    ctaLabel: "Continue",
    route: "/lms/student/courses",
    variant: "pack",
    backgroundImage: BG_CODING,
  },
  {
    id: "p2",
    title: "Real Client Lab",
    subtitle: "Complete 100% to request real client tasks.",
    ctaLabel: "Check Eligibility",
    route: "/lms/student/client-lab",
    variant: "pack",
    backgroundImage: BG_CLIENT,
  },
  {
    id: "p3",
    title: "Certificates",
    subtitle: "Finish â†’ Request â†’ Download (QR verified).",
    ctaLabel: "Open Certifications",
    route: "/lms/student/certificates",
    variant: "pack",
    backgroundImage: BG_CERTS,
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
          subtitle: `You're at ${Math.round(pct)}%-finish and unlock.`,
        };
      }
    }
  }
  return slides;
}
