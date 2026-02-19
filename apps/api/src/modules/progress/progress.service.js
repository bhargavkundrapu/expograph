// apps/api/src/modules/progress/progress.service.js
const repo = require("./progress.repo");
const { HttpError } = require("../../utils/httpError");

/**
 * Premium rules:
 * 1) Lesson must exist in tenant AND published (student progress only).
 * 2) watchSecondsDelta must be 0..60 (prevent cheating/spam).
 * 3) lastPositionSeconds must be 0..(10 hours) safe cap.
 */
function clampInt(n, min, max) {
  const x = Number(n);
  if (!Number.isFinite(x)) return null;
  const i = Math.floor(x);
  return Math.min(Math.max(i, min), max);
}

async function ensureLessonAccessibleOrThrow({ tenantId, lessonId }) {
  const ok = await repo.assertLessonPublished({ tenantId, lessonId });
  if (!ok) throw new HttpError(404, "Lesson not found or not published");
}

async function startLesson({ tenantId, userId, lessonId }) {
  await ensureLessonAccessibleOrThrow({ tenantId, lessonId });
  return repo.startLesson({ tenantId, userId, lessonId });
}

async function progressUpdate({ tenantId, userId, lessonId, watchSecondsDelta, lastPositionSeconds }) {
  await ensureLessonAccessibleOrThrow({ tenantId, lessonId });

  // watchSecondsDelta: allow 0..60 (player should send small deltas)
  const delta = clampInt(watchSecondsDelta, 0, 60);
  if (delta === null) throw new HttpError(400, "watchSecondsDelta must be a number (0..60)");

  // lastPositionSeconds: allow 0..36000 (10 hours)
  const lastPos = clampInt(lastPositionSeconds, 0, 36000);
  if (lastPos === null) throw new HttpError(400, "lastPositionSeconds must be a number (0..36000)");

  return repo.updateProgress({
    tenantId,
    userId,
    lessonId,
    watchSecondsDelta: delta,
    lastPositionSeconds: lastPos,
  });
}

async function completeLesson({ tenantId, userId, lessonId }) {
  await ensureLessonAccessibleOrThrow({ tenantId, lessonId });
  const row = await repo.completeLesson({ tenantId, userId, lessonId });
  // Recompute Client Lab eligibility when progress updates (>= 75% + all courses)
  try {
    const clientLabEligibility = require("../clientLab/clientLabEligibility.service");
    await clientLabEligibility.recomputeEligibility({ tenantId, userId });
  } catch (e) {
    // Don't fail lesson complete if eligibility update fails
    if (process.env.NODE_ENV !== "test") console.warn("Client Lab eligibility recompute failed:", e?.message);
  }
  return row;
}

async function summary({ tenantId, userId }) {
  return repo.getSummary({ tenantId, userId });
}
async function courseProgress({ tenantId, userId, courseSlug }) {
  return repo.courseProgressBySlug({ tenantId, userId, courseSlug });
}

module.exports = {
  startLesson,
  progressUpdate,
  completeLesson,
  summary,
  courseProgress,
};
