// apps/api/src/modules/content/content.service.js
const { HttpError } = require("../../utils/httpError");
const repo = require("./content.repo");

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function isUniqueViolation(err) {
  return err && err.code === "23505";
}

async function createCourseSmart({ tenantId, title, slug, description, level, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createCourse({ tenantId, title, slug: candidate, description, level, status: "draft", createdBy });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique slug");
}

async function createModuleSmart({ tenantId, courseId, title, slug, position, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createModule({ tenantId, courseId, title, slug: candidate, position, status: "draft", createdBy });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique module slug");
}

async function createLessonSmart({ tenantId, moduleId, title, slug, summary, position, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createLesson({ tenantId, moduleId, title, slug: candidate, summary, position, status: "draft", createdBy });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique lesson slug");
}
const updateCourse = async ({ tenantId, courseId, patch, updatedBy }) => {
  // build dynamic update query
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.description !== undefined) { fields.push(`description=$${i++}`); values.push(patch.description); }
  if (patch.level !== undefined) { fields.push(`level=$${i++}`); values.push(patch.level); }

  if (fields.length === 0) return null;

  values.push(tenantId);
  values.push(courseId);

  const sql = `
    UPDATE courses
    SET ${fields.join(", ")}, updated_at=now(), updated_by=$${i++}
    WHERE tenant_id=$${i++} AND id=$${i++}
    RETURNING *
  `;

  // note: updated_by column exists? if not, remove updated_by parts.
  const { rows } = await db.query(sql, [...values.slice(0, values.length - 2), updatedBy, tenantId, courseId]);
  return rows[0] || null;
};




module.exports = {
  createCourseSmart,
  createModuleSmart,
  createLessonSmart,
  updateCourse,
  ...repo,
};
