// Vibe Coding — Module 7: POLISH & OPTIMIZATION (10 lessons)

module.exports = {

// Loading & Skeleton States
"4aea96d6-d931-4330-8212-69f2db101c5d": {
  goal: "Show clean loading states — skeletons, spinners, and progress bars — so the app never feels broken.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make waiting feel good — replace blank screens with smooth skeletons and smart loading indicators.", real_world: "Facebook, LinkedIn, and YouTube all show skeleton screens while loading. It makes the app feel 2x faster, even when it's not." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Skeleton loading components for lists, cards, and profiles", "Button loading spinner for form submissions", "Progress bar for file uploads", "Page-level loading state", "Graceful transition from skeleton to real content"], tech: ["React", "Tailwind CSS", "Animation", "Skeleton UI", "UX"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple pages and components built", "API calls that have noticeable loading time", "Basic React component knowledge"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test loading states", description: "Throttle your network (browser DevTools → Network → Slow 3G) → navigate through the app → verify skeletons show instead of blank screens." },
      { title: "Test button spinners", description: "Submit a form → verify the button shows a spinner and is disabled during submission." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["List pages show skeleton cards while loading", "Profile page shows skeleton layout", "Form buttons show spinner during submission", "File upload shows progress bar", "Transition from skeleton to content is smooth"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Skeleton Screen", explanation: "Gray placeholder shapes that mimic the layout of the content being loaded. Users perceive the app as faster because they see structure immediately." },
      { term: "Perceived Performance", explanation: "How fast the app FEELS, not how fast it actually is. Skeletons make a 2-second load feel like 0.5 seconds because the user sees progress." },
      { term: "Loading State Machine", explanation: "idle → loading → success/error. Each state shows different UI. This prevents flashing content and ensures every scenario is handled." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Match skeleton shapes to your actual content layout for the most natural feel", "Add a subtle shimmer animation to skeletons (not just static gray blocks)", "Show the skeleton for at least 200ms to prevent flashing on fast connections", "Don't show spinners for actions under 200ms — it creates unnecessary anxiety"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Skeleton screens display during data loading", "Button spinners work during form submissions", "Upload progress bar functions", "No blank screens or layout shifts during loading", "Transitions are smooth"] }}
  ]
},

// Error Handling & User Feedback
"d919108d-5e44-4b49-9b44-57e2229e908a": {
  goal: "Show clear toasts, form errors, and friendly error pages so users always know what happened.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Never leave users confused — every action gets feedback, every error gets a clear message.", real_world: "Slack shows a green toast when a message sends. Figma shows red when you lose connection. Good apps communicate constantly." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Toast notification system (success, error, warning, info)", "Inline form validation errors", "Error boundary component for crashes", "404 and 500 error pages", "Network error detection and retry prompt"], tech: ["React", "Toast Library", "Error Boundaries", "UX", "Tailwind"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple forms and API calls built", "CRUD operations working", "Global error handler on backend"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test success feedback", description: "Create an item → verify a green 'Created successfully' toast appears." },
      { title: "Test error feedback", description: "Submit invalid data → verify inline errors + error toast appear. Go to /nonexistent → verify 404 page shows." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Success actions show green toast", "Error actions show red toast", "Form validation shows inline errors per field", "404 page renders for unknown routes", "Error boundary catches React crashes gracefully"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Toast Notifications", explanation: "Small pop-up messages that appear briefly (3-5 seconds) and auto-dismiss. Color-coded: green=success, red=error, yellow=warning, blue=info." },
      { term: "Error Boundary", explanation: "A React component that catches JavaScript errors anywhere in its child tree and shows a fallback UI instead of a white screen of death." },
      { term: "Optimistic Feedback", explanation: "Show success immediately, then revert if the server fails. Combined with error toasts, this makes the app feel instant while staying accurate." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Position toasts in the top-right or bottom-right — don't block content", "Auto-dismiss success toasts after 3 seconds, but keep error toasts until dismissed", "Add a 'Retry' button on network error messages", "Never show raw error messages to users — translate them to human language"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Toast system works for all action types", "Inline form errors display per field", "404 page renders correctly", "Error boundary catches component crashes", "All user actions receive feedback"] }}
  ]
},

// Responsive Design & Mobile
"82658703-29db-48bb-8b3a-3ebdfc23e568": {
  goal: "Make the entire website look perfect and work smoothly on phones, tablets, and desktops.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make your app look amazing on EVERY screen — from a 4-inch phone to a 32-inch monitor.", real_world: "Over 60% of web traffic is mobile. If your app doesn't work on phones, you're losing more than half your users." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Mobile-first responsive layout", "Responsive navigation (hamburger menu on mobile)", "Touch-friendly buttons and interactions", "Responsive tables and data grids", "Device-specific optimizations"], tech: ["Tailwind CSS", "Responsive Design", "Mobile UI", "Media Queries", "Flexbox/Grid"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple pages built (dashboard, lists, forms)", "Tailwind CSS configured", "Chrome DevTools available for device simulation"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test on mobile simulator", description: "Open Chrome DevTools → toggle device toolbar → test on iPhone, iPad, and desktop sizes." },
      { title: "Fix any layout issues", description: "Look for: text overflow, buttons too small to tap, horizontal scrolling, overlapping elements." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["All pages render correctly on mobile (375px)", "Navigation converts to hamburger menu on mobile", "Buttons are large enough for touch (44px minimum)", "No horizontal scrolling on any page", "Tables/grids adapt to small screens", "Forms are usable on mobile"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Mobile-First Design", explanation: "Design for the smallest screen first, then add complexity for larger screens. In Tailwind: base styles are mobile, md: and lg: prefixes add desktop styles." },
      { term: "Tailwind Breakpoints", explanation: "sm: (640px), md: (768px), lg: (1024px), xl: (1280px). Use these prefixes to apply styles at different screen sizes." },
      { term: "Touch Targets", explanation: "Buttons and links on mobile need minimum 44x44px hit areas. Smaller targets cause frustration and accidental taps." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always test with Chrome DevTools device simulator before deploying", "Use Tailwind's responsive prefixes (md:, lg:) instead of custom media queries", "Replace tables with card layouts on mobile for better readability", "Test with your actual phone too — simulators don't capture real touch experience"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["All pages work on mobile", "Navigation adapts to screen size", "Touch targets are adequate", "No horizontal scrolling", "Forms are mobile-friendly", "Tested on at least 3 screen sizes"] }}
  ]
},

// Frontend Component Library
"ce056110-a4ac-4ab0-976a-a96081b8919e": {
  goal: "Build a reusable UI component system — buttons, forms, tables, dialogs — for consistent design across the app.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build your own design system — reusable components that keep your entire app looking consistent and professional.", real_world: "Google has Material Design. Shopify has Polaris. A component library ensures every button, form, and card looks the same across your app." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Button component with variants (primary, secondary, danger, ghost)", "Form input components with labels and errors", "Table component with sorting and pagination", "Modal/dialog component", "Card component with flexible layout"], tech: ["React", "Tailwind CSS", "Component Design", "Design System", "Props"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple pages using similar UI patterns", "Tailwind CSS configured", "Understanding of React props and composition"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Review generated components", description: "Check the components directory → verify each component is flexible, well-typed, and matches your design." },
      { title: "Replace existing UI with components", description: "Update existing pages to use the new shared components instead of inline Tailwind classes." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Button component supports multiple variants and sizes", "Input component handles labels, placeholders, and errors", "Table component supports column definitions and data", "Modal opens and closes correctly with backdrop", "All components are reusable across pages"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Component API (Props)", explanation: "Each component accepts props that control its behavior: <Button variant='primary' size='lg' loading={true}>. This is the component's 'API'." },
      { term: "Composition Pattern", explanation: "Build complex UIs by combining simple components: <Card><CardHeader /><CardBody /><CardFooter /></Card>. Each piece is reusable independently." },
      { term: "Design Tokens", explanation: "Shared values (colors, spacing, fonts) used across all components. Change the primary color in one place, and every button/link/heading updates." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Start with the 5 most-used components (Button, Input, Card, Modal, Table)", "Use Tailwind's `cn()` utility (clsx + tailwind-merge) for clean conditional classes", "Add a `disabled` and `loading` state to every interactive component", "Document each component's props with examples"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Core components are created and reusable", "Components accept flexible props", "Existing pages updated to use shared components", "Design is consistent across the app", "Components handle all states (default, hover, disabled, loading)"] }}
  ]
},

// Empty States & Fallbacks
"9fef0445-8778-42a3-a307-5f75af760cc3": {
  goal: "Show friendly 'nothing here yet' screens with helpful actions when lists are empty.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Turn empty screens into invitations — guide users to take their first action instead of showing blank space.", real_world: "Notion shows 'Start writing...' on empty pages. Trello shows 'Add a card' on empty lists. Empty states are opportunities, not dead ends." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Empty state component with icon, message, and CTA button", "Custom empty states for each list (tasks, notifications, search)", "First-time user onboarding empty state", "Error fallback states (offline, server error)"], tech: ["React", "Tailwind CSS", "UX Design", "Illustrations", "SVG"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["List pages built (tasks, notifications, etc.)", "Component library basics in place", "Understanding of conditional rendering"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test empty states", description: "Clear all items from a list (or use a new account) → verify the empty state shows with appropriate message and CTA." },
      { title: "Test error fallbacks", description: "Disconnect internet → verify the offline fallback shows. Stop the backend → verify the error fallback shows." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Empty lists show a friendly empty state", "Each list has a contextual empty state message", "CTA button navigates to the right creation page", "Error fallback shows when API is unreachable", "Empty states match the app's design system"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Empty State UX", explanation: "Empty states should have 3 elements: (1) a visual (icon/illustration), (2) a message explaining the empty state, (3) a CTA button to resolve it." },
      { term: "Contextual Messaging", explanation: "Empty tasks: 'No tasks yet — create your first one!' Empty search: 'No results found — try different keywords.' The message depends on WHY it's empty." },
      { term: "Progressive Disclosure", explanation: "For new users, empty states double as onboarding: 'Welcome! Start by creating your first project →'. Guide them through the first action." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use simple, friendly language — 'No tasks yet' not 'Error: 0 results returned'", "Make the CTA button the most prominent element in the empty state", "Use a subtle illustration or icon — don't overwhelm with graphics", "Track how many users see empty states — it indicates onboarding drop-off"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["All lists have empty states", "Messages are contextual and helpful", "CTA buttons work correctly", "Error fallbacks display when appropriate", "Design matches the app's style"] }}
  ]
},

// Performance Optimization
"339256b0-52f0-4b26-b644-8d59a3f3bc66": {
  goal: "Make your website load faster and feel smooth on both mobile and desktop.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Speed is a feature — make every page load in under 2 seconds and every interaction feel instant.", real_world: "Amazon found that every 100ms of latency costs them 1% of sales. Google ranks faster sites higher. Speed directly impacts success." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Code splitting and lazy loading for routes", "Image optimization with lazy loading", "API response caching", "Bundle size analysis and reduction", "Lighthouse audit improvements"], tech: ["React.lazy", "Vite", "Caching", "Lighthouse", "Performance"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App with multiple pages and features built", "Images being served (profile avatars, etc.)", "Chrome DevTools Lighthouse available"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run Lighthouse audit (before)", description: "Chrome DevTools → Lighthouse → run Performance audit → note the score." },
      { title: "Apply optimizations and re-audit", description: "After the agent's changes, run Lighthouse again → verify the score improved." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Lighthouse performance score improves", "Routes are lazy-loaded (code splitting works)", "Images load lazily (only when visible)", "Bundle size is reduced", "Page load time under 3 seconds on 4G"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Code Splitting", explanation: "Instead of loading ALL JavaScript upfront, split it by route. The login page only loads login code. The dashboard loads dashboard code. Faster initial load." },
      { term: "Lazy Loading", explanation: "Images and components load only when they're about to become visible (scroll into view). Reduces initial page weight dramatically." },
      { term: "Lighthouse Score", explanation: "Google's tool that rates your site 0-100 on Performance, Accessibility, SEO, and Best Practices. Aim for 90+ on Performance." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Run Lighthouse in incognito mode to avoid extension interference", "Use React.lazy() + Suspense for route-level code splitting", "Serve images in WebP format with width/height attributes to prevent layout shift", "Enable gzip/brotli compression on your server for 60-80% smaller responses"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Lighthouse score improved", "Code splitting is active", "Images lazy-load correctly", "Bundle size is optimized", "No major performance bottlenecks"] }}
  ]
},

