// apps/api/src/middlewares/tenant/resolveTenant.js
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findTenantBySlug } = require("../../modules/tenants/tenants.repo");

// tiny in-memory cache (fast + ok for v0)
// key can be "slug:expograph"
const tenantCache = new Map();

function getTenantSlugFromHost(hostname) {
  // Phase 1: default tenant
  // Phase 2 (future): parse subdomain like {tenant}.expograph.in
  return env.DEFAULT_TENANT_SLUG;
}

async function resolveTenant(req, res, next) {
  try {
    const host = req.hostname || req.headers.host || "";

    // ✅ DEV-ONLY override (safe)
    // Production lo headers ignore (so no security issue).
    const isDev = env.NODE_ENV !== "production";

    // Node headers are lowercase:
    const headerSlug = req.headers["x-tenant-slug"];
    const headerTenantId = req.headers["x-tenant-id"]; // optional (not recommended without DB lookup)

    let slug = getTenantSlugFromHost(host);

    // ✅ If DEV and x-tenant-slug is provided, use it
    if (isDev && headerSlug) {
      slug = String(headerSlug).trim();
    }

    // Cache check
    const cacheKey = `slug:${slug}`;
    if (tenantCache.has(cacheKey)) {
      req.tenant = tenantCache.get(cacheKey);
      return next();
    }

    // Fetch tenant by slug (DB lookup is safest & future-proof)
    const tenant = await findTenantBySlug(slug);
    if (!tenant) throw new HttpError(400, `Unknown tenant: ${slug}`);

    // Cache + attach
    tenantCache.set(cacheKey, tenant);
    req.tenant = tenant;

    // ✅ Optional: If you insist on x-tenant-id for dev, we can allow it,
    // BUT safest approach is still slug. TenantId without DB fetch may break
    // future code that expects name/slug/settings.
    // So we won't override req.tenant using x-tenant-id here by default.
    // (If you want, I’ll give a safe version that still does DB fetch by id.)

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { resolveTenant };
