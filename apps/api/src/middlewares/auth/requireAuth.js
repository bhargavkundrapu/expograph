// apps/api/src/middlewares/auth/requireAuth.js
const jwt = require("jsonwebtoken");

function getBearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return null;
  const [type, token] = String(header).split(" ");
  if (type !== "Bearer" || !token) return null;
  return token.trim();
}

function requireAuth(req, res, next) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({
        ok: false,
        error: { message: "Missing Authorization: Bearer <token>" },
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        ok: false,
        error: { message: "JWT_SECRET not configured on server" },
      });
    }

    const decoded = jwt.verify(token, secret);

    // ✅ STANDARD identity object (use everywhere)
    // Fallbacks included so old tokens / old code won't break.
    const userId = decoded.sub || decoded.userId || decoded.id;
    const tenantId = decoded.tid || decoded.tenantId;
    const membershipId = decoded.mid || decoded.membershipId;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        error: { message: "Invalid token: user id missing" },
      });
    }

    req.auth = {
      userId,
      tenantId: tenantId || null,
      membershipId: membershipId || null,
      role: decoded.role || null,
      raw: decoded, // keep full decoded for debugging if needed
    };

    // ✅ Backward compatibility (if any older code uses req.user)
    req.user = { id: userId, ...decoded };

    return next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      error: { message: "Invalid or expired token" },
    });
  }
}

module.exports = { requireAuth };
