// apps/api/src/modules/auth/verificationOtp.repo.js
// Verification OTP: hashed storage, 5 min expiry, rate limiting and attempt limits (same as login).
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { query } = require("../../db/query");

const OTP_EXPIRY_MINUTES = 5;
const SALT_ROUNDS = 10;

function generateOtpCode() {
  return String(crypto.randomInt(100000, 999999));
}

async function hashOtp(otpCode) {
  return bcrypt.hash(otpCode, SALT_ROUNDS);
}

async function createVerificationOtp(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const otpCode = generateOtpCode();
  const otpHash = await hashOtp(otpCode);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await query(
    `DELETE FROM verification_otps WHERE lower(email) = $1`,
    [normalizedEmail]
  );

  await query(
    `INSERT INTO verification_otps (email, otp_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [normalizedEmail, otpHash, expiresAt]
  );

  return { otpCode, expiresAt };
}

const MAX_VERIFY_ATTEMPTS = 5;
const attemptTracker = new Map();

setInterval(() => {
  const now = Date.now();
  const window = OTP_EXPIRY_MINUTES * 60 * 1000;
  for (const [key, entry] of attemptTracker) {
    if (now - entry.firstAttempt > window) attemptTracker.delete(key);
  }
}, 5 * 60 * 1000);

async function verifyVerificationOtp(email, otpCode) {
  const normalizedEmail = email.trim().toLowerCase();
  const code = String(otpCode || "").trim();
  if (!code || code.length !== 6) return { valid: false };

  const tracker = attemptTracker.get(normalizedEmail) || { count: 0, firstAttempt: Date.now() };
  if (tracker.count >= MAX_VERIFY_ATTEMPTS) {
    await query(`DELETE FROM verification_otps WHERE lower(email) = $1`, [normalizedEmail]);
    attemptTracker.delete(normalizedEmail);
    return { valid: false, locked: true };
  }

  const { rows } = await query(
    `SELECT id, email, otp_hash, expires_at
     FROM verification_otps
     WHERE lower(email) = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [normalizedEmail]
  );

  const row = rows[0];
  if (!row) return { valid: false };

  if (new Date() > new Date(row.expires_at)) {
    await query(`DELETE FROM verification_otps WHERE id = $1`, [row.id]);
    return { valid: false };
  }

  const match = await bcrypt.compare(code, row.otp_hash);
  if (!match) {
    tracker.count += 1;
    attemptTracker.set(normalizedEmail, tracker);
    return { valid: false, attemptsLeft: MAX_VERIFY_ATTEMPTS - tracker.count };
  }

  await query(`DELETE FROM verification_otps WHERE id = $1`, [row.id]);
  attemptTracker.delete(normalizedEmail);
  return { valid: true };
}

module.exports = {
  createVerificationOtp,
  verifyVerificationOtp,
  OTP_EXPIRY_MINUTES,
};
