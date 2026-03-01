// Vibe Coding — Module 4: USER MANAGEMENT (10 lessons)

module.exports = {

// User Registration Flow
"625341d9-faeb-4b24-90c8-666b30fefd17": {
  goal: "Build a complete signup system with email verification and a beautiful React registration page.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build a signup system so real users can create accounts on YOUR app — just like Instagram or Spotify.", real_world: "Every SaaS product needs user registration. This is the first thing your future users will experience." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Backend signup API with email verification", "React signup page with form validation", "Email verification link generation", "Success/error UI states"], tech: ["React", "Express", "Prisma", "Email", "JWT"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Auth System + Password Security lessons completed", "Backend auth endpoints working", "Frontend running at localhost:5173"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste MAIN PROMPT → Send. The agent generates the full registration system (backend + frontend)." },
      { title: "Run both apps", description: "Start backend (cd apps/api → npm run dev) and frontend (cd apps/web → npm run dev)." },
      { title: "Test the signup flow", description: "Open http://localhost:5173/signup → fill in the form → submit. Check that:\n• User appears in the database\n• Verification email is logged in the terminal (dev mode)\n• Success message shows on screen" },
      { title: "Handle errors", description: "If anything fails, use the Error Prompt with the full terminal or browser console error." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Signup page loads at /signup with a clean form", "Form validates email format and password strength", "Successful signup creates user with emailVerified=false", "Verification email link appears in terminal (dev mode)", "Duplicate email shows a proper error message", "Success UI displays after registration"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Email Verification Flow", explanation: "Signup → generate a unique token → email it as a link → user clicks link → backend marks emailVerified=true. This proves the user owns the email address." },
      { term: "Form Validation", explanation: "Check inputs BEFORE sending to the server — empty fields, invalid email format, weak password. Saves server calls and gives instant feedback." },
      { term: "Loading States", explanation: "Show a spinner or disabled button while the signup request is processing. This prevents double-submissions and tells the user 'something is happening'." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Add a password strength indicator for better UX", "Show/hide password toggle makes forms more user-friendly", "Disable the submit button during loading to prevent double-clicks", "Log verification links in dev mode so you don't need real email setup yet"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "SMTP not configured in development", fix: "In dev mode, the verification link should log to the terminal. Check console output instead of actual email." },
      { mistake: "Signup succeeds but no user in database", fix: "Check Prisma migration ran correctly. Look at terminal for database errors that might be caught silently." },
      { mistake: "CORS error on signup request", fix: "Backend CORS must allow the frontend origin (http://localhost:5173). Check cors() middleware configuration." }
    ] }},
    { type: "VC-09_LEVEL_UP", data: { challenge: "Add a 'Sign up with Google' button that uses OAuth 2.0 alongside the email registration.", hint: "Research passport-google-oauth20 or use a service like Supabase Auth for simpler integration.", difficulty: "advanced" }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Signup page renders with all form fields", "Validation works for email and password", "User is created in the database", "Email verification is triggered", "Error states display correctly", "Success state displays correctly"] }}
  ]
},

