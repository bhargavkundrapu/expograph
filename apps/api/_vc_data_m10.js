// Vibe Coding — Module 10: TESTING & QUALITY (10 lessons)

module.exports = {

"af6aadf8-f3d2-4885-aef4-db6a36fe0520": { // Unit Testing - Backend
  goal: "Write automatic tests for your backend logic so bugs get caught before they reach users.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build your backend's immune system — unit tests that catch bugs the moment they're introduced.", real_world: "Companies like Stripe and Shopify require 90%+ test coverage. Tests are what let you ship changes with confidence." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Jest/Vitest test framework configured", "Unit tests for auth service (signup, login)", "Unit tests for validation functions", "Test utilities and helpers", "Code coverage reporting"], tech: ["Jest", "Vitest", "Unit Testing", "Mocking", "Node.js"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend services with business logic (auth, CRUD)", "Test framework installed (npm install jest --save-dev)", "Understanding of what a test is"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run tests", description: "cd apps/api → npm test → verify all tests pass with green checkmarks." },
      { title: "Check coverage", description: "npm test -- --coverage → verify coverage report shows percentages per file." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Test framework runs without errors", "Auth service tests pass", "Validation tests pass", "Coverage report generates", "Tests are descriptive and organized"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Unit Test", explanation: "Tests one function in isolation. 'Does hashPassword() return a string?' 'Does validateEmail() reject invalid formats?' Quick, focused, and reliable." },
      { term: "Mocking", explanation: "Replacing real dependencies (database, email) with fake versions during tests. This way, tests run fast without needing real infrastructure." },
      { term: "Assertion", explanation: "The 'check' in a test: expect(result).toBe(true). If the assertion fails, the test fails, and you know exactly what broke." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Write tests for the 'happy path' AND edge cases (empty input, null values, wrong types)", "Use descriptive test names: 'should return 401 when password is wrong'", "Run tests in CI so they execute on every push automatically", "Write a test AFTER fixing a bug — ensures it never comes back"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Test framework is configured", "Auth tests pass", "Validation tests pass", "Coverage report shows tested areas", "Tests are well-organized and descriptive"] }}
  ]
},

