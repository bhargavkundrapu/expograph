import { Outlet, Link, NavLink } from "react-router-dom";
import { FaGraduationCap, FaCode, FaSignInAlt, FaChartLine } from "react-icons/fa";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 position-relative overflow-hidden">
      <header className="position-sticky top-0 z-50 border-b border-green-200 bg-white shadow-soft">
        <div className="container layout-flex flex-col sm:flex-row items-center justify-between gap-4" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <Link 
            to="/academy" 
            className="section-hero text-xl sm:text-2xl font-bold tracking-tight layout-flex items-center gap-2"
          >
            <FaChartLine className="text-green-600" />
            <span className="text-green-700">
              ExpoGraph
            </span>
          </Link>

          <nav className="layout-flex flex-wrap items-center gap-2 sm:gap-4 text-sm font-medium">
            <NavLink
              to="/academy"
              className={({ isActive }) =>
                `layout-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg ${
                  isActive 
                    ? "bg-green-600 text-white shadow-medium" 
                    : "text-gray-700 bg-white border border-green-200"
                }`
              }
            >
              <FaGraduationCap className="text-sm" />
              <span className="hidden sm:inline">Academy</span>
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                `layout-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg ${
                  isActive 
                    ? "bg-green-600 text-white shadow-medium" 
                    : "text-gray-700 bg-white border border-green-200"
                }`
              }
            >
              <FaCode className="text-sm" />
              <span className="hidden sm:inline">IT Solutions</span>
            </NavLink>

            <Link
              to="/login"
              className="layout-flex items-center gap-2 bg-green-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 font-semibold rounded-lg shadow-medium active:scale-95"
            >
              <FaSignInAlt />
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Login</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container margin-section animate-fadeIn" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      <footer className="border-t border-green-200 py-8 sm:py-10 bg-green-50 margin-section-lg">
        <div className="container layout-flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
          <FaChartLine className="text-green-600" />
          <span>© {new Date().getFullYear()} ExpoGraph Tech Solution Pvt Ltd</span>
        </div>
      </footer>
    </div>
  );
}
