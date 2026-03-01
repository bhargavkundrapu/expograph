// Vibe Coding — Module 5: CORE APPLICATION FEATURES (10 lessons)

module.exports = {

// Core App Data Schema
"d3714125-f80b-4412-a772-61b69ec00844": {
  goal: "Create the main database table so users can store tasks, notes, or posts with status, priority, and categories.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Design the heart of your app — the main data table that powers everything users create and manage.", real_world: "Notion stores pages, Trello stores cards, Todoist stores tasks. Your app needs its core entity too." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Main entity table (tasks/items) with all required columns", "Status field (draft, active, completed, archived)", "Priority levels (low, medium, high, urgent)", "Category/tag support", "Foreign key linking items to users"], tech: ["PostgreSQL", "Prisma", "Database Design", "Schema"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["User Schema Design completed", "Database connected and migrations working", "Auth system in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send. The agent creates the Prisma schema for your main entity." },
      { title: "Run migration", description: "Run the Prisma migration command to create the table in your database." },
      { title: "Verify table structure", description: "Check in Neon dashboard that the table has all columns: id, title, description, status, priority, userId, timestamps." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Table created with all required columns", "Foreign key to users table exists", "Status and priority enums are configured", "Timestamps auto-fill on create/update", "Migration tracked in version control"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Foreign Key", explanation: "A column that links to another table's ID. 'userId' in your items table points to 'id' in the users table — this is how you know which user owns which item." },
      { term: "Enum Types", explanation: "Predefined values like status='active|completed|archived'. Prevents bad data like status='bananas' from entering the database." },
      { term: "Indexes", explanation: "Speed up searching by common fields. Adding an index on 'userId' makes 'find all items for user X' dramatically faster." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Add a 'deletedAt' column for soft deletes — never truly delete user data", "Index the userId column — you'll query by it constantly", "Use UUIDs for IDs instead of auto-increment for better security", "Add a 'position' column if you'll support drag-and-drop reordering later"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Main entity table exists in database", "Foreign key to users is set", "Status and priority fields use proper types", "Timestamps auto-update", "Schema is version-controlled via migrations"] }}
  ]
},

