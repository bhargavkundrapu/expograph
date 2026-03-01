# Lesson: Technical Interview Practice

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M10-L4                         |
| Module     | M10 — Placement Toolkit        |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Generate role-specific coding and theory questions at the right difficulty level
- 🎯 Structure a prompt that simulates a real technical interview round
- 🎯 Add a hint system and time-boxed practice mode for self-study

---

<!-- SEC-02 -->
## 💡 Use Case

Technical interviews test your coding skills, data structure knowledge, and system thinking. Practicing with random online questions wastes time because they may not match your target role or difficulty. Use this prompt technique to generate a focused practice set that matches the exact role, tech stack, and round type you are preparing for.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Give me interview questions.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
1. What is polymorphism?
2. Explain the difference between stack and queue.
3. What is your greatest weakness?
4. How do you handle stress?
5. What is a binary tree?
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No role specified** — the mix of HR and technical questions shows the AI is guessing.
- **No difficulty level** — the questions range from trivial to irrelevant.
- **No tech stack** — a React developer and a Java backend developer need completely different questions.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Generate a set of technical interview questions for me to
practice.
Context: I am preparing for a Junior Backend Developer interview.
The company uses Python, Django, PostgreSQL, and REST APIs. The
interview has two rounds: one theory round and one coding round.
Constraints:
  - 5 theory questions (short-answer style)
  - 3 coding questions (problem statement only, no solutions)
  - Difficulty: start easy, end medium
  - No HR or behavioral questions
Format: Two separate numbered lists with labels:
  1. Theory Round
  2. Coding Round
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Theory Round:
1. What is the difference between a list and a tuple in Python?
2. Explain how Django's ORM maps models to database tables.
3. What are HTTP status codes 200, 404, and 500? When does each occur?
4. How does indexing improve query performance in PostgreSQL?
5. Describe the difference between authentication and authorization
   in a REST API.

Coding Round:
1. Write a function that takes a list of integers and returns the
   two numbers that add up to a given target. (Easy)
2. Build a Django API endpoint that accepts a JSON payload with
   "title" and "body," saves it to a Post model, and returns the
   created object with a 201 status. (Medium)
3. Given a PostgreSQL table "orders" with columns (id, customer_id,
   amount, created_at), write a query to find the top 3 customers by
   total order amount in the last 30 days. (Medium)
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Generate technical interview questions with a built-in hint
system and time-boxed practice mode.
Context: I am preparing for a Junior Backend Developer interview.
Stack: Python, Django, PostgreSQL, REST APIs. Two rounds: theory and
coding.
Constraints:
  - 5 theory questions, 3 coding questions
  - Difficulty: easy → medium progression
  - No HR questions
Format: For each question, include:
  1. The question
  2. Difficulty tag (Easy / Medium)
  3. Time limit (e.g., "2 min" for theory, "15 min" for coding)
  4. One hint (a nudge, not the answer)
Present as two tables: Theory Round and Coding Round.
Columns: # | Question | Difficulty | Time | Hint
```

**What changed:** We added a hint system and time limits. Each question now comes with a difficulty tag, a suggested time box, and one hint you can reveal if you get stuck. This turns a question list into a structured self-study session.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Decide your target role and tech stack (e.g., "Frontend Developer — React, TypeScript, CSS").
2. Pick the interview round type you want to practice (theory, coding, or system design).
3. Build a prompt using the Good Prompt structure. Include difficulty progression and ask for at least 5 questions.

**Your task:** Generate a practice set of 5 theory + 3 coding questions for your target role. Check that the difficulty progresses from easy to medium.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend is interviewing for a Data Analyst role. The company uses SQL, Python, Excel, and Tableau. The interview has one SQL round and one case-study round.

Write a prompt that generates 4 SQL questions and 2 case-study questions with difficulty tags, time limits, and hints in table format. Run it and check that the progression makes sense.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I understand how to tailor interview questions by role, stack, and round type.
- [ ] I can write a prompt that generates questions with difficulty progression.
- [ ] I tried the guided practice for my own target role.
- [ ] I completed the challenge and reviewed the hint system output.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Specifying role, tech stack, and round type produces focused questions instead of a random mix.
2. Difficulty progression (easy to medium) builds confidence and mirrors real interview structure.
3. Adding hints and time limits turns a question list into a complete self-practice session.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You generate coding questions but they are all too easy. Which part of your prompt should you change?

- A) The context section
- B) The difficulty constraint
- C) The format section

> **A1:** B — tweak the difficulty constraint. Ask for "medium to hard" or specify "no questions below medium difficulty."

**Q2:** Why is adding a time limit to each question useful for practice?

> **A2:** Real interviews are timed. Practicing with time limits trains you to solve problems under pressure and manage your time across questions.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Random practice is noise — tell the AI your role, stack, and difficulty level, and it becomes your personal interview coach.
