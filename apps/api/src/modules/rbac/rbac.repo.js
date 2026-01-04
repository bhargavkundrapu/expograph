// apps/api/src/modules/rbac/rbac.repo.js
const { query } = require("../../db/query");

async function listPermissionsForUser({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT p.key
     FROM memberships m
     JOIN role_permissions rp ON rp.role_id = m.role_id
     JOIN permissions p ON p.id = rp.permission_id
     WHERE m.tenant_id = $1 AND m.user_id = $2`,
    [tenantId, userId]
  );
  return rows.map((r) => r.key);
}

module.exports = { listPermissionsForUser };
