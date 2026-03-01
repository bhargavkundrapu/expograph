// apps/api/src/utils/cache.js
const cache = new Map();
const MAX_CACHE_SIZE = 5000;

function nowMs() {
  return Date.now();
}

function setCache(key, value, ttlSeconds = 120) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
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

setInterval(() => {
  const now = nowMs();
  for (const [k, v] of cache) {
    if (now > v.expiresAt) cache.delete(k);
  }
}, 5 * 60 * 1000);

module.exports = { setCache, getCache, delByPrefix };
