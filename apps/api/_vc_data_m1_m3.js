// Vibe Coding — Modules 1–3 seed data (Basics, Setup, Foundations)
// Each key = lesson UUID, value = { goal, sections }

module.exports = {

/* ═══════════════ MODULE: Vibe Coading Basics ═══════════════ */

// Vibe Coading Introduction
"29b7f49e-2457-480e-83eb-be8302e062e3": {
  goal: "Understand what Vibe Coding is and why it lets you build real apps 10x faster than traditional coding.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Discover the superpower that lets non-coders ship real software — and coders ship 10x faster.", real_world: "Companies like Replit, Vercel, and thousands of indie makers already use AI-assisted coding to launch products in hours, not months." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Mental model of how Vibe Coding works", "Understanding of the AI ↔ Developer feedback loop", "Confidence to start your first AI-powered project"], tech: ["Antigravity", "AI Agents", "Prompt-Driven Development"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Read the lesson material", description: "Go through the PDF slides to understand the core philosophy behind Vibe Coding — letting AI write code while you steer the ship." },
      { title: "Understand the feedback loop", description: "Vibe Coding works in a cycle:\n1. You describe WHAT you want\n2. AI writes the code\n3. You verify it works\n4. You refine with follow-up prompts\n\nThis loop is the foundation of everything that follows." },
      { title: "Explore the tools landscape", description: "Familiarize yourself with tools like Antigravity, Cursor, GitHub Copilot, and Replit — each is a different flavor of AI-assisted coding." }
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Vibe Coding", explanation: "A development approach where you describe what you want in plain English and AI agents generate the actual code — you guide the direction, AI handles the syntax." },
      { term: "AI Agent", explanation: "An AI assistant that can read your codebase, understand context, and generate/modify code across multiple files — far more powerful than simple autocomplete." },
      { term: "Prompt-Driven Development", explanation: "Instead of writing code line-by-line, you write clear instructions (prompts) and the AI translates them into working code." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Vibe Coding doesn't mean 'no thinking' — you still need to know WHAT to build, AI handles HOW",
      "The better your prompts, the better your code — prompt quality = code quality",
      "Always verify AI output — trust but verify is the golden rule",
      "Start simple, then iterate — don't try to build everything in one prompt"
    ] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Write down 3 app ideas you'd like to build by the end of this course. Be specific — 'a task manager with teams and deadlines' is better than 'an app'.", hint: "Think about problems you face daily. The best side projects solve YOUR problems.", difficulty: "beginner" }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "I understand what Vibe Coding is and how it differs from traditional coding",
      "I know the AI ↔ Developer feedback loop",
      "I understand that prompt quality directly impacts code quality",
      "I have a clear idea of what I want to build in this course"
    ] }}
  ]
},

// Perfect Code implementation
"087800f5-2195-4b9e-8309-f3489b90f708": {
  goal: "Learn the golden rules that make AI write production-quality code instead of messy prototypes.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Master the rules that force AI to write clean, production-grade code every single time.", real_world: "The difference between a hobby project and a professional app often comes down to code structure — these rules bridge that gap." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["A set of prompting rules that guarantee clean code output", "Understanding of what makes code 'production-quality'", "Templates for structuring AI requests"], tech: ["Code Quality", "Clean Architecture", "Prompt Rules"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Study the Perfect Code Rules", description: "Read through the PDF material covering the key principles:\n• Always demand typed/structured responses\n• Require error handling in every function\n• Insist on separation of concerns\n• Ask for comments only where logic is non-obvious" },
      { title: "Practice applying rules to prompts", description: "Take a simple feature request like 'add a login page' and rewrite it using the Perfect Code rules — adding constraints about error handling, types, and structure." },
      { title: "Compare outputs", description: "Try the same request WITH and WITHOUT the rules. Notice how the structured prompt produces cleaner, more maintainable code." }
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Separation of Concerns", explanation: "Each file/function does ONE thing — routes handle HTTP, services handle logic, repos handle data. This makes code easy to debug and maintain." },
      { term: "Error Boundaries", explanation: "Every function that can fail has try/catch blocks and returns meaningful error messages instead of crashing the app." },
      { term: "Type Safety", explanation: "Using TypeScript types or Zod schemas to validate data shapes — prevents 'undefined is not a function' errors." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Always include 'follow existing patterns in the codebase' in your prompts — AI will match your style",
      "Ask AI to 'add error handling for edge cases' after the initial implementation",
      "Request 'no console.log in production code — use proper logging' to keep output clean",
      "End prompts with 'ensure this works with the existing code without breaking anything'"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Accepting AI code without reading it", fix: "Always scan the generated code — look for hardcoded values, missing error handling, and unused imports." },
      { mistake: "Prompts that are too vague ('make a good login')", fix: "Be specific: 'create a login form with email + password, client-side validation, loading state, error display, and redirect to /dashboard on success.'" },
      { mistake: "Not specifying the tech stack in prompts", fix: "Always state: 'Using React + TypeScript + Tailwind for frontend, Node + Express for backend' so AI doesn't guess wrong." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "I know the key rules for getting production-quality code from AI",
      "I understand separation of concerns (routes → services → repos)",
      "I can write structured prompts with clear constraints",
      "I understand why error handling must be explicitly requested"
    ] }}
  ]
},

