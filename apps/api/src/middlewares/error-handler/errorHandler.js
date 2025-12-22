// apps/api/src/middlewares/error-handler/errorHandler.js
const { HttpError } = require("../../utils/httpError");

function errorHandler(err, req, res, next) {
  const status = err instanceof HttpError ? err.status : 500;

  const payload = {
    ok: false,
    error: {
      message: err.message || "Server error",
      ...(err instanceof HttpError && err.details ? { details: err.details } : {}),
    },
  };

  if (status >= 500) {
    console.error("Unhandled error:", err);
  }

  res.status(status).json(payload);
}

module.exports = { errorHandler };
