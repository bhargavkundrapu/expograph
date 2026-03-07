// apps/api/src/modules/feedback/feedback.repo.js
const { query } = require("../../db/query");

/**
 * Submit or update course-level feedback (one per user per course).
 */
async function upsertCourseFeedback({ tenantId, userId, courseId, rating, comment }) {
  const { rowCount: updated } = await query(
    `UPDATE course_feedback
     SET rating = $1, comment = $2
     WHERE tenant_id = $3 AND user_id = $4 AND course_id = $5 AND lesson_id IS NULL`,
    [rating, comment || null, tenantId, userId, courseId]
  );
  if (updated > 0) {
    const { rows } = await query(
      `SELECT id, rating, comment, feedback_type, created_at
       FROM course_feedback
       WHERE tenant_id = $1 AND user_id = $2 AND course_id = $3 AND lesson_id IS NULL LIMIT 1`,
      [tenantId, userId, courseId]
    );
    return rows[0];
  }
  const { rows } = await query(
    `INSERT INTO course_feedback (tenant_id, user_id, course_id, lesson_id, rating, comment, feedback_type)
     VALUES ($1, $2, $3, NULL, $4, $5, 'course')
     RETURNING id, rating, comment, feedback_type, created_at`,
    [tenantId, userId, courseId, rating, comment || null]
  );
  return rows[0];
}

/**
 * Submit or update lesson-level feedback (one per user per lesson).
 */
async function upsertLessonFeedback({ tenantId, userId, courseId, lessonId, rating, comment }) {
  const { rowCount: updated } = await query(
    `UPDATE course_feedback
     SET rating = $1, comment = $2
     WHERE tenant_id = $3 AND user_id = $4 AND lesson_id = $5`,
    [rating, comment || null, tenantId, userId, lessonId]
  );
  if (updated > 0) {
    const { rows } = await query(
      `SELECT id, rating, comment, feedback_type, created_at
       FROM course_feedback
       WHERE tenant_id = $1 AND user_id = $2 AND lesson_id = $3 LIMIT 1`,
      [tenantId, userId, lessonId]
    );
    return rows[0];
  }
  const { rows } = await query(
    `INSERT INTO course_feedback (tenant_id, user_id, course_id, lesson_id, rating, comment, feedback_type)
     VALUES ($1, $2, $3, $4, $5, $6, 'lesson')
     RETURNING id, rating, comment, feedback_type, created_at`,
    [tenantId, userId, courseId, lessonId, rating, comment || null]
  );
  return rows[0];
}

/**
 * List all feedback for SuperAdmin with course/lesson names and user info.
 */
async function listFeedbackForAdmin({ tenantId, courseId = null, feedbackType = null, limit = 100, offset = 0 }) {
  let where = "f.tenant_id = $1";
  const params = [tenantId];
  if (courseId) {
    params.push(courseId);
    where += ` AND f.course_id = $${params.length}`;
  }
  if (feedbackType && (feedbackType === "course" || feedbackType === "lesson")) {
    params.push(feedbackType);
    where += ` AND f.feedback_type = $${params.length}`;
  }
  const limitIdx = params.length + 1;
  const offsetIdx = params.length + 2;
  params.push(limit, offset);

  const { rows } = await query(
    `SELECT
       f.id,
       f.rating,
       f.comment,
       f.feedback_type,
       f.created_at,
       c.title AS course_title,
       c.slug AS course_slug,
       l.title AS lesson_title,
       l.slug AS lesson_slug,
       u.full_name AS user_name,
       u.email AS user_email
     FROM course_feedback f
     JOIN courses c ON c.id = f.course_id
     LEFT JOIN lessons l ON l.id = f.lesson_id
     JOIN users u ON u.id = f.user_id
     WHERE ${where}
     ORDER BY f.created_at DESC
     LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
    params
  );
  return rows;
}

/**
 * Count feedback for SuperAdmin (for pagination).
 */
async function countFeedbackForAdmin({ tenantId, courseId = null, feedbackType = null }) {
  let where = "tenant_id = $1";
  const params = [tenantId];
  if (courseId) {
    params.push(courseId);
    where += ` AND course_id = $${params.length}`;
  }
  if (feedbackType && (feedbackType === "course" || feedbackType === "lesson")) {
    params.push(feedbackType);
    where += ` AND feedback_type = $${params.length}`;
  }
  const { rows } = await query(
    `SELECT COUNT(*)::int AS total FROM course_feedback WHERE ${where}`,
    params
  );
  return rows[0]?.total ?? 0;
}

module.exports = {
  upsertCourseFeedback,
  upsertLessonFeedback,
  listFeedbackForAdmin,
  countFeedbackForAdmin,
};
