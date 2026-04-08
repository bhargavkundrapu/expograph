# ExpoGraph — Product & Website Master Document

*Generated from repository inspection (`apps/web` primary customer-facing app, `apps/api` backend references). No code was modified. Where the UI or routing is ambiguous or inconsistent, this is called out explicitly.*

---

# 1. Executive Summary

**ExpoGraph** (also styled **ΣxpoGraph** in the public header and **ExpoGraph Academy** in marketing) is an **AI-era skills learning platform** aimed primarily at **Indian students and career builders**. It combines:

- **Structured online courses** in *Vibe Coding*, *Prompt Engineering*, *Prompt to Profit*, and *AI Automations* (the last positioned as a bonus with the “All Pack”).
- A **student LMS** (logged-in “portal”) with **lessons, progress, gamification (XP, streaks, levels)**, **certificates**, **resume builder**, **Real Client Lab** (real project work with mentor review), **Jobs Search Hub** (India-first job search helpers opening external portals), and **Startup LaunchPad** (a guided founder path, gated by pack/course ownership).
- **Mentor** and **Super Admin** consoles for operations, and a **Tenant Admin** (B2B/tenant) area that is largely placeholder in the UI.

**Public-facing promise:** move users from “learning to code” to **building with AI**, with **low price points (₹99 / ₹199 messaging)**, **MCA-recognised company/certificate trust**, and **real portfolio outcomes** (client lab, resume, certificates).

---

# 2. Product Identity

| Dimension | Detail |
|-----------|--------|
| **Product name** | ExpoGraph; Academy positioning as **ExpoGraph Academy**; wordmark **ΣxpoGraph** (sigma suggests math/exponential “e^x” motif — logo assets include `e^x.png`). |
| **Category** | EdTech / LMS + AI skills + career tools; adjacent **enterprise IT solutions** page (`/solutions`) presents a separate B2B services narrative. |
| **Problem framed** | Generic courses are expensive or passive; learners need **build-first**, **AI-native** skills, **affordable** access, **proof** (certificates, real work). |
| **Differentiation (as stated in code)** | **Vibe coding** + **smart prompts**, **Real Client Lab**, **MCA recognition**, **extreme price** (₹99 / ₹199), **Resume Builder**, **Jobs Hub**, **Startup LaunchPad** for founders. |
| **Promise** | “Stop learning to code. Start building with AI.” + career growth via real projects, certificates, and job-search tooling. |

---

# 3. Audience Breakdown

| Audience | What they want | Pain / friction | What the product offers (from UI) |
|----------|----------------|-----------------|-----------------------------------|
| **Students (B.Tech, BCA, MCA, CS, etc.)** | Affordable, job-relevant AI/build skills; certificates; portfolio | High cost elsewhere; passive video courses | ₹99 courses, structured lessons, smart prompts, resume builder, certs |
| **Career switchers / professionals** | Practical skills without long theory | Time | “No filler” narrative in testimonials; short lesson structure |
| **Job seekers (India)** | Faster applications across portals | Repetitive keyword entry | Jobs Search Hub — presets, chips, multi-platform links, local tracking |
| **Aspiring founders** | Ordered steps from idea to launch | Overwhelming generic advice | Startup LaunchPad — stages, readiness, tools (gated) |
| **Colleges / institutions** | Cohort management (implied) | Unclear from student-facing UI | **Super Admin → Colleges** route exists; B2B story not developed on the public academy page |
| **Mentors** | Review work, manage mentees | Tooling | Mentor portal: submissions, client lab, internships, analytics |
| **Admins** | Operate courses, users, events | — | Super Admin: courses, packs, workshops, certificates, client lab, students, mentors |
| **Tenant admins** | Manage their tenant | — | `/lms/admin` — **minimal placeholder copy** (“Tenant Admin Dashboard”) |
| **Enterprise buyers (services)** | Custom software | — | `/solutions` — enterprise IT services narrative (separate from Academy) |
| **Guests** | Explore before buying | — | Academy + courses pricing; login OTP |

---

# 4. Full Route / Page Inventory

