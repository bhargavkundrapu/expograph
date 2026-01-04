// /mnt/e/ExpoGraph/apps/web/src/services/device.js
export function getDeviceId() {
  const KEY = "expograph_device_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
