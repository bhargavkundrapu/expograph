-- Onboarding/tour state per user per tenant (first-time tours, replay, dismiss)
BEGIN;

CREATE TABLE IF NOT EXISTS onboarding_state (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL,
  user_id       UUID NOT NULL,
  tour_key      TEXT NOT NULL,
  tour_version  INT NOT NULL DEFAULT 1,
  status        TEXT NOT NULL CHECK (status IN ('not_started', 'started', 'completed', 'dismissed')),
  last_step     INT NOT NULL DEFAULT 0,
  started_at    TIMESTAMPTZ NULL,
  completed_at  TIMESTAMPTZ NULL,
  dismissed_at TIMESTAMPTZ NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_onboarding_state_tenant_user_tour
  ON onboarding_state (tenant_id, user_id, tour_key);

CREATE INDEX IF NOT EXISTS idx_onboarding_state_user_tenant
  ON onboarding_state (user_id, tenant_id);

INSERT INTO schema_migrations (filename)
VALUES ('038_onboarding_state.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
