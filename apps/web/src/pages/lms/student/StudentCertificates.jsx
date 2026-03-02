import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import { ConfettiBurst } from "../../../Components/student/gamification/Confetti";
import {
  FiAward,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiCalendar,
  FiArrowLeft,
  FiShare2,
  FiLinkedin,
  FiCopy,
  FiImage,
  FiPrinter,
} from "react-icons/fi";

function QRCodeSVG({ value, size = 100 }) {
  const modules = generateQR(value);
  const cellSize = size / modules.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {modules.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="#1e293b" /> : null
        )
      )}
    </svg>
  );
}

function generateQR(text) {
  const size = 21;
  const grid = Array.from({ length: size }, () => Array(size).fill(false));
  const addFinder = (sx, sy) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
      const outer = y === 0 || y === 6 || x === 0 || x === 6;
      const inner = y >= 2 && y <= 4 && x >= 2 && x <= 4;
      if (outer || inner) grid[sy + y][sx + x] = true;
    }
  };
  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);
  for (let i = 8; i < size - 8; i++) { grid[6][i] = i % 2 === 0; grid[i][6] = i % 2 === 0; }
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (!grid[y][x] && y > 8 && x > 8) grid[y][x] = ((hash >> ((y * size + x) % 31)) & 1) === 1;
  }
  return grid;
}

