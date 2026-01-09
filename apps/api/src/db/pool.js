// apps/api/src/db/pool.js
const { Pool } = require("pg");
const { env } = require("../config/env");

// Neon needs SSL. Auto-detect based on URL.
const useSSL = /neon\.tech/i.test(env.DATABASE_URL) || env.DATABASE_URL?.includes("sslmode=require");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (err) => {
  console.error("PostgreSQL Pool error:", err);
});

module.exports = { pool };