*Routes are from `apps/web/src/app/router.jsx`. Nested paths inherit the parent layout unless lesson layout strips chrome.*

## Public & pre-auth

| Route | Page name (source) | Purpose | Audience | Main sections / notes | Key CTAs | Public? |
|-------|-------------------|---------|----------|------------------------|----------|---------|
| `/`, `/academy` | `HomeOrRedirect` → `AcademyPage` | Marketing homepage | All | Hero → learn block → courses → trust → MCA → CTA → LaunchPad → features grid → certification → pricing banner → reviews → Jobs Hub → connect → FAQ → footer | Login / LMS Portal, Explore, Join family, course pricing, social | **Public** |
| `/solutions` | `SolutionsPage` | Enterprise IT services marketing | B2B | Hero, solutions grid, services, stats, FAQ, CTA | Get a Quote (non-linked flow in code — button), Explore Academy | **Public** |
| `/courses` | `CoursesPage` | Pricing & catalog | Buyers | Bento pricing (`PricingWithChart`), footer | Buy / Explore per card, footer legal | **Public** |
| `/courses/explore/:slug` | `CourseExplorePage` | Course exploration | Prospects | (lazy-loaded) | Explore CTAs from pricing | **Public** |
| `/courses/:slug` | `CourseDetailPage` | Course or pack detail | Prospects | API-driven title/description; buy | Buy (modal) | **Public** |
| `/features/:slug` | `FeatureDetailPage` | Feature deep-dives | All | Hero + sections per slug | Login / LMS, related features | **Public** (slug must exist in `featureData`) |
| `/contact` | `ContactPage` | Contact | All | Hero, form → WhatsApp handoff | Submit → WhatsApp | **Public** |
| `/demo/course-sidebar` | `CourseContentsSidebarDemo` | Demo / dev | — | — | — | **Public** |
| `/login` | `LoginPage` | OTP login | Users | Email → OTP | Request OTP, verify | **Public** (wrapped in `PublicOnly` — logged-in users redirected) |
| `/adminlogin` | `AdminLoginPage` | Admin login | Staff | — | — | **Public** |
| `/privacy-policy` | `PrivacyPolicyPage` | Legal | All | — | — | **Public** |
| `/terms-and-conditions` | `TermsConditionsPage` | Legal | All | — | — | **Public** |
| `/account-pending` | `AccountPendingPage` | Post-payment onboarding | Paying users | Success, timing, WhatsApp, login | Go to Login | **Public** |
| `/payment-failure` | `PaymentFailurePage` | Payment error | Users | — | — | **Public** |
| `/not-found`, `*` | `NotFoundPage` | 404 | — | — | — | **Public** |

## Super Admin (`/lms/superadmin/*`) — **Protected: role `SuperAdmin`**

| Route pattern | Purpose (from labels) |
|---------------|----------------------|
| `index` | Home dashboard |
| `approvals`, `feedback` | Approvals queue; feedback |
| `colleges` | College management |
| `students`, `students/*` | Student CRUD / progress |
| `courses`, `course-packs`, `courses/:courseId/*`, lessons create/view/edit | Course builder |
| `workshops`, `workshops/*` | Events / workshops |
| `certificates`, `certificates/*`, `certifications` | Certificates + certification requests |
| `client-lab/*`, `client-lab/real-world/*` | Real Client Lab admin |
| `mentors`, `mentors/*` | Mentor management |

*Many path variants point to the **same lazy components** (e.g. multiple workshop paths → `SuperAdminWorkshops`) — likely in-app tab/state routing.*

## Tenant Admin (`/lms/admin/*`) — **Protected: role `TenantAdmin`**

| Route | Component | Notes |
|-------|-----------|-------|
| `/lms/admin` | `TenantAdminHome` | Placeholder heading only |
| `/lms/admin/settings` | `TenantAdminSettings` | Exists |
| `/lms/admin/users` | `TenantAdminUsers` | Exists |

## Mentor (`/lms/mentor/*`) — **Protected: role `Mentor`**

