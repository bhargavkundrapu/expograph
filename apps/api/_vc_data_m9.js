// Vibe Coding — Module 9: ADVANCED UI/UX (10 lessons)

module.exports = {

"0b7e303b-f1f4-420c-9084-6cbd52fde438": { // Keyboard Shortcuts
  goal: "Add keyboard shortcuts for power users — search, save, create, and navigate without touching the mouse.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Make power users fly — keyboard shortcuts that let them do everything without touching the mouse.", real_world: "VS Code, Gmail, Notion — the best apps all have keyboard shortcuts. Power users expect them and love them." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Global keyboard shortcut system", "Ctrl+K for command palette / search", "Ctrl+N for new item", "Ctrl+S for save", "Shortcut hints in tooltips", "Keyboard shortcut help modal"], tech: ["React", "Keyboard Events", "UX", "Hotkeys", "Accessibility"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Multiple pages and forms built", "Search functionality working", "CRUD operations in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test shortcuts", description: "Press Ctrl+K → search opens. Press Ctrl+N → create form opens. Press ? → shortcuts help modal shows." },
      { title: "Test in forms", description: "Verify shortcuts don't trigger when typing in input fields." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Shortcuts work globally", "Shortcuts don't fire when typing in inputs", "Help modal lists all available shortcuts", "Tooltips show shortcut hints", "Shortcuts work on Mac (Cmd) and Windows (Ctrl)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Event Delegation", explanation: "Listen for keydown on the document level, then check the key combination. This avoids attaching listeners to every component." },
      { term: "Input Guard", explanation: "Check if document.activeElement is an input/textarea. If so, don't trigger shortcuts — the user is typing, not commanding." },
      { term: "Platform Detection", explanation: "Use navigator.platform to detect Mac vs Windows. Show Cmd on Mac, Ctrl on Windows." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use the same shortcuts as popular apps (Ctrl+K, Ctrl+N) — users already know them", "Show shortcut hints in button tooltips: 'New Item (Ctrl+N)'", "Don't override browser defaults (Ctrl+W, Ctrl+T, Ctrl+L)", "Add a '?' shortcut that shows all available shortcuts"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Global shortcuts work correctly", "Input fields are excluded", "Help modal shows all shortcuts", "Works on both Mac and Windows", "Doesn't conflict with browser shortcuts"] }}
  ]
},

"b127faa9-fe86-45db-9e3f-b7328235cd32": { // Infinite Scroll
  goal: "Make your list auto-load more items as the user scrolls down — like an infinite feed.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the infinite scroll experience — items load automatically as users scroll, no 'next page' button needed.", real_world: "Instagram, Twitter, Reddit — they all use infinite scroll. Users love the seamless, never-ending browsing experience." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Intersection Observer for scroll detection", "Cursor-based pagination API", "Loading indicator at the bottom", "'Load more' fallback button", "Scroll position restoration"], tech: ["Intersection Observer", "React", "Cursor Pagination", "UX", "Performance"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Pagination working on the API", "List view with items rendering", "At least 20+ items for testing"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test infinite scroll", description: "Scroll to the bottom of the list → verify more items load automatically → continue scrolling until all items are loaded." },
      { title: "Test edge cases", description: "Verify: loading spinner shows during fetch, 'no more items' message at the end, fast scrolling doesn't cause duplicate requests." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Items load automatically on scroll", "Loading indicator shows while fetching", "'No more items' shows when list is exhausted", "No duplicate items appear", "Scroll position is maintained after navigation"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Intersection Observer", explanation: "A browser API that tells you when an element enters the viewport. Place an invisible 'sentinel' at the bottom of the list — when it becomes visible, fetch more." },
      { term: "Cursor-Based Pagination", explanation: "Instead of page numbers, use the last item's ID: 'give me 20 items after ID xyz'. Better than offset-based for real-time data." },
      { term: "Deduplication", explanation: "Prevent the same item from appearing twice. Track loaded item IDs and skip duplicates from the API response." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Add a 'Load more' button as fallback for when Intersection Observer fails", "Debounce scroll detection to prevent rapid API calls", "Show a skeleton at the bottom while loading (not a spinner) for better perceived performance", "Consider adding a 'Back to top' floating button for long lists"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Infinite scroll loads more items", "Loading state shows correctly", "End of list is communicated", "No duplicate items", "Performance is smooth"] }}
  ]
},