// Create Operation (C in CRUD)
"4bd2660b-d074-4c53-b300-566a50770e3f": {
  goal: "Let users add new tasks with title and details and save them into the database.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give users the power to CREATE — the first and most satisfying CRUD operation.", real_world: "Every 'New Post' button on Twitter, every 'Add Task' on Todoist, every 'Create Doc' on Google Docs — it all starts with Create." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["POST /api/v1/items endpoint", "Create form with title, description, status, priority", "Input validation (required fields, max lengths)", "Success feedback with the created item"], tech: ["Express", "React", "Prisma", "Form Handling", "Zod"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Core App Data Schema completed", "Items table exists in database", "Auth middleware protecting routes"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test create via API", description: "Use Postman to POST /api/v1/items with title and description. Verify the item is returned with an ID." },
      { title: "Test create via UI", description: "Open the frontend → click 'Create' → fill form → submit → verify item appears in the list." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["POST endpoint creates item in database", "Item is linked to the authenticated user", "Validation rejects empty or invalid data", "UI form submits and shows success", "Created item appears in the list immediately"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "CRUD", explanation: "Create, Read, Update, Delete — the 4 fundamental operations for any data. This lesson covers the C. The next 3 lessons cover R, U, D." },
      { term: "Request Validation (Zod)", explanation: "Before saving to the database, Zod validates the request body: 'is title a non-empty string? is priority one of the allowed values?' Invalid requests get a 400 error." },
      { term: "Owned Resources", explanation: "The item's userId is set from the auth token, not from the request body. Users can only create items for themselves — the server enforces this." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Auto-set userId from the auth token — never trust the client to send it", "Return the full created item (including id and timestamps) in the response", "Add a loading state to the submit button to prevent double-clicks", "Use optimistic UI: add the item to the list immediately, then confirm with the server"] }},
    { type: "VC-08_COMMON_PITFALLS", data: { pitfalls: [
      { mistake: "Item created but not linked to user", fix: "Set userId from req.user.id (from auth middleware), not from the request body." },
      { mistake: "Form submits but nothing appears in the list", fix: "After a successful POST, either refetch the list or add the response item to local state." },
      { mistake: "Validation passes on client but fails on server", fix: "Always validate on both sides. Server validation is the source of truth." }
    ] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Create endpoint works and returns the new item", "Items are linked to the authenticated user", "Validation rejects invalid input", "UI form works end-to-end", "Items appear in the list after creation"] }}
  ]
},

// Read Operations (R in CRUD)
"ccc4389f-db28-4808-b48c-b064736ddeb5": {
  goal: "Show saved tasks as a list and individual detail pages so users can browse their data.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Let users SEE their data — a clean list view plus detailed single-item pages.", real_world: "Every feed you scroll (Instagram, Reddit, email inbox) is a Read operation. This is what users interact with most." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["GET /api/v1/items — list all user's items", "GET /api/v1/items/:id — get single item details", "List UI with cards showing title, status, priority", "Detail page with full item information"], tech: ["Express", "React", "Prisma", "REST API", "Tailwind"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Create Operation completed", "At least a few items created in the database", "Auth middleware protecting routes"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test list endpoint", description: "GET /api/v1/items → verify it returns only YOUR items (not other users')." },
      { title: "Test detail view", description: "Click an item in the list → detail page loads with all fields displayed." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["List endpoint returns only the authenticated user's items", "Items display in a clean card layout", "Clicking an item opens its detail page", "Empty state shows when no items exist", "Loading state displays while fetching"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Data Scoping", explanation: "The query always includes WHERE userId = req.user.id. This ensures users ONLY see their own data — a critical security measure." },
      { term: "Empty State", explanation: "When a list has zero items, show a friendly message ('No tasks yet — create your first one!') instead of a blank page." },
      { term: "List vs Detail Pattern", explanation: "List page shows summary (title + status). Detail page shows everything (description, dates, all fields). This is the standard two-level data browsing pattern." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always show an empty state with a CTA button — 'Create your first task'", "Add a loading skeleton (not just a spinner) for perceived speed", "Order items by most recent first (ORDER BY createdAt DESC)", "Show item count in the header: 'Tasks (12)'"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["List endpoint returns user-scoped data", "Items render in a card layout", "Detail page shows full item info", "Empty state displays correctly", "Loading state works smoothly"] }}
  ]
},

// Update Operation (U in CRUD)
"6db6b68b-2633-441c-8582-01b2a586956d": {
  goal: "Let users edit existing tasks — change title, status, priority — and save changes to the database.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Let users change their mind — edit any item, update any field, keep everything in sync.", real_world: "Every 'Edit' button you've ever clicked triggers an Update operation. It's how data stays current and useful." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["PATCH /api/v1/items/:id endpoint", "Edit form pre-filled with current values", "Partial updates (change one field without sending all)", "Optimistic UI update"], tech: ["Express", "React", "Prisma", "PATCH", "Forms"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Read Operations completed", "Items display in list and detail view", "At least a few items in the database to edit"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test update via API", description: "PATCH /api/v1/items/:id with { title: 'Updated title' } → verify only title changes, other fields remain." },
      { title: "Test update via UI", description: "Click edit on an item → change some fields → save → verify changes persist after refresh." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["PATCH endpoint updates only the sent fields", "Edit form loads with current values pre-filled", "Changes save to database and persist on refresh", "User can only edit their own items (not others')", "Updated timestamp changes on edit"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "PATCH vs PUT", explanation: "PUT replaces the entire resource. PATCH updates only the fields you send. PATCH is safer — you won't accidentally clear fields you didn't include." },
      { term: "Ownership Check", explanation: "Before updating, verify the item belongs to req.user.id. Without this, any authenticated user could edit anyone's items." },
      { term: "Optimistic Update", explanation: "Update the UI immediately when the user clicks save. If the server confirms, great. If it fails, revert the UI and show an error." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use PATCH (not PUT) for updates — it's safer and more efficient", "Always verify ownership: WHERE id = :id AND userId = req.user.id", "Show a 'saving...' indicator instead of blocking the whole page", "Track updatedAt timestamp to know when data was last modified"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Edit form loads with current values", "Partial updates work (change one field, others stay)", "Ownership is enforced", "Changes persist after refresh", "Updated timestamp reflects the change"] }}
  ]
},

// Delete Operation (D in CRUD)
"d672cd32-9570-4567-85ac-28347cd6d175": {
  goal: "Let users delete tasks safely with soft delete and an 'Undo' option for 5 seconds.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add the 'delete' button — but make it forgiving with soft delete and a 5-second undo window.", real_world: "Gmail's 'Undo send' and Google Drive's Trash folder both use soft delete. Users make mistakes — your app should be forgiving." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["DELETE /api/v1/items/:id endpoint (soft delete)", "Confirmation dialog before deleting", "'Undo' toast notification with 5-second countdown", "Trash/archive view for soft-deleted items"], tech: ["Express", "React", "Soft Delete", "Toast Notifications", "UX"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Update Operation completed", "Items table has a 'deletedAt' column (or ready to add)", "At least a few items to test deletion"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test soft delete", description: "Delete an item → verify it disappears from the list but still exists in the database (deletedAt is set)." },
      { title: "Test undo", description: "Delete an item → click 'Undo' within 5 seconds → item should reappear in the list." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Delete shows confirmation dialog", "Soft delete sets deletedAt instead of removing the row", "Deleted items disappear from the main list", "Undo button restores the item within the time window", "User can only delete their own items"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Soft Delete", explanation: "Instead of DELETE FROM items WHERE id=X, you do UPDATE items SET deletedAt=NOW(). The data stays in the database but is hidden from normal queries." },
      { term: "Undo Pattern", explanation: "After 'deleting', show a toast with an Undo button. The actual delete happens after the timeout. Clicking Undo clears the timeout and restores visibility." },
      { term: "Query Scoping", explanation: "All READ queries now need WHERE deletedAt IS NULL to exclude soft-deleted items. Alternatively, use a Prisma middleware to auto-filter." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use a Prisma middleware to automatically filter out soft-deleted records", "Show a 'Trash' section where users can see and permanently delete items", "Add a 'permanently delete after 30 days' background job", "The undo toast should show a countdown timer for urgency"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Delete uses soft delete (not permanent)", "Confirmation dialog prevents accidents", "Undo works within the time window", "Soft-deleted items are filtered from normal queries", "Ownership is enforced on delete"] }}
  ]
},

// Pagination Implementation
"81ab1877-438f-480b-9c28-981fd1fa22da": {
  goal: "Show items in pages so your app stays fast even with thousands of records.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make your app scale — load data in pages so it stays lightning-fast even with 10,000 items.", real_world: "Google shows 10 results per page. Amazon shows 20 products. Without pagination, a list of 10,000 items would crash the browser." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Offset-based pagination on the API", "Page size control (10, 25, 50 per page)", "Page navigation UI (prev/next, page numbers)", "Total count + current page display"], tech: ["Express", "React", "SQL OFFSET/LIMIT", "UI Components"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["CRUD operations completed", "Several items in the database (create 15+ for testing)", "List view rendering items"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test pagination API", description: "GET /api/v1/items?page=1&limit=5 → verify 5 items returned with total count and page info." },
      { title: "Test UI navigation", description: "Click through pages → items change → page indicator updates → prev/next buttons enable/disable correctly." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["API accepts page and limit query parameters", "Response includes total count and current page info", "UI shows page numbers and navigation buttons", "Correct items display on each page", "Page 1 disables 'previous', last page disables 'next'"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "OFFSET / LIMIT", explanation: "SQL's way of paginating: LIMIT 10 OFFSET 20 means 'skip the first 20, give me the next 10'. Page 3 with 10 per page = OFFSET 20." },
      { term: "Total Count", explanation: "A separate COUNT(*) query tells the frontend how many total items exist — needed to calculate total pages and show 'Showing 21-30 of 147'." },
      { term: "Cursor-based vs Offset-based", explanation: "Offset uses page numbers (simple). Cursor uses the last item's ID (better for real-time data). Offset is fine for most apps." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Default to 10 items per page — it's the sweet spot for most UIs", "Cache the total count — don't recount on every page change", "Add URL query params (?page=2&limit=10) so pagination state survives refresh", "Show 'Showing X-Y of Z items' for clarity"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Pagination works on the API", "UI navigation moves between pages", "Total count displays correctly", "Edge cases handled (empty pages, single page)", "URL reflects current page"] }}
  ]
},

