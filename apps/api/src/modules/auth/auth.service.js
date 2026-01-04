// apps/api/src/modules/auth/auth.service.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // if using bcryptjs, change to: require("bcryptjs")
const { z } = require("zod");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const {
  findUserByEmail,
  createUser,
  findRoleIdForTenant,
  upsertMembership,
  getMembershipWithRole,
} = require("../users/users.repo");
const { listPermissionsForUser } = require("../rbac/rbac.repo");

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1).max(100).optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken({ userId, tenantId, membershipId, roleName }) {
  return jwt.sign(
    { tid: tenantId, mid: membershipId, role: roleName },
    env.JWT_SECRET,
    { subject: userId, expiresIn: env.JWT_EXPIRES_IN }
  );
}

async function register({ tenant, body }) {
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  const fullName = parsed.data.fullName;

  const existing = await findUserByEmail(email);
  if (existing && existing.password_hash) {
    throw new HttpError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user =
    existing ??
    (await createUser({
      email,
      fullName,
      passwordHash,
    }));

  const roleId = await findRoleIdForTenant({ tenantId: tenant.id, roleName: "Student" });
  if (!roleId) throw new HttpError(500, "Student role not found for tenant");

  const membership = await upsertMembership({
    tenantId: tenant.id,
    userId: user.id,
    roleId,
  });

  const membershipWithRole = await getMembershipWithRole({ tenantId: tenant.id, userId: user.id });
  const permissions = await listPermissionsForUser({ tenantId: tenant.id, userId: user.id });

  const token = signToken({
    userId: user.id,
    tenantId: tenant.id,
    membershipId: membership.id,
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

async function login({ tenant, body }) {
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;

  const user = await findUserByEmail(email);
  if (!user || !user.password_hash) throw new HttpError(401, "Invalid credentials");
  if (!user.is_active) throw new HttpError(403, "User is inactive");

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new HttpError(401, "Invalid credentials");

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

module.exports = { register, login };