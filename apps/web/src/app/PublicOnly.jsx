import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { homePathForRole } from "./roles";

export default function PublicOnly({ children }) {
  const { status, role } = useAuth();

  // if already logged in, bounce away
  if (status === "authed") {
    return <Navigate to={homePathForRole(role)} replace />;
  }

  return children;
}
