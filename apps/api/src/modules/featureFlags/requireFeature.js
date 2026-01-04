// apps/api/src/middlewares/feature/requireFeature.js
const { query } = require("../../db/query");

function requireFeature(flagKey) {
  return async (req, res, next) => {
    const tenantId = req.tenant?.id;
    if (!tenantId) return res.status(500).json({ ok: false, error: "Tenant missing" });

    const { rows } = await query(
      `SELECT enabled FROM feature_flags WHERE tenant_id=$1 AND key=$2 LIMIT 1`,
      [tenantId, flagKey]
    );

    const enabled = rows[0]?.enabled === true;
    if (!enabled) return res.status(404).json({ ok: false, error: "Not found" }); // hides feature existence
    next();
  };
}

module.exports = { requireFeature };