// Error handling
"ecb8d71f-face-4dc7-8963-7f00e5f74174": {
  goal: "Master the art of debugging AI-generated code so errors become stepping stones, not roadblocks.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Turn error messages from scary red text into clear instructions that fix themselves.", real_world: "Even senior developers spend 40% of their time debugging — learning to debug with AI makes you faster than most professionals." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["A systematic approach to reading error messages", "Error prompt templates that get instant fixes from AI", "Understanding of common error categories and their solutions"], tech: ["Debugging", "Error Prompts", "Stack Traces"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Learn to read error messages", description: "Every error has 3 parts:\n1. Error TYPE (SyntaxError, TypeError, etc.)\n2. Error MESSAGE (what went wrong)\n3. STACK TRACE (where it happened)\n\nThe stack trace is your treasure map — it points to the exact file and line." },
      { title: "Master the Error Prompt formula", description: "When you hit an error, use this template:\n'I got this error: [PASTE FULL ERROR]\nContext: [what you were doing]\nStack: [your tech stack]\nFix it without breaking existing features.'" },
      { title: "Practice the debug loop", description: "Error → Read → Understand → Prompt AI → Apply Fix → Test → Repeat if needed. Most issues resolve in 1-2 cycles." }
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Stack Trace", explanation: "A list of function calls that shows the path the code took before crashing — read from bottom to top to find where YOUR code triggered the error." },
      { term: "Runtime vs Build Error", explanation: "Build errors happen when code is compiled (missing imports, syntax issues). Runtime errors happen when code runs (null values, network failures). Different strategies for each." },
      { term: "Error Propagation", explanation: "Errors 'bubble up' from the deepest function to the surface — the real cause is often deeper than where the error appears." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Always paste the FULL error message — AI needs the stack trace to give accurate fixes",
      "Include your file structure and tech stack in error prompts for better context",
      "If an AI fix creates a new error, include BOTH the original and new error in your next prompt",
      "Keep a personal 'error journal' — patterns emerge that speed up future debugging"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Only pasting the last line of an error", fix: "Copy EVERYTHING — the full red block including file paths and line numbers. More context = better fix." },
      { mistake: "Applying fixes without understanding them", fix: "Ask AI to 'explain what caused this error and why this fix works' — this builds your debugging intuition." },
      { mistake: "Ignoring warnings (yellow text)", fix: "Warnings become errors later. Fix them early: 'Fix all console warnings in my terminal without breaking features.'" }
    ] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Intentionally break your code in 3 different ways (wrong import, missing env var, wrong API route) and practice the debug loop each time.", hint: "Comment out a crucial import, change a route path, or delete an environment variable — then use the Error Prompt template to fix each.", difficulty: "beginner" }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "I can read a stack trace and identify the error source",
      "I know the Error Prompt formula for getting AI fixes",
      "I understand the difference between build-time and runtime errors",
      "I know to paste the FULL error message, not just the last line"
    ] }}
  ]
},

/* ═══════════════ MODULE: Setup & Accounts ═══════════════ */

