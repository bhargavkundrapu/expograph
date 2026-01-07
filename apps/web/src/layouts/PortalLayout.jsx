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
        "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg",
        isActive 
          ? "bg-green-600 text-white shadow-medium" 
          : "text-gray-700 bg-white border border-green-200",
      ].join(" ")}
      end={end}
    >
      <Icon className="text-sm sm:text-base" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
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
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_USERS)) {
        items.push({ to: `${base}/users`, label: "User Management", flag: FEATURE_FLAGS.TENANT_ADMIN_USERS });
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
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_CLIENT_LAB)) {
        items.push({ to: `${base}/client-lab`, label: "Client Lab", flag: FEATURE_FLAGS.MENTOR_CLIENT_LAB });
      }
      if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_INTERNSHIPS)) {
        items.push({ to: `${base}/internships`, label: "Internships", flag: FEATURE_FLAGS.MENTOR_INTERNSHIPS });
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
    <div className="min-h-[calc(100vh-56px)] bg-white position-relative">
      <div className="container layout-grid gap-4 sm:gap-lg" style={{ paddingTop: '1rem', paddingBottom: '2rem', gridTemplateColumns: '1fr' }}>
        {/* Mobile: Sidebar becomes horizontal nav */}
        <aside className="rounded-xl bg-green-50 border border-green-200 p-4 sm:p-6 shadow-soft animate-slideIn sm:position-sticky sm:top-20" style={{ maxHeight: 'fit-content', sm: { maxHeight: 'calc(100vh - 120px)' } }}>
          <div className="margin-section-sm" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <div className="layout-flex items-center gap-2 margin-section-sm">
              <div className="p-2 rounded-lg bg-green-600 shadow-medium">
                <FaUser className="text-white text-sm" />
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide font-semibold">Logged in as</div>
                <div className="font-bold text-base sm:text-lg text-green-700 section-title">{role}</div>
              </div>
            </div>
            <div className="layout-flex items-center gap-2 text-xs text-gray-600">
              <FaEnvelope className="text-green-600" />
              <span className="truncate">{user?.email}</span>
            </div>
          </div>

          <nav className="layout-flex flex-wrap sm:flex-col gap-2 sm:gap-sm">
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

        <section className="rounded-xl bg-white border border-green-200 p-4 sm:p-8 shadow-soft animate-fadeIn overflow-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
