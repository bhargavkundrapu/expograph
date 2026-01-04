-- apps/api/db/migrations/011_growth_ops.sql

BEGIN;

-- 1) Leads
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  name text,
  email text,
  phone text,
  source text NOT NULL DEFAULT 'unknown',     -- workshop / instagram / referral / website
  status text NOT NULL DEFAULT 'new',         -- new / contacted / enrolled / lost
  notes text,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,    -- extra fields without changing schema
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 2) Workshops
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  title text NOT NULL,
  slug text NOT NULL,
  description text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  mode text NOT NULL DEFAULT 'offline',       -- offline / online / hybrid
  location text,
  meet_link text,

  capacity int NOT NULL DEFAULT 0,            -- 0 = unlimited
  status text NOT NULL DEFAULT 'published',   -- draft / published / cancelled / completed

  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 3) Workshop registrations
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workshop_id uuid NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,

  user_id uuid,                               -- nullable (public can register)
  name text NOT NULL,
  email text,
  phone text,
  college text,
  year text,

  status text NOT NULL DEFAULT 'registered',  -- registered / attended / no_show / cancelled
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 4) Subscriptions (needed for referral rule + LMS access later)
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  status text NOT NULL DEFAULT 'inactive',    -- inactive / active / expired / cancelled
  started_at timestamptz,
  ends_at timestamptz,

  provider text,                               -- razorpay/stripe/manual
  provider_ref text,
  amount_paise int,                            -- store paise (safe)
  currency text NOT NULL DEFAULT 'INR',

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5) Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  course_id uuid,                              -- optional now
  title text NOT NULL,                         -- e.g., "React Foundations"
  issued_at timestamptz NOT NULL DEFAULT now(),
  verify_code text NOT NULL,                   -- public verify
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 6) Referral codes (per user)
CREATE TABLE IF NOT EXISTS referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  code text NOT NULL,                          -- e.g., EXPO-AB12
  is_active boolean NOT NULL DEFAULT true,

  created_at timestamptz NOT NULL DEFAULT now()
);

-- 7) Referral events (tracks who referred whom + reward state)
CREATE TABLE IF NOT EXISTS referral_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  referrer_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  referral_code text NOT NULL,
  stage text NOT NULL DEFAULT 'signup',        -- signup / paid / active_7d / rewarded / rejected
  reward_amount_paise int NOT NULL DEFAULT 0,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8) Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  actor_user_id uuid,                          -- null for public actions
  action text NOT NULL,                        -- e.g., "content.publish", "role.change"
  entity_type text,                            -- "course", "user", "workshop"
  entity_id uuid,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  ip text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 9) Feature flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  key text NOT NULL,                           -- e.g., "micro_internships"
  enabled boolean NOT NULL DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,

  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMIT;
