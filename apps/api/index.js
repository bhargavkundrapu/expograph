require("./instrument.js");


const Sentry = require("@sentry/node");


Sentry.init({ dsn: process.env.SENTRY_DSN });
const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.get("/debug-sentry", (req, res) => {
  throw new Error("Sentry backend test");
});
const Sentry = require("@sentry/node");

// after ALL routes:
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("API running on port:", PORT);
});
