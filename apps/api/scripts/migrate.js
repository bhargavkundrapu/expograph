require("dotenv").config();


const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");



function makePool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing in .env");
  }

  const isLocal =
    process.env.DATABASE_URL.includes("localhost") ||
    process.env.DATABASE_URL.includes("127.0.0.1");

  // Neon often requires SSL. If you get SSL errors, keep this on.
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
  });
}

async function main() {
  console.log("🔧 MIGRATE: starting...");
  console.log("🔌 Connecting to DB...");

  const pool = makePool();
  const client = await pool.connect();

  try {
    console.log("✅ Connected");

    // 1) Ensure migrations table exists
    console.log("🧱 Ensuring schema_migrations table exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ schema_migrations ready");

    // 2) Read migration files
    const migrationsDir = path.join(__dirname, "..", "db", "migrations");
    console.log("📂 Migrations folder:", migrationsDir);

    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Migrations folder not found: ${migrationsDir}`);
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    console.log(`📄 Found ${files.length} migration file(s)`);

    // 3) Find already-applied migrations
    const appliedRes = await client.query(
      `SELECT filename FROM schema_migrations ORDER BY filename;`
    );
    const applied = new Set(appliedRes.rows.map((r) => r.filename));

    const pending = files.filter((f) => !applied.has(f));
    console.log(`⏳ Pending ${pending.length} migration(s)`);

    // 4) Apply pending
    for (const filename of pending) {
      const fullPath = path.join(migrationsDir, filename);
      const sql = fs.readFileSync(fullPath, "utf8");

      console.log(`➡️ Applying ${filename}...`);

      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query(
          `INSERT INTO schema_migrations (filename) VALUES ($1);`,
          [filename]
        );
        await client.query("COMMIT");
        console.log(`✅ Applied ${filename}`);
      } catch (err) {
        await client.query("ROLLBACK");
        console.error(`❌ Failed ${filename}`);
        throw err;
      }
    }

    console.log("🎉 MIGRATE: done ✅");
  } finally {
    client.release();
    await pool.end();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("🔥 MIGRATE ERROR:", err.message);
    process.exit(1);
  });
