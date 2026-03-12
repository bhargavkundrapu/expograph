// apps/api/src/modules/certifications/certifications.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const certificationsService = require("./certifications.service");
const certificationsRepo = require("./certifications.repo");

// ----- Student (require Student role) -----

const getEligible = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  const userId = req.auth?.userId;
  if (!tenantId || !userId) throw new HttpError(401, "Unauthorized");

  const data = await certificationsService.getEligible({ tenantId, userId });
  res.json({ ok: true, data });
});

const postRequest = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  const userId = req.auth?.userId;
  const { course_id: courseId } = req.body || {};
  if (!tenantId || !userId) throw new HttpError(401, "Unauthorized");
  if (!courseId) throw new HttpError(400, "course_id required");

  const result = await certificationsService.requestCertificate({
    tenantId,
    userId,
    courseId,
  });

  if (!result.allowed) {
    if (result.reason === "not_enrolled") {
      throw new HttpError(403, "You are not enrolled in this course");
    }
    if (result.reason === "progress_under_100") {
      throw new HttpError(400, "Course progress must be 100% to request a certificate");
    }
    throw new HttpError(400, "Cannot request certificate");
  }

  const request = result.request;
  if (!request) throw new HttpError(500, "Request could not be created");

  res.status(result.existing ? 200 : 201).json({
    ok: true,
    data: {
      id: request.id,
      status: request.status,
      course_id: request.course_id,
      requested_at: request.requested_at,
    },
  });
});

// ----- Admin (SuperAdmin only) -----

const getRequests = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  const { status } = req.query || {};
  if (!tenantId) throw new HttpError(401, "Unauthorized");

  const data = await certificationsRepo.listForAdmin({
    tenantId,
    status: status || undefined,
  });
  res.json({ ok: true, data });
});

const postApprove = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  const userId = req.auth?.userId;
  const id = req.params.id;
  if (!tenantId || !userId) throw new HttpError(401, "Unauthorized");
  if (!id) throw new HttpError(400, "Request id required");

  const row = await certificationsRepo.getByIdForAdmin({ tenantId, id });
  if (!row) throw new HttpError(404, "Certificate request not found");

  const updated = await certificationsRepo.approve({
    tenantId,
    id,
    decidedBy: userId,
  });
  if (updated) {
    return res.json({ ok: true, data: { id: updated.id, status: updated.status } });
  }
  if (row.status !== "pending") {
    return res.json({ ok: true, data: { id: row.id, status: row.status } });
  }
  throw new HttpError(500, "Could not approve");
});

const postReject = asyncHandler(async (req, res) => {
  const tenantId = req.tenant?.id;
  const userId = req.auth?.userId;
  const id = req.params.id;
  const { reason } = req.body || {};
  if (!tenantId || !userId) throw new HttpError(401, "Unauthorized");
  if (!id) throw new HttpError(400, "Request id required");

  const row = await certificationsRepo.getByIdForAdmin({ tenantId, id });
  if (!row) throw new HttpError(404, "Certificate request not found");

  const updated = await certificationsRepo.reject({
    tenantId,
    id,
    decidedBy: userId,
    reason: reason ?? null,
  });
  if (!updated) throw new HttpError(500, "Could not reject");
  res.json({ ok: true, data: { id: updated.id, status: updated.status } });
});

module.exports = {
  getEligible,
  postRequest,
  getRequests,
  postApprove,
  postReject,
};
