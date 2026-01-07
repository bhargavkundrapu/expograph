// apps/api/src/modules/certificates/certificates.routes.lms.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./certificates.controller");

const router = express.Router();

router.use(requireAuth, requirePermission("certificates:read"));

router.get("/certificates/mine", ctrl.listMyCertificates);

module.exports = { router };

