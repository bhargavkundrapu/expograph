// apps/api/src/index.js
const { env } = require("./config/env");
const { createApp } = require("./server/createApp");
const { startAutoApprovalPoller, stopAutoApprovalPoller } = require("./modules/payments/payments.service");
const { pool } = require("./db/pool");

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`ExpoGraph API running on port ${env.PORT} (${env.NODE_ENV})`);
  // IMPORTANT (Neon scale-to-zero):
  // The auto-approval poller queries Postgres on an interval even with zero users.
  // Only enable this when absolutely needed.
  if (process.env.ENABLE_AUTO_APPROVAL_POLLER === "true") {
    startAutoApprovalPoller();
  }
});

server.keepAliveTimeout = 65_000;
server.headersTimeout = 66_000;
server.timeout = 60_000;

function gracefulShutdown(signal) {
  console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
  stopAutoApprovalPoller();
  server.close(() => {
    console.log("   HTTP server closed.");
    pool.end().then(() => {
      console.log("   Database pool closed.");
      process.exit(0);
    }).catch(() => process.exit(1));
  });
  setTimeout(() => {
    console.error("   Forced shutdown after timeout.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