| Route pattern | Label (sidebar) |
|---------------|-----------------|
| index | Home |
| `students/*` | My Mentees |
| `submissions/*` | Submissions |
| `communications/*` | Messages |
| `calendar/*` | Calendar |
| `analytics/*` | Analytics |
| `client-lab/*` | Real Client Lab |
| `internships/*` | Internships |
| `resources/*` | Resources |
| `settings/*` | Settings |

## Student (`/lms/student/*`) — **Protected: role `Student`**

| Area | Routes (summary) |
|------|-------------------|
| Home | `index` — `StudentHome` |
| Progress | `progress`, `progress/*` |
| Courses | `courses`, `courses/list`, `courses/:courseSlug`, `courses/.../lessons/:lessonSlug` |
| Bonus courses | `bonus-courses/*` (parallel structure) |
| Bookmarks | `bookmarks` |
| Question bank | `question-bank/*` |
| Resume | `resume-builder` |
| Profile | `profile`, `profile/edit`, `profile/settings` |
| Client lab | `client-lab/*` |
| Submissions | `submissions/*` |
| Certificates | `certificates/*` |
| Internships | `internships/*` |
| Events | `events`, `events/:id` |
| Workshops | `workshops/*` |
| Contact | `contact` |
| Referrals | `referrals/*` |

*Note: `StudentLearningPaths` appears as a file in the codebase but **is not registered** in `router.jsx` — treat as **not a live route** unless wired elsewhere.*

## Student — Jobs Hub

| Route | Purpose |
|-------|---------|
| `/lms/jobs` | `StudentJobsPage` → `JobsHub` (light theme shell) |

## Student — Startup LaunchPad

| Route | Screen |
|-------|--------|
| `/lms/startup-launchpad` | `LaunchPadHomeScreen` |
| `readiness`, `dashboard`, `path`, `stage/:stageSlug`, `tools`, `legal`, `profile` | Nested screens under `StartupLaunchPadShell` |
| Access | `LaunchPadAccessGate` — locked until All Pack or all three main courses |

---

# 5. Homepage Deep Breakdown (`/` and `/academy` — `AcademyPage`)

Order is **exact** as rendered.

| # | Section | Purpose | Headline / key copy | CTAs | Communication | Emotional effect | Business purpose |
|---|---------|---------|---------------------|------|----------------|------------------|------------------|
| 1 | **Header** (`Header`) | Global nav | Brand: ΣxpoGraph | Home, Courses, Features (hash), Contact, Login / LMS Portal | Wayfinding | — | Conversion to login or LMS |
| 2 | **Hero** | First impression | Eyebrow: “Prompt Smart. Vibe Code. Grow Your Career.” **H1:** “Stop learning to code.” / “Start building with AI.” Body: master vibe coding, Real Client Lab. Stats in next section not hero — | **Login** or **LMS Portal**, **Explore** (scroll), **Starting at just ₹99** (→ `/courses`) | Build-first AI identity | Empowerment, urgency | Lead to login / pricing |
| 3 | **Learn — HeroSection** (`id="learn"`) | Value prop | “Where learning meets real-world doing” | **Join the Family** → `/courses`, **Connect with us** → `#connect` | Three courses + Real Client Lab + ₹99 | Aspirational | Conversion |
| 4 | **Course cards** (`id="courses"`) | Product SKUs | From `AcademyCourseCardsSection` | — | Catalog | — | Sales |
| 5 | **Built for the real world** | Trust | “Designed by top techies and IITians” | — | Quality signal | Credibility | Justify quality at low price |
| 6 | **Officially Recognised** | Trust | “Officially Recognised” + MCA logo | — | Government/regulatory credibility | Safety | Reduce payment anxiety |
| 7 | **CTA — CallToAction1** (`id="cta"`) | Mid-page conversion | “Join 2K+ users who are Vibing”; “Unlock your next big opportunity.”; ₹99 / ₹199 pills | Primary visible button: **Real Client Lab** → `/features/real-client-lab` | Social proof (2K+) | Belonging | Feature education |
| 8 | **Startup LaunchPad** (`id="startup-launchpad"`) | Founder product | “Startup LaunchPad”; “Your startup path, in the right order”; badge **All Pack or all three main courses** | Open LaunchPad / Login; See how it works; View All Pack | Founder journey + gating | Ambition | Upsell pack |
| 9 | **Features grid** (`id="features"`) | Capability overview | “Everything you need to succeed” | Links to `/features/{slug}` | Full toolkit | Confidence | Education + SEO |
| 10 | **Certification** (`id="certification"`) | Certificates | “Earn certificates that matter” | — | MCA + PDF + LinkedIn | Pride | Trust + completion |
| 11 | **Pricing advantage** | Price comparison | “Premium learning. Unbeatable price.”; compares to ₹5k–₹50k platforms | ₹99 / ₹199 tiles → `/courses` | Value framing | Relief | Conversion |
| 12 | **Reviews** (`id="reviews"`) | Social proof | “2,000+ users are already building with us” | **Start Learning for ₹99** | Marquee testimonials | FOMO + trust | Conversion |
| 13 | **Jobs Search Hub** (`id="jobs-hub"`) | LMS feature promo | “Jobs Search Hub — your India-first career command center” | Open Jobs Hub / Login / Get a course | Practical job search | Control | LMS adoption |
| 14 | **Connect** (`id="connect"`) | Community | “Join the vibe”; Instagram, YouTube, LinkedIn | Social links | Belonging | — | Audience building |
| 15 | **FAQ** (`id="faqs"`) | Objection handling | “We've got answers” | Accordion | Explains product, pricing, MCA, community | Reassurance | Reduce support load |
| 16 | **Footer** | Brand + legal | “ExpoGraph flow”; interactive WebGL | Privacy, Terms | Playful tech brand | — | Legal compliance |

---

# 6. Public Website Messaging Bank

**Hero & core**

- “Prompt Smart. Vibe Code. Grow Your Career.”
- “Stop learning to code. Start building with AI.”
- “Master vibe coding with smart prompts, structured lessons, and build for real clients in our Real Client Lab—the fastest way to grow your career.”

**Courses & skills**

- Vibe Coding, Prompt Engineering, Prompt to Profit, AI Automations (bonus with All Pack in multiple places)
- “Smart Prompts” — structured, copy-ready prompts
- “You don't just watch—you build.”

**Pricing**

- “Starting at just ₹99” / “Courses from ₹99 | Packs from ₹199”
- “Less than the price of a coffee-real skills, real projects, real career growth.”

**Trust**

- “Recognised by MCA · Ministry of Corporate Affairs · Government of India”
- “Designed by top techies and IITians”
- “2K” active users / “100+” tutors (HeroSection stats)
- “2,000+ users are already building with us”

**Jobs Hub**

- “India-first career command center”
- “B.Tech role presets, editable keyword chips, one-tap searches on LinkedIn, Naukri, Indeed, Internshala & more”
- “Saved searches and apply tracking stay on your device — no scraping, no extra server cost.”

**Startup LaunchPad**

- “Your startup path, in the right order”
- “A guided founder journey from idea to MVP, launch, legal setup, and growth—inside the student portal.”
- “12-stage path with unlocks”; “Startup Readiness Check”; “Founder tools & legal timing guidance”

**Feature grid (short labels)**

- Smart Prompt Library, Resume Builder, Real Client Lab, Learning Portal, Structured Lessons, Jobs Search Hub, Startup LaunchPad (tags: Learn 10x Faster, Get Hired, Real Experience, etc.)

**Solutions page (separate B2B)**

- “Enterprise IT Solutions That Drive Business Growth”
- “Trusted by 500+ Companies”
- Stats: 500+ projects, 98% satisfaction, 50+ enterprise, 15+ years — *presentational only in static copy*

---

# 7. LMS Portal Deep Breakdown

## How a student enters

1. **Login** (`/login`): Email → OTP (6 digits) → redirect to `homePathForRole` → **`/lms/student`** for students.
2. Optional query: `?purchased=1` on login page (post-purchase messaging path exists in code).
3. **Account pending** (`/account-pending`): Post-payment “account will be created” with WhatsApp support.

