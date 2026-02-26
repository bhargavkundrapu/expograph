-- Add pricing to courses, create course_packs, add college to users
BEGIN;

ALTER TABLE courses ADD COLUMN IF NOT EXISTS price_in_paise BIGINT NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS course_packs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL,
  description   TEXT,
  price_in_paise BIGINT NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS course_packs_tenant_slug_uq ON course_packs (tenant_id, slug);

ALTER TABLE users ADD COLUMN IF NOT EXISTS college TEXT;

INSERT INTO schema_migrations (filename)
VALUES ('024_courses_pricing_packs.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
