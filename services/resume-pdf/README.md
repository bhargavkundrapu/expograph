# Resume-PDF Microservice

LaTeX-to-PDF compilation for ExpoGraph LMS Resume Builder. **Not exposed publicly**; call from the main API only.

## Run locally (no Docker)

1. **Windows:** Install [MiKTeX](https://miktex.org/download) and ensure "Add MiKTeX to PATH" is enabled. Restart the terminal after install.
2. **macOS/Linux:** Install TeX Live (e.g. `sudo apt install texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra` on Ubuntu).
3. From repo root: `cd services/resume-pdf && npm install && npm start`
4. Listens on port 8080.

## Run with Docker

**If `docker` is not recognized:** Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/), then restart your terminal.

From repo root:

```bash
cd apps/api
docker compose up -d --build resume-pdf
# or: docker-compose up -d resume-pdf
```

Or build and run the service only:

```bash
cd services/resume-pdf
docker build -t resume-pdf .
docker run -p 8080:8080 --rm resume-pdf
```

## Env (optional)

- `PORT` – default 8080

## API

- `POST /render` – body: `{ templateId: "modern"|"classic"|..., data: ResumeData }`. Returns PDF stream.
- `GET /health` – returns 200 OK.

## Templates

Stored in `templates/{modern,classic}/template.tex`. Placeholders: `{{{FULL_NAME}}}`, `{{{EMAIL}}}`, `{{{EDUCATION_BLOCK}}}`, etc. User input is escaped for LaTeX; no raw LaTeX from clients.
