-- Track purchase receipt / invoice email delivery (Resend) per captured Razorpay payment.
BEGIN;

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS invoice_email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS invoice_email_error TEXT;

COMMENT ON COLUMN payments.invoice_email_sent_at IS 'Set when purchase receipt email was accepted by provider.';
COMMENT ON COLUMN payments.invoice_email_error IS 'Last failure message if receipt email could not be sent.';

INSERT INTO schema_migrations (filename)
VALUES ('042_payment_invoice_email.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
