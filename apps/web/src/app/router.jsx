import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import RequireRole from "./RequireRole";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import MentorLayout from "./layouts/MentorLayout";
import StudentLayout from "./layouts/StudentLayout";

import AcademyPage from "../pages/academy/AcademyPage";
import SolutionsPage from "../pages/solutions/SolutionsPage";
import LoginPage from "../pages/auth/LoginPage";
import CourseContentsSidebarDemo from "../pages/demo/CourseContentsSidebarDemo";

import SuperAdminHome from "../pages/lms/superadmin/SuperAdminHome";
import TenantAdminHome from "../pages/lms/admin/TenantAdminHome";
import MentorHome from "../pages/lms/mentor/MentorHome";
import StudentHome from "../pages/lms/student/StudentHome";
import PublicOnly from "./PublicOnly";
import SuperAdminContent from "../pages/lms/superadmin/SuperAdminContent";
import SuperAdminCourses from "../pages/lms/superadmin/SuperAdminCourses";
import SuperAdminCourseBuilder from "../pages/lms/superadmin/SuperAdminCourseBuilder";
import SuperAdminModuleLessons from "../pages/lms/superadmin/SuperAdminModuleLessons";
import SuperAdminCreateLesson from "../pages/lms/superadmin/SuperAdminCreateLesson";
import SuperAdminLessonEditor from "../pages/lms/superadmin/SuperAdminLessonEditor";
import SuperAdminViewLesson from "../pages/lms/superadmin/SuperAdminViewLesson";
import SuperAdminLessonResources from "../pages/lms/superadmin/SuperAdminLessonResources";
import SuperAdminLeads from "../pages/lms/superadmin/SuperAdminLeads";
import SuperAdminWorkshops from "../pages/lms/superadmin/SuperAdminWorkshops";
import SuperAdminCertificates from "../pages/lms/superadmin/SuperAdminCertificates";
import SuperAdminPodcasts from "../pages/lms/superadmin/SuperAdminPodcasts";
import SuperAdminFeatureFlags from "../pages/lms/superadmin/SuperAdminFeatureFlags";
import SuperAdminClientLab from "../pages/lms/superadmin/SuperAdminClientLab";
import SuperAdminClientLabRealWorld from "../pages/lms/superadmin/SuperAdminClientLabRealWorld";
import SuperAdminInternships from "../pages/lms/superadmin/SuperAdminInternships";
import SuperAdminAnalytics from "../pages/lms/superadmin/SuperAdminAnalytics";
import SuperAdminPlaceholder from "../pages/lms/superadmin/SuperAdminPlaceholder";
import SuperAdminStudents from "../pages/lms/superadmin/SuperAdminStudents";
import SuperAdminMentors from "../pages/lms/superadmin/SuperAdminMentors";
import SuperAdminPlayground from "../pages/lms/superadmin/SuperAdminPlayground";
import SuperAdminSettings from "../pages/lms/superadmin/SuperAdminSettings";
import SuperAdminPresentation from "../pages/lms/superadmin/SuperAdminPresentation";
import StudentCourses from "../pages/lms/student/StudentCourses";
import StudentLesson from "../pages/lms/student/StudentLesson";
import StudentSubmissions from "../pages/lms/student/StudentSubmissions";
import StudentProgress from "../pages/lms/student/StudentProgress";
import StudentCertificates from "../pages/lms/student/StudentCertificates";
import StudentInternships from "../pages/lms/student/StudentInternships";
import StudentClientLab from "../pages/lms/student/StudentClientLab";
import StudentWorkshops from "../pages/lms/student/StudentWorkshops";
import StudentReferrals from "../pages/lms/student/StudentReferrals";
import StudentDiscussions from "../pages/lms/student/StudentDiscussions";
import StudentQuestionBank from "../pages/lms/student/StudentQuestionBank";
import StudentPlayground from "../pages/lms/student/StudentPlayground";
import StudentResumeBuilder from "../pages/lms/student/StudentResumeBuilder";
import StudentPortfolioBuilder from "../pages/lms/student/StudentPortfolioBuilder";
import StudentExternalJobs from "../pages/lms/student/StudentExternalJobs";
import StudentProfile from "../pages/lms/student/StudentProfile";
import StudentLearningPaths from "../pages/lms/student/StudentLearningPaths";
import MentorSubmissions from "../pages/lms/mentor/MentorSubmissions";
import MentorClientLab from "../pages/lms/mentor/MentorClientLab";
import MentorInternships from "../pages/lms/mentor/MentorInternships";
import MentorStudents from "../pages/lms/mentor/MentorStudents";
import MentorAnalytics from "../pages/lms/mentor/MentorAnalytics";
import MentorCommunications from "../pages/lms/mentor/MentorCommunications";
import MentorCalendar from "../pages/lms/mentor/MentorCalendar";
import MentorResources from "../pages/lms/mentor/MentorResources";
import MentorSettings from "../pages/lms/mentor/MentorSettings";
import TenantAdminSettings from "../pages/lms/admin/TenantAdminSettings";
import TenantAdminUsers from "../pages/lms/admin/TenantAdminUsers";

