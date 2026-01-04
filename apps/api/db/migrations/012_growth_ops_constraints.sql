-- apps/api/db/migrations/012_growth_ops_constraints.sql
BEGIN;

-- workshops: unique slug per tenant (so /workshops/:slug works safely)
CREATE UNIQUE INDEX IF NOT EXISTS workshops_tenant_slug_uq
ON workshops(tenant_id, slug)
WHERE deleted_at IS NULL;

-- workshop registrations: avoid duplicate same person registering again
CREATE UNIQUE INDEX IF NOT EXISTS workshop_reg_unique_contact
ON workshop_registrations(tenant_id, workshop_id, COALESCE(email,''), COALESCE(phone,''))
WHERE deleted_at IS NULL;

-- subscriptions: 1 active subscription per user (optional strictness)
CREATE INDEX IF NOT EXISTS subscriptions_tenant_user_idx
ON subscriptions(tenant_id, user_id);

-- certificates: verify_code must be unique (public verify)
CREATE UNIQUE INDEX IF NOT EXISTS certificates_verify_code_uq
ON certificates(verify_code);

-- referral_codes: one active code per user (you can relax later)
CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_owner_uq
ON referral_codes(tenant_id, owner_user_id);

CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_code_uq
ON referral_codes(tenant_id, code);

-- referral events: prevent duplicates between same pair
CREATE UNIQUE INDEX IF NOT EXISTS referral_pair_uq
ON referral_events(tenant_id, referrer_user_id, referred_user_id);

-- audit logs: quick lookups
CREATE INDEX IF NOT EXISTS audit_logs_tenant_time_idx
ON audit_logs(tenant_id, created_at DESC);

-- feature flags: one flag per key per tenant
CREATE UNIQUE INDEX IF NOT EXISTS feature_flags_tenant_key_uq
ON feature_flags(tenant_id, key);

COMMIT;
