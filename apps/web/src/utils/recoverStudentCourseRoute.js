import { apiFetch } from "../services/api";
import { getStudentCourseLandingPath } from "./studentCoursePaths";

function norm(value) {
  return String(value || "").toLowerCase().replace(/_/g, "-").trim();
}

function matchesAiAutomationsCourse(course) {
  if (!course) return false;
  const slug = norm(course.slug);
  const title = String(course.title || "").toLowerCase();
  return (
    slug.includes("ai-automation") ||
    slug.includes("ai-automat") ||
    slug === "ai-agents" ||
    slug === "ai_agents" ||
    title.includes("ai automation")
  );
}

function matchesRequestedCourse(course, requestedSlug) {
  if (!course?.slug || !requestedSlug) return false;
  const actual = norm(course.slug);
  const requested = norm(requestedSlug);
  return actual === requested || actual.startsWith(requested) || requested.startsWith(actual);
}

export async function recoverStudentCourseRoute({ token, courseSlug }) {
  try {
    const listRes = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
    const list = Array.isArray(listRes?.data) ? listRes.data : [];
    if (!list.length) return null;

    const target =
      list.find((course) => matchesRequestedCourse(course, courseSlug)) ||
      (matchesAiAutomationsCourse({ slug: courseSlug }) ? list.find(matchesAiAutomationsCourse) : null);

    if (!target?.slug) return null;

    return {
      courseSlug: target.slug,
      path: getStudentCourseLandingPath(target.slug),
      enrolled: target.enrolled === true,
      course: target,
    };
  } catch {
    return null;
  }
}
