import { getOrCreateDeviceId } from "./device";

// Smart API URL detection: use .env, fallback to production, or localhost
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV 
    ? "http://localhost:4000"  // Try local first in dev
    : "https://api.expograph.in");  // Production fallback

// Debug: Log API URL (remove after testing)
if (import.meta.env.DEV) {
  console.log("🔧 API Base URL:", BASE_URL);
  if (!import.meta.env.VITE_API_URL) {
    console.warn("⚠️  VITE_API_URL not set in .env, using:", BASE_URL);
  }
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function buildUrl(path, baseUrl = BASE_URL) {
  // allow passing full URL sometimes
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Cache for production API URL to avoid repeated checks
let productionApiUrl = null;
let localApiFailed = false;

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    token,
    headers = {},
    body,
    signal,
  } = options;

  const deviceId = getOrCreateDeviceId();
  
  // Smart fallback: if local API failed before, use production
  let currentBaseUrl = BASE_URL;
  if (localApiFailed && import.meta.env.DEV && BASE_URL.includes("localhost")) {
    currentBaseUrl = "https://api.expograph.in";
    if (!productionApiUrl) {
      console.log("🔄 Local API unavailable, using production API:", currentBaseUrl);
      productionApiUrl = currentBaseUrl;
    }
  }
  
  const url = buildUrl(path, currentBaseUrl);

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
        json?.error ||                // IMPORTANT (your backend sends error as string)
        json?.message ||
        `Request failed (${res.status})`;

      throw new ApiError(msg, res.status, json);
    }

    return json;
  } catch (error) {
    // Handle network errors - try production API as fallback in dev mode
    if (error instanceof TypeError && error.message.includes("fetch")) {
      // If we're in dev and using localhost, try production API
      if (import.meta.env.DEV && BASE_URL.includes("localhost") && !localApiFailed) {
        localApiFailed = true;
        console.warn("⚠️  Local API unavailable, retrying with production API...");
        // Retry with production API
        return apiFetch(path, options);
      }
      
      const apiUrl = currentBaseUrl || BASE_URL || "http://localhost:4000";
      throw new ApiError(
        `Cannot connect to API server at ${apiUrl}. ${localApiFailed ? "Using production API." : "Make sure the API server is running on port 4000."}`,
        0,
        { originalError: error.message, url }
      );
    }
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }
    // Wrap other errors
    throw new ApiError(error.message || "Network error", 0, { originalError: error });
  }
}
