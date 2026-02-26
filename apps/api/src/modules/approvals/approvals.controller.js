// apps/api/src/modules/approvals/approvals.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const approvalsService = require("./approvals.service");

async function list(req, res) {
  const status = req.query.status;
  const rows = await approvalsService.listApprovals({
    tenantId: req.tenant.id,
    status: status || undefined,
  });
  res.json({ ok: true, data: rows });
}

async function approve(req, res) {
  const { id } = req.params;
  const userId = req.auth?.userId;
  if (!userId) return res.status(401).json({ ok: false, error: "Unauthorized" });
  await approvalsService.approveById({ approvalId: id, approvedByUserId: userId });
  res.json({ ok: true, message: "Approved" });
}

async function reject(req, res) {
  const { id } = req.params;
  const notes = req.body?.notes;
  await approvalsService.rejectById({ approvalId: id, notes });
  res.json({ ok: true, message: "Rejected" });
}

module.exports = {
  list: asyncHandler(list),
  approve: asyncHandler(approve),
  reject: asyncHandler(reject),
};
