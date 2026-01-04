// apps/api/src/modules/workshops/workshops.repo.js
const { query } = require("../../db/query");

async function createWorkshop({ tenantId, title, slug, description, startsAt, endsAt, mode, location, meetLink, capacity, status, createdBy }) {
  const { rows } = await query(
    `INSERT INTO workshops
      (tenant_id, title, slug, description, starts_at, ends_at, mode, location, meet_link, capacity, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [
      tenantId, title, slug, description ?? null,
      startsAt, endsAt ?? null,
      mode ?? "offline", location ?? null, meetLink ?? null,
      capacity ?? 0, status ?? "published", createdBy ?? null
    ]
  );
  return rows[0];
}

async function listPublicWorkshops({ tenantId }) {
  const { rows } = await query(
    `SELECT title, slug, description, starts_at, ends_at, mode, location, capacity, status
     FROM workshops
     WHERE tenant_id=$1 AND deleted_at IS NULL AND status IN ('published','completed')
     ORDER BY starts_at ASC`,
    [tenantId]
  );
  return rows;
}

async function getWorkshopBySlug({ tenantId, slug }) {
  const { rows } = await query(
    `SELECT * FROM workshops WHERE tenant_id=$1 AND slug=$2 AND deleted_at IS NULL LIMIT 1`,
    [tenantId, slug]
  );
  return rows[0] ?? null;
}

async function listAdminWorkshops({ tenantId }) {
  const { rows } = await query(
    `SELECT * FROM workshops
     WHERE tenant_id=$1 AND deleted_at IS NULL
     ORDER BY starts_at DESC`,
    [tenantId]
  );
  return rows;
}

async function updateWorkshop({ tenantId, id, patch }) {
  const { title, description, startsAt, endsAt, mode, location, meetLink, capacity, status } = patch;
  const { rows } = await query(
    `UPDATE workshops SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       starts_at = COALESCE($3, starts_at),
       ends_at = COALESCE($4, ends_at),
       mode = COALESCE($5, mode),
       location = COALESCE($6, location),
       meet_link = COALESCE($7, meet_link),
       capacity = COALESCE($8, capacity),
       status = COALESCE($9, status),
       updated_at = now()
     WHERE tenant_id=$10 AND id=$11 AND deleted_at IS NULL
     RETURNING *`,
    [
      title ?? null,
      description ?? null,
      startsAt ?? null,
      endsAt ?? null,
      mode ?? null,
      location ?? null,
      meetLink ?? null,
      capacity ?? null,
      status ?? null,
      tenantId,
      id
    ]
  );
  return rows[0] ?? null;
}

async function registerForWorkshop({ tenantId, workshopId, userId, name, email, phone, college, year, meta }) {
  const { rows } = await query(
    `INSERT INTO workshop_registrations
      (tenant_id, workshop_id, user_id, name, email, phone, college, year, meta)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING id, name, email, phone, status, created_at`,
    [tenantId, workshopId, userId ?? null, name, email ?? null, phone ?? null, college ?? null, year ?? null, JSON.stringify(meta || {})]
  );
  return rows[0];
}

async function listRegistrations({ tenantId, workshopId }) {
  const { rows } = await query(
    `SELECT id, name, email, phone, college, year, status, created_at
     FROM workshop_registrations
     WHERE tenant_id=$1 AND workshop_id=$2 AND deleted_at IS NULL
     ORDER BY created_at DESC`,
    [tenantId, workshopId]
  );
  return rows;
}

module.exports = {
  createWorkshop,
  listPublicWorkshops,
  getWorkshopBySlug,
  listAdminWorkshops,
  updateWorkshop,
  registerForWorkshop,
  listRegistrations,
};
