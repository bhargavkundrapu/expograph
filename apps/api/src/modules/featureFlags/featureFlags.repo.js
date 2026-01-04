// apps/api/src/modules/featureFlags/featureFlags.repo.js
const { query } = require("../../db/query");

async function listFlags({ tenantId }) {
  const { rows } = await query(
    `SELECT key, enabled, config, updated_at
     FROM feature_flags
     WHERE tenant_id = $1
     ORDER BY key ASC`,
    [tenantId]
  );
  return rows;
}

async function upsertFlag({ tenantId, key, enabled, config, updatedBy }) {
  const { rows } = await query(
    `INSERT INTO feature_flags (tenant_id, key, enabled, config, updated_by, updated_at)
     VALUES ($1,$2,$3,$4,$5, now())
     ON CONFLICT (tenant_id, key)
     DO UPDATE SET enabled = EXCLUDED.enabled,
                   config = EXCLUDED.config,
                   updated_by = EXCLUDED.updated_by,
                   updated_at = now()
     RETURNING key, enabled, config, updated_at`,
    [tenantId, key, !!enabled, JSON.stringify(config || {}), updatedBy ?? null]
  );
  return rows[0];
}

module.exports = { listFlags, upsertFlag };
