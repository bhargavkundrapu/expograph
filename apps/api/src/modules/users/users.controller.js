// apps/api/src/modules/users/users.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./users.repo");
const { audit } = require("../audit/audit.service");
const z = require("zod");

const UpdateUserRoleSchema = z.object({
  roleId: z.string().uuid(),
});

const UpdateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

// Tenant Admin: List all users in tenant
const listTenantUsers = asyncHandler(async (req, res) => {
  const rows = await repo.listTenantUsers({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

// Tenant Admin: Get user details
const getTenantUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");
  res.json({ ok: true, data: user });
});

// Tenant Admin: Update user role
const updateUserRole = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const parsed = UpdateUserRoleSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  // Verify user exists in tenant
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");

  // Verify role exists in tenant
  const roles = await repo.listTenantRoles({ tenantId: req.tenant.id });
  const roleExists = roles.some(r => r.id === parsed.data.roleId);
  if (!roleExists) throw new HttpError(400, "Role not found in tenant");

  const updated = await repo.updateUserRole({
    tenantId: req.tenant.id,
    userId,
    roleId: parsed.data.roleId,
  });

  await audit(req, {
    action: "user.role.update",
    entityType: "user",
    entityId: userId,
    payload: { roleId: parsed.data.roleId },
  });

  res.json({ ok: true, data: updated });
});

// Tenant Admin: Update user status (active/inactive)
const updateUserStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const parsed = UpdateUserStatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  // Verify user exists in tenant
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");

  const updated = await repo.updateUserStatus({
    userId,
    isActive: parsed.data.isActive,
  });

  await audit(req, {
    action: "user.status.update",
    entityType: "user",
    entityId: userId,
    payload: { isActive: parsed.data.isActive },
  });

  res.json({ ok: true, data: updated });
});

// Tenant Admin: List available roles
const listTenantRoles = asyncHandler(async (req, res) => {
  const rows = await repo.listTenantRoles({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

module.exports = {
  listTenantUsers,
  getTenantUser,
  updateUserRole,
  updateUserStatus,
  listTenantRoles,
};