// Setup Fullstack environment
"027f80e8-e56d-446a-82dd-ac81ce549a9e": {
  goal: "Set up your complete full-stack development environment so you're ready to build real apps.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build your developer cockpit — every tool configured, every account ready, zero excuses left.", real_world: "Professional developers spend their first day at any job setting up their environment. Do it once, build forever." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Google Antigravity AI agent fully configured", "Full-stack project with React frontend + Node backend", "PostgreSQL database on Neon cloud", "Complete development environment ready to code"], tech: ["Antigravity", "React", "Node.js", "Neon PostgreSQL", "Vite"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["A computer with internet access", "A Google account for Antigravity", "Patience — this is a one-time setup that pays off forever"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Install Antigravity", description: "Download and install Google Antigravity from the official site. Sign in with your Google account. This is your AI coding partner for the entire course." },
      { title: "Create the full-stack project", description: "Open Antigravity → use the MAIN PROMPT to generate your monorepo structure with:\n• apps/web (React + Vite + Tailwind frontend)\n• apps/api (Node.js + Express backend)" },
      { title: "Set up Neon PostgreSQL", description: "Go to neon.tech → create a free account → create a new database → copy the connection string into your .env file." },
      { title: "Run the commands", description: "Use the Commands tab to install dependencies and start both frontend and backend. Verify both are running without errors." },
      { title: "Verify everything works", description: "Frontend loads at localhost:5173, backend API responds at localhost:3000/api/v1/health, database connects without errors." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "Antigravity is installed and you can open the Agent panel",
      "Project folder has apps/web and apps/api directories",
      "Frontend loads at http://localhost:5173",
      "Backend health check responds at /api/v1/health",
      "Neon database connection string is in .env and connects successfully",
      "No red errors in either terminal"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Monorepo", explanation: "A single repository containing both frontend and backend code in separate folders (apps/web and apps/api). Easier to manage than two separate repos." },
      { term: "Neon PostgreSQL", explanation: "A cloud-hosted PostgreSQL database that's free for development. Your data lives in the cloud so you can access it from anywhere." },
      { term: "Environment Variables (.env)", explanation: "Secret configuration stored in a .env file — database URLs, API keys, etc. Never committed to GitHub. Each developer has their own .env." },
      { term: "Vite", explanation: "A blazing-fast frontend build tool that gives you instant hot-reload — save a file and see changes in milliseconds." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Bookmark your Neon dashboard — you'll need it when checking database data",
      "Keep two terminal tabs open: one for backend (apps/api), one for frontend (apps/web)",
      "Save your .env file somewhere safe (password manager) — you'll need it if you switch computers",
      "If anything fails during setup, use the Error Prompt with the FULL terminal output"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Forgetting to create .env file", fix: "Copy .env.example to .env and fill in your Neon connection string. The app won't start without it." },
      { mistake: "Running npm install in the wrong folder", fix: "Make sure you're in apps/api for backend packages and apps/web for frontend packages." },
      { mistake: "Port already in use error", fix: "Another app is using port 3000 or 5173. Close other terminals or change the port in your config." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Antigravity is installed and working",
      "Monorepo structure is created (apps/web + apps/api)",
      "Neon database is provisioned and connection string is in .env",
      "Frontend runs at localhost:5173 without errors",
      "Backend runs at localhost:3000 with healthy API",
      "I have two terminal tabs ready (one per app)"
    ] }}
  ]
},

