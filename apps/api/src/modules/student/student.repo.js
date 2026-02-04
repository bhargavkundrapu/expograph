// apps/api/src/modules/student/student.repo.js
const { query } = require("../../db/query");

// Dashboard & Home
async function getSchedule({ tenantId, userId }) {
  try {
    // Get lessons from enrolled courses with progress
    const lessonsResult = await query(
      `SELECT 
        l.id as lesson_id,
        l.title as lesson_title,
        l.slug as lesson_slug,
        l.duration_seconds,
        c.id as course_id,
        c.title as course_title,
        c.slug as course_slug,
        cm.id as module_id,
        cm.title as module_title,
        cm.slug as module_slug,
        cm.position as module_position,
        l.position as lesson_position,
        lp.completed_at,
        lp.watch_seconds,
        l.duration_seconds as total_duration
      FROM courses c
      JOIN course_modules cm ON cm.course_id = c.id AND cm.status = 'published'
      JOIN lessons l ON l.module_id = cm.id AND l.status = 'published'
      LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
      WHERE c.tenant_id = $2 AND c.status = 'published'
      ORDER BY c.id, cm.position ASC, l.position ASC
      LIMIT 20`,
      [userId, tenantId]
    );

    // Get practice tasks from lessons
    const practiceResult = await query(
      `SELECT 
        pt.id as task_id,
        pt.title as task_title,
        pt.lesson_id,
        l.slug as lesson_slug,
        c.slug as course_slug,
        cm.slug as module_slug,
        l.title as lesson_title,
        s.id as submission_id,
        s.status as submission_status,
        s.attempt_no
      FROM practice_tasks pt
      JOIN lessons l ON l.id = pt.lesson_id AND l.tenant_id = pt.tenant_id
      JOIN course_modules cm ON cm.id = l.module_id AND cm.tenant_id = l.tenant_id
      JOIN courses c ON c.id = cm.course_id AND c.tenant_id = cm.tenant_id
      LEFT JOIN submissions s ON s.task_id = pt.id AND s.user_id = $1
      WHERE pt.tenant_id = $2 
        AND c.status = 'published' 
        AND cm.status = 'published' 
        AND l.status = 'published'
      ORDER BY c.id, cm.position ASC, l.position ASC, pt.sort_order ASC
      LIMIT 20`,
      [userId, tenantId]
    );

    const schedule = [];

    // Process lessons
    lessonsResult.rows.forEach((row) => {
      const completed = !!row.completed_at;
      const progress = completed ? 100 : (row.watch_seconds && row.total_duration 
        ? Math.min(Math.round((row.watch_seconds / row.total_duration) * 100), 99)
        : 0);
      
      const durationMins = row.duration_seconds ? Math.round(row.duration_seconds / 60) : 0;
      const hours = Math.floor(durationMins / 60);
      const mins = durationMins % 60;
      const duration = hours > 0 ? `${hours} Hr ${mins} Mins` : `${mins} Mins`;

      schedule.push({
        id: `lesson_${row.lesson_id}`,
        title: row.lesson_title,
        activityType: "LEARNING",
        progress: progress,
        completed: completed ? 1 : 0,
        total: 1,
        duration: duration,
        courseSlug: row.course_slug,
        moduleSlug: row.module_slug,
        lessonSlug: row.lesson_slug,
        type: "lesson",
        order: (row.module_position || 0) * 1000 + (row.lesson_position || 0),
      });
    });

    // Process practice tasks
    practiceResult.rows.forEach((row) => {
      const completed = row.submission_status === 'approved' || row.submission_status === 'completed';
      const progress = completed ? 100 : (row.submission_id ? 50 : 0);
      
      schedule.push({
        id: `practice_${row.task_id}`,
        title: row.task_title,
        activityType: "PRACTICE",
        progress: progress,
        completed: completed ? 1 : 0,
        total: 1,
        duration: "25 Mins", // Default duration for practice tasks
        courseSlug: row.course_slug,
        moduleSlug: row.module_slug,
        lessonSlug: row.lesson_slug,
        taskId: row.task_id,
        type: "practice",
        order: schedule.length + 1, // Append after lessons
      });
    });

    // Sort by order
    schedule.sort((a, b) => a.order - b.order);

    return schedule;
  } catch (error) {
    console.error("Error in getSchedule:", error);
    return [];
  }
}

