BEGIN;

-- 1) Status enum for submissions
DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM ('submitted', 'in_review', 'changes_requested', 'approved');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2) Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  task_id      UUID NOT NULL REFERENCES practice_tasks(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  attempt_no   INT  NOT NULL DEFAULT 1,
  status       submission_status NOT NULL DEFAULT 'submitted',

  content_type TEXT NOT NULL DEFAULT 'text',   -- "text" | "code" | "link"
  content      TEXT NOT NULL,                  -- stores code or url or text

  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique attempt number per task per user (so attempt_no increments cleanly)
CREATE UNIQUE INDEX IF NOT EXISTS submissions_attempt_uq
  ON submissions (tenant_id, task_id, user_id, attempt_no);

CREATE INDEX IF NOT EXISTS submissions_tenant_status_idx
  ON submissions (tenant_id, status, submitted_at DESC);

CREATE INDEX IF NOT EXISTS submissions_user_idx
  ON submissions (tenant_id, user_id, submitted_at DESC);

CREATE INDEX IF NOT EXISTS submissions_task_idx
  ON submissions (tenant_id, task_id, submitted_at DESC);


-- 3) Reviews table (mentor feedback)
CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  mentor_id     UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,

  score         INT,
  feedback      TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_submission_idx
  ON reviews (tenant_id, submission_id, created_at DESC);


-- Mark migration applied
INSERT INTO schema_migrations (filename)
VALUES ('007_submissions.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
