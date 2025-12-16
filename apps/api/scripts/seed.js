require("dotenv").config();

const { Pool } = require("pg");

function makePool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing in .env");
  }

  const isLocal =
    process.env.DATABASE_URL.includes("localhost") ||
    process.env.DATABASE_URL.includes("127.0.0.1");

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
  });
}

async function tableExists(client, tableName) {
  const res = await client.query(
    `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema='public' AND table_name=$1
    ) AS exists;
  `,
    [tableName]
  );
  return res.rows[0].exists === true;
}

async function main() {
  console.log("🌱 SEED: starting...");
  console.log("🔌 Connecting to DB...");

  const pool = makePool();
  const client = await pool.connect();

  try {
    console.log("✅ Connected");

    // Safety: ensure required tables exist
    const tenantsOk = await tableExists(client, "tenants");
    const rolesOk = await tableExists(client, "roles");

    if (!tenantsOk || !rolesOk) {
      console.error("❌ Required tables missing (tenants/roles).");
      console.error("👉 Run migrations first: npm run migrate");
      process.exit(1);
    }

    console.log("✅ Required tables exist");

    // 1) Insert tenant (idempotent)
    console.log("🏢 Seeding tenant: ExpoGraph ...");
    const tenantRes = await client.query(
      `
      INSERT INTO tenants (name, slug)
      VALUES ($1, $2)
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id;
      `,
      ["ExpoGraph", "expograph"]
    );
    const tenantId = tenantRes.rows[0].id;
    console.log("✅ Tenant ready. tenant_id =", tenantId);

    // 2) Insert roles (idempotent)
    console.log("👤 Seeding roles...");
    const roles = ["SuperAdmin", "TenantAdmin", "Mentor", "Student"];

    for (const role of roles) {
      await client.query(
        `
        INSERT INTO roles (tenant_id, name)
        VALUES ($1, $2)
        ON CONFLICT (tenant_id, name) DO NOTHING;
        `,
        [tenantId, role]
      );
      console.log(`✅ Role ensured: ${role}`);
    }

    console.log("🎉 SEED: done ✅");
  } finally {
    client.release();
    await pool.end();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("🔥 SEED ERROR:", err.message);
    process.exit(1);
  });
