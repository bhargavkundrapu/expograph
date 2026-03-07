-- 034_student_id_backfill.sql
-- Ensure every user has a student_id (fixes users that had null after 033 or missing backfill).

BEGIN;

-- Only run if column exists and there are nulls (safe to run multiple times)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'student_id'
  ) THEN
    UPDATE users u
    SET student_id = v.sid
    FROM (
      SELECT id,
             LPAD((1000000 + (row_number() OVER (ORDER BY created_at, id)) - 1)::text, 7, '0') AS sid
      FROM users
      WHERE student_id IS NULL OR TRIM(student_id) = ''
    ) v
    WHERE u.id = v.id;

    UPDATE users
    SET student_id = LPAD(nextval('student_id_seq')::text, 7, '0')
    WHERE student_id IS NULL OR TRIM(student_id) = '';

    PERFORM setval('student_id_seq', (SELECT COALESCE(MAX(student_id)::bigint, 1000000) FROM users));
  END IF;
END $$;

INSERT INTO schema_migrations (filename)
VALUES ('034_student_id_backfill.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
