/**
 * Purchase receipt / tax-style invoice email after successful Razorpay capture.
 * Sends once per `payments` row (idempotent with INSERT .. ON CONFLICT on razorpay_payment_id).
 *
 * Includes HTML + plain text body and a PDF attachment (A4) unless INVOICE_DISABLE_PDF=true.
 * Requires: RESEND_API_KEY, RESEND_FROM, optional RESEND_REPLY_TO.
 */
const { Resend } = require("resend");
const { env } = require("../../config/env");
const paymentsRepo = require("./payments.repo");
const { getPurchaseInvoiceContext, stableInvoiceNo } = require("./paymentInvoice.context");
const { buildPurchaseInvoicePdfBuffer } = require("./paymentInvoice.pdf");

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resendFrom = process.env.RESEND_FROM?.trim() || "ExpoGraph <onboarding@resend.dev>";
const resendReplyTo = process.env.RESEND_REPLY_TO?.trim() || null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DISABLE_PDF = process.env.INVOICE_DISABLE_PDF === "true";

const TRANSACTIONAL_HEADERS = {
  Precedence: "auto",
  "Auto-Submitted": "auto-generated",
  "X-Auto-Response-Suppress": "OOF, AutoReply",
};

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInvoiceEmailHtml(ctx) {
  const rows = [
    ["Item", ctx.itemLabel],
    ["Type", ctx.itemTypeLabel],
    ["Course / pack amount", ctx.baseFormatted],
    ["Platform & payment processing", ctx.feeFormatted],
    ["Total paid", ctx.totalFormatted],
    ["Razorpay order ID", ctx.razorpayOrderId],
    ["Razorpay payment ID", ctx.razorpayPaymentId],
    ["Date", ctx.paidAtIso],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;width:38%;">${escapeHtml(k)}</td>` +
        `<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const sellerBits = [
    escapeHtml(ctx.sellerLegalName),
    ctx.sellerAddress && escapeHtml(ctx.sellerAddress).replace(/\n/g, "<br/>"),
    ctx.sellerGstin && `GSTIN: ${escapeHtml(ctx.sellerGstin)}`,
  ]
    .filter(Boolean)
    .join("<br/>");

  const supportLine = ctx.supportEmail
    ? `<p style="margin:20px 0 0;font-size:13px;color:#64748b;">Questions? Reply to this email or write to <a href="mailto:${escapeHtml(ctx.supportEmail)}" style="color:#4f46e5;">${escapeHtml(ctx.supportEmail)}</a>.</p>`
    : `<p style="margin:20px 0 0;font-size:13px;color:#64748b;">Thank you for learning with ExpoGraph.</p>`;

  const pdfNote = DISABLE_PDF
    ? ""
    : `<p style="margin:0 0 16px;font-size:13px;color:#334155;background:#f1f5f9;border-radius:8px;padding:12px 14px;border:1px solid #e2e8f0;"><strong>PDF attached</strong> — same details as below for your records.</p>`;

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr><td style="padding:24px 28px;background:linear-gradient(135deg,#1e1b4b 0%,#312e81 100%);color:#fff;">
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">Payment receipt</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px;">ExpoGraph Academy</div>
          <div style="font-size:14px;margin-top:8px;opacity:0.95;">Invoice no. <strong>${escapeHtml(ctx.invoiceNo)}</strong></div>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 8px;font-size:15px;color:#0f172a;">Hi ${escapeHtml(ctx.customerName || "there")},</p>
          <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.55;">Your payment was successful. Below is your receipt for your records.</p>
          ${pdfNote}
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
            ${tableRows}
          </table>
          <p style="margin:18px 0 0;font-size:12px;color:#94a3b8;line-height:1.5;">${sellerBits}</p>
          ${supportLine}
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Access your courses: <a href="${escapeHtml(ctx.publicWebUrl)}/login" style="color:#4f46e5;">${escapeHtml(ctx.publicWebUrl)}/login</a></p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;">This email was sent to ${escapeHtml(ctx.customerEmail)} because a purchase was completed on ExpoGraph.</p>
    </td></tr>
  </table></body></html>`;
}

function buildInvoiceEmailText(ctx) {
  const lines = [
    `ExpoGraph Academy — Payment receipt`,
    `Invoice no.: ${ctx.invoiceNo}`,
    ``,
    `Hi ${ctx.customerName || "there"},`,
    ``,
    `Your payment was successful.`,
    DISABLE_PDF ? `` : `A PDF invoice is attached to this email.`,
    ``,
    `Item: ${ctx.itemLabel}`,
    `Type: ${ctx.itemTypeLabel}`,
    `Course / pack amount: ${ctx.baseFormatted}`,
    `Platform & payment processing: ${ctx.feeFormatted}`,
    `Total paid: ${ctx.totalFormatted}`,
    ``,
    `Razorpay order ID: ${ctx.razorpayOrderId}`,
    `Razorpay payment ID: ${ctx.razorpayPaymentId}`,
    `Date: ${ctx.paidAtIso}`,
    ``,
    ctx.sellerLegalName,
    ctx.sellerAddress,
    ctx.sellerGstin && `GSTIN: ${ctx.sellerGstin}`,
    ``,
    `Login: ${ctx.publicWebUrl}/login`,
    ctx.supportEmail && `Support: ${ctx.supportEmail}`,
    ``,
    `Sent to ${ctx.customerEmail}`,
  ].filter((line) => line !== "");
  return lines.join("\n");
}

function safePdfFileName(invoiceNo) {
  return `${String(invoiceNo).replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;
}

/**
 * @param {{ order: object, payment: object, razorpayPaymentId: string }} params
 */
async function sendPurchaseInvoice({ order, payment, razorpayPaymentId }) {
  const ctx = await getPurchaseInvoiceContext(order, payment, razorpayPaymentId);
  if (!ctx.to) {
    console.warn("[InvoiceEmail] skip: no customer email on order", order.id);
    return;
  }

  const subject = `Receipt ${ctx.invoiceNo} · ExpoGraph Academy — ${ctx.itemLabel}`;
  const html = buildInvoiceEmailHtml(ctx);
  const text = buildInvoiceEmailText(ctx);

  if (!resend) {
    console.warn("[InvoiceEmail] RESEND_API_KEY not set — receipt not emailed. Invoice:", ctx.invoiceNo, "to:", ctx.to);
    await paymentsRepo.markPaymentInvoiceError(payment.id, "RESEND_API_KEY not configured");
    return;
  }

  const attachments = [];
  if (!DISABLE_PDF) {
    try {
      const pdfBuffer = await buildPurchaseInvoicePdfBuffer(ctx);
      attachments.push({
        filename: safePdfFileName(ctx.invoiceNo),
        content: pdfBuffer.toString("base64"),
        contentType: "application/pdf",
      });
    } catch (pdfErr) {
      console.error("[InvoiceEmail] PDF build failed (sending email without attachment):", pdfErr?.message || pdfErr);
    }
  }

  const opts = {
    from: resendFrom,
    to: ctx.to,
    subject,
    headers: {
      ...TRANSACTIONAL_HEADERS,
      "X-Invoice-No": ctx.invoiceNo.slice(0, 80),
    },
  };
  if (resendReplyTo) opts.replyTo = resendReplyTo;

  opts.html = html;
  opts.text = text;
  if (attachments.length) opts.attachments = attachments;

  const { data, error } = await resend.emails.send(opts);
  if (error) {
    const msg = error.message || JSON.stringify(error);
    await paymentsRepo.markPaymentInvoiceError(payment.id, msg);
    throw new Error(msg);
  }

  await paymentsRepo.markPaymentInvoiceSent(payment.id);
  if (process.env.NODE_ENV === "development") {
    console.log("[InvoiceEmail] sent", ctx.invoiceNo, "to", ctx.to, "id", data?.id, attachments.length ? "+ PDF" : "");
  }
}

/** Safe for fire-and-forget: logs errors, never throws. */
async function sendPurchaseInvoiceSafe(params) {
  try {
    await sendPurchaseInvoice(params);
  } catch (err) {
    console.error("[InvoiceEmail] failed:", err?.message || err);
  }
}

module.exports = {
  sendPurchaseInvoice,
  sendPurchaseInvoiceSafe,
  stableInvoiceNo,
};