// SEO & Meta Tags
"9b5c1db2-8827-4df6-b508-e2e72e87697c": {
  goal: "Make your website show the correct title, description, and preview image on Google and social media.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Control how your app appears on Google search results and social media link previews.", real_world: "When you share a link on Twitter/LinkedIn and see a beautiful preview card — that's meta tags at work. Without them, your link looks broken." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Dynamic page titles and meta descriptions", "Open Graph tags for social media previews", "Twitter card meta tags", "Canonical URLs", "Structured data (JSON-LD) for rich search results"], tech: ["React Helmet", "SEO", "Open Graph", "Meta Tags", "JSON-LD"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple pages built", "App deployed (or ready to deploy)", "Understanding of HTML <head> section"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test meta tags", description: "View page source → verify <title>, <meta description>, and Open Graph tags are present on each page." },
      { title: "Test social preview", description: "Use a social media debugger (e.g., opengraph.xyz) to verify your links show the correct preview card." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Each page has a unique <title>", "Meta descriptions are set per page", "Open Graph tags produce correct social previews", "Twitter cards display properly", "No duplicate or missing meta tags"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Open Graph Protocol", explanation: "A set of meta tags (og:title, og:description, og:image) that tell social media platforms what to show when your link is shared." },
      { term: "React Helmet", explanation: "A library that lets you set <head> elements (title, meta tags) from within your React components. Each page can define its own SEO tags." },
      { term: "Canonical URL", explanation: "Tells search engines 'this is the official URL for this content' — prevents duplicate content issues when the same page is reachable via multiple URLs." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use react-helmet-async instead of react-helmet for better SSR support", "Create a reusable <SEO /> component that accepts title, description, and image props", "Add a default og:image that represents your brand for pages without specific images", "Test with Google's Rich Results Test for structured data validation"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Page titles are dynamic and accurate", "Meta descriptions are set", "Social media previews look correct", "Canonical URLs are set", "No duplicate meta tags"] }}
  ]
},

