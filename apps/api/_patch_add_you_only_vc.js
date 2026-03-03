#!/usr/bin/env node
/**
 * Adds "Start" lesson as the first lesson (position 0) in Vibe Coding's Module 1.
 * Run: node _patch_add_you_only_vc.js
 *
 * For PE, CBM, AA: the "Start" lesson is in the seed data. Re-run those seeds.
 * This patch is for VC only (VC uses a different update flow).
 */
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

async function q(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

const START_LESSON = {
  title: "Start",
  slug: "start",
  goal: "Get complete clarity on how to learn this course and feel excited to start.",
  summary: "A warm guide to getting the most from Vibe Coding — how to use every section, learn step by step, and practice with love.",
  sections: [
    { type: "VC-START", data: { blocks: [
      { type: "hero", text: "Hey, we're so glad you're here. This lesson is just for you." },
      { type: "intro", text: "Before you dive in, we want you to know exactly how this course works. Every lesson follows a clear structure. Here's how each part helps you learn:" },
      { type: "section", title: "Your Mission", text: "Tells you what you'll get — the outcome, the superpower you're unlocking. Read it first. It sets your intention and gets you excited.", color: "blue", icon: "target" },
      { type: "section", title: "What You'll Build", text: "Shows the destination — features, tech, concrete result. Answers 'what am I actually creating?' See the big picture before you start.", color: "indigo", icon: "briefcase" },
      { type: "section", title: "Prerequisites", text: "Lists what you need — tools, knowledge, setup. Get these ready. No surprises mid-lesson.", color: "amber", icon: "alert" },
      { type: "section", title: "Workflow", text: "Your path. Read each step. Understand it. Then do it. Open your editor. Write the prompts. Run the code. Vibe Coding is learned by doing.", color: "emerald", icon: "zap" },
      { type: "section", title: "Success Criteria", text: "Tells you how to know you did it right. Use it as your checklist. Verify before you move on.", color: "teal", icon: "check" },
      { type: "section", title: "Under the Hood", text: "Breaks down the concepts — the why behind the how. Use it when you're curious or confused.", color: "violet", icon: "book" },
      { type: "section", title: "Pro Tips", text: "Shortcuts and best practices from people who've been there. They save you time and headaches.", color: "amber", icon: "star" },
      { type: "section", title: "Common Pitfalls", text: "What goes wrong and how to fix it. Read before you build. Like a friend warning you about potholes.", color: "rose", icon: "alert" },
      { type: "section", title: "Level Up", text: "Your challenge. Push yourself a little. It's okay if it feels hard — that's growth.", color: "orange", icon: "zap" },
      { type: "section", title: "Checkpoint", text: "Confirms you're ready. Tick those boxes. If you can't, spend a few more minutes. You deserve to feel solid.", color: "blue", icon: "check" },
      { type: "flow", steps: ["Read the lesson", "Try the prompts", "Build the feature", "Check the Checkpoint", "Move on"] },
      { type: "tip", text: "Keep a simple project in mind. Vibe Coding is best learned by building something real. When you hit an error, paste it into your AI tool and ask for help. That's the Vibe Coding way. You're not cheating — you're learning." },
      { type: "closing", text: "You don't need years of coding. You describe what you want, AI writes the code, you verify and refine. That's the loop. You've got this. Now let's go." }
    ] } }
  ]
};

(async () => {
  console.log("=== Adding 'Start' lesson to Vibe Coding Module 1 ===\n");

  const vcCourse = await q(
    "SELECT id FROM courses WHERE slug ILIKE '%vibe%' OR slug ILIKE '%coding%' OR title ILIKE '%vibe%coding%' LIMIT 1"
  );
  if (!vcCourse.length) {
    console.error("Vibe Coding course not found.");
    process.exit(1);
  }

  const firstModule = await q(
    `SELECT m.id, m.tenant_id, m.title
     FROM course_modules m
     WHERE m.course_id = $1 AND m.status = 'published'
     ORDER BY m.position ASC
     LIMIT 1`,
    [vcCourse[0].id]
  );
  if (!firstModule.length) {
    console.error("No module found for Vibe Coding.");
    process.exit(1);
  }
  const { id: moduleId, tenant_id: tenantId } = firstModule[0];
  console.log(`Module: ${firstModule[0].title} (${moduleId})`);

  const existingStart = await q("SELECT id FROM lessons WHERE module_id = $1 AND slug = 'start'", [moduleId]);
  const existingYouOnly = await q("SELECT id FROM lessons WHERE module_id = $1 AND slug = 'you-only'", [moduleId]);
  const existing = existingStart.length ? existingStart[0] : (existingYouOnly.length ? existingYouOnly[0] : null);
  if (existing) {
    await pool.query(
      "UPDATE lessons SET title = $1, slug = $2, goal = $3, summary = $4, learn_setup_steps = $5::jsonb, updated_at = NOW() WHERE id = $6",
      [START_LESSON.title, START_LESSON.slug, START_LESSON.goal, START_LESSON.summary, JSON.stringify(START_LESSON.sections), existing.id]
    );
    console.log("'Start' lesson already exists (or upgraded from You Only). Updated with new content.");
    await pool.end();
    return;
  }

  const admins = await q(
    `SELECT u.id FROM users u
     JOIN memberships m ON m.user_id = u.id
     JOIN roles r ON r.id = m.role_id
     WHERE r.name = 'SuperAdmin' AND m.tenant_id = $1
     LIMIT 1`,
    [tenantId]
  );
  const createdBy = admins[0]?.id || null;

  await pool.query(
    "UPDATE lessons SET position = position + 1 WHERE module_id = $1",
    [moduleId]
  );
  console.log("Shifted existing lesson positions.");

  const lessonId = uuidv4();
  await pool.query(
    `INSERT INTO lessons (id, tenant_id, module_id, title, slug, summary, position, goal, learn_setup_steps, prompts, status, created_by, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, 0, $7, $8::jsonb, '{}'::jsonb, 'published', $9, NOW(), NOW())`,
    [
      lessonId,
      tenantId,
      moduleId,
      START_LESSON.title,
      START_LESSON.slug,
      START_LESSON.summary,
      START_LESSON.goal,
      JSON.stringify(START_LESSON.sections),
      createdBy,
    ]
  );
  console.log(`Created 'Start' lesson: ${lessonId}\n`);
  console.log("Done.\n");
  await pool.end();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
