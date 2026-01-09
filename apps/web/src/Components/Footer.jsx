import { Link } from "react-router-dom";
import { 
  FaChartLine, 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Academy", to: "/academy" },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing", to: "#" },
      { label: "Roadmap", to: "#" },
    ],
    resources: [
      { label: "Documentation", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Community", to: "#" },
      { label: "Support", to: "#" },
    ],
    company: [
      { label: "About Us", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Contact", to: "#" },
      { label: "Press Kit", to: "#" },
    ],
    legal: [
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
      { label: "Cookie Policy", to: "#" },
      { label: "GDPR", to: "#" },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 transform transition-transform group-hover:scale-110">
                <FaChartLine className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">ExpoGraph</span>
                <div className="flex items-center gap-1 -mt-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Learning Platform
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of learners with cutting-edge technology and 
              world-class educational content.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl bg-gray-800 hover:bg-emerald-500 text-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@expograph.in" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  <FaEnvelope className="w-4 h-4" />
                  <span>hello@expograph.in</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                  <FaPhone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-gray-400 text-sm">
                  <FaMapMarkerAlt className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Hyderabad, India</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <span>© {currentYear} ExpoGraph. Made with</span>
              <FaHeart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.slice(0, 2).map((link) => (
                <Link key={link.label} to={link.to} className="hover:text-emerald-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
