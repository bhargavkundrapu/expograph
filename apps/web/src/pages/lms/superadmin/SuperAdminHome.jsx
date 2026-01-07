import { Link } from "react-router-dom";
import { 
  FaCrown, 
  FaBook, 
  FaChartLine, 
  FaUsers,
  FaGraduationCap,
  FaCertificate,
  FaFlag,
  FaEnvelope,
  FaBriefcase,
  FaLaptopCode,
  FaRocket
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";

export default function SuperAdminHome() {
  const { isEnabled } = useFeatureFlags();
  
  // Build quick actions - all controlled by feature flags
  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CONTENT)) {
    quickActions.push({
      icon: FaBook,
      title: "Content Admin",
      desc: "Manage courses and content",
      to: "/lms/superadmin/content",
      color: "from-blue-400 to-cyan-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_ANALYTICS)) {
    quickActions.push({
      icon: FaChartLine,
      title: "Analytics",
      desc: "View platform statistics",
      to: "/lms/superadmin/analytics",
      color: "from-purple-400 to-pink-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_LEADS)) {
    quickActions.push({
      icon: FaEnvelope,
      title: "Leads Management",
      desc: "Manage and track leads",
      to: "/lms/superadmin/leads",
      color: "from-cyan-400 to-blue-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_WORKSHOPS)) {
    quickActions.push({
      icon: FaGraduationCap,
      title: "Workshops",
      desc: "Create and manage workshops",
      to: "/lms/superadmin/workshops",
      color: "from-teal-400 to-cyan-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CERTIFICATES)) {
    quickActions.push({
      icon: FaCertificate,
      title: "Certificates",
      desc: "Issue certificates to students",
      to: "/lms/superadmin/certificates",
      color: "from-amber-400 to-orange-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_INTERNSHIPS, "micro_internships", "internships", "micro_internship")) {
    quickActions.push({
      icon: FaBriefcase,
      title: "Internships",
      desc: "Manage micro-internship projects",
      to: "/lms/superadmin/internships",
      color: "from-indigo-400 to-purple-500",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CLIENT_LAB)) {
    quickActions.push({
      icon: FaLaptopCode,
      title: "Client Lab",
      desc: "Manage client lab projects",
      to: "/lms/superadmin/client-lab",
      color: "from-pink-400 to-rose-500",
    });
  }
  
  // Feature Flags always visible for SuperAdmin
  quickActions.push({
    icon: FaFlag,
    title: "Feature Flags",
    desc: "Manage platform features",
    to: "/lms/superadmin/feature-flags",
    color: "from-purple-400 to-pink-500",
  });

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
              <FaCrown className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>SuperAdmin Portal</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Complete platform management dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <FaRocket className="text-amber-400 text-xl" />
          </div>
          <h2 className="section-title text-3xl" style={{ margin: 0 }}>Quick Actions</h2>
        </div>

        <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
          {quickActions.map((action, idx) => (
            <Link key={action.title} to={action.to} style={{ width: '100%', display: 'block' }}>
              <Card 
                variant="elevated" 
                className="group animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, height: '100%', width: '100%', boxSizing: 'border-box' }}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="text-white text-2xl" />
                </div>
                <CardTitle className="text-xl" style={{ marginBottom: '0.5rem' }}>{action.title}</CardTitle>
                <CardDescription className="text-gray-400" style={{ margin: 0 }}>
                  {action.desc}
                </CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