## First screen (`StudentHome`)

- **Dashboard** with **gamification** (streak, XP, level, weekly goal), **completion meter**, **schedule / remaining lessons** timeline, **Continue** flows, **Events** widget, **Workshop carousel**, **home carousel** (`getHomeCarouselSlides`) with **pack upsell** or **pack completion** messaging.
- Dynamic slides: e.g. “Upgrade to Pack ₹199”, “Client slots are limited”, “Real Client Lab”, “Certificates”.

## Navigation

**Desktop sidebar** (`StudentLayout`): Home, Courses, Bonus Courses, Real Client Lab, Startup LaunchPad (lock icon if `user.client_lab_checklist.hasAccess === false`), Resume Builder, Jobs Hub, Certificates, Bookmarks, Support.

**Mobile bottom nav:** Home, Courses, Resume (shortcut label), Client Lab, LaunchPad (with lock when gated).

**Top bar (mobile):** Logo, search, theme toggle, profile menu (My Profile, Certificates, Bookmarks, Jobs Hub, Bonus Courses, Support, Logout).

**Lesson pages:** Full layout **without** sidebar/bottom nav — immersive experience.

## Learning flow

- **Courses list** → **course landing** → **lesson** URL pattern: `/lms/student/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug`
- **Bonus courses** mirror structure under `/bonus-courses/...`
- **Progress** area: `/lms/student/progress` with overview/courses/achievements paths (single component).

## Project / client flow

- **Real Client Lab** (`/lms/student/client-lab/...`): projects and tasks — aligns with mentor review narrative on marketing pages.
- Gating: **All Pack** or **three main courses** + completion rules (see `LaunchPadAccessGate` and feature copy).

## Tool flow

- **Resume Builder** (`/lms/student/resume-builder`)
- **Jobs Hub** (`/lms/jobs`) — client-side filters, external URLs
- **Question Bank** — practice routes
- **Startup LaunchPad** — nested screens

## Completion / certification

- **Certificates** (`/lms/student/certificates`) — completion and download narrative on marketing + carousel pack slides.

## Account / profile

- **Profile** (`/lms/student/profile`, edit, settings)
- **Support** (`/lms/student/contact`)
- **Referrals** (`/lms/student/referrals`)

## Other student-facing areas (routes exist; not all in primary sidebar)

- **Submissions**, **Internships**, **Events**, **Workshops** — accessible via dashboard/widgets and direct URLs.

---

# 8. Role-Based Feature Matrix

| Feature / area | Guest | Student | Mentor | TenantAdmin | SuperAdmin |
|----------------|-------|---------|--------|-------------|------------|
| Academy, Courses, Features, Contact | ✓ | ✓ | ✓ | ✓ | ✓ |
| Login | ✓ | ✓ | ✓ | ✓ | ✓ |
| Student LMS | — | ✓ | — | — | — |
| Jobs Hub | — | ✓ | — | — | — |
| Startup LaunchPad | — | ✓ (gated) | — | — | — |
| Mentor portal | — | — | ✓ | — | — |
| Tenant admin | — | — | — | ✓ | — |
| Super admin | — | — | — | — | ✓ |
| Admin login page | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*Exact API permissions are server-side; matrix reflects **route guards** (`RequireRole`) in the SPA.*

---

# 9. Feature Inventory

