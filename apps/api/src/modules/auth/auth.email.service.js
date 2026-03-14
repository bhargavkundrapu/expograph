// apps/api/src/modules/auth/auth.email.service.js
//
// Shared OTP email sender for login and verification. Same FROM and plain transactional
// content for both so verification deliverability matches login (inbox placement).
//
// Why OTP-first improves inbox placement: Providers treat link/button-heavy "confirm your
// email" messages as promotional. Plain, code-first transactional emails (same style as
// login OTP) signal one-time use and reduce spam scoring. Same FROM + text/html + minimal
// HTML keeps reputation consistent.
const { Resend } = require("resend");
const { buildOtpEmail } = require("./otpEmailTemplates");

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resendFrom = process.env.RESEND_FROM?.trim() || "ExpoGraph <onboarding@resend.dev>";
const resendReplyTo = process.env.RESEND_REPLY_TO?.trim() || null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DISABLE_VERIFY_FALLBACK_LINK = process.env.DISABLE_VERIFY_FALLBACK_LINK === "true";
const PUBLIC_WEB_URL = (process.env.PUBLIC_WEB_URL || "http://localhost:5173").trim().replace(/\/$/, "");

const TRANSACTIONAL_HEADERS = {
  Precedence: "auto",
  "Auto-Submitted": "auto-generated",
  "X-Auto-Response-Suppress": "OOF, AutoReply",
};

function getFallbackVerifyLink() {
  if (DISABLE_VERIFY_FALLBACK_LINK) return null;
  const base = process.env.RESEND_VERIFY_LINK_BASE?.trim();
  if (base) return `${base.replace(/\/$/, "")}/verify`;
  const match = resendFrom.match(/@([^\s>]+)/);
  const domain = match ? match[1].toLowerCase() : null;
  if (!domain || domain === "resend.dev") return null;
  return `https://${domain}/verify`;
}

/**
 * Send OTP email (login or verification). Same FROM and template style for both.
 * @param {{ to: string, name?: string, otp: string, purpose: 'verify'|'login', appName?: string }} opts
 */
async function sendOtpEmail({ to, name, otp, purpose, appName = "ExpoGraph" }) {
  const fallbackLink = purpose === "verify" ? getFallbackVerifyLink() : null;
  const { subject, html, text } = buildOtpEmail(otp, purpose, appName, fallbackLink);

  if (process.env.NODE_ENV === "development") {
    console.log("[OTP email] from:", resendFrom, "reply_to:", resendReplyTo || "(none)");
    if (purpose === "verify" && fallbackLink) {
      console.log("[OTP email] fallback link domain:", new URL(fallbackLink).origin);
    }
  }

  const logOtpToConsole = () => {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 OTP for ${to}: ${otp} (${purpose})`);
    console.log(`   ${subject}. Valid for 5 minutes.`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  };

  if (resend) {
    try {
      const opts = {
        from: resendFrom,
        to,
        subject,
        html,
        text,
        headers: TRANSACTIONAL_HEADERS,
      };
      if (resendReplyTo) opts.reply_to = resendReplyTo;
      const { data, error } = await resend.emails.send(opts);
      if (error) {
        console.error("[Resend] OTP email failed:", JSON.stringify(error, null, 2));
        if (process.env.NODE_ENV === "development") {
          console.warn("[Resend] Falling back to console OTP.");
          logOtpToConsole();
          return;
        }
        throw new Error(error.message || "Failed to send OTP email. Please try again.");
      }
    } catch (err) {
      console.error("[Resend] OTP email error:", err?.message || err);
      if (process.env.NODE_ENV === "development") {
        logOtpToConsole();
        return;
      }
      throw new Error(err?.message || "Failed to send OTP email. Please try again.");
    }
  } else {
    logOtpToConsole();
    console.log("   Add RESEND_API_KEY to .env to send real emails via Resend.");
  }
}

module.exports = { sendOtpEmail };
