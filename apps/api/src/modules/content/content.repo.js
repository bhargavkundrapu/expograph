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
async function listLessonResourcesAdmin({ tenantId, lessonId }) {
  const { rows } = await query(
    `SELECT *
     FROM resources
     WHERE tenant_id=$1 AND lesson_id=$2
     ORDER BY sort_order ASC, created_at ASC`,
    [tenantId, lessonId]
  );
  return rows;
}

async function listLessonPracticeAdmin({ tenantId, lessonId }) {
  const { rows } = await query(
    `SELECT *
     FROM practice_tasks
     WHERE tenant_id=$1 AND lesson_id=$2
     ORDER BY sort_order ASC, created_at ASC`,
    [tenantId, lessonId]
  );
  return rows;
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

  // Group lessons by module_id
  const lessonsByModule = new Map();
  for (const l of lessons) {
    if (!lessonsByModule.has(l.module_id)) lessonsByModule.set(l.module_id, []);
    lessonsByModule.get(l.module_id).push(l);
  }

  // Attach lessons[] to each module
  const modulesWithLessons = modules.map((m) => ({
    ...m,
    lessons: lessonsByModule.get(m.id) || [],
  }));

  // Return a single object shape that frontend loves:
  // data.course contains modules[] and each module has lessons[]
  return { course: { ...course, modules: modulesWithLessons } };

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
async function updateCourse({ tenantId, courseId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) {
    fields.push(`title=$${i++}`);
    values.push(patch.title);
  }
  if (patch.description !== undefined) {
    fields.push(`description=$${i++}`);
    values.push(patch.description);
  }
  if (patch.level !== undefined) {
    fields.push(`level=$${i++}`);
    values.push(patch.level);
  }

  if (!fields.length) return null;

  values.push(updatedBy);
  values.push(tenantId);
  values.push(courseId);

  const sql = `
    UPDATE courses
    SET ${fields.join(", ")},
        updated_by=$${i++},
        updated_at=now()
    WHERE tenant_id=$${i++}
      AND id=$${i++}
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}
async function updateModule({ tenantId, moduleId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.position !== undefined) { fields.push(`position=$${i++}`); values.push(patch.position); }

  if (!fields.length) return null;

  values.push(updatedBy);
  values.push(tenantId);
  values.push(moduleId);

  const sql = `
    UPDATE course_modules
    SET ${fields.join(", ")}, updated_by=$${i++}, updated_at=now()
    WHERE tenant_id=$${i++} AND id=$${i++}
    RETURNING *
  `;
  const { rows } = await query(sql, values);
  return rows[0] || null;
}
async function updateLesson({ tenantId, lessonId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.summary !== undefined) { fields.push(`summary=$${i++}`); values.push(patch.summary); }
  if (patch.position !== undefined) { fields.push(`position=$${i++}`); values.push(patch.position); }
  if (patch.video_provider !== undefined) { fields.push(`video_provider=$${i++}`); values.push(patch.video_provider); }
  if (patch.video_id !== undefined) { fields.push(`video_id=$${i++}`); values.push(patch.video_id); }



  if (!fields.length) return null;

  values.push(updatedBy, tenantId, lessonId);

  const sql = `
    UPDATE lessons
    SET ${fields.join(", ")}, updated_by=$${i++}, updated_at=now()
    WHERE tenant_id=$${i++} AND id=$${i++}
    RETURNING *
  `;
  const { rows } = await query(sql, values);
  return rows[0] || null;
}
async function updateResource({ tenantId, resourceId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) {
    fields.push(`title=$${i++}`);
    values.push(patch.title);
  }
  if (patch.url !== undefined) {
    fields.push(`url=$${i++}`);
    values.push(patch.url);
  }
  if (patch.body !== undefined) {
    fields.push(`body=$${i++}`);
    values.push(patch.body);
  }
  // NOTE: your column name in DB might be sort_order or sort_order, check it.
  // You used sortOrder in API, so DB column likely "sort_order".
  if (patch.sortOrder !== undefined) {
    fields.push(`sort_order=$${i++}`);
    values.push(patch.sortOrder);
  }

  if (!fields.length) return null;

  values.push(updatedBy);  // updated_by
  values.push(tenantId);   // tenant_id
  values.push(resourceId); // id

  const sql = `
    UPDATE resources
    SET ${fields.join(", ")},
        updated_by=$${i++},
        updated_at=now()
    WHERE tenant_id=$${i++}
      AND id=$${i++}
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function updatePractice({ tenantId, practiceId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.prompt !== undefined) { fields.push(`prompt=$${i++}`); values.push(patch.prompt); }
  if (patch.language !== undefined) { fields.push(`language=$${i++}`); values.push(patch.language); }
  if (patch.starterCode !== undefined) { fields.push(`starter_code=$${i++}`); values.push(patch.starterCode); }
  if (patch.expectedOutput !== undefined) { fields.push(`expected_output=$${i++}`); values.push(patch.expectedOutput); }

  // DB column usually sort_order
  if (patch.sortOrder !== undefined) { fields.push(`sort_order=$${i++}`); values.push(patch.sortOrder); }

  if (!fields.length) return null;

  values.push(updatedBy);
  values.push(tenantId);
  values.push(practiceId);

  const sql = `
    UPDATE practice_tasks
    SET ${fields.join(", ")},
        updated_by=$${i++},
        updated_at=now()
    WHERE tenant_id=$${i++}
      AND id=$${i++}
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function deleteResource({ tenantId, resourceId }) {
  const { rows } = await query(
    `DELETE FROM resources
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, resourceId]
  );
  return rows[0] || null;
}

