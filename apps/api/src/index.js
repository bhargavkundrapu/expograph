// apps/api/src/index.js
const { env } = require("./config/env");
const { createApp } = require("./server/createApp");

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`✅ ExpoGraph API running on port ${env.PORT} (${env.NODE_ENV})`);
});
