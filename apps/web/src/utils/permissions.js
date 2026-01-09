/**
 * Permission utility functions
 * Helps check user permissions before making API calls
 */

/**
 * Check if user has a specific permission
 * @param {string[]} permissions - Array of permission keys
 * @param {string} permission - Permission key to check
 * @returns {boolean}
 */
export function hasPermission(permissions, permission) {
  if (!permissions || !Array.isArray(permissions)) return false;
  return permissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 * @param {string[]} permissions - Array of permission keys
 * @param {string[]} requiredPermissions - Array of permission keys to check
 * @returns {boolean}
 */
export function hasAnyPermission(permissions, requiredPermissions) {
  if (!permissions || !Array.isArray(permissions)) return false;
  if (!requiredPermissions || !Array.isArray(requiredPermissions)) return false;
  return requiredPermissions.some(perm => permissions.includes(perm));
}

/**
 * Get a user-friendly error message for missing permissions
 * @param {string} permission - Missing permission key
 * @returns {string}
 */
export function getPermissionErrorMessage(permission) {
  const messages = {
    'internships:read': "You don't have permission to view internships. Please contact your administrator to grant 'internships:read' permission.",
    'internships:apply': "You don't have permission to apply to internships. Please contact your administrator to grant 'internships:apply' permission.",
    'clientlab:read': "You don't have permission to view client lab projects. Please contact your administrator to grant 'clientlab:read' permission.",
    'clientlab:update': "You don't have permission to update client lab projects. Please contact your administrator to grant 'clientlab:update' permission.",
    'certificates:read': "You don't have permission to view certificates. Please contact your administrator to grant 'certificates:read' permission.",
    'media:token': "You don't have permission to access media. Please contact your administrator to grant 'media:token' permission.",
  };
  
  return messages[permission] || `You don't have the required permission: ${permission}. Please contact your administrator.`;
}
