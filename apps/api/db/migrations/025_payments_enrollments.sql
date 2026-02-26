-- Payment orders, payments, enrollments (025_payments_enrollments.sql)
BEGIN;

CREATE TABLE IF NOT EXISTS payment_orders (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id          UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  item_type          TEXT NOT NULL CHECK (item_type IN ('course', 'pack')),
  item_id            UUID NOT NULL,
  amount             BIGINT NOT NULL,
  currency           TEXT NOT NULL DEFAULT 'INR',
  razorpay_order_id  TEXT UNIQUE,
  status             TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'expired')),
  customer_name      TEXT NOT NULL,
  customer_email     TEXT NOT NULL,
  customer_phone     TEXT NOT NULL,
  customer_college   TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_razorpay ON payment_orders (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON payment_orders (status);
CREATE INDEX IF NOT EXISTS idx_payment_orders_item ON payment_orders (item_type, item_id);

CREATE TABLE IF NOT EXISTS payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_order_id    UUID NOT NULL REFERENCES payment_orders(id) ON DELETE CASCADE,
  razorpay_payment_id TEXT UNIQUE NOT NULL,
  status              TEXT NOT NULL,
  raw_payload         JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_razorpay ON payments (razorpay_payment_id);

CREATE TABLE IF NOT EXISTS enrollments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  item_type   TEXT NOT NULL CHECK (item_type IN ('course', 'pack')),
  item_id     UUID NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments (user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_item ON enrollments (item_type, item_id);

INSERT INTO schema_migrations (filename)
VALUES ('025_payments_enrollments.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
