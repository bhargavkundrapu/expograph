const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./clientLab.controller");

const router = express.Router();

router.use(requireAuth, requirePermission("clientlab:manage"));

router.post("/clients", ctrl.createClient);
router.post("/projects", ctrl.createProject);
router.post("/projects/:projectId/members", ctrl.addMember);
router.post("/projects/:projectId/tasks", ctrl.createTask);
router.patch("/tasks/:taskId/assign", ctrl.assignTask);

module.exports = { router };
