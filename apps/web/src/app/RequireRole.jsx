import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { homePathForRole } from "./roles";
import { RouteFallbackSkeleton } from "../Components/common/SkeletonLoaders";

export default function RequireRole({ allow, children }) {
  const { status, role } = useAuth();

  if (status === "loading") {
    return <RouteFallbackSkeleton />;
  }

  if (status !== "authed") {
    return <Navigate to="/login" replace />;
  }

  if (allow && !allow.includes(role)) {
    // ✅ premium behavior: if logged in but wrong page, redirect to correct home
    return <Navigate to={homePathForRole(role)} replace />;
  }

  return children;
}