async function deletePractice({ tenantId, practiceId }) {
  const { rows } = await query(
    `DELETE FROM practice_tasks
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, practiceId]
  );
  return rows[0] || null;
}

// MCQ Functions
async function listLessonMcqsAdmin({ tenantId, lessonId }) {
  const { rows } = await query(
    `SELECT *
     FROM lesson_mcqs
     WHERE tenant_id=$1 AND lesson_id=$2
     ORDER BY sort_order ASC, created_at ASC`,
    [tenantId, lessonId]
  );
  return rows;
}

async function addMcq({ tenantId, lessonId, question, options, explanation, sortOrder, createdBy }) {
  const { rows } = await query(
    `INSERT INTO lesson_mcqs (tenant_id, lesson_id, question, options, explanation, sort_order, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [tenantId, lessonId, question, JSON.stringify(options), explanation ?? null, sortOrder ?? 0, createdBy ?? null]
  );
  return rows[0];
}

async function updateMcq({ tenantId, mcqId, patch, updatedBy }) {
  const fields = [];
  const values = [];
  let i = 1;

  if (patch.question !== undefined) { fields.push(`question=$${i++}`); values.push(patch.question); }
  if (patch.options !== undefined) { fields.push(`options=$${i++}`); values.push(JSON.stringify(patch.options)); }
  if (patch.explanation !== undefined) { fields.push(`explanation=$${i++}`); values.push(patch.explanation); }
  if (patch.sortOrder !== undefined) { fields.push(`sort_order=$${i++}`); values.push(patch.sortOrder); }

  if (!fields.length) return null;

  values.push(updatedBy);
  values.push(tenantId);
  values.push(mcqId);

  const sql = `
    UPDATE lesson_mcqs
    SET ${fields.join(", ")},
        updated_at=now()
    WHERE tenant_id=$${i++}
      AND id=$${i++}
    RETURNING *
  `;

  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function deleteMcq({ tenantId, mcqId }) {
  const { rows } = await query(
    `DELETE FROM lesson_mcqs
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, mcqId]
  );
  return rows[0] || null;
}

// Slides Functions
async function listLessonSlidesAdmin({ tenantId, lessonId }) {
  // Wrap everything in try-catch to handle any possible error
  try {
    // First, try query with sort_order (if column exists)
    try {
      const { rows } = await query(
        `SELECT *
         FROM lesson_slides
         WHERE tenant_id=$1 AND lesson_id=$2
         ORDER BY sort_order ASC, slide_number ASC, created_at ASC`,
        [tenantId, lessonId]
      );
      return rows || [];
    } catch (primaryErr) {
      // Check if it's a column error (42703 = column does not exist)
      const isColumnError = primaryErr.code === '42703' || 
                           (primaryErr.message && (
                             primaryErr.message.includes('sort_order') || 
                             primaryErr.message.includes('column') ||
                             primaryErr.message.toLowerCase().includes('does not exist')
                           ));
      
      // If it's a column error, try without sort_order
      if (isColumnError) {
        try {
          const { rows } = await query(
            `SELECT *
             FROM lesson_slides
             WHERE tenant_id=$1 AND lesson_id=$2
             ORDER BY slide_number ASC, created_at ASC`,
            [tenantId, lessonId]
          );
          return rows || [];
        } catch (fallbackErr) {
          // If fallback also fails (table doesn't exist, etc.), return empty
          console.error("[listLessonSlidesAdmin] Fallback query failed:", fallbackErr.code, fallbackErr.message);
          return [];
        }
      }
      
      // If it's not a column error, check if table exists
      const isTableError = primaryErr.code === '42P01' || 
                          (primaryErr.message && primaryErr.message.includes('relation') && primaryErr.message.includes('does not exist'));
      
      if (isTableError) {
        console.error("[listLessonSlidesAdmin] Table lesson_slides does not exist. Please run migration 012_lesson_mcq_slides.sql");
        return [];
      }
      
      // For any other error, log and return empty array
      console.error("[listLessonSlidesAdmin] Unexpected error:", primaryErr.code, primaryErr.message);
      return [];
    }
  } catch (outerErr) {
    // Catch any unexpected errors (synchronous errors, etc.)
    console.error("[listLessonSlidesAdmin] Outer catch - unexpected error:", outerErr);
    return [];
  }
}

async function addSlide({ tenantId, lessonId, title, content, slideNumber, imageUrl, sortOrder, createdBy }) {
  // Check if table exists first
  try {
    const tableCheck = await query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' 
       AND table_name = 'lesson_slides'`
    );
    
    if (tableCheck.rows.length === 0) {
      throw new Error("lesson_slides table does not exist. Please run migration 012_lesson_mcq_slides.sql");
    }
  } catch (err) {
    throw err;
  }

  // Check if sort_order column exists
  try {
    const checkColumn = await query(
      `SELECT column_name FROM information_schema.columns 
       WHERE table_schema = 'public'
       AND table_name = 'lesson_slides' 
       AND column_name = 'sort_order'`
    );
    
    const hasSortOrder = checkColumn.rows.length > 0;
    
    if (hasSortOrder) {
      const { rows } = await query(
        `INSERT INTO lesson_slides (tenant_id, lesson_id, title, content, slide_number, image_url, sort_order, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [tenantId, lessonId, title, content ?? null, slideNumber ?? 0, imageUrl ?? null, sortOrder ?? 0, createdBy ?? null]
      );
      return rows[0];
    } else {
      // Insert without sort_order column
      const { rows } = await query(
        `INSERT INTO lesson_slides (tenant_id, lesson_id, title, content, slide_number, image_url, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING *`,
        [tenantId, lessonId, title, content ?? null, slideNumber ?? 0, imageUrl ?? null, createdBy ?? null]
      );
      return rows[0];
    }
  } catch (err) {
    throw err;
  }
}

async function updateSlide({ tenantId, slideId, patch, updatedBy }) {
  // Check if table exists first
  try {
    const tableCheck = await query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' 
       AND table_name = 'lesson_slides'`
    );
    
    if (tableCheck.rows.length === 0) {
      return null;
    }
  } catch (err) {
    return null;
  }

  // Check if sort_order column exists
  let hasSortOrder = false;
  try {
    const checkColumn = await query(
      `SELECT column_name FROM information_schema.columns 
       WHERE table_schema = 'public'
       AND table_name = 'lesson_slides' 
       AND column_name = 'sort_order'`
    );
    hasSortOrder = checkColumn.rows.length > 0;
  } catch (err) {
    // If check fails, assume column doesn't exist
    hasSortOrder = false;
  }

  const fields = [];
  const values = [];
  let i = 1;

  if (patch.title !== undefined) { fields.push(`title=$${i++}`); values.push(patch.title); }
  if (patch.content !== undefined) { fields.push(`content=$${i++}`); values.push(patch.content); }
  if (patch.slideNumber !== undefined) { fields.push(`slide_number=$${i++}`); values.push(patch.slideNumber); }
  if (patch.imageUrl !== undefined) { fields.push(`image_url=$${i++}`); values.push(patch.imageUrl); }
  if (patch.sortOrder !== undefined && hasSortOrder) { fields.push(`sort_order=$${i++}`); values.push(patch.sortOrder); }

  if (!fields.length) return null;

  values.push(updatedBy);
  values.push(tenantId);
  values.push(slideId);

  try {
    const sql = `
      UPDATE lesson_slides
      SET ${fields.join(", ")},
          updated_at=now()
      WHERE tenant_id=$${i++}
        AND id=$${i++}
      RETURNING *
    `;

    const { rows } = await query(sql, values);
    return rows[0] || null;
  } catch (err) {
    console.error("Error updating slide:", err.message);
    return null;
  }
}

async function deleteSlide({ tenantId, slideId }) {
  try {
    // Check if table exists first
    const tableCheck = await query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = 'public' 
       AND table_name = 'lesson_slides'`
    );
    
    if (tableCheck.rows.length === 0) {
      return null;
    }

    const { rows } = await query(
      `DELETE FROM lesson_slides
       WHERE tenant_id=$1 AND id=$2
       RETURNING *`,
      [tenantId, slideId]
    );
    return rows[0] || null;
  } catch (err) {
    console.error("Error deleting slide:", err.message);
    return null;
  }
}

async function deleteCourse({ tenantId, courseId }) {
  const { rows } = await query(
    `DELETE FROM courses
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, courseId]
  );
  return rows[0] || null;
}

async function deleteModule({ tenantId, moduleId }) {
  const { rows } = await query(
    `DELETE FROM course_modules
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, moduleId]
  );
  return rows[0] || null;
}

async function deleteLesson({ tenantId, lessonId }) {
  const { rows } = await query(
    `DELETE FROM lessons
     WHERE tenant_id=$1 AND id=$2
     RETURNING *`,
    [tenantId, lessonId]
  );
  return rows[0] || null;
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
  updateCourse,
  updateModule,
  updateLesson,
  updateResource,
  updatePractice,
  listLessonResourcesAdmin,
  listLessonPracticeAdmin,
  listLessonMcqsAdmin,
  addMcq,
  updateMcq,
  deleteMcq,
  listLessonSlidesAdmin,
  addSlide,
  updateSlide,
  deleteSlide,
  deleteResource,
  deletePractice,
  deleteCourse,
  deleteModule,
  deleteLesson,
};
