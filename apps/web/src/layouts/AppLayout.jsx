import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { FaSignOutAlt, FaUser, FaChartLine } from "react-icons/fa";
import Button from "../Components/ui/Button";

export default function AppLayout() {
  const { user, role, logout } = useAuth();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 position-relative overflow-hidden">
      <div className="position-sticky top-0 z-50 border-b border-green-200 bg-white shadow-soft">
        <div className="container layout-flex flex-col sm:flex-row items-center justify-between gap-4" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <Link 
            to="/academy" 
            className="section-hero text-lg sm:text-xl font-bold layout-flex items-center gap-2"
          >
            <FaChartLine className="text-green-600" />
            <span className="text-green-700">
              ExpoGraph LMS
            </span>
          </Link>

          <div className="layout-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="layout-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-green-50 border border-green-200">
              <FaUser className="text-green-600" />
              <div className="layout-flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{user?.email || "user"}</span>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-green-700">{role || "role"}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={FaSignOutAlt}
              onClick={onLogout}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Logout</span>
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
