const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runSeeds() {
  try {
    console.log('Starting seed execution...');
    
    const seedsDir = path.join(__dirname, '../db/seeds');
    const seedFiles = fs.readdirSync(seedsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const seedFile of seedFiles) {
      const filePath = path.join(seedsDir, seedFile);
      const sqlContent = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\nExecuting: ${seedFile}...`);
      
      try {
        await pool.query(sqlContent);
        console.log(`✓ ${seedFile} completed successfully`);
      } catch (error) {
        console.error(`✗ Error in ${seedFile}:`, error.message);
        // Continue with next seed even if one fails
      }
    }

    console.log('\n✓ All seeds completed!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    await pool.end();
    process.exit(1);
  }
}

runSeeds();
