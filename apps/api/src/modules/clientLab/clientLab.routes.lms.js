const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./clientLab.controller");

const router = express.Router();

router.use(requireAuth);

router.get("/projects", requirePermission("clientlab:read"), ctrl.myProjects);
router.get("/projects/:projectId/board", requirePermission("clientlab:read"), ctrl.projectBoard);
router.patch("/tasks/:taskId", requirePermission("clientlab:update"), ctrl.studentUpdateTask);

module.exports = { router };
