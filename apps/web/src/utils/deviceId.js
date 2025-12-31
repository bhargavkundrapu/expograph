export function getDeviceId() {
  const KEY = 'expograph_device_id'
  let id = localStorage.getItem(KEY)
  if (!id) {
    // crypto.randomUUID is supported in modern browsers
    id = (globalThis.crypto?.randomUUID?.() || `dev_${Math.random().toString(16).slice(2)}_${Date.now()}`)
    localStorage.setItem(KEY, id)
  }
  return id
}
