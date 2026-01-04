// apps/api/src/modules/leads/leads.repo.js
const { query } = require("../../db/query");

async function createLead({ tenantId, name, email, phone, source, meta }) {
  const { rows } = await query(
    `INSERT INTO leads (tenant_id, name, email, phone, source, meta)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id, name, email, phone, source, status, created_at`,
    [tenantId, name ?? null, email ?? null, phone ?? null, source ?? "unknown", JSON.stringify(meta || {})]
  );
  return rows[0];
}

async function listLeads({ tenantId, status, limit = 50, offset = 0 }) {
  const params = [tenantId];
  let where = `tenant_id=$1 AND deleted_at IS NULL`;
  if (status) {
    params.push(status);
    where += ` AND status=$${params.length}`;
  }
  params.push(limit, offset);

  const { rows } = await query(
    `SELECT id, name, email, phone, source, status, notes, created_at
     FROM leads
     WHERE ${where}
     ORDER BY created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );
  return rows;
}

async function updateLead({ tenantId, leadId, patch }) {
  const { status, notes } = patch;
  const { rows } = await query(
    `UPDATE leads
     SET status = COALESCE($1, status),
         notes  = COALESCE($2, notes),
         updated_at = now()
     WHERE tenant_id=$3 AND id=$4 AND deleted_at IS NULL
     RETURNING id, name, phone, email, source, status, notes, updated_at`,
    [status ?? null, notes ?? null, tenantId, leadId]
  );
  return rows[0] ?? null;
}

module.exports = { createLead, listLeads, updateLead };
