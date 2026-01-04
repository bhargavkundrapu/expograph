const KEY = "expograph_device_id";

function fallbackId() {
  // decent fallback if crypto.randomUUID is missing
  return "dev_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function getOrCreateDeviceId() {
  const existing = localStorage.getItem(KEY);
  if (existing) return existing;

  const id = (crypto?.randomUUID?.() ?? fallbackId());
  localStorage.setItem(KEY, id);
  return id;
}
