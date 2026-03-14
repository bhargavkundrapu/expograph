-- Verification OTP table: hashed 6-digit OTP for email verification (e.g. before purchase).
-- Kept separate from login_otps so verification can use hashed storage and same 5-min expiry.
BEGIN;

CREATE TABLE IF NOT EXISTS verification_otps (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL,
  otp_hash   TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_verification_otps_email_expires
  ON verification_otps (lower(email), expires_at);

INSERT INTO schema_migrations (filename)
VALUES ('037_verification_otps.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