// Security Hardening
"e1b3b20e-7b1c-4c17-ab37-eb308172fb37": {
  goal: "Make your app secure by default — stop common attacks with security headers, rate limiting, and input sanitization.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Harden your app like a fortress — block the most common attacks before they even reach your code.", real_world: "80% of web attacks target the same vulnerabilities (XSS, CSRF, injection). Security headers and sanitization block most of them automatically." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Security headers with Helmet.js", "Rate limiting per IP and per user", "Input sanitization against XSS", "CORS properly configured", "SQL injection prevention verification"], tech: ["Helmet.js", "Rate Limiting", "XSS Prevention", "CORS", "Security"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend API running", "Auth system in place", "Global error handler configured"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Verify security headers", description: "Open DevTools → Network → check response headers → verify Helmet headers are present (X-Content-Type-Options, X-Frame-Options, etc.)." },
      { title: "Test rate limiting", description: "Send 100+ rapid requests to a single endpoint → verify you get 429 Too Many Requests after the limit." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Security headers are present on all responses", "Rate limiting blocks excessive requests", "XSS payloads are sanitized in inputs", "CORS only allows trusted origins", "API responses don't leak server info (x-powered-by removed)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Helmet.js", explanation: "Express middleware that sets 15+ security HTTP headers automatically. One line of code protects against clickjacking, MIME sniffing, XSS, and more." },
      { term: "Rate Limiting", explanation: "Limiting how many requests a client can make in a time window (e.g., 100 requests per 15 minutes). Prevents brute-force attacks and API abuse." },
      { term: "XSS (Cross-Site Scripting)", explanation: "An attack where malicious JavaScript is injected through user input. Sanitizing inputs and encoding outputs prevents it." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Add Helmet.js as the FIRST middleware in your Express app", "Use different rate limits for different endpoints (stricter for auth, relaxed for reads)", "Never trust user input — validate AND sanitize on the backend", "Remove the 'X-Powered-By: Express' header to hide your tech stack from attackers"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Helmet.js security headers active", "Rate limiting configured and working", "XSS protection in place", "CORS properly restricted", "Server info headers removed"] }}
  ]
},

