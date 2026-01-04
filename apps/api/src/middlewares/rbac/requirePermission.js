// apps/api/src/middlewares/rbac/requirePermission.js
const { HttpError } = require("../../utils/httpError");
const { listPermissionsForUser } = require("../../modules/rbac/rbac.repo");

// small cache: key -> { perms, expiresAt }
const cache = new Map();
const TTL_MS = 60_000;

function requirePermission(permissionKey) {
  return async function (req, res, next) {
   const userId = req.user?.id || req.userId || req.auth?.userId;
const tenantId = req.tenant?.id || req.user?.tenantId || req.auth?.tenantId;


    if (!userId || !tenantId) throw new HttpError(401, "Unauthorized");

    const cacheKey = `${tenantId}:${userId}`;
    const now = Date.now();

    let perms = null;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      perms = cached.perms;
    } else {
      perms = await listPermissionsForUser({ tenantId, userId });
      cache.set(cacheKey, { perms, expiresAt: now + TTL_MS });
    }

    req.permissions = perms;

    if (!perms.includes(permissionKey)) {
      throw new HttpError(403, "Forbidden: missing permission");
    }

    next();
  };
}

module.exports = { requirePermission };
