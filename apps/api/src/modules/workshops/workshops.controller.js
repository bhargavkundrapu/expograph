// apps/api/src/modules/workshops/workshops.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./workshops.repo");
const { audit } = require("../audit/audit.service");

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

// PUBLIC: GET /api/v1/public/workshops
const listPublic = asyncHandler(async (req, res) => {
  const rows = await repo.listPublicWorkshops({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

// PUBLIC: POST /api/v1/public/workshops/:slug/register
const registerPublic = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const wk = await repo.getWorkshopBySlug({ tenantId: req.tenant.id, slug });
  if (!wk) throw new HttpError(404, "Workshop not found");
  if (wk.status === "cancelled") throw new HttpError(400, "Workshop cancelled");

  const { name, email, phone, college, year, meta } = req.body || {};
  if (!name) throw new HttpError(400, "name required");
  if (!email && !phone) throw new HttpError(400, "email or phone required");

  const reg = await repo.registerForWorkshop({
    tenantId: req.tenant.id,
    workshopId: wk.id,
    userId: req.auth?.userId ?? null, // if logged in later
    name,
    email,
    phone,
    college,
    year,
    meta: meta && typeof meta === "object" ? meta : {},
  });

  await audit(req, {
    action: "workshop.register.public",
    entityType: "workshop",
    entityId: wk.id,
    payload: { slug, regId: reg.id },
  });

  res.status(201).json({ ok: true, data: reg });
});

// ADMIN: POST /api/v1/admin/workshops
const createAdmin = asyncHandler(async (req, res) => {
  const { title, slug, description, startsAt, endsAt, mode, location, meetLink, capacity, status } = req.body || {};
  if (!title) throw new HttpError(400, "title required");

  const finalSlug = slug ? slugify(slug) : slugify(title);
  if (!finalSlug) throw new HttpError(400, "Invalid slug");

  if (!startsAt) throw new HttpError(400, "startsAt required (ISO date string)");

  const created = await repo.createWorkshop({
    tenantId: req.tenant.id,
    title,
    slug: finalSlug,
    description,
    startsAt,
    endsAt,
    mode,
    location,
    meetLink,
    capacity,
    status,
    createdBy: req.auth?.userId,
  });

  await audit(req, {
    action: "workshop.create",
    entityType: "workshop",
    entityId: created.id,
    payload: { slug: created.slug },
  });

  res.status(201).json({ ok: true, data: created });
});

// ADMIN: GET /api/v1/admin/workshops
const listAdmin = asyncHandler(async (req, res) => {
  const rows = await repo.listAdminWorkshops({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

// ADMIN: PATCH /api/v1/admin/workshops/:id
const updateAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const patch = {
    title: req.body?.title,
    description: req.body?.description,
    startsAt: req.body?.startsAt,
    endsAt: req.body?.endsAt,
    mode: req.body?.mode,
    location: req.body?.location,
    meetLink: req.body?.meetLink,
    capacity: req.body?.capacity,
    status: req.body?.status,
  };

  const updated = await repo.updateWorkshop({ tenantId: req.tenant.id, id, patch });
  if (!updated) throw new HttpError(404, "Workshop not found");

  await audit(req, {
    action: "workshop.update",
    entityType: "workshop",
    entityId: id,
    payload: patch,
  });

  res.json({ ok: true, data: updated });
});

// ADMIN: GET /api/v1/admin/workshops/:id/registrations
const registrationsAdmin = asyncHandler(async (req, res) => {
  const wkId = req.params.id;
  const rows = await repo.listRegistrations({ tenantId: req.tenant.id, workshopId: wkId });
  res.json({ ok: true, data: rows });
});

module.exports = {
  listPublic,
  registerPublic,
  createAdmin,
  listAdmin,
  updateAdmin,
  registrationsAdmin,
};
