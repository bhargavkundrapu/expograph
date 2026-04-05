import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiHeart, FiLayout, FiMap, FiTool, FiShield, FiUser } from "react-icons/fi";
import { useState } from "react";
import FounderGuideSheet from "./FounderGuideSheet";

const nav = [
  { to: "/lms/startup-launchpad", end: true, label: "Home", icon: FiGrid },
  { to: "/lms/startup-launchpad/readiness", label: "Readiness", icon: FiHeart },
  { to: "/lms/startup-launchpad/dashboard", label: "Dashboard", icon: FiLayout },
  { to: "/lms/startup-launchpad/path", label: "Path", icon: FiMap },
  { to: "/lms/startup-launchpad/tools", label: "Tools", icon: FiTool },
  { to: "/lms/startup-launchpad/legal", label: "Legal", icon: FiShield },
  { to: "/lms/startup-launchpad/profile", label: "Profile", icon: FiUser },
];

function ShellInner() {
  const navigate = useNavigate();
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/lms/student")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 min-h-[44px] min-w-[44px] justify-center rounded-xl hover:bg-slate-100 -ml-1 shrink-0"
            aria-label="Back to student home"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">LMS</span>
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-violet-700 uppercase truncate">Startup LaunchPad</p>
            <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">Your startup path, in the right order</p>
          </div>
          <button
            type="button"
            onClick={() => setGuideOpen(true)}
            className="shrink-0 min-h-[44px] px-3 sm:px-4 rounded-xl border border-violet-300 bg-violet-50 text-sm font-medium text-violet-800 hover:bg-violet-100 shadow-sm"
          >
            Ask Founder Guide
          </button>
        </div>
        <nav
          className="max-w-6xl mx-auto px-2 sm:px-4 mt-3 sm:mt-4 pt-0.5 pb-2 overflow-x-auto flex gap-1 scrollbar-none"
          aria-label="LaunchPad sections"
        >
          {nav.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium min-h-[40px] transition whitespace-nowrap ${
                  isActive
                    ? "bg-violet-100 text-violet-900 ring-1 ring-violet-300 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="w-4 h-4 opacity-90" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 pb-28 md:pb-10">
        <Outlet context={{ openGuide: () => setGuideOpen(true) }} />
      </main>

      <FounderGuideSheet open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}

export default function StartupLaunchPadShell() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <ShellInner />
    </div>
  );
}
