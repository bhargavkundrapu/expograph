/**
 * Student LMS course path helpers.
 * All courses (including AI Automations) live under /lms/student/courses/:courseSlug.
 * Bonus Courses page is separate and currently has no courses.
 */

const AI_AUTOMATIONS_SLUG_NORM = "ai-automations";

/** True if slug is AI Automations (for always-enrolled / always-accessible logic). */
export function isAiAutomationsSlug(slug) {
  if (!slug) return false;
  const s = String(slug).toLowerCase().replace(/_/g, "-");
  return s === AI_AUTOMATIONS_SLUG_NORM || s.includes("ai-automation") || s === "ai-agents" || s === "ai_agents";
}

/** No course uses bonus path anymore; kept for any legacy checks. */
export function isBonusCourseSlug(slug) {
  return false;
}

/** Base path for a course (no trailing slash). Use for landing and lesson URLs. */
export function getStudentCourseBasePath(courseSlug) {
  return "/lms/student/courses";
}

/** Full URL to course landing. */
export function getStudentCourseLandingPath(courseSlug) {
  const base = getStudentCourseBasePath(courseSlug);
  const slug = (courseSlug || "").toLowerCase().replace(/_/g, "-");
  return `${base}/${slug === "ai-agents" || slug === "ai_agents" ? AI_AUTOMATIONS_SLUG_NORM : slug}`;
}

/** Full URL to a lesson. */
export function getStudentLessonPath(courseSlug, moduleSlug, lessonSlug) {
  const base = getStudentCourseBasePath(courseSlug);
  const c = (courseSlug || "").toLowerCase().replace(/_/g, "-");
  const course = c === "ai-agents" || c === "ai_agents" ? AI_AUTOMATIONS_SLUG_NORM : courseSlug;
  return `${base}/${course}/modules/${moduleSlug}/lessons/${lessonSlug}`;
}