export default function StudentCertificates() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const certRef = useRef(null);

  const userName = user?.fullName || user?.full_name || user?.name || "Student";

  useEffect(() => { if (token) fetchCertificates(); }, [token]);

  useEffect(() => {
    if (id && certificates.length > 0) {
      const cert = certificates.find(c => c.id === id);
      if (cert) {
        setSelectedCertificate(cert);
        if (!sessionStorage.getItem(`cert-revealed-${id}`)) {
          setShowReveal(true);
          setShowConfetti(true);
          sessionStorage.setItem(`cert-revealed-${id}`, "true");
        }
      }
    }
  }, [id, certificates]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const mockCertificates = [
        { id: "1", title: "React Fundamentals", course: "React Fundamentals Course", issued_date: new Date(Date.now() - 2592000000).toISOString(), certificate_id: "CERT-2024-001", verification_url: "/verify/cert-2024-001" },
        { id: "2", title: "JavaScript Mastery", course: "JavaScript Basics Course", issued_date: new Date(Date.now() - 5184000000).toISOString(), certificate_id: "CERT-2024-002", verification_url: "/verify/cert-2024-002" },
      ];
      setCertificates(mockCertificates);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  const handleShareLinkedIn = (cert) => {
    const url = `${window.location.origin}${cert.verification_url}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`I earned the ${cert.title} certificate from ExpoGraph!`)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=500");
  };

  const handleCopyLink = (cert) => {
    const url = `${window.location.origin}${cert.verification_url}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <GenericPageSkeleton />;

  if (selectedCertificate) {
    const cert = selectedCertificate;
    const verifyUrl = `${window.location.origin}${cert.verification_url}`;

    return (
      <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
        <ConfettiBurst active={showConfetti} onDone={() => setShowConfetti(false)} />

        {/* Animated Reveal Overlay */}
        <AnimatePresence>
          {showReveal && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
              onClick={() => setShowReveal(false)}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <FiAward className="w-24 h-24 sm:w-32 sm:h-32 text-white mx-auto mb-4" />
                  <h1 className="text-3xl sm:text-5xl font-black text-white mb-2">Congratulations!</h1>
                  <p className="text-lg sm:text-xl text-white/80 mb-2">{userName}</p>
                  <p className="text-white/60 text-sm sm:text-base mb-6">You've earned the <strong className="text-white">{cert.title}</strong> certificate</p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => setShowReveal(false)}
                    className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl transition-colors text-sm backdrop-blur-sm"
                  >
                    View Certificate →
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => { setSelectedCertificate(null); navigate("/lms/student/certificates"); }}
            className={`mb-6 flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Certificates
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            ref={certRef}
            className={`rounded-2xl overflow-hidden border-2 shadow-2xl ${isDark ? "bg-slate-800 border-cyan-500/30" : "bg-white border-cyan-200/50"}`}
          >
            {/* Certificate body */}
            <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 sm:p-12 text-center relative print:p-16">
              <div className="absolute top-4 left-4 opacity-10">
                <FiAward className="w-32 h-32 text-cyan-600" />
              </div>
              <div className="absolute bottom-4 right-4 opacity-10">
                <FiAward className="w-32 h-32 text-indigo-600" />
              </div>
              <div className="relative z-10">
                <div className="mb-4">
                  <img src="/2.png" alt="ExpoGraph" className="h-10 mx-auto mb-4 object-contain" />
                </div>
                <FiAward className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 mx-auto mb-3" />
                <h1 className="text-2xl sm:text-4xl font-black text-slate-800 mb-1">Certificate of Completion</h1>
                <p className="text-base sm:text-lg text-slate-500 mb-6">This is to certify that</p>
                <h2 className="text-xl sm:text-3xl font-black text-indigo-700 mb-1">{userName}</h2>
                <p className="text-sm text-slate-500 mb-6">has successfully completed</p>
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 mb-8">{cert.course}</p>
                <div className="flex items-center justify-center gap-6 pt-6 border-t-2 border-cyan-200">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Certificate ID</p>
                    <p className="text-xs font-bold text-slate-700">{cert.certificate_id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Issued</p>
                    <p className="text-xs font-bold text-slate-700">{new Date(cert.issued_date).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <div className="hidden sm:block">
                    <QRCodeSVG value={verifyUrl} size={60} />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`p-4 sm:p-6 ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all text-xs sm:text-sm"
                >
                  <FiDownload className="w-4 h-4" /> Download PDF
                </button>
                <button
                  onClick={() => handleShareLinkedIn(cert)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all text-xs sm:text-sm ${isDark ? "bg-[#0A66C2] text-white hover:bg-[#084e96]" : "bg-[#0A66C2] text-white hover:bg-[#084e96]"}`}
                >
                  <FiLinkedin className="w-4 h-4" /> LinkedIn
                </button>
                <button
                  onClick={() => handleCopyLink(cert)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl border-2 transition-all text-xs sm:text-sm ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                >
                  <FiCopy className="w-4 h-4" /> {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                  onClick={handlePrint}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl border-2 transition-all text-xs sm:text-sm ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                >
                  <FiPrinter className="w-4 h-4" /> Print
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="sm:hidden">
                  <QRCodeSVG value={verifyUrl} size={48} />
                </div>
                <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Scan QR to verify • {verifyUrl}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className={`text-2xl sm:text-4xl font-bold mb-2 ${isDark ? "text-white" : "bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"}`}>
            My Certificates
          </h1>
          <p className={`text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>View and share your achievement certificates</p>
        </motion.div>

        {certificates.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`rounded-2xl p-12 border-2 text-center ${isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-cyan-200/50"}`}>
            <FiAward className={`w-20 h-20 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-700"}`}>No certificates yet</h3>
            <p className={`mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Complete courses to earn certificates</p>
            <button onClick={() => navigate("/lms/student/courses")} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all">
              Browse Courses
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedCertificate(cert); navigate(`/lms/student/certificates/${cert.id}`); }}
                className={`rounded-2xl p-5 sm:p-6 border-2 hover:shadow-xl transition-all cursor-pointer group ${isDark ? "bg-slate-800 border-slate-700 hover:border-cyan-500/40" : "bg-white/80 border-cyan-200/50 hover:border-cyan-400"}`}
              >
                <div className="text-center mb-5">
                  <div className="inline-block p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-3 group-hover:scale-105 transition-transform">
                    <FiAward className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`font-bold mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>{cert.title}</h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{cert.course}</p>
                </div>
                <div className={`space-y-2 text-xs mb-4 p-3 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-slate-50"}`}>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Certificate ID</span>
                    <span className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{cert.certificate_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Issued</span>
                    <span className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{new Date(cert.issued_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg text-xs hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-1.5">
                    <FiEye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleShareLinkedIn(cert); }}
                    className={`px-3 py-2 rounded-lg border transition-all ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    title="Share on LinkedIn"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
