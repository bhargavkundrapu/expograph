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

// SuperAdmin: Students management routes
router.get("/students", ctrl.listStudents);
router.get("/students/:userId", ctrl.getStudentWithStats);
router.post("/students", ctrl.createStudent);
router.patch("/students/:userId", ctrl.updateStudent);
router.delete("/students/:userId", ctrl.deleteStudent);

// SuperAdmin: Mentors management routes
router.get("/mentors", ctrl.listMentors);
router.get("/mentors/:mentorId", ctrl.getMentorWithStudents);
router.post("/mentors", ctrl.createMentor);
router.patch("/mentors/:mentorId", ctrl.updateMentor);
router.delete("/mentors/:mentorId", ctrl.deleteMentor);

module.exports = { router };

