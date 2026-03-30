import { apiFetch } from "../services/api";
import { getStudentLessonPath } from "./studentCoursePaths";

function norm(s) {
  return String(s || "").toLowerCase().replace(/_/g, "-").trim();
}

function matchesAiAutomationsCourse(c) {
  if (!c) return false;
  const s = norm(c.slug);
  const t = (c.title || "").toLowerCase();
  return (
    s.includes("ai-automation") ||
    s.includes("ai-automat") ||
    (s.includes("ai") && t.includes("automation")) ||
    t.includes("ai automation")
  );
}

function matchesCourseSlugRequest(c, requested) {
  if (!c?.slug || !requested) return false;
  const a = norm(c.slug);
  const b = norm(requested);
  return a === b || a.startsWith(b) || b.startsWith(a);
}

const PLACEHOLDER_LESSON_SLUGS = new Set(["start", "first", "_first", "begin", "intro"]);

/**
 * When course or lesson detail 404s (URL slug ≠ DB slug, or placeholder lesson slug),
 * resolve the real path from the enrolled courses list + course tree.
 */
export async function recoverStudentLessonRoute({ token, courseSlug, moduleSlug, lessonSlug }) {
  try {
    const listRes = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
    const list = Array.isArray(listRes?.data) ? listRes.data : [];
    if (list.length === 0) return null;

    let target =
      list.find((c) => matchesCourseSlugRequest(c, courseSlug)) ||
      (matchesAiAutomationsCourse({ slug: courseSlug }) ? list.find(matchesAiAutomationsCourse) : null);

    if (!target?.slug) return null;

    const detailRes = await apiFetch(`/api/v1/student/courses/${encodeURIComponent(target.slug)}`, { token }).catch(
      () => null
    );
    const courseData = detailRes?.data?.course ?? detailRes?.data ?? null;
    const modules = courseData?.modules || [];
    if (!modules.length) return null;

    const resolvedCourseSlug = courseData?.slug || target.slug;

    let mod = modules.find((m) => norm(m.slug) === norm(moduleSlug));
    if (!mod) mod = modules[0];
    const lessons = mod.lessons || [];
    if (!lessons.length) return null;

    let les = lessons.find((l) => norm(l.slug) === norm(lessonSlug));
    if (!les && PLACEHOLDER_LESSON_SLUGS.has(norm(lessonSlug))) {
      les = lessons[0];
    }
    if (!les) les = lessons[0];

    return {
      courseSlug: resolvedCourseSlug,
      moduleSlug: mod.slug,
      lessonSlug: les.slug,
      path: getStudentLessonPath(resolvedCourseSlug, mod.slug, les.slug),
    };
  } catch {
    return null;
  }
}
