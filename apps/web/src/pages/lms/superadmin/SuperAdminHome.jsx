import { Link } from "react-router-dom";
import { FaCrown, FaBook, FaChartLine, FaUsers } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../components/ui/Card";

export default function SuperAdminHome() {
  const quickActions = [
    {
      icon: FaBook,
      title: "Content Admin",
      desc: "Manage courses and content",
      to: "/lms/superadmin/content",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: FaChartLine,
      title: "Analytics",
      desc: "View platform statistics",
      to: "/lms/superadmin",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: FaUsers,
      title: "User Management",
      desc: "Manage users and roles",
      to: "/lms/superadmin",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
              <FaCrown className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl mb-2">SuperAdmin Portal</h1>
              <p className="section-body text-gray-300 text-lg">Welcome to the SuperAdmin dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action, idx) => (
          <Link key={action.title} to={action.to}>
            <Card 
              variant="elevated" 
              className="group h-full animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="text-white text-2xl" />
              </div>
              <CardTitle className="text-xl mb-2">{action.title}</CardTitle>
              <CardDescription className="text-gray-400">
                {action.desc}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