"f89d3632-4b8d-4332-b98d-f4b2583cb404": { // Advanced Search with Filters
  goal: "Build a powerful search experience with filters, facets, and instant results.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build search that your users will actually enjoy using — fast, filtered, and intelligent.", real_world: "Amazon's search with price/rating/category filters is what makes shopping possible. Great search = great user experience." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Faceted search with multiple filter types", "Search suggestions / autocomplete", "Highlighted search terms in results", "Search history (recent searches)", "Advanced filter combinations"], tech: ["PostgreSQL", "React", "Search", "Faceted Filters", "Debouncing"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Basic search and filtering working", "Multiple items with varied content", "Pagination in place"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test advanced search", description: "Type a search term → verify suggestions appear → select filters → verify results narrow correctly with highlighted terms." },
      { title: "Test combinations", description: "Apply multiple filters + search term simultaneously → verify results are accurate." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Search with filters works simultaneously", "Search terms are highlighted in results", "Autocomplete suggestions appear", "Recent searches are tracked", "Complex filter combinations return correct results"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Faceted Search", explanation: "Filters that show counts: 'Status: Active (12) | Completed (5) | Archived (3)'. Users see how many results each filter option has." },
      { term: "Search Highlighting", explanation: "When results contain the search term, wrap it in a <mark> tag to visually highlight where the match is in the text." },
      { term: "Autocomplete", explanation: "Show suggestions as the user types. Fetch common search terms or matching titles with a debounced API call." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Debounce autocomplete at 200ms — fast enough to feel responsive", "Store recent searches in localStorage for instant access", "Show 'No results — try different keywords' with suggestions for common terms", "Add keyboard navigation for autocomplete suggestions (arrow keys + enter)"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Advanced search works correctly", "Filters and search combine properly", "Highlighting shows matches", "Autocomplete suggests relevant terms", "Recent searches display"] }}
  ]
},

"905db0a1-0b1c-497b-b497-fad16bcea931": { // Real-Time Collaboration
  goal: "Let multiple people use the same page simultaneously and see each other's changes in real time.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build the Google Docs experience — multiple users editing simultaneously, changes visible instantly.", real_world: "Google Docs, Figma, Miro — real-time collaboration is what makes tools truly team-friendly." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Real-time presence (who's online)", "Live cursors showing other users' activity", "Synchronized CRUD operations across clients", "Conflict resolution for simultaneous edits", "Online users indicator"], tech: ["Socket.io", "WebSocket", "React", "Presence", "Collaboration"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["WebSocket for Real-Time Updates completed", "Socket.io running on backend", "Multiple user accounts for testing"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test with 2 browsers", description: "Login as User A in Chrome, User B in Firefox → both open the same page → verify presence shows both users online." },
      { title: "Test collaboration", description: "User A creates an item → User B sees it instantly. User B edits → User A sees the change. No conflicts or data loss." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Presence shows all online users", "CRUD operations sync across clients instantly", "No data conflicts on simultaneous edits", "Disconnection is handled gracefully", "User count is accurate"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Presence System", explanation: "Track which users are currently connected. When a user connects, broadcast 'user X joined'. When they disconnect, broadcast 'user X left'." },
      { term: "Optimistic Concurrency", explanation: "When two users edit the same item, the last save wins — but the user is notified. More advanced: use versioning to detect conflicts." },
      { term: "Room-Based Broadcasting", explanation: "Users viewing the same page are in the same 'room'. Events broadcast only to that room, not to all connected users." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use Socket.io rooms to scope broadcasts to specific pages/items", "Show a subtle 'User X is editing...' indicator when someone edits", "Handle reconnection gracefully — refetch state after reconnecting", "Consider operational transforms (OT) or CRDTs for text collaboration (advanced)"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Presence shows online users", "Real-time sync works for CRUD", "No data conflicts", "Disconnection handled gracefully", "Multiple users can collaborate simultaneously"] }}
  ]
},

