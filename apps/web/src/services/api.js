import { getOrCreateDeviceId } from "./device";

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
    token,
    headers = {},
    body,
    signal,
  } = options;

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

      // Suppress console errors for 403 Forbidden (permission issues are handled in UI)
      if (res.status === 403) {
        // Still throw the error so components can handle it, but don't log to console
        throw new ApiError(msg, res.status, json);
      }

      throw new ApiError(msg, res.status, json);
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
