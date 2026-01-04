import { Link } from "react-router-dom";
import { FaUserTie, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../components/ui/Card";

export default function MentorHome() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
              <FaUserTie className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl mb-2">Mentor Portal</h1>
              <p className="section-body text-gray-300 text-lg">Welcome to the Mentor dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <Link to="/lms/mentor/submissions">
        <Card variant="elevated" className="p-8 group">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
              <FaClipboardList className="text-white text-2xl" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">Submissions Queue</CardTitle>
              <CardDescription className="text-lg">
                Review and provide feedback on student submissions
              </CardDescription>
            </div>
            <FaCheckCircle className="text-cyan-400 text-2xl group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Card>
      </Link>
    </div>
  );
}
