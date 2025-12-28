// apps/api/src/middlewares/auth.js

const jwt = require("jsonwebtoken");
const { env } = require("../../config/env.js") // ✅ use same env loader as auth.service

function getTokenFromHeader(req) {
  const header = req.headers.authorization;
  if (!header) return null;

  // Accept: "Bearer <token>" OR "<token>"
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (m) return m[1].trim();

  return header.trim();
}

function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ ok: false, error: { message: "Missing token" } });
    }

    // ✅ Verify with SAME secret used in signToken()
    const payload = jwt.verify(token, env.JWT_SECRET);

    // ✅ Keep original payload + add friendly aliases (won't break existing code)
    req.auth = {
      ...payload,
      userId: payload.sub,        // since you sign with { subject: userId }
      tenantId: payload.tid,
      membershipId: payload.mid,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: { message: "Invalid or expired token" } });
  }
}

module.exports = { requireAuth };
