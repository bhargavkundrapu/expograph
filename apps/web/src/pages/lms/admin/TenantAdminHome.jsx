import { Link } from "react-router-dom";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaBuilding, 
  FaCog, 
  FaUsers,
  FaCheckCircle
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";

export default function TenantAdminHome() {
  const { isEnabled } = useFeatureFlags();

  // Build quick actions based on feature flags
  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_SETTINGS)) {
    quickActions.push({
      icon: FaCog,
      title: "Tenant Settings",
      desc: "Manage tenant configuration and branding",
      to: "/lms/admin/settings",
      color: "from-blue-400 to-cyan-500",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_USERS)) {
    quickActions.push({
      icon: FaUsers,
      title: "User Management",
      desc: "Manage users and permissions",
      to: "/lms/admin/users",
      color: "from-purple-400 to-pink-500",
    });
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaBuilding className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>TenantAdmin Portal</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Manage your tenant configuration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Quick Actions</h2>
          <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link key={action.to} to={action.to}>
                  <Card
                    variant="elevated"
                    className="p-6 group hover:scale-105 transition-transform duration-300 animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <div className="layout-flex items-center gap-md">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white text-2xl" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <CardTitle className="text-xl mb-2">{action.title}</CardTitle>
                        <CardDescription>{action.desc}</CardDescription>
                      </div>
                      <FaCheckCircle className="text-gray-400 text-xl group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {quickActions.length === 0 && (
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-xl mb-4">No Features Available</CardTitle>
          <CardDescription>All tenant admin features are currently disabled. Contact your administrator.</CardDescription>
        </Card>
      )}
    </div>
  );
}
