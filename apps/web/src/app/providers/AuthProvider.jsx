import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { apiFetch, ApiError } from "../../services/api";
import {
  clearSession,
  getPermissions,
  getRole,
  getTenant,
  getToken,
  getUser,
  saveSession,
} from "../../services/session";

// Provide default values to prevent "must be used inside AuthProvider" errors
const defaultAuthValue = {
  status: "loading",
  token: null,
  role: null,
  permissions: [],
  user: null,
  tenant: null,
  login: async () => {
    throw new Error("AuthProvider not initialized");
  },
  logout: () => {
    throw new Error("AuthProvider not initialized");
  },
};

const AuthCtx = createContext(defaultAuthValue);

function readStoredSession() {
  const token = getToken();
  const role = getRole();
  return {
    token,
    role,
    permissions: getPermissions(),
    user: getUser(),
    tenant: getTenant(),
  };
}

export function AuthProvider({ children }) {
  // ✅ optimistic boot: if token exists, consider authed immediately
  const initial = readStoredSession();

  const [token, setToken] = useState(initial.token);
  const [role, setRole] = useState(initial.role);
  const [permissions, setPermissions] = useState(initial.permissions);
  const [user, setUser] = useState(initial.user);
  const [tenant, setTenant] = useState(initial.tenant);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  // status:
  // loading = we haven't finished validating
  // authed = we have a session and can use app
  // guest = no session
  const [status, setStatus] = useState(initial.token ? "authed" : "guest");

  // Premium: don't run boot twice in React StrictMode (dev)
  const bootedRef = useRef(false);

  async function validateTokenSilently(tkn) {
    // Only verify with server; do NOT logout unless 401/403
    setPermissionsLoading(true);
    try {
      const me = await apiFetch("/api/v1/me", { token: tkn });

      // Refresh permissions from server (they may have changed)
      const serverPermissions = me?.data?.permissions || [];
      if (Array.isArray(serverPermissions)) {
        // Always update permissions, even if empty (they might have been revoked)
        setPermissions(serverPermissions);
        // Update localStorage with fresh permissions
        const stored = readStoredSession();
        if (stored.token) {
          localStorage.setItem("expograph_permissions", JSON.stringify(serverPermissions));
        }
      }

      // If your /me returns user/tenant you can refresh local copy (optional)
      // but DO NOT break if it doesn't
      const maybeUser = me?.data?.user || me?.data || null;
      if (maybeUser && typeof maybeUser === "object") {
        setUser((prev) => prev ?? maybeUser);
      }

      // ✅ remain authed
      setStatus("authed");
    } catch (e) {
      // ✅ Premium rule:
      // - only logout on 401/403 (invalid/expired token)
      // - if network/server error, keep session (don't kick user out)
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
        clearSession();
        setToken(null);
        setRole(null);
        setPermissions([]);
        setUser(null);
        setTenant(null);
        setStatus("guest");
      } else {
        // keep authed, but you may optionally show a small warning later
        setStatus("authed");
      }
    } finally {
      setPermissionsLoading(false);
    }
  }

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    const stored = readStoredSession();
    if (!stored.token) {
      setStatus("guest");
      return;
    }

    // ensure states reflect stored values on refresh
    setToken(stored.token);
    setRole(stored.role);
    setPermissions(stored.permissions);
    setUser(stored.user);
    setTenant(stored.tenant);

    // validate quietly (doesn't kick out unless 401/403)
    validateTokenSilently(stored.token);
  }, []);

  // Multi-tab support (real-world): if you logout in one tab, others should update
  useEffect(() => {
    function onStorage(e) {
      if (e.key && e.key.startsWith("expograph_")) {
        const stored = readStoredSession();
        if (!stored.token) {
          setToken(null);
          setRole(null);
          setPermissions([]);
          setUser(null);
          setTenant(null);
          setStatus("guest");
        } else {
          setToken(stored.token);
          setRole(stored.role);
          setPermissions(stored.permissions);
          setUser(stored.user);
          setTenant(stored.tenant);
          setStatus("authed");
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  async function login({ email, password }) {
    const res = await apiFetch("/api/v1/auth/login", {
      method: "POST",
      body: { email, password },
    });

    const data = res?.data;
    if (!data?.token) throw new Error("Login failed: missing token");

    saveSession(data);

    setToken(data.token);
    setRole(data.role);
    setPermissions(data.permissions || []);
    setUser(data.user || null);
    setTenant(data.tenant || null);
    setStatus("authed");

    // validate once (but still only logout on 401/403)
    validateTokenSilently(data.token);

    return data;
  }

  function logout() {
    clearSession();
    setToken(null);
    setRole(null);
    setPermissions([]);
    setUser(null);
    setTenant(null);
    setStatus("guest");
  }

  const value = useMemo(
    () => ({
      status,
      token,
      role,
      permissions,
      permissionsLoading,
      user,
      tenant,
      login,
      logout,
    }),
    [status, token, role, permissions, permissionsLoading, user, tenant]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  // Context will always have a value (defaultAuthValue), so we don't need to check
  return ctx;
}
