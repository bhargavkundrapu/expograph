import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../providers/AuthProvider";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiUserCheck,
  FiCalendar,
  FiRadio,
  FiAward,
  FiCode,
  FiFileText,
  FiBriefcase,
  FiLayers,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function SuperAdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/lms/superadmin", label: "Home", icon: FiHome },
    { path: "/lms/superadmin/students", label: "Students", icon: FiUsers },
    { path: "/lms/superadmin/courses", label: "Courses", icon: FiBook },
    { path: "/lms/superadmin/mentors", label: "Mentors", icon: FiUserCheck },
    { path: "/lms/superadmin/workshops", label: "Events", icon: FiCalendar },
    { path: "/lms/superadmin/podcasts", label: "Podcast Updates", icon: FiRadio },
    { path: "/lms/superadmin/certificates", label: "Certificates", icon: FiAward },
    { path: "/lms/superadmin/playground", label: "Playground", icon: FiCode },
    { path: "/lms/superadmin/presentations", label: "Presentations", icon: FiFileText },
    { path: "/lms/superadmin/client-lab", label: "Real World Lab", icon: FiBriefcase },
    { path: "/lms/superadmin/internships", label: "Internships", icon: FiLayers },
  ];

  const isActive = (path) => {
    if (path === "/lms/superadmin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? "80px" : "280px",
          }}
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
            border-r border-slate-900
            flex flex-col
            transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Logo Section - 1.png for sidebar (dark bg), e^x.png for collapsed icon */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-700/50">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center"
                >
                  <img src="/1.png" alt="ExpoGraph" className="h-10 w-44 object-contain object-left" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <img src="/e^x.png" alt="ExpoGraph" className="h-9 w-9 object-contain" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:flex hidden items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiChevronLeft
                className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-4 border-b border-slate-700/50">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
                    title="Search"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 sidebar-scrollbar">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      group relative flex items-center gap-3 px-3 py-2.5 rounded-md
                      transition-all duration-200
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-2 border-blue-500"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/30"
                      }
                    `}
                    title={sidebarCollapsed ? item.label : ""}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-blue-400" : ""}`} />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium text-sm"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {active && !sidebarCollapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-md -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Profile Section */}
          <div className="border-t border-slate-700/50 p-4">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {user?.name || "Super Admin"}
                      </p>
                      <p className="text-slate-400 text-xs">Super Admin</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors text-sm"
                      onClick={() => navigate("/lms/superadmin/settings")}
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-700/30 transition-colors text-sm"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-700/30 transition-colors"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:rounded-tl-lg bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-xl relative z-10">
          {/* Mobile Header */}
          <div className="lg:hidden h-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 flex items-center justify-between px-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FiMenu className="w-6 h-6 text-slate-700" />
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ExpoGraph
            </div>
            <div className="w-10" />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto premium-scrollbar">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
