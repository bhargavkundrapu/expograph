// apps/api/src/modules/feedback/feedback.controller.admin.js
const { asyncHandler } = require("../../utils/asyncHandler");
const feedbackRepo = require("./feedback.repo");

const listFeedback = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id ?? req.auth?.tenantId;
  if (!tenantId) return res.status(400).json({ ok: false, message: "Tenant required" });

  const courseId = req.query.courseId || null;
  const feedbackType = req.query.type || null;
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
  const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);

  const [rows, total] = await Promise.all([
    feedbackRepo.listFeedbackForAdmin({ tenantId, courseId, feedbackType, limit, offset }),
    feedbackRepo.countFeedbackForAdmin({ tenantId, courseId, feedbackType }),
  ]);

  res.json({ ok: true, data: rows, total });
});

module.exports = { listFeedback };
