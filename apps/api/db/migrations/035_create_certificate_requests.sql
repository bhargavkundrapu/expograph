-- Certificate requests: student requests certificate after 100% course completion (035_create_certificate_requests.sql)
BEGIN;

CREATE TABLE IF NOT EXISTS certificate_requests (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id          UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id          UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress_snapshot  INT NOT NULL,
  status             TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'issued')),
  requested_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at         TIMESTAMPTZ,
  decided_by         UUID REFERENCES users(id),
  reject_reason      TEXT,
  UNIQUE (tenant_id, user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificate_requests_tenant_status
  ON certificate_requests (tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_user
  ON certificate_requests (tenant_id, user_id);

INSERT INTO schema_migrations (filename)
VALUES ('035_create_certificate_requests.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
