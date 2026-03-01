-- Prevent duplicate approvals for the same payment order (race condition between callback + webhook)
CREATE UNIQUE INDEX IF NOT EXISTS approvals_payment_order_id_uq ON approvals (payment_order_id);