// Login System & Frontend
"91a236ad-62c2-4f64-88c7-29de4d54669b": {
  goal: "Build a login page that authenticates users, saves their token, and redirects to the dashboard.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Create the front door of your app — a login page that actually feels professional.", real_world: "The login page is often the MOST visited page of any app. It needs to be fast, clean, and trustworthy." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["React login page with email + password", "Token storage in localStorage/cookies", "Auto-redirect to dashboard on success", "Error display for invalid credentials", "Remember me functionality"], tech: ["React", "JWT", "localStorage", "React Router"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User Registration Flow completed", "At least one registered user in the database", "Auth backend endpoints working (POST /auth/login)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Open Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run and test login", description: "Open /login in the browser → enter valid credentials → verify redirect to dashboard with token stored." },
      { title: "Test error cases", description: "Try wrong password, non-existent email, empty fields — each should show a clear error message, not a crash." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Login page loads at /login", "Valid credentials redirect to /dashboard", "Invalid credentials show error message", "Token is saved (check localStorage/cookies)", "Loading state shows during authentication", "Empty form submission is prevented"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Token Storage", explanation: "After login, the JWT token is saved in localStorage or cookies. Every future API request includes this token to prove the user is authenticated." },
      { term: "Protected Routes (Frontend)", explanation: "A route wrapper that checks if a token exists. No token → redirect to /login. Has token → show the page." },
      { term: "Auth Context", explanation: "A React Context that holds the current user and token. Any component in the app can access it without prop-drilling." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use httpOnly cookies instead of localStorage for better security in production", "Add a 'Forgot password?' link below the login form", "Pre-fill email if user just registered (pass via React Router state)", "Show a toast notification on successful login for better UX"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Login works but dashboard shows blank", fix: "The auth token might not be sent with dashboard API requests. Check that your API client includes the Authorization header." },
      { mistake: "Redirect loop between /login and /dashboard", fix: "Your protected route redirect and login redirect are conflicting. Add a loading state while checking auth." },
      { mistake: "Token lost on page refresh", fix: "Make sure you're reading the token from localStorage on app startup (in AuthProvider or similar)." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Login page works with valid credentials", "Invalid login shows clear error", "Token is stored and persists on refresh", "Redirect to dashboard works", "Protected routes redirect to login when not authenticated"] }}
  ]
},

// Password Reset Flow
"f15df82a-2c98-4f0a-8dd0-ffaf17d6428a": {
  goal: "Let users safely recover their account with a reset link sent to their email.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the 'forgot password?' flow — because every user forgets eventually, and your app should handle it gracefully.", real_world: "The 'Forgot password' link is used millions of times daily across the internet. It's a must-have for any serious app." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["'Forgot password' page with email input", "Backend generates secure reset token + sends email", "Reset password page with new password form", "Token expiry and single-use protection"], tech: ["React", "Express", "JWT", "Email", "Security"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Login System completed", "Email service working (or dev mode logging)", "At least one verified user account"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test the forgot flow", description: "Go to /forgot-password → enter email → check terminal for reset link → open the link → set new password → login with new password." },
      { title: "Test edge cases", description: "Try with non-existent email, expired token, already-used token — all should return helpful errors, not crashes." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Forgot password page accepts email and shows confirmation", "Reset token is generated and emailed (logged in dev)", "Reset link opens a 'set new password' page", "New password is saved and old password stops working", "Expired/used tokens are properly rejected"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Reset Token", explanation: "A unique, time-limited string sent via email. When the user clicks the link, the backend verifies this token before allowing a password change." },
      { term: "Token Expiry", explanation: "Reset tokens expire after 1 hour (typically). This limits the window an attacker could exploit a stolen reset link." },
      { term: "Single-Use Token", explanation: "Once a reset token is used to change a password, it's marked as 'used' and can never be reused — prevents replay attacks." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always show 'If this email exists, we sent a reset link' — never reveal whether an email is registered", "Set reset tokens to expire in 1 hour maximum", "Invalidate all existing reset tokens when a new one is requested", "Rate-limit reset requests to prevent email spam abuse"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Forgot password flow sends reset email", "Reset link opens the password change form", "New password works for login", "Old password no longer works", "Expired tokens are rejected with clear message"] }}
  ]
},

// User Profile Management
"2daad121-7d09-41a7-aadc-7762325439ba": {
  goal: "Let users view and edit their profile with avatar upload, personal info, and social links.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give every user their own profile page — editable, personal, and visually polished.", real_world: "Think of your LinkedIn profile or Instagram bio settings — that same 'edit your info' experience, in your app." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Profile page displaying user info", "Edit form for name, bio, phone, location, DOB", "Avatar/photo upload with preview", "Social links section (GitHub, LinkedIn, Twitter)"], tech: ["React", "Express", "File Upload", "Prisma", "Tailwind"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Login system working with stored auth token", "User table has profile columns (or ready to add them)", "Frontend running at localhost:5173"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run and test profile", description: "Log in → navigate to /profile → verify your info displays → edit fields → save → refresh → changes persist." },
      { title: "Test avatar upload", description: "Upload an image → verify preview shows → save → refresh → avatar is still visible." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Profile page loads with current user data", "All fields are editable (name, bio, phone, location, DOB)", "Changes save to database and persist on refresh", "Avatar uploads and displays correctly", "Social links save and display", "Form validation prevents invalid data"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Multipart Form Data", explanation: "When uploading files alongside text data, the browser sends a 'multipart' request — different from regular JSON. The backend uses multer or similar to parse it." },
      { term: "File Storage Strategy", explanation: "Files can be stored locally (dev), in cloud storage (S3, Cloudflare R2), or as base64. Cloud storage is best for production." },
      { term: "Optimistic UI Updates", explanation: "Show the change immediately in the UI before the server confirms it. If the save fails, revert. This makes the app feel instant." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Compress images before uploading to save bandwidth and storage", "Show an image preview immediately using URL.createObjectURL()", "Add character limits to bio and validation to phone number", "Cache the profile data to avoid fetching on every page visit"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Avatar upload returns 413 (payload too large)", fix: "Increase the file size limit in Express (app.use(express.json({ limit: '5mb' }))) and in multer config." },
      { mistake: "Profile updates don't persist on refresh", fix: "Check that the PUT/PATCH request is actually reaching the backend and the response confirms the update." },
      { mistake: "Image displays broken after upload", fix: "Verify the image URL/path is correct and the static files middleware is serving the uploads directory." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Profile page shows all user fields", "Edit and save works for all fields", "Avatar uploads and displays", "Social links are editable", "Changes persist after page refresh"] }}
  ]
},

