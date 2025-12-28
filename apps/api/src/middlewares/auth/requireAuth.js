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

    req.auth = payload;
    return next();
  } catch (err) {
    // (optional debug) console.error("JWT VERIFY FAIL:", err.message);
    return res.status(401).json({ ok: false, error: { message: "Invalid or expired token" } });
  }
}

module.exports = { requireAuth };
