const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./clientLabRealWorld.controller");

const router = express.Router();

// --- SuperAdmin only (Real-World Client Lab control)
const adminRouter = express.Router();
adminRouter.use(requireAuth, requireRole(["SuperAdmin"]));

adminRouter.get("/projects", ctrl.listProjects);
adminRouter.post("/projects", ctrl.createProject);
adminRouter.get("/projects/:id", ctrl.getProjectWithTasks);
adminRouter.patch("/projects/:id", ctrl.updateProject);
adminRouter.post("/projects/:id/tasks", ctrl.createTask);

adminRouter.patch("/tasks/:id", ctrl.updateTask);
adminRouter.post("/tasks/:id/assign", ctrl.assignTask);
adminRouter.post("/tasks/:id/unassign", ctrl.unassignTask);

adminRouter.get("/submissions", ctrl.listSubmissions);
adminRouter.post("/submissions/:id/review", ctrl.reviewSubmission);

adminRouter.get("/eligible-students", ctrl.listEligibleStudents);
adminRouter.get("/students-for-assign", ctrl.listAllStudentsForAssign);

// --- Student (eligible only; service enforces assignment)
const studentRouter = express.Router();
studentRouter.use(requireAuth);

studentRouter.get("/me/assigned-projects", ctrl.myAssignedProjects);
studentRouter.get("/me/assigned-tasks", ctrl.myAssignedTasks);
studentRouter.get("/me/projects/:id", ctrl.getMyProjectWithTasks);
studentRouter.get("/me/tasks/:id", ctrl.getMyTask);
studentRouter.post("/tasks/:id/submit", ctrl.submitTask);

// Mount student routes FIRST so /me/* is handled before admin middleware (which requires SuperAdmin)
router.use("/", studentRouter);
router.use("/", adminRouter);

module.exports = { router };
