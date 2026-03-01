import { useState, useRef, useEffect } from "react";
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
  FiChevronRight,
  FiHelpCircle,
} from "react-icons/fi";

export default function StudentLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  const allMenuItems = [
    { path: "/lms/student", label: "Home", icon: FiHome },
    { path: "/lms/student/courses", label: "Courses", icon: FiBookOpen },
    { path: "/lms/student/bonus-courses", label: "Bonus Courses", icon: FiFileText },
    { path: "/lms/student/client-lab", label: "Client Lab", icon: FiBriefcase },
    { path: "/lms/student/resume-builder", label: "Resume Builder", icon: FiAward },
    { path: "/lms/student/contact", label: "Support", icon: FiHelpCircle },
  ];

  const mobileBottomItems = [
    { path: "/lms/student", label: "Home", icon: FiHome },
    { path: "/lms/student/courses", label: "Courses", icon: FiBookOpen },
    { path: "/lms/student/bonus-courses", label: "Bonus", icon: FiFileText },
    { path: "/lms/student/resume-builder", label: "Resume", icon: FiAward },
  ];

  const isActive = (path) => {
    if (path === "/lms/student") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const isLessonPage = location.pathname.match(/\/lms\/student\/courses\/.+\/modules\/.+\/lessons\/.+/);
  const isWhiteBgPage = location.pathname === "/lms/student/contact";

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  useEffect(() => { setProfileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#000000");
    return () => { if (meta) meta.setAttribute("content", "#000000"); };
  }, []);

  if (isLessonPage) {
    return <Outlet />;
  }

  const userName = user?.fullName || user?.full_name || user?.name || "Student";
  const userEmail = user?.email || "";
  const userPhone = user?.phone || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* ── Mobile Top Bar ── */}
      <header className="sticky top-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/lms/student"><img src="/1.png" alt="ExpoGraph" className="h-7 w-auto object-contain flex-shrink-0 max-w-[100px]" /></Link>

          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-800/70 border border-slate-700/50 rounded-xl text-slate-400 text-sm"
          >
            <FiSearch className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Search courses, lessons...</span>
          </button>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-slate-700 active:scale-95 transition-transform"
            >
              {userInitial}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-64 bg-slate-800 border border-slate-700/70 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                >
                  <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold text-sm truncate">{userName}</p>
                        {userEmail && <p className="text-slate-400 text-xs truncate">{userEmail}</p>}
                        {userPhone && <p className="text-slate-400 text-xs truncate">{userPhone}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/lms/student/profile"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors text-sm"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>My Profile</span>
                      <FiChevronRight className="w-4 h-4 ml-auto text-slate-500" />
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/lms/student/contact"); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors text-sm"
                    >
                      <FiHelpCircle className="w-4 h-4" />
                      <span>Contact Us</span>
                      <FiChevronRight className="w-4 h-4 ml-auto text-slate-500" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100dvh-52px)] md:h-screen overflow-hidden">
        {/* ── Desktop Sidebar ── */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarCollapsed ? "80px" : "280px" }}
          className="hidden md:flex fixed md:static inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-900 flex-col transition-all duration-300 ease-in-out w-64"
        >
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-900">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center">
                  <img src="/1.png" alt="ExpoGraph" className="h-18 m-4 mt-8 w-64 object-contain object-left" />
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                  <img src="/e^x.png" alt="ExpoGraph" className="h-9 w-9 object-contain" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiChevronLeft className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="px-4 pt-4 pb-4 border-b border-slate-900">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                  <button type="button" onClick={() => setSearchModalOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors" title="Search">
                    <FiSearch className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-2 sidebar-scrollbar">
            <div className="space-y-1">
              {allMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${active ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-2 border-blue-500" : "text-slate-300 hover:text-white hover:bg-slate-700/30"}`}
                    title={sidebarCollapsed ? item.label : ""}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-blue-400" : ""}`} />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-slate-900 p-4">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                      {userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{userName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-colors text-sm" onClick={() => navigate("/lms/student/profile")}>
                      <FiUser className="w-4 h-4" /><span>Profile</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-700/30 transition-colors text-sm" onClick={handleLogout}>
                      <FiLogOut className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                    {userInitial}
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-700/30 transition-colors" onClick={handleLogout} title="Logout">
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>

        <StudentSearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} token={token} />

        {/* ── Main Content ── */}
        <div className={`flex-1 flex flex-col overflow-hidden lg:rounded-tl-lg shadow-xl relative z-10 ${isWhiteBgPage ? "bg-white" : "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"}`}>
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-0 lg:rounded-tl-lg min-h-0">
            <div className={`min-h-full lg:rounded-tl-lg overflow-hidden ${isWhiteBgPage ? "bg-white" : "bg-transparent"}`}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* ── Mobile Bottom Navigation (4 items) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-1.5">
          {mobileBottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 rounded-xl min-w-0 transition-all duration-200 ${active ? "text-blue-400" : "text-slate-500 active:text-slate-300"}`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${active ? "text-blue-400" : ""}`} />
                  {active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />}
                </div>
                <span className={`text-[10px] font-medium leading-tight ${active ? "text-blue-400" : ""}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