// Search Functionality
"acfbeb53-de6f-4cc7-9ec9-68b3cc844fa3": {
  goal: "Let users quickly find items by typing keywords that search across titles and descriptions.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add instant search — because nobody wants to scroll through 500 items to find the one they need.", real_world: "The search bar is the most used feature in apps like Gmail, Slack, and Notion. Fast search = happy users." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Search endpoint with query parameter", "Full-text search across title and description", "Debounced search input on frontend", "Search results with highlighted matches"], tech: ["PostgreSQL", "ILIKE", "React", "Debouncing", "Search"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Pagination completed", "Multiple items with varied titles and descriptions", "List view working"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test search API", description: "GET /api/v1/items?search=meeting → verify only items containing 'meeting' in title or description are returned." },
      { title: "Test search UI", description: "Type in the search bar → results filter in real-time (with slight debounce) → clear search restores full list." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Search API filters by title and description", "Search is case-insensitive", "Frontend debounces input (waits 300ms before searching)", "Empty search returns all items", "No results shows empty state message"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "ILIKE (Case-insensitive LIKE)", explanation: "PostgreSQL's ILIKE operator searches text without caring about uppercase/lowercase. WHERE title ILIKE '%meeting%' finds 'Meeting', 'MEETING', 'team meeting'." },
      { term: "Debouncing", explanation: "Waiting for the user to STOP typing before sending the search request. Without it, you'd send a request for every single keystroke." },
      { term: "Full-Text Search", explanation: "Searching across multiple columns (title + description) simultaneously. For advanced apps, PostgreSQL's tsvector provides ranked, stemmed search." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use 300ms debounce — fast enough to feel instant, slow enough to avoid spam", "Combine search with pagination for large datasets", "Add a 'clear search' button (X) in the input for quick reset", "Consider PostgreSQL full-text search (tsvector) for better results on large datasets"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Search filters results correctly", "Case-insensitive matching works", "Debouncing prevents excessive API calls", "Empty search shows all items", "No results state displays properly"] }}
  ]
},

