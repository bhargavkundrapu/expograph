// apps/api/src/utils/cache.js
const cache = new Map();

function nowMs() {
  return Date.now();
}

function setCache(key, value, ttlSeconds = 120) {
  cache.set(key, { value, expiresAt: nowMs() + ttlSeconds * 1000 });
}

function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (nowMs() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function delByPrefix(prefix) {
  for (const k of cache.keys()) {
    if (k.startsWith(prefix)) cache.delete(k);
  }
}

module.exports = { setCache, getCache, delByPrefix };