"a0be745b-082f-477f-a232-bb4b2803de61": { // Activity Feed & Timeline
  goal: "Show a 'Recent Activity' timeline so users can track everything that happened in the app.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build a living history of your app — who did what, when, in a beautiful scrollable timeline.", real_world: "GitHub shows commit history. Jira shows ticket activity. Activity feeds are how teams stay aware of what's happening." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Activity logging for all CRUD operations", "Timeline UI with icons and timestamps", "Filterable activity feed (by type, user, date)", "Relative timestamps ('5 minutes ago')", "Activity detail expand"], tech: ["React", "Express", "PostgreSQL", "Timeline UI", "Event Logging"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["CRUD operations working", "User authentication in place", "Multiple actions performed in the app"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Generate activity", description: "Create, update, and delete some items → verify each action is logged." },
      { title: "View timeline", description: "Open the activity feed → verify all actions appear in chronological order with correct details." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["All CRUD actions are logged to the activity table", "Timeline displays in chronological order", "Activity entries have icons, descriptions, and timestamps", "Filtering by type/date works", "Relative timestamps display correctly"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Event Sourcing (Lite)", explanation: "Log every action as an event: { userId, action: 'created', entity: 'task', entityId, timestamp }. The activity feed is a read of these events." },
      { term: "Relative Time", explanation: "Show '5 minutes ago', '2 hours ago', 'Yesterday' instead of '2024-01-15T14:32:00Z'. Use a library like dayjs or date-fns for this." },
      { term: "Timeline UI Pattern", explanation: "A vertical line with events branching off. Each event has an icon (create=green, delete=red), description, timestamp, and optional details." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Log activities asynchronously to avoid slowing down CRUD operations", "Include enough context in the log: 'Created task \"Team meeting\"' not just 'Created task'", "Add pagination to the activity feed — it can grow very large", "Consider a 'grouped' view: '5 tasks created today' instead of 5 individual entries"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Activity logging captures all actions", "Timeline renders in correct order", "Filters narrow the feed", "Relative timestamps work", "Activity details expand on click"] }}
  ]
},

"c6964bea-2b8d-4104-92e9-5f7b8b326703": { // Theming System
  goal: "Let users customize the app's colors — light, dark, custom themes — and save their choice.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Give users creative control — let them choose their own colors and make the app feel truly theirs.", real_world: "Discord lets you customize accent colors. Slack lets you choose themes. Personalization increases user attachment." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Theme context with multiple presets (light, dark, blue, green)", "CSS custom properties for theme tokens", "Theme picker in settings", "User theme preference saved to database", "Smooth theme transitions"], tech: ["CSS Variables", "React Context", "Theme System", "Tailwind", "Personalization"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Dark mode toggle working", "Settings page built", "CSS custom properties basics understood"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test theme switching", description: "Go to Settings → Theme → select different themes → verify all pages update consistently." },
      { title: "Test persistence", description: "Choose a theme → log out → log back in → verify the theme preference persists." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Multiple theme presets available", "All pages respect the active theme", "Theme transitions are smooth (no flash)", "Preference saves to database and persists", "Theme picker UI is intuitive"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "CSS Custom Properties (Variables)", explanation: "Define --color-primary: #3B82F6 at the root. Use var(--color-primary) everywhere. Change the variable → every component updates instantly." },
      { term: "Theme Context", explanation: "A React Context that provides the current theme and a setter function. Any component can read the theme and adapt." },
      { term: "Design Tokens", explanation: "Named values for colors, spacing, fonts: --color-bg, --color-text, --spacing-md. Each theme defines its own values for these tokens." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Define theme tokens (--color-primary, --color-bg) not specific colors — makes theming systematic", "Save theme to both localStorage (instant load) and database (persistent across devices)", "Add a preview swatch when hovering over theme options", "Support a 'custom' theme where users pick their own colors with a color picker"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Multiple themes available and selectable", "All pages respect the theme", "Preference persists across sessions", "Transitions are smooth", "Theme picker is user-friendly"] }}
  ]
},

