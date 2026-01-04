// /mnt/e/ExpoGraph/apps/api/src/modules/debug/debug.routes.js
const express = require("express");

const authMod = require("../../middlewares/auth/requireAuth");
// If it exports function مباشرة -> use it
// If it exports { requireAuth } -> use that
const requireAuth = typeof authMod === "function" ? authMod : authMod.requireAuth;

const router = express.Router();

router.get("/whoami", requireAuth, (req, res) => {
  res.json({
    user: req.user || null,
    tenant: req.tenant || null,
    headersHost: req.headers.host,
  });
});

module.exports = router;
