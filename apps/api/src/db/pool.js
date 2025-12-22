// apps/api/src/db/pool.js
const { Pool } = require("pg");
const { env } = require("../config/env");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // Neon uses SSL. "require" keeps it safe.
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (err) => {
  console.error("PG Pool error:", err);
});

module.exports = { pool };
