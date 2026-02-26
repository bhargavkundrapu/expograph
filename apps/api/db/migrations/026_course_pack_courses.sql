-- course_pack_courses: which courses belong to each pack
BEGIN;

CREATE TABLE IF NOT EXISTS course_pack_courses (
  pack_id   UUID NOT NULL REFERENCES course_packs(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  PRIMARY KEY (pack_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_course_pack_courses_pack ON course_pack_courses (pack_id);
CREATE INDEX IF NOT EXISTS idx_course_pack_courses_course ON course_pack_courses (course_id);

-- Seed All Pack with all published courses
INSERT INTO course_pack_courses (pack_id, course_id)
SELECT p.id, c.id
FROM course_packs p
JOIN tenants t ON t.id = p.tenant_id
JOIN courses c ON c.tenant_id = t.id AND c.status = 'published'
WHERE p.slug = 'all-pack'
ON CONFLICT (pack_id, course_id) DO NOTHING;

INSERT INTO schema_migrations (filename)
VALUES ('026_course_pack_courses.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
