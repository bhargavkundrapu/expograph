import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { FaSignOutAlt, FaUser, FaChartLine } from "react-icons/fa";
import Button from "../components/ui/Button";

export default function AppLayout() {
  const { user, role, logout } = useAuth();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white position-relative overflow-hidden">
      <div className="position-sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md shadow-glow">
        <div className="container layout-flex items-center justify-between" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <Link 
            to="/academy" 
            className="section-hero text-xl font-bold hover:scale-105 transition-transform duration-300 layout-flex items-center gap-2 group"
          >
            <FaChartLine className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ExpoGraph LMS
            </span>
          </Link>

          <div className="layout-flex items-center gap-4">
            <div className="layout-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
              <FaUser className="text-cyan-400" />
              <span className="text-sm text-gray-300">
                <span className="text-white font-semibold">{user?.email || "user"}</span>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-cyan-400">{role || "role"}</span>
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={FaSignOutAlt}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="container margin-section animate-fadeIn" style={{ minHeight: 'calc(100vh - 150px)' }}>
        <Outlet />
      </main>
    </div>
  );
}