// Role-Based Access Control (RBAC)
"949e1c91-79e2-48ad-beea-25055269ee63": {
  goal: "Add Admin and User roles so only Admins can access the admin panel and manage users.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give your app a VIP section — Admin Panel for admins, regular dashboard for everyone else.", real_world: "Every multi-user app has roles: YouTube has creators vs viewers, Slack has admins vs members. Roles define who can do what." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Role column in users table (admin/user)", "Admin panel route accessible only to admins", "User management UI for admins", "Role-based navigation (show/hide admin menu items)"], tech: ["RBAC", "React", "Express", "Middleware", "PostgreSQL"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Auth Middleware lesson completed", "At least 2 user accounts in the database", "Frontend auth context working with user data"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test role separation", description: "Login as admin → verify admin panel is visible and accessible.\nLogin as regular user → verify admin panel is hidden and /admin returns 403." },
      { title: "Test user management", description: "As admin → view all users → change a user's role → verify the change persists." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Admin can access /admin panel", "Regular users cannot access /admin (403 or redirect)", "Admin can see list of all users", "Admin can change user roles", "Navigation shows/hides admin links based on role", "Role changes persist in the database"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "RBAC Pattern", explanation: "Each user has a 'role' (admin, user, editor). Middleware checks the role before allowing access. Simple but powerful for most apps." },
      { term: "Frontend Route Guards", explanation: "A component that wraps admin routes and checks the user's role from auth context. If not admin, redirect to dashboard or show '403 Forbidden'." },
      { term: "Principle of Least Privilege", explanation: "Users should only have the minimum access they need. Regular users don't need admin access, so don't give it to them." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Store roles in the JWT token so you don't need a database call on every request", "Create a seed script to make the first user an admin", "Add a 'super admin' role that can't be changed by other admins", "Always check roles on BOTH frontend (hide UI) AND backend (block API) — never trust frontend alone"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Roles column exists in users table", "Admin panel is protected on backend AND frontend", "Admin can manage users", "Regular users see no admin options", "Role changes work correctly"] }}
  ]
},

// User Dashboard
"6b678a0e-ac26-46b8-8ffe-5469460757ce": {
  goal: "Create a personalized dashboard that welcomes the user and shows their stats and recent activity.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the home screen your users see after login — personal, informative, and welcoming.", real_world: "Think of how GitHub shows your contribution graph or how Notion shows recent pages. A good dashboard keeps users engaged." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Welcome message with user's name", "Stats cards (items created, tasks completed, etc.)", "Recent activity feed", "Quick action buttons"], tech: ["React", "Express", "Dashboard UI", "Tailwind", "API Aggregation"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Login system redirects to /dashboard", "User profile data is accessible from auth context", "Backend has at least some user data to display"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run and verify", description: "Login → verify dashboard loads with welcome message, stats, and activity feed." },
      { title: "Test with data", description: "Create some items/tasks → refresh dashboard → stats should update." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Dashboard shows 'Welcome, [name]' message", "Stats cards display correct numbers", "Recent activity section shows latest actions", "Quick action buttons navigate correctly", "Dashboard loads fast (no long spinners)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "API Aggregation", explanation: "The dashboard API fetches data from multiple sources (users, tasks, activity) and returns it all in one response — fewer network calls, faster loading." },
      { term: "Stats Cards Pattern", explanation: "Small, colorful cards showing key numbers (total items, completed tasks, streak). Each card has an icon, number, label, and optional trend indicator." },
      { term: "Activity Feed", explanation: "A chronological list of recent actions: 'Created task X', 'Updated profile', 'Completed task Y'. Built by logging events to an activities table." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Cache dashboard data for 30 seconds — it doesn't need to be real-time", "Add skeleton loading states for each card while data loads", "Show empty states with helpful CTAs when the user is new ('Create your first task →')", "Make stats clickable — clicking 'Tasks: 12' navigates to the tasks list"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Dashboard renders after login", "Welcome message shows user's name", "Stats display real data from the database", "Recent activity shows latest actions", "Navigation from dashboard to other pages works"] }}
  ]
},

