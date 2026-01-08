// apps/api/src/db/pool.js
const { Pool } = require("pg");
const { env } = require("../config/env");

// Validate DATABASE_URL format
if (env.DATABASE_URL && (env.DATABASE_URL.includes("your_database_url") || env.DATABASE_URL.includes("placeholder"))) {
  console.error("❌ ERROR: DATABASE_URL is not configured!");
  console.error("   Please update apps/api/.env with your actual database connection string.");
  console.error("   Example: postgresql://user:password@host:port/database");
  process.exit(1);
}

// Neon needs SSL. Auto-detect based on URL.
const useSSL = /neon\.tech/i.test(env.DATABASE_URL) || env.DATABASE_URL?.includes("sslmode=require");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 30_000, // Increased for local development
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL Pool error:", err.message);
  if (err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED") {
    console.error("   Database connection failed. Check your DATABASE_URL in apps/api/.env");
  }
});

// Test connection on startup
pool.connect()
  .then((client) => {
    console.log("✅ Database connection successful");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    if (err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED") {
      console.error("   Please check:");
      console.error("   1. DATABASE_URL is correct in apps/api/.env");
      console.error("   2. Database server is running and accessible");
      console.error("   3. Network/firewall allows connections");
    }
    // Don't exit - let the app start and show errors on API calls
  });

module.exports = { pool };
