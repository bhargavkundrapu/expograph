const progressRepo = require("../progress/progress.repo");
const eligibilityRepo = require("./clientLabEligibility.repo");
const contentRepo = require("../content/content.repo");
const studentRepo = require("../student/student.repo");

const REQUIRED_COURSE_SLUGS = ["vibe-coding", "prompt-engineering", "prompt-to-profit", "ai-automations"];

/**
 * Get checklist for Real Client Lab unlock: each required course with purchased + completed %.
 * Uses all published courses; if none, falls back to required slugs so the list is never empty when courses exist.
 * Eligible when: all courses purchased AND each course at 100% completion.
 */
async function getClientLabChecklist({ tenantId, userId }) {
  if (!tenantId) return { courses: [], hasAccess: false, allPurchased: false, allCompleted: false, eligible: false };

  const hasAccess = await studentRepo.hasAllPackOrAllThreeCourses({ tenantId, userId });
  if (!hasAccess) {
    return { courses: [], hasAccess: false, allPurchased: false, allCompleted: false, eligible: false };
  }

  let courses = await contentRepo.listCoursesPublic({ tenantId });
  if (!courses || courses.length === 0) {
    courses = await contentRepo.listCoursesPublicBySlugs({ tenantId, slugs: REQUIRED_COURSE_SLUGS });
  }
  if (!courses || courses.length === 0) {
    return { courses: [], hasAccess: true, allPurchased: true, allCompleted: true, eligible: true };
  }

  const checklist = await Promise.all(
    courses.map(async (c) => {
      const [purchased, progress] = await Promise.all([
        studentRepo.hasCourseAccess({ tenantId, userId, courseId: c.id }),
        progressRepo.courseProgressBySlug({ tenantId, userId, courseSlug: c.slug }),
      ]);
      const completedPercent = progress?.percent ?? 0;
      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        purchased: !!purchased,
        completedPercent,
      };
    })
  );

  const allPurchased = checklist.every((c) => c.purchased);
  const allCompleted = checklist.every((c) => c.completedPercent === 100);
  const eligible = allPurchased && allCompleted;

  return { courses: checklist, hasAccess: true, allPurchased, allCompleted, eligible };
}

/**
 * Recompute and persist eligible_client_lab, eligible_since for a student.
 * Eligible when: all required courses purchased AND each course completed 100%.
 */
async function recomputeEligibility({ tenantId, userId }) {
  const { eligible } = await getClientLabChecklist({ tenantId, userId });
  const current = await eligibilityRepo.getEligibility({ userId });
  const eligibleSince = eligible && !current.eligible_client_lab ? new Date().toISOString() : current.eligible_since;
  await eligibilityRepo.setEligibility({
    userId,
    eligible: !!eligible,
    eligibleSince: eligible ? (current.eligible_since || eligibleSince) : null,
  });
  return { eligible };
}

module.exports = { recomputeEligibility, getClientLabChecklist };
