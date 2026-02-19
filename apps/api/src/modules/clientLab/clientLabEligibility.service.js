const progressRepo = require("../progress/progress.repo");
const eligibilityRepo = require("./clientLabEligibility.repo");

const ELIGIBILITY_THRESHOLD_PERCENT = 75;

/**
 * Recompute and persist eligible_client_lab, eligible_since for a student.
 * Eligible if: overall_progress_percent >= 75 and completed all published courses.
 */
async function recomputeEligibility({ tenantId, userId }) {
  const [overallPercent, completedAll] = await Promise.all([
    progressRepo.getOverallProgressPercent({ tenantId, userId }),
    progressRepo.completedAllRequiredCourses({ tenantId, userId }),
  ]);
  const eligible = overallPercent >= ELIGIBILITY_THRESHOLD_PERCENT && completedAll;
  const current = await eligibilityRepo.getEligibility({ userId });
  const eligibleSince = eligible && !current.eligible_client_lab ? new Date().toISOString() : current.eligible_since;
  await eligibilityRepo.setEligibility({
    userId,
    eligible,
    eligibleSince: eligible ? (current.eligible_since || eligibleSince) : null,
  });
  return { eligible, overallPercent, completedAll };
}

module.exports = { recomputeEligibility };
