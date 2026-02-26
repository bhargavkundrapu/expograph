// apps/api/src/modules/approvals/approvals.repo.js
const { query } = require("../../db/query");

async function createApproval({
  tenantId,
  paymentOrderId,
  itemType,
  itemId,
  customerName,
  customerEmail,
  customerPhone,
  customerCollege,
  razorpayOrderId,
  razorpayPaymentId,
}) {
  const { rows } = await query(
    `INSERT INTO approvals
     (tenant_id, payment_order_id, item_type, item_id, customer_name, customer_email, customer_phone, customer_college,
      razorpay_order_id, razorpay_payment_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
     RETURNING *`,
    [
      tenantId,
      paymentOrderId,
      itemType,
      itemId,
      customerName,
      customerEmail,
      customerPhone,
      customerCollege ?? null,
      razorpayOrderId ?? null,
      razorpayPaymentId ?? null,
    ]
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await query(`SELECT * FROM approvals WHERE id = $1 LIMIT 1`, [id]);
  return rows[0] ?? null;
}

async function listByStatus({ tenantId, status = "pending" }) {
  const { rows } = await query(
    `SELECT a.*,
       CASE WHEN a.item_type = 'course' THEN c.title ELSE p.title END AS item_title
     FROM approvals a
     LEFT JOIN courses c ON a.item_type = 'course' AND c.id = a.item_id
     LEFT JOIN course_packs p ON a.item_type = 'pack' AND p.id = a.item_id
     WHERE a.tenant_id = $1 AND a.status = $2
     ORDER BY a.created_at DESC`,
    [tenantId, status]
  );
  return rows;
}

async function listAll({ tenantId }) {
  const { rows } = await query(
    `SELECT a.*,
       CASE WHEN a.item_type = 'course' THEN c.title ELSE p.title END AS item_title
     FROM approvals a
     LEFT JOIN courses c ON a.item_type = 'course' AND c.id = a.item_id
     LEFT JOIN course_packs p ON a.item_type = 'pack' AND p.id = a.item_id
     WHERE a.tenant_id = $1
     ORDER BY
       CASE a.status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
       a.created_at DESC`,
    [tenantId]
  );
  return rows;
}

async function markApproved(approvalId, approvedByUserId) {
  const { rows } = await query(
    `UPDATE approvals
     SET status = 'approved', approved_by = $2, approved_at = now(), updated_at = now()
     WHERE id = $1 AND status = 'pending'
     RETURNING *`,
    [approvalId, approvedByUserId]
  );
  return rows[0] ?? null;
}

async function markRejected(approvalId, notes = null) {
  const { rows } = await query(
    `UPDATE approvals
     SET status = 'rejected', notes = $2, updated_at = now()
     WHERE id = $1 AND status = 'pending'
     RETURNING *`,
    [approvalId, notes]
  );
  return rows[0] ?? null;
}

module.exports = {
  createApproval,
  findById,
  listByStatus,
  listAll,
  markApproved,
  markRejected,
};