// Simple layout wrapper - just renders children
function SimpleLayout() {
  return <Outlet />;
}

// Portal layout wrapper - just renders children
function PortalLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <SimpleLayout />,
    children: [
      { path: "/", element: <AcademyPage /> },
      { path: "/academy", element: <AcademyPage /> },
      { path: "/solutions", element: <SolutionsPage /> },
      { path: "/demo/course-sidebar", element: <CourseContentsSidebarDemo /> },
      { path: "/login", element: <PublicOnly><LoginPage /></PublicOnly> },
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      {
        path: "/lms/superadmin",
        element: (
          <RequireRole allow={["SuperAdmin"]}>
            <SuperAdminLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <SuperAdminHome /> },
          
          // Courses Management - Nested Routes
          { path: "courses", element: <SuperAdminCourses /> },
          { path: "courses/list", element: <SuperAdminCourses /> },
          { path: "courses/:courseId", element: <SuperAdminCourses /> },
          { path: "courses/:courseId/modules/:moduleId", element: <SuperAdminCourses /> },
          { path: "courses/:courseId/modules/:moduleId/lessons/create", element: <SuperAdminCreateLesson /> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId", element: <SuperAdminViewLesson /> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId/edit", element: <SuperAdminModuleLessons /> },
          
          // Content Management - Nested Routes
          // { path: "content", element: <SuperAdminContent /> },
          // { path: "content/:courseId", element: <SuperAdminCourseBuilder /> },
          // { path: "content/:courseId/edit", element: <SuperAdminCourseBuilder /> },
          // { path: "content/:courseId/modules/:moduleId", element: <SuperAdminModuleLessons /> },
          // { path: "content/:courseId/modules/:moduleId/lessons", element: <SuperAdminModuleLessons /> },
          // { path: "content/:courseId/modules/:moduleId/lessons/create", element: <SuperAdminModuleLessons /> },
          // { path: "content/:courseId/lessons/:lessonId", element: <SuperAdminLessonEditor /> },
          // { path: "content/:courseId/lessons/:lessonId/edit", element: <SuperAdminLessonEditor /> },
          // { path: "content/:courseId/lessons/:lessonId/resources", element: <SuperAdminLessonResources /> },
          
          // Analytics - Nested Routes
          // { path: "analytics", element: <SuperAdminAnalytics /> },
          // { path: "analytics/overview", element: <SuperAdminAnalytics /> },
          // { path: "analytics/enrollment", element: <SuperAdminAnalytics /> },
          // { path: "analytics/completion", element: <SuperAdminAnalytics /> },
          // { path: "analytics/engagement", element: <SuperAdminAnalytics /> },
          // { path: "analytics/reports", element: <SuperAdminAnalytics /> },
          
          // Leads Management - Nested Routes
          // { path: "leads", element: <SuperAdminLeads /> },
          // { path: "leads/pipeline", element: <SuperAdminLeads /> },
          // { path: "leads/list", element: <SuperAdminLeads /> },
          // { path: "leads/create", element: <SuperAdminLeads /> },
          // { path: "leads/:id", element: <SuperAdminLeads /> },
          // { path: "leads/:id/edit", element: <SuperAdminLeads /> },
          // { path: "leads/:id/details", element: <SuperAdminLeads /> },
          
          // Workshops/Events - Nested Routes
          { path: "workshops", element: <SuperAdminWorkshops /> },
          { path: "workshops/cards", element: <SuperAdminWorkshops /> },
          { path: "workshops/list", element: <SuperAdminWorkshops /> },
          { path: "workshops/create", element: <SuperAdminWorkshops /> },
          { path: "workshops/new", element: <SuperAdminWorkshops /> },
          { path: "workshops/:id", element: <SuperAdminWorkshops /> },
          { path: "workshops/:id/details", element: <SuperAdminWorkshops /> },
          { path: "workshops/:id/edit", element: <SuperAdminWorkshops /> },
          { path: "workshops/:id/registrations", element: <SuperAdminWorkshops /> },
          
          // Certificates - Nested Routes
          { path: "certificates", element: <SuperAdminCertificates /> },
          { path: "certificates/cards", element: <SuperAdminCertificates /> },
          { path: "certificates/list", element: <SuperAdminCertificates /> },
          { path: "certificates/create", element: <SuperAdminCertificates /> },
          { path: "certificates/issue", element: <SuperAdminCertificates /> },
          { path: "certificates/:id", element: <SuperAdminCertificates /> },
          { path: "certificates/:id/details", element: <SuperAdminCertificates /> },
          { path: "certificates/:id/verify", element: <SuperAdminCertificates /> },
          
          // Podcasts - Nested Routes
          { path: "podcasts", element: <SuperAdminPodcasts /> },
          { path: "podcasts/cards", element: <SuperAdminPodcasts /> },
          { path: "podcasts/list", element: <SuperAdminPodcasts /> },
          { path: "podcasts/episodes", element: <SuperAdminPodcasts /> },
          { path: "podcasts/episodes/create", element: <SuperAdminPodcasts /> },
          { path: "podcasts/episodes/:id", element: <SuperAdminPodcasts /> },
          { path: "podcasts/episodes/:id/edit", element: <SuperAdminPodcasts /> },
          { path: "podcasts/episodes/:id/details", element: <SuperAdminPodcasts /> },
          { path: "podcasts/series", element: <SuperAdminPodcasts /> },
          { path: "podcasts/series/create", element: <SuperAdminPodcasts /> },
          { path: "podcasts/series/:id", element: <SuperAdminPodcasts /> },
          
          // Client Lab - default to Real-World (avoids 400 from old admin/client-lab API)
          { path: "client-lab", element: <Navigate to="client-lab/real-world" replace /> },
          { path: "client-lab/cards", element: <SuperAdminClientLab /> },
          { path: "client-lab/list", element: <SuperAdminClientLab /> },
          { path: "client-lab/create", element: <SuperAdminClientLab /> },
          { path: "client-lab/projects", element: <SuperAdminClientLab /> },
          { path: "client-lab/projects/create", element: <SuperAdminClientLab /> },
          { path: "client-lab/projects/:id", element: <SuperAdminClientLab /> },
          { path: "client-lab/projects/:id/edit", element: <SuperAdminClientLab /> },
          { path: "client-lab/projects/:id/details", element: <SuperAdminClientLab /> },
          { path: "client-lab/clients", element: <SuperAdminClientLab /> },
          { path: "client-lab/tasks", element: <SuperAdminClientLab /> },
          { path: "client-lab/real-world", element: <SuperAdminClientLabRealWorld /> },
          { path: "client-lab/real-world/submissions", element: <SuperAdminClientLabRealWorld /> },
          { path: "client-lab/real-world/projects/:id", element: <SuperAdminClientLabRealWorld /> },
          
          // Internships - Nested Routes
          { path: "internships", element: <SuperAdminInternships /> },
          { path: "internships/cards", element: <SuperAdminInternships /> },
          { path: "internships/list", element: <SuperAdminInternships /> },
          { path: "internships/projects", element: <SuperAdminInternships /> },
          { path: "internships/projects/create", element: <SuperAdminInternships /> },
          { path: "internships/projects/:id", element: <SuperAdminInternships /> },
          { path: "internships/projects/:id/edit", element: <SuperAdminInternships /> },
          { path: "internships/projects/:id/details", element: <SuperAdminInternships /> },
          { path: "internships/batches", element: <SuperAdminInternships /> },
          { path: "internships/batches/create", element: <SuperAdminInternships /> },
          { path: "internships/batches/:id", element: <SuperAdminInternships /> },
          { path: "internships/applications", element: <SuperAdminInternships /> },
          { path: "internships/applications/:id", element: <SuperAdminInternships /> },
          
          // Playground - Nested Routes
          { path: "playground", element: <SuperAdminPlayground /> },
          { path: "playground/cards", element: <SuperAdminPlayground /> },
          { path: "playground/list", element: <SuperAdminPlayground /> },
          { path: "playground/templates", element: <SuperAdminPlayground /> },
          { path: "playground/templates/create", element: <SuperAdminPlayground /> },
          { path: "playground/templates/:id", element: <SuperAdminPlayground /> },
          { path: "playground/templates/:id/edit", element: <SuperAdminPlayground /> },
          { path: "playground/templates/:id/details", element: <SuperAdminPlayground /> },
          { path: "playground/categories", element: <SuperAdminPlayground /> },
          
          // Presentations - Nested Routes
          { path: "presentations", element: <SuperAdminPresentation /> },
          { path: "presentations/create", element: <SuperAdminPresentation /> },
          { path: "presentations/:id", element: <SuperAdminPresentation /> },
          { path: "presentations/:id/edit", element: <SuperAdminPresentation /> },
          { path: "presentations/:id/view", element: <SuperAdminPresentation /> },
          
          // Feature Flags - Nested Routes
          // { path: "feature-flags", element: <SuperAdminFeatureFlags /> },
          // { path: "feature-flags/list", element: <SuperAdminFeatureFlags /> },
          // { path: "feature-flags/create", element: <SuperAdminFeatureFlags /> },
          // { path: "feature-flags/:key", element: <SuperAdminFeatureFlags /> },
          // { path: "feature-flags/:key/edit", element: <SuperAdminFeatureFlags /> },
          
          // Students Management - Nested Routes
          { path: "students", element: <SuperAdminStudents /> },
          { path: "students/cards", element: <SuperAdminStudents /> },
          { path: "students/list", element: <SuperAdminStudents /> },
          { path: "students/create", element: <SuperAdminStudents /> },
          { path: "students/add", element: <SuperAdminStudents /> },
          { path: "students/:id", element: <SuperAdminStudents /> },
          { path: "students/:id/details", element: <SuperAdminStudents /> },
          { path: "students/:id/edit", element: <SuperAdminStudents /> },
          { path: "students/:id/enrollments", element: <SuperAdminStudents /> },
          { path: "students/:id/progress", element: <SuperAdminStudents /> },
          
          // Mentors Management - Nested Routes
          { path: "mentors", element: <SuperAdminMentors /> },
          { path: "mentors/cards", element: <SuperAdminMentors /> },
          { path: "mentors/list", element: <SuperAdminMentors /> },
          { path: "mentors/create", element: <SuperAdminMentors /> },
          { path: "mentors/add", element: <SuperAdminMentors /> },
          { path: "mentors/:id", element: <SuperAdminMentors /> },
          { path: "mentors/:id/details", element: <SuperAdminMentors /> },
          { path: "mentors/:id/edit", element: <SuperAdminMentors /> },
          { path: "mentors/:id/students", element: <SuperAdminMentors /> },
          { path: "mentors/:id/assignments", element: <SuperAdminMentors /> },
          
          // Settings - Nested Routes
          // { path: "settings", element: <SuperAdminSettings /> },
          // { path: "settings/general", element: <SuperAdminSettings /> },
          // { path: "settings/branding", element: <SuperAdminSettings /> },
          // { path: "settings/security", element: <SuperAdminSettings /> },
          // { path: "settings/integrations", element: <SuperAdminSettings /> },
          // { path: "settings/notifications", element: <SuperAdminSettings /> },
          // { path: "settings/advanced", element: <SuperAdminSettings /> },
        ],
      },
      {
        path: "/lms/admin",
        element: (
          <RequireRole allow={["TenantAdmin"]}>
            <PortalLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <TenantAdminHome /> },
          { path: "settings", element: <TenantAdminSettings /> },
          { path: "users", element: <TenantAdminUsers /> },
        ],
      },
      {
        path: "/lms/mentor",
        element: (
          <RequireRole allow={["Mentor"]}>
            <MentorLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <MentorHome /> },
          
          // Students/Mentees Management - Nested Routes
          { path: "students", element: <MentorStudents /> },
          { path: "students/cards", element: <MentorStudents /> },
          { path: "students/list", element: <MentorStudents /> },
          { path: "students/:id", element: <MentorStudents /> },
          { path: "students/:id/details", element: <MentorStudents /> },
          { path: "students/:id/progress", element: <MentorStudents /> },
          
          // Submissions Review - Nested Routes
          { path: "submissions", element: <MentorSubmissions /> },
          { path: "submissions/queue", element: <MentorSubmissions /> },
          { path: "submissions/list", element: <MentorSubmissions /> },
          { path: "submissions/:submissionId", element: <MentorSubmissions /> },
          { path: "submissions/:submissionId/review", element: <MentorSubmissions /> },
          
          // Communications - Nested Routes
          { path: "communications", element: <MentorCommunications /> },
          { path: "communications/messages", element: <MentorCommunications /> },
          { path: "communications/alerts", element: <MentorCommunications /> },
          { path: "communications/notifications", element: <MentorCommunications /> },
          
          // Calendar - Nested Routes
          { path: "calendar", element: <MentorCalendar /> },
          { path: "calendar/schedule", element: <MentorCalendar /> },
          { path: "calendar/meetings", element: <MentorCalendar /> },
          { path: "calendar/availability", element: <MentorCalendar /> },
          
          // Analytics - Nested Routes
          { path: "analytics", element: <MentorAnalytics /> },
          { path: "analytics/overview", element: <MentorAnalytics /> },
          { path: "analytics/mentees", element: <MentorAnalytics /> },
          { path: "analytics/performance", element: <MentorAnalytics /> },
          { path: "analytics/engagement", element: <MentorAnalytics /> },
          
          // Client Lab - Nested Routes
          { path: "client-lab", element: <MentorClientLab /> },
          { path: "client-lab/projects", element: <MentorClientLab /> },
          { path: "client-lab/projects/list", element: <MentorClientLab /> },
          { path: "client-lab/projects/:projectId", element: <MentorClientLab /> },
          { path: "client-lab/projects/:projectId/details", element: <MentorClientLab /> },
          { path: "client-lab/projects/:projectId/tasks", element: <MentorClientLab /> },
          { path: "client-lab/projects/:projectId/tasks/:taskId/review", element: <MentorClientLab /> },
          
          // Internships - Nested Routes
          { path: "internships", element: <MentorInternships /> },
          { path: "internships/assignments", element: <MentorInternships /> },
          { path: "internships/deliverables", element: <MentorInternships /> },
          { path: "internships/deliverables/:deliverableId", element: <MentorInternships /> },
          { path: "internships/deliverables/:deliverableId/review", element: <MentorInternships /> },
          
          // Resources - Nested Routes
          { path: "resources", element: <MentorResources /> },
          { path: "resources/materials", element: <MentorResources /> },
          { path: "resources/guides", element: <MentorResources /> },
          { path: "resources/best-practices", element: <MentorResources /> },
          
          // Settings - Nested Routes
          { path: "settings", element: <MentorSettings /> },
          { path: "settings/profile", element: <MentorSettings /> },
          { path: "settings/preferences", element: <MentorSettings /> },
        ],
      },
      {
        path: "/lms/student",
        element: (
          <RequireRole allow={["Student"]}>
            <StudentLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <StudentHome /> },
          
          // My Journey / Progress - Nested Routes (TEMPORARILY DISABLED)
          // { path: "journey", element: <StudentProgress /> },
          { path: "progress", element: <StudentProgress /> },
          { path: "progress/overview", element: <StudentProgress /> },
          { path: "progress/courses", element: <StudentProgress /> },
          { path: "progress/achievements", element: <StudentProgress /> },
          
          // Courses - Nested Routes
          { path: "courses", element: <StudentCourses /> },
          { path: "courses/list", element: <StudentCourses /> },
          { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug", element: <StudentLesson /> },
          { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug/complete", element: <StudentLesson /> },
          
          // Bonus Courses - Nested Routes
          { path: "bonus-courses", element: <StudentCourses /> },
          { path: "bonus-courses/list", element: <StudentCourses /> },
          
          
          // Question Bank - Nested Routes
          { path: "question-bank", element: <StudentQuestionBank /> },
          { path: "question-bank/list", element: <StudentQuestionBank /> },
          { path: "question-bank/practice", element: <StudentQuestionBank /> },
          
          // Discussions - Nested Routes (TEMPORARILY DISABLED)
          // { path: "discussions", element: <StudentDiscussions /> },
          // { path: "discussions/list", element: <StudentDiscussions /> },
          // { path: "discussions/create", element: <StudentDiscussions /> },
          // { path: "discussions/:discussionId", element: <StudentDiscussions /> },
          // { path: "discussions/:discussionId/replies", element: <StudentDiscussions /> },
          
          // Playground - Nested Routes (TEMPORARILY DISABLED)
          // { path: "playground", element: <StudentPlayground /> },
          // { path: "playground/list", element: <StudentPlayground /> },
          // { path: "playground/templates", element: <StudentPlayground /> },
          // { path: "playground/:id", element: <StudentPlayground /> },
          
          // Projects / Code Snippets - Nested Routes (TEMPORARILY DISABLED)
          // { path: "projects", element: <StudentClientLab /> },
          // { path: "projects/list", element: <StudentClientLab /> },
          // { path: "projects/create", element: <StudentClientLab /> },
          // { path: "projects/:projectId", element: <StudentClientLab /> },
          
          // Resume Builder
          { path: "resume-builder", element: <StudentResumeBuilder /> },
          
          // Portfolio Builder - Nested Routes (TEMPORARILY DISABLED)
          // { path: "portfolio-builder", element: <StudentPortfolioBuilder /> },
          // { path: "portfolio-builder/create", element: <StudentPortfolioBuilder /> },
          // { path: "portfolio-builder/templates", element: <StudentPortfolioBuilder /> },
          // { path: "portfolio-builder/:id", element: <StudentPortfolioBuilder /> },
          // { path: "portfolio-builder/:id/edit", element: <StudentPortfolioBuilder /> },
          
          // External Jobs - Nested Routes (TEMPORARILY DISABLED)
          // { path: "external-jobs", element: <StudentExternalJobs /> },
          // { path: "external-jobs/list", element: <StudentExternalJobs /> },
          // { path: "external-jobs/:id", element: <StudentExternalJobs /> },
          
          // Learning Paths - Nested Routes (TEMPORARILY DISABLED)
          // { path: "learning-paths", element: <StudentLearningPaths /> },
          // { path: "learning-paths/list", element: <StudentLearningPaths /> },
          // { path: "learning-paths/:pathId", element: <StudentLearningPaths /> },
          
          // Profile - Nested Routes
          { path: "profile", element: <StudentProfile /> },
          { path: "profile/edit", element: <StudentProfile /> },
          { path: "profile/settings", element: <StudentProfile /> },
          
          // Client Lab - Nested Routes
          { path: "client-lab", element: <StudentClientLab /> },
          { path: "client-lab/projects", element: <StudentClientLab /> },
          { path: "client-lab/projects/:projectId", element: <StudentClientLab /> },
          { path: "client-lab/projects/:projectId/tasks", element: <StudentClientLab /> },
          { path: "client-lab/projects/:projectId/tasks/:taskId", element: <StudentClientLab /> },
          
          // Submissions - Nested Routes
          { path: "submissions", element: <StudentSubmissions /> },
          { path: "submissions/list", element: <StudentSubmissions /> },
          { path: "submissions/:submissionId", element: <StudentSubmissions /> },
          
          // Certificates - Nested Routes
          { path: "certificates", element: <StudentCertificates /> },
          { path: "certificates/list", element: <StudentCertificates /> },
          { path: "certificates/:id", element: <StudentCertificates /> },
          { path: "certificates/:id/view", element: <StudentCertificates /> },
          
          // Internships - Nested Routes
          { path: "internships", element: <StudentInternships /> },
          { path: "internships/list", element: <StudentInternships /> },
          { path: "internships/apply", element: <StudentInternships /> },
          { path: "internships/:id", element: <StudentInternships /> },
          { path: "internships/:id/details", element: <StudentInternships /> },
          { path: "internships/:id/apply", element: <StudentInternships /> },
          
          // Workshops - Nested Routes
          { path: "workshops", element: <StudentWorkshops /> },
          { path: "workshops/list", element: <StudentWorkshops /> },
          { path: "workshops/:id", element: <StudentWorkshops /> },
          { path: "workshops/:id/details", element: <StudentWorkshops /> },
          { path: "workshops/:id/register", element: <StudentWorkshops /> },
          
          // Referrals - Nested Routes
          { path: "referrals", element: <StudentReferrals /> },
          { path: "referrals/list", element: <StudentReferrals /> },
          { path: "referrals/create", element: <StudentReferrals /> },
          { path: "referrals/:id", element: <StudentReferrals /> },
        ],
      },
    ],
  },
]); 
