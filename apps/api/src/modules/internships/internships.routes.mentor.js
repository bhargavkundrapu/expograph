const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./internships.controller");

const router = express.Router();

router.use(requireAuth, requirePermission("internships:manage"));

// create/manage
router.post("/projects", ctrl.createProject);
router.patch("/projects/:projectId/status", ctrl.setProjectStatus);
router.post("/projects/:projectId/batches", ctrl.createBatch);

// pipeline
router.get("/applications", ctrl.listApplications);
router.post("/applications/:applicationId/approve", ctrl.approve);
router.post("/applications/:applicationId/reject", ctrl.reject);

// review
router.post("/deliverables/:deliverableId/review", ctrl.reviewDeliverable);

module.exports = { router };
