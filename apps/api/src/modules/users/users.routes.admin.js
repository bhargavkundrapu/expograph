// apps/api/src/modules/users/users.routes.admin.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./users.controller");

const router = express.Router();

// Tenant Admin routes - require TenantAdmin or SuperAdmin role
router.use(requireAuth, requireRole(["TenantAdmin", "SuperAdmin"]));

router.get("/users", ctrl.listTenantUsers);
router.get("/users/roles", ctrl.listTenantRoles); // Must come before /users/:userId
router.get("/users/:userId", ctrl.getTenantUser);
router.patch("/users/:userId/role", ctrl.updateUserRole);
router.patch("/users/:userId/status", ctrl.updateUserStatus);

module.exports = { router };

