import { Link } from "react-router-dom";
import { 
  FaRocket, 
  FaGraduationCap, 
  FaLaptopCode, 
  FaCertificate,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheckCircle,
  FaBriefcase,
  FaAward,
  FaLightbulb
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import Card, { CardTitle, CardDescription } from "../../Components/ui/Card";
import Button from "../../Components/ui/Button";

/**
 * Premium Academy Landing Page
 * Features: Hero section, feature cards, stats, testimonials, CTA sections
 */
export default function AcademyPage() {
  const features = [
    {
      icon: FaGraduationCap,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: FaLaptopCode,
      title: "Hands-On Projects",
      description: "Build real-world projects that you can showcase in your portfolio.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: FaCertificate,
      title: "Verified Certificates",
      description: "Earn recognized certificates that validate your skills to employers.",
      color: "from-amber-400 to-yellow-500",
    },
    {
      icon: FaUsers,
      title: "Community Support",
      description: "Join a vibrant community of learners and mentors who help each other grow.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: FaBriefcase,
      title: "Micro-Internships",
      description: "Gain real work experience through our curated micro-internship programs.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaLightbulb,
      title: "Personalized Learning",
      description: "AI-powered recommendations to help you learn at your own pace.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Learners" },
    { value: "500+", label: "Hours of Content" },
    { value: "50+", label: "Expert Mentors" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 sm:py-24 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-400/5 to-yellow-400/5 rounded-full blur-3xl" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 right-20 animate-float">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
              <FaStar className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
              <FaRocket className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div className="absolute top-1/3 left-10 animate-float" style={{ animationDelay: '2s' }}>
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <HiLightningBolt className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8 animate-fadeIn">
              <HiSparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-700">
                India's Premier Learning Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <span className="text-gray-900">Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              Master in-demand skills with expert-led courses, hands-on projects, 
              and real-world experience through our micro-internship programs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
              <Link to="/login">
                <Button variant="gradient" size="xl" icon={FaRocket}>
                  Start Learning Free
                </Button>
              </Link>
              <Button variant="outline" size="xl" icon={FaPlay}>
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">2,500+</strong> joined this week
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">4.9/5</strong> rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={stat.label}
                className="text-center animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 animate-fadeIn">
              <HiSparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-700">
                Why Choose ExpoGraph
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Our platform combines cutting-edge technology with proven learning methodologies 
              to help you achieve your career goals.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={feature.title}
                variant="elevated"
                hover
                tilt
                animate
                delay={idx * 0.1}
                className="p-6 sm:p-8 group"
              >
                <div className={`
                  w-14 h-14 rounded-2xl
                  bg-gradient-to-br ${feature.color}
                  flex items-center justify-center
                  shadow-lg
                  mb-6
                  transform transition-all duration-300
                  group-hover:scale-110 group-hover:shadow-xl
                `}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
              <FaAward className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-10">
              Join thousands of learners who are transforming their careers with ExpoGraph. 
              Start learning for free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button variant="gradientPremium" size="xl" icon={FaRocket}>
                  Get Started Now
                </Button>
              </Link>
              <Link to="/solutions">
                <Button variant="glass" size="xl" icon={FaArrowRight} iconPosition="right">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
              Trusted by companies worldwide
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
