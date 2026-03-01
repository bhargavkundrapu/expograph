// apps/api/src/db/query.js
const { pool } = require("./pool");

const QUERY_TIMEOUT_MS = 15_000;

async function query(text, params = []) {
  return pool.query(text, params);
}

async function getClient() {
  return pool.connect();
}

async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query(`SET LOCAL statement_timeout = '${QUERY_TIMEOUT_MS}'`);
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    try { await client.query("ROLLBACK"); } catch (_) {}
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { query, getClient, withTransaction };
