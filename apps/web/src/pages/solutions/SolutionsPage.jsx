import { FaLaptopCode, FaCloud, FaServer, FaLightbulb, FaCode } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../components/ui/Card";

export default function SolutionsPage() {
  const services = [
    {
      icon: FaLaptopCode,
      title: "Web Applications",
      desc: "Dashboards, admin panels, LMS, custom portals.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: FaCloud,
      title: "SaaS Systems",
      desc: "Multi-tenant architecture, RBAC, white-label.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: FaServer,
      title: "Maintenance + Scaling",
      desc: "Monitoring, performance, security hardening.",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: FaLightbulb,
      title: "Consulting",
      desc: "Architecture, deployment, product roadmap guidance.",
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-12 shadow-glow">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30">
              <FaCode className="text-white text-2xl" />
            </div>
            <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold">
              Enterprise Solutions
            </span>
          </div>
          <h1 className="section-hero text-5xl mb-6">
            ExpoGraph{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              IT Solutions
            </span>
          </h1>
          <p className="section-body text-xl text-gray-300 max-w-3xl leading-relaxed">
            We build web apps, internal tools, portals, and SaaS systems with clean engineering,
            speed, and long-term maintainability.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service, idx) => (
          <Card 
            key={service.title} 
            variant="elevated" 
            className="group animate-fadeIn"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className="text-white text-2xl" />
            </div>
            <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              {service.desc}
            </CardDescription>
          </Card>
        ))}
      </section>
    </div>
  );
}
