ALTER TABLE courses
ADD COLUMN updated_by uuid NULL;
ALTER TABLE course_modules ADD COLUMN IF NOT EXISTS updated_by uuid NULL;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS updated_by uuid NULL;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS updated_by uuid NULL;
ALTER TABLE practice_tasks ADD COLUMN IF NOT EXISTS updated_by uuid NULL;


-- optional (recommended later)
-- FOREIGN KEY (updated_by) REFERENCES users(id)