async function getCurrentCourse({ tenantId, userId }) {
  try {
    // Get the most recently accessed course
    // First try to get a course with progress
    let result = await query(
      `SELECT DISTINCT ON (c.id) 
         c.id, c.title, c.slug, cm.title as module_name, cm.slug as module_slug, 
         l.title as lesson_name, l.slug as lesson_slug,
         CASE WHEN lp.completed_at IS NOT NULL THEN 100 ELSE 0 END as progress,
         lp.updated_at
       FROM courses c
       JOIN course_modules cm ON cm.course_id = c.id AND cm.status = 'published'
       JOIN lessons l ON l.module_id = cm.id AND l.status = 'published'
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
       WHERE c.tenant_id = $2 AND c.status = 'published'
       ORDER BY c.id, lp.updated_at DESC NULLS LAST, lp.created_at DESC NULLS LAST
       LIMIT 1`,
      [userId, tenantId]
    );

    // If no course with progress, get any published course
    if (result.rows.length === 0) {
      result = await query(
        `SELECT DISTINCT ON (c.id)
           c.id, c.title, c.slug, cm.title as module_name, cm.slug as module_slug, 
           l.title as lesson_name, l.slug as lesson_slug, 0 as progress
         FROM courses c
         JOIN course_modules cm ON cm.course_id = c.id AND cm.status = 'published'
         JOIN lessons l ON l.module_id = cm.id AND l.status = 'published'
         WHERE c.tenant_id = $1 AND c.status = 'published'
         ORDER BY c.id, l.position ASC
         LIMIT 1`,
        [tenantId]
      );
    }

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      courseName: row.title,
      courseSlug: row.slug,
      moduleName: row.module_name || null,
      moduleSlug: row.module_slug || null,
      lessonName: row.lesson_name || null,
      lessonSlug: row.lesson_slug || null,
      progress: parseInt(row.progress) || 0,
    };
  } catch (error) {
    console.error("Error in getCurrentCourse:", error);
    return null;
  }
}

async function getProgress({ tenantId, userId }) {
  try {
    // Calculate overall progress
    const result = await query(
      `SELECT 
         COUNT(DISTINCT l.id) FILTER (WHERE lp.completed_at IS NOT NULL) as completed_lessons,
         COUNT(DISTINCT l.id) as total_lessons
       FROM lessons l
       JOIN course_modules cm ON cm.id = l.module_id
       JOIN courses c ON c.id = cm.course_id
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
       WHERE c.tenant_id = $2 AND c.status = 'published'`,
      [userId, tenantId]
    );

    const row = result.rows[0] || {};
    const completed = parseInt(row.completed_lessons) || 0;
    const total = parseInt(row.total_lessons) || 1;

    // Calculate consistency days (distinct days with activity)
    const consistencyResult = await query(
      `SELECT COUNT(DISTINCT DATE(updated_at)) as consistency_days
       FROM lesson_progress
       WHERE user_id = $1 AND updated_at >= CURRENT_DATE - INTERVAL '30 days'`,
      [userId]
    ).catch(() => ({ rows: [{ consistency_days: 0 }] }));

    // Calculate streak (simplified)
    const streakResult = await query(
      `SELECT COUNT(DISTINCT DATE(updated_at)) as streak
       FROM lesson_progress
       WHERE user_id = $1 AND updated_at >= CURRENT_DATE - INTERVAL '30 days'`,
      [userId]
    ).catch(() => ({ rows: [{ streak: 0 }] }));

    const consistency = parseInt(consistencyResult.rows[0]?.consistency_days) || 0;

    return {
      completed: total > 0 ? Math.round((completed / total) * 100) : 0,
      completed_lessons: completed,
      total_lessons: total,
      streak: parseInt(streakResult.rows[0]?.streak) || 0,
      consistency: Math.min(consistency, 100),
    };
  } catch (error) {
    console.error("Error in getProgress:", error);
    return {
      completed: 0,
      completed_lessons: 0,
      total_lessons: 0,
      streak: 0,
      consistency: 0,
    };
  }
}

async function getEvents({ tenantId }) {
  // Get upcoming events/workshops
  const result = await query(
    `SELECT id, title, starts_at, ends_at
     FROM workshops
     WHERE tenant_id = $1 AND status = 'published' AND starts_at >= NOW()
     ORDER BY starts_at ASC
     LIMIT 10`,
    [tenantId]
  );

  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: new Date(row.starts_at).toLocaleDateString(),
  }));
}

