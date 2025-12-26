// apps/api/src/modules/progress/progress.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const svc = require("./progress.service");
const { HttpError } = require("../../utils/httpError");

const start = asyncHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const tenantId = req.tenant.id;
  const userId = req.auth.userId;

  const row = await svc.startLesson({ tenantId, userId, lessonId });
  res.json({ ok: true, data: row });
});

const progress = asyncHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const tenantId = req.tenant.id;
  const userId = req.auth.userId;

  const { watchSecondsDelta, lastPositionSeconds } = req.body || {};
  const row = await svc.progressUpdate({
    tenantId,
    userId,
    lessonId,
    watchSecondsDelta,
    lastPositionSeconds,
  });

  res.json({ ok: true, data: row });
});

const complete = asyncHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const tenantId = req.tenant.id;
  const userId = req.auth.userId;

  const row = await svc.completeLesson({ tenantId, userId, lessonId });
  res.json({ ok: true, data: row });
});

const summary = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.auth.userId;

  const data = await svc.summary({ tenantId, userId });
  res.json({ ok: true, data });
});

module.exports = {
  start,
  progress,
  complete,
  summary,
};
