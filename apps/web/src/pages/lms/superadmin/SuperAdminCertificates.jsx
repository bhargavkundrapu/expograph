import { useState } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { 
  FaCertificate, 
  FaUser, 
  FaBook,
  FaCheckCircle,
  FaPlus
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";

export default function SuperAdminCertificates() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    title: "",
    meta: "",
  });
  const [issuing, setIssuing] = useState(false);
  const [result, setResult] = useState(null);

  async function issueCertificate() {
    if (!formData.userId || !formData.title) {
      alert("User ID and Title are required");
      return;
    }

    setIssuing(true);
    setResult(null);
    try {
      const body = {
        userId: formData.userId,
        courseId: formData.courseId || null,
        title: formData.title,
        meta: formData.meta ? JSON.parse(formData.meta) : {},
      };
      const json = await apiFetch("/api/v1/admin/certificates/issue", {
        method: "POST",
        token,
        body,
      });
      const data = unwrapData(json);
      setResult(data);
      setFormData({ userId: "", courseId: "", title: "", meta: "" });
      alert("Certificate issued successfully! ✅");
    } catch (e) {
      alert(e?.message || "Failed to issue certificate");
    } finally {
      setIssuing(false);
    }
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
              <FaCertificate className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Issue Certificates</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Issue certificates to students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Certificate Form */}
      <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
        <CardTitle className="text-2xl mb-6">Issue New Certificate</CardTitle>
        <div className="layout-flex-col gap-md">
          <div className="layout-grid-2 gap-md">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">
                <FaUser className="inline mr-2 text-amber-400" />
                User ID (UUID) *
              </label>
              <input
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 font-mono text-sm"
                placeholder="00000000-0000-0000-0000-000000000000"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">
                <FaBook className="inline mr-2 text-amber-400" />
                Course ID (Optional)
              </label>
              <input
                type="text"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 font-mono text-sm"
                placeholder="Course UUID (optional)"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">
                <FaCertificate className="inline mr-2 text-amber-400" />
                Certificate Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
                placeholder="e.g., Certificate of Completion - React Mastery"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">
                Metadata (JSON - Optional)
              </label>
              <textarea
                value={formData.meta}
                onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 font-mono text-sm"
                rows={4}
                placeholder='{"grade": "A+", "score": 95}'
              />
              <p className="text-xs text-gray-500 mt-1">Optional JSON metadata for the certificate</p>
            </div>
          </div>
          <Button
            variant="gradient"
            size="lg"
            icon={FaPlus}
            onClick={issueCertificate}
            disabled={issuing || !formData.userId || !formData.title}
            className="w-full md:w-auto"
          >
            {issuing ? "Issuing..." : "Issue Certificate"}
          </Button>
        </div>
      </Card>

      {/* Result Display */}
      {result && (
        <Card variant="gradient" className="p-8 border-amber-500/30" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="text-center mb-6">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 mb-4">
              <FaCheckCircle className="text-white text-4xl" />
            </div>
            <CardTitle className="text-3xl mb-2 text-amber-300">Certificate Issued Successfully</CardTitle>
          </div>
          <div className="layout-flex-col gap-md">
            <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="layout-grid-2 gap-md">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Verification Code</div>
                  <code className="text-lg font-bold text-amber-300 font-mono">
                    {result.verify_code}
                  </code>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Issued At</div>
                  <div className="text-sm text-white font-semibold">
                    {new Date(result.issued_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-flex items-center gap-2 text-xs text-gray-400 bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-lg">
              <FaCertificate className="text-amber-400" />
              <span>Share this verification code with the recipient. They can verify it at: /verify/cert/{result.verify_code}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <FaCertificate className="text-amber-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Certificates</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Issue certificates to students who have completed courses or achieved milestones. Each certificate gets a unique verification code that can be used to verify its authenticity publicly. 
              Certificates can be linked to specific courses or issued independently.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

