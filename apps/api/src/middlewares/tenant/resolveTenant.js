// apps/api/src/middlewares/tenant/resolveTenant.js
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { findTenantBySlug } = require("../../modules/tenants/tenants.repo");

// tiny in-memory cache (fast + ok for v0)
const tenantCache = new Map(); // slug -> tenant

function getTenantSlugFromHost(hostname) {
  // Phase 1: default tenant
  // Phase 2 (future): parse subdomain like {tenant}.expograph.in
  // We'll keep it simple now.
  return env.DEFAULT_TENANT_SLUG;
}

async function resolveTenant(req, res, next) {
  const host = req.hostname || req.headers.host || "";
  const slug = getTenantSlugFromHost(host);

  if (tenantCache.has(slug)) {
    req.tenant = tenantCache.get(slug);
    return next();
  }

  const tenant = await findTenantBySlug(slug);
  if (!tenant) throw new HttpError(400, `Unknown tenant: ${slug}`);

  tenantCache.set(slug, tenant);
  req.tenant = tenant;
  next();
}

module.exports = { resolveTenant };