// Filtering System
"df332afa-f5ff-42c6-b0c2-3b5755ccce19": {
  goal: "Let users show only the items they want by filtering on status, priority, date range, and more.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add smart filters — so users see exactly what matters to them, instantly.", real_world: "Amazon's price/rating filters, Jira's status filters, email's unread filter — filtering is how users tame large datasets." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Filter by status (active, completed, archived)", "Filter by priority (low, medium, high, urgent)", "Date range filter (created this week, this month)", "Multiple simultaneous filters", "Active filter chips showing current filters"], tech: ["Express", "React", "Query Parameters", "UI Filters"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Search functionality completed", "Items have status and priority fields filled", "Pagination working"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test filter API", description: "GET /api/v1/items?status=active&priority=high → verify only matching items return." },
      { title: "Test filter UI", description: "Select filters from dropdowns → items update → filter chips show → removing a filter restores results." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Filters work individually and combined", "Filter chips show active filters with remove buttons", "Clearing all filters restores the full list", "Filters combine with search and pagination", "URL reflects current filter state"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Query Parameter Filtering", explanation: "Filters are passed as URL params: ?status=active&priority=high. The backend builds the WHERE clause dynamically based on which params are present." },
      { term: "Filter Composition", explanation: "Multiple filters combine with AND logic: status=active AND priority=high. This is the most intuitive behavior for users." },
      { term: "Filter Chips", explanation: "Visual tags showing active filters ('Status: Active ×'). Clicking the × removes that filter. Makes the current filter state obvious." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Show the count of filtered results: 'Showing 8 of 45 items'", "Persist filters in URL query params so they survive page refresh", "Add a 'Clear all filters' button for quick reset", "Combine filters + search + pagination for the ultimate data browsing experience"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Individual filters work correctly", "Combined filters narrow results properly", "Filter chips display and are removable", "Filters combine with search and pagination", "URL reflects filter state"] }}
  ]
},

