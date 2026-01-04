import { getOrCreateDeviceId } from "./device";

const BASE_URL = import.meta.env.VITE_API_URL;

// Debug: Log API URL (remove after testing)
if (import.meta.env.DEV) {
  console.log("🔧 API Base URL:", BASE_URL || "❌ UNDEFINED - Check .env file!");
}

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

  const res = await fetch(buildUrl(path), {
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
  json?.error ||                // IMPORTANT (your backend sends error as string)
  json?.message ||
  `Request failed (${res.status})`;

    throw new ApiError(msg, res.status, json);
  }

  return json;
}
