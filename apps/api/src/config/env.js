// apps/api/src/config/env.js
require("dotenv").config();

function must(name, fallback = undefined) {
  const raw = process.env[name] ?? fallback;
  const val = typeof raw === "string" ? raw.trim() : raw;
  if (val === undefined || val === "") {
    throw new Error(`Missing required env: ${name}`);
  }
  return val;
}


const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),

  DATABASE_URL: (() => {
    let url = process.env.DATABASE_URL;
    if (!url || url.trim() === "" || url.includes("your_database_url") || url.includes("username:password") || url.includes("localhost:5432/database_name")) {
      console.error("\n\n🚨 ERROR: DATABASE_URL is missing or contains placeholder values!");
      console.error("Please create apps/api/.env file with a valid PostgreSQL connection string.");
      console.error("Example: DATABASE_URL=postgresql://username:password@localhost:5432/expograph\n\n");
      throw new Error("DATABASE_URL is missing or invalid. Please update apps/api/.env file.");
    }
    url = url.trim();
    // Strip channel_binding - can cause ECONNRESET with pg over Neon
    if (url.includes("channel_binding")) {
      url = url.replace(/[?&]channel_binding=[^&]*/g, "").replace(/\?&/, "?");
    }
    return url;
  })(),

  JWT_SECRET: (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.trim() === "" || secret.includes("your-secret-key") || secret.includes("change-this")) {
      console.error("\n\n🚨 ERROR: JWT_SECRET is missing or contains placeholder values!");
      console.error("Please create apps/api/.env file with a secure JWT_SECRET.");
      console.error("Generate one using: openssl rand -base64 32\n\n");
      throw new Error("JWT_SECRET is missing or invalid. Please update apps/api/.env file.");
    }
    return secret.trim();
  })(),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",

  CORS_ORIGINS: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  DEFAULT_TENANT_SLUG: (process.env.DEFAULT_TENANT_SLUG ?? "expograph").trim(),

  RESUME_PDF_SERVICE_URL: (process.env.RESUME_PDF_SERVICE_URL ?? "http://localhost:8080").trim(),
  RESUME_PDF_TIMEOUT_MS: Number(process.env.RESUME_PDF_TIMEOUT_MS ?? 15000),
  RESUME_PDF_MAX_CONCURRENCY: Number(process.env.RESUME_PDF_MAX_CONCURRENCY ?? 4),

  RAZORPAY_KEY_ID: (process.env.RAZORPAY_KEY_ID ?? "").trim(),
  RAZORPAY_KEY_SECRET: (process.env.RAZORPAY_KEY_SECRET ?? "").trim(),
  RAZORPAY_WEBHOOK_SECRET: (process.env.RAZORPAY_WEBHOOK_SECRET ?? "").trim(),
  PUBLIC_WEB_URL: (process.env.PUBLIC_WEB_URL ?? "http://localhost:5173").trim(),
  PUBLIC_API_URL: (process.env.PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000").trim().replace(/\/$/, ""),
};

module.exports = { env };
