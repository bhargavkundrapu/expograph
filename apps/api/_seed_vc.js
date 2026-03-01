require("dotenv").config();
const { Pool } = require("pg");

const m1_3 = require("./_vc_data_m1_m3");
const m4   = require("./_vc_data_m4");
const m5   = require("./_vc_data_m5");
const m6   = require("./_vc_data_m6");
const m7   = require("./_vc_data_m7");
const m8   = require("./_vc_data_m8");
const m9   = require("./_vc_data_m9");
const m10  = require("./_vc_data_m10");

const ALL = { ...m1_3, ...m4, ...m5, ...m6, ...m7, ...m8, ...m9, ...m10 };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  const ids = Object.keys(ALL);
  console.log(`\nVibe Coding Upgrade: ${ids.length} lessons to update\n`);

  let ok = 0, skip = 0, fail = 0;

  for (const id of ids) {
    const { goal, sections } = ALL[id];
    try {
      const res = await pool.query(
        `UPDATE lessons
         SET goal = $1,
             learn_setup_steps = $2::jsonb,
             updated_at = NOW()
         WHERE id = $3
         RETURNING title`,
        [goal, JSON.stringify(sections), id]
      );
      if (res.rowCount > 0) {
        ok++;
        console.log(`  ✓ ${res.rows[0].title}`);
      } else {
        skip++;
        console.log(`  ⚠ SKIP (not found): ${id}`);
      }
    } catch (err) {
      fail++;
      console.error(`  ✗ FAIL ${id}: ${err.message}`);
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`  Updated: ${ok}`);
  console.log(`  Skipped: ${skip}`);
  console.log(`  Failed:  ${fail}`);
  console.log(`  Total:   ${ids.length}\n`);

  await pool.end();
}

run().catch(e => { console.error(e); process.exit(1); });