"a893ebb6-d6bd-4c49-ae09-0fc25ce461a9": { // Frontend Component Testing
  goal: "Test your React components automatically — verify login, signup, and forms work like a robot user.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Test your UI like a robot — verify buttons click, forms submit, and pages render correctly.", real_world: "Airbnb tests every component automatically. If someone breaks the search bar, tests catch it before deploy." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["React Testing Library setup", "Login component test", "Signup form test", "Component rendering tests", "User interaction tests (click, type, submit)"], tech: ["React Testing Library", "Vitest", "Component Testing", "jsdom", "Testing"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Frontend components built (Login, Signup, etc.)", "Vitest or Jest installed in apps/web", "Basic understanding of testing concepts"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run frontend tests", description: "cd apps/web → npm test → verify component tests pass." },
      { title: "Review test output", description: "Check that tests describe real user behavior: 'user can type email', 'submit shows loading state'." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Test framework runs without errors", "Login component test passes", "Signup form test passes", "Tests simulate real user interactions", "All assertions verify expected behavior"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "React Testing Library", explanation: "Tests components the way users use them: find elements by text/label, simulate clicks and typing. Tests behavior, not implementation details." },
      { term: "Render + Query", explanation: "render(<LoginForm />) puts the component in a virtual DOM. screen.getByLabelText('Email') finds the input. fireEvent.change() types into it." },
      { term: "Async Testing", explanation: "API calls in components are async. Use waitFor() or findBy* queries to wait for content to appear after a loading state." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Test user behavior, not implementation: 'user sees welcome message' not 'state updates'", "Mock API calls with msw (Mock Service Worker) for reliable tests", "Use getByRole and getByLabelText over getByTestId — they're more accessible", "Write tests for the most critical user flows: auth, CRUD, navigation"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Frontend test framework is set up", "Component tests pass", "User interactions are simulated", "Async behavior is tested", "Tests are descriptive"] }}
  ]
},

"09c61722-93be-47a9-b9ff-d79d8232010d": { // Integration Testing - API
  goal: "Test your actual API endpoints from end to end — verify signup, login, and CRUD work without manually using Postman.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Test your real APIs automatically — no more manual Postman clicking for every change.", real_world: "Stripe runs thousands of API integration tests before every release. Automated API tests are your safety net." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Supertest setup for HTTP testing", "Auth endpoint tests (signup → login → protected route)", "CRUD endpoint tests", "Test database setup and teardown", "Error response testing"], tech: ["Supertest", "Jest", "API Testing", "Integration Tests", "Express"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend API with auth and CRUD endpoints", "Test framework configured", "Test database available (separate from dev)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run integration tests", description: "cd apps/api → npm test → verify all API tests pass." },
      { title: "Review test scenarios", description: "Check that tests cover: successful operations, validation errors, auth failures, and not-found cases." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Auth flow tests pass (signup → login → access protected)", "CRUD tests pass for all operations", "Error cases are tested (400, 401, 404)", "Test database cleans up between tests", "Tests run in under 30 seconds"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Supertest", explanation: "A library that makes HTTP requests to your Express app without starting a real server. Fast, isolated, and perfect for API testing." },
      { term: "Test Lifecycle", explanation: "beforeAll: set up test database. beforeEach: clean data. afterAll: close connections. This ensures each test starts fresh." },
      { term: "End-to-End API Test", explanation: "Tests the full request pipeline: HTTP → middleware → controller → service → database → response. If any part is broken, the test fails." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use a separate test database — never test on dev or production data", "Test the full flow: signup → get token → use token on protected endpoint", "Test error responses too: wrong password returns 401, not 500", "Keep tests independent — each test should work even if run alone"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Integration tests run and pass", "Auth flow tested end-to-end", "CRUD operations tested", "Error cases covered", "Test database is isolated"] }}
  ]
},

"98591079-53dc-4e34-9dc2-81438af2d561": { // E2E Testing
  goal: "Run real browser tests that simulate a user signing up, logging in, and creating items.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Test your app like a real user — automated browser tests that click buttons, fill forms, and verify everything works.", real_world: "Playwright and Cypress are used by Google, Microsoft, and Netflix. E2E tests are the ultimate confidence booster." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Playwright/Cypress setup", "Signup → login → create item test flow", "Screenshot on failure", "Multi-browser testing", "CI integration for E2E tests"], tech: ["Playwright", "E2E Testing", "Browser Automation", "CI/CD", "Testing"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App with auth and CRUD fully working", "Both frontend and backend running", "Playwright installed (npx playwright install)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run E2E tests", description: "Start both apps → npx playwright test → watch the browser automate through your app." },
      { title: "Review results", description: "Check the HTML report → verify all tests pass → review screenshots of any failures." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["E2E tests run in a real browser", "Signup → login → create flow completes successfully", "Tests pass on Chrome (at minimum)", "Screenshots captured on failure", "Tests complete in under 2 minutes"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "E2E (End-to-End) Testing", explanation: "Testing the entire app from the user's perspective: real browser, real clicks, real network requests. The most realistic but slowest type of test." },
      { term: "Playwright", explanation: "Microsoft's browser automation library. Supports Chrome, Firefox, Safari. Fast, reliable, and auto-waits for elements before interacting." },
      { term: "Test Isolation", explanation: "Each E2E test should start fresh. Create a new user per test, clean up after. This prevents tests from interfering with each other." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Write E2E tests for critical paths only — they're slow, so pick the most important flows", "Use Playwright's auto-wait instead of manual delays — more reliable", "Take screenshots at key steps for visual verification", "Run E2E tests in CI but not on every commit — only on PRs and deploys"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["E2E framework is set up", "Critical user flow tests pass", "Multi-browser support configured", "Screenshots on failure work", "Tests complete in reasonable time"] }}
  ]
},