// Courses
async function listEnrolledCourses({ tenantId, userId }) {
  try {
    // Get all published courses (assuming all students have access)
    // In production, check enrollments table
    const result = await query(
      `SELECT c.id, c.title, c.slug, c.description, c.level,
              COUNT(DISTINCT cm.id) as modules_count,
              COUNT(DISTINCT l.id) FILTER (WHERE lp.completed_at IS NOT NULL) as completed_lessons,
              COUNT(DISTINCT l.id) as total_lessons
       FROM courses c
       LEFT JOIN course_modules cm ON cm.course_id = c.id AND cm.status = 'published'
       LEFT JOIN lessons l ON l.module_id = cm.id AND l.status = 'published'
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
       WHERE c.tenant_id = $2 AND c.status = 'published'
       GROUP BY c.id, c.title, c.slug, c.description, c.level
       ORDER BY c.created_at DESC`,
      [userId, tenantId]
    );

    return result.rows.map((row) => {
      const totalLessons = parseInt(row.total_lessons) || 0;
      const completedLessons = parseInt(row.completed_lessons) || 0;
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        level: row.level,
        modules_count: parseInt(row.modules_count) || 0,
        completed_lessons: completedLessons,
        total_lessons: totalLessons,
        progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      };
    });
  } catch (error) {
    console.error("Error in listEnrolledCourses:", error);
    return []; // Return empty array on error
  }
}

async function enhanceCourseWithProgress({ tenantId, userId, course }) {
  try {
    // Enhance modules and lessons with progress data
    const lessonIds = [];
    course.modules?.forEach((module) => {
      module.lessons?.forEach((lesson) => {
        if (lesson.id) lessonIds.push(lesson.id);
      });
    });

    if (lessonIds.length === 0) return course;

    const progressResult = await query(
      `SELECT lesson_id, completed_at, watch_seconds, last_position_seconds
       FROM lesson_progress
       WHERE user_id = $1 AND lesson_id = ANY($2::uuid[])`,
      [userId, lessonIds]
    ).catch(() => ({ rows: [] }));

    const progressMap = new Map();
    progressResult.rows.forEach((row) => {
      progressMap.set(row.lesson_id, {
        completed: !!row.completed_at,
        progress: row.completed_at ? 100 : 0, // Calculate progress based on completion
      });
    });

    // Enhance course structure
    const enhancedModules = course.modules.map((module) => ({
      ...module,
      lessons: (module.lessons || []).map((lesson) => {
        const progress = progressMap.get(lesson.id) || { completed: false, progress: 0 };
        return {
          ...lesson,
          completed: progress.completed,
          locked: false, // Determine based on prerequisites
        };
      }),
    }));

    return {
      ...course,
      modules: enhancedModules,
    };
  } catch (error) {
    console.error("Error in enhanceCourseWithProgress:", error);
    return course; // Return original course on error
  }
}

