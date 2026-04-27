const fs = require('fs');
const path = require('path');

// Always load .env from apps/api so migrate works from repo root or from apps/api
const envPath = path.join(__dirname, '..', '.env');
const result = require('dotenv').config({ path: envPath });
if (result.error && process.env.DATABASE_URL) {
  // .env might be loaded by parent; continue
} else if (result.error) {
  console.error('\n�- Could not load .env from:', envPath);
  console.error('  Create apps/api/.env with DATABASE_URL=postgresql://user:pass@localhost:5432/yourdb\n');
  process.exit(1);
}

// Clean up DATABASE_URL - remove channel_binding which can cause issues
let dbUrl = process.env.DATABASE_URL || '';
if (!dbUrl || dbUrl.includes('your_database') || dbUrl.includes('username:password')) {
  console.error('\n�- DATABASE_URL is missing or still a placeholder in apps/api/.env');
  console.error('  Example: DATABASE_URL=postgresql://postgres:password@localhost:5432/expograph\n');
  process.exit(1);
}
if (dbUrl.includes('channel_binding')) {
  dbUrl = dbUrl.replace(/[?&]channel_binding=[^&]*/g, '').replace(/\?&/, '?');
}

// Log which DB we're using (masked) so localhost vs remote is clear
try {
  const u = new URL(dbUrl.replace(/^postgres:/, 'postgresql:'));
  const host = u.hostname || 'unknown';
  console.log('Database: ' + host + (u.port ? ':' + u.port : '') + (host === 'localhost' ? ' (local)' : ''));
} catch (_) {}

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
    ssl: useSSL ? { rejectUnauthorized: false } : false,
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
          console.error(`�- Error in ${migrationFile}:`, error.message);
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
    console.error('\n�- Fatal migration error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n  → PostgreSQL is not running or DATABASE_URL host/port is wrong.');
      console.error('  → For localhost: start PostgreSQL and use postgresql://user:pass@localhost:5432/yourdb in apps/api/.env\n');
    }
    if (error.code === '28P01' || error.message?.includes('password')) {
      console.error('\n  → Check username and password in DATABASE_URL (apps/api/.env).\n');
    }
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

runMigrations();
