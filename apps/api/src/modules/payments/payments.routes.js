// apps/api/src/modules/payments/payments.routes.js
const express = require("express");
const { paymentLimiter } = require("../../middlewares/rate-limit/rateLimiters");
const controller = require("./payments.controller");

const router = express.Router();

router.get("/price-breakdown", controller.getPriceBreakdown);
router.post("/verify-email/send", paymentLimiter, controller.sendEmailVerifyOtp);
router.post("/verify-email/confirm", paymentLimiter, controller.confirmEmailVerifyOtp);
router.post("/razorpay/create-order", paymentLimiter, controller.createOrder);
router.post("/razorpay/callback", express.urlencoded({ extended: true }), controller.callback);
router.get("/razorpay/callback", controller.callback);
router.post("/razorpay/verify-complete", controller.verifyComplete);
// Webhook is mounted directly in createApp (before express.json) for raw body access

module.exports = { router };
