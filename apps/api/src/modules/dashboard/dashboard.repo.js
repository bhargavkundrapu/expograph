// apps/api/src/modules/dashboard/dashboard.repo.js
const { query } = require("../../db/query");

// Get total students count
async function getTotalStudents({ tenantId }) {
  const { rows } = await query(
    `SELECT COUNT(*)::int AS count
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE r.name = 'Student' AND u.is_active = true`,
    [tenantId]
  );
  return rows[0]?.count ?? 0;
}

// Get total active users (all roles)
async function getActiveUsers({ tenantId }) {
  const { rows } = await query(
    `SELECT COUNT(DISTINCT u.id)::int AS count
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     WHERE u.is_active = true`,
    [tenantId]
  );
  return rows[0]?.count ?? 0;
}

// Get total mentors count
async function getTotalMentors({ tenantId }) {
  const { rows } = await query(
    `SELECT COUNT(*)::int AS count
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE r.name = 'Mentor' AND u.is_active = true`,
    [tenantId]
  );
  return rows[0]?.count ?? 0;
}

// Get recent audit logs
async function getRecentAuditLogs({ tenantId, limit = 10 }) {
  const { rows } = await query(
    `SELECT 
       al.id,
       al.action,
       al.entity_type,
       al.entity_id,
       al.payload,
       al.created_at,
       u.full_name AS user_name,
       u.email AS user_email
     FROM audit_logs al
     LEFT JOIN users u ON u.id = al.actor_user_id
     WHERE al.tenant_id = $1
     ORDER BY al.created_at DESC
     LIMIT $2`,
    [tenantId, limit]
  );
  return rows;
}

// Get system alerts (failed jobs, errors, etc.)
async function getSystemAlerts({ tenantId }) {
  // For now, return empty array - can be extended with actual alert logic
  // This could check for:
  // - Failed background jobs
  // - High error rates
  // - Payment issues
  // - System health metrics
  return [];
}

module.exports = {
  getTotalStudents,
  getActiveUsers,
  getTotalMentors,
  getRecentAuditLogs,
  getSystemAlerts,
};
