// apps/api/src/modules/certifications/certifications.repo.js
const { query } = require("../../db/query");

async function createRequest({ tenantId, userId, courseId, progressSnapshot }) {
  const { rows } = await query(
    `INSERT INTO certificate_requests (tenant_id, user_id, course_id, progress_snapshot, status)
     VALUES ($1, $2, $3, $4, 'pending')
     ON CONFLICT (tenant_id, user_id, course_id) DO NOTHING
     RETURNING id, tenant_id, user_id, course_id, progress_snapshot, status, requested_at`,
    [tenantId, userId, courseId, progressSnapshot]
  );
  return rows[0] ?? null;
}

async function findByUserAndCourse({ tenantId, userId, courseId }) {
  const { rows } = await query(
    `SELECT id, tenant_id, user_id, course_id, progress_snapshot, status, requested_at, decided_at, decided_by, reject_reason
     FROM certificate_requests
     WHERE tenant_id = $1 AND user_id = $2 AND course_id = $3
     LIMIT 1`,
    [tenantId, userId, courseId]
  );
  return rows[0] ?? null;
}

async function findRequestsByUserAndCourses({ tenantId, userId, courseIds }) {
  if (!courseIds || courseIds.length === 0) return [];
  const { rows } = await query(
    `SELECT id, course_id, progress_snapshot, status, requested_at
     FROM certificate_requests
     WHERE tenant_id = $1 AND user_id = $2 AND course_id = ANY($3::uuid[])`,
    [tenantId, userId, courseIds]
  );
  return rows;
}

async function listForAdmin({ tenantId, status }) {
  let sql = `
    SELECT
      cr.id,
      cr.tenant_id,
      cr.user_id,
      cr.course_id,
      cr.progress_snapshot,
      cr.status,
      cr.requested_at,
      cr.decided_at,
      cr.decided_by,
      cr.reject_reason,
      u.full_name AS student_name,
      u.email AS student_email,
      u.phone AS student_phone,
      c.title AS course_title
    FROM certificate_requests cr
    JOIN users u ON u.id = cr.user_id
    JOIN courses c ON c.id = cr.course_id AND c.tenant_id = cr.tenant_id
    WHERE cr.tenant_id = $1
  `;
  const params = [tenantId];
  if (status) {
    params.push(status);
    sql += ` AND cr.status = $${params.length}`;
  }
  sql += ` ORDER BY cr.requested_at DESC`;
  const { rows } = await query(sql, params);
  return rows;
}

async function getByIdForAdmin({ tenantId, id }) {
  const { rows } = await query(
    `SELECT cr.*, u.full_name AS student_name, u.email AS student_email, u.phone AS student_phone, c.title AS course_title
     FROM certificate_requests cr
     JOIN users u ON u.id = cr.user_id
     JOIN courses c ON c.id = cr.course_id AND c.tenant_id = cr.tenant_id
     WHERE cr.tenant_id = $1 AND cr.id = $2
     LIMIT 1`,
    [tenantId, id]
  );
  return rows[0] ?? null;
}

async function approve({ tenantId, id, decidedBy }) {
  const { rows } = await query(
    `UPDATE certificate_requests
     SET status = 'approved', decided_at = now(), decided_by = $2
     WHERE tenant_id = $1 AND id = $3 AND status = 'pending'
     RETURNING id, status, decided_at, decided_by`,
    [tenantId, decidedBy, id]
  );
  return rows[0] ?? null;
}

async function reject({ tenantId, id, decidedBy, reason }) {
  const { rows } = await query(
    `UPDATE certificate_requests
     SET status = 'rejected', decided_at = now(), decided_by = $2, reject_reason = $4
     WHERE tenant_id = $1 AND id = $3
     RETURNING id, status, decided_at, decided_by, reject_reason`,
    [tenantId, decidedBy, id, reason ?? null]
  );
  return rows[0] ?? null;
}

module.exports = {
  createRequest,
  findByUserAndCourse,
  findRequestsByUserAndCourses,
  listForAdmin,
  getByIdForAdmin,
  approve,
  reject,
};
