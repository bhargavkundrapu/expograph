import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";

export default function AppLayout() {
  const { user, role, logout } = useAuth();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/academy" className="font-semibold">
            ExpoGraph LMS
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-300">
              {user?.email || "user"} • {role || "role"}
            </span>
            <button
              onClick={onLogout}
              className="rounded-lg border border-slate-700 px-3 py-1.5 hover:bg-slate-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
