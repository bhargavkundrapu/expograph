// apps/api/src/middlewares/tenant/resolveTenant.js
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findTenantBySlug } = require("../../modules/tenants/tenants.repo");

const tenantCache = new Map();
const pendingBySlug = new Map();

function getTenantSlugFromHost(hostname) {
  return env.DEFAULT_TENANT_SLUG;
}

async function resolveTenant(req, res, next) {
  try {
    const isDev = env.NODE_ENV !== "production";
    const headerSlug = req.headers["x-tenant-slug"];
    let slug = getTenantSlugFromHost(req.hostname || "");
    if (isDev && headerSlug) slug = String(headerSlug).trim();
    if (!slug) slug = env.DEFAULT_TENANT_SLUG;

    const cacheKey = `slug:${slug}`;
    if (tenantCache.has(cacheKey)) {
      req.tenant = tenantCache.get(cacheKey);
      return next();
    }

    // Per-slug coalescing: concurrent requests for the same slug share one lookup
    let pending = pendingBySlug.get(cacheKey);
    if (!pending) {
      pending = findTenantBySlug(slug).finally(() => {
        pendingBySlug.delete(cacheKey);
      });
      pendingBySlug.set(cacheKey, pending);
    }
    const tenant = await pending;
    if (!tenant) throw new HttpError(400, `Unknown tenant: ${slug}`);

    tenantCache.set(cacheKey, tenant);
    req.tenant = tenant;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { resolveTenant };
