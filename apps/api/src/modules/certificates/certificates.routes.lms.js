// apps/api/src/modules/certificates/certificates.routes.lms.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./certificates.controller");

const router = express.Router();

// IMPORTANT:
// This router is mounted at "/api/v1/lms" in createApp.js.
// Do NOT apply certificates permission checks globally here, otherwise it will
// block other LMS routes like internships and client-lab.
router.get(
  "/certificates/mine",
  requireAuth,
  requirePermission("certificates:read"),
  ctrl.listMyCertificates
);

module.exports = { router };