// Deploying setup
"058debf4-fd71-457b-b9f8-15012c4c6a3e": {
  goal: "Set up Git, GitHub, Vercel, and Render so you can deploy your app to the real internet.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Connect your code to the cloud — so one push sends your app live to the entire world.", real_world: "Every professional developer uses Git + CI/CD. This setup means your future deployments are literally 'git push' and done." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Git repository initialized with proper .gitignore", "GitHub remote repository connected", "Vercel account linked for frontend deployment", "Render account ready for backend deployment"], tech: ["Git", "GitHub", "Vercel", "Render"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Full-stack environment set up (previous lesson)", "Frontend + backend running locally without errors", "Email address for creating accounts"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Set up Git", description: "Initialize a Git repo in your project root, create a .gitignore (exclude node_modules, .env, dist), and make your first commit." },
      { title: "Create GitHub repository", description: "Go to github.com → New Repository → name it → push your local code:\ngit remote add origin [URL]\ngit push -u origin main" },
      { title: "Set up Vercel (frontend)", description: "Sign up at vercel.com → connect your GitHub → import your repo → set root directory to apps/web → deploy." },
      { title: "Set up Render (backend)", description: "Sign up at render.com → New Web Service → connect GitHub → set root directory to apps/api → add environment variables → deploy." },
      { title: "Run commands and verify", description: "Use the Commands tab to run the setup commands. Verify Git status is clean, GitHub shows your code, and accounts are linked." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "git status shows a clean working tree",
      "GitHub repo has all your code",
      "Vercel account is created and linked to GitHub",
      "Render account is created and linked to GitHub",
      "You understand the push → deploy flow"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Git", explanation: "A version control system that tracks every change to your code. Think of it as 'unlimited undo' for your entire project." },
      { term: "GitHub", explanation: "Cloud storage for your Git repositories. It's both a backup and a collaboration hub — plus it connects to deployment services." },
      { term: "Vercel", explanation: "A platform that takes your frontend code and hosts it on a global CDN — fast loading from anywhere in the world, with automatic HTTPS." },
      { term: "Render", explanation: "A cloud platform that runs your backend server 24/7. It auto-deploys when you push code and handles scaling." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Never commit .env files — add .env to .gitignore BEFORE your first commit",
      "Write meaningful commit messages: 'add user auth system' not 'fix stuff'",
      "Set up Vercel and Render environment variables BEFORE deploying — they need your DB URL and secrets",
      "Use 'git status' before every commit to see exactly what's being tracked"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Accidentally committing .env with secrets", fix: "Add .env to .gitignore immediately. If already committed, remove it: git rm --cached .env && add .env to .gitignore." },
      { mistake: "Push fails with 'rejected — non-fast-forward'", fix: "Run 'git pull origin main --rebase' first, then push again." },
      { mistake: "Vercel/Render build fails with 'module not found'", fix: "Make sure root directory is set correctly (apps/web or apps/api) and all dependencies are in package.json." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Git repo initialized with clean .gitignore",
      "Code pushed to GitHub successfully",
      "Vercel account created and connected",
      "Render account created and connected",
      "I understand the git push → auto-deploy pipeline"
    ] }}
  ]
},

/* ═══════════════ MODULE: Project Foundations ═══════════════ */

// Base API Architecture
"65c36d0b-6e10-46ec-9855-c3ebbc418280": {
  goal: "Build a clean, organized backend API with proper versioning and a health check that proves everything works.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Create the backbone of your app — a clean API that's ready to scale from day one.", real_world: "Every app you use daily (Instagram, Spotify, Uber) has an API like this behind it — organized, versioned, and reliable." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Versioned API routes under /api/v1", "Health check endpoint that confirms server + database status", "Clean project structure (routes → controllers → services → repos)", "CORS and JSON middleware configured"], tech: ["Node.js", "Express", "PostgreSQL", "REST API"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Full-stack environment running (apps/api + apps/web)", "Database connected (Neon PostgreSQL)", "Antigravity Agent ready"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Open your project in Antigravity", description: "Open Antigravity → navigate to your project folder → open the Agent panel." },
      { title: "Paste the Main Prompt", description: "Copy the MAIN PROMPT from the Prompts tab below and paste it into the Agent. This generates the entire API architecture." },
      { title: "Run the commands", description: "After the agent finishes, use the Commands tab to install dependencies and start the server." },
      { title: "Test the health check", description: "Open your browser or Postman → hit GET /api/v1/health → you should see a JSON response confirming server and database status." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "GET /api/v1/health returns { ok: true, database: 'connected' }",
      "No red errors in the terminal",
      "Project has clean folder structure (routes, controllers, services)",
      "CORS is configured and accepts requests from frontend"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "API Versioning (/api/v1)", explanation: "Putting 'v1' in the URL means you can create 'v2' later without breaking existing clients. Like having 'Edition 1' of a book while writing 'Edition 2'." },
      { term: "Health Check Endpoint", explanation: "A special URL that returns 'I'm alive and connected to the database'. Monitoring tools ping this every few seconds to ensure your app is running." },
      { term: "Middleware", explanation: "Code that runs BEFORE your route handler — like a security guard checking IDs before letting people into a building. CORS, JSON parsing, and auth are common middleware." },
      { term: "Routes → Controllers → Services → Repos", explanation: "A layered architecture: Routes define URLs, Controllers handle HTTP logic, Services contain business logic, Repos talk to the database. Each layer has one job." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Always test your health check first — if this works, your foundation is solid",
      "Use 'npm run dev' with nodemon for auto-restart on file changes",
      "Keep your route files thin — they should only call controller functions, not contain logic",
      "Add a '/api/v1' prefix to ALL routes from the start — it's much harder to add later"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Database connection fails silently", fix: "Check that DATABASE_URL in .env matches your Neon connection string. Add ?sslmode=require at the end." },
      { mistake: "CORS errors when frontend calls backend", fix: "Make sure CORS middleware allows localhost:5173 (your frontend URL) as an origin." },
      { mistake: "Port 3000 already in use", fix: "Another process is using port 3000. Kill it with 'npx kill-port 3000' or change PORT in .env." }
    ] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Add a GET /api/v1/info endpoint that returns the app name, version from package.json, current environment (dev/prod), and server uptime.", hint: "Use process.uptime() for uptime and process.env.NODE_ENV for environment.", difficulty: "beginner" }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Health check endpoint responds correctly",
      "Project structure follows routes → controllers → services → repos",
      "CORS allows frontend requests",
      "Server starts without errors",
      "I understand what API versioning is"
    ] }}
  ]
},

// User Schema Design
"c64f0b60-5e61-4203-a5a6-4add6fd7b108": {
  goal: "Create the User database table — the foundation that stores every account in your app.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Design the 'Users' table — because every great app starts with knowing who's using it.", real_world: "Netflix, Twitter, your bank — they all have a Users table at their core. This is the first thing every serious app builds." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Users database table with proper columns", "Email uniqueness constraint", "Timestamps (created_at, updated_at)", "Password hash column (never store plain passwords)"], tech: ["PostgreSQL", "Prisma ORM", "Database Design"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Base API Architecture lesson completed", "Backend running and connected to Neon database", "Health check returns 'database: connected'"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste the MAIN PROMPT from the Prompts tab → Send. The agent will create the Prisma schema and migration." },
      { title: "Run the migration", description: "Use the Commands tab to run the Prisma migration. This creates the actual table in your Neon database." },
      { title: "Verify in Neon dashboard", description: "Open your Neon dashboard → SQL Editor → run 'SELECT * FROM users;' → you should see an empty table with the right columns." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "Prisma schema has a User model with id, email, password, name, timestamps",
      "Migration ran without errors",
      "Neon dashboard shows the users table with correct columns",
      "Email column has a unique constraint"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Database Schema", explanation: "A blueprint that defines what columns a table has, what types they hold, and what rules they follow — like an architectural plan before construction." },
      { term: "Prisma ORM", explanation: "A tool that lets you define database tables in code and generates SQL automatically. Write schema in Prisma syntax → Prisma creates the actual database table." },
      { term: "Migration", explanation: "A versioned change to your database structure. Like Git commits but for your database — you can track and replay every structural change." },
      { term: "Password Hashing", explanation: "Converting a plain password into a scrambled string. Even if someone steals your database, they can't read the actual passwords." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Always use UUID for primary keys instead of auto-increment — it's more secure and works better in distributed systems",
      "Add timestamps (created_at, updated_at) to EVERY table — you'll thank yourself during debugging",
      "Never store plain text passwords — always hash with bcrypt (this prompt handles it)",
      "Make email unique AND case-insensitive to prevent duplicate accounts"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Prisma schema syntax error", fix: "Check for missing commas, wrong types, or missing @id decorator. Run 'npx prisma format' to auto-fix formatting." },
      { mistake: "Migration fails with 'database does not exist'", fix: "Check that DATABASE_URL in .env is correct and the Neon database is active." },
      { mistake: "Forgetting the unique constraint on email", fix: "Add @unique to the email field in Prisma schema and run a new migration." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Users table exists in the database",
      "Email has a unique constraint",
      "Password column stores hashed values (not plain text)",
      "Timestamps are included",
      "Migration is tracked in version control"
    ] }}
  ]
},

// Authentication System - Backend
"d85ae546-2831-41ba-a78c-3ff6cee78189": {
  goal: "Build signup and login APIs so users can create accounts and access your app securely with JWT tokens.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give your app a front door with a lock — signup and login that actually work.", real_world: "Every time you tap 'Sign in with email' on any app, a system like this is running behind the scenes." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["POST /api/v1/auth/signup — creates a new user account", "POST /api/v1/auth/login — authenticates and returns JWT tokens", "Password hashing with bcrypt", "Access token + refresh token system"], tech: ["JWT", "bcrypt", "Express", "PostgreSQL"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User Schema Design lesson completed", "Users table exists in database", "Backend running at localhost:3000"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent panel → paste the MAIN PROMPT → Send. The agent will generate auth routes, controllers, and services." },
      { title: "Run and check", description: "Start the backend with the Commands tab. Test the endpoints:\n• POST /api/v1/auth/signup with { email, password, name }\n• POST /api/v1/auth/login with { email, password }\nBoth should return user data + tokens." },
      { title: "Handle errors if any", description: "If you see red errors, copy the full terminal output and paste it into the Error Prompt. Apply the fix, restart, and test again." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "POST /api/v1/auth/signup creates a user and returns tokens",
      "POST /api/v1/auth/login returns user data + tokens for valid credentials",
      "Wrong password returns 401 error (not a crash)",
      "Duplicate email returns 409 error",
      "No red errors in the terminal"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "JWT (JSON Web Token)", explanation: "A secure string that contains encoded user info (id, role). The server creates it at login, and the client sends it with every request to prove 'I'm logged in'." },
      { term: "Access Token vs Refresh Token", explanation: "Access token expires quickly (15 min) for security. Refresh token lasts longer (7 days) and is used to get a new access token without re-logging in." },
      { term: "bcrypt Hashing", explanation: "Converts 'mypassword123' into '$2b$10$X7EY...' — a one-way transformation. You can verify a password against the hash, but can't reverse it." },
      { term: "401 vs 409 Status Codes", explanation: "401 = Unauthorized (wrong credentials). 409 = Conflict (email already exists). Using correct status codes helps frontends show the right error message." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Store JWT_SECRET in .env — never hardcode secrets in your source code",
      "Test with Postman or Thunder Client to verify APIs before building the frontend",
      "Log the generated tokens in development to debug JWT issues",
      "Set short access token expiry (15min) and longer refresh token (7 days) for security"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "JWT_SECRET not set in .env", fix: "Add JWT_SECRET=your-super-secret-key-here to your .env file. Use a long random string." },
      { mistake: "bcrypt compare always returns false", fix: "Make sure you're comparing the plain password with the HASHED password from the database, not the other way around." },
      { mistake: "'Cannot set headers after they are sent'", fix: "You have two res.json() calls in the same route handler. Add 'return' before each res.json() to stop execution." }
    ] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Add a POST /api/v1/auth/refresh endpoint that accepts a refresh token and returns a new access token.", hint: "Verify the refresh token, extract the user ID, and sign a new access token.", difficulty: "intermediate" }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Signup creates user and returns tokens",
      "Login works with correct credentials",
      "Invalid credentials return proper error codes",
      "Passwords are hashed in the database",
      "JWT_SECRET is in .env (not hardcoded)"
    ] }}
  ]
},

// Password Security & Hashing
"0c496b89-f239-4acd-8563-14da17ccac83": {
  goal: "Enforce strong password rules, proper hashing, and secure password change flow.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make your app's passwords Fort Knox-level secure — strong rules, always hashed, safely changeable.", real_world: "Password breaches cost companies millions. Companies like Apple and Google enforce strict password policies — now your app will too." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Password strength validation (min 8 chars, uppercase, number, special char)", "bcrypt hashing for all stored passwords", "Change password endpoint with old password verification", "Password never returned in any API response"], tech: ["bcrypt", "Validation", "Security", "Express"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Authentication System lesson completed", "Signup and login APIs working", "At least one test user created in the database"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste the MAIN PROMPT → Send. The agent adds password rules and a change-password endpoint." },
      { title: "Run and test", description: "Restart the backend. Test:\n• Signup with weak password (should fail with clear message)\n• Signup with strong password (should succeed)\n• Change password with correct old password (should work)\n• Change password with wrong old password (should fail)" },
      { title: "Fix any errors", description: "If errors appear, use the Error Prompt template to get AI to fix them." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "Weak passwords are rejected with helpful error messages",
      "Strong passwords are accepted and hashed",
      "Change password requires correct old password",
      "Password field is never returned in API responses",
      "No plain-text passwords in the database"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Password Hashing vs Encryption", explanation: "Hashing is one-way (can't reverse it). Encryption is two-way (can decrypt). For passwords, always use hashing — you never need to see the original password, only verify it." },
      { term: "Salt Rounds (bcrypt)", explanation: "A 'salt' is random data added before hashing. More rounds = slower hashing = harder to crack. 10-12 rounds is standard for web apps." },
      { term: "Password Policy", explanation: "Rules that define what makes a 'strong' password. Minimum length, character variety, and no common passwords protect against brute-force attacks." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Use bcrypt's built-in salt — don't try to manage salts manually",
      "Always strip password fields from API responses using SELECT or Prisma's 'select' option",
      "Consider adding a 'password strength meter' on the frontend for better UX",
      "Rate-limit password change attempts to prevent brute-force"
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Password validation rejects weak passwords",
      "All passwords are bcrypt-hashed in the database",
      "Change password verifies old password first",
      "API responses never include password field",
      "I understand hashing vs encryption"
    ] }}
  ]
},

// Auth Middleware & Route Protection
"cc3fea9e-a5b1-427f-9812-2ceb0fde801c": {
  goal: "Lock your API routes so only logged-in users access private data and only admins reach admin panels.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add bouncers to your API — no token, no entry. Admin routes? VIP access only.", real_world: "Every secure app has route protection. When Instagram shows 'Log in to continue', that's auth middleware at work." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Auth middleware that validates JWT on every request", "Protected routes that require authentication", "Role-based access control (user vs admin)", "Proper 401/403 error responses"], tech: ["JWT", "Express Middleware", "RBAC", "Authorization"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Authentication System lesson completed", "JWT tokens working (signup/login return valid tokens)", "At least one test user in the database"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste the MAIN PROMPT → Send. The agent creates auth middleware and protects routes." },
      { title: "Run and test access control", description: "Test these scenarios:\n• Hit a protected route WITHOUT token → should get 401\n• Hit a protected route WITH valid token → should succeed\n• Hit an admin route as regular user → should get 403\n• Hit an admin route as admin → should succeed" },
      { title: "Handle errors if needed", description: "Copy any error output → paste into Error Prompt → apply fix → restart." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "Protected routes return 401 without a valid token",
      "Protected routes work normally with a valid token",
      "Admin routes return 403 for non-admin users",
      "Token is read from the Authorization header",
      "Expired tokens are properly rejected"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Middleware", explanation: "A function that runs BETWEEN receiving a request and sending a response. Auth middleware checks 'does this request have a valid token?' before the route handler runs." },
      { term: "Authorization Header", explanation: "The standard way to send tokens: 'Authorization: Bearer eyJhbG...' — the word 'Bearer' followed by the JWT token." },
      { term: "401 vs 403", explanation: "401 = 'Who are you?' (not logged in). 403 = 'I know who you are, but you're not allowed here' (insufficient role/permissions)." },
      { term: "RBAC (Role-Based Access Control)", explanation: "Users have roles (admin, user, editor). Each role has different permissions. The middleware checks if the user's role is allowed for that route." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Apply auth middleware at the router level, not individual routes — less repetition",
      "Always verify token expiry — expired tokens should be rejected with a clear message",
      "Create a separate middleware for admin-only routes: requireAdmin",
      "Include the user's ID and role in the decoded token for easy access in route handlers"
    ] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "'jwt malformed' error", fix: "Make sure the token is sent as 'Bearer TOKEN' not just 'TOKEN'. Split on space and take index [1]." },
      { mistake: "All routes return 401 even with valid token", fix: "Check that JWT_SECRET in .env matches what was used to sign the token. Restart the server after changing .env." },
      { mistake: "Middleware runs but req.user is undefined", fix: "After verifying the token, make sure you do: req.user = decoded; (assign the decoded payload to the request object)." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Auth middleware validates JWT tokens correctly",
      "Protected routes reject requests without tokens",
      "Admin routes reject non-admin users",
      "Error responses use correct HTTP status codes (401/403)",
      "I understand the difference between authentication and authorization"
    ] }}
  ]
},

