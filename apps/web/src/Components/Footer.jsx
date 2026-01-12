import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube, FaDiscord } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Academy", to: "/academy" },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing", to: "#" },
      { label: "Enterprise", to: "#" },
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
    { href: "#", label: "Twitter", icon: FaTwitter },
    { href: "#", label: "LinkedIn", icon: FaLinkedin },
    { href: "#", label: "GitHub", icon: FaGithub },
    { href: "#", label: "YouTube", icon: FaYoutube },
    { href: "#", label: "Discord", icon: FaDiscord },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />

      {/* Main Footer Content */}
      <div className="container-academy relative z-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25"
              >
                <HiOutlineAcademicCap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  ExpoGraph
                </span>
                <div className="text-xs text-gray-500">
                  Learning Platform
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Empowering the next generation of learners with cutting-edge technology and 
              world-class educational content.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on courses and features.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm w-64"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-academy py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} ExpoGraph. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                Privacy
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                Terms
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
