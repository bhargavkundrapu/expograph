const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,   // takes from Render ENV
  environment: process.env.NODE_ENV || "development",
  // sendDefaultPii: true,  // keep OFF for now (privacy + safety)
});

module.exports = Sentry;