// Global Error Handling
"a83095d3-d145-464b-b2cc-c3fb3b5647d2": {
  goal: "Make all backend errors return clean, consistent JSON so your app never crashes or shows ugly stack traces.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Turn chaotic error messages into clean, predictable JSON — your app never crashes, it communicates.", real_world: "When Stripe's API returns an error, it's always the same format with clear codes and messages. That's exactly what you're building." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Global error handler middleware", "Consistent error response format { ok: false, error, code }", "Custom error classes (NotFoundError, ValidationError, etc.)", "Unhandled error safety net that prevents server crashes"], tech: ["Express", "Error Handling", "Middleware", "API Design"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Base API Architecture lesson completed", "Backend running with at least one route working", "Understanding of middleware (from Auth Middleware lesson)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste the MAIN PROMPT → Send. The agent creates the global error handler and custom error classes." },
      { title: "Run and test error handling", description: "Start the backend. Test:\n• Hit a non-existent route → should get { ok: false, error: 'Not found' } with 404\n• Trigger a validation error → should get clean 400 response\n• No ugly stack traces should appear in responses" },
      { title: "Fix any issues", description: "Use the Error Prompt if something isn't working as expected." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "All errors return consistent JSON format",
      "404 routes return proper 'not found' response",
      "Validation errors include field-level details",
      "Stack traces are hidden from API responses (only logged server-side)",
      "Server never crashes — errors are caught and handled"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Global Error Handler", explanation: "A special Express middleware with 4 parameters (err, req, res, next) that catches ALL unhandled errors in one place — your safety net." },
      { term: "Custom Error Classes", explanation: "NotFoundError, ValidationError, UnauthorizedError — each extends Error with a specific HTTP status code. Throw them anywhere, the global handler formats the response." },
      { term: "Error vs Crash", explanation: "An error is expected (bad input, not found). A crash is unexpected (uncaught exception). Good error handling turns potential crashes into clean error responses." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Always register the global error handler LAST — after all routes",
      "Log errors server-side with timestamps and request IDs for debugging",
      "In production, never expose internal error messages — return generic messages for 500 errors",
      "Add a 'request ID' to every response header for easier debugging in production"
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "Global error handler catches all errors",
      "Error responses follow a consistent JSON format",
      "Stack traces are never exposed to clients",
      "Custom error classes throw correct status codes",
      "Server stays up even when errors occur"
    ] }}
  ]
},

// API Testing & Documentation
"edee5f7b-d77d-431c-b5e5-8e20764d8852": {
  goal: "Create ready-made API test collections so you can verify every endpoint works with one click.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build a test dashboard for your API — one click to check if everything still works.", real_world: "Professional API teams use tools like Postman daily. You'll have a test suite that works like a QA engineer in a box." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Postman/Thunder Client collection with all endpoints", "Pre-configured test requests for Health, Auth, and Users", "Environment variables for easy switching (dev/prod)", "Example request bodies and expected responses"], tech: ["Postman", "Thunder Client", "API Testing", "REST"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Base API Architecture lesson completed", "Authentication System working", "Backend running with health check responding"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste the MAIN PROMPT → Send. The agent generates the API test collection and documentation." },
      { title: "Import the collection", description: "Open Postman or Thunder Client → Import the generated collection file → you should see all endpoints organized by category." },
      { title: "Run the tests", description: "Set the base URL to http://localhost:3000 → run the Health check first → then Auth endpoints → then User endpoints. Each should return expected results." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: [
      "Test collection imported with all endpoints organized",
      "Health check passes",
      "Auth endpoints (signup/login) work correctly",
      "User endpoints return proper responses",
      "All tests can run in sequence without errors"
    ] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "API Collection", explanation: "A saved group of API requests organized by feature (Auth, Users, Tasks). Instead of typing URLs manually, you click a button to test." },
      { term: "Environment Variables (in Postman)", explanation: "Reusable values like BASE_URL and AUTH_TOKEN. Switch from 'dev' to 'prod' environment and all requests update automatically." },
      { term: "API Documentation", explanation: "A human-readable description of every endpoint: what it does, what params it needs, what it returns. Your collection IS your living documentation." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: [
      "Add a 'Run All' script that tests endpoints in the correct order (health → signup → login → protected)",
      "Save the auth token as an environment variable so protected routes auto-include it",
      "Add example error responses too — document what happens when things go wrong",
      "Keep the collection updated as you add new endpoints — it's your API's source of truth"
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: [
      "API test collection is imported and working",
      "All endpoint categories are organized",
      "Health check, Auth, and User endpoints pass",
      "Environment variables are configured",
      "I can test any endpoint with one click"
    ] }}
  ]
},

};
