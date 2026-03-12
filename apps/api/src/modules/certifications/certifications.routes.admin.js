// apps/api/src/modules/certifications/certifications.routes.admin.js
// Admin routes: GET /requests, POST /requests/:id/approve, POST /requests/:id/reject
// Mount at /api/v1/admin/certifications
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./certifications.controller");

const router = express.Router();
router.use(requireAuth, requireRole(["SuperAdmin"]));

router.get("/requests", ctrl.getRequests);
router.post("/requests/:id/approve", ctrl.postApprove);
router.post("/requests/:id/reject", ctrl.postReject);

module.exports = { router };
