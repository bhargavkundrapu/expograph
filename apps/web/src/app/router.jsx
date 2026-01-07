import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import RequireRole from "./RequireRole";

import AcademyPage from "../pages/academy/AcademyPage";
import SolutionsPage from "../pages/solutions/SolutionsPage";
import LoginPage from "../pages/auth/LoginPage";

import SuperAdminHome from "../pages/lms/superadmin/SuperAdminHome";
import TenantAdminHome from "../pages/lms/admin/TenantAdminHome";
import MentorHome from "../pages/lms/mentor/MentorHome";
import StudentHome from "../pages/lms/student/StudentHome";
import PublicOnly from "./PublicOnly";
import PortalLayout from "../layouts/PortalLayout";
import SuperAdminContent from "../pages/lms/superadmin/SuperAdminContent";
import SuperAdminCourseBuilder from "../pages/lms/superadmin/SuperAdminCourseBuilder";
import SuperAdminModuleLessons from "../pages/lms/superadmin/SuperAdminModuleLessons";
import SuperAdminLessonEditor from "../pages/lms/superadmin/SuperAdminLessonEditor";
import SuperAdminLessonResources from "../pages/lms/superadmin/SuperAdminLessonResources";
import SuperAdminLeads from "../pages/lms/superadmin/SuperAdminLeads";
import SuperAdminWorkshops from "../pages/lms/superadmin/SuperAdminWorkshops";
import SuperAdminCertificates from "../pages/lms/superadmin/SuperAdminCertificates";
import SuperAdminFeatureFlags from "../pages/lms/superadmin/SuperAdminFeatureFlags";
import SuperAdminClientLab from "../pages/lms/superadmin/SuperAdminClientLab";
import SuperAdminInternships from "../pages/lms/superadmin/SuperAdminInternships";
import SuperAdminAnalytics from "../pages/lms/superadmin/SuperAdminAnalytics";
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

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <AcademyPage /> },
      { path: "/academy", element: <AcademyPage /> },
      { path: "/solutions", element: <SolutionsPage /> },
      { path: "/login", element: <PublicOnly><LoginPage /></PublicOnly> },

    ],
  },
  {
  element: <AppLayout />,
  children: [
    {
      path: "/lms/superadmin",
      element: (
        <RequireRole allow={["SuperAdmin"]}>
          <PortalLayout />
        </RequireRole>
      ),
      children: [
        { index: true, element: <SuperAdminHome /> },
        { path: "content", element: <SuperAdminContent /> },
        { path: "content/:courseId", element: <SuperAdminCourseBuilder /> },
        { path: "content/:courseId/modules/:moduleId", element: <SuperAdminModuleLessons /> },
        { path: "content/:courseId/lessons/:lessonId", element: <SuperAdminLessonEditor /> },
        { path: "content/:courseId/lessons/:lessonId/resources", element: <SuperAdminLessonResources /> },
        { path: "analytics", element: <SuperAdminAnalytics /> },
        { path: "leads", element: <SuperAdminLeads /> },
        { path: "workshops", element: <SuperAdminWorkshops /> },
        { path: "certificates", element: <SuperAdminCertificates /> },
        { path: "internships", element: <SuperAdminInternships /> },
        { path: "client-lab", element: <SuperAdminClientLab /> },
        { path: "feature-flags", element: <SuperAdminFeatureFlags /> },
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
