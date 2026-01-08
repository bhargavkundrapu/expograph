// apps/api/src/middlewares/errorHandler.js
function notFound(req, res) {
  res.status(404).json({
    ok: false,
    error: "Route not found",
    requestId: req.id,
  });
}

// IMPORTANT: 4 params must be there, else Express won't treat as error middleware
function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  // Handle database connection errors
  if (err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
    message = "Database connection failed. Please check your DATABASE_URL configuration.";
    console.error("❌ Database Connection Error:", {
      code: err.code,
      message: err.message,
      requestId: req.id,
    });
  } else if (err.message?.includes("timeout") && err.message?.includes("connection")) {
    message = "Database connection timeout. Please verify your DATABASE_URL is correct.";
  }

  // Server-side log (Render logs lo visible)
  console.error("ERROR", {
    requestId: req.id,
    status,
    message,
    code: err.code,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(status).json({
    ok: false,
    error: message,
    details: err.details || undefined,
    requestId: req.id,
  });
}

module.exports = { notFound, errorHandler };
