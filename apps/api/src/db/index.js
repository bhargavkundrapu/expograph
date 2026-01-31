// apps/api/src/db/index.js
// Use the same pool as pool.js (Neon serverless when DATABASE_URL is Neon, else pg)
const { pool } = require("./pool");

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };
