// Vibe Coding — Module 8: DEPLOYMENT & PRODUCTION (10 lessons)

module.exports = {

"fb03c9df-678d-453e-952c-305dfc4ba91d": { // Backend Deployment
  goal: "Deploy your backend API to the internet so anyone can call your endpoints from anywhere.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Put your backend on the real internet — your API, running 24/7, accessible from anywhere in the world.", real_world: "Every app you use has a backend running in the cloud. Deploying yours means your project is no longer a localhost toy — it's real." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Backend deployed to Render (or Railway)", "Environment variables configured in production", "Production database connected", "Health check endpoint verifiable from anywhere", "Auto-deploy on git push"], tech: ["Render", "PostgreSQL", "Environment Variables", "CI/CD", "Node.js"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend running locally without errors", "GitHub repo with latest code pushed", "Render account created and linked to GitHub"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure Render", description: "On render.com → New Web Service → select repo → set root to apps/api → add all environment variables from .env." },
      { title: "Deploy and verify", description: "Trigger deploy → wait for build → hit your-api.onrender.com/api/v1/health → verify it responds." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Backend deploys without build errors", "Health check responds at the public URL", "Database connects in production", "Environment variables are configured", "Auto-deploy triggers on git push"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Cloud Deployment", explanation: "Running your server on someone else's computer (Render, AWS, Vercel) that's always on, always connected, and managed for you." },
      { term: "Environment Variables in Production", explanation: "Same .env values but configured in the hosting dashboard — never uploaded to GitHub. Each environment (dev/staging/prod) has its own set." },
      { term: "Build Process", explanation: "The host runs npm install + npm run build, then starts the server. If build fails, the old version stays live — no downtime." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Set NODE_ENV=production in production environment variables", "Use a different database for production — never share with development", "Add a start script in package.json that Render can use", "Monitor the deploy logs for errors — most failures are missing env vars"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Build succeeds but app crashes on start", fix: "Check Render logs for missing environment variables. Most common: DATABASE_URL, JWT_SECRET." },
      { mistake: "Database connection timeout", fix: "Make sure the production DATABASE_URL includes ?sslmode=require for Neon." },
      { mistake: "API returns 502 Bad Gateway", fix: "The server crashed. Check Render logs for the error. Usually a missing dependency or wrong start command." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Backend is live at a public URL", "Health check passes", "Database connected in production", "All environment variables configured", "Auto-deploy works from git push"] }}
  ]
},

"1d8fc052-db7e-4928-976b-a1d7d6af3093": { // Frontend Deployment
  goal: "Put your website live on the internet so anyone can open it with a link.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Launch your website to the world — a real URL that anyone with a browser can visit.", real_world: "This is the moment your project becomes real. A deployed frontend is a product. Share it on your resume, portfolio, or social media." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Frontend deployed to Vercel", "Environment variables pointing to production backend", "Custom domain (optional)", "Automatic deployments on git push", "Preview deployments for branches"], tech: ["Vercel", "Vite", "React", "Environment Variables", "CDN"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Frontend building locally (npm run build succeeds)", "Backend already deployed with public URL", "Vercel account connected to GitHub"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure Vercel", description: "Add project to Vercel → set root directory to apps/web → add VITE_API_URL pointing to your deployed backend." },
      { title: "Deploy and test", description: "Deploy → open the Vercel URL → login/signup → verify full flow works end-to-end against the production backend." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Frontend deploys without build errors", "Site loads at the Vercel URL", "Frontend connects to production backend", "Auth flow works end-to-end", "Auto-deploy works on git push"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "CDN (Content Delivery Network)", explanation: "Vercel hosts your files on servers worldwide. A user in Tokyo loads from an Asian server, a user in London from a European server — fast everywhere." },
      { term: "Build Output", explanation: "npm run build converts your React code into optimized static files (HTML, CSS, JS). These files are what Vercel serves — no Node.js needed." },
      { term: "Preview Deployments", explanation: "Every git branch gets its own URL. Push a feature branch → Vercel creates feature-123.vercel.app for testing before merging." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Set VITE_API_URL as environment variable on Vercel, not hardcoded in code", "Test with a slow connection to make sure loading states work in production", "Add a custom domain for a professional look (Settings → Domains)", "Use Vercel's preview deployments to test before merging to main"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Frontend is live at a public URL", "Connects to production backend", "Auth flow works end-to-end", "Auto-deploy is configured", "Site loads fast globally"] }}
  ]
},

"3634bd79-7294-43d1-abc8-602312c222a3": { // Environment Separation
  goal: "Make your app run in 3 modes — Development, Staging, and Production — safely without mixing data.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Create safety lanes — dev for experiments, staging for testing, production for real users. Never mix them up.", real_world: "Every tech company has dev/staging/prod environments. It prevents the nightmare of testing on real user data." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Environment-specific configuration files", "Separate databases for each environment", "Environment detection (NODE_ENV)", "Feature flags per environment", "Deploy pipeline per environment"], tech: ["dotenv", "NODE_ENV", "Configuration", "DevOps", "Environment Variables"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend and frontend deployed", "Environment variables in use", "At least dev and prod environments running"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure environments", description: "Create .env.development, .env.staging, .env.production with different database URLs and API keys." },
      { title: "Verify separation", description: "Run in dev mode → verify it uses dev database. Deploy to prod → verify it uses prod database. Data should be completely separate." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Each environment has its own config", "Databases are separate per environment", "NODE_ENV is correctly set in each environment", "Dev changes don't affect production", "Config loading is automatic based on environment"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "NODE_ENV", explanation: "An environment variable that tells your app which mode it's in. 'development' enables debug logging. 'production' optimizes performance and hides errors." },
      { term: "Staging Environment", explanation: "A clone of production for testing. Same config, same infrastructure, but with test data. Catch bugs here before they reach real users." },
      { term: "Feature Flags", explanation: "Boolean switches that enable/disable features per environment. Test new features in staging without affecting production users." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Never use production database credentials in development", "Use .env.example with empty values as a template for new developers", "Set NODE_ENV in the hosting platform, not in .env files", "Add a visual indicator (banner) showing which environment you're in during dev/staging"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Environments have separate configs", "Databases are isolated", "NODE_ENV correctly set everywhere", "No cross-environment data leaks", "Environment is detectable in code"] }}
  ]
},

"c6ea57e3-802a-4213-91a4-9e738c5991f2": { // Docker Setup
  goal: "Run your full project with one command using Docker, so it works the same on every computer.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Package your entire app into containers — one command to start everything, works on any machine.", real_world: "Docker is used by every major tech company. 'It works on my machine' becomes 'it works on EVERY machine'." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Dockerfile for backend", "Dockerfile for frontend", "docker-compose.yml for the full stack", "Volume mounts for development", "Production-ready container configuration"], tech: ["Docker", "Docker Compose", "Containers", "DevOps", "YAML"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Docker Desktop installed", "Backend and frontend running locally", "Basic understanding of terminal commands"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Build and run", description: "Run: docker-compose up --build → wait for containers to start → verify both apps are accessible." },
      { title: "Verify containers", description: "docker ps → verify 2-3 containers running. Test the app in the browser — it should work exactly like local development." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["docker-compose up starts all services", "Frontend accessible at localhost:5173", "Backend accessible at localhost:3000", "Database connection works from containers", "Hot-reload works in development mode"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Container", explanation: "A lightweight, isolated environment that packages your app with all its dependencies. Like a virtual machine but much faster and smaller." },
      { term: "Dockerfile", explanation: "A recipe that tells Docker how to build your container: which base image to use, what to install, what files to copy, and how to start the app." },
      { term: "Docker Compose", explanation: "A tool for running multi-container apps. One YAML file defines frontend, backend, and database containers that all start together." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use multi-stage builds for smaller production images", "Add a .dockerignore file to exclude node_modules and .env", "Use volumes in development for hot-reload without rebuilding", "Pin base image versions (node:20-alpine not node:latest) for reproducibility"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Docker Compose starts all services", "Both apps accessible from containers", "Database connects properly", "Development mode has hot-reload", "Containers are clean and optimized"] }}
  ]
},

"1f77dceb-5af7-41da-93fd-6e81d2ae29b0": { // CI/CD Pipeline
  goal: "Automatically test your code and deploy it every time you push to GitHub.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Automate your deployment — push code to GitHub and it tests, builds, and deploys itself.", real_world: "Netflix deploys thousands of times a day using CI/CD. One push = tested + deployed in minutes, no manual steps." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["GitHub Actions workflow for CI", "Automated test execution on push", "Automated build verification", "Deploy trigger on merge to main", "Status checks on pull requests"], tech: ["GitHub Actions", "CI/CD", "YAML", "Automation", "DevOps"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Tests set up for backend and frontend", "GitHub repo with code pushed", "Deployment configured (Vercel + Render)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Push and watch CI", description: "Push code → go to GitHub → Actions tab → watch the workflow run tests and build." },
      { title: "Test the full pipeline", description: "Create a PR → verify checks run → merge → verify auto-deploy triggers." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["GitHub Action runs on push", "Tests execute and pass", "Build step succeeds", "PR shows status checks", "Merge to main triggers deployment"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "CI (Continuous Integration)", explanation: "Automatically run tests and build on every push. Catches bugs before they reach production. 'Is the code healthy?'" },
      { term: "CD (Continuous Deployment)", explanation: "Automatically deploy when tests pass on the main branch. Push → test → build → live. No manual deploy steps." },
      { term: "GitHub Actions", explanation: "GitHub's built-in CI/CD. Define workflows in YAML files under .github/workflows/. Free for public repos, generous limits for private." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Cache node_modules in GitHub Actions for 2-3x faster builds", "Add separate workflows for backend and frontend (only test what changed)", "Require status checks before merging PRs — enforce quality", "Add a Slack/Discord notification for deploy successes and failures"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["CI workflow runs on push", "Tests execute in the pipeline", "Build verification passes", "PR status checks work", "Auto-deploy triggers on merge"] }}
  ]
},

"ac4193de-1862-4e2c-92b7-66aba6554e62": { // Backup Strategy
  goal: "Automatically back up your database daily so you never lose user data.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Protect your users' data — automatic daily backups that let you recover from any disaster.", real_world: "Companies that lose data lose customers. GitLab famously lost 6 hours of data in 2017 — they had backups that saved them." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Automated daily database backup", "Backup storage in cloud (S3 or similar)", "Backup retention policy (keep last 30 days)", "Backup restore procedure", "Backup verification script"], tech: ["pg_dump", "Cron", "Cloud Storage", "PostgreSQL", "Automation"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Production database running", "Cloud storage account (AWS S3 or similar)", "Basic understanding of cron jobs"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test manual backup", description: "Run the backup script manually → verify a .sql file is created and uploaded to cloud storage." },
      { title: "Test restore", description: "Create test data → backup → delete data → restore from backup → verify data is back." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Backup script creates a valid .sql dump", "Backup uploads to cloud storage", "Automated schedule runs daily", "Old backups are cleaned up per retention policy", "Restore procedure works and recovers data"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "pg_dump", explanation: "PostgreSQL's built-in backup tool. It creates a .sql file containing every CREATE TABLE and INSERT statement needed to recreate your database." },
      { term: "Retention Policy", explanation: "How long you keep backups. 30 days is standard — old enough to recover from most issues, not so long that storage costs explode." },
      { term: "Point-in-Time Recovery", explanation: "The ability to restore your database to any specific moment. Requires continuous WAL archiving — advanced but powerful." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Test your restore procedure regularly — a backup you can't restore is useless", "Encrypt backups at rest — they contain user data", "Use Neon's built-in branching for instant database snapshots", "Set up an alert if backup fails — you need to know immediately"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Backup script works correctly", "Automated backups run on schedule", "Backups stored securely in cloud", "Retention policy configured", "Restore procedure tested and working"] }}
  ]
},

"4bf177b0-1f06-48d2-8c0f-0bff9de89a09": { // Database Migration
  goal: "Make database updates safe and automatic — add columns, change types — without losing data.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Change your database safely — add columns, rename fields, update types — all without losing a single row of data.", real_world: "Facebook changes their database schema weekly. Migrations are how they do it without downtime or data loss." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Migration system configured (Prisma migrate)", "Schema change workflow", "Rollback procedure for failed migrations", "Data migration scripts", "Migration tracking in version control"], tech: ["Prisma Migrate", "PostgreSQL", "Schema Management", "Database"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Database with existing tables", "Prisma ORM configured", "At least one migration already created"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test a migration", description: "Make a schema change (add a column) → run prisma migrate dev → verify the change applies without data loss." },
      { title: "Verify in production", description: "Push the migration → verify it applies on the production database (prisma migrate deploy)." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Schema changes create migrations", "Migrations apply without data loss", "Migration history is tracked", "Production migration deployment works", "Rollback procedure is documented"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Database Migration", explanation: "A versioned SQL script that changes the database structure. Each migration has an 'up' (apply) and 'down' (rollback) direction." },
      { term: "Prisma Migrate", explanation: "Compares your schema file with the database and generates SQL to make them match. It tracks which migrations have been applied." },
      { term: "Zero-Downtime Migration", explanation: "Changing the database without taking the app offline. Techniques: add columns as nullable first, backfill data, then make non-nullable." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always test migrations on a copy of production data before running on production", "Make migrations backward-compatible — deploy the migration before the code that uses it", "Never edit an existing migration that's already applied — create a new one", "Keep migrations small and focused — one change per migration"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Migration system is configured", "Schema changes generate migrations", "Migrations apply without data loss", "Production deployment workflow works", "Migration history is tracked"] }}
  ]
},

"ae53e2ab-efa7-4b1d-a8f9-fea779cf6592": { // Production Checklist
  goal: "Verify everything works before launch — security, performance, features, monitoring, and reliability.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "The final pre-flight check — verify every system is green before real users touch your app.", real_world: "NASA has pre-launch checklists. Airlines have pre-flight checklists. Your app launch needs one too — it prevents disasters." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Production readiness checklist", "Security audit verification", "Performance benchmark verification", "Error monitoring confirmation", "Backup and recovery verification"], tech: ["DevOps", "Security", "Performance", "Monitoring", "Checklists"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend and frontend deployed", "Security hardening applied", "Monitoring set up", "Backups configured"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run through checklist", description: "Go through each section systematically — security, performance, features, monitoring, backups." },
      { title: "Fix any gaps", description: "For each failed check, apply the fix and re-verify before proceeding." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["All security checks pass (headers, rate limiting, HTTPS)", "Performance meets targets (Lighthouse 80+)", "All core features work in production", "Error monitoring is active and receiving data", "Backup system is verified and automated"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Production Readiness", explanation: "A standard that your app must meet before real users use it: security, reliability, performance, monitoring. Missing any one creates risk." },
      { term: "Runbook", explanation: "A document describing what to do when things go wrong: 'if database is down, do X'. Create one for each failure scenario." },
      { term: "Incident Response", explanation: "A process for handling production issues: detect → assess → fix → communicate → post-mortem. Having a plan prevents panic." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Run through this checklist before EVERY major launch, not just the first one", "Keep the checklist as a living document — add items when you discover new risks", "Have someone ELSE review the checklist — fresh eyes catch what you miss", "Automate checks where possible — scripts are more reliable than manual verification"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Security checklist complete", "Performance targets met", "Core features verified", "Monitoring active", "Backup system verified", "Incident response plan exists"] }}
  ]
},

"1069b73b-8cbb-452c-861c-8fdd918bfaac": { // SSL/HTTPS Configuration
  goal: "Make your website always load with the secure lock icon — HTTPS everywhere.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Get the lock icon — make every connection to your app encrypted and trustworthy.", real_world: "Google Chrome marks HTTP sites as 'Not Secure'. HTTPS is mandatory for user trust, SEO ranking, and modern web features." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["HTTPS enforced on all routes", "SSL certificate configured (auto via hosting)", "HTTP to HTTPS redirect", "Secure cookies and headers", "HSTS header for forced HTTPS"], tech: ["SSL/TLS", "HTTPS", "Certificates", "Security Headers", "HSTS"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Frontend and backend deployed", "Custom domain (optional but recommended)", "Hosting platforms configured (Vercel + Render)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Verify HTTPS", description: "Open your deployed URLs → verify the lock icon shows in the browser. Try HTTP — it should redirect to HTTPS." },
      { title: "Test secure headers", description: "Check DevTools → Network → Headers → verify HSTS and other security headers are present." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Lock icon shows on all pages", "HTTP redirects to HTTPS automatically", "HSTS header is set", "Cookies marked as Secure", "No mixed content warnings"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "SSL/TLS Certificate", explanation: "A digital certificate that encrypts the connection between browser and server. Vercel and Render provide free certificates automatically." },
      { term: "HSTS (HTTP Strict Transport Security)", explanation: "Tells browsers 'always use HTTPS for this domain'. Even if a user types http://, the browser automatically converts to https://." },
      { term: "Mixed Content", explanation: "Loading HTTP resources (images, scripts) on an HTTPS page. Browsers block this. Make sure ALL resources use HTTPS." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Vercel and Render provide free SSL certificates — no manual setup needed", "Set HSTS max-age to at least 1 year for full protection", "Use relative URLs (/api/v1/...) instead of http://... to avoid mixed content", "Test with SSL Labs (ssllabs.com) for a detailed security grade"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["HTTPS is active on all deployments", "HTTP redirects to HTTPS", "HSTS header is configured", "No mixed content warnings", "SSL Labs grade is A or higher"] }}
  ]
},

"1ae44a0a-4dbd-4518-bbf9-fa593ad08907": { // Monitoring & Logging
  goal: "Make your app self-monitoring — automatically catch errors, track performance, and alert you when things break.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give your app eyes and ears — know when errors happen before your users report them.", real_world: "Netflix knows about outages within seconds through monitoring. Without it, you'd only find out when users start complaining." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Error tracking with Sentry (or similar)", "Structured logging (not just console.log)", "Performance monitoring for slow endpoints", "Uptime monitoring with alerts", "Log aggregation and search"], tech: ["Sentry", "Winston/Pino", "Monitoring", "Logging", "Alerts"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App deployed to production", "Multiple features running", "Error handling middleware in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Set up Sentry", description: "Create a free Sentry account → add the DSN to .env → trigger a test error → verify it shows in the Sentry dashboard." },
      { title: "Set up uptime monitoring", description: "Use a service like UptimeRobot (free) to ping your health check endpoint every 5 minutes." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Sentry captures errors with stack traces", "Structured logs write to files/service", "Uptime monitor pings health check", "Slow endpoints are detected", "Alerts trigger on critical errors"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Sentry", explanation: "An error tracking service that captures every unhandled error with full context: stack trace, user info, request data. Free tier handles most projects." },
      { term: "Structured Logging", explanation: "Instead of console.log('error'), use logger.error({ message, userId, endpoint, duration }). Structured logs are searchable, filterable, and machine-readable." },
      { term: "Uptime Monitoring", explanation: "An external service that hits your health check every few minutes. If it fails 3 times in a row, it sends you an email/SMS/Slack alert." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Set up Sentry for both frontend AND backend", "Use log levels: error (broken), warn (concerning), info (normal), debug (development only)", "Add request IDs to every log entry for tracing requests across services", "Set up alerts for: error rate spikes, response time > 5s, health check failures"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Error tracking captures errors", "Structured logging is in place", "Uptime monitoring is active", "Alerts configured for critical issues", "Dashboard shows monitoring data"] }}
  ]
},

};
