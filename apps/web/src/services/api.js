import { getOrCreateDeviceId } from "./device";
import { getToken, clearSession } from "./session";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function buildUrl(path) {
  // allow passing full URL sometimes
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    token: tokenOpt,
    headers = {},
    body,
    signal,
  } = options;

  const token = tokenOpt ?? (typeof localStorage !== "undefined" ? getToken() : null);

  const deviceId = getOrCreateDeviceId();
  const url = buildUrl(path);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });

    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      const msg =
        json?.error?.message ||
        json?.error ||
        json?.message ||
        `Request failed (${res.status})`;

      const error = new ApiError(msg, res.status, json);

      if (res.status === 401 && token) {
        clearSession();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        throw error;
      }

      if (res.status === 403) {
        // Still throw the error so components can handle it, but don't log to console
        throw error;
      }

      // Suppress console errors for 404 Not Found when fallback data might be available
      if (res.status === 404) {
        // Mark as 404 so components can handle it silently with fallback data
        error.isNotFound = true;
        // Still throw the error so components can handle it
        throw error;
      }

      // Suppress console errors for 500 with missing table errors (expected during development)
      // Mark these errors so components can handle them silently
      if (res.status === 500 && (msg.includes("does not exist") || msg.includes("relation"))) {
        // Set a flag to indicate this is an expected error that should be handled silently
        error.isMissingTableError = true;
        // Still throw the error so components can handle it, but don't log to console
        throw error;
      }

      throw error;
    }

    return json;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        `Cannot connect to API server. Make sure the API server is running on port 4000.`,
        0,
        { originalError: error.message, url }
      );
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Network error", 0, { originalError: error });
  }
}
