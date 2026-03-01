// Vibe Coding — Module 6: ADVANCED FEATURES (10 lessons)

module.exports = {

// File Upload System
"39c47470-516a-4dd5-8ed3-4359a97ef3c3": {
  goal: "Let users upload photos or PDFs to your app and get a working file link back.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give your app the power to receive files — photos, documents, anything users want to share.", real_world: "Instagram handles billions of photo uploads. Dropbox stores files. Your app needs this capability to feel complete." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["File upload API endpoint with multer", "Frontend upload component with drag-and-drop", "File type and size validation", "Upload progress indicator", "Uploaded file URL returned for display"], tech: ["multer", "Express", "React", "File Handling", "Cloud Storage"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["CRUD operations working", "Backend running with auth middleware", "Frontend has a form where upload makes sense (profile, items)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test upload via API", description: "Use Postman to POST a file to the upload endpoint → verify a file URL is returned." },
      { title: "Test upload via UI", description: "Use the drag-and-drop area or file picker → upload → verify preview shows and URL is stored." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["File uploads successfully via API", "Drag-and-drop works on frontend", "File type validation rejects unsupported formats", "File size limit is enforced", "Upload progress shows during upload", "Uploaded file is accessible via returned URL"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "multer", explanation: "Express middleware that handles multipart/form-data — the encoding used for file uploads. It saves files to disk or memory and makes them available in req.file." },
      { term: "File Storage Options", explanation: "Local disk (dev), AWS S3 (prod), Cloudflare R2 (cheap), or Supabase Storage. For production, always use cloud storage." },
      { term: "MIME Type Validation", explanation: "Check the file's MIME type (image/jpeg, application/pdf) to ensure only allowed file types are accepted. Don't trust the file extension alone." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Limit file size to 5MB for images and 10MB for documents to save bandwidth", "Generate unique filenames (UUID) to prevent overwrites and path traversal attacks", "Create thumbnail versions of uploaded images for faster list loading", "Use pre-signed URLs for direct-to-cloud uploads in production"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Upload works but file can't be accessed", fix: "Make sure Express serves the uploads directory as static files: app.use('/uploads', express.static('uploads'))." },
      { mistake: "413 Request Entity Too Large", fix: "Increase the file size limit in multer config AND in Express body parser." },
      { mistake: "File upload works in Postman but not from frontend", fix: "Make sure the frontend sends FormData (not JSON) and doesn't set Content-Type header manually — the browser handles it." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["File upload endpoint works", "Frontend upload component works", "File type validation active", "Size limits enforced", "Uploaded files accessible via URL"] }}
  ]
},

// Image Processing
"2e967401-d2bf-43f0-9ba2-c973d1fef486": {
  goal: "Auto-generate optimized image versions (thumbnails, medium, large) in WebP format when photos are uploaded.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make uploaded images load 5x faster by auto-generating optimized versions in modern WebP format.", real_world: "Instagram generates multiple sizes of every photo. Netflix creates different quality versions. This is how production apps handle images." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Auto-resize uploaded images to 3 sizes (thumb, medium, large)", "WebP conversion for smaller file sizes", "Image metadata extraction", "Responsive image URLs in API responses"], tech: ["Sharp", "WebP", "Image Processing", "Node.js"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["File Upload System completed", "Image uploads working", "Sharp library installed (npm install sharp)"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Run commands and test", description: "Upload an image → verify 3 versions are generated (thumbnail 150px, medium 600px, large 1200px) in WebP format." },
      { title: "Verify file sizes", description: "Compare original file size vs WebP versions — WebP should be 50-80% smaller." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Uploading an image generates 3 size variants", "All variants are in WebP format", "Thumbnails load noticeably faster than originals", "API returns URLs for all image sizes", "Original image is preserved as backup"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Sharp Library", explanation: "A high-performance Node.js image processing library. It can resize, convert, crop, and optimize images using native C++ bindings — very fast." },
      { term: "WebP Format", explanation: "Google's modern image format. 25-35% smaller than JPEG at the same quality. Supported by all modern browsers." },
      { term: "Responsive Images", explanation: "Serving different image sizes based on context — thumbnails in lists, medium in cards, large in detail views. Saves bandwidth and speeds up loading." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Process images asynchronously — don't block the upload response", "Keep the original image as a backup in case you need to regenerate sizes", "Use WebP with 80% quality — visually indistinguishable from the original but much smaller", "Add a loading skeleton that matches the image aspect ratio to prevent layout shifts"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Image processing generates 3 sizes", "WebP conversion works correctly", "File sizes are significantly reduced", "API returns all variant URLs", "Original image is preserved"] }}
  ]
},

