BEGIN;

-- Content engine
CREATE INDEX IF NOT EXISTS courses_tenant_status_idx
  ON courses (tenant_id, status);

CREATE INDEX IF NOT EXISTS modules_tenant_course_status_idx
  ON course_modules (tenant_id, course_id, status);

CREATE INDEX IF NOT EXISTS lessons_tenant_module_status_idx
  ON lessons (tenant_id, module_id, status);

CREATE INDEX IF NOT EXISTS resources_tenant_lesson_idx
  ON resources (tenant_id, lesson_id);

CREATE INDEX IF NOT EXISTS practice_tenant_lesson_idx
  ON practice_tasks (tenant_id, lesson_id);

-- Progress
CREATE INDEX IF NOT EXISTS lesson_progress_tenant_user_idx
  ON lesson_progress (tenant_id, user_id);

CREATE INDEX IF NOT EXISTS lesson_progress_tenant_lesson_idx
  ON lesson_progress (tenant_id, lesson_id);

-- Submissions/Reviews
CREATE INDEX IF NOT EXISTS submissions_tenant_user_idx
  ON submissions (tenant_id, user_id);

CREATE INDEX IF NOT EXISTS submissions_tenant_task_idx
  ON submissions (tenant_id, task_id);

CREATE INDEX IF NOT EXISTS reviews_tenant_submission_idx
  ON reviews (tenant_id, submission_id);

-- SaaS core (if tables exist)
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS memberships_tenant_user_idx
    ON memberships (tenant_id, user_id);
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

COMMIT;
