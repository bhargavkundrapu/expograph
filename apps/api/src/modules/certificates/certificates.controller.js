// apps/api/src/modules/certificates/certificates.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./certificates.repo");
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

module.exports = { issueAdmin, verifyPublic };
