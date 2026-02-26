-- Approvals: post-payment pending approvals for SuperAdmin to create students
BEGIN;

CREATE TABLE IF NOT EXISTS approvals (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id             UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  payment_order_id      UUID REFERENCES payment_orders(id) ON DELETE SET NULL,
  item_type             TEXT NOT NULL CHECK (item_type IN ('course', 'pack')),
  item_id               UUID NOT NULL,
  customer_name         TEXT NOT NULL,
  customer_email        TEXT NOT NULL,
  customer_phone        TEXT NOT NULL,
  customer_college      TEXT,
  razorpay_order_id     TEXT,
  razorpay_payment_id   TEXT,
  status                TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by           UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_at           TIMESTAMPTZ,
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals (status);
CREATE INDEX IF NOT EXISTS idx_approvals_tenant ON approvals (tenant_id);
CREATE INDEX IF NOT EXISTS idx_approvals_created ON approvals (created_at DESC);

INSERT INTO schema_migrations (filename)
VALUES ('027_approvals.sql')
ON CONFLICT (filename) DO NOTHING;

COMMIT;
