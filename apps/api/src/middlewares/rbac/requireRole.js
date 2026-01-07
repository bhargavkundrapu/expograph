// apps/api/src/middlewares/rbac/requireRole.js
const { HttpError } = require("../../utils/httpError");

function requireRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  return function (req, res, next) {
    // JWT payload has role in req.auth.role (set by requireAuth middleware)
    const roleName = req.auth?.role;
    
    if (!roleName) {
      throw new HttpError(401, "Unauthorized: role not found in token");
    }
    
    if (!roles.includes(roleName)) {
      throw new HttpError(403, `Forbidden: requires one of roles: ${roles.join(", ")}. Current role: ${roleName}`);
    }
    
    next();
  };
}

module.exports = { requireRole };

