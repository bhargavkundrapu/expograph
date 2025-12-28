// apps/api/src/server/createApp.js
const debugRoutes = require("../modules/debug/debug.routes");
const mediaRoutes = require("../modules/media/media.routes");
const { router: lmsSubmissionsRouter } = require("../modules/submissions/submissions.routes.lms");
const { router: mentorSubmissionsRouter } = require("../modules/submissions/submissions.routes.mentor");
const { router: progressRouter } = require("../modules/progress/progress.routes");
const { router: adminContentRouter } = require("../modules/content/content.routes.admin");
const { router: publicContentRouter } = require("../modules/content/content.routes.public");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { env } = require("../config/env");
const { resolveTenant } = require("../middlewares/tenant/resolveTenant");
const { errorHandler } = require("../middlewares/error-handler/errorHandler");
const { requireAuth } = require("../middlewares/auth/requireAuth");
const { requirePermission } = require("../middlewares/rbac/requirePermission");
const { router: authRouter } = require("../modules/auth/auth.routes");


function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json({ limit: "1mb" }));
 

  // CORS
  if (env.CORS_ORIGINS.length > 0) {
    app.use(
      cors({
        origin: env.CORS_ORIGINS,
        credentials: true,
      })
    );
  } else {
    app.use(cors());
  }

  // Tenant resolver must run before auth
  app.use(resolveTenant);

  // Public health
  app.get("/health", (req, res) => res.status(200).send("OK"));

  // Versioned API
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminContentRouter);
  app.use("/api/v1", publicContentRouter);
  

  app.use("/api/v1/lms", progressRouter);
  app.use("/api/v1/lms", lmsSubmissionsRouter);
  app.use("/api/v1/mentor", mentorSubmissionsRouter);
  app.use("/api/v1/media", mediaRoutes);
  app.use("/api/v1/debug", debugRoutes);

  // Auth test endpoint
  app.get("/api/v1/me", requireAuth, async (req, res) => {
    res.json({
      ok: true,
      data: {
        auth: req.auth,
        tenant: req.tenant,
        permissions: req.permissions ?? [],
      },
    });
  });
  


  // RBAC test endpoint (only users with content:write)
  app.get(
    "/api/v1/admin/ping",
    requireAuth,
    requirePermission("content:write"),
    (req, res) => res.json({ ok: true, data: "admin pong" })
  );

  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
