const express = require("express");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const os = require("os");
const { randomUUID } = require("crypto");
const { fillTemplate } = require("./src/latex");

const PORT = Number(process.env.PORT) || 8080;
const COMPILE_TIMEOUT_MS = 8000;
const MAX_PDF_BYTES = 2 * 1024 * 1024; // 2MB
const TEMPLATES_DIR = path.join(__dirname, "templates");

const app = express();
app.use(express.json({ limit: "500kb" }));

const ALLOWED_TEMPLATES = [
  "modern", "classic", "modern-2", "classic-2", "modern-3", "classic-3", "modern-4", "classic-4",
];
const TEMPLATE_TO_DIR = {
  modern: "modern", "modern-2": "modern", "modern-3": "modern", "modern-4": "modern",
  classic: "classic", "classic-2": "classic", "classic-3": "classic", "classic-4": "classic",
};

function sanitizeErrorMessage(err) {
  const msg = String(err.message || err);
  return msg
    .replace(/\/tmp\/resume-[a-f0-9-]+/g, "/tmp/resume-***")
    .replace(/\/[^\s]+/g, "[path]")
    .slice(0, 500);
}

app.post("/render", async (req, res) => {
  const { templateId, data } = req.body || {};
  let workDir = null;

  try {
    if (!ALLOWED_TEMPLATES.includes(templateId)) {
      return res.status(400).json({
        ok: false,
        error: `Invalid templateId. Allowed: ${ALLOWED_TEMPLATES.join(", ")}`,
      });
    }
    if (!data || typeof data !== "object") {
      return res.status(400).json({ ok: false, error: "Missing or invalid data" });
    }

    const templateDir = TEMPLATE_TO_DIR[templateId] || templateId;
    const templatePath = path.join(TEMPLATES_DIR, templateDir, "template.tex");
    if (!fs.existsSync(templatePath)) {
      return res.status(400).json({ ok: false, error: "Template not found" });
    }

    const id = randomUUID();
    workDir = path.join(os.tmpdir(), `resume-${id}`);
    fs.mkdirSync(workDir, { recursive: true });

    const texSource = fs.readFileSync(templatePath, "utf8");
    const filled = fillTemplate(texSource, data);
    const mainPath = path.join(workDir, "main.tex");
    fs.writeFileSync(mainPath, filled, "utf8");

    const pdfPath = path.join(workDir, "main.pdf");

    const pdflatexCmd = process.env.PDFLATEX_PATH || "pdflatex";
    await new Promise((resolve, reject) => {
      const proc = spawn(
        pdflatexCmd,
        [
          "-interaction=nonstopmode",
          "-halt-on-error",
          `-output-directory=${workDir}`,
          "main.tex",
        ],
        { cwd: workDir, stdio: ["ignore", "pipe", "pipe"] }
      );

      let stderr = "";
      proc.stderr.on("data", (chunk) => { stderr += chunk; });
      proc.stdout.on("data", (chunk) => { stderr += chunk; });

      const timeout = setTimeout(() => {
        proc.kill("SIGKILL");
        reject(new Error("Compilation timeout (8s)"));
      }, COMPILE_TIMEOUT_MS);

      proc.on("close", (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error(sanitizeErrorMessage(stderr || `pdflatex exited ${code}`)));
        } else {
          resolve();
        }
      });
      proc.on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    if (!fs.existsSync(pdfPath)) {
      throw new Error("PDF was not produced");
    }
    const stat = fs.statSync(pdfPath);
    if (stat.size > MAX_PDF_BYTES) {
      throw new Error("Generated PDF exceeds 2MB limit");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
    stream.on("error", (err) => {
      if (!res.headersSent) res.status(500).json({ ok: false, error: "Stream error" });
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({
        ok: false,
        error: "Compilation failed",
        detail: sanitizeErrorMessage(err),
      });
    }
  } finally {
    if (workDir && fs.existsSync(workDir)) {
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
      } catch (e) {
        console.error("[resume-pdf] Failed to delete workDir:", e.message);
      }
    }
  }
});

app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(PORT, () => {
  console.log(`Resume-PDF service listening on port ${PORT}`);
});
