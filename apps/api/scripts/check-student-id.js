#!/usr/bin/env node
/**
 * Verify users have student_id. Run from apps/api: node scripts/check-student-id.js
 */
require("dotenv").config();
const { query } = require("../src/db/query");

async function main() {
  try {
    const { rows } = await query(
      `SELECT id, email, full_name, student_id, created_at FROM users ORDER BY created_at LIMIT 5`
    );
    console.log("Users (first 5):");
    console.table(rows.map((r) => ({ id: r.id?.slice(0, 8), email: r.email, student_id: r.student_id || "(null)" })));
    const nulls = await query(
      `SELECT COUNT(*)::int AS n FROM users WHERE student_id IS NULL OR TRIM(student_id) = ''`
    );
    console.log("\nUsers with null/empty student_id:", nulls.rows[0]?.n ?? 0);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    if (err.message?.includes("student_id")) {
      console.error("→ Run migrations: npm run migrate");
    }
    process.exit(1);
  }
}

main();
