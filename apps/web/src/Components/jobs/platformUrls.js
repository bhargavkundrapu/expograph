/**
 * Zero-backend URL builders for India-first job search redirects.
 * Fallbacks use the simplest working search pattern per domain.
 */

import { platformCapabilities } from "./platformCapabilities.js";

/** @typedef {"remote"|"hybrid"|"onsite"|""} WorkMode */
/** @typedef {"internship"|"fresher"|"0-1"|"1-3"|"3-5"|""} ExperienceBand */
/** @typedef {"24h"|"3d"|"7d"|"14d"|""} DatePosted */
/** @typedef {"internship"|"full-time"|"apprenticeship"|""} JobType */

/**
 * @typedef {Object} JobHubFilters
 * @property {string[]} keywords
 * @property {string} location
 * @property {WorkMode} workMode
 * @property {ExperienceBand} experience
 * @property {DatePosted} datePosted
 * @property {JobType} jobType
 * @property {string} companyKeyword
 * @property {string} salaryKeyword
 * @property {string} categoryId
 * @property {string} subRoleId
 */

const MAX_KEYWORD_PARTS = 24;

function safeJoinKeywords(parts) {
  const flat = parts
    .filter(Boolean)
    .map((s) => String(s).trim())
    .filter(Boolean)
    .slice(0, MAX_KEYWORD_PARTS);
  return flat.join(" ").replace(/\s+/g, " ").trim();
}

function encodeQ(s) {
  return encodeURIComponent(s);
}

/** LinkedIn f_TPR: seconds ago */
function linkedInTimeParam(datePosted) {
  const map = { "24h": "r86400", "3d": "r259200", "7d": "r604800", "14d": "r1209600" };
  return datePosted && map[datePosted] ? `&f_TPR=${map[datePosted]}` : "";
}

/** LinkedIn remote: f_WT=2 */
function linkedInRemote(workMode) {
  if (workMode === "remote") return "&f_WT=2";
  return "";
}

function extraKeywordsFromFilters(f, caps, platformId) {
  const extras = [];
  if (!caps.remote && f.workMode) extras.push(f.workMode);
  if (!caps.datePosted && f.datePosted) extras.push(f.datePosted.replace("d", " days"));
  if (!caps.experience && f.experience) extras.push(f.experience);
  if (!caps.company && f.companyKeyword) extras.push(f.companyKeyword);
  if (!caps.salary && f.salaryKeyword) extras.push(f.salaryKeyword);
  if (!caps.jobType && f.jobType) extras.push(f.jobType);
  return extras;
}

/**
 * Merge keywords + soft fallbacks for unsupported caps.
 * @param {JobHubFilters} f
 * @param {string} platformId
 */
export function buildKeywordQuery(f, platformId) {
  const caps = platformCapabilities[platformId] || platformCapabilities.indeed;
  const base = [...(f.keywords || [])];
  const soft = extraKeywordsFromFilters(f, caps, platformId);
  return safeJoinKeywords([...base, ...soft]);
}

function indeedFromage(datePosted) {
  if (datePosted === "24h") return "1";
  if (datePosted === "3d") return "3";
  if (datePosted === "7d") return "7";
  if (datePosted === "14d") return "14";
  return "";
}

function naukriExperienceParam(exp) {
  const map = {
    internship: "0",
    fresher: "1",
    "0-1": "2",
    "1-3": "3",
    "3-5": "4",
  };
  return exp && map[exp] ? map[exp] : "";
}

/**
 * @param {JobHubFilters} f
 * @returns {string}
 */
export function buildLinkedInUrl(f) {
  const caps = platformCapabilities.linkedin;
  const q = buildKeywordQuery(f, "linkedin");
  const loc = caps.location && f.location ? f.location : "";
  // Minimal, stable query — extra params (e.g. unsupported company=) can break or cache badly in LI SPA.
  let url = `https://www.linkedin.com/jobs/search/?keywords=${encodeQ(q)}`;
  if (loc) url += `&location=${encodeQ(loc)}`;
  url += linkedInTimeParam(caps.datePosted ? f.datePosted : "");
  url += linkedInRemote(caps.remote ? f.workMode : "");
  if (!q && !loc) url = "https://www.linkedin.com/jobs/";
  return url;
}

/**
 * Naukri: /jobs-in-india with k= & l=
 */
