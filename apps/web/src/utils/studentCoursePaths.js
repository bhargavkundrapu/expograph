/**
 * Student LMS course path helpers.
 * AI Automations (bonus course) lives under /lms/student/bonus-courses/:courseSlug; other courses under /lms/student/courses/:courseSlug.
 */

const BONUS_SLUG_NORM = "ai-automations";

export function isBonusCourseSlug(slug) {
  if (!slug) return false;
  const s = String(slug).toLowerCase().replace(/_/g, "-");
  return s === BONUS_SLUG_NORM || s.includes("ai-automation");
}

/** Base path for a course (no trailing slash). Use for landing and lesson URLs. */
export function getStudentCourseBasePath(courseSlug) {
  return isBonusCourseSlug(courseSlug) ? "/lms/student/bonus-courses" : "/lms/student/courses";
}

/** Full URL to course landing. */
export function getStudentCourseLandingPath(courseSlug) {
  const base = getStudentCourseBasePath(courseSlug);
  const slug = (courseSlug || "").toLowerCase().replace(/_/g, "-");
  return `${base}/${slug === "ai-agents" || slug === "ai_agents" ? BONUS_SLUG_NORM : slug}`;
}

/** Full URL to a lesson. */
export function getStudentLessonPath(courseSlug, moduleSlug, lessonSlug) {
  const base = getStudentCourseBasePath(courseSlug);
  const c = (courseSlug || "").toLowerCase().replace(/_/g, "-");
  const course = c === "ai-agents" || c === "ai_agents" ? BONUS_SLUG_NORM : courseSlug;
  return `${base}/${course}/modules/${moduleSlug}/lessons/${lessonSlug}`;
}
