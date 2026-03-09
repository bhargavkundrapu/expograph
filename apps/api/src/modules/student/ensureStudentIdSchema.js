/**
 * Ensures users table has student_id column and sequence (same as migration 033).
 * Used so localhost DB works like production when migrations haven't been run locally.
 * Safe to call multiple times (IF NOT EXISTS / no-op if already applied).
 */
const { query } = require("../../db/query");

async function ensureStudentIdSchema() {
  try {
    await query(`
      CREATE SEQUENCE IF NOT EXISTS student_id_seq
        START WITH 1000000 MINVALUE 1000000 MAXVALUE 9999999 NO CYCLE
    `);
    await query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS student_id VARCHAR(7)
    `);
    await query(`
      UPDATE users u SET student_id = v.sid
      FROM (
        SELECT id, LPAD((1000000 + (row_number() OVER (ORDER BY created_at, id)) - 1)::text, 7, '0') AS sid
        FROM users WHERE student_id IS NULL
      ) v WHERE u.id = v.id
    `);
    await query(`
      UPDATE users SET student_id = LPAD(nextval('student_id_seq')::text, 7, '0') WHERE student_id IS NULL
    `);
    await query(`
      SELECT setval('student_id_seq', (SELECT COALESCE(MAX(student_id)::bigint, 1000000) FROM users))
    `);
    await query(`
      ALTER TABLE users ALTER COLUMN student_id SET NOT NULL
    `).catch(() => {});
    await query(`
      CREATE UNIQUE INDEX IF NOT EXISTS users_student_id_unique ON users (student_id)
    `).catch(() => {});
    await query(`
      ALTER TABLE users ALTER COLUMN student_id SET DEFAULT LPAD(nextval('student_id_seq')::text, 7, '0')
    `).catch(() => {});
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { ensureStudentIdSchema };
