-- 033_student_id.sql
-- Unique 7-digit Student ID (User ID) for every user. Displayed in LMS profile.
-- Range: 1000000–9999999 (9M IDs). Sequential, no collisions.

BEGIN;

-- Sequence for generating new IDs (used by DEFAULT and application)
CREATE SEQUENCE IF NOT EXISTS student_id_seq
  START WITH 1000000
  MINVALUE 1000000
  MAXVALUE 9999999
  NO CYCLE
  OWNED BY NONE;

-- Add column (nullable first for backfill)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS student_id VARCHAR(7);

-- Backfill existing users with sequential 7-digit IDs (order by created_at, id)
UPDATE users u
SET student_id = v.sid
FROM (
  SELECT id,
         LPAD((1000000 + (row_number() OVER (ORDER BY created_at, id)) - 1)::text, 7, '0') AS sid
  FROM users
  WHERE student_id IS NULL
) v
WHERE u.id = v.id;

-- Ensure any remaining nulls get an ID (e.g. concurrent inserts)
UPDATE users
SET student_id = LPAD(nextval('student_id_seq')::text, 7, '0')
WHERE student_id IS NULL;

-- Set sequence to max used so new users get next value
SELECT setval(
  'student_id_seq',
  (SELECT COALESCE(MAX(student_id)::bigint, 1000000) FROM users)
);

-- Enforce uniqueness and non-null
ALTER TABLE users
  ALTER COLUMN student_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS users_student_id_unique
  ON users (student_id);

-- Default for new rows: next 7-digit ID from sequence
ALTER TABLE users
  ALTER COLUMN student_id SET DEFAULT LPAD(nextval('student_id_seq')::text, 7, '0');

INSERT INTO schema_migrations (filename)
VALUES ('033_student_id.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
