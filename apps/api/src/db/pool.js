// apps/api/src/db/pool.js
const { env } = require("../config/env");

const isNeon = /neon\.tech/i.test(env.DATABASE_URL);

let pool;

const POOL_MAX = parseInt(process.env.DB_POOL_MAX, 10) || 25;

if (isNeon) {
  const { Pool: NeonPool, neonConfig } = require("@neondatabase/serverless");
  const ws = require("ws");
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({
    connectionString: env.DATABASE_URL,
    max: POOL_MAX,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 30_000,
  });
} else {
  const { Pool } = require("pg");
  const useSSL = env.DATABASE_URL?.includes("sslmode=require");
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: true } : undefined,
    max: POOL_MAX,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 20_000,
  });
}

pool.on("error", (err) => {
  console.error("PostgreSQL Pool error:", err);
});

module.exports = { pool };
