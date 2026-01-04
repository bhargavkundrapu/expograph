// apps/api/src/modules/referrals/referrals.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const repo = require("./referrals.repo");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const getMyCode = asyncHandler(async (req, res) => {
  const data = await repo.getOrCreateMyCode({ tenantId: req.tenant.id, userId: req.auth.userId });
  res.json({ ok: true, data });
});

const listAdminEvents = asyncHandler(async (req, res) => {
  const rows = await repo.listEvents({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

module.exports = { getMyCode, listAdminEvents };