async function enhanceLessonWithData({ tenantId, userId, lesson, moduleLessons }) {
  // lesson is the result from contentRepo.getPublishedLessonBySlugs
  // which returns { lesson: {...}, resources: [...], practice: [...] }
  const lessonRow = lesson.lesson || lesson;
  const lessonId = lessonRow.lesson_id || lessonRow.id;

  // Get progress for lesson
  const progressResult = await query(
    `SELECT completed_at, watch_seconds, last_position_seconds
     FROM lesson_progress
     WHERE user_id = $1 AND lesson_id = $2`,
    [userId, lessonId]
  ).catch(() => ({ rows: [] }));

  const progress = progressResult.rows[0] || {};
  const completed = !!progress.completed_at;

  // Get resources (cheatsheets, slides, etc.) - already included from contentRepo
  const resources = lesson.resources || [];

  // Get MCQs (using lesson_mcqs table)
  const mcqsResult = await query(
    `SELECT id, question, options
     FROM lesson_mcqs
     WHERE tenant_id = $1 AND lesson_id = $2
     ORDER BY sort_order ASC
     LIMIT 10`,
    [tenantId, lessonId]
  ).catch(() => ({ rows: [] }));

  // Get practice tasks - already included from contentRepo
  const practiceTasks = lesson.practice || [];

  // Enhance module lessons with progress
  const lessonIds = moduleLessons.map((l) => l.id);
  const progressMap = new Map();
  if (lessonIds.length > 0) {
    const allProgress = await query(
      `SELECT lesson_id, completed_at
       FROM lesson_progress
       WHERE user_id = $1 AND lesson_id = ANY($2::uuid[])`,
      [userId, lessonIds]
    ).catch(() => ({ rows: [] }));

    allProgress.rows.forEach((row) => {
      progressMap.set(row.lesson_id, { completed: !!row.completed_at });
    });
  }

  const moduleLessonsEnhanced = moduleLessons.map((l) => {
    const lProgress = progressMap.get(l.id) || { completed: false };
    return {
      ...l,
      completed: lProgress.completed,
      locked: false,
    };
  });

  return {
    lesson: {
      id: lessonRow.lesson_id || lessonRow.id,
      title: lessonRow.lesson_title || lessonRow.title,
      slug: lessonRow.lesson_slug || lessonRow.slug,
      summary: lessonRow.summary,
      goal: lessonRow.goal,
      video_provider: lessonRow.video_provider,
      video_id: lessonRow.video_id,
      video_url: lessonRow.video_url,
      prompts: lessonRow.prompts,
      success_image_url: lessonRow.success_image_url,
      pdf_url: lessonRow.pdf_url,
      duration_seconds: lessonRow.duration_seconds,
      completed,
    },
    moduleLessons: moduleLessonsEnhanced,
    resources: resources.map((row) => ({
      id: row.id,
      type: row.type,
      title: row.title,
      url: row.url,
      body: row.body,
    })),
    mcqs: mcqsResult.rows.map((row) => {
      const optionsArray = Array.isArray(row.options) ? row.options : (row.options ? JSON.parse(row.options) : []);
      // Extract correct answer from options array (find option with isCorrect: true)
      const correctOption = optionsArray.find(opt => opt.isCorrect === true);
      return {
        id: row.id,
        question: row.question,
        options: optionsArray.map(opt => opt.text || opt),
        correct_answer: correctOption?.text || correctOption || optionsArray[0]?.text || "",
      };
    }),
    practiceTasks: practiceTasks.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.prompt,
      desired_output: row.expected_output,
      required_things: [],
    })),
    completed,
  };
}

// Discussions
async function listDiscussions({ tenantId }) {
  const result = await query(
    `SELECT d.id, d.discussion_name, d.problem, d.author_id, u.full_name as author_name,
            d.created_at, d.upvotes,
            (SELECT COUNT(*) FROM discussion_replies WHERE discussion_id = d.id) as replies_count
     FROM discussions d
     LEFT JOIN users u ON u.id = d.author_id
     WHERE d.tenant_id = $1
     ORDER BY d.created_at DESC`,
    [tenantId]
  );

  return result.rows;
}

async function createDiscussion({ tenantId, userId, data }) {
  const result = await query(
    `INSERT INTO discussions (tenant_id, author_id, discussion_name, problem)
     VALUES ($1, $2, $3, $4)
     RETURNING id, discussion_name, problem, author_id, created_at, upvotes`,
    [tenantId, userId, data.discussion_name, data.problem]
  );

  return result.rows[0];
}

async function getDiscussion({ tenantId, discussionId }) {
  const result = await query(
    `SELECT d.id, d.discussion_name, d.problem, d.author_id, u.full_name as author_name,
            d.created_at, d.upvotes
     FROM discussions d
     LEFT JOIN users u ON u.id = d.author_id
     WHERE d.tenant_id = $1 AND d.id = $2`,
    [tenantId, discussionId]
  );

  if (result.rows.length === 0) return null;

  const discussion = result.rows[0];

  // Get replies
  const repliesResult = await query(
    `SELECT dr.id, dr.message, dr.author_id, u.full_name as author_name, dr.created_at
     FROM discussion_replies dr
     LEFT JOIN users u ON u.id = dr.author_id
     WHERE dr.discussion_id = $1
     ORDER BY dr.created_at ASC`,
    [discussionId]
  );

  return {
    ...discussion,
    replies: repliesResult.rows,
    replies_count: repliesResult.rows.length,
  };
}

async function createReply({ tenantId, userId, discussionId, message }) {
  const result = await query(
    `INSERT INTO discussion_replies (tenant_id, discussion_id, author_id, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, message, author_id, created_at`,
    [tenantId, discussionId, userId, message]
  );

  return result.rows[0];
}

