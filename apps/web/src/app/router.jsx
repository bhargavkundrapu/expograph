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
        // next page we will create: content admin
        // { path: "content", element: <SuperAdminContent /> },
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
      ],
    },
  ],
},


]);
