import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import RequireRole from "./RequireRole";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import MentorLayout from "./layouts/MentorLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicOnly from "./PublicOnly";

import AcademyPage from "../pages/academy/AcademyPage";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPageRoute from "../pages/NotFoundPage";

const SolutionsPage = lazy(() => import("../pages/solutions/SolutionsPage"));
const CoursesPage = lazy(() => import("../pages/courses/CoursesPage"));
const CourseDetailPage = lazy(() => import("../pages/courses/CourseDetailPage"));
const FeatureDetailPage = lazy(() => import("../pages/features/FeatureDetailPage"));
const AccountPendingPage = lazy(() => import("../pages/payment/AccountPendingPage"));
const PaymentFailurePage = lazy(() => import("../pages/payment/PaymentFailurePage"));
const CourseContentsSidebarDemo = lazy(() => import("../pages/demo/CourseContentsSidebarDemo"));

const SuperAdminHome = lazy(() => import("../pages/lms/superadmin/SuperAdminHome"));
const SuperAdminCourses = lazy(() => import("../pages/lms/superadmin/SuperAdminCourses"));
const SuperAdminCoursePacks = lazy(() => import("../pages/lms/superadmin/SuperAdminCoursePacks"));
const SuperAdminModuleLessons = lazy(() => import("../pages/lms/superadmin/SuperAdminModuleLessons"));
const SuperAdminCreateLesson = lazy(() => import("../pages/lms/superadmin/SuperAdminCreateLesson"));
const SuperAdminViewLesson = lazy(() => import("../pages/lms/superadmin/SuperAdminViewLesson"));
const SuperAdminWorkshops = lazy(() => import("../pages/lms/superadmin/SuperAdminWorkshops"));
const SuperAdminCertificates = lazy(() => import("../pages/lms/superadmin/SuperAdminCertificates"));
const SuperAdminPodcasts = lazy(() => import("../pages/lms/superadmin/SuperAdminPodcasts"));
const SuperAdminClientLab = lazy(() => import("../pages/lms/superadmin/SuperAdminClientLab"));
const SuperAdminClientLabRealWorld = lazy(() => import("../pages/lms/superadmin/SuperAdminClientLabRealWorld"));
const SuperAdminInternships = lazy(() => import("../pages/lms/superadmin/SuperAdminInternships"));
const SuperAdminApprovals = lazy(() => import("../pages/lms/superadmin/SuperAdminApprovals"));
const SuperAdminStudents = lazy(() => import("../pages/lms/superadmin/SuperAdminStudents"));
const SuperAdminMentors = lazy(() => import("../pages/lms/superadmin/SuperAdminMentors"));
const SuperAdminPlayground = lazy(() => import("../pages/lms/superadmin/SuperAdminPlayground"));
const SuperAdminPresentation = lazy(() => import("../pages/lms/superadmin/SuperAdminPresentation"));

const StudentHome = lazy(() => import("../pages/lms/student/StudentHome"));
const StudentCourses = lazy(() => import("../pages/lms/student/StudentCourses"));
const StudentLesson = lazy(() => import("../pages/lms/student/StudentLesson"));
const StudentSubmissions = lazy(() => import("../pages/lms/student/StudentSubmissions"));
const StudentProgress = lazy(() => import("../pages/lms/student/StudentProgress"));
const StudentCertificates = lazy(() => import("../pages/lms/student/StudentCertificates"));
const StudentInternships = lazy(() => import("../pages/lms/student/StudentInternships"));
const StudentClientLab = lazy(() => import("../pages/lms/student/StudentClientLab"));
const StudentWorkshops = lazy(() => import("../pages/lms/student/StudentWorkshops"));
const StudentReferrals = lazy(() => import("../pages/lms/student/StudentReferrals"));
const StudentQuestionBank = lazy(() => import("../pages/lms/student/StudentQuestionBank"));
const StudentResumeBuilder = lazy(() => import("../pages/lms/student/StudentResumeBuilder"));
const StudentProfile = lazy(() => import("../pages/lms/student/StudentProfile"));

const MentorHome = lazy(() => import("../pages/lms/mentor/MentorHome"));
const MentorSubmissions = lazy(() => import("../pages/lms/mentor/MentorSubmissions"));
const MentorClientLab = lazy(() => import("../pages/lms/mentor/MentorClientLab"));
const MentorInternships = lazy(() => import("../pages/lms/mentor/MentorInternships"));
const MentorStudents = lazy(() => import("../pages/lms/mentor/MentorStudents"));
const MentorAnalytics = lazy(() => import("../pages/lms/mentor/MentorAnalytics"));
const MentorCommunications = lazy(() => import("../pages/lms/mentor/MentorCommunications"));
const MentorCalendar = lazy(() => import("../pages/lms/mentor/MentorCalendar"));
const MentorResources = lazy(() => import("../pages/lms/mentor/MentorResources"));
const MentorSettings = lazy(() => import("../pages/lms/mentor/MentorSettings"));

