// apps/api/src/modules/content/content.repo.js
const { query } = require("../../db/query");

async function createCourse({ tenantId, title, slug, description, level, status, createdBy }) {
  const { rows } = await query(
    `INSERT INTO courses (tenant_id, title, slug, description, level, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [tenantId, title, slug, description ?? null, level ?? null, status ?? "draft", createdBy ?? null]
  );
  return rows[0];
}

async function listCoursesAdmin({ tenantId }) {
  const { rows } = await query(
    `SELECT * FROM courses
     WHERE tenant_id = $1
     ORDER BY created_at DESC`,
    [tenantId]
  );
  return rows;
}

async function listCoursesPublic({ tenantId }) {
  const { rows } = await query(
    `SELECT id, title, slug, description, level
     FROM courses
     WHERE tenant_id = $1 AND status = 'published'
     ORDER BY created_at DESC`,
    [tenantId]
  );
  return rows;
}

async function updateCourseStatus({ tenantId, courseId, status }) {
  const { rows } = await query(
    `UPDATE courses SET status = $1, updated_at = now()
     WHERE tenant_id = $2 AND id = $3
     RETURNING *`,
    [status, tenantId, courseId]
  );
  return rows[0] ?? null;
}

async function createModule({ tenantId, courseId, title, slug, position, status, createdBy }) {
  const { rows } = await query(
    `INSERT INTO course_modules (tenant_id, course_id, title, slug, position, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [tenantId, courseId, title, slug, position ?? 0, status ?? "draft", createdBy ?? null]
  );
  return rows[0];
}

async function createLesson({ tenantId, moduleId, title, slug, summary, position, status, createdBy }) {
  const { rows } = await query(
    `INSERT INTO lessons (tenant_id, module_id, title, slug, summary, position, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [tenantId, moduleId, title, slug, summary ?? null, position ?? 0, status ?? "draft", createdBy ?? null]
  );
  return rows[0];
}

async function updateModuleStatus({ tenantId, moduleId, status }) {
  const { rows } = await query(
    `UPDATE course_modules SET status = $1, updated_at = now()
     WHERE tenant_id = $2 AND id = $3
     RETURNING *`,
    [status, tenantId, moduleId]
  );
  return rows[0] ?? null;
}

async function updateLessonStatus({ tenantId, lessonId, status }) {
  const { rows } = await query(
    `UPDATE lessons SET status = $1, updated_at = now()
     WHERE tenant_id = $2 AND id = $3
     RETURNING *`,
    [status, tenantId, lessonId]
  );
  return rows[0] ?? null;
}

async function addResource({ tenantId, lessonId, type, title, url, body, sortOrder, createdBy }) {
  const { rows } = await query(
    `INSERT INTO resources (tenant_id, lesson_id, type, title, url, body, sort_order, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [tenantId, lessonId, type, title, url ?? null, body ?? null, sortOrder ?? 0, createdBy ?? null]
  );
  return rows[0];
}

async function addPractice({ tenantId, lessonId, title, prompt, language, starterCode, expectedOutput, sortOrder, createdBy }) {
  const { rows } = await query(
    `INSERT INTO practice_tasks (tenant_id, lesson_id, title, prompt, language, starter_code, expected_output, sort_order, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [tenantId, lessonId, title, prompt, language ?? null, starterCode ?? null, expectedOutput ?? null, sortOrder ?? 0, createdBy ?? null]
  );
  return rows[0];
}

async function getCourseTreeAdmin({ tenantId, courseId }) {
  const course = (await query(`SELECT * FROM courses WHERE tenant_id=$1 AND id=$2`, [tenantId, courseId])).rows[0] ?? null;
  if (!course) return null;

  const modules = (await query(
    `SELECT * FROM course_modules WHERE tenant_id=$1 AND course_id=$2 ORDER BY position ASC, created_at ASC`,
    [tenantId, courseId]
  )).rows;

  const moduleIds = modules.map(m => m.id);
  let lessons = [];
  if (moduleIds.length) {
    lessons = (await query(
      `SELECT * FROM lessons WHERE tenant_id=$1 AND module_id = ANY($2::uuid[]) ORDER BY position ASC, created_at ASC`,
      [tenantId, moduleIds]
    )).rows;
  }

  return { course, modules, lessons };
}

async function getPublishedCourseTreeBySlug({ tenantId, courseSlug }) {
  const course = (await query(
    `SELECT id, title, slug, description, level
     FROM courses
     WHERE tenant_id=$1 AND slug=$2 AND status='published'`,
    [tenantId, courseSlug]
  )).rows[0] ?? null;

  if (!course) return null;

  const modules = (await query(
    `SELECT id, title, slug, position
     FROM course_modules
     WHERE tenant_id=$1 AND course_id=$2 AND status='published'
     ORDER BY position ASC, created_at ASC`,
    [tenantId, course.id]
  )).rows;

  const moduleIds = modules.map(m => m.id);
  let lessons = [];
  if (moduleIds.length) {
    lessons = (await query(
      `SELECT id, module_id, title, slug, summary, position
       FROM lessons
       WHERE tenant_id=$1 AND module_id = ANY($2::uuid[]) AND status='published'
       ORDER BY position ASC, created_at ASC`,
      [tenantId, moduleIds]
    )).rows;
  }

  return { course, modules, lessons };
}

async function getPublishedLessonBySlugs({ tenantId, courseSlug, moduleSlug, lessonSlug }) {
  const { rows } = await query(
    `SELECT
        c.id AS course_id, c.title AS course_title, c.slug AS course_slug,
        m.id AS module_id, m.title AS module_title, m.slug AS module_slug,
        l.id AS lesson_id, l.title AS lesson_title, l.slug AS lesson_slug, l.summary,
        l.video_provider, l.video_id, l.duration_seconds
     FROM courses c
     JOIN course_modules m ON m.course_id = c.id AND m.tenant_id = c.tenant_id
     JOIN lessons l ON l.module_id = m.id AND l.tenant_id = m.tenant_id
     WHERE c.tenant_id = $1
       AND c.slug = $2 AND c.status='published'
       AND m.slug = $3 AND m.status='published'
       AND l.slug = $4 AND l.status='published'
     LIMIT 1`,
    [tenantId, courseSlug, moduleSlug, lessonSlug]
  );

  const row = rows[0] ?? null;
  if (!row) return null;

  const resources = (await query(
    `SELECT id, type, title, url, body, sort_order
     FROM resources
     WHERE tenant_id=$1 AND lesson_id=$2
     ORDER BY sort_order ASC, created_at ASC`,
    [tenantId, row.lesson_id]
  )).rows;

  const practice = (await query(
    `SELECT id, title, prompt, language, starter_code, expected_output, sort_order
     FROM practice_tasks
     WHERE tenant_id=$1 AND lesson_id=$2
     ORDER BY sort_order ASC, created_at ASC`,
    [tenantId, row.lesson_id]
  )).rows;

  return { lesson: row, resources, practice };
}

module.exports = {
  createCourse,
  listCoursesAdmin,
  listCoursesPublic,
  updateCourseStatus,
  createModule,
  createLesson,
  updateModuleStatus,
  updateLessonStatus,
  addResource,
  addPractice,
  getCourseTreeAdmin,
  getPublishedCourseTreeBySlug,
  getPublishedLessonBySlugs,
};