// Dark Mode Implementation
"cd5f0be8-66aa-40fa-b88f-e589f9a9e018": {
  goal: "Add a Dark Mode toggle so users can switch between light and dark themes and save their preference.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give users the choice — Light Mode for bright rooms, Dark Mode for late-night coding sessions.", real_world: "GitHub, Twitter, YouTube, VS Code — every modern app offers Dark Mode. Users expect it and love it." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Dark/Light mode toggle switch", "CSS custom properties for theme colors", "Persistent preference in localStorage", "System preference detection (prefers-color-scheme)", "Smooth transition between themes"], tech: ["Tailwind CSS", "CSS Variables", "localStorage", "React", "Theme System"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App with multiple pages and components", "Tailwind CSS dark mode configured", "Component library with consistent styling"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test the toggle", description: "Click the dark mode toggle → verify ALL pages switch to dark theme without any white flashes or unstyled elements." },
      { title: "Test persistence", description: "Set dark mode → refresh → verify dark mode persists. Clear localStorage → verify it detects system preference." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Toggle switches between light and dark modes", "All pages and components respect the theme", "Preference persists across page refreshes", "System preference is detected on first visit", "No flash of wrong theme on page load"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Tailwind Dark Mode", explanation: "Tailwind's 'class' strategy: add 'dark' class to <html> and use dark: prefix in classes. dark:bg-slate-900 applies only in dark mode." },
      { term: "prefers-color-scheme", explanation: "A CSS media query that detects the user's OS theme preference. Use it as the default until the user explicitly chooses a theme." },
      { term: "Flash of Incorrect Theme (FOIT)", explanation: "When the page loads with the wrong theme briefly before JavaScript applies the correct one. Prevent by setting the theme class in a blocking <script> in the HTML head." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use Tailwind's 'class' dark mode strategy for maximum control", "Add a blocking script in <head> to set the theme BEFORE React renders — prevents flash", "Support 3 options: Light, Dark, System (auto-detect)", "Test dark mode on every page — it's easy to miss components with hardcoded white backgrounds"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Dark mode toggle works globally", "All pages render correctly in dark mode", "Preference persists across sessions", "System preference detected correctly", "No theme flash on page load"] }}
  ]
},