// Email Service Integration
"b1f7fac8-dec7-43a6-98c6-479fd1eae380": {
  goal: "Make your app send real emails — welcome messages, verification links, and password resets.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Connect your app to a real email service — send welcome emails, alerts, and notifications automatically.", real_world: "Every app you sign up for sends a welcome email. Email is still the #1 communication channel for apps." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Email service module (SendGrid/Resend integration)", "HTML email templates (welcome, verify, reset)", "Email queue for reliable delivery", "Dev mode: log emails to console instead of sending"], tech: ["SendGrid", "Resend", "Nodemailer", "HTML Email", "Templates"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User registration and password reset flows built", "An email service account (SendGrid free tier or Resend)", "SMTP or API credentials ready"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure email credentials", description: "Add your email service API key to .env (SENDGRID_API_KEY or RESEND_API_KEY)." },
      { title: "Test email sending", description: "Trigger a signup → check your real email inbox (or terminal in dev mode) for the welcome email." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Email service connects with API key", "Welcome email sends on signup", "Verification email sends with valid link", "Password reset email sends with reset link", "Dev mode logs emails to console", "HTML template renders correctly"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Email Service vs SMTP", explanation: "SMTP is the raw email protocol (complex). Email services like SendGrid/Resend provide a simple API to send emails reliably with analytics." },
      { term: "HTML Email Templates", explanation: "Emails styled with inline CSS (not external stylesheets). Email clients are strict — use tables for layout and inline styles for compatibility." },
      { term: "Email Queue", explanation: "Instead of sending emails synchronously (blocking the API), add them to a queue. A background worker processes the queue — your API stays fast." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always have a plain-text fallback for HTML emails", "Use a 'from' address on your own domain for better deliverability", "Test emails with services like Mailtrap before going live", "Add unsubscribe links to marketing emails (legally required in many countries)"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Email service is configured", "Welcome email sends on signup", "Verification emails work", "Password reset emails work", "Dev mode logging works"] }}
  ]
},

