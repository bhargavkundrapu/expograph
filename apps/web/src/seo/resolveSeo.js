import { COURSE_EXPLORE_DATA } from "../data/courseExploreData";
import { getSiteOrigin } from "./siteOrigin";

/** Default from index.html — used when no route-specific copy exists */
export const DEFAULT_SITE_TITLE = "ExpoGraph | AI Academy — Vibe Coding, Prompt Engineering & AI Automations";
export const DEFAULT_SITE_DESCRIPTION =
  "Master AI Automations, Vibe Coding & Prompt Engineering with hands-on courses, real client projects and career-ready skills at ExpoGraph Academy.";

/** Feature detail pages — titles & descriptions aligned with FeatureDetailPage hero copy (SEO-only; no UI). */
const FEATURE_SEO = {
  "smart-prompts": {
    title: "Smart Prompt Library | ExpoGraph",
    description:
      "Copy-ready prompts, error-fix snippets, and command reference boxes for every lesson—HTML, CSS, JavaScript, React, Node.js, and more.",
  },
  "resume-builder": {
    title: "Resume Builder | ExpoGraph",
    description:
      "Craft an ATS-friendly resume in minutes with guided steps, professional templates, and instant PDF export.",
  },
  "real-client-lab": {
    title: "Real Client Lab | ExpoGraph",
    description:
      "Work on real client projects with mentor feedback and build portfolio-ready work that proves you can deliver.",
  },
  "learning-portal": {
    title: "Learning Portal | ExpoGraph",
    description:
      "Track progress, browse courses, and learn from one learner-friendly LMS dashboard—mobile-friendly and built for focus.",
  },
  "structured-lessons": {
    title: "Structured Lessons | ExpoGraph",
    description:
      "Every lesson follows Goal, Video, Setup, Prompts, Presentation, and Success Checkpoint—clear structure for hands-on learning.",
  },
  "jobs-search-hub": {
    title: "Jobs Search Hub | ExpoGraph",
    description:
      "India-first job search hub: role presets, keyword chips, and quick links to LinkedIn, Naukri, Indeed, Internshala, and more.",
  },
  "startup-launchpad": {
    title: "Startup LaunchPad | ExpoGraph",
    description:
      "Guided founder journey from idea to MVP, launch, legal setup, and growth—inside the ExpoGraph student LMS.",
  },
};

const NOINDEX_PATH_PREFIXES = [
  "/lms",
  "/login",
  "/adminlogin",
  "/account-pending",
  "/payment-failure",
  "/demo",
];

const NOINDEX_EXACT = new Set(["/not-found"]);

function pathIsNoIndex(pathname) {
  if (NOINDEX_EXACT.has(pathname)) return true;
  for (const prefix of NOINDEX_PATH_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * @returns {{ title: string, description: string, robots: string, canonicalPath: string, jsonLd: object | null }}
 */
export function resolveSeo(pathname) {
  const path = pathname.split("?")[0] || "/";
  const robots = pathIsNoIndex(path) ? "noindex, nofollow" : "index, follow";

  if (pathIsNoIndex(path)) {
    return {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  if (path === "/" || path === "/academy") {
    return {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      robots,
      /** Single canonical for duplicate home + /academy (same content). */
      canonicalPath: "/",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "ExpoGraph",
        url: getSiteOrigin(),
        description: DEFAULT_SITE_DESCRIPTION,
        sameAs: [],
      },
    };
  }

  if (path === "/solutions") {
    return {
      title: "Solutions | ExpoGraph",
      description:
        "Explore how ExpoGraph helps learners and teams build real skills with AI-powered courses, structured lessons, and hands-on projects.",
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  if (path === "/courses") {
    return {
      title: "Courses | ExpoGraph Academy",
      description:
        "Browse Vibe Coding, Prompt Engineering, AI Automations, and more—affordable courses with certificates and real-world practice.",
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  if (path === "/contact") {
    return {
      title: "Contact & Support | ExpoGraph",
      description: "Get in touch with ExpoGraph for course support, partnerships, and general inquiries.",
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  if (path === "/privacy-policy") {
    return {
      title: "Privacy Policy | ExpoGraph",
      description: "ExpoGraph privacy policy: how we collect, use, and protect your information.",
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  if (path === "/terms-and-conditions") {
    return {
      title: "Terms & Conditions | ExpoGraph",
      description: "Terms and conditions for using ExpoGraph Academy and related services.",
      robots,
      canonicalPath: path,
      jsonLd: null,
    };
  }

  const exploreMatch = path.match(/^\/courses\/explore\/([^/]+)\/?$/);
  if (exploreMatch) {
    const slug = exploreMatch[1];
    const data = COURSE_EXPLORE_DATA[slug];
    if (data) {
      return {
        title: `${data.title} — Explore | ExpoGraph Academy`,
        description: data.description.slice(0, 160),
        robots,
        canonicalPath: `/courses/explore/${slug}`,
        jsonLd: null,
      };
    }
  }

  const featureMatch = path.match(/^\/features\/([^/]+)\/?$/);
  if (featureMatch) {
    const slug = featureMatch[1];
    const meta = FEATURE_SEO[slug];
    if (meta) {
      return {
        title: meta.title,
        description: meta.description.slice(0, 160),
        robots,
        canonicalPath: `/features/${slug}`,
        jsonLd: null,
      };
    }
    return {
      title: `${slugToTitle(slug)} | ExpoGraph`,
      description: DEFAULT_SITE_DESCRIPTION,
      robots,
      canonicalPath: `/features/${slug}`,
      jsonLd: null,
    };
  }

  const courseMatch = path.match(/^\/courses\/([^/]+)\/?$/);
  if (courseMatch) {
    const slug = courseMatch[1];
    if (slug === "explore") {
      return {
        title: `Courses | ExpoGraph Academy`,
        description: DEFAULT_SITE_DESCRIPTION,
        robots,
        canonicalPath: "/courses",
        jsonLd: null,
      };
    }
    const explore = COURSE_EXPLORE_DATA[slug];
    return {
      title: `${explore ? explore.title : slugToTitle(slug)} | ExpoGraph Academy`,
      description: explore ? explore.description.slice(0, 160) : `${slugToTitle(slug)} course on ExpoGraph Academy. ${DEFAULT_SITE_DESCRIPTION.slice(0, 80)}`,
      robots,
      canonicalPath: `/courses/${slug}`,
      jsonLd: null,
    };
  }

  return {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    robots,
    canonicalPath: path,
    jsonLd: null,
  };
}