// Sorting Mechanism
"0b5a501a-4bd2-4488-b4b0-2ccabca18fa7": {
  goal: "Let users arrange items the way they want — newest first, by title A-Z, by priority, or custom order.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Let users control the ORDER of their data — because how you organize is how you think.", real_world: "File explorer sorts by name/date/size. Email sorts by date. Spreadsheets sort by any column. Your app should too." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Sort by date (newest/oldest first)", "Sort by title (A-Z / Z-A)", "Sort by priority (highest/lowest first)", "Sort indicator showing current sort direction", "Persistent sort preference"], tech: ["Express", "React", "SQL ORDER BY", "UI Controls"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Filtering System completed", "Items have varied dates, titles, and priorities", "List view with filters working"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test sorting API", description: "GET /api/v1/items?sortBy=createdAt&order=desc → verify items come newest first." },
      { title: "Test sorting UI", description: "Click sort options → items reorder → sort indicator shows current sort → combine with filters and search." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Sorting works for all supported fields", "ASC and DESC directions work", "Sort indicator shows current sort state", "Sorting combines with filters and search", "Default sort is newest first"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "ORDER BY Clause", explanation: "SQL's way of sorting: ORDER BY createdAt DESC puts newest items first. ORDER BY title ASC puts A before Z." },
      { term: "Sort + Filter + Paginate", explanation: "These three features work together: filter first (WHERE), then sort (ORDER BY), then paginate (LIMIT/OFFSET). The order matters for correct results." },
      { term: "Sort Direction Toggle", explanation: "Clicking a sort field toggles between ASC and DESC. First click = ascending, second click = descending, third click = remove sort." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Always have a default sort (createdAt DESC) so the list is never randomly ordered", "Allow only whitelisted sort fields to prevent SQL injection", "Show a small arrow icon (↑/↓) indicating current sort direction", "Save the user's sort preference in localStorage for persistence"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["All sort options work correctly", "Direction toggle (ASC/DESC) functions", "Sort combines with filters and search", "Default sort is applied on initial load", "Sort state is reflected in UI"] }}
  ]
},

// Data Validation
"3db332ac-d001-430f-9907-014ae25c6a02": {
  goal: "Stop invalid data before it reaches the database — validate on both frontend and backend.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build a data firewall — nothing invalid gets through, and users get clear feedback on what to fix.", real_world: "Stripe validates every card number. Google validates every email. Invalid data causes bugs, crashes, and security holes." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Backend validation with Zod schemas", "Frontend form validation with real-time feedback", "Custom error messages for each field", "Validation for all CRUD operations"], tech: ["Zod", "React", "Express", "Form Validation", "Error Messages"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["All CRUD operations working", "Forms for create and update built", "Understanding of Zod from earlier lessons"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test backend validation", description: "Send invalid data to the API (empty title, wrong status value, title too long) → verify 400 errors with field-level messages." },
      { title: "Test frontend validation", description: "Try submitting the form with invalid data → verify inline error messages appear before the form even submits." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Backend rejects invalid data with clear 400 errors", "Frontend shows inline validation errors per field", "Error messages are user-friendly (not technical jargon)", "Valid data passes through and saves correctly", "Both create and update forms validate"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Defense in Depth", explanation: "Validate on the frontend (instant feedback) AND the backend (security). Frontend validation improves UX. Backend validation prevents attacks." },
      { term: "Zod Schema", explanation: "A TypeScript-first validation library. Define the expected shape: z.object({ title: z.string().min(1).max(200) }). If data doesn't match, it tells you exactly what's wrong." },
      { term: "Field-Level Errors", explanation: "Instead of one generic 'Invalid input', show specific messages per field: 'Title is required', 'Priority must be low, medium, high, or urgent'." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Share validation schemas between frontend and backend if using TypeScript", "Show validation errors on blur (leaving a field) not just on submit", "Use the same error format everywhere: { field: 'title', message: 'Required' }", "Add max length counters to text inputs: '45/200 characters'"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Backend validation catches all invalid data", "Frontend shows real-time validation errors", "Error messages are clear and helpful", "Valid data saves without issues", "Both create and update are validated"] }}
  ]
},

};
