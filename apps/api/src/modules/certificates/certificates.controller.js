// apps/api/src/modules/certificates/certificates.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./certificates.repo");
const certificationsRepo = require("../certifications/certifications.repo");
const { audit } = require("../audit/audit.service");

function randomCode() {
  // short, unique-ish, readable
  return "EXPO-" + Math.random().toString(16).slice(2, 6).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
}

// ADMIN: POST /api/v1/admin/certificates/issue
const issueAdmin = asyncHandler(async (req, res) => {
  const { userId, courseId, title, meta } = req.body || {};
  if (!userId) throw new HttpError(400, "userId required");
  if (!title) throw new HttpError(400, "title required");

  // try a few times in case unique collision
  let cert = null;
  for (let i = 0; i < 5; i++) {
    try {
      cert = await repo.issueCertificate({
        tenantId: req.tenant.id,
        userId,
        courseId,
        title,
        verifyCode: randomCode(),
        meta: meta && typeof meta === "object" ? meta : {},
        createdBy: req.auth?.userId,
      });
      break;
    } catch (e) {
      if (e.code === "23505") continue; // unique violation
      throw e;
    }
  }
  if (!cert) throw new HttpError(500, "Could not generate verify code");

  await audit(req, {
    action: "certificate.issued",
    entityType: "certificate",
    entityId: cert.id,
    payload: { userId, title },
  });

  res.status(201).json({ ok: true, data: cert });
});

// PUBLIC: GET /api/v1/public/verify/cert/:code
const verifyPublic = asyncHandler(async (req, res) => {
  const code = String(req.params.code || "").trim();
  if (!code) throw new HttpError(400, "Invalid code");

  const row = await repo.findByVerifyCode({ verifyCode: code });
  if (!row) throw new HttpError(404, "Certificate not found");

  res.json({
    ok: true,
    data: {
      title: row.title,
      issuedAt: row.issued_at,
      verifyCode: row.verify_code,
      // keep it safe: no phone, no private details
      email: row.email,
    },
  });
});

// STUDENT: GET /api/v1/lms/certificates/mine
const listMyCertificates = asyncHandler(async (req, res) => {
  const data = await repo.listMyCertificates({
    tenantId: req.tenant.id,
    userId: req.auth.userId,
  });
  res.json({ ok: true, data });
});

// STUDENT: POST /api/v1/lms/certificates/ensure-issued
const ensureMyCertificateIssued = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.auth.userId;
  const courseId = req.body?.courseId;
  if (!courseId) throw new HttpError(400, "courseId required");

  const existing = await repo.findByUserAndCourse({ tenantId, userId, courseId });
  if (existing) return res.json({ ok: true, data: existing });

  const approvedRequest = await certificationsRepo.findApprovedByUserAndCourse({
    tenantId,
    userId,
    courseId,
  });
  if (!approvedRequest) {
    throw new HttpError(409, "Certificate request is not approved yet");
  }

  let issued = null;
  for (let i = 0; i < 5; i++) {
    try {
      issued = await repo.issueCertificate({
        tenantId,
        userId,
        courseId,
        title: "Course Certificate",
        verifyCode: randomCode(),
        meta: {
          source: "student_download_self_heal",
          request_id: approvedRequest.id,
        },
        createdBy: userId,
      });
      break;
    } catch (e) {
      if (e.code === "23505") continue;
      throw e;
    }
  }
  if (!issued) throw new HttpError(500, "Could not issue certificate");
  res.status(201).json({ ok: true, data: issued });
});

// ADMIN: GET /api/v1/admin/certificates
const listAllCertificates = asyncHandler(async (req, res) => {
  const { userId, courseId } = req.query || {};
  const data = await repo.listAllCertificates({
    tenantId: req.tenant.id,
    userId: userId || null,
    courseId: courseId || null,
  });
  res.json({ ok: true, data });
});

// ADMIN: GET /api/v1/admin/certificates/:id
const getCertificate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const certificate = await repo.getCertificate({ tenantId: req.tenant.id, id });
  if (!certificate) throw new HttpError(404, "Certificate not found");
  res.json({ ok: true, data: certificate });
});

module.exports = { 
  issueAdmin, 
  verifyPublic, 
  listMyCertificates,
  ensureMyCertificateIssued,
  listAllCertificates,
  getCertificate,
};
