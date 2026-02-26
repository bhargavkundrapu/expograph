-- Login OTP table: stores one-time codes for passwordless email login
BEGIN;

CREATE TABLE IF NOT EXISTS login_otps (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL,
  otp_code   TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_login_otps_email_expires
  ON login_otps (lower(email), expires_at);

-- Clean expired OTPs periodically (optional helper; can also use cron)
-- No trigger needed; verification checks expiry_at at query time

INSERT INTO schema_migrations (filename)
VALUES ('023_login_otp.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
