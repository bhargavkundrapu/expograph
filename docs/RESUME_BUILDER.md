# Resume Builder (Phase 1)

## Overview

Students can build a resume via a 4-step flow, choose from 8 templates, review an HTML overview, and download a generated PDF. PDFs are **not** stored; they are streamed to the browser. The system uses a separate LaTeX compile microservice and enforces rate limits and concurrency.

## How to run locally

### 1. Resume-PDF microservice

**Option A – Docker (recommended)**

- **Windows:** Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/), then restart your terminal. If `docker` is not recognized, add Docker to your PATH or open "Docker Desktop" and use its terminal.
- From repo root:
```bash
cd apps/api
docker compose up -d --build resume-pdf
# or: docker-compose up -d resume-pdf
# Service: http://localhost:8080
```

**Option B – Without Docker (Node + LaTeX)**

- **Windows:** Install [MiKTeX](https://miktex.org/download) (includes `pdflatex`). During setup, choose "Install for all users" or "Install for me only" and allow automatic package installation. Ensure "Add MiKTeX to PATH" is checked.
- **macOS/Linux:** Install TeX Live (e.g. `sudo apt install texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra` on Ubuntu).
- Then:
```bash
cd services/resume-pdf
npm install
npm start
# Listens on port 8080
```

### 2. Main API

In `apps/api/.env` (create if needed), ensure:

- `DATABASE_URL`, `JWT_SECRET` (required for API)
- `RESUME_PDF_SERVICE_URL=http://localhost:8080` (when resume-pdf runs locally or in Docker with port 8080)
- Optional: `RESUME_PDF_TIMEOUT_MS=15000`, `RESUME_PDF_MAX_CONCURRENCY=4`

```bash
cd apps/api
npm install
npm run dev
# API: http://localhost:4000
```

### 3. Frontend

```bash
cd apps/web
npm install
npm run dev
# Web: http://localhost:5173
```

Open **http://localhost:5173**, log in as a **Student**, then go to **Resume Builder** (sidebar) or **/lms/student/resume-builder**.

## Env vars

| Variable | Where | Default | Description |
|----------|--------|---------|-------------|
| `RESUME_PDF_SERVICE_URL` | apps/api | `http://localhost:8080` | Base URL of resume-pdf service |
| `RESUME_PDF_TIMEOUT_MS` | apps/api | 15000 | Timeout for downstream PDF request (ms) |
| `RESUME_PDF_MAX_CONCURRENCY` | apps/api | 4 | Max concurrent PDF compiles per API instance |
| `PORT` | services/resume-pdf | 8080 | Resume-PDF server port |

Rate limit for `POST /api/v1/resume/pdf`: **5 requests per 10 minutes** per user (or per IP if unauthenticated).

## Example curl (PDF download)

Replace `YOUR_JWT_TOKEN` with a valid Student JWT (e.g. from login).

```bash
curl -X POST http://localhost:4000/api/v1/resume/pdf \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "templateId": "modern",
    "data": {
      "fullName": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+1 234 567 8900",
      "linkedinUrl": "https://linkedin.com/in/jane",
      "githubUrl": "https://github.com/jane",
      "portfolioUrl": "",
      "summary": "Full-stack developer with 5 years experience.",
      "skills": ["JavaScript", "React", "Node.js"],
      "education": [
        {
          "institution": "State University",
          "degree": "BS",
          "field": "Computer Science",
          "startDate": "2016",
          "endDate": "2020",
          "gpa": "3.8"
        }
      ],
      "experience": [
        {
          "company": "Tech Corp",
          "position": "Software Engineer",
          "startDate": "2020",
          "endDate": "Present",
          "bullets": ["Built APIs", "Mentored juniors"]
        }
      ],
      "projects": [],
      "certifications": []
    }
  }' \
  --output resume.pdf
```

**Expected response (success):**

- Status: `200 OK`
- Headers: `Content-Type: application/pdf`, `Content-Disposition: attachment; filename="resume.pdf"`
- Body: PDF binary (streamed)

**Expected on error:**

- `400` – Validation failed (body schema or limits)
- `401` – Missing or invalid token
- `403` – Not a Student role
- `429` – Rate limit or queue full
- `502` / `504` – Resume-pdf service error or timeout

## Checklist of what was created

### Frontend (apps/web)

- **Route:** `/lms/student/resume-builder` (Student only)
- **Pages/components:** `StudentResumeBuilder.jsx` (4 steps), `ResumeForm.jsx`, `TemplatePicker.jsx`, `Review.jsx`, `DownloadPanel.jsx`
- **State:** Draft persisted in `localStorage` keyed by `userId`
- **Validation:** Summary ≤600 chars, skills ≤15 (each ≤200), education ≤5, experience ≤5 (≤6 bullets each), projects ≤6 (≤5 bullets each), certs ≤8
- **Download:** POST to `/api/v1/resume/pdf` with `{ templateId, data }`, receive blob, trigger download

### Main API (apps/api)

- **Endpoint:** `POST /api/v1/resume/pdf` (auth + Student role, rate limited)
- **Validation:** Zod schema in `modules/resume/resume.validator.js` (same limits as frontend)
- **Proxy:** Forwards to resume-pdf service, streams PDF back (no full buffering)
- **Rate limit:** 5 requests / 10 min per user (or IP)
- **Concurrency:** In-memory limiter (max 4 concurrent, queue 50); 429 when queue full
- **Timeout:** 15 s for downstream call

### PDF microservice (services/resume-pdf)

- **Server:** Express `POST /render`, `GET /health`
- **Templates:** `templates/modern/template.tex`, `templates/classic/template.tex` (8 template IDs map to these two)
- **LaTeX:** Safe placeholder replacement; escape `\ { } $ & # ^ _ ~ %`; single-line/URL sanitization; education/experience/projects/certs/skills blocks
- **Compile:** Temp dir per request, `pdflatex -interaction=nonstopmode -halt-on-error`, 8 s timeout, max PDF 2MB; temp dir deleted in `finally`
- **Dockerfile:** Ubuntu + TeX Live + Node, listen 8080

### DevOps

- **Docker:** `services/resume-pdf/Dockerfile`; `apps/api/docker-compose.yml` updated with `resume-pdf` service (CPU/memory limits)
- **Docs:** `services/resume-pdf/README.md`, `docs/RESUME_BUILDER.md`

### Tests

- **Unit:** `services/resume-pdf/test/latex.test.js` – LaTeX escaping and block generation
- **Integration:** `apps/api/test/resume-pdf.integration.test.js` – expects `application/pdf` (optional; set `TEST_JWT_TOKEN` and run API + resume-pdf)

Run LaTeX unit tests:

```bash
cd services/resume-pdf
node test/latex.test.js
```
