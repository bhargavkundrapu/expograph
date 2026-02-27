// apps/api/src/modules/auth/auth.otp.repo.js
const { query } = require("../../db/query");

const OTP_EXPIRY_MINUTES = 10;

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function createOtp(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const otpCode = generateOtpCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Invalidate any existing OTPs for this email
  await query(
    `DELETE FROM login_otps WHERE lower(email) = $1`,
    [normalizedEmail]
  );

  await query(
    `INSERT INTO login_otps (email, otp_code, expires_at)
     VALUES ($1, $2, $3)`,
    [normalizedEmail, otpCode, expiresAt]
  );

  return { otpCode, expiresAt };
}

async function verifyOtp(email, otpCode) {
  const normalizedEmail = email.trim().toLowerCase();
  const code = String(otpCode || "").trim();

  const { rows } = await query(
    `SELECT id, email, otp_code, expires_at
     FROM login_otps
     WHERE lower(email) = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [normalizedEmail]
  );

  const row = rows[0];
  if (!row) return { valid: false };
  if (row.otp_code !== code) return { valid: false };
  if (new Date() > new Date(row.expires_at)) return { valid: false };

  // Invalidate after successful use
  await query(`DELETE FROM login_otps WHERE id = $1`, [row.id]);

  return { valid: true };
}

async function purgeOtpsForEmail(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) return;
  await query(`DELETE FROM login_otps WHERE lower(email) = $1`, [normalizedEmail]);
}

module.exports = { createOtp, verifyOtp, purgeOtpsForEmail, OTP_EXPIRY_MINUTES };
