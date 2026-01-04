// apps/api/src/modules/leads/leads.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./leads.repo");
const { audit } = require("../audit/audit.service");

// PUBLIC: POST /api/v1/public/leads
const createPublicLead = asyncHandler(async (req, res) => {
  const { name, email, phone, source, meta } = req.body || {};
  if (!phone && !email) throw new HttpError(400, "phone or email required");

  const created = await repo.createLead({
    tenantId: req.tenant.id,
    name,
    email,
    phone,
    source: source || "website",
    meta: meta && typeof meta === "object" ? meta : {},
  });

  await audit(req, {
    action: "lead.create.public",
    entityType: "lead",
    entityId: created.id,
    payload: { source: created.source },
  });

  res.status(201).json({ ok: true, data: created });
});

// ADMIN: GET /api/v1/admin/leads
const listAdminLeads = asyncHandler(async (req, res) => {
  const status = req.query.status ? String(req.query.status) : undefined;
  const rows = await repo.listLeads({ tenantId: req.tenant.id, status });
  res.json({ ok: true, data: rows });
});

// ADMIN: PATCH /api/v1/admin/leads/:id
const updateAdminLead = asyncHandler(async (req, res) => {
  const leadId = req.params.id;
  const patch = {
    status: req.body?.status,
    notes: req.body?.notes,
  };

  const updated = await repo.updateLead({ tenantId: req.tenant.id, leadId, patch });
  if (!updated) throw new HttpError(404, "Lead not found");

  await audit(req, {
    action: "lead.update",
    entityType: "lead",
    entityId: leadId,
    payload: patch,
  });

  res.json({ ok: true, data: updated });
});

module.exports = { createPublicLead, listAdminLeads, updateAdminLead };
