import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiAward,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiCalendar,
  FiArrowLeft,
  FiShare2,
} from "react-icons/fi";

export default function StudentCertificates() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchCertificates();
  }, [token]);

  useEffect(() => {
    if (id && certificates.length > 0) {
      const certificate = certificates.find((c) => c.id === id);
      if (certificate) {
        setSelectedCertificate(certificate);
      }
    }
  }, [id, certificates]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockCertificates = [
        {
          id: "1",
          title: "React Fundamentals",
          course: "React Fundamentals Course",
          issued_date: new Date(Date.now() - 2592000000).toISOString(),
          certificate_id: "CERT-2024-001",
          verification_url: "/verify/cert-2024-001",
        },
        {
          id: "2",
          title: "JavaScript Mastery",
          course: "JavaScript Basics Course",
          issued_date: new Date(Date.now() - 5184000000).toISOString(),
          certificate_id: "CERT-2024-002",
          verification_url: "/verify/cert-2024-002",
        },
      ];
      setCertificates(mockCertificates);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (certificateId) => {
    // Mock download - replace with actual API call
    alert(`Downloading certificate ${certificateId}...`);
  };

  const handleShare = (certificate) => {
    // Mock share - replace with actual share functionality
    const url = `${window.location.origin}${certificate.verification_url}`;
    navigator.clipboard.writeText(url);
    alert("Certificate link copied to clipboard!");
  };

  if (loading) {
    return <PageLoading />;
  }

  if (selectedCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedCertificate(null);
              navigate("/lms/student/certificates");
            }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Certificates
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-200/50 shadow-xl"
          >
            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl p-12 border-4 border-cyan-300 mb-6 text-center">
              <div className="mb-6">
                <FiAward className="w-24 h-24 text-cyan-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Certificate of Completion</h1>
                <p className="text-xl text-slate-600">This certifies that</p>
              </div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedCertificate.title}
                </h2>
                <p className="text-lg text-slate-700">{selectedCertificate.course}</p>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-cyan-300">
                <p className="text-sm text-slate-600">Certificate ID: {selectedCertificate.certificate_id}</p>
                <p className="text-sm text-slate-600 mt-2">
                  Issued: {new Date(selectedCertificate.issued_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleDownload(selectedCertificate.certificate_id)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <FiDownload className="w-5 h-5" />
                Download PDF
              </button>
              <button
                onClick={() => handleShare(selectedCertificate)}
                className="flex-1 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <FiShare2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Certificates
          </h1>
          <p className="text-slate-600 text-lg">View and download your achievement certificates</p>
        </motion.div>

        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiAward className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No certificates yet</h3>
            <p className="text-slate-500">Complete courses to earn certificates</p>
            <button
              onClick={() => navigate("/lms/student/courses")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Browse Courses
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedCertificate(certificate);
                  navigate(`/lms/student/certificates/${certificate.id}`);
                }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-4">
                    <FiAward className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{certificate.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{certificate.course}</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Certificate ID</span>
                    <span className="font-semibold text-slate-800">{certificate.certificate_id}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Issued</span>
                    <span className="font-semibold text-slate-800">
                      {new Date(certificate.issued_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertificate(certificate);
                      navigate(`/lms/student/certificates/${certificate.id}`);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(certificate.certificate_id);
                    }}
                    className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all"
                    title="Download"
                  >
                    <FiDownload className="w-5 h-5" />
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
