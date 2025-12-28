BEGIN;

CREATE TABLE IF NOT EXISTS device_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),

  device_id text NOT NULL,
  user_agent text,
  ip_hash text,

  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS device_sessions_uq
  ON device_sessions (tenant_id, user_id, device_id);

CREATE INDEX IF NOT EXISTS device_sessions_user_idx
  ON device_sessions (tenant_id, user_id, last_seen_at DESC);

COMMIT;
