#!/usr/bin/env node
/**
 * Adds AA-15_TRY_IT_YOURSELF to all AI Automations lessons (after AA-11)
 * and CBM-17_TRY_IT_YOURSELF to all Prompt to Profit lessons (after CBM-11).
 * Run: node _patch_try_it.js
 */
require("dotenv").config();
const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL?.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

async function q(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

// Default Try It content for AA (by module slug)
function getAATryIt(moduleSlug) {
  const base = {
    primary: { name: "Make.com", url: "https://make.com", why: "Build the automation from this lesson. Start with the Build Steps and Tool Setup.", free: true },
    try_prompt: "Follow the Build Steps in this lesson. Create a new scenario in Make.com and connect the modules shown.",
  };
  if (moduleSlug?.includes("n8n")) {
    base.primary = { name: "n8n", url: "https://n8n.io", why: "Build the workflow from this lesson. n8n is perfect for HTTP, Slack, and data pipelines.", free: true };
    base.try_prompt = "Open n8n, create a new workflow, and follow the Build Steps. Test each node as you go.";
  } else if (moduleSlug?.includes("ai-") || moduleSlug?.includes("m5-") || moduleSlug?.includes("m8-") || moduleSlug?.includes("m9-") || moduleSlug?.includes("m10-")) {
    base.primary = { name: "ChatGPT", url: "https://chat.openai.com", why: "Use AI prompts from this lesson. ChatGPT works great with Make.com and n8n OpenAI modules.", free: true };
    base.try_prompt = "Copy a prompt from the Build Steps or Good Prompt section. Paste it into ChatGPT and customize the placeholders.";
  }
  return base;
}

// Default Try It content for CBM
function getCBMTryIt() {
  return {
    primary: { name: "ChatGPT", url: "https://chat.openai.com", why: "Best for business copy, marketing prompts, and the templates in this lesson.", free: true },
    try_prompt: "Use the Good Prompt or Prompt Card from this lesson. Paste it into ChatGPT, replace the [brackets] with your details, and run it.",
  };
}

(async () => {
  console.log("=== Adding Try It Yourself sections ===\n");

  // 1. AI Automations course - add AA-15 after AA-11
  const aaCourse = await q("SELECT id FROM courses WHERE slug ILIKE '%automat%' OR title ILIKE '%automat%' LIMIT 1");
  if (aaCourse.length > 0) {
    const lessons = await q(`
      SELECT l.id, l.slug, l.learn_setup_steps, m.slug as module_slug
      FROM lessons l
      JOIN course_modules m ON l.module_id = m.id
      WHERE m.course_id = $1
      ORDER BY m.position, l.position
    `, [aaCourse[0].id]);
    console.log(`AI Automations: ${lessons.length} lessons`);

    let aaPatched = 0;
    for (const row of lessons) {
      const steps = Array.isArray(row.learn_setup_steps) ? row.learn_setup_steps : [];
      if (steps.some((s) => s?.type === "AA-15_TRY_IT_YOURSELF")) continue;
      const idx = steps.findIndex((s) => s?.type === "AA-11_MINI_TASK");
      const insertAt = idx >= 0 ? idx + 1 : steps.length;
      const section = { type: "AA-15_TRY_IT_YOURSELF", data: getAATryIt(row.module_slug) };
      steps.splice(insertAt, 0, section);
      await pool.query("UPDATE lessons SET learn_setup_steps = $1::jsonb WHERE id = $2", [JSON.stringify(steps), row.id]);
      aaPatched++;
    }
    console.log(`  Patched: ${aaPatched} lessons\n`);
  } else {
    console.log("AI Automations course not found.\n");
  }

  // 2. Prompt to Profit course - add CBM-17 after CBM-11
  const cbmCourse = await q("SELECT id FROM courses WHERE slug ILIKE '%profit%' OR title ILIKE '%profit%' LIMIT 1");
  if (cbmCourse.length > 0) {
    const lessons = await q(`
      SELECT l.id, l.slug, l.learn_setup_steps
      FROM lessons l
      JOIN course_modules m ON l.module_id = m.id
      WHERE m.course_id = $1
      ORDER BY m.position, l.position
    `, [cbmCourse[0].id]);
    console.log(`Prompt to Profit: ${lessons.length} lessons`);

    let cbmPatched = 0;
    for (const row of lessons) {
      const steps = Array.isArray(row.learn_setup_steps) ? row.learn_setup_steps : [];
      if (steps.some((s) => s?.type === "CBM-17_TRY_IT_YOURSELF")) continue;
      const idx = steps.findIndex((s) => s?.type === "CBM-11_PROMPT_CARD_FINAL");
      const insertAt = idx >= 0 ? idx + 1 : steps.length;
      const section = { type: "CBM-17_TRY_IT_YOURSELF", data: getCBMTryIt() };
      steps.splice(insertAt, 0, section);
      await pool.query("UPDATE lessons SET learn_setup_steps = $1::jsonb WHERE id = $2", [JSON.stringify(steps), row.id]);
      cbmPatched++;
    }
    console.log(`  Patched: ${cbmPatched} lessons\n`);
  } else {
    console.log("Prompt to Profit course not found.\n");
  }

  console.log("=== Done ===");
  await pool.end();
})().catch((err) => { console.error(err); process.exit(1); });
