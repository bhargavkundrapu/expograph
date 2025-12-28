const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./internships.controller");

const router = express.Router();

router.use(requireAuth);

// student capabilities
router.get("/projects", requirePermission("internships:read"), ctrl.listProjects);
router.post("/batches/:batchId/apply", requirePermission("internships:apply"), ctrl.apply);
router.get("/my/applications", requirePermission("internships:apply"), ctrl.myApplications);
router.get("/my/assignments", requirePermission("internships:apply"), ctrl.myAssignments);
router.post("/assignments/:assignmentId/deliverables", requirePermission("internships:apply"), ctrl.submitDeliverable);
router.post("/assignments/:assignmentId/drop", requirePermission("internships:apply"), ctrl.drop);

module.exports = { router };
