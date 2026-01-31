// apps/api/src/db/pool.js
const { env } = require("../config/env");

const isNeon = /neon\.tech/i.test(env.DATABASE_URL);

let pool;

if (isNeon) {
  // Neon serverless driver uses HTTPS/WebSockets - bypasses firewall blocking TCP 5432
  const { Pool: NeonPool, neonConfig } = require("@neondatabase/serverless");
  const ws = require("ws");
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({
    connectionString: env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 30_000,
  });
} else {
  const { Pool } = require("pg");
  const useSSL = env.DATABASE_URL?.includes("sslmode=require");
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 20_000,
  });
}

pool.on("error", (err) => {
  console.error("PostgreSQL Pool error:", err);
});

module.exports = { pool };
