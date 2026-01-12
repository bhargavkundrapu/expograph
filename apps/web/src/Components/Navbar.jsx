import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../app/providers/AuthProvider";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineAcademicCap,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";

export default function Navbar() {
  const { token, user, role, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/academy", label: "Academy" },
    { to: "/solutions", label: "Solutions" },
  ];

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    logout();
    setMobileMenuOpen(false);
  }

  // Get dashboard link based on role
  const getDashboardLink = () => {
    switch (role) {
      case "SuperAdmin":
        return "/lms/superadmin";
      case "TenantAdmin":
        return "/lms/admin";
      case "Mentor":
        return "/lms/mentor";
      case "Student":
        return "/lms/student";
      default:
        return "/lms/student";
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'fixed' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-academy">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25"
              >
                <HiOutlineAcademicCap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  ExpoGraph
                </span>
                <div className="text-xs text-gray-500 hidden sm:block">
                  Learning Platform
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <div className="flex items-center gap-4">
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                  >
                    <HiOutlineUser className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">{user?.email || "User"}</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/25"
                  >
                    <HiOutlineLogin className="w-4 h-4" />
                    Login
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenuAlt3 className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-[#0f0f1a] border-l border-white/10 p-6 md:hidden"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive(link.to)
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                {token ? (
                  <div className="space-y-4">
                    <div className="px-4 py-3 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400">Signed in as</div>
                      <div className="text-white font-medium truncate">{user?.email}</div>
                      <div className="text-xs text-purple-400 mt-1">{role}</div>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-lg bg-purple-500/20 text-purple-300 font-medium text-center"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-center"
                  >
                    Login
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
