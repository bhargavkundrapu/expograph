-- Store frontend origin for payment redirects (fixes localhost redirect on mobile/production)
BEGIN;

ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS redirect_origin TEXT;

COMMIT;
