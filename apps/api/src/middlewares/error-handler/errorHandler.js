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
  const message = err.message || "Internal Server Error";

  // Server-side log (Render logs lo visible)
  console.error("ERROR", {
    requestId: req.id,
    status,
    message,
    stack: err.stack,
  });

  res.status(status).json({
    ok: false,
    error: message,
    details: err.details || undefined,
    requestId: req.id,
  });
}

module.exports = { notFound, errorHandler };
