// Quick connection test - run: node scripts/test-connection.js
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

async function test() {
  console.log('Testing database connection...');
  if (isNeon) {
    console.log('Using Neon serverless driver (HTTPS/WebSockets - bypasses firewall)');
  }
  console.log('DATABASE_URL:', dbUrl.replace(/:[^:@]+@/, ':****@') || 'NOT SET');
  console.log('');

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const client = await pool.connect();
      console.log('✓ Connection successful!');
      
      const result = await client.query('SELECT version(), current_database(), current_user');
      console.log('PostgreSQL version:', result.rows[0].version.split(' ')[0] + ' ' + result.rows[0].version.split(' ')[1]);
      console.log('Database:', result.rows[0].current_database);
      console.log('User:', result.rows[0].current_user);
      
      client.release();
      await pool.end();
      process.exit(0);
    } catch (err) {
      lastError = err;
      if ((err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') && attempt < 3) {
        console.log(`Attempt ${attempt}/3 failed: ${err.message}, retrying in 2s...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      break;
    }
  }
  
  try {
    console.error('✗ Connection failed:', err.message);
    console.error('Error code:', err.code);
    
    if (err.code === 'ETIMEDOUT' || err.message?.includes('timeout')) {
      console.error('\nTroubleshooting:');
      console.error('1. Is PostgreSQL running? (check Services on Windows, or: docker ps)');
      console.error('2. Is DATABASE_URL correct? Check apps/api/.env');
      console.error('3. Can you reach the host? Try: ping <hostname> or telnet <host> <port>');
      console.error('4. Firewall blocking? Check Windows Firewall or antivirus');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('\nPostgreSQL is not accepting connections on that host/port.');
      console.error('Check: Is PostgreSQL running? Is the port correct?');
    } else if (err.code === 'ENOTFOUND') {
      console.error('\nHostname not found. Check DATABASE_URL hostname.');
    } else if (err.message?.includes('password authentication failed')) {
      console.error('\nPassword incorrect. Check DATABASE_URL password.');
    } else if (err.message?.includes('database') && err.message?.includes('does not exist')) {
      console.error('\nDatabase does not exist. Create it first: createdb <database_name>');
    }
    
    if (err.code === 'ECONNRESET' && dbUrl.includes('neon.tech')) {
      console.error('\n💡 Neon ECONNRESET fix:');
      console.error('   1. Use DIRECT connection URL (not pooler) for migrations/seeds');
      console.error('   2. Get it from Neon dashboard → Connection Details → Direct connection');
      console.error('   3. Update DATABASE_URL in apps/api/.env');
    }
    
    await pool.end().catch(() => {});
    process.exit(1);
  } catch (err) {
    console.error('✗ Connection failed after retries:', lastError?.message || err.message);
    if (dbUrl.includes('neon.tech') && (lastError?.code === 'ECONNRESET' || err.code === 'ECONNRESET')) {
      console.error('\n💡 For Neon: Use DIRECT connection URL (not pooler) in DATABASE_URL');
    }
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

test();
