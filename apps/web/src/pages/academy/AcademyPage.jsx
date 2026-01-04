import { Link } from "react-router-dom";
import { FaGraduationCap, FaRocket, FaCode, FaChartLine, FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card, { CardContent, CardTitle, CardDescription } from "../../Components/ui/Card";

export default function AcademyPage() {
  const features = [
    {
      icon: FaGraduationCap,
      title: "Student-first learning",
      desc: "Clear path from zero → job-ready with proof-of-work.",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: FaCode,
      title: "Practice + reviews",
      desc: "Submit tasks, get mentor feedback, improve fast.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: FaRocket,
      title: "Real world exposure",
      desc: "Micro-internship ladder + real client lab later.",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-12 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Exponential Growth
            </span>
          </div>
          <h1 className="section-hero text-5xl leading-tight mb-6">
            Learn in a way that makes your career grow like an{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              exponential graph
            </span>
            <HiSparkles className="inline-block ml-2 text-cyan-400 animate-pulse-slow" />
          </h1>
          <p className="section-body text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            ExpoGraph Academy = recorded sessions + cheat sheets + practice + real work systems
            (micro-internships + real client lab). Student-first. No gimmicks.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-white via-gray-200 to-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:from-gray-200 hover:via-white hover:to-gray-200 hover:shadow-xl hover:shadow-white/30 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group">
              <FaSignInAlt className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">See IT Solutions</span>
              <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <Card 
            key={feature.title} 
            variant="elevated" 
            className="group animate-fadeIn"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="text-white text-2xl" />
            </div>
            <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              {feature.desc}
            </CardDescription>
          </Card>
        ))}
      </section>
    </div>
  );
}
