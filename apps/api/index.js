
const Sentry = require("@sentry/node");






const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
Sentry.init({ dsn: process.env.SENTRY_DSN });
app.get("/debug-sentry", (req, res) => {
  throw new Error("Sentry backend test");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("API running on port:", PORT);
});