const TenantAdminHome = lazy(() => import("../pages/lms/admin/TenantAdminHome"));
const TenantAdminSettings = lazy(() => import("../pages/lms/admin/TenantAdminSettings"));
const TenantAdminUsers = lazy(() => import("../pages/lms/admin/TenantAdminUsers"));

function LazyFallback() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function L({ children }) {
  return <Suspense fallback={<LazyFallback />}>{children}</Suspense>;
}

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
      { path: "/solutions", element: <L><SolutionsPage /></L> },
      { path: "/courses", element: <L><CoursesPage /></L> },
      { path: "/courses/:slug", element: <L><CourseDetailPage /></L> },
      { path: "/features/:slug", element: <L><FeatureDetailPage /></L> },
      { path: "/demo/course-sidebar", element: <L><CourseContentsSidebarDemo /></L> },
      { path: "/login", element: <PublicOnly><LoginPage /></PublicOnly> },
      { path: "/account-pending", element: <L><AccountPendingPage /></L> },
      { path: "/payment-failure", element: <L><PaymentFailurePage /></L> },
      { path: "/not-found", element: <NotFoundPageRoute /> },
      { path: "*", element: <NotFoundPageRoute /> },
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
          { index: true, element: <L><SuperAdminHome /></L> },
          { path: "approvals", element: <L><SuperAdminApprovals /></L> },
          
          // Courses Management
          { path: "courses", element: <L><SuperAdminCourses /></L> },
          { path: "courses/list", element: <L><SuperAdminCourses /></L> },
          { path: "course-packs", element: <L><SuperAdminCoursePacks /></L> },
          { path: "courses/:courseId", element: <L><SuperAdminCourses /></L> },
          { path: "courses/:courseId/modules/:moduleId", element: <L><SuperAdminCourses /></L> },
          { path: "courses/:courseId/modules/:moduleId/lessons/create", element: <L><SuperAdminCreateLesson /></L> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId", element: <L><SuperAdminViewLesson /></L> },
          { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId/edit", element: <L><SuperAdminModuleLessons /></L> },
          
          // Workshops/Events
          { path: "workshops", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/cards", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/list", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/create", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/new", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/:id", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/:id/details", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/:id/edit", element: <L><SuperAdminWorkshops /></L> },
          { path: "workshops/:id/registrations", element: <L><SuperAdminWorkshops /></L> },
          
          // Certificates
          { path: "certificates", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/cards", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/list", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/create", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/issue", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/:id", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/:id/details", element: <L><SuperAdminCertificates /></L> },
          { path: "certificates/:id/verify", element: <L><SuperAdminCertificates /></L> },
          
          // Podcasts
          { path: "podcasts", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/cards", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/list", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/episodes", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/episodes/create", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/episodes/:id", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/episodes/:id/edit", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/episodes/:id/details", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/series", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/series/create", element: <L><SuperAdminPodcasts /></L> },
          { path: "podcasts/series/:id", element: <L><SuperAdminPodcasts /></L> },
          
          // Client Lab
          { path: "client-lab", element: <Navigate to="client-lab/real-world" replace /> },
          { path: "client-lab/cards", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/list", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/create", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/projects", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/projects/create", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/projects/:id", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/projects/:id/edit", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/projects/:id/details", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/clients", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/tasks", element: <L><SuperAdminClientLab /></L> },
          { path: "client-lab/real-world", element: <L><SuperAdminClientLabRealWorld /></L> },
          { path: "client-lab/real-world/submissions", element: <L><SuperAdminClientLabRealWorld /></L> },
          { path: "client-lab/real-world/projects/:id", element: <L><SuperAdminClientLabRealWorld /></L> },
          
          // Internships
          { path: "internships", element: <L><SuperAdminInternships /></L> },
          { path: "internships/cards", element: <L><SuperAdminInternships /></L> },
          { path: "internships/list", element: <L><SuperAdminInternships /></L> },
          { path: "internships/projects", element: <L><SuperAdminInternships /></L> },
          { path: "internships/projects/create", element: <L><SuperAdminInternships /></L> },
          { path: "internships/projects/:id", element: <L><SuperAdminInternships /></L> },
          { path: "internships/projects/:id/edit", element: <L><SuperAdminInternships /></L> },
          { path: "internships/projects/:id/details", element: <L><SuperAdminInternships /></L> },
          { path: "internships/batches", element: <L><SuperAdminInternships /></L> },
          { path: "internships/batches/create", element: <L><SuperAdminInternships /></L> },
          { path: "internships/batches/:id", element: <L><SuperAdminInternships /></L> },
          { path: "internships/applications", element: <L><SuperAdminInternships /></L> },
          { path: "internships/applications/:id", element: <L><SuperAdminInternships /></L> },
          
          // Playground
          { path: "playground", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/cards", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/list", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/templates", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/templates/create", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/templates/:id", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/templates/:id/edit", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/templates/:id/details", element: <L><SuperAdminPlayground /></L> },
          { path: "playground/categories", element: <L><SuperAdminPlayground /></L> },
          
          // Presentations
          { path: "presentations", element: <L><SuperAdminPresentation /></L> },
          { path: "presentations/create", element: <L><SuperAdminPresentation /></L> },
          { path: "presentations/:id", element: <L><SuperAdminPresentation /></L> },
          { path: "presentations/:id/edit", element: <L><SuperAdminPresentation /></L> },
          { path: "presentations/:id/view", element: <L><SuperAdminPresentation /></L> },
          
          // Students Management
          { path: "students", element: <L><SuperAdminStudents /></L> },
          { path: "students/cards", element: <L><SuperAdminStudents /></L> },
          { path: "students/list", element: <L><SuperAdminStudents /></L> },
          { path: "students/create", element: <L><SuperAdminStudents /></L> },
          { path: "students/add", element: <L><SuperAdminStudents /></L> },
          { path: "students/:id", element: <L><SuperAdminStudents /></L> },
          { path: "students/:id/details", element: <L><SuperAdminStudents /></L> },
          { path: "students/:id/edit", element: <L><SuperAdminStudents /></L> },
          { path: "students/:id/enrollments", element: <L><SuperAdminStudents /></L> },
          { path: "students/:id/progress", element: <L><SuperAdminStudents /></L> },
          
          // Mentors Management
          { path: "mentors", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/cards", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/list", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/create", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/add", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/:id", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/:id/details", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/:id/edit", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/:id/students", element: <L><SuperAdminMentors /></L> },
          { path: "mentors/:id/assignments", element: <L><SuperAdminMentors /></L> },
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
          { index: true, element: <L><TenantAdminHome /></L> },
          { path: "settings", element: <L><TenantAdminSettings /></L> },
          { path: "users", element: <L><TenantAdminUsers /></L> },
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
          { index: true, element: <L><MentorHome /></L> },
          
          // Students/Mentees Management
          { path: "students", element: <L><MentorStudents /></L> },
          { path: "students/cards", element: <L><MentorStudents /></L> },
          { path: "students/list", element: <L><MentorStudents /></L> },
          { path: "students/:id", element: <L><MentorStudents /></L> },
          { path: "students/:id/details", element: <L><MentorStudents /></L> },
          { path: "students/:id/progress", element: <L><MentorStudents /></L> },
          
          // Submissions Review
          { path: "submissions", element: <L><MentorSubmissions /></L> },
          { path: "submissions/queue", element: <L><MentorSubmissions /></L> },
          { path: "submissions/list", element: <L><MentorSubmissions /></L> },
          { path: "submissions/:submissionId", element: <L><MentorSubmissions /></L> },
          { path: "submissions/:submissionId/review", element: <L><MentorSubmissions /></L> },
          
          // Communications
          { path: "communications", element: <L><MentorCommunications /></L> },
          { path: "communications/messages", element: <L><MentorCommunications /></L> },
          { path: "communications/alerts", element: <L><MentorCommunications /></L> },
          { path: "communications/notifications", element: <L><MentorCommunications /></L> },
          
          // Calendar
          { path: "calendar", element: <L><MentorCalendar /></L> },
          { path: "calendar/schedule", element: <L><MentorCalendar /></L> },
          { path: "calendar/meetings", element: <L><MentorCalendar /></L> },
          { path: "calendar/availability", element: <L><MentorCalendar /></L> },
          
          // Analytics
          { path: "analytics", element: <L><MentorAnalytics /></L> },
          { path: "analytics/overview", element: <L><MentorAnalytics /></L> },
          { path: "analytics/mentees", element: <L><MentorAnalytics /></L> },
          { path: "analytics/performance", element: <L><MentorAnalytics /></L> },
          { path: "analytics/engagement", element: <L><MentorAnalytics /></L> },
          
          // Client Lab
          { path: "client-lab", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects/list", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects/:projectId", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects/:projectId/details", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects/:projectId/tasks", element: <L><MentorClientLab /></L> },
          { path: "client-lab/projects/:projectId/tasks/:taskId/review", element: <L><MentorClientLab /></L> },
          
          // Internships
          { path: "internships", element: <L><MentorInternships /></L> },
          { path: "internships/assignments", element: <L><MentorInternships /></L> },
          { path: "internships/deliverables", element: <L><MentorInternships /></L> },
          { path: "internships/deliverables/:deliverableId", element: <L><MentorInternships /></L> },
          { path: "internships/deliverables/:deliverableId/review", element: <L><MentorInternships /></L> },
          
          // Resources
          { path: "resources", element: <L><MentorResources /></L> },
          { path: "resources/materials", element: <L><MentorResources /></L> },
          { path: "resources/guides", element: <L><MentorResources /></L> },
          { path: "resources/best-practices", element: <L><MentorResources /></L> },
          
          // Settings
          { path: "settings", element: <L><MentorSettings /></L> },
          { path: "settings/profile", element: <L><MentorSettings /></L> },
          { path: "settings/preferences", element: <L><MentorSettings /></L> },
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
          { index: true, element: <L><StudentHome /></L> },
          
          // Progress
          { path: "progress", element: <L><StudentProgress /></L> },
          { path: "progress/overview", element: <L><StudentProgress /></L> },
          { path: "progress/courses", element: <L><StudentProgress /></L> },
          { path: "progress/achievements", element: <L><StudentProgress /></L> },
          
          // Courses
          { path: "courses", element: <L><StudentCourses /></L> },
          { path: "courses/list", element: <L><StudentCourses /></L> },
          { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug", element: <L><StudentLesson /></L> },
          { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug/complete", element: <L><StudentLesson /></L> },
          
          // Bonus Courses
          { path: "bonus-courses", element: <L><StudentCourses /></L> },
          { path: "bonus-courses/list", element: <L><StudentCourses /></L> },
          
          // Question Bank
          { path: "question-bank", element: <L><StudentQuestionBank /></L> },
          { path: "question-bank/list", element: <L><StudentQuestionBank /></L> },
          { path: "question-bank/practice", element: <L><StudentQuestionBank /></L> },
          
          // Resume Builder
          { path: "resume-builder", element: <L><StudentResumeBuilder /></L> },
          
          // Profile
          { path: "profile", element: <L><StudentProfile /></L> },
          { path: "profile/edit", element: <L><StudentProfile /></L> },
          { path: "profile/settings", element: <L><StudentProfile /></L> },
          
          // Client Lab
          { path: "client-lab", element: <L><StudentClientLab /></L> },
          { path: "client-lab/projects", element: <L><StudentClientLab /></L> },
          { path: "client-lab/projects/:projectId", element: <L><StudentClientLab /></L> },
          { path: "client-lab/projects/:projectId/tasks", element: <L><StudentClientLab /></L> },
          { path: "client-lab/projects/:projectId/tasks/:taskId", element: <L><StudentClientLab /></L> },
          
          // Submissions
          { path: "submissions", element: <L><StudentSubmissions /></L> },
          { path: "submissions/list", element: <L><StudentSubmissions /></L> },
          { path: "submissions/:submissionId", element: <L><StudentSubmissions /></L> },
          
          // Certificates
          { path: "certificates", element: <L><StudentCertificates /></L> },
          { path: "certificates/list", element: <L><StudentCertificates /></L> },
          { path: "certificates/:id", element: <L><StudentCertificates /></L> },
          { path: "certificates/:id/view", element: <L><StudentCertificates /></L> },
          
          // Internships
          { path: "internships", element: <L><StudentInternships /></L> },
          { path: "internships/list", element: <L><StudentInternships /></L> },
          { path: "internships/apply", element: <L><StudentInternships /></L> },
          { path: "internships/:id", element: <L><StudentInternships /></L> },
          { path: "internships/:id/details", element: <L><StudentInternships /></L> },
          { path: "internships/:id/apply", element: <L><StudentInternships /></L> },
          
          // Workshops
          { path: "workshops", element: <L><StudentWorkshops /></L> },
          { path: "workshops/list", element: <L><StudentWorkshops /></L> },
          { path: "workshops/:id", element: <L><StudentWorkshops /></L> },
          { path: "workshops/:id/details", element: <L><StudentWorkshops /></L> },
          { path: "workshops/:id/register", element: <L><StudentWorkshops /></L> },
          
          // Referrals
          { path: "referrals", element: <L><StudentReferrals /></L> },
          { path: "referrals/list", element: <L><StudentReferrals /></L> },
          { path: "referrals/create", element: <L><StudentReferrals /></L> },
          { path: "referrals/:id", element: <L><StudentReferrals /></L> },
        ],
      },
    ],
  },
]);
