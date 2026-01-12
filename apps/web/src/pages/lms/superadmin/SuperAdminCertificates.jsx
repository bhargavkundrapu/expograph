import { useState } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>Issue Certificates</h1>
          <p>Issue certificates to students</p>
        </div>
      </div>

      <Card variant="elevated">
        <CardTitle>Issue New Certificate</CardTitle>
        <div>
          <div>
            <div>
              <label>
                User ID (UUID) *
              </label>
              <input
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                placeholder="00000000-0000-0000-0000-000000000000"
                required
              />
            </div>
            <div>
              <label>
                Course ID (Optional)
              </label>
              <input
                type="text"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                placeholder="Course UUID (optional)"
              />
            </div>
            <div>
              <label>
                Certificate Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Certificate of Completion - React Mastery"
                required
              />
            </div>
            <div>
              <label>
                Metadata (JSON - Optional)
              </label>
              <textarea
                value={formData.meta}
                onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                rows={4}
                placeholder='{"grade": "A+", "score": 95}'
              />
              <p>Optional JSON metadata for the certificate</p>
            </div>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={issueCertificate}
            disabled={issuing || !formData.userId || !formData.title}
          >
            {issuing ? "Issuing..." : "Issue Certificate"}
          </Button>
        </div>
      </Card>

      {result && (
        <Card variant="gradient">
          <div>
            <div>
            </div>
            <CardTitle>Certificate Issued Successfully</CardTitle>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <div>Verification Code</div>
                  <code>
                    {result.verify_code}
                  </code>
                </div>
                <div>
                  <div>Issued At</div>
                  <div>
                    {new Date(result.issued_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span>Share this verification code with the recipient. They can verify it at: /verify/cert/{result.verify_code}</span>
            </div>
          </div>
        </Card>
      )}

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Certificates</CardTitle>
            <CardDescription>
              Issue certificates to students who have completed courses or achieved milestones. Each certificate gets a unique verification code that can be used to verify its authenticity publicly. 
              Certificates can be linked to specific courses or issued independently.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