// Testing Setup
"4214d51d-1539-4a56-824a-824f1731fabc": {
  goal: "Set up automated testing for backend and frontend so you can catch bugs before users do.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build your safety net — automated tests that catch bugs the moment they're introduced.", real_world: "Netflix runs thousands of tests before every deploy. Automated testing is what separates amateur projects from professional ones." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Jest/Vitest setup for backend unit tests", "React Testing Library setup for frontend", "Test scripts in package.json", "Example tests for key features", "CI-ready test configuration"], tech: ["Jest", "Vitest", "React Testing Library", "Testing", "CI/CD"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend and frontend apps running", "Multiple features built (auth, CRUD)", "npm scripts configured"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run tests", description: "cd apps/api → npm test → verify backend tests pass.\ncd apps/web → npm test → verify frontend tests pass." },
      { title: "Review test output", description: "Check that test names are descriptive, all assertions pass, and coverage report shows tested areas." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Backend tests run without errors", "Frontend tests run without errors", "Test scripts are in package.json", "At least one test per major feature", "Coverage report generates correctly"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Unit Test", explanation: "Tests a single function in isolation: 'does hashPassword return a hashed string?' Quick to run, catches logic bugs." },
      { term: "Integration Test", explanation: "Tests multiple parts working together: 'does the signup API create a user in the database?' Catches wiring issues." },
      { term: "Test Coverage", explanation: "Percentage of your code that has tests. 80% is a good target. 100% is overkill for most apps. Focus on critical paths." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Start with tests for the most critical paths: auth and CRUD", "Use describe/it blocks for clear test organization", "Run tests in CI (GitHub Actions) so they run on every push", "Write tests for bugs you fix — prevents them from coming back"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Test framework is set up for both apps", "Tests run via npm scripts", "Example tests pass", "Coverage report generates", "Tests are descriptive and organized"] }}
  ]
},

};
