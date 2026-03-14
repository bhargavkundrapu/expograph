// apps/api/src/modules/auth/otpEmailTemplates.js
//
// OTP-first transactional emails improve inbox placement: plain content, minimal HTML,
// no marketing language or large buttons. Both verify and login use the same structure
// so providers treat them consistently as transactional (not promotional).

const APP_NAME = "ExpoGraph";
const VALIDITY_LINE = "Valid for 5 minutes.";

/**
 * @param {string} otpCode - 6-digit OTP
 * @param {"verify"|"login"} purpose
 * @param {string} [appName]
 * @param {string} [fallbackLink] - optional link (verify only); must match sending domain for deliverability
 * @returns {{ subject: string, html: string, text: string }}
 */
function buildOtpEmail(otpCode, purpose, appName = APP_NAME, fallbackLink = null) {
  const isVerify = purpose === "verify";
  const subject = isVerify
    ? "Your ExpoGraph verification code"
    : `Your ${appName} login code`;

  const primaryLine = isVerify
    ? `Your verification code is: ${otpCode}`
    : `Your login code is: ${otpCode}`;

  const ignoreLine = "If you didn't request this, ignore this email.";
  const fallbackBlock =
    fallbackLink && isVerify
      ? `\n\nOr use this link to verify: ${fallbackLink}`
      : "";

  const text = [
    appName,
    "",
    primaryLine,
    VALIDITY_LINE,
    "",
    ignoreLine + fallbackBlock,
  ].join("\n");

  // Minimal HTML: no large buttons or images; keeps deliverability aligned with login OTP.
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
  <div style="max-width:480px;margin:0 auto;padding:24px;">
    <p style="margin:0 0 8px;font-size:14px;color:#0f172a;font-weight:600;">${appName}</p>
    <p style="margin:0 0 16px;font-size:15px;color:#0f172a;">${primaryLine}</p>
    <p style="margin:0 0 16px;font-size:13px;color:#64748b;">${VALIDITY_LINE}</p>
    <p style="margin:0;font-size:12px;color:#94a3b8;">${ignoreLine}</p>
    ${fallbackLink && isVerify ? `<p style="margin:16px 0 0;font-size:12px;"><a href="${fallbackLink}" style="color:#6366f1;">Verify via link</a></p>` : ""}
  </div>
</body>
</html>`.trim();

  return { subject, html, text };
}

module.exports = { buildOtpEmail, VALIDITY_LINE };
