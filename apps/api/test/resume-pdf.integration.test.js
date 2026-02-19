/**
 * Integration test: POST /api/v1/resume/pdf returns application/pdf when auth and body are valid.
 * Run: node test/resume-pdf.integration.test.js (from apps/api; requires API and resume-pdf service or mock)
 */
const samplePayload = {
  templateId: "modern",
  data: {
    fullName: "Test User",
    email: "test@example.com",
    phone: "+1 234 567 8900",
    linkedinUrl: "https://linkedin.com/in/test",
    githubUrl: "https://github.com/test",
    portfolioUrl: "",
    summary: "Experienced developer.",
    skills: ["JavaScript", "React"],
    education: [
      { institution: "University", degree: "BS", field: "CS", startDate: "2018", endDate: "2022", gpa: "3.8" },
    ],
    experience: [
      {
        company: "Company Inc",
        position: "Developer",
        startDate: "2022",
        endDate: "Present",
        bullets: ["Built APIs", "Led team"],
      },
    ],
    projects: [
      { name: "Project A", description: "A cool app", technologies: "React", link: "https://a.com", bullets: ["Feature 1"] },
    ],
    certifications: [{ name: "AWS Certified", issuer: "Amazon", date: "2023", credentialId: "id1" }],
  },
};

async function run() {
  const base = process.env.API_URL || "http://localhost:4000";
  const token = process.env.TEST_JWT_TOKEN;
  if (!token) {
    console.log("Skip: set TEST_JWT_TOKEN and run API + resume-pdf to test PDF endpoint.");
    console.log("Sample payload for manual curl:");
    console.log(JSON.stringify(samplePayload, null, 2));
    process.exit(0);
    return;
  }

  const res = await fetch(`${base}/api/v1/resume/pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(samplePayload),
  });

  const ct = res.headers.get("content-type") || "";
  if (res.ok && ct.includes("application/pdf")) {
    const blob = await res.arrayBuffer();
    console.log("OK: received application/pdf, length:", blob.byteLength);
    process.exit(0);
  } else {
    const text = await res.text();
    console.error("Unexpected response:", res.status, ct, text.slice(0, 200));
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
