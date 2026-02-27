/**
 * Set or reset password for an admin user.
 *
 * Usage:
 *   node scripts/set-admin-password.js <email> <password>
 *
 * Example:
 *   node scripts/set-admin-password.js admin@expograph.in MySecurePass123
 */
require("dotenv").config();
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const SALT_ROUNDS = 12;

async function main() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error("Usage: node scripts/set-admin-password.js <email> <password>");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const { rows: users } = await pool.query(
      `SELECT u.id, u.email, u.full_name, r.name AS role_name
       FROM users u
       JOIN memberships m ON m.user_id = u.id
       JOIN roles r ON r.id = m.role_id
       WHERE LOWER(u.email) = $1
       LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (!users.length) {
      console.error(`No user found with email: ${email}`);
      process.exit(1);
    }

    const user = users[0];

    if (!["SuperAdmin", "TenantAdmin"].includes(user.role_name)) {
      console.error(`User "${user.full_name || user.email}" has role "${user.role_name}". Only SuperAdmin/TenantAdmin can use password login.`);
      process.exit(1);
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      `UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2`,
      [hash, user.id]
    );

    console.log(`Password set for ${user.full_name || user.email} (${user.role_name})`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
