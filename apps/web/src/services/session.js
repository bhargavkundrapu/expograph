const TOKEN_KEY = "expograph_token";
const ROLE_KEY = "expograph_role";
const PERMS_KEY = "expograph_permissions";
const USER_KEY = "expograph_user";     // optional convenience
const TENANT_KEY = "expograph_tenant"; // optional convenience

export function saveSession(data) {
  // data is authService login response: { token, user, tenant, role, permissions }
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ROLE_KEY, data.role);
  localStorage.setItem(PERMS_KEY, JSON.stringify(data.permissions || []));
  localStorage.setItem(USER_KEY, JSON.stringify(data.user || null));
  localStorage.setItem(TENANT_KEY, JSON.stringify(data.tenant || null));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(PERMS_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TENANT_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function getPermissions() {
  try {
    return JSON.parse(localStorage.getItem(PERMS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function getTenant() {
  try {
    return JSON.parse(localStorage.getItem(TENANT_KEY) || "null");
  } catch {
    return null;
  }
}
