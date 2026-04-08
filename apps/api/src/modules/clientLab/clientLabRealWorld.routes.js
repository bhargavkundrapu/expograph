const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./clientLabRealWorld.controller");

const router = express.Router();

// --- Student routes: mounted at /me so only /api/v1/client-lab/me/* hits this (no SuperAdmin check)
const studentRouter = express.Router();
studentRouter.use(requireAuth);
studentRouter.get("/assigned-projects", ctrl.myAssignedProjects);
studentRouter.get("/projects", ctrl.myVisibleProjects);
studentRouter.get("/assigned-tasks", ctrl.myAssignedTasks);
studentRouter.get("/projects/:id", ctrl.getMyProjectWithTasks);
studentRouter.get("/tasks/:id", ctrl.getMyTask);
studentRouter.post("/tasks/:id/submit", ctrl.submitTask);
studentRouter.get("/eligibility-checklist", ctrl.getEligibilityChecklist);

// --- SuperAdmin only (Real-World Client Lab control): mounted at / so /api/v1/client-lab/projects etc.
const adminRouter = express.Router();
adminRouter.use(requireAuth, requireRole(["SuperAdmin"]));
adminRouter.get("/projects", ctrl.listProjects);
adminRouter.post("/projects", ctrl.createProject);
adminRouter.get("/projects/:id", ctrl.getProjectWithTasks);
adminRouter.put("/projects/:id/assignments", ctrl.setProjectAssignments);
adminRouter.patch("/projects/:id", ctrl.updateProject);
adminRouter.delete("/projects/:id", ctrl.deleteProject);
adminRouter.post("/projects/:id/tasks", ctrl.createTask);
adminRouter.patch("/tasks/:id", ctrl.updateTask);
adminRouter.post("/tasks/:id/assign", ctrl.assignTask);
adminRouter.post("/tasks/:id/unassign", ctrl.unassignTask);
adminRouter.get("/submissions", ctrl.listSubmissions);
adminRouter.post("/submissions/:id/review", ctrl.reviewSubmission);
adminRouter.get("/eligible-students", ctrl.listEligibleStudents);
adminRouter.get("/students-for-assign", ctrl.listAllStudentsForAssign);

// /me/* => student only (auth only). Everything else => admin (SuperAdmin). Order matters.
router.use("/me", studentRouter);
router.use("/", adminRouter);

module.exports = { router };