async function upvoteDiscussion({ tenantId, userId, discussionId }) {
  // Check if already upvoted
  const existing = await query(
    `SELECT id FROM discussion_upvotes
     WHERE discussion_id = $1 AND user_id = $2`,
    [discussionId, userId]
  );

  if (existing.rows.length === 0) {
    await query(
      `INSERT INTO discussion_upvotes (tenant_id, discussion_id, user_id)
       VALUES ($1, $2, $3)`,
      [tenantId, discussionId, userId]
    );

    await query(
      `UPDATE discussions SET upvotes = upvotes + 1 WHERE id = $1`,
      [discussionId]
    );
  }
}

// Bookmarks
async function listBookmarks({ tenantId, userId }) {
  const result = await query(
    `SELECT 
      b.id, 
      b.type, 
      b.item_id, 
      b.created_at,
      CASE 
        WHEN b.type = 'lesson' THEN l.title
        WHEN b.type = 'mcq' THEN lmq.question
        WHEN b.type = 'practice' THEN pt.title
        WHEN b.type = 'discussion' THEN d.discussion_name
        ELSE NULL
      END as title,
      CASE 
        WHEN b.type = 'lesson' THEN l.summary
        WHEN b.type = 'mcq' THEN lmq.question
        WHEN b.type = 'practice' THEN pt.prompt
        WHEN b.type = 'discussion' THEN d.problem
        ELSE NULL
      END as description,
      CASE 
        WHEN b.type = 'lesson' THEN c.slug
        ELSE NULL
      END as course_slug,
      CASE 
        WHEN b.type = 'lesson' THEN cm.slug
        ELSE NULL
      END as module_slug,
      CASE 
        WHEN b.type = 'lesson' THEN l.slug
        ELSE NULL
      END as lesson_slug,
      CASE 
        WHEN b.type = 'lesson' THEN c.title
        ELSE NULL
      END as course_title
     FROM bookmarks b
     LEFT JOIN lessons l ON b.type = 'lesson' AND b.item_id = l.id AND b.tenant_id = l.tenant_id
     LEFT JOIN course_modules cm ON l.module_id = cm.id AND b.tenant_id = cm.tenant_id
     LEFT JOIN courses c ON cm.course_id = c.id AND b.tenant_id = c.tenant_id
     LEFT JOIN lesson_mcqs lmq ON b.type = 'mcq' AND b.item_id = lmq.id AND b.tenant_id = lmq.tenant_id
     LEFT JOIN practice_tasks pt ON b.type = 'practice' AND b.item_id = pt.id AND b.tenant_id = pt.tenant_id
     LEFT JOIN discussions d ON b.type = 'discussion' AND b.item_id = d.id AND b.tenant_id = d.tenant_id
     WHERE b.tenant_id = $1 AND b.user_id = $2
     ORDER BY b.created_at DESC`,
    [tenantId, userId]
  );

  return result.rows;
}

async function createBookmark({ tenantId, userId, data }) {
  // Check if already bookmarked
  const existing = await query(
    `SELECT id FROM bookmarks
     WHERE tenant_id = $1 AND user_id = $2 AND type = $3 AND item_id = $4`,
    [tenantId, userId, data.type, data.item_id]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const result = await query(
    `INSERT INTO bookmarks (tenant_id, user_id, type, item_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, type, item_id, created_at`,
    [tenantId, userId, data.type, data.item_id]
  );

  return result.rows[0];
}

async function deleteBookmark({ tenantId, userId, bookmarkId }) {
  await query(
    `DELETE FROM bookmarks
     WHERE id = $1 AND tenant_id = $2 AND user_id = $3`,
    [bookmarkId, tenantId, userId]
  );
}

async function getModuleLessons({ tenantId, moduleId }) {
  const result = await query(
    `SELECT id, title, slug, summary, position
     FROM lessons
     WHERE tenant_id = $1 AND module_id = $2 AND status = 'published'
     ORDER BY position ASC, created_at ASC`,
    [tenantId, moduleId]
  );
  return result.rows;
}

module.exports = {
  getSchedule,
  getCurrentCourse,
  getProgress,
  getEvents,
  listEnrolledCourses,
  enhanceCourseWithProgress,
  enhanceLessonWithData,
  listDiscussions,
  createDiscussion,
  getDiscussion,
  createReply,
  upvoteDiscussion,
  listBookmarks,
  createBookmark,
  deleteBookmark,
  getModuleLessons,
};
