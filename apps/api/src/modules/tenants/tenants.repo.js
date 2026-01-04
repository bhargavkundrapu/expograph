// apps/api/src/modules/tenants/tenants.repo.js
const { query } = require("../../db/query");

async function findTenantBySlug(slug) {
  const { rows } = await query(
    `SELECT id, name, slug FROM tenants WHERE slug = $1 LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}

module.exports = { findTenantBySlug };
