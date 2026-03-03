#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { Pool } = require("pg");

const { MODULES_M1_M5 } = require("./_cbm_data_m1_m5");
const { MODULES_M6_M10 } = require("./_cbm_data_m6_m10");
const { MODULES_M11_M15 } = require("./_cbm_data_m11_m15");
const { MODULES_M16_M19 } = require("./_cbm_data_m16_m19");

const ALL_MODULES = [
  ...MODULES_M1_M5,
  ...MODULES_M6_M10,
  ...MODULES_M11_M15,
  ...MODULES_M16_M19,
];

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL?.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

async function q(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

(async () => {
  console.log("=== ChatGPT Business & Marketing / Prompt to Profit Seeder ===\n");

  const courses = await q(
    "SELECT id, title, slug FROM courses WHERE slug ILIKE '%profit%' OR title ILIKE '%profit%' OR slug ILIKE '%chatgpt%business%' OR title ILIKE '%chatgpt%business%' LIMIT 5"
  );
  if (!courses.length) {
    console.error("No 'Prompt to Profit' or 'ChatGPT Business & Marketing' course found. Create it first in Super Admin.");
    process.exit(1);
  }
  const course = courses[0];
  console.log(`Course: ${course.title} (${course.id})`);

  const tenants = await q("SELECT id, slug FROM tenants LIMIT 1");
  const tenant = tenants[0];
  console.log(`Tenant: ${tenant.slug} (${tenant.id})`);

  const admins = await q(`
    SELECT u.id, u.email FROM users u
    JOIN memberships m ON m.user_id = u.id
    JOIN roles r ON r.id = m.role_id
    WHERE r.name = 'SuperAdmin' AND m.tenant_id = $1
    LIMIT 1
  `, [tenant.id]);
  if (!admins.length) { console.error("No superadmin found!"); process.exit(1); }
  const admin = admins[0];
  console.log(`Admin: ${admin.email} (${admin.id})`);

  console.log("\nWiping existing course modules...");
  await q("DELETE FROM course_modules WHERE course_id = $1", [course.id]);
  console.log("Wiped.");

  // Inject CBM-17_TRY_IT_YOURSELF after CBM-11_PROMPT_CARD_FINAL in every lesson
  const cbmTryIt = { type: "CBM-17_TRY_IT_YOURSELF", data: { primary: { name: "ChatGPT", url: "https://chat.openai.com", why: "Best for business copy and marketing prompts.", free: true }, try_prompt: "Use the Good Prompt or Prompt Card from this lesson. Paste into ChatGPT, replace [brackets], and run." } };
  for (const mod of ALL_MODULES) {
    for (const lesson of mod.lessons) {
      if (lesson.sections.some((s) => s?.type === "CBM-17_TRY_IT_YOURSELF")) continue;
      const idx = lesson.sections.findIndex((s) => s?.type === "CBM-11_PROMPT_CARD_FINAL");
      const insertAt = idx >= 0 ? idx + 1 : lesson.sections.length;
      lesson.sections.splice(insertAt, 0, cbmTryIt);
    }
  }
  console.log("Injected CBM-17_TRY_IT_YOURSELF into all lessons.");

  const { v4: uuidv4 } = require("uuid");

  for (let mi = 0; mi < ALL_MODULES.length; mi++) {
    const mod = ALL_MODULES[mi];
    console.log(`\nCreating module ${mi + 1}/${ALL_MODULES.length}: ${mod.title}`);

    const modId = uuidv4();
    await q(
      `INSERT INTO course_modules (id, tenant_id, course_id, title, slug, position, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'published', NOW(), NOW())`,
      [modId, tenant.id, course.id, mod.title, mod.slug, mi]
    );

    for (let li = 0; li < mod.lessons.length; li++) {
      const lesson = mod.lessons[li];
      console.log(`  Creating lesson ${li + 1}/${mod.lessons.length}: ${lesson.title}`);

      const lessonId = uuidv4();
      await q(
        `INSERT INTO lessons (id, tenant_id, module_id, title, slug, summary, position, goal, learn_setup_steps, prompts, status, created_by, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'published', $11, NOW(), NOW())`,
        [
          lessonId, tenant.id, modId,
          lesson.title, lesson.slug,
          lesson.summary, li,
          lesson.goal,
          JSON.stringify(lesson.sections),
          JSON.stringify({}),
          admin.id,
        ]
      );
    }
  }

  console.log("\n=== SEEDING COMPLETE ===");

  const mods = await q("SELECT COUNT(*) as c FROM course_modules WHERE course_id = $1", [course.id]);
  const lessonsCount = await q(`
    SELECT COUNT(*) as c FROM lessons l
    JOIN course_modules m ON l.module_id = m.id
    WHERE m.course_id = $1
  `, [course.id]);
  console.log(`Modules: ${mods[0].c}, Lessons: ${lessonsCount[0].c}`);

  await pool.end();
})().catch(err => { console.error(err); process.exit(1); });
