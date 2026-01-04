// apps/api/src/modules/certificates/certificates.repo.js
const { query } = require("../../db/query");

async function issueCertificate({ tenantId, userId, courseId, title, verifyCode, meta, createdBy }) {
  const { rows } = await query(
    `INSERT INTO certificates (tenant_id, user_id, course_id, title, verify_code, meta, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id, user_id, course_id, title, verify_code, issued_at`,
    [tenantId, userId, courseId ?? null, title, verifyCode, JSON.stringify(meta || {}), createdBy ?? null]
  );
  return rows[0];
}

async function findByVerifyCode({ verifyCode }) {
  const { rows } = await query(
    `SELECT c.title, c.issued_at, c.verify_code, u.email
     FROM certificates c
     JOIN users u ON u.id = c.user_id
     WHERE c.verify_code = $1
     LIMIT 1`,
    [verifyCode]
  );
  return rows[0] ?? null;
}

module.exports = { issueCertificate, findByVerifyCode };