// Payment Integration (Stripe)
"5933177e-511e-4ba9-a8f1-79f7eb4b163b": {
  goal: "Let users pay on your website using Stripe card payments and see 'Payment Successful' confirmation.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add the money-making feature — accept real payments so your app can generate revenue.", real_world: "Uber, Shopify, Netflix — they all use Stripe. It's the gold standard for accepting payments on the web." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Stripe checkout session creation", "Payment page with Stripe Elements", "Webhook handler for payment confirmation", "Success and cancel pages", "Payment history tracking"], tech: ["Stripe", "Webhooks", "Express", "React", "Payments"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User auth system working", "Stripe account created (stripe.com)", "Stripe test API keys in .env"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure Stripe keys", description: "Add STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY to .env (use test keys)." },
      { title: "Test payment flow", description: "Click 'Pay' → Stripe checkout opens → use test card 4242 4242 4242 4242 → verify success page shows and payment is recorded." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Checkout session creates successfully", "Stripe checkout page loads with correct amount", "Test card payment completes", "Success page shows after payment", "Webhook receives payment confirmation", "Payment is recorded in database"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Stripe Checkout", explanation: "A pre-built, hosted payment page by Stripe. You redirect users there, they pay, Stripe redirects back. Handles PCI compliance for you." },
      { term: "Webhooks", explanation: "Stripe sends a POST request to YOUR server when a payment succeeds. This is more reliable than client-side callbacks because it works even if the user closes the browser." },
      { term: "Test Mode", explanation: "Stripe provides test API keys and test card numbers. No real money moves. Use 4242 4242 4242 4242 for a successful test payment." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["ALWAYS verify payments via webhooks, not client-side callbacks — users can fake success redirects", "Use Stripe test cards: 4242... for success, 4000000000000002 for decline", "Log all webhook events for debugging payment issues", "Implement idempotency — handle duplicate webhook events gracefully"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Webhook signature verification fails", fix: "Use the webhook signing secret from Stripe dashboard (whsec_...). Make sure the raw request body is passed to Stripe's verification, not parsed JSON." },
      { mistake: "Checkout session returns 401", fix: "Stripe secret key might be wrong. Double-check STRIPE_SECRET_KEY in .env matches your Stripe dashboard." },
      { mistake: "Success page shows but payment not in database", fix: "The webhook is the source of truth, not the redirect. Check webhook logs in Stripe dashboard." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Stripe integration configured", "Checkout flow works with test cards", "Webhook receives payment events", "Payment recorded in database", "Success/cancel pages display correctly"] }}
  ]
},

// Third-Party API Integration
"b7ef358c-00c3-4407-af78-e4f15aa32c81": {
  goal: "Connect your app to external services like Weather, Maps, or other APIs safely and reliably.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Supercharge your app by connecting to the outside world — weather data, maps, AI, and more.", real_world: "Uber uses Google Maps API. Weather apps use OpenWeatherMap. Almost every modern app connects to external APIs." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["API client module with axios/fetch wrapper", "Environment-based API key management", "Rate limiting and caching for external calls", "Error handling for third-party failures", "Fallback behavior when external API is down"], tech: ["axios", "REST APIs", "Caching", "Error Handling", "Environment Variables"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Backend API architecture working", "Environment variables configured", "Understanding of REST APIs from earlier lessons"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Add API key to .env", description: "Sign up for the external API (e.g., OpenWeatherMap) → get API key → add to .env." },
      { title: "Test integration", description: "Hit your endpoint that calls the external API → verify data comes back correctly. Test with invalid key, rate limits, and network errors." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["External API calls work correctly", "API keys stored in .env (not hardcoded)", "Error handling covers API failures gracefully", "Caching reduces duplicate API calls", "Fallback behavior works when API is unavailable"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "API Client Wrapper", explanation: "A module that centralizes all external API calls with built-in error handling, retries, and logging. Instead of calling fetch() everywhere, call apiClient.getWeather()." },
      { term: "Response Caching", explanation: "Store API responses temporarily (5-15 minutes). If the same request comes again, return the cached result instead of calling the external API again." },
      { term: "Circuit Breaker Pattern", explanation: "If an external API fails 5 times in a row, stop calling it for 30 seconds. This prevents cascading failures and gives the external service time to recover." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Never expose third-party API keys to the frontend — proxy through your backend", "Cache responses to avoid hitting rate limits", "Add timeout limits (5 seconds) — don't let slow external APIs make YOUR app slow", "Log all external API calls for monitoring and debugging"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["External API integration works", "API keys are in .env only", "Error handling prevents crashes", "Caching reduces API calls", "Fallback works when API is down"] }}
  ]
},

// Real-Time Notifications
"946d82cd-68fc-41f9-a5f7-3a63f0a5ee06": {
  goal: "Add a notification bell so users see in-app alerts for important events.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add the notification bell — that satisfying red badge that tells users something important happened.", real_world: "Facebook's notification bell, Slack's channel alerts, GitHub's notification inbox — notifications keep users engaged." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Notification bell icon with unread count badge", "Notifications dropdown with recent alerts", "Mark as read / mark all as read", "Different notification types (info, success, warning)", "Backend notification creation service"], tech: ["React", "Express", "PostgreSQL", "Real-Time", "UI Components"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User dashboard built", "Auth system working", "At least some user actions that could trigger notifications"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test notification creation", description: "Trigger an action (create item, receive message) → verify notification appears in the bell dropdown." },
      { title: "Test mark as read", description: "Click a notification → verify it's marked as read → unread count decreases." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Bell icon shows unread count", "Dropdown shows recent notifications", "Mark as read works (individual and all)", "Different notification types render with appropriate icons/colors", "Notifications persist across page refreshes"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Notifications Table", explanation: "A database table: id, userId, type, title, message, isRead, createdAt. Each row is one notification for one user." },
      { term: "Badge Count", explanation: "SELECT COUNT(*) FROM notifications WHERE userId=X AND isRead=false — this number shows on the bell icon." },
      { term: "Polling vs WebSocket", explanation: "Polling: check for new notifications every 30 seconds. WebSocket: get instant push notifications. Polling is simpler, WebSocket is better UX." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Start with polling (simple), upgrade to WebSocket later", "Group similar notifications: '5 people liked your post' instead of 5 separate notifications", "Add notification preferences so users can mute types they don't want", "Clear old notifications automatically (older than 30 days)"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Bell icon displays with unread count", "Dropdown shows notification list", "Mark as read works", "Notifications are persisted in database", "Different types render correctly"] }}
  ]
},

// Analytics & Tracking
"71885f93-c49e-44d2-a83d-eeab9e899d73": {
  goal: "Measure what users do in your app — page views, clicks, and feature usage — so you know what to improve.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "See what your users actually do — data beats guessing when it comes to improving your product.", real_world: "Every successful product (Netflix, Spotify, Amazon) tracks user behavior to make data-driven decisions." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Event tracking system (page views, clicks, actions)", "Analytics dashboard with basic charts", "User engagement metrics", "Feature usage tracking", "Privacy-respecting data collection"], tech: ["React", "Express", "Charts", "Event Tracking", "Analytics"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User dashboard built", "Multiple features working (CRUD, auth, etc.)", "Basic understanding of what metrics matter"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Verify event tracking", description: "Navigate through the app → check that page views and actions are being recorded." },
      { title: "View analytics dashboard", description: "Open the analytics page → verify charts show real data from tracked events." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Page views are tracked automatically", "Key actions are recorded (create, update, login)", "Analytics dashboard shows charts with real data", "Data is scoped to the authenticated user/admin", "No sensitive data is tracked (passwords, personal info)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Event-Based Tracking", explanation: "Record events like { type: 'page_view', page: '/dashboard', userId, timestamp } or { type: 'action', action: 'create_task' }. Each event is one row in the analytics table." },
      { term: "Aggregation Queries", explanation: "GROUP BY date to get 'page views per day'. GROUP BY page to get 'most visited pages'. SQL aggregations turn raw events into insights." },
      { term: "Privacy by Design", explanation: "Only track what you need. Don't track personal data. Anonymize where possible. Be transparent about what you collect." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Track events asynchronously — don't slow down the user experience", "Start with 5 key metrics, not 50 — focus on what matters", "Add a 'data retention policy' — auto-delete events older than 90 days", "Use batch inserts for high-traffic events instead of one-by-one"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Event tracking captures key actions", "Analytics dashboard renders with charts", "Data is accurate and up-to-date", "No sensitive data is tracked", "Admin can view aggregate analytics"] }}
  ]
},

// WebSocket for Real-Time Updates
"5dba9212-196c-486e-a881-92ed9afeb367": {
  goal: "Make your app live — when something happens, all connected users see it instantly without refreshing.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make your app feel ALIVE — changes appear instantly for everyone, no refresh needed.", real_world: "Slack messages appear instantly. Google Docs shows collaborators typing. This is the magic of WebSockets." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Socket.io server setup", "Real-time event broadcasting", "Client-side socket connection with auto-reconnect", "Live updates for CRUD operations", "Online presence indicator"], tech: ["Socket.io", "WebSocket", "Express", "React", "Real-Time"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["CRUD operations fully working", "Frontend list and detail views built", "Backend running with Express"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Install and run", description: "Run the commands to install socket.io. Start both backend and frontend." },
      { title: "Test real-time updates", description: "Open the app in 2 browser windows → create an item in one → it should appear in the other instantly without refresh." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Socket.io server starts without errors", "Client connects and reconnects automatically", "Creating an item broadcasts to other clients", "Updating an item reflects on other clients", "Online users indicator shows correct count"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "WebSocket vs HTTP", explanation: "HTTP: client asks, server responds, connection closes. WebSocket: both sides can send messages anytime through a persistent connection. Like a phone call vs texting." },
      { term: "Socket.io", explanation: "A library that makes WebSockets easy. Handles fallbacks, reconnection, rooms (groups), and broadcasting — all the hard parts are solved." },
      { term: "Event Broadcasting", explanation: "When user A creates an item, the server 'broadcasts' a 'new-item' event to all connected clients. Each client updates its UI without a page refresh." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Authenticate socket connections using the same JWT token", "Use 'rooms' to scope broadcasts — only send updates to relevant users", "Add reconnection logic with exponential backoff for reliability", "Don't replace HTTP with WebSockets — use both: HTTP for CRUD, WebSocket for live updates"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Socket.io server running", "Clients connect automatically", "Real-time CRUD updates work across browsers", "Online presence shows correctly", "Reconnection works after network blip"] }}
  ]
},

// Export & Reporting
"09a1ee9f-fd27-4c20-bd8d-1ecd29b11f7f": {
  goal: "Let users download their data as CSV or JSON with one click.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give users their data freedom — download everything they've created as CSV or JSON in one click.", real_world: "GDPR gives users the right to download their data. LinkedIn, Google, Twitter all have data export features." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Export API endpoint returning CSV or JSON", "Download button on the frontend", "Column selection for custom exports", "Date range filter for exports", "Large dataset streaming"], tech: ["CSV Generation", "File Download", "Streaming", "Express", "React"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["CRUD operations working", "Filtering system in place", "Multiple items in the database for testing"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test export API", description: "GET /api/v1/items/export?format=csv → verify a CSV file downloads." },
      { title: "Test UI export", description: "Click 'Export' button → choose format → file downloads with correct data." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["CSV export downloads correctly", "JSON export downloads correctly", "Exported data matches the user's items", "Date range filter works for exports", "Large exports don't crash the server (streaming)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Content-Disposition Header", explanation: "Tells the browser 'this is a file download, name it export.csv'. Without it, the browser would try to display the CSV as a web page." },
      { term: "Streaming Response", explanation: "For large datasets, stream data row-by-row instead of loading everything into memory. This prevents server crashes on big exports." },
      { term: "CSV Format", explanation: "Comma-Separated Values — the universal format that opens in Excel, Google Sheets, and any data tool. Each line is a row, commas separate columns." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Add a 'Export all my data' button for GDPR compliance", "Stream large exports to avoid memory issues", "Include a header row in CSV exports for column names", "Add an 'Export in progress' indicator for large datasets"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["CSV export works correctly", "JSON export works correctly", "Data is scoped to the user", "Downloads trigger from the UI button", "Large datasets export without crashing"] }}
  ]
},

// Background Jobs (Optional)
"ef14798d-ed1c-4071-ab64-b476900629c6": {
  goal: "Run heavy tasks (like sending emails or processing images) in the background so your API stays fast.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Keep your app fast by pushing heavy work to background workers — emails, exports, and processing happen silently.", real_world: "When YouTube processes your uploaded video into multiple quality levels, that's a background job. Your API responds instantly while workers do the heavy lifting." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Job queue system (Bull/BullMQ with Redis)", "Background email sending", "Background image processing", "Job status tracking and retries", "Admin view of job queue status"], tech: ["BullMQ", "Redis", "Background Jobs", "Queue", "Workers"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Email service and/or image processing working", "Redis installed or hosted (Upstash free tier)", "Backend running with multiple features"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Configure Redis", description: "Add REDIS_URL to .env (use Upstash for free hosted Redis)." },
      { title: "Test background jobs", description: "Trigger an action that creates a job (e.g., signup email) → verify the job runs in the background → API responds instantly without waiting for the job." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Job queue connects to Redis", "Jobs are created and processed asynchronously", "API responds immediately (doesn't wait for job)", "Failed jobs retry automatically", "Job status is trackable"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Job Queue", explanation: "A list of tasks waiting to be processed. The API adds jobs to the queue, and separate worker processes pick them up and execute them." },
      { term: "Redis", explanation: "An ultra-fast in-memory database used as the backbone of the job queue. It stores the job list and ensures reliable delivery." },
      { term: "Retry Strategy", explanation: "If a job fails (network error, timeout), it automatically retries with exponential backoff (wait 1s, 2s, 4s, 8s...). After max retries, it's marked as failed." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use Upstash for free, hosted Redis — no server management needed", "Set a maximum retry count (3-5) to avoid infinite retry loops", "Add a 'dead letter queue' for permanently failed jobs", "Monitor queue size — if it grows too fast, you need more workers"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Queue system connects to Redis", "Jobs process in background", "API stays fast (no blocking)", "Failed jobs retry automatically", "Job completion/failure is logged"] }}
  ]
},

};
