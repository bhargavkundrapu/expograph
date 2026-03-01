const express = require("express");

const authMod = require("../../middlewares/auth/requireAuth");
const requireAuth = typeof authMod === "function" ? authMod : authMod.requireAuth;

const router = express.Router();

router.get("/whoami", requireAuth, (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  res.json({
    user: req.user || null,
    tenant: req.tenant || null,
    headersHost: req.headers.host,
  });
});

module.exports = router;
