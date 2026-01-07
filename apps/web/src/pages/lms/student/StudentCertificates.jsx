import { useState, useEffect, useRef } from "react";
import { FaCertificate, FaCheckCircle, FaSearch, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import { apiFetch } from "../../../services/api";
import { unwrapData, unwrapArray } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import EmptyState from "../../../Components/common/EmptyState";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function StudentCertificates() {
  const { token } = useAuth();
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [myCertificates, setMyCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const alive = useRef(true);

  async function handleVerify() {
    if (!verifyCode.trim()) {
      setError("Please enter a certificate code");
      return;
    }

    setError("");
    setVerifying(true);
    setCertificate(null);

    try {
      const json = await apiFetch(`/api/v1/public/verify/cert/${verifyCode.trim()}`, { token });
      const data = unwrapData(json);
      setCertificate(data);
    } catch (e) {
      setError(e?.message || "Certificate not found or invalid code");
      setCertificate(null);
    } finally {
      setVerifying(false);
    }
  }

  function copyVerifyUrl() {
    if (certificate?.verifyCode) {
      const url = `${window.location.origin}/verify/cert/${certificate.verifyCode}`;
      navigator.clipboard.writeText(url);
      alert("Verification URL copied to clipboard!");
    }
  }

  async function loadMyCertificates(signal) {
    try {
      const json = await apiFetch("/api/v1/lms/certificates/mine", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setMyCertificates(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load my certificates:", e);
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadMyCertificates(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

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
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Certificates</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Verify and view your certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verify Certificate */}
      <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
            <FaSearch className="text-cyan-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-2xl" style={{ margin: 0 }}>Verify Certificate</CardTitle>
            <CardDescription style={{ marginTop: '0.5rem' }}>Enter a certificate verification code to view details</CardDescription>
          </div>
        </div>

        <div className="layout-flex-col gap-md">
          <div>
            <label className="layout-flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <FaCertificate className="text-amber-400" />
              Certificate Code
            </label>
            <div className="layout-flex gap-3">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                placeholder="EXPO-XXXX-XXXXX"
                className="flex-1 border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-mono"
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              />
              <Button
                variant="gradient"
                size="lg"
                icon={FaSearch}
                onClick={handleVerify}
                disabled={verifying || !verifyCode.trim()}
              >
                {verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Certificate Result */}
      {certificate && (
        <Card variant="gradient" className="p-8 border-amber-500/30" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="text-center mb-6">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 mb-4">
              <FaCheckCircle className="text-white text-4xl" />
            </div>
            <CardTitle className="text-3xl mb-2 text-amber-300">Certificate Verified</CardTitle>
            <CardDescription className="text-lg">This certificate is valid and authentic</CardDescription>
          </div>

          <div className="layout-flex-col gap-md">
            <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="layout-flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30">
                  <FaCertificate className="text-amber-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{certificate.title}</div>
                  <div className="text-sm text-gray-400">Certificate Title</div>
                </div>
              </div>

              <div className="layout-grid-2 gap-md mt-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Issued To</div>
                  <div className="text-sm text-white font-semibold">{certificate.email || "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Issued Date</div>
                  <div className="text-sm text-white font-semibold">{formatDate(certificate.issuedAt)}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500 mb-1">Verification Code</div>
                  <div className="layout-flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-amber-300 font-mono text-sm">
                      {certificate.verifyCode}
                    </code>
                    <button
                      onClick={copyVerifyUrl}
                      className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                      title="Copy verification URL"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="layout-flex items-center gap-2 text-xs text-gray-400 bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-lg">
              <HiSparkles className="text-amber-400 animate-pulse-slow" />
              <span>This certificate can be verified publicly using the verification code above</span>
            </div>
          </div>
        </Card>
      )}

      {/* My Certificates */}
      <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30">
            <FaCertificate className="text-green-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-2xl" style={{ margin: 0 }}>My Certificates</CardTitle>
            <CardDescription style={{ marginTop: '0.5rem' }}>View all certificates issued to you</CardDescription>
          </div>
        </div>

        {loading ? (
          <div className="layout-flex-col gap-md">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : myCertificates.length === 0 ? (
          <EmptyState
            title="No Certificates Yet"
            message="You haven't received any certificates yet. Complete courses to earn certificates!"
          />
        ) : (
          <div className="layout-flex-col gap-md">
            {myCertificates.map((cert) => (
              <Card key={cert.id} variant="elevated" className="p-6 border-green-500/30">
                <div className="layout-flex items-start justify-between gap-md">
                  <div style={{ flex: 1 }}>
                    <div className="layout-flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30">
                        <FaCertificate className="text-green-400" />
                      </div>
                      <CardTitle className="text-xl" style={{ margin: 0 }}>{cert.title}</CardTitle>
                    </div>
                    {cert.course_title && (
                      <CardDescription className="mb-3">Course: {cert.course_title}</CardDescription>
                    )}
                    <div className="layout-grid-2 gap-md text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Issued Date</div>
                        <div className="text-white font-semibold">{formatDate(cert.issued_at)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Verification Code</div>
                        <div className="layout-flex items-center gap-2">
                          <code className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-green-300 font-mono text-xs">
                            {cert.verify_code}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(cert.verify_code);
                              alert("Code copied!");
                            }}
                            className="p-1.5 rounded bg-gray-800 border border-gray-700 text-gray-400"
                            title="Copy code"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
            <FaCertificate className="text-blue-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Certificates</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Certificates are issued by administrators upon course completion. Each certificate has a unique verification code that can be used to verify its authenticity. 
              Share your verification code or URL with employers or others who need to verify your achievements.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

