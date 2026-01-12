import { useState, useEffect, useRef } from "react";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import { apiFetch } from "../../../services/api";
import { unwrapData, unwrapArray } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
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
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
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
    if (flagsLoading || !checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CERTIFICATES)) {
      if (!signal?.aborted && alive.current) setLoading(false);
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/certificates/mine", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setMyCertificates(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (e?.status !== 403) {
        console.error("Failed to load my certificates:", e);
      }
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Certificates</h1>
              <p>Verify and view your certificates</p>
            </div>
          </div>
        </div>
      </div>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>Verify Certificate</CardTitle>
            <CardDescription>Enter a certificate verification code to view details</CardDescription>
          </div>
        </div>

        <div>
          <div>
            <label>
              Certificate Code
            </label>
            <div>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                placeholder="EXPO-XXXX-XXXXX"
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              />
              <Button
                variant="gradient"
                size="lg"
                onClick={handleVerify}
                disabled={verifying || !verifyCode.trim()}
              >
                {verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
            {error && (
              <div>
                {error}
              </div>
            )}
          </div>
        </div>
      </Card>

      {certificate && (
        <Card variant="gradient">
          <div>
            <div>
            </div>
            <CardTitle>Certificate Verified</CardTitle>
            <CardDescription>This certificate is valid and authentic</CardDescription>
          </div>

          <div>
            <div>
              <div>
                <div>
                </div>
                <div>
                  <div>{certificate.title}</div>
                  <div>Certificate Title</div>
                </div>
              </div>

              <div>
                <div>
                  <div>Issued To</div>
                  <div>{certificate.email || "—"}</div>
                </div>
                <div>
                  <div>Issued Date</div>
                  <div>{formatDate(certificate.issuedAt)}</div>
                </div>
                <div>
                  <div>Verification Code</div>
                  <div>
                    <code>
                      {certificate.verifyCode}
                    </code>
                    <button
                      onClick={copyVerifyUrl}
                      title="Copy verification URL"
                    >
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span>This certificate can be verified publicly using the verification code above</span>
            </div>
          </div>
        </Card>
      )}

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>My Certificates</CardTitle>
            <CardDescription>View all certificates issued to you</CardDescription>
          </div>
        </div>

        {loading ? (
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        ) : myCertificates.length === 0 ? (
          <EmptyState
            title="No Certificates Yet"
            message="You haven't received any certificates yet. Complete courses to earn certificates!"
          />
        ) : (
          <div>
            {myCertificates.map((cert) => (
              <Card key={cert.id} variant="elevated">
                <div>
                  <div>
                    <div>
                      <div>
                      </div>
                      <CardTitle>{cert.title}</CardTitle>
                      </div>
                    {cert.course_title && (
                      <CardDescription>Course: {cert.course_title}</CardDescription>
                    )}
                    <div>
                      <div>
                        <div>Issued Date</div>
                        <div>{formatDate(cert.issued_at)}</div>
                      </div>
                      <div>
                        <div>Verification Code</div>
                        <div>
                          <code>
                            {cert.verify_code}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(cert.verify_code);
                              alert("Code copied!");
                            }}
                            title="Copy code"
                          >
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

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Certificates</CardTitle>
            <CardDescription>
              Certificates are issued by administrators upon course completion. Each certificate has a unique verification code that can be used to verify its authenticity. 
              Share your verification code or URL with employers or others who need to verify your achievements.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
