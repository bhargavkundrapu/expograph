import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import Button from "./ui/Button";
import { 
  FaChartLine, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaUser,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaRocket
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

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

  const navLinks = [
    { to: "/academy", label: "Academy", icon: FaGraduationCap },
    { to: "/solutions", label: "Solutions", icon: FaRocket },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className={`
                p-2 sm:p-2.5 rounded-xl
                bg-gradient-to-br from-emerald-500 to-teal-600
                shadow-lg shadow-emerald-500/30
                transform transition-all duration-300
                group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-500/40
              `}>
                <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ExpoGraph
                </span>
                <div className="flex items-center gap-1 -mt-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                    Learning Platform
                  </span>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300
                    flex items-center gap-2
                    ${isActive(link.to)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {token ? (
                <>
                  <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <FaUser className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="hidden lg:block">
                      <div className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">
                        {user?.email?.split('@')[0] || 'User'}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">{role}</div>
                    </div>
                  </div>
                  
                  <Link to={`/lms/${role?.toLowerCase() || 'student'}`}>
                    <Button variant="primary" size="sm" icon={FaRocket}>
                      <span className="hidden sm:inline">Dashboard</span>
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={FaSignOutAlt}
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                    className="hidden sm:flex"
                  >
                    <span className="hidden lg:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="sm" icon={FaSignInAlt}>
                    Sign In
                  </Button>
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl">
            <div className="container py-4">
              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-base font-medium
                      transition-all duration-200
                      ${isActive(link.to)
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16 sm:h-20" />
    </>
  );
}
