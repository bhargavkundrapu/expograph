

const { listPermissionsForUser } = require("../modules/rbac/rbac.repo");
const progressRepo = require("../modules/progress/progress.repo");
const clientLabEligibilityRepo = require("../modules/clientLab/clientLabEligibility.repo");
const clientLabEligibilityService = require("../modules/clientLab/clientLabEligibility.service");

// apps/api/src/server/createApp.js
const { router: leadsPublic } = require("../modules/leads/leads.routes.public");
const { router: leadsAdmin } = require("../modules/leads/leads.routes.admin");

const { router: workshopsPublic } = require("../modules/workshops/workshops.routes.public");
const { router: workshopsAdmin } = require("../modules/workshops/workshops.routes.admin");

const { router: podcastsAdmin } = require("../modules/podcasts/podcasts.routes.admin");

const { router: certAdmin } = require("../modules/certificates/certificates.routes.admin");
const { router: certPublic } = require("../modules/certificates/certificates.routes.public");
const { router: certLms } = require("../modules/certificates/certificates.routes.lms");

const { router: featureFlagsAdmin } = require("../modules/featureFlags/featureFlags.routes.admin");
const { router: featureFlagsPublic } = require("../modules/featureFlags/featureFlags.routes.public");

const { router: referralsRoutes } = require("../modules/referrals/referrals.routes");
const { router: resumeRouter } = require("../modules/resume/resume.routes");

const { router: adminClientLabRouter } = require("../modules/clientLab/clientLab.routes.admin");
const { router: clientLabRealWorldRouter } = require("../modules/clientLab/clientLabRealWorld.routes");
const { router: lmsClientLabRouter } = require("../modules/clientLab/clientLab.routes.lms");
const { router: mentorClientLabRouter } = require("../modules/clientLab/clientLab.routes.mentor");

const { router: usersAdminRouter } = require("../modules/users/users.routes.admin");
const { router: dashboardRouter } = require("../modules/dashboard/dashboard.routes");

const { router: lmsInternRouter } = require("../modules/internships/internships.routes.lms");
const { router: mentorInternRouter } = require("../modules/internships/internships.routes.mentor");

const debugRoutes = require("../modules/debug/debug.routes");
const mediaRoutes = require("../modules/media/media.routes");
const { router: lmsSubmissionsRouter } = require("../modules/submissions/submissions.routes.lms");
const { router: mentorSubmissionsRouter } = require("../modules/submissions/submissions.routes.mentor");
const { router: progressRouter } = require("../modules/progress/progress.routes");
const { router: adminContentRouter } = require("../modules/content/content.routes.admin");
const { router: publicContentRouter } = require("../modules/content/content.routes.public");
const { router: studentRouter } = require("../modules/student/student.routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const crypto = require("crypto");
const { env } = require("../config/env");
const { resolveTenant } = require("../middlewares/tenant/resolveTenant");
const { notFound,errorHandler } = require("../middlewares/error-handler/errorHandler");
const { requireAuth } = require("../middlewares/auth/requireAuth");
const { requirePermission } = require("../middlewares/rbac/requirePermission");
const { router: authRouter } = require("../modules/auth/auth.routes");


function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
  app.use(morgan("combined"));
  app.use(express.json({ limit: "1mb" }));
 

  // CORS
 

const allowlist = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:4173",
  "https://expograph.in",
  "https://www.expograph.in",
]);

function isAllowed(origin) {
  if (!origin) return true; // curl/postman
  if (allowlist.has(origin)) return true;
  if (origin.endsWith(".vercel.app")) return true; // previews
  return false;
}

const corsOptions = {
  origin: (origin, cb) => {
    if (isAllowed(origin)) return cb(null, true);
    return cb(null, false); // IMPORTANT: don't throw, just block
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Device-Id", "X-Tenant-Slug"],
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));


  // Tenant resolver must run before auth
  app.use(resolveTenant);

  // Public health
  app.get("/health", (req, res) => res.status(200).send("OK"));
  
  
  app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("x-request-id", req.id);
  next();
});
morgan.token("id", (req) => req.id);

app.use(
  morgan(":date[iso] id=:id :method :url :status :response-time ms :res[content-length]")
);


  // Versioned API
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminContentRouter);
  app.use("/api/v1", publicContentRouter);
  

  app.use("/api/v1/lms", progressRouter);
  app.use("/api/v1/lms", lmsSubmissionsRouter);
  app.use("/api/v1/lms", certLms);
  app.use("/api/v1/student", studentRouter);
  app.use("/api/v1/mentor", mentorSubmissionsRouter);
  app.use("/api/v1/media", mediaRoutes);
  app.use("/api/v1/debug", debugRoutes);
  app.use("/api/v1/lms/internships", lmsInternRouter);
  app.use("/api/v1/mentor/internships", mentorInternRouter);
  app.use("/api/v1/admin/client-lab", adminClientLabRouter);
  app.use("/api/v1/client-lab", clientLabRealWorldRouter);
  app.use("/api/v1/lms/client-lab", lmsClientLabRouter);
  app.use("/api/v1/mentor/client-lab", mentorClientLabRouter);
  app.use("/api/v1/public", leadsPublic);
  app.use("/api/v1/public", workshopsPublic);
  app.use("/api/v1/public", certPublic);
  app.use("/api/v1/public", featureFlagsPublic);

  app.use("/api/v1/admin", leadsAdmin);
  app.use("/api/v1/admin", workshopsAdmin);
  app.use("/api/v1/admin", podcastsAdmin);
  app.use("/api/v1/admin", certAdmin);
  app.use("/api/v1/admin", featureFlagsAdmin);
  app.use("/api/v1/admin", usersAdminRouter);
  app.use("/api/v1/admin/dashboard", dashboardRouter);

  app.use("/api/v1/referrals", referralsRoutes);
  app.use("/api/v1/resume", resumeRouter);

  // Presentations (stub until full API exists) – returns empty list so frontend doesn't 404
  app.get("/api/v1/presentations", requireAuth, (req, res) => {
    res.json({ ok: true, data: [] });
  });

// last line:





  // Auth test endpoint
 

app.get("/api/v1/me", requireAuth, async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    const tenantId = req.auth?.tenantId;

    const permissions = await listPermissionsForUser({ tenantId, userId });

    let overallProgressPercent = 0;
    let eligibleClientLab = false;
    if (req.auth?.role === "Student") {
      overallProgressPercent = await progressRepo.getOverallProgressPercent({ tenantId, userId });
      await clientLabEligibilityService.recomputeEligibility({ tenantId, userId });
      const eligibility = await clientLabEligibilityRepo.getEligibility({ userId });
      eligibleClientLab = !!eligibility.eligible_client_lab;
    }

    res.json({
      ok: true,
      data: {
        userId,
        tenantId,
        membershipId: req.auth?.membershipId,
        role: req.auth?.role,
        permissions,
        overall_progress_percent: overallProgressPercent,
        eligible_client_lab: eligibleClientLab,
      },
    });
  } catch (e) {
    next(e);
  }
});



  // RBAC test endpoint (only users with content:write)
  app.get(
    "/api/v1/admin/ping",
    requireAuth,
    requirePermission("content:write"),
    (req, res) => res.json({ ok: true, data: "admin pong" })
  );
   app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };