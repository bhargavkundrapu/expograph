// apps/api/src/modules/auth/otpEmailTemplates.js
//
// OTP-first transactional emails improve inbox placement. This template keeps
// transactional content intact while improving visual clarity and brand visibility.

const APP_NAME = "ExpoGraph";
const VALIDITY_LINE = "Valid for 5 minutes.";
const BRAND_URL = "https://expograph.in";
// Flatten logo onto black to avoid client-specific transparent PNG rendering issues.
const BRAND_MARK_RENDER_URL = "https://res.cloudinary.com/da2wrgabu/image/upload/b_black,c_fill,f_png,h_72,w_72/v1772280495/e_x_1_m5jb9s.png";

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
    "",
    `Website: ${BRAND_URL}`,
  ].join("\n");

  const preheader = isVerify
    ? "Your ExpoGraph verification code is inside."
    : `Your ${appName} login code is inside.`;

  // Version A (safe branded transactional): stronger hierarchy, same OTP semantics.
  // No promotional copy, no sales CTA, and only optional verify link.
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preheader}
  </div>
  <div style="max-width:560px;margin:0 auto;padding:24px 12px;">
    <div style="background:#0f0f12;border:1px solid rgba(168,85,247,0.28);border-radius:16px;overflow:hidden;box-shadow:0 10px 34px rgba(124,58,237,0.24);">
      <div style="padding:20px 22px;background:linear-gradient(135deg,#4c1d95,#7e22ce 55%,#a21caf);">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="width:44px;vertical-align:middle;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                <tr>
                  <td
                    width="36"
                    height="36"
                    bgcolor="#000000"
                    style="width:36px;height:36px;background:#000000;border-radius:10px;overflow:hidden;line-height:0;font-size:0;"
                  >
                    <img
                      src="${BRAND_MARK_RENDER_URL}"
                      width="36"
                      height="36"
                      alt="ExpoGraph logo"
                      style="display:block;width:36px;height:36px;border:0;outline:none;text-decoration:none;background:#000000;"
                    >
                  </td>
                </tr>
              </table>
            </td>
            <td style="vertical-align:middle;">
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:0.2px;">${appName}</p>
              <p style="margin:2px 0 0;font-size:12px;color:#f3e8ff;">Secure one-time password</p>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding:22px;">
        <p style="margin:0 0 10px;font-size:15px;color:#f8fafc;line-height:1.6;">${primaryLine}</p>
        <div style="margin:14px 0 16px;padding:14px;border:1px dashed rgba(216,180,254,0.55);border-radius:12px;background:linear-gradient(180deg,rgba(167,139,250,0.14),rgba(139,92,246,0.08));text-align:center;">
          <div style="font-size:12px;color:#ddd6fe;margin-bottom:6px;text-transform:uppercase;letter-spacing:1.1px;">One-time password</div>
          <div style="font-size:32px;line-height:1;font-weight:800;letter-spacing:8px;color:#ffffff;">${otpCode}</div>
        </div>
        <p style="margin:0 0 12px;font-size:13px;color:#c4b5fd;">${VALIDITY_LINE}</p>
        <p style="margin:0;font-size:12px;color:#a1a1aa;">${ignoreLine}</p>
        ${
          fallbackLink && isVerify
            ? `<p style="margin:14px 0 0;font-size:12px;color:#c4b5fd;">Can't enter code? <a href="${fallbackLink}" style="color:#e879f9;text-decoration:underline;">Verify via secure link</a></p>`
            : ""
        }
      </div>
    </div>
    <p style="margin:12px 6px 0;font-size:11px;color:#a1a1aa;text-align:center;">
      This is an automated security email from ${appName}.
    </p>
    <p style="margin:4px 6px 0;font-size:11px;text-align:center;">
      <a href="${BRAND_URL}" style="color:#ddd6fe;text-decoration:underline;">expograph.in</a>
    </p>
  </div>
</body>
</html>`.trim();

  return { subject, html, text };
}

module.exports = { buildOtpEmail, VALIDITY_LINE };
