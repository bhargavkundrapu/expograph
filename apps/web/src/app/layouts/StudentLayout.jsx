import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../providers/AuthProvider";
import { apiFetch } from "../../services/api";
import {
  FiHome,
  FiBookOpen,
  FiFileText,
  FiBriefcase,
  FiUser,
  FiSearch,
  FiChevronLeft,
  FiLogOut,
  FiChevronRight,
  FiAward,
  FiX,
} from "react-icons/fi";

export default function StudentLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  const fetchSearch = useCallback(async (q) => {
    if (!token || !q || q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await apiFetch(`/api/v1/student/search?q=${encodeURIComponent(q.trim())}`, { token });
      setSearchResults(res?.data || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(() => fetchSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery, fetchSearch]);


  const handleSearchSelect = (item) => {
    setSearchQuery("");
    setSearchResults([]);
    if (item.type === "lesson" && item.courseSlug && item.moduleSlug && item.lessonSlug) {
      navigate(`/lms/student/courses/${item.courseSlug}/modules/${item.moduleSlug}/lessons/${item.lessonSlug}`);
    } else if (item.type === "course" && item.courseSlug) {
      navigate(`/lms/student/courses?course=${item.courseSlug}`);
    } else if (item.type === "module" && item.courseSlug) {
      navigate(`/lms/student/courses?course=${item.courseSlug}`);
    } else {
      navigate("/lms/student/courses");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      searchInputRef.current?.blur();
    } else if (e.key === "Enter" && searchResults.length > 0) {
      handleSearchSelect(searchResults[0]);
    } else if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/lms/student/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const showSearchDropdown = searchQuery.trim().length >= 2 && (searchResults.length > 0 || searchLoading);

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

          {/* Search */}
          <div className="px-4 pt-4 pb-4 border-b border-slate-900 relative" ref={searchDropdownRef}>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search courses, modules, lessons..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setSearchResults([]); searchInputRef.current?.focus(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-700/50"
                      aria-label="Clear search"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                  <AnimatePresence>
                    {showSearchDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute left-0 right-0 top-full mt-1 z-50 max-h-72 overflow-y-auto rounded-lg bg-slate-800 border border-slate-700 shadow-xl"
                      >
                        {searchLoading ? (
                          <div className="px-4 py-6 text-center text-slate-400 text-sm">Searching...</div>
                        ) : (
                          <ul className="py-2">
                            {searchResults.map((item, idx) => (
                              <li key={`${item.type}-${item.id}-${idx}`}>
                                <button
                                  type="button"
                                  onClick={() => handleSearchSelect(item)}
                                  className="w-full px-4 py-2.5 text-left hover:bg-slate-700/70 flex flex-col gap-0.5 transition-colors"
                                >
                                  <span className="text-slate-200 font-medium text-sm truncate">{item.title}</span>
                                  {item.subtitle && (
                                    <span className="text-slate-500 text-xs truncate flex items-center gap-1">
                                      {item.type === "course" && <FiBookOpen className="w-3 h-3 flex-shrink-0" />}
                                      {item.type === "module" && <span className="text-sky-400">Module</span>}
                                      {item.type === "lesson" && <span className="text-emerald-400">Lesson</span>}
                                      {item.subtitle}
                                    </span>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                    onClick={() => { setSidebarCollapsed(false); setTimeout(() => searchInputRef.current?.focus(), 100); }}
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
        </nav>
      )}
    </div>
  );
}
