// apps/api/src/modules/payments/payments.repo.js
const { query } = require("../../db/query");

async function getCoursePrice({ tenantId, courseId }) {
  const { rows } = await query(
    `SELECT id, title, price_in_paise FROM courses
     WHERE tenant_id = $1 AND id = $2 AND status = 'published' LIMIT 1`,
    [tenantId, courseId]
  );
  return rows[0] ?? null;
}

async function getPackPrice({ tenantId, packId }) {
  const { rows } = await query(
    `SELECT id, title, price_in_paise FROM course_packs
     WHERE tenant_id = $1 AND id = $2 AND status = 'published' LIMIT 1`,
    [tenantId, packId]
  );
  return rows[0] ?? null;
}

async function createPaymentOrder({
  tenantId,
  itemType,
  itemId,
  amount,
  currency,
  razorpayOrderId,
  customerName,
  customerEmail,
  customerPhone,
  customerCollege,
}) {
  const { rows } = await query(
    `INSERT INTO payment_orders
     (tenant_id, item_type, item_id, amount, currency, razorpay_order_id, status,
      customer_name, customer_email, customer_phone, customer_college)
     VALUES ($1, $2, $3, $4, $5, $6, 'created', $7, $8, $9, $10)
     RETURNING *`,
    [
      tenantId,
      itemType,
      itemId,
      amount,
      currency,
      razorpayOrderId,
      customerName,
      customerEmail,
      customerPhone,
      customerCollege ?? null,
    ]
  );
  return rows[0];
}

async function findByRazorpayOrderId(razorpayOrderId) {
  const { rows } = await query(
    `SELECT * FROM payment_orders WHERE razorpay_order_id = $1 LIMIT 1`,
    [razorpayOrderId]
  );
  return rows[0] ?? null;
}

async function findByLocalId(id) {
  const { rows } = await query(
    `SELECT * FROM payment_orders WHERE id = $1 LIMIT 1`,
    [id]
  );
  return rows[0] ?? null;
}

async function markOrderPaid(orderId) {
  const { rows } = await query(
    `UPDATE payment_orders SET status = 'paid', updated_at = now()
     WHERE id = $1 AND status = 'created' RETURNING *`,
    [orderId]
  );
  return rows[0] ?? null;
}

async function createPaymentRecord({ paymentOrderId, razorpayPaymentId, status, rawPayload }) {
  const { rows } = await query(
    `INSERT INTO payments (payment_order_id, razorpay_payment_id, status, raw_payload)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (razorpay_payment_id) DO NOTHING
     RETURNING *`,
    [paymentOrderId, razorpayPaymentId, status, rawPayload ? JSON.stringify(rawPayload) : null]
  );
  return rows[0];
}

async function findPaymentByRazorpayId(razorpayPaymentId) {
  const { rows } = await query(
    `SELECT * FROM payments WHERE razorpay_payment_id = $1 LIMIT 1`,
    [razorpayPaymentId]
  );
  return rows[0] ?? null;
}

async function upsertUserFromPayment({ email, fullName, phone, college }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) throw new Error("Email is required");

  const safeName = (fullName || "").trim() || null;
  const safePhone = (phone || "").trim() || null;
  const safeCollege = (college || "").trim() || null;

  const existingResult = await query(
    `SELECT id FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`,
    [normalizedEmail]
  );
  const existingRow = existingResult?.rows?.[0];
  if (existingRow) {
    try {
      await query(
        `UPDATE users SET full_name = COALESCE($2, full_name),
         phone = COALESCE($3, phone),
         college = COALESCE($4, college),
         updated_at = now()
         WHERE id = $1`,
        [existingRow.id, safeName, safePhone, safeCollege]
      );
    } catch (err) {
      if (err.code === "23505" && (err.constraint === "users_phone_uq" || (err.constraint && String(err.constraint).includes("phone")))) {
        await query(
          `UPDATE users SET full_name = COALESCE($2, full_name),
           phone = NULL,
           college = COALESCE($3, college),
           updated_at = now()
           WHERE id = $1`,
          [existingRow.id, safeName, safeCollege]
        );
      } else {
        throw err;
      }
    }
    return existingRow.id;
  }

  function doInsert(usePhone) {
    return query(
      `INSERT INTO users (email, full_name, phone, college)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [normalizedEmail, safeName, usePhone ? safePhone : null, safeCollege]
    );
  }

  try {
    const { rows } = await doInsert(true);
    return rows[0]?.id;
  } catch (err) {
    if (err.code === "23505") {
      const c = String(err.constraint || "");
      if (c.includes("phone") || c === "users_phone_uq") {
        const { rows } = await doInsert(false);
        return rows[0]?.id;
      }
      if (c.includes("email") || c === "users_email_uq" || c === "users_email_key") {
        const retry = await query(`SELECT id FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`, [normalizedEmail]);
        const row = retry?.rows?.[0];
        if (row) return row.id;
      }
    }
    throw err;
  }
}

async function ensureEnrollment({ userId, tenantId, itemType, itemId }) {
  const { rows } = await query(
    `INSERT INTO enrollments (user_id, tenant_id, item_type, item_id, active)
     VALUES ($1, $2, $3, $4, true)
     ON CONFLICT (user_id, item_type, item_id) DO UPDATE SET active = true
     RETURNING *`,
    [userId, tenantId, itemType, itemId]
  );
  return rows[0];
}

module.exports = {
  getCoursePrice,
  getPackPrice,
  createPaymentOrder,
  findByRazorpayOrderId,
  findByLocalId,
  markOrderPaid,
  createPaymentRecord,
  findPaymentByRazorpayId,
  upsertUserFromPayment,
  ensureEnrollment,
};
