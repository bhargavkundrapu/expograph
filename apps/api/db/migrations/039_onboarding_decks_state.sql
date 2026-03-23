-- Onboarding walkthrough decks: slide-based popup state per user/tenant/deck
BEGIN;

CREATE TABLE IF NOT EXISTS onboarding_decks_state (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL,
  user_id       UUID NOT NULL,
  deck_key      TEXT NOT NULL,
  deck_version  INT NOT NULL DEFAULT 1,
  status        TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed', 'dismissed')),
  slide_index   INT NOT NULL DEFAULT 0,
  started_at    TIMESTAMPTZ NULL,
  completed_at  TIMESTAMPTZ NULL,
  dismissed_at  TIMESTAMPTZ NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_onboarding_decks_state_tenant_user_deck
  ON onboarding_decks_state (tenant_id, user_id, deck_key);

CREATE INDEX IF NOT EXISTS idx_onboarding_decks_state_user_tenant
  ON onboarding_decks_state (user_id, tenant_id);

INSERT INTO schema_migrations (filename)
VALUES ('039_onboarding_decks_state.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
