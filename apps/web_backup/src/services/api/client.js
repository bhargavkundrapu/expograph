import { getDeviceId } from "../device";

export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    "x-device-id": getDeviceId(),
  };

  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(import.meta.env.VITE_API_URL + path, {
    ...options,
    headers,
  });

  return res;
}
