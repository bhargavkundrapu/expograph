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
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-10 shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <FaCrown className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">SuperAdmin Portal</h1>
              <p className="text-gray-700 text-lg">Complete platform management dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200">
            <FaRocket className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => (
            <Link 
              key={action.title} 
              to={action.to}
              className="block group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="text-white text-2xl" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-900">{action.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {action.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
