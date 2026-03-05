// apps/api/src/modules/bonusCourseSettings/bonusCourseSettings.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./bonusCourseSettings.repo");

const get = asyncHandler(async (req, res) => {
  // Use JWT tenant so it matches student API (student uses req.auth.tenantId)
  const tenantId = req.auth?.tenantId || req.tenant?.id;
  if (!tenantId) throw new HttpError(400, "Tenant not found");
  const config = await repo.getConfig({ tenantId });
  res.json({ ok: true, data: config });
});

const set = asyncHandler(async (req, res) => {
  // Use JWT tenant so saved settings apply to same tenant as student list
  const tenantId = req.auth?.tenantId || req.tenant?.id;
  if (!tenantId) throw new HttpError(400, "Tenant not found");
  const body = req.body || {};
  const config = await repo.setConfig({
    tenantId,
    config: {
      rule: body.rule,
      requiredCourseSlugs: body.requiredCourseSlugs,
      bonusCourseSlug: body.bonusCourseSlug,
    },
    updatedBy: req.auth?.userId,
  });
  res.json({ ok: true, data: config });
});

module.exports = { get, set };
