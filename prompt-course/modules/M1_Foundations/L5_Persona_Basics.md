# Lesson: Persona Basics — Give the AI a Role

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M1-L5                          |
| Module     | M1 — Foundations               |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Assign a specific persona to the AI (expert, mentor, interviewer, critic)
- 🎯 Understand how personas change the depth, tone, and vocabulary of responses
- 🎯 Combine persona with audience and tone constraints for precise output

---

<!-- SEC-02 -->
## 💡 Use Case

Personas are useful whenever you need a specific perspective. Studying for exams? Make the AI act as a strict professor who quizzes you. Preparing for placements? Turn it into a senior engineer conducting a mock interview. Writing a blog? Make it a tech journalist who writes for beginners. The same question produces very different answers depending on the role you assign.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Explain databases.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
A database is an organized collection of structured information or
data, typically stored electronically in a computer system. Databases
are managed by database management systems (DBMS). Common types
include relational databases, NoSQL databases, and in-memory databases.
They are widely used in web applications, banking, and healthcare.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No persona** — the AI defaulted to a generic textbook tone that is neither engaging nor tailored.
- **No audience** — it does not know if you are a beginner, an intermediate student, or a professional.
- **No depth control** — you got a surface-level overview when you might have needed practical detail.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Act as a senior database engineer with 10 years of experience.
You are explaining databases to a second-year computer science student
who knows basic programming but has never worked with a database.

Explain what a database is, why it matters, and when to choose SQL
over NoSQL. Use simple language and one real-world analogy for each
concept.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Think of a database as a super-organised filing cabinet for your app.

A spreadsheet works fine when you have 50 rows. But when your app has
50,000 users placing orders, you need a system that can find, update,
and protect that data fast. That is what a database does.

SQL databases (like PostgreSQL) are like a library with a strict
cataloguing system — every book has a fixed shelf and category. Use
SQL when your data has clear relationships, like users and their orders.

NoSQL databases (like MongoDB) are like a big box of labelled folders —
flexible, no fixed structure. Use NoSQL when your data shape changes
often, like storing different types of social media posts.

Start with SQL for your course projects. Once you hit a case where the
schema keeps changing, that is your signal to explore NoSQL.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Act as a senior database engineer with 10 years of industry experience.
You are mentoring a second-year CS student who knows basic Python but
has never touched a database.

Persona traits: patient, practical, uses analogies from everyday
student life (hostel, canteen, library).
Tone: conversational but technically accurate.
Audience: someone who learns best through examples, not theory.

Explain what a database is, why it matters, and when to choose SQL
over NoSQL. Include one analogy and one 3-line code snippet for each
concept.
```

**What changed:** We added explicit *persona traits* (patient, practical), a *tone* directive (conversational but accurate), and *audience learning style* (examples over theory). This gives the AI a complete character profile, making the output consistently tailored across follow-up questions too.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Choose a topic you are currently studying.
2. Write a prompt assigning the AI a specific persona (e.g., "Act as a strict CS professor" or "Act as a friendly senior student").
3. Run the prompt, then change only the persona (e.g., switch from professor to interviewer) and compare how the output changes.

**Your task:** Write two versions of a prompt asking the AI to explain "API rate limiting." Version A: persona is a backend engineer mentoring a junior. Version B: persona is a tech interviewer asking you to explain it. Notice the difference in depth and tone.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You have a placement interview next week for a full-stack developer role. You want to practise answering "What is the difference between REST and GraphQL?"

Write a prompt that makes the AI act as a senior interviewer at a product-based company. The interviewer should ask the question, wait for your answer, then give feedback on clarity, depth, and any missing points. Include tone and audience constraints.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I assigned a specific persona with a role and experience level.
- [ ] I defined the audience (who the AI is talking to).
- [ ] I set a tone (formal, friendly, strict, conversational).
- [ ] I included at least one output constraint (analogy, code snippet, example).

---

<!-- SEC-12 -->
## 📚 What You Learned

1. A persona changes what the AI says and how it says it — same question, different role, different answer.
2. Defining persona traits (patient, strict, humorous) gives you control beyond just the role title.
3. Combining persona + tone + audience constraints produces the most consistent and useful outputs.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You assign the persona "Act as a 5-year-old" and ask it to explain quantum computing. What will happen to the output?

> **A1:** The AI will try to use extremely simple words and childlike phrasing. The explanation will lack technical depth, which shows that persona directly controls vocabulary and complexity level.

**Q2:** Why is "Act as an expert" a weak persona instruction?

> **A2:** "Expert" is too generic — expert in what field? With what experience? Talking to whom? A strong persona includes the domain, experience level, and audience (e.g., "Act as a cybersecurity engineer with 8 years of experience explaining to a non-technical manager").

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> The role you give the AI decides the answer you get — choose the persona before you type the question.
