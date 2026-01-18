const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
});

async function runMigrations() {
  try {
    console.log('Starting migration execution...');
    
    const migrationsDir = path.join(__dirname, '../db/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Get already applied migrations
    const appliedResult = await pool.query(
      'SELECT filename FROM schema_migrations ORDER BY filename'
    );
    const appliedFilenames = new Set(appliedResult.rows.map(row => row.filename));

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
        await pool.query(sqlContent);
        appliedCount++;
        console.log(`✓ ${migrationFile} completed successfully\n`);
      } catch (error) {
        console.error(`✗ Error in ${migrationFile}:`, error.message);
        throw error; // Stop on error
      }
    }

    if (appliedCount === 0) {
      console.log('\n✓ No new migrations to apply. Database is up to date!');
    } else {
      console.log(`\n✓ Applied ${appliedCount} migration(s) successfully!`);
    }
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Fatal migration error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

runMigrations();
