import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../providers/AuthProvider";
import StudentSearchModal from "../../Components/student/StudentSearchModal";
import {
  FiHome,
  FiBookOpen,
  FiFileText,
  FiBriefcase,
  FiUser,
  FiSearch,
  FiChevronLeft,
  FiLogOut,
  FiAward,
} from "react-icons/fi";

export default function StudentLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  // Student-specific menu items - Home, Courses, Bonus Courses, Client Lab, Resume Builder
  const menuItems = [
    { path: "/lms/student", label: "Home", icon: FiHome },
    { path: "/lms/student/courses", label: "Courses", icon: FiBookOpen },
    { path: "/lms/student/bonus-courses", label: "Bonus Courses", icon: FiFileText },
    { path: "/lms/student/client-lab", label: "Client Lab", icon: FiBriefcase },
    { path: "/lms/student/resume-builder", label: "Resume Builder", icon: FiAward },
  ];

  const isActive = (path) => {
    if (path === "/lms/student") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Check if we're on a lesson page (hide main sidebar on lesson pages)
  const isLessonPage = location.pathname.match(/\/lms\/student\/courses\/.+\/modules\/.+\/lessons\/.+/);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // On lesson page, render only the lesson (demo sidebar + content) - no layout wrapper
  if (isLessonPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - visible on medium+ devices */}
        {(
          <motion.aside
            initial={false}
            animate={{
              width: sidebarCollapsed ? "80px" : "280px",
            }}
            className={`
              hidden md:flex fixed md:static inset-y-0 left-0 z-50
              bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
              border-r border-slate-900
              flex flex-col
              transition-all duration-300 ease-in-out
              w-64
            `}
          >
          {/* Logo Section - 1.png for sidebar (dark bg), e^x.png for collapsed icon */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-900">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center"
                >
                  <img src="/1.png" alt="ExpoGraph" className="h-18 m-4 mt-8 w-64 object-contain object-left" />
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
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiChevronLeft
                className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Search - opens popup modal */}
          <div className="px-4 pt-4 pb-4 border-b border-slate-900">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setSearchModalOpen(true)}
                    className="w-full flex items-center gap-3 pl-3 pr-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all text-left"
                  >
                    <FiSearch className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">Search courses, modules...</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setSearchModalOpen(true)}
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
                      ${active
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-2 border-blue-500"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/30"}
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
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Profile Section */}
          <div className="border-t border-slate-900 p-4">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {(user?.fullName || user?.full_name || user?.name)?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {user?.fullName || user?.full_name || user?.name || "Student"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors text-sm"
                      onClick={() => navigate("/lms/student/profile")}
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
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
                    {(user?.fullName || user?.full_name || user?.name || "Student")?.charAt(0)?.toUpperCase()}
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
        )}

          <StudentSearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} token={token} />

          {/* Main Content - main has same top-left radius so scroll content clips correctly */}
          <div className="flex-1 flex flex-col overflow-hidden lg:rounded-tl-lg bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-xl relative z-10">
            <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-0 lg:rounded-tl-lg min-h-0">
              <div className="min-h-full lg:rounded-tl-lg overflow-hidden bg-transparent">
                <Outlet />
              </div>
            </main>
          </div>
      </div>

      {/* Bottom Navigation Bar - Visible only on small devices */}
      {!isLessonPage && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 border-t border-slate-900 flex md:hidden items-center justify-around px-1 sm:px-2 py-2 shadow-2xl safe-area-pb">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg flex-1 min-w-0
                  transition-all duration-200
                  ${active ? "text-blue-400 bg-gradient-to-r from-blue-600/20 to-purple-600/20" : "text-slate-400 hover:text-white hover:bg-slate-700/30"}
                `}
                title={item.label}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${active ? "text-blue-400" : ""}`} />
                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight truncate w-full">{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg flex-1 min-w-0 text-slate-400 hover:text-white hover:bg-slate-700/30 transition-all duration-200"
            title="Search"
          >
            <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-center leading-tight truncate w-full">Search</span>
          </button>
        </nav>
      )}
    </div>
  );
}