// Account Settings Page
"63ee4dd9-08d9-4c85-88ae-461941ea5b3b": {
  goal: "Create a Settings page where users manage their profile, security, notifications, and account actions.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the control center — where users manage every aspect of their account in one place.", real_world: "Every app from Gmail to Netflix has a Settings page. It's where users feel in control of their experience." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Tabbed settings interface (Profile, Security, Notifications)", "Profile editing section", "Password change section", "Notification preferences", "Account deletion (danger zone)"], tech: ["React", "Tabs", "Forms", "Express", "Tailwind"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User Profile Management completed", "Password change endpoint working", "Frontend navigation includes a Settings link"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test each settings tab", description: "Navigate to /settings → test Profile tab (edit + save) → Security tab (change password) → Notifications tab (toggle preferences)." },
      { title: "Test danger zone", description: "Verify the 'Delete Account' button requires confirmation and actually works." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Settings page loads with tabs navigation", "Profile tab allows editing all profile fields", "Security tab allows password change", "Notifications tab allows toggling preferences", "Delete Account requires confirmation", "All changes persist after refresh"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Tabbed Interface", explanation: "Organizes settings into logical groups without page reloads. React state controls which tab is active, and only that tab's content renders." },
      { term: "Danger Zone Pattern", explanation: "Destructive actions (delete account) are visually distinct (red border, warning text) and require confirmation to prevent accidents." },
      { term: "Soft Delete", explanation: "Instead of permanently deleting an account, mark it as 'deleted' with a timestamp. This allows recovery and satisfies data regulations." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use URL params for tabs (/settings?tab=security) so users can bookmark or share specific settings", "Show a 'saved' toast notification after each successful update", "Add a 'Download my data' button for GDPR compliance", "Require password confirmation before account deletion"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Settings page renders with all tabs", "Profile editing saves correctly", "Password change works with old password verification", "Account deletion works with confirmation", "Tab navigation is smooth and maintains state"] }}
  ]
},

