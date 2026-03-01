// apps/api/src/middlewares/rbac/requirePermission.js
const { HttpError } = require("../../utils/httpError");
const { listPermissionsForUser } = require("../../modules/rbac/rbac.repo");

const cache = new Map();
const TTL_MS = 10_000;
const MAX_PERM_CACHE = 1000;

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of cache) {
    if (v.expiresAt <= now) cache.delete(k);
  }
}, 60 * 1000);

function requirePermission(permissionKey) {
  return async function (req, res, next) {
   const userId = req.user?.id || req.userId || req.auth?.userId;
   // For authenticated requests, the JWT tenantId should be the source of truth.
   // This prevents mismatches if tenant was resolved from host/default slug.
   const tenantId = req.auth?.tenantId || req.tenant?.id || req.user?.tenantId;


    if (!userId || !tenantId) throw new HttpError(401, "Unauthorized");

    const cacheKey = `${tenantId}:${userId}`;
    const now = Date.now();

    let perms = null;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      perms = cached.perms;
    } else {
      perms = await listPermissionsForUser({ tenantId, userId });
      if (cache.size >= MAX_PERM_CACHE) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(cacheKey, { perms, expiresAt: now + TTL_MS });
    }

    req.permissions = perms;

    // Debug logging in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[requirePermission] User ${userId} in tenant ${tenantId}:`, {
        permission: permissionKey,
        hasPermission: perms.includes(permissionKey),
        allPermissions: perms
      });
    }

    if (!perms.includes(permissionKey)) {
      throw new HttpError(403, "Forbidden: missing permission");
    }

    next();
  };
}

module.exports = { requirePermission };