export function buildNaukriUrlSafe(f) {
  const caps = platformCapabilities.naukri;
  const q = buildKeywordQuery(f, "naukri");
  let url = `https://www.naukri.com/jobs-in-india?k=${encodeQ(q)}`;
  if (caps.location && f.location) url += `&l=${encodeQ(f.location)}`;
  if (caps.experience) {
    const e = naukriExperienceParam(f.experience);
    if (e) url += `&experience=${e}`;
  }
  if (!q) url = "https://www.naukri.com/";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildIndeedUrl(f) {
  const caps = platformCapabilities.indeed;
  let q = buildKeywordQuery(f, "indeed");
  if (f.companyKeyword) q = safeJoinKeywords([q, f.companyKeyword]);
  let url = `https://in.indeed.com/jobs?q=${encodeQ(q)}`;
  if (caps.location && f.location) url += `&l=${encodeQ(f.location)}`;
  const fa = indeedFromage(f.datePosted);
  if (caps.datePosted && fa) url += `&fromage=${fa}`;
  if (caps.remote && f.workMode === "remote") url += "&remotejob=1";
  if (caps.salary && f.salaryKeyword) url += `&salary=${encodeQ(f.salaryKeyword)}`;
  if (!q && !f.location) url = "https://in.indeed.com/";
  return url;
}

/**
 * Internshala: internship-focused path
 * @param {JobHubFilters} f
 */
export function buildInternshalaUrl(f) {
  const q = buildKeywordQuery(f, "internshala");
  if (!q) return "https://internshala.com/internships/";
  const primary = (f.keywords && f.keywords[0]) || q.split(" ")[0] || "internship";
  const slug = primary.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "internship";
  const city = f.location ? f.location.toLowerCase().replace(/\s+/g, "-") : "india";
  return `https://internshala.com/internships/keywords-${slug}-internship-in-${city}`;
}

/**
 * @param {JobHubFilters} f
 */
export function buildFounditUrl(f) {
  const q = buildKeywordQuery(f, "foundit");
  let url = `https://www.foundit.in/srp/results?query=${encodeQ(q)}`;
  if (f.location) url += `&locations=${encodeQ(f.location)}`;
  if (!q) url = "https://www.foundit.in/";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildShineUrl(f) {
  const q = buildKeywordQuery(f, "shine");
  let url = `https://www.shine.com/job-search/?q=${encodeQ(q)}`;
  if (f.location) url += `&loc=${encodeQ(f.location)}`;
  if (!q) url = "https://www.shine.com/job-search/";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildFreshersworldUrl(f) {
  const q = buildKeywordQuery(f, "freshersworld");
  let url = `https://www.freshersworld.com/jobs/jobsearch?q=${encodeQ(q)}`;
  if (f.location) url += `&lc=${encodeQ(f.location)}`;
  if (!q) url = "https://www.freshersworld.com/jobs/";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildCutShortUrl(f) {
  const q = buildKeywordQuery(f, "cutshort");
  let url = `https://cutshort.io/jobs?q=${encodeQ(q)}`;
  if (f.location) url += `&location=${encodeQ(f.location)}`;
  if (f.workMode === "remote") url += "&remote=true";
  if (!q) url = "https://cutshort.io/jobs";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildWellfoundUrl(f) {
  const q = buildKeywordQuery(f, "wellfound");
  let url = `https://wellfound.com/jobs?keywords=${encodeQ(q)}`;
  if (f.location) url += `&location=${encodeQ(f.location)}`;
  if (f.workMode === "remote") url += "&remote=true";
  if (!q) url = "https://wellfound.com/jobs";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildTimesJobsUrl(f) {
  const q = buildKeywordQuery(f, "timesjobs");
  let url = `https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&keyword=${encodeQ(q)}`;
  if (f.location) url += `&location=${encodeQ(f.location)}`;
  if (!q) url = "https://www.timesjobs.com/";
  return url;
}

/**
 * @param {JobHubFilters} f
 */
export function buildHiristUrl(f) {
  const q = buildKeywordQuery(f, "hirist");
  let url = `https://hirist.tech/job-search?q=${encodeQ(q)}`;
  if (f.location) url += `&loc=${encodeQ(f.location)}`;
  if (!q) url = "https://hirist.tech/";
  return url;
}

/** @type {Record<string, (f: JobHubFilters) => string>} */
export const urlBuilders = {
  linkedin: buildLinkedInUrl,
  naukri: buildNaukriUrlSafe,
  indeed: buildIndeedUrl,
  internshala: buildInternshalaUrl,
  foundit: buildFounditUrl,
  shine: buildShineUrl,
  freshersworld: buildFreshersworldUrl,
  cutshort: buildCutShortUrl,
  wellfound: buildWellfoundUrl,
  timesjobs: buildTimesJobsUrl,
  hirist: buildHiristUrl,
};

/**
 * @param {string} platformId
 * @param {JobHubFilters} f
 */
export function buildUrlForPlatform(platformId, f) {
  const fn = urlBuilders[platformId];
  if (typeof fn === "function") {
    try {
      const u = fn(f);
      if (u && u.startsWith("http")) return u;
    } catch {
      /* fall through */
    }
  }
  return `https://www.google.com/search?q=${encodeQ(`${platformId} jobs ${buildKeywordQuery(f, "indeed")}`)}`;
}

/**
 * Plain string for copy (SEO-style keyword line)
 * @param {JobHubFilters} f
 */
export function buildCopyKeywordString(f) {
  return buildKeywordQuery(
    {
      ...f,
      keywords: [...(f.keywords || []), f.companyKeyword, f.salaryKeyword].filter(Boolean),
    },
    "indeed"
  );
}
