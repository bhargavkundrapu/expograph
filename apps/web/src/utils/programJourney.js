/**
 * Student Program Journey — derive stage progress, gates, and quick actions from LMS state.
 */

import { hasLaunchPadAccess } from "./launchPadAccess";

export const JOURNEY_STORAGE_KEY = "expograph-program-journey-v1";

/** @typedef {{ visited?: Record<string, boolean>, missions?: Record<string, boolean> }} JourneyPrefs */

/** @returns {JourneyPrefs} */
export function readJourneyPrefs() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    return o && typeof o === "object" ? o : {};
  } catch {
    return {};
  }
}

/** @param {(prev: JourneyPrefs) => JourneyPrefs} updater */
export function updateJourneyPrefs(updater) {
  if (typeof window === "undefined") return readJourneyPrefs();
  try {
    const next = updater(readJourneyPrefs());
    window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return readJourneyPrefs();
  }
}

export function markJourneyVisited(key) {
  updateJourneyPrefs((prev) => ({
    visited: { ...(prev.visited || {}), [key]: true },
    missions: { ...(prev.missions || {}) },
  }));
}

export function setJourneyMission(missionId, done = true) {
  updateJourneyPrefs((prev) => ({
    visited: { ...(prev.visited || {}) },
    missions: { ...(prev.missions || {}), [missionId]: done },
  }));
}

/** @returns {boolean} */
export function isBonusAiCourse(course) {
  if (!course) return false;
  const slug = (course.slug || "").toLowerCase().replace(/_/g, "-");
  const title = (course.title || "").toLowerCase();
  return (
    slug.includes("ai-automations") ||
    slug.includes("ai-automation") ||
    slug.includes("ai-automat") ||
    slug.includes("ai-agents") ||
    slug === "ai_agents" ||
    title.includes("ai automation")
  );
}

/** Main trilogy excluding bonus AI */
export function isMainTrilogyCourse(course) {
  if (!course || isBonusAiCourse(course)) return false;
  const slug = (course.slug || "").toLowerCase().replace(/_/g, "-");
  const title = (course.title || "").toLowerCase();
  if (slug.includes("vibe") && (slug.includes("cod") || slug.includes("coad"))) return true;
  if (slug.includes("prompt-engineering") || title.includes("prompt engineering")) return true;
  if (slug.includes("prompt-to-profit") || title.includes("prompt to profit")) return true;
  return false;
}

export function findVibeCourse(courses) {
  return (courses || []).find((c) => {
    const s = (c.slug || "").toLowerCase().replace(/_/g, "-");
    const t = (c.title || "").toLowerCase();
    return (s.includes("vibe") && (s.includes("cod") || s.includes("coad"))) || t.includes("vibe cod");
  });
}

export function findPromptEngineeringCourse(courses) {
  return (courses || []).find((c) => {
    const s = (c.slug || "").toLowerCase().replace(/_/g, "-");
    const t = (c.title || "").toLowerCase();
    return s.includes("prompt-engineering") || (t.includes("prompt") && t.includes("engineering"));
  });
}

export function findPromptToProfitCourse(courses) {
  return (courses || []).find((c) => {
    const s = (c.slug || "").toLowerCase().replace(/_/g, "-");
    const t = (c.title || "").toLowerCase();
    return s.includes("prompt-to-profit") || (t.includes("prompt") && t.includes("profit"));
  });
}

export function findBonusAiCourse(courses) {
  return (courses || []).find((c) => isBonusAiCourse(c));
}

/**
 * Certificate / eligibility aggregates for journey UI.
 * @param {Array<{ course_id?: string|number, progress_percent?: number, request_status?: string }>} eligibleRows
 * @param {Record<string|number, unknown>} certByCourseId
 */
export function summarizeCertificates(eligibleRows, certByCourseId) {
  const rows = Array.isArray(eligibleRows) ? eligibleRows : [];
  const byId = certByCourseId && typeof certByCourseId === "object" ? certByCourseId : {};
  let issuedOrApproved = 0;
  let pending = 0;
  let eligibleToRequest = 0;
  let maxProgressAmongMain = 0;
  for (const row of rows) {
    const p = Number(row.progress_percent) || 0;
    maxProgressAmongMain = Math.max(maxProgressAmongMain, p);
    const st = row.request_status;
    if (st === "approved" || st === "issued") {
      issuedOrApproved += 1;
      continue;
    }
    if (st === "pending") pending += 1;
    if (p >= 100 && !st) eligibleToRequest += 1;
  }
  const hasDownloadRow = rows.some((row) => {
    const cid = row.course_id;
    return cid != null && byId[cid] != null;
  });
  return {
    issuedOrApproved,
    pending,
    eligibleToRequest,
    maxProgressAmongMain,
    hasDownloadRow,
    rowCount: rows.length,
  };
}

