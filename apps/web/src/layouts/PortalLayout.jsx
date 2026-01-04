import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { homePathForRole } from "../app/roles";
import { 
  FaHome, 
  FaBook, 
  FaChartBar, 
  FaFileAlt, 
  FaCog, 
  FaClipboardList,
  FaUser,
  FaEnvelope
} from "react-icons/fa";

const iconMap = {
  "Dashboard": FaHome,
  "Content Admin": FaBook,
  "Courses": FaBook,
  "Progress": FaChartBar,
  "My Submissions": FaFileAlt,
  "Submissions Queue": FaClipboardList,
  "Tenant Settings": FaCog,
};

function LinkWithIcon({ to, label, icon: Icon, end }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => [
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 group",
        isActive 
          ? "bg-gradient-to-r from-white to-gray-200 text-black shadow-lg shadow-white/20" 
          : "text-gray-300 border border-transparent hover:border-gray-700 hover:bg-gray-900 hover:text-white",
      ].join(" ")}
      end={end}
    >
      {({ isActive }) => (
        <>
          <Icon className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function PortalLayout() {
  const { role, user } = useAuth();

  const base = homePathForRole(role);

  // Basic nav per role (we expand later)
  const navItems = (() => {
    if (role === "SuperAdmin") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/content`, label: "Content Admin" },
      ];
    }
    if (role === "TenantAdmin") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/settings`, label: "Tenant Settings" },
      ];
    }
    if (role === "Mentor") {
      return [
        { to: `${base}`, label: "Dashboard" },
        { to: `${base}/submissions`, label: "Submissions Queue" },
      ];
    }
    return [
      { to: `${base}`, label: "Dashboard" },
      { to: `${base}/courses`, label: "Courses" },
      { to: `${base}/progress`, label: "Progress" },
      { to: `${base}/submissions`, label: "My Submissions" },
    ];
  })();

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-black via-gray-900 to-black position-relative">
      <div className="container layout-grid gap-lg" style={{ paddingTop: '2rem', paddingBottom: '2rem', gridTemplateColumns: 'minmax(280px, 300px) 1fr' }}>
        <aside className="rounded-xl bg-gray-900 border border-gray-800 p-6 shadow-glow animate-slideIn position-sticky" style={{ top: '100px', height: 'fit-content', maxHeight: 'calc(100vh - 120px)' }}>
          <div className="margin-section-sm" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="layout-flex items-center gap-2 margin-section-sm">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                <FaUser className="text-white text-sm" />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">Logged in as</div>
                <div className="font-bold text-lg text-white section-title">{role}</div>
              </div>
            </div>
            <div className="layout-flex items-center gap-2 text-xs text-gray-400">
              <FaEnvelope className="text-cyan-400" />
              <span className="truncate">{user?.email}</span>
            </div>
          </div>

          <nav className="layout-flex-col gap-sm">
            {navItems.map((i) => {
              const Icon = iconMap[i.label] || FaHome;
              return (
                <LinkWithIcon 
                  key={i.to} 
                  to={i.to} 
                  label={i.label} 
                  icon={Icon}
                  end
                />
              );
            })}
          </nav>
        </aside>

        <section className="rounded-xl bg-gray-900/50 border border-gray-800 p-8 shadow-glow animate-fadeIn overflow-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
