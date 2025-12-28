// apps/api/src/middlewares/auth/requireAuth.js
const jwt = require("jsonwebtoken");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) throw new HttpError(401, "Missing token");

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    // payload: { tid, mid, role, iat, exp, sub }

    req.user = {
      id: payload.sub,
      role: payload.role,
      tenantId: payload.tid,
      membershipId: payload.mid,
    };

    // fallback: if tenant middleware didn’t set tenant (localhost case)
    if (!req.tenant) {
      req.tenant = { id: payload.tid };
    }

    return next();
  } catch (e) {
    throw new HttpError(401, "Invalid token");
  }
}

module.exports = { requireAuth };
