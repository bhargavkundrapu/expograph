// apps/api/src/modules/auth/auth.service.js
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findUserByEmail, getMembershipWithRole } = require("../users/users.repo");
const { listPermissionsForUser } = require("../rbac/rbac.repo");
const { createOtp, verifyOtp } = require("./auth.otp.repo");
const { sendOtpEmail } = require("./auth.email.service");

const RequestOtpSchema = z.object({
  email: z.string().email(),
});

const VerifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

function signToken({ userId, tenantId, membershipId, roleName }) {
  return jwt.sign(
    { tid: tenantId, mid: membershipId, role: roleName },
    env.JWT_SECRET,
    { subject: userId, expiresIn: env.JWT_EXPIRES_IN }
  );
}

async function requestOtp({ tenant, body }) {
  const parsed = RequestOtpSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const email = parsed.data.email.trim().toLowerCase();
  const user = await findUserByEmail(email);
  if (!user) throw new HttpError(404, "No account found with this email.");
  if (!user.is_active) throw new HttpError(403, "User is inactive");

  const { otpCode } = await createOtp(email);
  await sendOtpEmail({ to: email, otpCode, appName: tenant?.name || "ExpoGraph" });

  return { ok: true, message: "OTP sent to your email" };
}

async function verifyOtpAndLogin({ tenant, body }) {
  const parsed = VerifyOtpSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const email = parsed.data.email.trim().toLowerCase();
  const otp = parsed.data.otp.trim();

  const { valid } = await verifyOtp(email, otp);
  if (!valid) throw new HttpError(401, "Invalid or expired OTP. Please request a new code.");

  const user = await findUserByEmail(email);
  if (!user || !user.is_active) throw new HttpError(403, "User is inactive");

  const membershipWithRole = await getMembershipWithRole({ tenantId: tenant.id, userId: user.id });
  if (!membershipWithRole) throw new HttpError(403, "No membership for this tenant");

  const permissions = await listPermissionsForUser({ tenantId: tenant.id, userId: user.id });

  const token = signToken({
    userId: user.id,
    tenantId: tenant.id,
    membershipId: membershipWithRole.membership_id,
    roleName: membershipWithRole.role_name,
  });

  return {
    token,
    user: { id: user.id, email: user.email, fullName: user.full_name },
    tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name },
    role: membershipWithRole.role_name,
    permissions,
  };
}

module.exports = { requestOtp, verifyOtpAndLogin };