| Feature | Where it appears | What it does | Who | Problem | Value | Tier |
|---------|------------------|--------------|-----|---------|-------|------|
| **OTP Auth** | `/login` | Email + 6-digit OTP | All users | Password friction | Fast login | Core |
| **Courses & packs** | `/courses`, APIs | Purchase courses/packs | Buyers | Cost | Affordable access | Core |
| **Structured lessons** | Lesson pages | Video + setup + prompts + checkpoints | Students | Confusion | Clear path | Core |
| **Smart Prompt Library** | Lessons + `/features/smart-prompts` | Copy-ready prompts | Students | Slow debugging | Speed | Core |
| **Gamification** | Student home | XP, streak, levels | Students | Engagement | Retention | Secondary |
| **Progress & schedule** | Dashboard, progress routes | Completion %, timeline | Students | Visibility | Next steps | Core |
| **Certificates** | LMS + marketing | PDF, QR/verification messaging | Students | Proof | Employability | Core |
| **Resume Builder** | Sidebar + `/features/resume-builder` | Wizard + PDF | Students | ATS resume | Applications | Core |
| **Real Client Lab** | Sidebar + admin/mentor | Client projects & tasks | Students, mentors, admins | No portfolio | Real work | Core |
| **Jobs Search Hub** | Sidebar + `/features/jobs-search-hub` | Presets, URLs, local storage | Students | Job search friction | Efficiency | High |
| **Startup LaunchPad** | Sidebar + feature page | 12-stage path, readiness, tools | Students (founders) | Chaos | Structure | High (gated) |
| **Workshops & events** | Dashboard, routes | Events listing | Students | Extra learning | Community | Secondary |
| **Internships** | Student + mentor routes | Applications/deliverables | Students, mentors | Experience | Pipeline | Secondary |
| **Submissions** | Student + mentor | Submit/review | Students, mentors | Quality loop | Feedback | Core |
| **Question Bank** | Routes | Practice | Students | Exam prep | Drills | Supporting |
| **Bookmarks** | Sidebar | Saved content | Students | Organization | Review | Supporting |
| **Referrals** | Routes | Referral program | Students | Growth | Rewards | Secondary |
| **Mentor analytics** | Mentor routes | Performance views | Mentors | Oversight | Coaching | Secondary |
| **Super Admin OS** | Many routes | Full platform ops | Staff | Operations | Scale | Core (internal) |
| **Tenant Admin** | `/lms/admin` | Tenant users/settings | B2B tenants | **Unclear — UI placeholder** | **Unclear** | Supporting |

---

# 10. Core Product Flows

1. **Visitor → signup**  
   - Browse Academy → Courses → **Buy** (modal) → payment (off-SPA) → **Account pending** → **Login** with OTP.

2. **Student → dashboard**  
   - OTP login → `/lms/student` → carousel + schedule + progress.

3. **Dashboard → learning**  
   - Continue lesson / schedule click → `/lms/student/courses/.../lessons/...`

4. **Learning → progress**  
   - Lesson completion → progress % → certificates eligibility (100% messaging).

5. **Progress → completion**  
   - Certificates page; certificate request flows (admin `certifications`).

6. **Founder / LaunchPad**  
   - Meet gate (All Pack or 3 courses) → LaunchPad screens → stage unlocks.

7. **Jobs**  
   - Jobs Hub → pick preset/chips → open external platforms → track locally.

8. **Institution / college**  
   - **Super Admin** → Colleges — **workflow not detailed in student-facing copy.**

---

# 11. Pricing / Offer Analysis

**Marketing numbers (static):**

- **₹99** per course (individual)
- **₹199** all-access pack  
- Comparison: “Other platforms charge ₹5,000–₹50,000 for generic tutorials.”

**Dynamic pricing (`PricingWithChart`):**

- Fetches `/api/v1/courses` and `/api/v1/packs` — **actual prices shown in paise** from API.
- **AI Automations** as **BONUS** with All Pack — “Free when you buy All Pack”; “12 modules • 62 lessons” in card copy.
- **PriceCountdown** — 24h-style offer timer (`getOfferEndsAt24h`) on purchasable cards.

**Course slugs (code):** `vibe-coding`, `prompt-engineering`, `prompt-to-profit`, `ai-automations`.

**Upsell mechanics:**

- Student home carousel (NOT_PACK) repeatedly pushes **Pack ₹199** and client lab priority.
- LaunchPad / Real Client Lab gating tied to **All Pack** or **three main courses**.

---

# 12. Trust / Credibility Signals

- **MCA** logo and “Ministry of Corporate Affairs · Government of India”
- **Stats:** 2K users, 100+ tutors (hero secondary section), 2,000+ in reviews (marquee)
- **Testimonials** (named personas — **marketing copy** in code, not verified third-party reviews)
- **IITians / top techies** curriculum line
- **Certificate**: unique ID, LinkedIn, PDF, 100% completion
- **Real Client Lab** — “real clients”, mentor review
- **Solutions page** enterprise stats (500+ companies, etc.) — **separate narrative** from Academy

