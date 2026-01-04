import { Outlet, Link, NavLink } from "react-router-dom";
import { FaGraduationCap, FaCode, FaSignInAlt, FaChartLine } from "react-icons/fa";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white position-relative overflow-hidden">
      <header className="position-sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md shadow-glow">
        <div className="container layout-flex items-center justify-between" style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>
          <Link 
            to="/academy" 
            className="section-hero text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300 layout-flex items-center gap-2 group"
          >
            <FaChartLine className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ExpoGraph
            </span>
          </Link>

          <nav className="layout-flex items-center gap-4 text-sm font-medium">
            <NavLink
              to="/academy"
              className={({ isActive }) =>
                `layout-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-black shadow-lg shadow-white/20" 
                    : "text-gray-300 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              <FaGraduationCap className="text-sm" />
              Academy
            </NavLink>
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                `layout-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-black shadow-lg shadow-white/20" 
                    : "text-gray-300 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              <FaCode className="text-sm" />
              IT Solutions
            </NavLink>

            <Link
              to="/login"
              className="layout-flex items-center gap-2 bg-gradient-to-r from-white to-gray-200 text-black px-5 py-2.5 font-semibold rounded-lg hover:from-gray-200 hover:to-white hover:shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <FaSignInAlt />
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container margin-section animate-fadeIn" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      <footer className="border-t border-gray-800 py-10 bg-gray-900/50 margin-section-lg">
        <div className="container layout-flex items-center justify-center gap-2 text-sm text-gray-400">
          <FaChartLine className="text-cyan-400" />
          <span>© {new Date().getFullYear()} ExpoGraph Tech Solution Pvt Ltd</span>
        </div>
      </footer>
    </div>
  );
}