"3af550b4-7485-4e07-8cc9-bb010aa94da9": { // Internationalization (i18n)
  goal: "Let users use the app in multiple languages and save their language preference.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Break the language barrier — let users experience your app in their native language.", real_world: "Facebook supports 100+ languages. Even small apps benefit — i18n opens your product to the global market." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["i18n library setup (react-i18next)", "Translation files for 2-3 languages", "Language switcher in settings", "Date and number formatting per locale", "RTL (right-to-left) support basics"], tech: ["react-i18next", "i18n", "Localization", "Translation", "React"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App with text content to translate", "Settings page built", "Understanding of React Context"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test language switching", description: "Go to Settings → Language → switch to another language → verify all text changes across the app." },
      { title: "Test formatting", description: "Verify dates and numbers format correctly for each locale (e.g., MM/DD/YYYY vs DD/MM/YYYY)." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Language switcher works in settings", "All UI text translates when language changes", "Dates format per locale", "Numbers format per locale", "Language preference persists"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "i18n (Internationalization)", explanation: "Making your app ready for translation by replacing hardcoded text with translation keys. t('welcome') instead of 'Welcome'." },
      { term: "Translation Files", explanation: "JSON files per language: en.json has { 'welcome': 'Welcome' }, es.json has { 'welcome': 'Bienvenido' }. The library swaps them based on the active language." },
      { term: "Locale-Aware Formatting", explanation: "Dates, numbers, and currencies format differently per locale. 1,234.56 (US) vs 1.234,56 (Germany). Use Intl.DateTimeFormat and Intl.NumberFormat." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use translation keys that describe the context: 'auth.login.title' not 'loginTitle'", "Detect browser language on first visit: navigator.language", "Don't translate programmatically — use professional translation for quality", "Keep translation files organized by feature/page for maintainability"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["i18n library is set up", "Language switching works", "All UI text uses translation keys", "Date/number formatting adapts", "Language preference persists"] }}
  ]
},

"480829b8-1beb-4b45-8143-b1d800e59bc6": { // Advanced Data Visualization
  goal: "Show app data as charts and graphs so users can understand trends at a glance.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Turn raw numbers into beautiful insights — charts that make data tell a story.", real_world: "GitHub's contribution graph, Fitbit's activity charts, Spotify's listening stats — visualization makes data meaningful." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Line chart (trends over time)", "Bar chart (comparisons)", "Pie/donut chart (proportions)", "Responsive chart layout", "Interactive tooltips and legends"], tech: ["Recharts", "React", "Data Visualization", "SVG", "Dashboard"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["Dashboard page built", "Analytics/tracking data available", "npm install recharts completed"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Feed real data", description: "Connect charts to your API → verify they display actual data from the database." },
      { title: "Test responsiveness", description: "Resize the browser → verify charts adapt to smaller screens without breaking." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Line chart shows trends correctly", "Bar chart compares values accurately", "Pie chart shows proportions", "Charts are responsive on mobile", "Tooltips show on hover"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Recharts", explanation: "A React charting library built on D3.js. Provides declarative chart components: <LineChart>, <BarChart>, <PieChart> — just pass data as props." },
      { term: "Data Transformation", explanation: "Raw database data often needs reshaping for charts. Group by date, calculate averages, compute percentages — transform before rendering." },
      { term: "SVG Rendering", explanation: "Charts are rendered as SVG (Scalable Vector Graphics) — they look crisp at any size and are interactive (hover, click)." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use a consistent color palette across all charts", "Add clear axis labels and titles — charts without context are useless", "Limit data points on mobile (show last 7 days instead of 30)", "Add a 'no data' state for charts with empty datasets"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Charts render with real data", "Multiple chart types working", "Responsive on all screen sizes", "Tooltips and legends functional", "Data transformations are accurate"] }}
  ]
},

