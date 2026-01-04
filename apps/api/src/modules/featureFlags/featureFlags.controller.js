// apps/api/src/modules/featureFlags/featureFlags.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./featureFlags.repo");
const { audit } = require("../audit/audit.service");

const list = asyncHandler(async (req, res) => {
  const flags = await repo.listFlags({ tenantId: req.tenant.id });
  res.json({ ok: true, data: flags });
});

const setOne = asyncHandler(async (req, res) => {
  const key = String(req.params.key || "").trim();
  if (!key) throw new HttpError(400, "Invalid flag key");

  const enabled = typeof req.body.enabled === "boolean" ? req.body.enabled : null;
  if (enabled === null) throw new HttpError(400, "enabled must be boolean");

  const config = req.body.config && typeof req.body.config === "object" ? req.body.config : {};

  const updated = await repo.upsertFlag({
    tenantId: req.tenant.id,
    key,
    enabled,
    config,
    updatedBy: req.auth?.userId,
  });

  await audit(req, {
    action: "featureflag.update",
    entityType: "feature_flag",
    entityId: null,
    payload: { key, enabled, config },
  });

  res.json({ ok: true, data: updated });
});

module.exports = { list, setOne };
