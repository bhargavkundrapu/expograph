#!/usr/bin/env node
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const { MODULES_0_3 } = require("./_aa_data_m0_m3");
const { MODULES_4_7 } = require("./_aa_data_m4_m7");
const { MODULES_8_11 } = require("./_aa_data_m8_m11");

const ALL_MODULES = [...MODULES_0_3, ...MODULES_4_7, ...MODULES_8_11];

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL?.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

async function q(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

(async () => {
  console.log("=== AI Automations Course Seeder ===\n");

  const courses = await q(
    "SELECT id, title, slug FROM courses WHERE slug ILIKE '%automat%' OR title ILIKE '%automat%' OR slug ILIKE '%agent%' OR title ILIKE '%agent%' LIMIT 5"
  );
  if (!courses.length) {
    console.error("No AI Automations course found! Please create the course first in Super Admin.");
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

  // Inject AA-15_TRY_IT_YOURSELF after AA-11_MINI_TASK in every lesson
  for (const mod of ALL_MODULES) {
    for (const lesson of mod.lessons) {
      if (lesson.sections.some((s) => s?.type === "AA-15_TRY_IT_YOURSELF")) continue;
      const idx = lesson.sections.findIndex((s) => s?.type === "AA-11_MINI_TASK");
      const insertAt = idx >= 0 ? idx + 1 : lesson.sections.length;
      const primary = mod.slug?.includes("n8n") ? { name: "n8n", url: "https://n8n.io", why: "Build the workflow from this lesson.", free: true } : (mod.slug?.includes("ai-") || mod.slug?.includes("m5") || mod.slug?.includes("m8") || mod.slug?.includes("m9") || mod.slug?.includes("m10")) ? { name: "ChatGPT", url: "https://chat.openai.com", why: "Use AI prompts from this lesson with Make.com or n8n.", free: true } : { name: "Make.com", url: "https://make.com", why: "Build the automation from this lesson.", free: true };
      lesson.sections.splice(insertAt, 0, { type: "AA-15_TRY_IT_YOURSELF", data: { primary, try_prompt: "Follow the Build Steps and use the Tool Setup. Test each step as you go." } });
    }
  }
  console.log("Injected AA-15_TRY_IT_YOURSELF into all lessons.");

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
    console.log(`  Module created: ${modId}`);

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
      console.log(`    Lesson created: ${lessonId}`);
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
