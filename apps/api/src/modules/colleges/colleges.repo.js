/**
 * Colleges repository - tenant-scoped dropdown options for purchase form.
 * Managed by SuperAdmin; consumed by public API for BuyNowModal.
 */
const { query } = require("../../db/query");

async function listByTenant({ tenantId }) {
  if (!tenantId) return [];
  const { rows } = await query(
    `SELECT id, name, sort_order, created_at
     FROM colleges
     WHERE tenant_id = $1
     ORDER BY sort_order ASC NULLS LAST, name ASC`,
    [tenantId]
  );
  return rows;
}

async function create({ tenantId, name }) {
  const trimmed = String(name || "").trim();
  if (!trimmed) throw new Error("Name is required");
  if (!tenantId) throw new Error("Tenant is required");

  const { rows } = await query(
    `WITH next_order AS (
       SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM colleges WHERE tenant_id = $1
     )
     INSERT INTO colleges (tenant_id, name, sort_order)
     SELECT $1, $2, (SELECT n FROM next_order)
     ON CONFLICT (tenant_id, name) DO UPDATE SET sort_order = colleges.sort_order
     RETURNING id, name, sort_order, created_at`,
    [tenantId, trimmed]
  );
  return rows[0];
}

async function remove({ tenantId, id }) {
  if (!tenantId || !id) return false;
  const { rowCount } = await query(
    `DELETE FROM colleges WHERE tenant_id = $1 AND id = $2`,
    [tenantId, id]
  );
  return rowCount > 0;
}

module.exports = {
  listByTenant,
  create,
  remove,
};
