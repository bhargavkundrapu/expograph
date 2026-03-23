import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { homePathForRole } from "./roles";
import { useTheme } from "./providers/ThemeProvider";

export default function RequireRole({ allow, children }) {
  const { status, role } = useAuth();
  const { isDark } = useTheme();

  if (status === "loading") {
    return (
      <div
        className={
          "min-h-screen flex flex-col items-center justify-center p-6 text-center " +
          (isDark
            ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
            : "bg-slate-50")
        }
      >
        <div className="w-12 h-12 rounded-full border-4 border-slate-200/40 border-t-blue-400 animate-spin mb-4" />
        <p className={isDark ? "text-slate-200/90" : "text-slate-600"}>Loading...</p>
      </div>
    );
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
