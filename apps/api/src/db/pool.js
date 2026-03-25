// apps/api/src/db/pool.js
// Use the Neon POOLED connection string (host ends with -pooler.neon.tech) for DATABASE_URL in production.
// Direct connections prevent Neon scale-to-zero.
const { env } = require("../config/env");

const isNeon = /neon\.tech/i.test(env.DATABASE_URL);

let pool;

if (isNeon) {
  try {
    const url = new URL(env.DATABASE_URL);
    const host = url.hostname || "";
    if (!host.includes("-pooler") && host.endsWith(".neon.tech")) {
      console.warn(
        "WARNING: DATABASE_URL does not appear to be a Neon pooled connection. For production use the pooled connection string ending in -pooler.neon.tech to allow proper scale-to-zero. Check Neon Console → Connection Details → Pooled connection."
      );
    }
  } catch (_) {
    // If DATABASE_URL isn't parseable here, env.js will already error elsewhere.
  }
}

// Keep pool size small (3-5) for Neon serverless to allow proper scale-to-zero.
// Large pools leave idle connections open and prevent Neon from suspending compute.
const POOL_MAX = parseInt(process.env.DB_POOL_MAX, 10) || 5;
const QUERY_TIMEOUT_MS = 15_000;
const CONNECTION_TIMEOUT_MS = 10_000;

if (isNeon) {
  const { Pool: NeonPool, neonConfig } = require("@neondatabase/serverless");
  const ws = require("ws");
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({
    connectionString: env.DATABASE_URL,
    max: POOL_MAX,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
    query_timeout: QUERY_TIMEOUT_MS,
    statement_timeout: QUERY_TIMEOUT_MS,
  });
} else {
  const { Pool } = require("pg");
  const useSSL = env.DATABASE_URL?.includes("sslmode=require");
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: true } : undefined,
    max: POOL_MAX,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
    query_timeout: QUERY_TIMEOUT_MS,
    statement_timeout: QUERY_TIMEOUT_MS,
  });
}

pool.on("error", (err) => {
  console.error("PostgreSQL Pool error:", err);
});

module.exports = { pool };
