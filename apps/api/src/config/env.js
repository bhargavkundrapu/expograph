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

  DATABASE_URL: must("DATABASE_URL"),

  JWT_SECRET: must("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",

  CORS_ORIGINS: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  DEFAULT_TENANT_SLUG: (process.env.DEFAULT_TENANT_SLUG ?? "expograph").trim(),

};

module.exports = { env };