"20fffddd-6625-4d07-8bb9-90a5b3952fac": { // Drag and Drop
  goal: "Let users reorder items by dragging with mouse or touch, with the new order saved to the database.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Add the most satisfying interaction in UI — drag items to reorder them and the order sticks.", real_world: "Trello's drag-and-drop cards, Spotify's playlist reordering, Todoist's task prioritization — drag-and-drop makes apps feel premium." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Drag-and-drop reordering with @dnd-kit", "Visual feedback during drag (ghost, placeholder)", "Touch support for mobile", "Order persistence to database", "Smooth animations"], tech: ["@dnd-kit", "React", "Touch Events", "Animation", "Database"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["List view with items rendering", "Backend PATCH endpoint for updates", "Items have a 'position' or 'order' field in database"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test drag reorder", description: "Drag an item to a new position → verify it snaps into place with smooth animation." },
      { title: "Test persistence", description: "Reorder items → refresh the page → verify the new order persists." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Items can be dragged to new positions", "Visual feedback shows during drag", "New order saves to database", "Order persists after refresh", "Touch drag works on mobile"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "@dnd-kit", explanation: "A lightweight, performant drag-and-drop library for React. Provides sensors (mouse, touch, keyboard), a sortable context, and smooth animations." },
      { term: "Optimistic Reorder", explanation: "Update the order in the UI immediately when the user drops. Then send the new order to the server in the background. If it fails, revert." },
      { term: "Position Field", explanation: "An integer column in the database that determines display order. When items are reordered, update the position values for affected items." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Use a gap-based position system (10, 20, 30) to reduce position update conflicts", "Add a grab cursor icon to indicate draggable elements", "Debounce save requests — wait 500ms after the last drag before saving", "Add keyboard accessibility (arrow keys) as an alternative to mouse/touch drag"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Drag and drop works on desktop", "Touch drag works on mobile", "Order saves to database", "Order persists on refresh", "Animations are smooth"] }}
  ]
},

"e6d10640-dc3b-4204-988b-4fbb3ffa7ad5": { // Accessibility (A11y)
  goal: "Make your app usable by everyone — keyboard navigation, screen readers, and proper semantic HTML.",
  sections: [
    { type: "VC-01_MISSION", data: { headline: "Build for everyone — make your app usable with keyboard only, screen readers, and assistive technology.", real_world: "15% of the world's population has a disability. Accessibility is not just ethical — in many countries, it's legally required." }},
    { type: "VC-02_WHAT_YOULL_BUILD", data: { features: ["Semantic HTML throughout the app", "ARIA labels for interactive elements", "Keyboard navigation for all features", "Focus management for modals and dropdowns", "Color contrast compliance (WCAG AA)"], tech: ["ARIA", "Semantic HTML", "WCAG", "Accessibility", "Keyboard Navigation"] }},
    { type: "VC-03_PREREQUISITES", data: { items: ["App with multiple pages and interactions", "Component library in place", "Chrome DevTools Accessibility audit available"] }},
    { type: "VC-04_WORKFLOW", data: { steps: [
      { title: "Paste the Main Prompt", description: "Antigravity Agent → paste MAIN PROMPT → Send." },
      { title: "Test keyboard navigation", description: "Unplug your mouse → navigate the entire app using only Tab, Enter, Escape, and arrow keys." },
      { title: "Run accessibility audit", description: "Chrome DevTools → Lighthouse → Accessibility → fix any issues found." }
    ] }},
    { type: "VC-05_SUCCESS_CRITERIA", data: { checks: ["Tab navigation works through all interactive elements", "Focus indicators are visible on all focusable elements", "ARIA labels on icons and buttons without text", "Modals trap focus and return focus on close", "Color contrast meets WCAG AA (4.5:1 ratio)"] }},
    { type: "VC-06_UNDER_THE_HOOD", data: { concepts: [
      { term: "Semantic HTML", explanation: "Use <button> for buttons (not <div>), <nav> for navigation, <main> for content. Screen readers use these to help users understand page structure." },
      { term: "ARIA (Accessible Rich Internet Applications)", explanation: "Attributes that give extra context to assistive technology: aria-label, aria-expanded, aria-hidden. Use when HTML semantics aren't enough." },
      { term: "Focus Trap", explanation: "When a modal opens, keyboard focus should be 'trapped' inside it. Tab cycles through modal elements only, not the page behind it." }
    ] }},
    { type: "VC-07_PRO_TIPS", data: { tips: ["Start by replacing <div onClick> with <button> — instant accessibility improvement", "Use 'skip to main content' link as the first focusable element", "Test with a real screen reader (VoiceOver on Mac, NVDA on Windows)", "Run axe DevTools extension for comprehensive accessibility checking"] }},
    { type: "VC-10_CHECKPOINT", data: { items: ["Keyboard navigation works throughout", "Focus indicators visible", "ARIA labels on all icon-only buttons", "Modal focus management works", "Lighthouse accessibility score 90+"] }}
  ]
},

};