"1f0bd0d0-aa55-4433-9fbc-f8566ac7c684": { // Performance Testing
  goal: "Verify your app can handle many users at once without slowing down or crashing.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Stress-test your app — make sure it survives when 100 users hit it simultaneously.", real_world: "Twitter crashes during major events when they don't load-test. Performance testing prevents embarrassing outages." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Load testing setup (k6 or Artillery)", "API endpoint load tests", "Response time benchmarks", "Concurrent user simulation", "Performance report generation"], tech: ["k6", "Artillery", "Load Testing", "Performance", "Benchmarking"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend deployed and running", "API endpoints stable", "Performance testing tool installed"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run load test", description: "Execute the load test script → watch as it simulates 50-100 concurrent users hitting your API." },
      { title: "Analyze results", description: "Check p95 response time, error rate, and throughput. Identify bottlenecks if any." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Load test runs without issues", "API handles 50+ concurrent requests", "p95 response time under 500ms", "Error rate under 1% during load", "Performance report is generated"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Load Testing", explanation: "Simulating many users hitting your app at once. Answer the question: 'how many users can my app handle before it breaks?'" },
      { term: "p95 Response Time", explanation: "The response time that 95% of requests are faster than. If p95 is 200ms, 95 out of 100 requests complete in under 200ms." },
      { term: "Throughput", explanation: "Requests per second your app can handle. Higher throughput = more users served simultaneously." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Test with realistic scenarios — not just GET requests, include auth + CRUD", "Gradually increase load to find the breaking point", "Monitor server CPU and memory during load tests", "Run load tests on staging, not production, to avoid affecting real users"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Load testing tool configured", "Tests simulate realistic user behavior", "Performance metrics collected", "Bottlenecks identified (if any)", "Results documented"] }}
  ]
},

