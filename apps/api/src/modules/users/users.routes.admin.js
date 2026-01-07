// apps/api/src/modules/users/users.routes.admin.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./users.controller");

const router = express.Router();

// Tenant Admin routes - require tenant admin permissions
router.use(requireAuth, requirePermission("users:manage"));

router.get("/users", ctrl.listTenantUsers);
router.get("/users/:userId", ctrl.getTenantUser);
router.patch("/users/:userId/role", ctrl.updateUserRole);
router.patch("/users/:userId/status", ctrl.updateUserStatus);
router.get("/roles", ctrl.listTenantRoles);

module.exports = { router };

