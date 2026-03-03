/**
 * Public colleges API — GET /api/v1/public/colleges
 * Returns tenant-scoped list for purchase form dropdown (no auth).
 * Mount at /api/v1/public, route is /colleges.
 */
const express = require("express");
const { publicApiLimiter } = require("../../middlewares/rate-limit/rateLimiters");
const repo = require("./colleges.repo");

const router = express.Router();
router.use(publicApiLimiter);

router.get("/colleges", async (req, res, next) => {
  try {
    const tenantId = req.tenant?.id;
    const rows = tenantId ? await repo.listByTenant({ tenantId }) : [];
    res.json({ ok: true, data: rows });
  } catch (e) {
    next(e);
  }
});

module.exports = { router };
