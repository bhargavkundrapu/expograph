export const STORAGE_SAVED = "expograph_jobs_saved_searches_v2";
export const STORAGE_SKILL_HINTS = "expograph_jobs_skill_hints_v1";

export function loadJson(key, fallback) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** @param {Record<string, unknown>} f */
export function fingerprintFilters(f) {
  try {
    const sorted = [...(f.keywords || [])].map((k) => k.toLowerCase().trim()).sort();
    return JSON.stringify({
      k: sorted,
      l: (f.location || "").toLowerCase().trim(),
      w: f.workMode || "",
      e: f.experience || "",
      d: f.datePosted || "",
      j: f.jobType || "",
      c: (f.companyKeyword || "").toLowerCase().trim(),
      s: (f.salaryKeyword || "").toLowerCase().trim(),
      cat: f.categoryId || "",
      sub: f.subRoleId || "",
    });
  } catch {
    return String(Date.now());
  }
}
