// apps/api/src/modules/certificates/certificates.routes.admin.js
const express = require("express");
const ctrl = require("./certificates.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();
router.use(requireAuth, requirePermission("certificates:issue"));

router.post("/certificates/issue", ctrl.issueAdmin);
router.get("/certificates", ctrl.listAllCertificates);
router.get("/certificates/:id", ctrl.getCertificate);

module.exports = { router };
