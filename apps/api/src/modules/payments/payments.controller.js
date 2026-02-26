// apps/api/src/modules/payments/payments.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const paymentsService = require("./payments.service");

const getPriceBreakdown = asyncHandler(async (req, res) => {
  const { item_type, item_id } = req.query;
  const data = await paymentsService.getPriceBreakdown({
    tenant: req.tenant,
    item_type,
    item_id,
  });
  res.status(200).json({ ok: true, data });
});

const createOrder = asyncHandler(async (req, res) => {
  const data = await paymentsService.createOrder({ tenant: req.tenant, body: req.body });
  console.log(`[Payments] Order created: ${data.local_order_id} razorpay=${data.razorpay_order_id}`);
  res.status(200).json({ ok: true, data });
});

const callback = asyncHandler(async (req, res) => {
  const razorpay_payment_id = req.body?.razorpay_payment_id || req.query?.razorpay_payment_id;
  const razorpay_order_id = req.body?.razorpay_order_id || req.query?.razorpay_order_id;
  const razorpay_signature = req.body?.razorpay_signature || req.query?.razorpay_signature;

  let redirectUrl;
  try {
    const result = await paymentsService.handleCallback({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    const { env } = require("../config/env");
    redirectUrl = result.redirect || (result.unlocked ? `${env.PUBLIC_WEB_URL}/lms/student/courses` : `${env.PUBLIC_WEB_URL}/account-pending`);
    console.log(`[Payments] Callback success`);
  } catch (err) {
    console.error("[Payments] Callback error:", err.message, err.stack);
    const { env } = require("../config/env");
    redirectUrl = `${env.PUBLIC_WEB_URL}/account-pending`;
  }
  res.redirect(302, redirectUrl);
});

const verifyComplete = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const razorpay_payment_id = body.razorpay_payment_id ?? body.razorpayPaymentId;
  const razorpay_order_id = body.razorpay_order_id ?? body.razorpayOrderId;
  const razorpay_signature = body.razorpay_signature ?? body.razorpaySignature;

  console.log(`[Payments] verify-complete received`, {
    hasPaymentId: !!razorpay_payment_id,
    hasOrderId: !!razorpay_order_id,
    hasSignature: !!razorpay_signature,
  });

  const result = await paymentsService.handleCallback({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  });
  console.log(`[Payments] Verify-complete success`, result.unlocked ? "unlocked" : "redirect");
  res.json({ ok: true, redirect: result.redirect, unlocked: result.unlocked });
});

const webhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const rawBody = req.rawBody || (req.body && Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body || {}));

  await paymentsService.handleWebhook({ rawBody, signature });
  console.log(`[Payments] Webhook processed: ${req.body?.event}`);
  res.status(200).json({ ok: true });
});

module.exports = { createOrder, getPriceBreakdown, callback, verifyComplete, webhook };
