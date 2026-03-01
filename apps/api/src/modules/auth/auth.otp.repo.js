// apps/api/src/modules/auth/auth.otp.repo.js
const crypto = require("crypto");
const { query } = require("../../db/query");

const OTP_EXPIRY_MINUTES = 10;

function generateOtpCode() {
  return String(crypto.randomInt(100000, 999999));
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

const MAX_OTP_ATTEMPTS = 5;
const otpAttemptTracker = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of otpAttemptTracker) {
    if (now - entry.firstAttempt > OTP_EXPIRY_MINUTES * 60 * 1000) otpAttemptTracker.delete(key);
  }
}, 5 * 60 * 1000);

async function verifyOtp(email, otpCode) {
  const normalizedEmail = email.trim().toLowerCase();
  const code = String(otpCode || "").trim();

  const tracker = otpAttemptTracker.get(normalizedEmail) || { count: 0, firstAttempt: Date.now() };
  if (tracker.count >= MAX_OTP_ATTEMPTS) {
    await query(`DELETE FROM login_otps WHERE lower(email) = $1`, [normalizedEmail]);
    otpAttemptTracker.delete(normalizedEmail);
    return { valid: false, locked: true };
  }

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

  if (row.otp_code !== code) {
    tracker.count += 1;
    otpAttemptTracker.set(normalizedEmail, tracker);
    return { valid: false, attemptsLeft: MAX_OTP_ATTEMPTS - tracker.count };
  }

  if (new Date() > new Date(row.expires_at)) return { valid: false };

  await query(`DELETE FROM login_otps WHERE id = $1`, [row.id]);
  otpAttemptTracker.delete(normalizedEmail);

  return { valid: true };
}

async function purgeOtpsForEmail(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) return;
  await query(`DELETE FROM login_otps WHERE lower(email) = $1`, [normalizedEmail]);
}

module.exports = { createOtp, verifyOtp, purgeOtpsForEmail, OTP_EXPIRY_MINUTES };
