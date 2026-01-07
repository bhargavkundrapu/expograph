import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { homePathForRole } from "../app/roles";
import { useFeatureFlags } from "../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../utils/featureFlags";
import { 
  FaHome, 
  FaBook, 
  FaChartBar, 
  FaFileAlt, 
  FaCog, 
  FaClipboardList,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaCertificate,
  FaBriefcase,
  FaLaptopCode,
  FaFlag
} from "react-icons/fa";

const iconMap = {
  "Dashboard": FaHome,
  "Content Admin": FaBook,
  "Courses": FaBook,
  "Progress": FaChartBar,
  "My Submissions": FaFileAlt,
  "Submissions Queue": FaClipboardList,
  "Tenant Settings": FaCog,
  "Analytics": FaChartBar,
  "Leads": FaEnvelope,
  "Workshops": FaGraduationCap,
  "Certificates": FaCertificate,
  "Internships": FaBriefcase,
  "Client Lab": FaLaptopCode,
  "Feature Flags": FaFlag,
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
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();

  const base = homePathForRole(role);

  // Basic nav per role - all controlled by feature flags
  const navItems = (() => {
    if (role === "SuperAdmin") {
      const items = [
        { to: `${base}`, label: "Dashboard", flag: null }, // Dashboard always visible
      ];
      
      // All SuperAdmin features controlled by feature flags
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CONTENT)) {
        items.push({ to: `${base}/content`, label: "Content Admin", flag: FEATURE_FLAGS.SUPERADMIN_CONTENT });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_ANALYTICS)) {
        items.push({ to: `${base}/analytics`, label: "Analytics", flag: FEATURE_FLAGS.SUPERADMIN_ANALYTICS });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_LEADS)) {
        items.push({ to: `${base}/leads`, label: "Leads", flag: FEATURE_FLAGS.SUPERADMIN_LEADS });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_WORKSHOPS)) {
        items.push({ to: `${base}/workshops`, label: "Workshops", flag: FEATURE_FLAGS.SUPERADMIN_WORKSHOPS });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CERTIFICATES)) {
        items.push({ to: `${base}/certificates`, label: "Certificates", flag: FEATURE_FLAGS.SUPERADMIN_CERTIFICATES });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_INTERNSHIPS, "micro_internships", "internships", "micro_internship")) {
        items.push({ to: `${base}/internships`, label: "Internships", flag: FEATURE_FLAGS.SUPERADMIN_INTERNSHIPS });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CLIENT_LAB)) {
        items.push({ to: `${base}/client-lab`, label: "Client Lab", flag: FEATURE_FLAGS.SUPERADMIN_CLIENT_LAB });
      }
      // Feature Flags always visible for SuperAdmin
      items.push({ to: `${base}/feature-flags`, label: "Feature Flags", flag: null });
      
      return items;
    }
    
    if (role === "TenantAdmin") {
      const items = [
        { to: `${base}`, label: "Dashboard", flag: null },
      ];
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_SETTINGS)) {
        items.push({ to: `${base}/settings`, label: "Tenant Settings", flag: FEATURE_FLAGS.TENANT_ADMIN_SETTINGS });
      }
      return items;
    }
    
    if (role === "Mentor") {
      const items = [
        { to: `${base}`, label: "Dashboard", flag: null },
      ];
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_SUBMISSIONS)) {
        items.push({ to: `${base}/submissions`, label: "Submissions Queue", flag: FEATURE_FLAGS.MENTOR_SUBMISSIONS });
      }
      return items;
    }
    
    // Student navigation - all controlled by feature flags
    const studentNav = [
      { to: `${base}`, label: "Dashboard", flag: null }, // Dashboard always visible
    ];
    
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_COURSES)) {
      studentNav.push({ to: `${base}/courses`, label: "Courses", flag: FEATURE_FLAGS.STUDENT_COURSES });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_PROGRESS)) {
      studentNav.push({ to: `${base}/progress`, label: "Progress", flag: FEATURE_FLAGS.STUDENT_PROGRESS });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_SUBMISSIONS)) {
      studentNav.push({ to: `${base}/submissions`, label: "My Submissions", flag: FEATURE_FLAGS.STUDENT_SUBMISSIONS });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CERTIFICATES)) {
      studentNav.push({ to: `${base}/certificates`, label: "Certificates", flag: FEATURE_FLAGS.STUDENT_CERTIFICATES });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS, "micro_internships", "internships", "micro_internship")) {
      studentNav.push({ to: `${base}/internships`, label: "Internships", flag: FEATURE_FLAGS.STUDENT_INTERNSHIPS });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB)) {
      studentNav.push({ to: `${base}/client-lab`, label: "Client Lab", flag: FEATURE_FLAGS.STUDENT_CLIENT_LAB });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_WORKSHOPS)) {
      studentNav.push({ to: `${base}/workshops`, label: "Workshops", flag: FEATURE_FLAGS.STUDENT_WORKSHOPS });
    }
    if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_REFERRALS)) {
      studentNav.push({ to: `${base}/referrals`, label: "Referrals", flag: FEATURE_FLAGS.STUDENT_REFERRALS });
    }
    
    return studentNav;
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
