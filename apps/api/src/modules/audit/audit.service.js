// apps/api/src/modules/audit/audit.service.js
const repo = require("./audit.repo");

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.ip;
}

async function audit(req, { action, entityType, entityId, payload }) {
  // if tenant missing, don’t crash the app (but ideally tenant always exists)
  const tenantId = req.tenant?.id;
  if (!tenantId) return;

  await repo.insertAuditLog({
    tenantId,
    actorUserId: req.auth?.userId ?? null,
    action,
    entityType,
    entityId,
    payload,
    ip: getClientIp(req),
    userAgent: req.headers["user-agent"],
  });
}

module.exports = { audit };
