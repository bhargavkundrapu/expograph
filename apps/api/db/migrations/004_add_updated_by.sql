ALTER TABLE courses
ADD COLUMN updated_by uuid NULL;

-- optional (recommended later)
-- FOREIGN KEY (updated_by) REFERENCES users(id)