// Email Verification System
"fb24cd43-603a-4b63-8259-23b48bba019c": {
  goal: "Send a verification email after signup so users can confirm they own the email address.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Prove users are real — send a verification email that unlocks the full app experience.", real_world: "GitHub, Airbnb, and virtually every serious app requires email verification to prevent fake accounts and spam." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Verification email sent on signup", "Unique verification token with expiry", "Verification page that handles the token", "'Resend verification' button for users who didn't get the email"], tech: ["Email Service", "JWT", "Express", "React"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User Registration Flow completed", "Users have an 'emailVerified' field in database", "Backend can generate and validate tokens"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test verification flow", description: "Signup → check terminal for verification link → click it → verify email is now marked as verified in database." },
      { title: "Test resend", description: "Request another verification email → new link appears in terminal → clicking old link should fail, new link should work." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Signup triggers a verification email", "Verification link marks email as verified", "Expired tokens are rejected with clear message", "Resend verification generates a new valid token", "User can't access protected features before verifying"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Verification Token", explanation: "A random, unique string (or signed JWT) embedded in a link like /verify?token=abc123. The backend decodes it to find which user to verify." },
      { term: "Token Invalidation", explanation: "When a new verification token is issued, old ones should be invalidated. This prevents confusion and potential abuse of old links." },
      { term: "Gate Pattern", explanation: "Users with unverified emails see a 'Please verify your email' banner and can't access core features. Once verified, the gate lifts." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["In development, log the verification URL to the terminal instead of sending real emails", "Add a banner on every page: 'Please verify your email' until they do", "Automatically re-check verification status on login", "Set verification tokens to expire in 24 hours"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Verification email sends on signup", "Clicking the link verifies the email", "Expired tokens are rejected", "Resend feature works", "App gates features for unverified users"] }}
  ]
},

// Two-Factor Authentication (2FA)
"8ac22161-93f2-48dc-9945-eb49e0dfeb0a": {
  goal: "Add 2-step login so users need a 6-digit code from Google Authenticator alongside their password.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add an extra layer of security — even if someone steals a password, they can't get in without the code.", real_world: "Banks, Google, GitHub — all offer 2FA. It's the gold standard of account security and users expect it." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["TOTP (Time-based One-Time Password) setup with QR code", "Enable/disable 2FA from settings", "6-digit code verification on login", "Backup recovery codes"], tech: ["TOTP", "QR Code", "speakeasy", "Google Authenticator"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Login system fully working", "Account Settings page built", "Google Authenticator app installed on your phone (for testing)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Enable 2FA", description: "Go to Settings → Security → Enable 2FA → scan QR code with Google Authenticator → enter 6-digit code to confirm." },
      { title: "Test login with 2FA", description: "Logout → login → after password, a 2FA code screen should appear → enter code from app → access granted." },
      { title: "Test recovery", description: "Try logging in with a backup recovery code instead of the TOTP code." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["QR code generates and scans with Google Authenticator", "6-digit verification works correctly", "Login requires 2FA code when enabled", "Backup recovery codes work as fallback", "2FA can be disabled from settings"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "TOTP (Time-based OTP)", explanation: "A 6-digit code that changes every 30 seconds. Both your app and Google Authenticator use the same secret key + current time to generate matching codes." },
      { term: "QR Code", explanation: "Contains the TOTP secret key in a format Google Authenticator can scan. After scanning, the app generates matching codes without any internet connection." },
      { term: "Recovery Codes", explanation: "One-time-use codes generated when 2FA is enabled. If you lose your phone, use a recovery code to login and disable 2FA." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Generate 10 recovery codes and urge users to save them somewhere safe", "Rate-limit 2FA verification attempts to prevent brute-force", "Show the secret key as text too (for manual entry if QR scan fails)", "Store the 2FA secret encrypted in the database, not plain text"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["QR code setup works with Google Authenticator", "Login requires 2FA code when enabled", "Recovery codes work as backup", "2FA can be toggled from settings", "Invalid codes are properly rejected"] }}
  ]
},

// Session Management
"e97ab736-9b59-4262-b996-71de7c887e1f": {
  goal: "Show all logged-in devices and let users log out any device or all devices at once.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give users full control over where they're logged in — see every device, kill any session.", real_world: "Google and Netflix show 'Active Sessions' so you can log out that random device you forgot about. It's a security essential." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Sessions list showing all active devices", "Device info (browser, OS, IP, last active)", "Logout individual session", "'Log out all devices' button", "Current session highlighted"], tech: ["Sessions", "Express", "React", "User Agent Parsing", "Security"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Login system with refresh tokens working", "Account Settings page built", "Auth middleware validates tokens on every request"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test session tracking", description: "Login from two different browsers → go to Settings → Sessions → verify both appear in the list." },
      { title: "Test session revocation", description: "Revoke the other browser's session → verify that browser gets logged out on next request." },
      { title: "Test 'log out all'", description: "Click 'Log out all devices' → verify all other sessions are invalidated, only current one remains." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Sessions list shows all active devices", "Current session is highlighted/labeled", "Individual session can be revoked", "'Log out all' invalidates all other sessions", "Revoked sessions redirect to login on next request", "Device info (browser, OS) shows correctly"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Session Tracking", explanation: "Each login creates a session record (token, device info, timestamp). The sessions table is the 'logbook' of who's logged in from where." },
      { term: "Token Revocation", explanation: "Deleting a session from the database invalidates its refresh token. The next time that device tries to refresh, it gets rejected." },
      { term: "User Agent Parsing", explanation: "The browser sends a 'User-Agent' string with every request. Parsing it reveals the browser name, OS, and device type for display." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Show 'Last active: 5 minutes ago' instead of raw timestamps for better UX", "Mark suspicious sessions (new device, unusual location) with a warning icon", "Auto-revoke sessions that haven't been active for 30 days", "Show an email notification when a new device logs in"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Sessions are tracked on login", "Session list displays in settings", "Individual logout works", "Bulk logout works", "Current session is highlighted", "Device info is parsed and displayed"] }}
  ]
},

};
