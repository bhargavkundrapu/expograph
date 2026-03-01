// apps/api/src/modules/payments/payments.service.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { env } = require("../../config/env");
const { HttpError } = require("../../utils/httpError");
const { z } = require("zod");
const paymentsRepo = require("./payments.repo");
const approvalsRepo = require("../approvals/approvals.repo");
const approvalsService = require("../approvals/approvals.service");
const { findRoleIdForTenant, upsertMembership } = require("../users/users.repo");
const { query } = require("../../db/query");

const CreateOrderSchema = z.object({
  item_type: z.enum(["course", "pack"]),
  item_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  college: z.string().max(200).optional(),
  origin: z.string().max(500).optional(),
});

function getRazorpayInstance() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new HttpError(
      503,
      "Payment service not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to apps/api/.env"
    );
  }
  return new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });
}

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(expected, "utf8"));
}

function verifyWebhookSignature(body, signature) {
  if (!env.RAZORPAY_WEBHOOK_SECRET) return false;
  const expected = crypto.createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(expected, "utf8"));
}

async function getPriceBreakdown({ tenant, item_type, item_id }) {
  const tenantId = tenant.id;
  let baseAmount;
  if (item_type === "course") {
    const course = await paymentsRepo.getCoursePrice({ tenantId, courseId: item_id });
    if (!course) throw new HttpError(404, "Course not found or not published");
    baseAmount = Number(course.price_in_paise);
  } else if (item_type === "pack") {
    const pack = await paymentsRepo.getPackPrice({ tenantId, packId: item_id });
    if (!pack) throw new HttpError(404, "Course pack not found or not published");
    baseAmount = Number(pack.price_in_paise);
  } else {
    throw new HttpError(400, "Invalid item_type");
  }
  if (!baseAmount || baseAmount < 100) {
    throw new HttpError(400, "Invalid price");
  }
  const platformFeePercent = Number(process.env.PLATFORM_FEE_PERCENT) || 7;
  const platformFeePaise = Math.round(baseAmount * (platformFeePercent / 100));
  const totalAmount = baseAmount + platformFeePaise;
  return {
    base_amount: baseAmount,
    platform_fee_percent: platformFeePercent,
    platform_fee: platformFeePaise,
    total_amount: totalAmount,
    currency: "INR",
  };
}

async function createOrder({ tenant, body }) {
  const parsed = CreateOrderSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const { item_type, item_id, name, email, phone, college, origin } = parsed.data;
  const tenantId = tenant.id;
  const redirectOrigin = (origin || "").trim() && /^https?:\/\//i.test(origin) ? origin.replace(/\/$/, "") : null;

  let amount;
  if (item_type === "course") {
    const course = await paymentsRepo.getCoursePrice({ tenantId, courseId: item_id });
    if (!course) throw new HttpError(404, "Course not found or not published");
    amount = Number(course.price_in_paise);
  } else if (item_type === "pack") {
    const pack = await paymentsRepo.getPackPrice({ tenantId, packId: item_id });
    if (!pack) throw new HttpError(404, "Course pack not found or not published");
    amount = Number(pack.price_in_paise);
  }

  if (!amount || amount < 100) {
    throw new HttpError(400, "Invalid price. Minimum amount is ₹1.00");
  }

  // Platform fee: 7% added to checkout amount
  const platformFeePercent = Number(process.env.PLATFORM_FEE_PERCENT) || 7;
  const platformFeePaise = Math.round(amount * (platformFeePercent / 100));
  const amountWithFee = amount + platformFeePaise;

  const rzp = getRazorpayInstance();
  const razorpayOrder = await rzp.orders.create({
    amount: amountWithFee,
    currency: "INR",
    receipt: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    notes: { item_type, item_id, college: college || "" },
  });

  const localOrder = await paymentsRepo.createPaymentOrder({
    tenantId,
    itemType: item_type,
    itemId: item_id,
    amount: amountWithFee,
    currency: "INR",
    razorpayOrderId: razorpayOrder.id,
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    customerCollege: college,
    redirectOrigin,
  });

  return {
    key_id: env.RAZORPAY_KEY_ID,
    razorpay_order_id: razorpayOrder.id,
    amount: amountWithFee,
    currency: "INR",
    local_order_id: localOrder.id,
    callback_url: `${env.PUBLIC_API_URL}/api/v1/payments/razorpay/callback`,
    login_url: `${env.PUBLIC_WEB_URL}/login`,
    pending_url: `${env.PUBLIC_WEB_URL}/account-pending`,
  };
}

