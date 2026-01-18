import { createBrowserRouter, Outlet } from "react-router-dom";
import RequireRole from "./RequireRole";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

import AcademyPage from "../pages/academy/AcademyPage";
import SolutionsPage from "../pages/solutions/SolutionsPage";
import LoginPage from "../pages/auth/LoginPage";

import SuperAdminHome from "../pages/lms/superadmin/SuperAdminHome";
import TenantAdminHome from "../pages/lms/admin/TenantAdminHome";
import MentorHome from "../pages/lms/mentor/MentorHome";
import StudentHome from "../pages/lms/student/StudentHome";
import PublicOnly from "./PublicOnly";
import SuperAdminContent from "../pages/lms/superadmin/SuperAdminContent";
import SuperAdminCourses from "../pages/lms/superadmin/SuperAdminCourses";
import SuperAdminCourseBuilder from "../pages/lms/superadmin/SuperAdminCourseBuilder";
import SuperAdminModuleLessons from "../pages/lms/superadmin/SuperAdminModuleLessons";
import SuperAdminLessonEditor from "../pages/lms/superadmin/SuperAdminLessonEditor";
import SuperAdminLessonResources from "../pages/lms/superadmin/SuperAdminLessonResources";
import SuperAdminLeads from "../pages/lms/superadmin/SuperAdminLeads";
import SuperAdminWorkshops from "../pages/lms/superadmin/SuperAdminWorkshops";
import SuperAdminCertificates from "../pages/lms/superadmin/SuperAdminCertificates";
import SuperAdminPodcasts from "../pages/lms/superadmin/SuperAdminPodcasts";
import SuperAdminFeatureFlags from "../pages/lms/superadmin/SuperAdminFeatureFlags";
import SuperAdminClientLab from "../pages/lms/superadmin/SuperAdminClientLab";
import SuperAdminInternships from "../pages/lms/superadmin/SuperAdminInternships";
import SuperAdminAnalytics from "../pages/lms/superadmin/SuperAdminAnalytics";
import SuperAdminPlaceholder from "../pages/lms/superadmin/SuperAdminPlaceholder";
import SuperAdminStudents from "../pages/lms/superadmin/SuperAdminStudents";
import SuperAdminMentors from "../pages/lms/superadmin/SuperAdminMentors";
import SuperAdminPlayground from "../pages/lms/superadmin/SuperAdminPlayground";
import SuperAdminSettings from "../pages/lms/superadmin/SuperAdminSettings";
import StudentCourses from "../pages/lms/student/StudentCourses";
import StudentCourseTree from "../pages/lms/student/StudentCourseTree";
import StudentLesson from "../pages/lms/student/StudentLesson";
import StudentSubmissions from "../pages/lms/student/StudentSubmissions";
import StudentProgress from "../pages/lms/student/StudentProgress";
import StudentCertificates from "../pages/lms/student/StudentCertificates";
import StudentInternships from "../pages/lms/student/StudentInternships";
import StudentClientLab from "../pages/lms/student/StudentClientLab";
import StudentWorkshops from "../pages/lms/student/StudentWorkshops";
import StudentReferrals from "../pages/lms/student/StudentReferrals";
import MentorSubmissions from "../pages/lms/mentor/MentorSubmissions";
import MentorClientLab from "../pages/lms/mentor/MentorClientLab";
import MentorInternships from "../pages/lms/mentor/MentorInternships";
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
          { path: "courses/create", element: <SuperAdminCourses /> },
          { path: "courses/:courseId", element: <SuperAdminCourses /> },
          { path: "courses/:courseId/modules/:moduleId", element: <SuperAdminCourses /> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId", element: <SuperAdminCourses /> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId/edit", element: <SuperAdminCourses /> },
          
          // Content Management - Nested Routes
          { path: "content", element: <SuperAdminContent /> },
          { path: "content/:courseId", element: <SuperAdminCourseBuilder /> },
          { path: "content/:courseId/edit", element: <SuperAdminCourseBuilder /> },
          { path: "content/:courseId/modules/:moduleId", element: <SuperAdminModuleLessons /> },
          { path: "content/:courseId/modules/:moduleId/lessons", element: <SuperAdminModuleLessons /> },
          { path: "content/:courseId/modules/:moduleId/lessons/create", element: <SuperAdminModuleLessons /> },
          { path: "content/:courseId/lessons/:lessonId", element: <SuperAdminLessonEditor /> },
          { path: "content/:courseId/lessons/:lessonId/edit", element: <SuperAdminLessonEditor /> },
          { path: "content/:courseId/lessons/:lessonId/resources", element: <SuperAdminLessonResources /> },
          
          // Analytics - Nested Routes
          { path: "analytics", element: <SuperAdminAnalytics /> },
          { path: "analytics/overview", element: <SuperAdminAnalytics /> },
          { path: "analytics/enrollment", element: <SuperAdminAnalytics /> },
          { path: "analytics/completion", element: <SuperAdminAnalytics /> },
          { path: "analytics/engagement", element: <SuperAdminAnalytics /> },
          { path: "analytics/reports", element: <SuperAdminAnalytics /> },
          
          // Leads Management - Nested Routes
          { path: "leads", element: <SuperAdminLeads /> },
          { path: "leads/pipeline", element: <SuperAdminLeads /> },
          { path: "leads/list", element: <SuperAdminLeads /> },
          { path: "leads/create", element: <SuperAdminLeads /> },
          { path: "leads/:id", element: <SuperAdminLeads /> },
          { path: "leads/:id/edit", element: <SuperAdminLeads /> },
          { path: "leads/:id/details", element: <SuperAdminLeads /> },
          
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
          
          // Client Lab - Nested Routes
          { path: "client-lab", element: <SuperAdminClientLab /> },
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
          
          // Feature Flags - Nested Routes
          { path: "feature-flags", element: <SuperAdminFeatureFlags /> },
          { path: "feature-flags/list", element: <SuperAdminFeatureFlags /> },
          { path: "feature-flags/create", element: <SuperAdminFeatureFlags /> },
          { path: "feature-flags/:key", element: <SuperAdminFeatureFlags /> },
          { path: "feature-flags/:key/edit", element: <SuperAdminFeatureFlags /> },
          
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
          { path: "settings", element: <SuperAdminSettings /> },
          { path: "settings/general", element: <SuperAdminSettings /> },
          { path: "settings/branding", element: <SuperAdminSettings /> },
          { path: "settings/security", element: <SuperAdminSettings /> },
          { path: "settings/integrations", element: <SuperAdminSettings /> },
          { path: "settings/notifications", element: <SuperAdminSettings /> },
          { path: "settings/advanced", element: <SuperAdminSettings /> },
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
            <PortalLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <MentorHome /> },
          { path: "submissions", element: <MentorSubmissions /> },
          { path: "submissions/:submissionId/review", element: <MentorSubmissions /> },
          { path: "client-lab/:projectId", element: <MentorClientLab /> },
          { path: "client-lab", element: <MentorClientLab /> },
          { path: "client-lab/:projectId/tasks/:taskId/review", element: <MentorClientLab /> },
          { path: "internships", element: <MentorInternships /> },
          { path: "internships/deliverables/:deliverableId/review", element: <MentorInternships /> },
        ],
      },
      {
        path: "/lms/student",
        element: (
          <RequireRole allow={["Student"]}>
            <PortalLayout />
          </RequireRole>
        ),
        children: [
          { index: true, element: <StudentHome /> },
          { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug", element: <StudentLesson /> },
          { path: "courses/:courseSlug", element: <StudentCourseTree /> },
          { path: "courses", element: <StudentCourses /> },
          { path: "client-lab/:projectId", element: <StudentClientLab /> },
          { path: "client-lab", element: <StudentClientLab /> },
          { path: "progress", element: <StudentProgress /> },
          { path: "submissions", element: <StudentSubmissions /> },
          { path: "certificates", element: <StudentCertificates /> },
          { path: "internships", element: <StudentInternships /> },
          { path: "workshops", element: <StudentWorkshops /> },
          { path: "referrals", element: <StudentReferrals /> },
        ],
      },
    ],
  },
]); 