---

# 13. Tone and Brand Personality

- **Voice:** Direct, energetic, Hinglish-adjacent idiom (“vibe”, “vibing”), **price-aggressive**, **student-first**.
- **Warmth:** High in community section (“Join the vibe”, “family of builders”).
- **Seriousness:** Mixed — playful “vibe” + serious MCA/legal trust.
- **Students:** Peer + coach; **institutions:** barely addressed on Academy (colleges exist in admin only).
- **Overall:** **Product-led** edtech with **startup energy** (LaunchPad, build-first) and **premium visual treatment** (dark, gradients, 3D hero).

---

# 14. Design and UX Character

- **Public site:** Dark, **violet/fuchsia/emerald** accents, **long-scroll** storytelling, **3D/Spline hero** (desktop), **WebGL footer**, **bento** pricing.
- **Student LMS:** **Slate gradient** shell, **sidebar + mobile bottom nav**, **light Jobs Hub** exception.
- **Mentor:** Emerald/teal accent.
- **Super Admin:** Blue/purple gradient nav.
- **Solutions:** Light, corporate **separate** from Academy dark theme.
- **Presentation fit:** Strong **visual deck** for product; **demo-heavy** for LMS.

---

# 15. Strongest Selling Points

**Student-facing**

- Build-first AI skills (Vibe Coding, prompts, automations)
- ₹99 / ₹199 affordability + MCA certificate story
- Real Client Lab + Resume Builder + Jobs Hub
- Startup LaunchPad for founders

**Institution-facing**

- Colleges module in Super Admin — **needs explicit institutional story** (not on Academy page).

**Founder-facing**

- Gated LaunchPad + legal timing + 12-stage path

**Practical differentiators**

- Smart prompts, structured lessons, OTP login, no server-side job scraping

**Emotional differentiators**

- “Vibe”, community, **underdog pricing** vs expensive platforms

---

# 16. Weak / Unclear Messaging Areas

- **Two brands in one repo:** **Academy** (dark, ₹99) vs **Solutions** (enterprise, 500+ companies) — **unclear how they connect** in customer mind.
- **Course naming:** FAQ and some copy use **“AI Automations”** as third pillar; **pricing code** uses **Prompt to Profit** as third course — **consistent strategically but easy to confuse** in pitch.
- **Tenant Admin** is **placeholder** — B2B2C story incomplete.
- **Super Admin home** banners reference **`/lms/superadmin/analytics`** — **route not defined** in `router.jsx` (likely broken CTA).
- **“Get a Quote”** on Solutions hero — **no visible handler** wired to form or mail.
- **Testimonials** are **hardcoded** — not marked as verified reviews.
- **StudentLearningPaths** page exists but **not routed**.
- **Footer** `© 2025` while user date is **2026** — minor consistency.
- **CallToAction1** defines `handleJoin` but **does not render** a button that calls it (only **Real Client Lab** CTA visible).

---

# 17. Presentation-Worthy Content Bank

**Product explanation**

- “Stop learning to code. Start building with AI.”
- “Where learning meets real-world doing.”

**Student transformation**

- “ExpoGraph makes you BUILD.”
- “From zero to building full apps in 8 weeks.” (testimonial line)

**Institution value**

- *Sparse in code — use Super Admin “Colleges” + MCA as a starting point only.*

**Feature explanation**

- Smart Prompt Library one-click copy; Real Client Lab mentor-reviewed; Jobs Hub India-first presets.

**Pricing / value**

- “Premium learning. Unbeatable price.”
- ₹99 / ₹199 vs ₹5k–₹50k comparison (as stated in UI)

**Trust / proof**

- MCA recognition; verifiable certificate ID; 2K+ users (as stated)

**Emotional**

- “Join the vibe”; “Join 2K+ users who are Vibing”

**Founder**

