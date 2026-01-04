import { getDeviceId } from "../device";

const ENV_URL = (import.meta.env.VITE_API_URL || "").trim();

function detectBaseUrl() {
  if (ENV_URL) return ENV_URL;

  // fallback: if you are on expograph.in, use api.expograph.in
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.endsWith("expograph.in")) return "https://api.expograph.in";
  }

  // dev fallback
  return "http://localhost:4000";
}

const BASE_URL = detectBaseUrl();

export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    "x-device-id": getDeviceId(),
  };

  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // parse json safely
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = null; }

  if (!res.ok) {
    const msg = json?.error?.message || json?.error || json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return json;
}
