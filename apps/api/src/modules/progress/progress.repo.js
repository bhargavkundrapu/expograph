// apps/api/src/modules/progress/progress.repo.js
const { query } = require("../../db/query");

/**
 * Make sure lesson belongs to tenant + published (student only access)
 */
async function assertLessonPublished({ tenantId, lessonId }) {
  const { rows } = await query(
    `SELECT id
     FROM lessons
     WHERE tenant_id = $1 AND id = $2 AND status = 'published'
     LIMIT 1`,
    [tenantId, lessonId]
  );
  return rows[0] ? true : false;
}

/**
 * Start lesson: create row if missing.
 * If exists, keep started_at (do NOT reset it).
 */
async function startLesson({ tenantId, userId, lessonId }) {
  const { rows } = await query(
    `INSERT INTO lesson_progress (tenant_id, user_id, lesson_id, started_at, updated_at)
     VALUES ($1, $2, $3, now(), now())
     ON CONFLICT (tenant_id, user_id, lesson_id)
     DO UPDATE SET
       started_at = COALESCE(lesson_progress.started_at, now()),
       updated_at = now()
     RETURNING *`,
    [tenantId, userId, lessonId]
  );
  return rows[0];
}

/**
 * Update progress:
 * - Adds watchSecondsDelta to watch_seconds (capped at 0+)
 * - Updates last_position_seconds to the provided value
 * - Never removes completed_at
 * - If row doesn't exist, it creates with started_at
 */
async function updateProgress({ tenantId, userId, lessonId, watchSecondsDelta, lastPositionSeconds }) {
  const { rows } = await query(
    `INSERT INTO lesson_progress (
        tenant_id, user_id, lesson_id,
        started_at,
        watch_seconds, last_position_seconds,
        updated_at
      )
     VALUES ($1, $2, $3, now(), $4, $5, now())
     ON CONFLICT (tenant_id, user_id, lesson_id)
     DO UPDATE SET
       watch_seconds = GREATEST(lesson_progress.watch_seconds + $4, 0),
       last_position_seconds = GREATEST($5, 0),
       updated_at = now()
     RETURNING *`,
    [tenantId, userId, lessonId, watchSecondsDelta, lastPositionSeconds]
  );
  return rows[0];
}

/**
 * Complete lesson:
 * - Sets completed_at once (if already set, keep it)
 * - Ensures started_at is set
 */
async function completeLesson({ tenantId, userId, lessonId }) {
  const { rows } = await query(
    `INSERT INTO lesson_progress (tenant_id, user_id, lesson_id, started_at, completed_at, updated_at)
     VALUES ($1, $2, $3, now(), now(), now())
     ON CONFLICT (tenant_id, user_id, lesson_id)
     DO UPDATE SET
       started_at = COALESCE(lesson_progress.started_at, now()),
       completed_at = COALESCE(lesson_progress.completed_at, now()),
       updated_at = now()
     RETURNING *`,
    [tenantId, userId, lessonId]
  );
  return rows[0];
}

async function getSummary({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT
        COUNT(*) FILTER (WHERE completed_at IS NOT NULL) AS completed_lessons,
        COUNT(*) FILTER (WHERE completed_at IS NULL AND started_at IS NOT NULL) AS in_progress_lessons,
        COALESCE(SUM(watch_seconds), 0) AS total_watch_seconds
     FROM lesson_progress
     WHERE tenant_id = $1 AND user_id = $2`,
    [tenantId, userId]
  );
  return rows[0] || { completed_lessons: 0, in_progress_lessons: 0, total_watch_seconds: 0 };
}
async function courseProgressBySlug({ tenantId, userId, courseSlug }) {
  // total published lessons in this course
  const totalRow = (await query(
    `
    SELECT COUNT(*)::int AS total
    FROM lessons l
    JOIN course_modules m
      ON m.id = l.module_id AND m.tenant_id = l.tenant_id
    JOIN courses c
      ON c.id = m.course_id AND c.tenant_id = m.tenant_id
    WHERE c.tenant_id = $1
      AND c.slug = $2
      AND c.status = 'published'
      AND m.status = 'published'
      AND l.status = 'published'
    `,
    [tenantId, courseSlug]
  )).rows[0];

  const total = totalRow?.total ?? 0;

  // completed lesson ids for this user (published lessons only)
  const { rows } = await query(
    `
    SELECT lp.lesson_id
    FROM lesson_progress lp
    JOIN lessons l
      ON l.id = lp.lesson_id AND l.tenant_id = lp.tenant_id AND l.status='published'
    JOIN course_modules m
      ON m.id = l.module_id AND m.tenant_id = l.tenant_id AND m.status='published'
    JOIN courses c
      ON c.id = m.course_id AND c.tenant_id = m.tenant_id AND c.status='published'
    WHERE lp.tenant_id = $1
      AND lp.user_id = $2
      AND c.slug = $3
      AND lp.completed_at IS NOT NULL
    `,
    [tenantId, userId, courseSlug]
  );

  const completedLessonIds = rows.map(r => r.lesson_id);
  const completed = completedLessonIds.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, percent, completedLessonIds };
}
module.exports = {
  assertLessonPublished,
  startLesson,
  updateProgress,
  completeLesson,
  getSummary,
  courseProgressBySlug,
};
