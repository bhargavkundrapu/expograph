// apps/api/src/modules/users/users.repo.js
const { query } = require("../../db/query");

async function findUserByEmail(email) {
  const { rows } = await query(
    `SELECT id, email, phone, full_name, password_hash, is_active
     FROM users
     WHERE email = $1
     LIMIT 1`,
    [email]
  );
  return rows[0] ?? null;
}

async function createUser({ email, fullName, passwordHash }) {
  const { rows } = await query(
    `INSERT INTO users (email, full_name, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, email, full_name, is_active`,
    [email, fullName ?? null, passwordHash]
  );
  return rows[0];
}

async function findRoleIdForTenant({ tenantId, roleName }) {
  const { rows } = await query(
    `SELECT id FROM roles WHERE tenant_id = $1 AND name = $2 LIMIT 1`,
    [tenantId, roleName]
  );
  return rows[0]?.id ?? null;
}

async function upsertMembership({ tenantId, userId, roleId }) {
  const { rows } = await query(
    `INSERT INTO memberships (tenant_id, user_id, role_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (tenant_id, user_id)
     DO UPDATE SET role_id = EXCLUDED.role_id, updated_at = now()
     RETURNING id, tenant_id, user_id, role_id`,
    [tenantId, userId, roleId]
  );
  return rows[0];
}

async function getMembershipWithRole({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT m.id AS membership_id, m.tenant_id, m.user_id, r.id AS role_id, r.name AS role_name
     FROM memberships m
     JOIN roles r ON r.id = m.role_id
     WHERE m.tenant_id = $1 AND m.user_id = $2
     LIMIT 1`,
    [tenantId, userId]
  );
  return rows[0] ?? null;
}

module.exports = {
  findUserByEmail,
  createUser,
  findRoleIdForTenant,
  upsertMembership,
  getMembershipWithRole,
};
