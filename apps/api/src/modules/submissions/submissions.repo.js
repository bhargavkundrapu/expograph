const { query } = require("../../db/query");

async function getNextAttemptNo({ tenantId, taskId, userId }) {
  const { rows } = await query(
    `SELECT COALESCE(MAX(attempt_no), 0) AS max_attempt
     FROM submissions
     WHERE tenant_id=$1 AND task_id=$2 AND user_id=$3`,
    [tenantId, taskId, userId]
  );
  return Number(rows[0].max_attempt) + 1;
}

async function createSubmission({ tenantId, taskId, userId, attemptNo, contentType, content }) {
  const { rows } = await query(
    `INSERT INTO submissions (tenant_id, task_id, user_id, attempt_no, content_type, content, status)
     VALUES ($1,$2,$3,$4,$5,$6,'submitted')
     RETURNING *`,
    [tenantId, taskId, userId, attemptNo, contentType, content]
  );
  return rows[0];
}

async function listMySubmissions({ tenantId, userId }) {
  const { rows } = await query(
    `
    SELECT
      s.id,
      s.task_id,
      s.user_id,
      s.attempt_no,
      s.status,
      s.content_type,
      s.submitted_at,
      s.updated_at,

      pt.title AS task_title,
      pt.lesson_id,

      l.slug AS lesson_slug,
      m.slug AS module_slug,
      c.slug AS course_slug,

      rv.score AS review_score,
      rv.feedback AS review_feedback,
      rv.created_at AS reviewed_at
    FROM submissions s
    JOIN practice_tasks pt
      ON pt.id = s.task_id AND pt.tenant_id = s.tenant_id
    JOIN lessons l
      ON l.id = pt.lesson_id AND l.tenant_id = pt.tenant_id
    JOIN course_modules m
      ON m.id = l.module_id AND m.tenant_id = l.tenant_id
    JOIN courses c
      ON c.id = m.course_id AND c.tenant_id = m.tenant_id

    LEFT JOIN LATERAL (
      SELECT score, feedback, created_at
      FROM reviews
      WHERE tenant_id = s.tenant_id
        AND submission_id = s.id
      ORDER BY created_at DESC
      LIMIT 1
    ) rv ON true

    WHERE s.tenant_id=$1 AND s.user_id=$2
    ORDER BY s.submitted_at DESC
    `,
    [tenantId, userId]
  );
  return rows;
}
async function listMentorQueue({ tenantId }) {
  const { rows } = await query(
    `SELECT s.*, u.email AS student_email, pt.title AS task_title
     FROM submissions s
     JOIN users u ON u.id = s.user_id
     JOIN practice_tasks pt ON pt.id = s.task_id AND pt.tenant_id = s.tenant_id
     WHERE s.tenant_id=$1
       AND s.status IN ('submitted','in_review')
     ORDER BY s.submitted_at ASC`,
    [tenantId]
  );
  return rows;
}

async function getSubmissionById({ tenantId, submissionId }) {
  const { rows } = await query(
    `SELECT * FROM submissions WHERE tenant_id=$1 AND id=$2`,
    [tenantId, submissionId]
  );
  return rows[0] ?? null;
}

async function setSubmissionStatus({ tenantId, submissionId, status }) {
  const { rows } = await query(
    `UPDATE submissions
     SET status=$1, updated_at=now()
     WHERE tenant_id=$2 AND id=$3
     RETURNING *`,
    [status, tenantId, submissionId]
  );
  return rows[0] ?? null;
}

async function createReview({ tenantId, submissionId, mentorId, score, feedback }) {
  const { rows } = await query(
    `INSERT INTO reviews (tenant_id, submission_id, mentor_id, score, feedback)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [tenantId, submissionId, mentorId, score ?? null, feedback]
  );
  return rows[0];
}
async function listMyLessonSubmissions({ tenantId, userId }) {
  const { rows } = await query(
    `
    SELECT
      s.*,
      pt.title AS task_title,
      pt.lesson_id,
      l.slug AS lesson_slug,
      m.slug AS module_slug,
      c.slug AS course_slug
    FROM submissions s
    JOIN practice_tasks pt
      ON pt.id = s.task_id AND pt.tenant_id = s.tenant_id
    JOIN lessons l
      ON l.id = pt.lesson_id AND l.tenant_id = pt.tenant_id
    JOIN course_modules m
      ON m.id = l.module_id AND m.tenant_id = l.tenant_id
    JOIN courses c
      ON c.id = m.course_id AND c.tenant_id = m.tenant_id
    WHERE s.tenant_id=$1 AND s.user_id=$2
    ORDER BY s.submitted_at DESC
    `,
    [tenantId, userId]
  );
  return rows;
}
module.exports = {
  getNextAttemptNo,
  createSubmission,
  listMySubmissions,
  listMentorQueue,
  getSubmissionById,
  setSubmissionStatus,
  createReview,
  listMyLessonSubmissions,
};
