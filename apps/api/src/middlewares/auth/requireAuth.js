// apps/api/src/middlewares/auth/requireAuth.js
const jwt = require("jsonwebtoken");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) throw new HttpError(401, "Missing token");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // decoded: { tid, mid, role, iat, exp, sub }
    req.auth = {
      userId: decoded.sub,
      tenantId: decoded.tid,
      membershipId: decoded.mid,
      role: decoded.role,
    };

    // Prevent token from another tenant being used here
    if (req.tenant?.id && req.auth.tenantId !== req.tenant.id) {
      throw new HttpError(403, "Tenant mismatch");
    }

    next();
  } catch (e) {
    throw new HttpError(401, "Invalid token");
  }
}

module.exports = { requireAuth };
