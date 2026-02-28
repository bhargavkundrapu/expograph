// apps/api/src/index.js
const { env } = require("./config/env");
const { createApp } = require("./server/createApp");
const { startAutoApprovalPoller } = require("./modules/payments/payments.service");

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`✅ ExpoGraph API running on port ${env.PORT} (${env.NODE_ENV})`);
  startAutoApprovalPoller();
});
