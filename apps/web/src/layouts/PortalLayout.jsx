import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { homePathForRole } from "../app/roles";
import { useFeatureFlags } from "../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../utils/featureFlags";

function LinkWithIcon({ to, label, icon: Icon, end }) {
  return (
    <NavLink 
      to={to} 
      end={end}
    >
      <span>{label}</span>
    </NavLink>
  );
}

export default function PortalLayout() {
  const { role, user } = useAuth();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const location = useLocation();

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

  // For other roles, keep the original layout
  return (
    <div>
      <div>
        <aside>
          <div>
            <div>
              <div>
              </div>
              <div>
                <div>Logged in as</div>
                <div>{role}</div>
              </div>
            </div>
            <div>
              <span>{user?.email}</span>
            </div>
          </div>

          <nav>
            {navItems.map((i) => {
              return (
                <LinkWithIcon 
                  key={i.to} 
                  to={i.to} 
                  label={i.label} 
                  end
                />
              );
            })}
          </nav>
        </aside>

        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