- “Startup control center—not another list of videos to watch.” (feature testimonial line)

---

# 18. Screenshot / Demo Asset Suggestions

| Screen | Why | Proves | Audience |
|--------|-----|--------|----------|
| Academy hero + 3D robot | Visual brand peak | Modern AI product | Students, investors |
| Courses bento pricing | Clear SKUs | Affordable + pack | Everyone |
| Student dashboard | Progress + gamification | Engagement | Students |
| Lesson page with prompts tab | Differentiator | Smart prompts | Students, colleges |
| Real Client Lab project/task | Portfolio story | Real work | Employers, pitch |
| Certificates PDF/QR | Trust | Verification | Parents, HR |
| Jobs Hub (presets + platforms) | India careers | Practical tool | Job seekers |
| LaunchPad stage view | Founder | Gated journey | Founders |
| Super Admin course builder | Operations | Scalable content | Investors |
| MCA section | Trust | Regulatory | Institutions |

---

# 19. Missing Information Needed For a Great Presentation

- **Verified** enrollment, completion, and NPS **metrics** (not in repo as truth)
- **Real** graduate outcomes (salary, placements) — testimonials are **static**
- **Founder story** and **team** — not in code
- **Partnership** details (colleges, employers)
- **Legal** precision of “MCA recognition” (what exactly is recognised — company vs certificate — **seek legal confirmation** before investor deck)
- **Live** screenshots of production vs staging
- **Alignment** narrative between **Solutions** business and **Academy**

---

# 20. Final Summary for Presentation Preparation

**Presentation type:**  
**Product-led** story + **live LMS demo** + **pricing slide** + **trust (MCA)** + optional **founder (LaunchPad)** and **jobs** slides for India audience.

**Audience versions**

- **Students:** Hero + price + outcomes + Real Client Lab + Jobs Hub
- **Investors:** Market, differentiation, unit economics (to be collected), **roadmap**, team
- **Colleges:** **Needs new narrative** — admin only hints
- **Founders:** LaunchPad + gating + pack

**Raw content available**

- Rich Academy copy, feature pages, FAQ, pricing UI, role matrix

**Still to collect**

- Metrics, verified testimonials, team, legal phrasing, institutional pilots, **unify** Enterprise Solutions with Academy

---

# 21. Raw Presentation Input Pack

*Copy for another AI or designer.*

**Product summary**  
ExpoGraph Academy is an affordable AI-skills learning platform (₹99/₹199 positioning) with courses in Vibe Coding, Prompt Engineering, Prompt to Profit, and AI Automations. It includes an LMS with smart prompts, gamification, certificates (MCA trust narrative), Real Client Lab, Resume Builder, Jobs Search Hub (India), and Startup LaunchPad (gated). OTP login. Separate `/solutions` page sells enterprise IT services.

**Audience summary**  
Primary: Indian students and job seekers. Secondary: mentors, founders (LaunchPad), internal admins. Institutions: admin “Colleges” only — weak public story.

**Key selling points**  
Build-first AI; low price; MCA recognition; real client projects; resume + jobs tools; founder path in-product.

**Best copy lines**  
“Stop learning to code. Start building with AI.” | “Where learning meets real-world doing.” | “Premium learning. Unbeatable price.” | “India-first career command center” (Jobs Hub).

**Feature summary**  
Smart prompts, structured lessons, LMS dashboard, certificates, client lab, resume builder, jobs hub, LaunchPad, workshops/events, internships, referrals.

**Trust summary**  
MCA logo, certificate ID, IIT/top techies line, 2K+ user claims, social proof marquees (static copy).

**Pricing summary**  
₹99 per course; ₹199 all-access pack; AI Automations as bonus with pack; API-driven prices in app; countdown offer on course cards.

**Screenshot suggestions**  
Hero, pricing bento, student dashboard, lesson + prompts, client lab, jobs hub, LaunchPad, certificates, super admin courses.

**Missing data checklist**  
Real metrics; verified testimonials; team; legal wording for MCA; institutional deals; alignment between Solutions and Academy; product roadmap.

---

*End of master document.*
