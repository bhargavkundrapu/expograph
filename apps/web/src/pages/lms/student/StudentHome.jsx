import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaFileAlt, FaRocket } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../components/ui/Card";

export default function StudentHome() {
  const quickLinks = [
    {
      icon: FaBook,
      title: "Browse Courses",
      desc: "Explore all available courses",
      to: "/lms/student/courses",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: FaChartLine,
      title: "View Progress",
      desc: "Track your learning journey",
      to: "/lms/student/courses",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: FaFileAlt,
      title: "My Submissions",
      desc: "Check mentor feedback",
      to: "/lms/student/submissions",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaRocket className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Student Portal</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Welcome to your learning dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        {quickLinks.map((link, idx) => (
          <Link key={link.title} to={link.to} style={{ width: '100%', display: 'block' }}>
            <Card 
              variant="elevated" 
              className="group animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s`, height: '100%', width: '100%', boxSizing: 'border-box' }}
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${link.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <link.icon className="text-white text-2xl" />
              </div>
              <CardTitle className="text-xl" style={{ marginBottom: '0.5rem' }}>{link.title}</CardTitle>
              <CardDescription className="text-gray-400" style={{ margin: 0 }}>
                {link.desc}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
