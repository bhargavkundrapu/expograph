const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Clean up DATABASE_URL - remove channel_binding which can cause issues
let dbUrl = process.env.DATABASE_URL || '';
if (dbUrl.includes('channel_binding')) {
  dbUrl = dbUrl.replace(/[?&]channel_binding=[^&]*/g, '').replace(/\?&/, '?');
}

const isNeon = /neon\.tech/i.test(dbUrl);
let pool;

if (isNeon) {
  const { Pool: NeonPool, neonConfig } = require('@neondatabase/serverless');
  neonConfig.webSocketConstructor = require('ws');
  pool = new NeonPool({
    connectionString: dbUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 30_000,
  });
} else {
  const { Pool } = require('pg');
  const useSSL = dbUrl.includes('sslmode=require');
  pool = new Pool({
    connectionString: dbUrl,
    ssl: useSSL ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 30_000,
  });
}

async function connectWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await pool.connect();
    } catch (err) {
      if ((err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') && i < retries - 1) {
        console.log(`Connection reset, retrying (${i + 1}/${retries})...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

async function withClient(fn) {
  const client = await connectWithRetry();
  try {
    return await fn(client);
  } finally {
    client.release();
    await pool.end();
  }
}

async function runMigrations() {
  try {
    console.log('Starting migration execution...');

    const migrationsDir = path.join(__dirname, '../db/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    await withClient(async (client) => {
      let appliedFilenames = new Set();
      try {
        const appliedResult = await client.query(
          'SELECT filename FROM schema_migrations ORDER BY filename'
        );
        appliedFilenames = new Set(appliedResult.rows.map(row => row.filename));
      } catch (err) {
        if (err.code === '42P01' || err.message?.includes('does not exist')) {
          appliedFilenames = new Set();
        } else {
          throw err;
        }
      }

      console.log(`Found ${migrationFiles.length} migration files`);
      console.log(`${appliedFilenames.size} already applied\n`);

      let appliedCount = 0;
      for (const migrationFile of migrationFiles) {
        if (appliedFilenames.has(migrationFile)) {
          console.log(`⊘ ${migrationFile} (already applied)`);
          continue;
        }

        const filePath = path.join(migrationsDir, migrationFile);
        const sqlContent = fs.readFileSync(filePath, 'utf-8');

        console.log(`▶ Executing: ${migrationFile}...`);

        try {
          await client.query(sqlContent);
          appliedCount++;
          console.log(`✓ ${migrationFile} completed successfully\n`);
        } catch (error) {
          console.error(`✗ Error in ${migrationFile}:`, error.message);
          throw error;
        }
      }

      if (appliedCount === 0) {
        console.log('\n✓ No new migrations to apply. Database is up to date!');
      } else {
        console.log(`\n✓ Applied ${appliedCount} migration(s) successfully!`);
      }
    });

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Fatal migration error:', error.message);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

runMigrations();
