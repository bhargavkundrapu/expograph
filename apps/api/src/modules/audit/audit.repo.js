// apps/api/src/modules/audit/audit.repo.js
const { query } = require("../../db/query");

async function insertAuditLog({ tenantId, actorUserId, action, entityType, entityId, payload, ip, userAgent }) {
  await query(
    `INSERT INTO audit_logs
      (tenant_id, actor_user_id, action, entity_type, entity_id, payload, ip, user_agent)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      tenantId,
      actorUserId ?? null,
      action,
      entityType ?? null,
      entityId ?? null,
      payload ? JSON.stringify(payload) : "{}",
      ip ?? null,
      userAgent ?? null,
    ]
  );
}

module.exports = { insertAuditLog };
