// apps/api/src/modules/auth/auth.email.service.js
// Uses Resend for OTP emails. Set RESEND_API_KEY and RESEND_FROM (verified domain) in .env
const { Resend } = require("resend");

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resendFrom = process.env.RESEND_FROM?.trim() || "ExpoGraph <onboarding@resend.dev>";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const htmlTemplate = (otpCode, appName, { heading, description } = {}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading || "Your Login Code"}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;background:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td style="background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
        <span style="font-size:24px;font-weight:700;color:#fff;">${appName}</span>
      </td>
    </tr>
    <tr>
      <td style="background:#fff;border-radius:0 0 16px 16px;padding:40px 32px;box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);">
        <h1 style="margin:0 0 8px;font-size:22px;color:#0f172a;">${heading || "Your login code"}</h1>
        <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
          ${description || "Use the code below to sign in. It expires in 10 minutes."}
        </p>
        <div style="background:#f1f5f9;border-radius:12px;padding:20px;text-align:center;letter-spacing:8px;font-size:28px;font-weight:700;color:#0f172a;border:2px dashed #cbd5e1;">
          ${otpCode}
        </div>
        <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

async function sendOtpEmail({ to, otpCode, appName = "ExpoGraph", subject, heading, description }) {
  const effectiveSubject = subject || `Your ${appName} login code`;

  const logOtpToConsole = () => {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 OTP for ${to}: ${otpCode}`);
    console.log(`   (${effectiveSubject}. Valid for 10 minutes.)`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  };

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: resendFrom,
        to,
        subject: effectiveSubject,
        html: htmlTemplate(otpCode, appName, { heading, description }),
      });
      if (error) {
        console.error("[Resend] OTP email failed:", JSON.stringify(error, null, 2));
        // In development: fallback to console so you can test the flow
        if (process.env.NODE_ENV === "development") {
          console.warn("[Resend] Falling back to console OTP (Resend failed). Fix: use a verified domain or send to your Resend sign-up email when using onboarding@resend.dev");
          logOtpToConsole();
          return;
        }
        throw new Error(error.message || "Failed to send OTP email. Please try again.");
      }
    } catch (err) {
      console.error("[Resend] OTP email error:", err?.message || err);
      if (process.env.NODE_ENV === "development") {
        console.warn("[Resend] Falling back to console OTP.");
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
