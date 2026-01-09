// apps/api/src/middlewares/auth.js

const jwt = require("jsonwebtoken");
const { env } = require("../../config/env");

function getTokenFromHeader(req) {
  const header = req.headers.authorization;
  if (!header) return null;

  if (header.startsWith("Bearer ")) return header.slice(7).trim();
  return header.trim();
}

function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ ok: false, error: { message: "Missing token" } });
    }

    // ✅ same secret as auth.service.js
    const payload = jwt.verify(token, env.JWT_SECRET);

// ✅ keep original payload + add aliases (safe)
req.auth = payload;
req.auth.userId = payload.sub;
req.auth.tenantId = payload.tid;
req.auth.membershipId = payload.mid;

req.user = req.user || { id: payload.sub };
// IMPORTANT:
// If tenant was resolved earlier (host-based), it can conflict with the tenant in the JWT.
// For authenticated requests, the JWT is the source of truth for tenant context.
// Keep any existing tenant fields (slug/name) but always align the id to the JWT tenant id.
req.tenant = { ...(req.tenant || {}), id: payload.tid };
return next();

  } catch (err) {
    // (optional debug) console.error("JWT VERIFY FAIL:", err.message);
    return res.status(401).json({ ok: false, error: { message: "Invalid or expired token" } });
  }
}

module.exports = { requireAuth };
