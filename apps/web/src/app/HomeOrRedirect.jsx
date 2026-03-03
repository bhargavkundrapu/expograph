import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import AcademyPage from "../pages/academy/AcademyPage";

/**
 * For PWA: when user is logged in and opens the app (root or academy),
 * redirect them directly to their LMS portal instead of showing Academy.
 * Guest users see the Academy landing page.
 */
export default function HomeOrRedirect() {
  const { token, role, status } = useAuth();

  // While auth is loading, show Academy briefly (avoids flash)
  if (status === "loading") {
    return <AcademyPage />;
  }

  // Logged in: send to their portal
  if (token && role) {
    const roleLower = String(role).toLowerCase();
    if (roleLower === "superadmin") return <Navigate to="/lms/superadmin" replace />;
    if (roleLower === "mentor") return <Navigate to="/lms/mentor" replace />;
    if (roleLower === "tenantadmin") return <Navigate to="/lms/admin" replace />;
    if (roleLower === "student") return <Navigate to="/lms/student" replace />;
  }

  return <AcademyPage />;
}
