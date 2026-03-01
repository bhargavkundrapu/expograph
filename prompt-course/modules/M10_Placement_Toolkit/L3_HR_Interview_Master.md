# Lesson: HR Interview Master

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M10-L3                         |
| Module     | M10 — Placement Toolkit        |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Prepare structured answers for HR interview questions using the STAR format (Situation, Task, Action, Result)
- 🎯 Write a prompt that turns your raw experience into a polished interview answer
- 🎯 Generate likely follow-up questions so you are never caught off guard

---

<!-- SEC-02 -->
## 💡 Use Case

HR rounds test your communication, teamwork, and problem-solving — not your code. Most students ramble because they have no structure. STAR gives you a four-part framework: describe the **Situation**, explain the **Task**, detail the **Action** you took, and share the **Result**. Use this prompt technique the night before any HR interview to prepare 4–5 solid answers.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
How to answer "tell me about yourself" in an interview?
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Start with a brief introduction. Mention your education and skills.
Talk about your hobbies and interests. Keep it under 2 minutes.
Show enthusiasm for the role. End by saying why you're a good fit.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No personal details** — the AI has nothing about you, so it gives textbook advice anyone could find online.
- **No structure requested** — you got a tip list instead of an actual rehearsable answer.
- **No role context** — the answer is not tailored to any specific position.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Write a STAR-format answer for the HR question "Tell me about a
time you solved a difficult problem."
Context: I am a final-year CS student interviewing for a Junior
Software Developer role. During my third-year mini project, our team's
database kept crashing under load. I profiled the queries, found
3 unindexed tables, added indexes, and reduced response time from
8 seconds to 1.2 seconds. The project scored top marks.
Constraints: Keep the answer under 150 words. Use simple language I
can speak aloud naturally.
Format: Use the STAR structure with clear labels:
  - Situation (2 sentences)
  - Task (1 sentence)
  - Action (2–3 sentences)
  - Result (1–2 sentences)
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Situation: During my third-year mini project, our team built a web app
that started crashing whenever more than 20 users accessed it at once.
The demo was two weeks away.

Task: I needed to find the root cause and fix the performance issue
before the deadline.

Action: I profiled the database queries and discovered three tables
had no indexes. I added composite indexes on the most-queried columns
and rewrote two slow joins. I also set up a simple load test to verify
the fix.

Result: Response time dropped from 8 seconds to 1.2 seconds. The app
handled 100 concurrent users smoothly, and our project scored the
highest marks in the batch.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Write a STAR-format answer for "Tell me about a time you solved
a difficult problem" AND list 3 follow-up questions the interviewer
might ask with suggested short answers.
Context: I am a final-year CS student interviewing for a Junior
Software Developer role. During my third-year mini project, our team's
database kept crashing under load. I profiled the queries, found
3 unindexed tables, added indexes, and reduced response time from
8 seconds to 1.2 seconds. The project scored top marks.
Constraints: Main answer under 150 words. Each follow-up answer under
40 words. Conversational tone.
Format:
  1. STAR answer with labelled sections
  2. Follow-up questions table: Question | Suggested Answer
```

**What changed:** We added follow-up question preparation. Interviewers often dig deeper with questions like "What would you do differently?" Now you are ready for those too.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Pick one common HR question: "Tell me about a time you worked in a team" or "Describe a time you failed."
2. Write down your real experience in 3–4 raw sentences. No polish needed.
3. Build a prompt using the Good Prompt structure. Feed your raw experience and ask for a STAR-format answer.

**Your task:** Generate a STAR answer for "Tell me about a time you worked in a team" using your own real experience. Read it aloud to check if it sounds natural.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend has an HR interview tomorrow. They have this raw experience: "In our college hackathon, the frontend guy dropped out last minute. I had never used React but I learned enough in one night to build the UI. We won second place."

Write a prompt that turns this into a STAR answer with 3 follow-up questions. Run it and check if the answer is under 150 words and sounds natural when spoken aloud.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I understand the STAR format: Situation, Task, Action, Result.
- [ ] I can write a prompt that converts raw experience into a structured interview answer.
- [ ] I tried the guided practice with my own real experience.
- [ ] I completed the challenge and checked the follow-up questions.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. STAR (Situation, Task, Action, Result) turns rambling stories into clear, impressive interview answers.
2. Feeding the AI your raw experience produces a personalized answer — not a generic template.
3. Asking for follow-up questions in the same prompt prepares you for the interviewer's next move.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** What does the "A" in STAR stand for, and why is it the most important part?

- A) Assessment — it shows your analytical thinking
- B) Action — it shows what you specifically did to solve the problem
- C) Achievement — it shows the final outcome

> **A1:** B — Action is where you prove your contribution. Interviewers want to hear what *you* did, not just what happened.

**Q2:** You give the AI a STAR prompt but forget to include your personal experience. What happens?

> **A2:** The AI invents a generic story that is not yours. Interviewers will notice if you cannot add details when they follow up.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> An interview answer without STAR is a story without a punchline — give the AI your real experience and let it build the structure.