export function certStageScore(summary) {
  if (!summary) return 0;
  if (summary.issuedOrApproved > 0 || summary.hasDownloadRow) return 100;
  if (summary.pending > 0) return 85;
  if (summary.eligibleToRequest > 0) return 72;
  if (summary.maxProgressAmongMain >= 100) return 65;
  if (summary.maxProgressAmongMain > 0) return Math.round(Math.min(60, summary.maxProgressAmongMain * 0.55));
  return 0;
}

/**
 * Overall program completion (weighted). Omits bonus if not enrolled.
 */
function pctForCourse(course) {
  if (!course) return 0;
  if (!course.enrolled) return 0;
  return Math.min(100, Math.max(0, Number(course.progress) || 0));
}

export function computeProgramCompletion({
  courses,
  prefs,
  me,
  certSummary,
  resumeDraftFilled,
}) {
  const vibes = findVibeCourse(courses);
  const pe = findPromptEngineeringCourse(courses);
  const ptp = findPromptToProfitCourse(courses);
  const bonus = findBonusAiCourse(courses);

  const vibePct = pctForCourse(vibes);
  const pePct = pctForCourse(pe);
  const ptpPct = pctForCourse(ptp);

  let bonusPct = 0;
  let bonusWeight = 5;
  if (bonus?.enrolled) {
    bonusPct = Math.min(100, Number(bonus.progress) || 0);
    bonusWeight = 10;
  }

  const certPct = certStageScore(certSummary);

  const access = hasLaunchPadAccess(me);
  const prefsSafe = prefs || {};

  const clientPct = !access ? 12 : prefsSafe.visited?.client_lab ? 100 : 52;
  const launchPct = !access ? 12 : prefsSafe.visited?.launchpad ? 100 : 52;

  let resumePct = 22;
  if (resumeDraftFilled) resumePct = 95;
  else if (prefsSafe.visited?.resume_builder) resumePct = 80;

  const jobsPct = prefsSafe.visited?.jobs_hub ? 100 : 38;
  const orientationPct = prefsSafe.visited?.orientation ? 100 : 68;

  const weights = [2, 10, 10, 10, bonusWeight, 8, access ? 7 : 3, access ? 7 : 3, 5, 4];
  const values = [orientationPct, vibePct, pePct, ptpPct, bonusPct, certPct, clientPct, launchPct, resumePct, jobsPct];

  const wsum = weights.reduce((a, b) => a + b, 0);
  const num = weights.reduce((s, w, i) => s + w * ((Math.min(100, Math.max(0, Number(values[i]) || 0)) / 100)), 0);
  return Math.round((num / Math.max(1, wsum)) * 100);
}

/**
 * Pick the next actionable focus for CTAs.
 * @returns {{ kind: string, course?: object|null, label: string, sub?: string }}
 */
export function deriveNextFocus({ courses, me, certSummary, prefs }) {
  const vibes = findVibeCourse(courses);
  const pe = findPromptEngineeringCourse(courses);
  const ptp = findPromptToProfitCourse(courses);
  const bonus = findBonusAiCourse(courses);
  const order = [
    vibes,
    pe,
    ptp,
    ...(bonus?.enrolled ? [bonus] : []),
  ].filter(Boolean);

  for (const c of order) {
    if (!c.enrolled) {
      return { kind: "enroll_course", course: c, label: `Unlock ${c.title || "course"}`, sub: "Enroll to start this stage of your track." };
    }
    if (Number(c.progress) < 100) {
      return { kind: "continue_course", course: c, label: `Continue ${c.title || "course"}`, sub: `${Math.round(Number(c.progress) || 0)}% complete — pick up where you left off.` };
    }
  }

  if (certSummary && certSummary.eligibleToRequest > 0) {
    return { kind: "certificates_request", label: "Request your certificates", sub: "You’ve completed coursework — claim official proof." };
  }
  if (certSummary && certSummary.issuedOrApproved === 0 && certSummary.pending > 0) {
    return { kind: "certificates_pending", label: "Certificate status", sub: "A request is in review — check progress anytime." };
  }
  if (certSummary && !certSummary.hasDownloadRow && certSummary.rowCount === 0 && hasLaunchPadAccess(me)) {
    return { kind: "certificates_explore", label: "Certificates hub", sub: "Track eligibility and downloads in one place." };
  }

  if (hasLaunchPadAccess(me) && !(prefs?.visited?.client_lab)) {
    return { kind: "client_lab", label: "Enter Real Client Lab", sub: "Practice delivery with client-style workflows." };
  }
  if (hasLaunchPadAccess(me) && !(prefs?.visited?.launchpad)) {
    return { kind: "launchpad", label: "Open Startup LaunchPad", sub: "Structure your startup from idea to next milestone." };
  }

  const resumeHint = prefs?.visited?.resume_builder ? null : true;
  if (resumeHint) {
    return { kind: "resume", label: "Polish your resume", sub: "Turn new skills into a PDF you can share." };
  }
  return { kind: "jobs", label: "Explore Jobs Hub", sub: "Match your refreshed profile to real roles." };
}
