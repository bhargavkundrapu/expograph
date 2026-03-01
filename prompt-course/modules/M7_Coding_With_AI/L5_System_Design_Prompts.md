# Lesson: Plan System Architecture With AI

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                              |
|------------|------------------------------------|
| Lesson ID  | M7-L5                              |
| Module     | M7 — Coding With AI                |
| Difficulty | Intermediate                       |
| Time       | 10–15 minutes                      |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a system design prompt that includes requirements, scale, and constraints
- 🎯 Use the CRAFTED framework to get structured architecture plans from AI
- 🎯 Ask AI for trade-off analysis so you pick the right design, not just the first one

---

<!-- SEC-02 -->
## 💡 Use Case

You are building your final year project and need to decide: monolith or microservices? SQL or NoSQL? REST or WebSockets? These choices shape everything. Or maybe you are preparing for a system design interview and need to practice thinking about scale, trade-offs, and components. AI can help you explore designs fast — but only if you give it real requirements and constraints.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Design a system for me.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Sure! Here's a general system design approach:

1. Identify requirements
2. Choose a database
3. Design the API
4. Plan for scalability
5. Add caching and load balancing

Would you like me to go into detail on any of these steps?
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No system specified** — The AI does not know if you are building a chat app, an e-commerce site, or a file storage service.
- **No requirements or scale** — Without knowing the number of users, data size, or performance needs, the AI gave a textbook outline.
- **No constraints** — The AI does not know your team size, timeline, or tech skills, so it cannot make real recommendations.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Clear objective: Design the backend architecture for a real-time chat
application.

Role: Act as a senior backend architect explaining the design to a
team of 3 student developers.

Added context:
- Expected users: 500 concurrent users (college campus app)
- Features: 1-on-1 chat, group chat (up to 20 people), message
  history, online status
- Team knows: Python, JavaScript, basic SQL
- Timeline: 6 weeks to MVP
- Budget: Free tier services only (no paid infrastructure)

Format: Return these sections:
1. System components (list with one-line descriptions)
2. Tech stack recommendations
3. Data flow diagram (text-based)
4. Database schema (table format)

Task breakdown:
1. Start with the core components needed for real-time messaging
2. Then add supporting components (auth, storage, status)
3. Pick the simplest tech that fits the constraints

Examples: Component description like "WebSocket Server — handles
real-time message delivery between connected clients."

Desired depth: Enough detail to start coding. No theoretical
overviews.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
## Chat App Architecture (Campus MVP)

**System Components:**
1. WebSocket Server — handles real-time message delivery
2. REST API — handles auth, user profiles, chat history
3. Message Queue — buffers messages when recipients are offline
4. Database — stores users, messages, and chat rooms
5. Auth Service — login/signup with JWT tokens

**Tech Stack:**
- Backend: Node.js (Express + Socket.io)
- Database: PostgreSQL (free tier on Supabase)
- Auth: JWT tokens (no third-party service needed)
- Hosting: Railway or Render (free tier)

**Data Flow:**
User A types message → WebSocket Server → check if User B
is online → if yes: deliver instantly → if no: store in DB
→ deliver when User B connects

**Database Schema:**
| Table    | Columns                                    |
|----------|--------------------------------------------|
| users    | id, username, email, password_hash, status |
| rooms    | id, name, type (direct/group), created_at  |
| members  | room_id, user_id, joined_at                |
| messages | id, room_id, sender_id, content, sent_at   |
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Clear objective: Design the backend architecture for a real-time chat
application.

Role: Act as a senior backend architect explaining to student
developers.

Added context:
- 500 concurrent users, college campus app
- Features: 1-on-1 chat, group chat, message history, online status
- Team: Python, JavaScript, basic SQL. 6-week timeline. Free tier
  only.

Format:
1. System components (list)
2. Tech stack recommendations
3. Data flow (text-based)
4. Database schema (table)
5. Trade-off analysis table (see below)

Task breakdown:
1. Design core components
2. Pick tech stack
3. For each major decision, provide a trade-off table:

| Decision           | Option A     | Option B      | Recommendation |
|--------------------|--------------|---------------|----------------|
| Database           | PostgreSQL   | MongoDB       | ...            |
| Real-time protocol | WebSockets   | Server-Sent   | ...            |
| Auth               | JWT          | Session-based | ...            |

4. Explain each recommendation in one sentence

Desired depth: Actionable for coding. Include why you chose each
option, not just what.
```

**What changed:** We added a trade-off analysis table. Instead of one recommendation, AI now compares options and explains why it picked each one. This teaches you to think about design decisions, not just follow a recipe.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

Try this yourself:

1. Pick a system you want to build — a URL shortener, a file sharing app, or a notification service.
2. Write a CRAFTED prompt with specific requirements: user count, features, team skills, timeline, and budget.
3. Check the output: does it have components, tech stack, data flow, and schema? If it is too vague, add more constraints and try again.

**Your task:** Write a CRAFTED system design prompt for a "student attendance tracking system" used by 50 teachers and 2000 students. Include at least: components, tech stack, database schema, and one trade-off analysis.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You are in a system design interview. The interviewer says: "Design a URL shortener like bit.ly."

Your job:
1. Write a CRAFTED prompt that asks AI to design this system.
2. Include: expected scale (10,000 URLs per day), features (shorten, redirect, click stats), and constraints (must handle 1000 redirects per second).
3. Ask for a trade-off table comparing at least 2 database options.
4. Keep the full design to one page.

---

<!-- SEC-11 -->
## ✅ Checklist

Before moving on, confirm:

- [ ] I can write a system design prompt with specific requirements, scale, and constraints
- [ ] I know how to ask for trade-off analysis instead of just one recommendation
- [ ] I can use CRAFTED to get a structured architecture plan from AI
- [ ] I tried the guided practice and got a usable system design

---

<!-- SEC-12 -->
## 📘 What You Learned

1. "Design a system" without requirements gives a textbook outline. Add users, features, team skills, and constraints to get a real architecture.
2. The CRAFTED framework maps perfectly to system design: clear objective (the system), role (architect), added context (requirements), format (components + schema), task breakdown (design steps), examples (component descriptions), desired depth (actionable).
3. Trade-off tables force AI to compare options instead of picking one. This is how real architects think — and how interviewers expect you to answer.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You ask AI to "design a backend" and it suggests Kubernetes, Redis, and Kafka. Your team is 2 students with 4 weeks. What was missing from your prompt?

> **A1:** Constraints — team size, timeline, and skill level. Without those, the AI recommended enterprise-scale tools that are overkill for a student project.

**Q2:** Why is a trade-off table more useful than a single tech recommendation?

> **A2:** A trade-off table shows you the pros and cons of each option. It helps you make an informed decision based on your specific situation instead of blindly following one suggestion.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> A system design prompt without requirements is like a blueprint without measurements — technically a drawing, practically useless.
