// apps/api/src/modules/auth/auth.service.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findUserByEmail, getMembershipWithRole } = require("../users/users.repo");
const { listPermissionsForUser } = require("../rbac/rbac.repo");
const { createOtp, verifyOtp, purgeOtpsForEmail } = require("./auth.otp.repo");
const { sendOtpEmail } = require("./auth.email.service");

const ADMIN_ROLES = ["SuperAdmin", "TenantAdmin"];

const RequestOtpSchema = z.object({
  email: z.string().email(),
});

const VerifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

const AdminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
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
  if (!user) {
    throw new HttpError(404, "User not found. Please contact support or purchase a course to get started.");
  }
  if (!user.is_active) {
    throw new HttpError(403, "Your account is deactivated. Please contact support.");
  }

  const membership = await getMembershipWithRole({ tenantId: tenant.id, userId: user.id });
  if (!membership) {
    throw new HttpError(403, "No active enrollment found. Please purchase a course or contact support.");
  }

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

  const result = await verifyOtp(email, otp);
  if (result.locked) {
    throw new HttpError(429, "Too many failed attempts. Please request a new OTP.");
  }
  if (!result.valid) {
    const hint = result.attemptsLeft != null ? ` (${result.attemptsLeft} attempts left)` : "";
    throw new HttpError(401, `Invalid or expired OTP. Please try again${hint}.`);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    await purgeOtpsForEmail(email);
    throw new HttpError(404, "User not found. Your account may not have been created yet.");
  }
  if (!user.is_active) {
    await purgeOtpsForEmail(email);
    throw new HttpError(403, "Your account is deactivated. Please contact support.");
  }

  const membershipWithRole = await getMembershipWithRole({ tenantId: tenant.id, userId: user.id });
  if (!membershipWithRole) {
    await purgeOtpsForEmail(email);
    throw new HttpError(403, "No active enrollment found. Please purchase a course or wait for admin approval.");
  }

  const permissions = await listPermissionsForUser({ tenantId: tenant.id, userId: user.id });

  const token = signToken({
    userId: user.id,
    tenantId: tenant.id,
    membershipId: membershipWithRole.membership_id,
    roleName: membershipWithRole.role_name,
  });

  return {
    token,
    user: { id: user.id, email: user.email, fullName: user.full_name, phone: user.phone || "" },
    tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name },
    role: membershipWithRole.role_name,
    permissions,
  };
}

async function adminLogin({ tenant, body }) {
  const parsed = AdminLoginSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;

  const user = await findUserByEmail(email);
  if (!user) throw new HttpError(401, "Invalid email or password.");
  if (!user.is_active) throw new HttpError(403, "Account is deactivated. Contact support.");

  if (!user.password_hash) {
    throw new HttpError(401, "Password login is not configured for this account. Please contact your administrator.");
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new HttpError(401, "Invalid email or password.");

  const membershipWithRole = await getMembershipWithRole({ tenantId: tenant.id, userId: user.id });
  if (!membershipWithRole) throw new HttpError(403, "No membership for this tenant.");

  if (!ADMIN_ROLES.includes(membershipWithRole.role_name)) {
    throw new HttpError(403, "Admin login is only available for administrator accounts.");
  }

  const permissions = await listPermissionsForUser({ tenantId: tenant.id, userId: user.id });

  const token = signToken({
    userId: user.id,
    tenantId: tenant.id,
    membershipId: membershipWithRole.membership_id,
    roleName: membershipWithRole.role_name,
  });

  return {
    token,
    user: { id: user.id, email: user.email, fullName: user.full_name, phone: user.phone || "" },
    tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name },
    role: membershipWithRole.role_name,
    permissions,
  };
}

module.exports = { requestOtp, verifyOtpAndLogin, adminLogin };