async function handleCallback({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) {
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    console.error("[Payment] handleCallback missing params", { razorpay_payment_id: !!razorpay_payment_id, razorpay_order_id: !!razorpay_order_id, razorpay_signature: !!razorpay_signature });
    throw new HttpError(400, "Missing payment verification parameters");
  }

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    console.error("[Payment] Invalid Razorpay signature");
    throw new HttpError(400, "Invalid payment signature");
  }

  const order = await paymentsRepo.findByRazorpayOrderId(razorpay_order_id);
  if (!order) {
    console.error("[Payment] Order not found for razorpay_order_id:", razorpay_order_id);
    throw new HttpError(404, "Order not found");
  }

  if (order.status !== "created" && order.status !== "paid") {
    throw new HttpError(400, "Order is not in a valid state for confirmation");
  }

  // Mark as paid if not already (idempotent)
  if (order.status === "created") {
    await paymentsRepo.markOrderPaid(order.id);
  }

  // Create payment record (idempotent - ON CONFLICT DO NOTHING)
  await paymentsRepo.createPaymentRecord({
    paymentOrderId: order.id,
    razorpayPaymentId: razorpay_payment_id,
    status: "captured",
    rawPayload: null,
  });

  const normalizedEmail = String(order.customer_email || "").trim().toLowerCase();
  let existingUser = null;
  if (normalizedEmail) {
    const { rows } = await query(`SELECT id FROM users WHERE LOWER(email) = $1 AND is_active = true LIMIT 1`, [normalizedEmail]);
    existingUser = rows[0] ?? null;
  }

  const baseUrl = (order.redirect_origin || env.PUBLIC_WEB_URL).replace(/\/$/, "");

  if (existingUser) {
    // Existing student: update details from order, then unlock the course
    await paymentsRepo.upsertUserFromPayment({
      email: order.customer_email,
      fullName: order.customer_name,
      phone: order.customer_phone,
      college: order.customer_college,
    });
    const roleId = await findRoleIdForTenant({ tenantId: order.tenant_id, roleName: "Student" });
    if (roleId) {
      await upsertMembership({ tenantId: order.tenant_id, userId: existingUser.id, roleId });
    }
    await paymentsRepo.ensureEnrollment({
      userId: existingUser.id,
      tenantId: order.tenant_id,
      itemType: order.item_type,
      itemId: order.item_id,
    });
    console.log(`[Payment] Existing user ${existingUser.id} enrolled in ${order.item_type} ${order.item_id}`);
    return { unlocked: true, redirect: `${baseUrl}/lms/student/courses` };
  }

  // New user: create approval then auto-approve immediately
  const approval = await approvalsRepo.createApproval({
    tenantId: order.tenant_id,
    paymentOrderId: order.id,
    itemType: order.item_type,
    itemId: order.item_id,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    customerPhone: order.customer_phone,
    customerCollege: order.customer_college,
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
  });
  console.log(`[Payment] Approval created: ${approval.id} for ${order.customer_email}`);

  const autoApproved = await tryAutoApprove(approval.id, order.customer_email);
  if (autoApproved) {
    return { unlocked: true, redirect: `${baseUrl}/lms/student/courses` };
  }

  return {
    redirect: `${baseUrl}/account-pending?email=${encodeURIComponent(order.customer_email)}`,
    approvalId: approval.id,
  };
}

async function handleWebhook({ rawBody, signature }) {
  if (!verifyWebhookSignature(rawBody, signature)) {
    throw new HttpError(400, "Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;

  if (event === "order.paid" || event === "payment.captured") {
    const orderEntity = payload.payload?.order?.entity;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderId = orderEntity?.id || paymentEntity?.order_id;
    const paymentId = paymentEntity?.id;
    if (!orderId) return;

    const order = await paymentsRepo.findByRazorpayOrderId(orderId);
    if (!order || order.status === "paid") return;

    const updated = await paymentsRepo.markOrderPaid(order.id);
    if (updated && paymentId) {
      await paymentsRepo.createPaymentRecord({
        paymentOrderId: order.id,
        razorpayPaymentId: paymentId,
        status: "captured",
        rawPayload: payload,
      });
      const approval = await approvalsRepo.createApproval({
        tenantId: order.tenant_id,
        paymentOrderId: order.id,
        itemType: order.item_type,
        itemId: order.item_id,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        customerCollege: order.customer_college,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      });
      await tryAutoApprove(approval.id, order.customer_email);
    }
  }
}

async function tryAutoApprove(approvalId, email) {
  try {
    await approvalsService.approveById({ approvalId, approvedByUserId: null });
    console.log(`[AutoApproval] Approved ${approvalId} (${email})`);
    return true;
  } catch (err) {
    console.error(`[AutoApproval] Failed for ${approvalId} (${email}):`, err.message);
    return false;
  }
}

const AUTO_APPROVE_INTERVAL_MS = 60_000;
const MAX_AUTO_APPROVE_BATCH = 5;
let pollerRunning = false;

async function pollPendingApprovals() {
  if (pollerRunning) return;
  pollerRunning = true;
  try {
    const { rows: tenants } = await query(`SELECT id FROM tenants LIMIT 10`);
    for (const tenant of tenants) {
      const pending = await approvalsRepo.listByStatus({ tenantId: tenant.id, status: "pending" });
      let approved = 0;
      for (const approval of pending) {
        if (approved >= MAX_AUTO_APPROVE_BATCH) break;
        await tryAutoApprove(approval.id, approval.customer_email);
        approved++;
      }
    }
  } catch (err) {
    console.error("[AutoApproval] Poller error:", err.message);
  } finally {
    pollerRunning = false;
  }
}

let pollerInterval = null;
function startAutoApprovalPoller() {
  if (pollerInterval) return;
  pollerInterval = setInterval(pollPendingApprovals, AUTO_APPROVE_INTERVAL_MS);
  console.log(`[AutoApproval] Background poller started (every ${AUTO_APPROVE_INTERVAL_MS / 1000}s)`);
}

function stopAutoApprovalPoller() {
  if (pollerInterval) {
    clearInterval(pollerInterval);
    pollerInterval = null;
  }
}

module.exports = {
  createOrder,
  getPriceBreakdown,
  handleCallback,
  handleWebhook,
  verifyRazorpaySignature,
  verifyWebhookSignature,
  startAutoApprovalPoller,
  stopAutoApprovalPoller,
};