"47fd67d9-3e2b-411a-9af6-38a09a434366": { // Security Testing
  goal: "Test your app like an attacker — find and fix vulnerabilities before someone else does.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Think like a hacker — find every weakness in your app and fix it before bad actors find it first.", real_world: "Companies pay bug bounty hunters thousands of dollars to find vulnerabilities. You're doing it yourself, for free." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["SQL injection testing", "XSS vulnerability testing", "Authentication bypass testing", "CSRF protection verification", "Security headers verification"], tech: ["Security Testing", "OWASP", "Penetration Testing", "Authentication", "XSS"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Security hardening applied", "Auth system fully working", "CRUD endpoints in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run security tests", description: "Execute the security test suite → verify all common attack vectors are blocked." },
      { title: "Fix any findings", description: "If vulnerabilities are found, fix them immediately and re-test." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["SQL injection attempts are blocked", "XSS payloads are sanitized", "Auth bypass attempts fail", "CSRF protection is active", "Security headers are properly set"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "SQL Injection", explanation: "Attacker puts SQL code in form fields: name: Robert'; DROP TABLE users;--. If your app passes this directly to SQL, the database gets wiped. Parameterized queries prevent this." },
      { term: "XSS (Cross-Site Scripting)", explanation: "Attacker injects <script>alert('hacked')</script> in a comment field. If rendered without escaping, it executes in other users' browsers." },
      { term: "OWASP Top 10", explanation: "The definitive list of the 10 most critical web security risks, updated regularly. Use it as a checklist for security testing." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use the OWASP Top 10 as your security testing checklist", "Test with malicious inputs in EVERY user-facing field", "Check that error messages don't reveal internal system details", "Run npm audit regularly to check for vulnerable dependencies"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Common attack vectors tested", "SQL injection blocked", "XSS prevented", "Auth is secure", "Security headers verified"] }}
  ]
},

"bdf66a9d-01c9-4a57-b4e0-45ab89d8ff70": { // Documentation
  goal: "Create clear documentation so anyone can understand, use, and contribute to your project.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Write documentation that makes your project invincible — anyone can pick it up and understand it.", real_world: "Open source projects live or die by their docs. Stripe's documentation is considered the gold standard — it's why developers love their API." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["README.md with project overview", "API documentation with endpoints and examples", "Setup guide for new developers", "Architecture decision records", "Contributing guidelines"], tech: ["Markdown", "API Docs", "README", "Documentation", "Developer Experience"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Project with multiple features built", "API endpoints defined", "Basic project structure in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Review generated docs", description: "Read through the README and API docs → verify accuracy, completeness, and clarity." },
      { title: "Test setup guide", description: "Follow the setup guide on a clean machine (or pretend you're new) → verify every step works." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["README has project overview, setup, and usage sections", "API endpoints are documented with examples", "Setup guide works from scratch", "Architecture decisions are recorded", "Contributing guidelines exist"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "README-Driven Development", explanation: "Write the README before (or alongside) the code. It forces you to think about the user experience of your project." },
      { term: "API Documentation", explanation: "For each endpoint: method, URL, request body, response format, error codes, and a curl example. This is your API's user manual." },
      { term: "Architecture Decision Records (ADR)", explanation: "Short documents explaining WHY you chose a certain approach: 'We chose PostgreSQL because...' Invaluable for future developers (including future you)." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Keep docs close to code — update them when you change features", "Include a 'Quick Start' section for impatient developers", "Add example curl commands for every API endpoint", "Use a table of contents for docs longer than 2 pages"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["README is comprehensive and accurate", "API docs cover all endpoints", "Setup guide is complete", "Architecture decisions documented", "Docs are well-organized"] }}
  ]
},

"2d49ae01-3192-4e3e-ab33-78b622654cf0": { // Code Quality & Linting
  goal: "Make your code automatically clean and consistent with ESLint, Prettier, and pre-commit hooks.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Automate code quality — every file formatted perfectly, every bad pattern caught instantly.", real_world: "Google, Facebook, and Airbnb all publish style guides enforced by linters. Consistent code is maintainable code." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["ESLint configuration for JavaScript/TypeScript", "Prettier for automatic formatting", "Pre-commit hooks with Husky + lint-staged", "Editor integration (auto-fix on save)", "Custom rules for your project's patterns"], tech: ["ESLint", "Prettier", "Husky", "lint-staged", "Code Quality"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Project with multiple files", "npm available", "VS Code or similar editor"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run linting", description: "npm run lint → fix any reported issues → npm run lint again → should pass clean." },
      { title: "Test pre-commit hook", description: "Make a change → git commit → verify the hook runs lint-staged and blocks commits with errors." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["ESLint runs without configuration errors", "Prettier formats all files consistently", "Pre-commit hook blocks badly formatted commits", "Editor auto-fixes on save", "npm run lint passes on the entire codebase"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "ESLint", explanation: "A tool that analyzes your code for potential errors and style issues. It catches unused variables, missing semicolons, and bad patterns before you run the code." },
      { term: "Prettier", explanation: "An opinionated code formatter. It doesn't check for errors — it rewrites your code with consistent spacing, quotes, and line breaks. Zero debates about style." },
      { term: "Pre-commit Hooks", explanation: "Scripts that run automatically before a git commit. If linting fails, the commit is blocked. This ensures only clean code enters the repository." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Configure ESLint and Prettier to not conflict — use eslint-config-prettier", "Start with a popular preset (airbnb, standard) and customize as needed", "Run the linter in CI too — pre-commit hooks can be bypassed with --no-verify", "Fix existing issues gradually — don't try to fix 500 warnings at once"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["ESLint configured and running", "Prettier formatting all files", "Pre-commit hooks blocking bad code", "Editor auto-fix working", "Full codebase passes lint"] }}
  ]
},

"dcbbe38a-8385-4e36-af85-4e912ab9c0b1": { // Continuous Improvement
  goal: "Create a repeatable system for making the product better every week — metrics, feedback, and iteration.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the habit of improvement — ship better versions every week with data, feedback, and discipline.", real_world: "Spotify runs A/B tests and ships improvements weekly. The best products are never 'done' — they continuously evolve." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Weekly improvement checklist", "User feedback collection system", "Metrics dashboard for tracking progress", "Sprint planning template", "Changelog for tracking improvements"], tech: ["Process", "Feedback", "Metrics", "Agile", "Changelog"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App deployed with real users (or test users)", "Analytics/tracking in place", "Monitoring set up"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Set up the improvement cycle", description: "Define weekly goals → collect feedback → prioritize fixes → implement → measure results." },
      { title: "Track progress", description: "Update the changelog → review metrics weekly → identify the next improvement cycle." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Weekly improvement checklist defined", "Feedback collection mechanism in place", "Metrics tracked and reviewed", "Changelog documents improvements", "Improvement cycle is repeatable"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Build-Measure-Learn Loop", explanation: "Build a feature → measure its impact → learn what worked → repeat. This is the foundation of lean product development." },
      { term: "Changelog", explanation: "A log of all changes, organized by version: 'v1.2.0 — Added dark mode, fixed login bug, improved search speed'. Keeps users and developers informed." },
      { term: "Retrospective", explanation: "A weekly reflection: What went well? What didn't? What will we improve? Simple but powerful for continuous growth." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Fix bugs before adding features — stability builds user trust", "Track one key metric per week (not 20)", "Collect feedback in-app with a simple feedback widget", "Celebrate improvements — even small wins build momentum"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Improvement cycle is defined", "Feedback system is active", "Metrics are tracked", "Changelog is maintained", "Process is documented and repeatable"] }}
  ]
},

"b03ef8c8-2a9b-416e-9878-13b71c1b47c0": { // Maintenance Plan
  goal: "Keep the app stable, secure, and reliable over time with a clear maintenance routine.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the maintenance routine that keeps your app healthy for years — not just launch day.", real_world: "The best apps are maintained like a garden — regular pruning, feeding, and care. Neglect leads to decay." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Dependency update schedule", "Security patch process", "Database maintenance routine", "Uptime monitoring checks", "Incident response procedure"], tech: ["DevOps", "Maintenance", "Security Patches", "npm audit", "Monitoring"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App deployed to production", "Monitoring and logging set up", "CI/CD pipeline working"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Set up maintenance schedule", description: "Define weekly, monthly, and quarterly maintenance tasks. Set calendar reminders." },
      { title: "Run the first maintenance cycle", description: "Run npm audit → update minor dependencies → check monitoring dashboard → verify backups → document results." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Maintenance schedule is documented", "npm audit shows no critical vulnerabilities", "Dependencies are up to date", "Monitoring confirms healthy metrics", "Incident response procedure is ready"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Dependency Rot", explanation: "Over time, dependencies become outdated and accumulate security vulnerabilities. Regular updates prevent technical debt from piling up." },
      { term: "npm audit", explanation: "Scans your node_modules for known vulnerabilities. Run weekly: npm audit fix for automatic patches, npm audit for a full report." },
      { term: "Runbook", explanation: "A step-by-step guide for handling common incidents: 'database is down → check Neon dashboard → restart if needed → notify team'. Written BEFORE incidents happen." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Set up Dependabot on GitHub to auto-create PRs for dependency updates", "Run npm audit monthly at minimum — weekly is better", "Keep a maintenance log — track what was updated and when", "Schedule maintenance in off-peak hours to minimize user impact"] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Create a fully automated maintenance pipeline: weekly npm audit in CI, auto-merge minor patches, alert on critical vulnerabilities.", hint: "Use GitHub Actions with a cron schedule and Dependabot auto-merge rules.", difficulty: "advanced" }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Maintenance schedule exists and is documented", "Dependencies are current", "npm audit passes", "Monitoring is healthy", "Incident response is ready", "I understand ongoing maintenance is not optional"] }}
  ]
},

};
