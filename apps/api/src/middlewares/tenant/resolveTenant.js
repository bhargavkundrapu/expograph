// apps/api/src/middlewares/tenant/resolveTenant.js
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findTenantBySlug } = require("../../modules/tenants/tenants.repo");

const tenantCache = new Map();
let pendingLookup = null;

function getTenantSlugFromHost(hostname) {
  return env.DEFAULT_TENANT_SLUG;
}

async function resolveTenant(req, res, next) {
  try {
    const isDev = env.NODE_ENV !== "production";
    const headerSlug = req.headers["x-tenant-slug"];
    let slug = getTenantSlugFromHost(req.hostname || "");
    if (isDev && headerSlug) slug = String(headerSlug).trim();

    const cacheKey = `slug:${slug}`;
    if (tenantCache.has(cacheKey)) {
      req.tenant = tenantCache.get(cacheKey);
      return next();
    }

    // Coalesce concurrent lookups for the same slug into one DB call
    if (!pendingLookup) {
      pendingLookup = findTenantBySlug(slug).finally(() => { pendingLookup = null; });
    }
    const tenant = await pendingLookup;
    if (!tenant) throw new HttpError(400, `Unknown tenant: ${slug}`);

    tenantCache.set(cacheKey, tenant);
    req.tenant = tenant;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { resolveTenant };
