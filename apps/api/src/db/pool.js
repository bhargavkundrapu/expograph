// apps/api/src/db/pool.js
const { env } = require("../config/env");

const isNeon = /neon\.tech/i.test(env.DATABASE_URL);

let pool;

const POOL_MAX = parseInt(process.env.DB_POOL_MAX, 10) || 25;
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
