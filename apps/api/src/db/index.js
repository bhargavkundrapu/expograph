// apps/api/src/db/index.js
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL missing in env (.env / Render env vars)");
}

// Neon needs SSL. We'll auto-enable SSL for neon.tech URLs.
const useSSL = /neon\.tech/i.test(connectionString);

const pool = new Pool({
  connectionString,
  ssl: useSSL ? { rejectUnauthorized: false } : undefined,
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error:", err);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };
