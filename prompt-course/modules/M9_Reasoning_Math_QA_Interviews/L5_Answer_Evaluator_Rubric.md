# Lesson: Answer Evaluator & Rubric — Make AI Grade Like a Real Interviewer

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                                      |
|------------|--------------------------------------------|
| Lesson ID  | M9-L5                                      |
| Module     | M9 — Reasoning, Math, QA & Interviews      |
| Difficulty | Intermediate                               |
| Time       | 10–15 minutes                              |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a prompt that makes the AI grade your answer using a clear rubric
- 🎯 Get a score, specific feedback, and improvement suggestions for any answer
- 🎯 Use comparative scoring to see how your answer stacks up against an ideal one

---

<!-- SEC-02 -->
## 💡 Use Case

You practiced an interview question or wrote a long answer for an exam. But who checks it? Friends are busy. Teachers are unavailable. With the right prompt, the AI becomes your evaluator — it reads your answer, scores it against a rubric, and tells you exactly what to fix. Use this for interview prep, exam answers, or any written response you want feedback on.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Is my answer good?

My answer: "Polymorphism means many forms. It is used in Java."
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Your answer is partially correct. Polymorphism does mean "many forms"
and it is indeed used in Java. You could add more detail about the
types of polymorphism, such as compile-time and runtime polymorphism,
to make your answer more complete.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No rubric** — the AI has no criteria to grade against, so it gives vague encouragement.
- **No score** — "partially correct" tells you nothing about where you stand.
- **No structure** — the feedback is a blob of text instead of actionable, categorized points.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
You are a technical interviewer evaluating a candidate's answer.

Question: "Explain polymorphism in object-oriented programming."

My answer: "Polymorphism means many forms. It is used in Java."

Grade my answer using this rubric:
1. Correctness (0-3): Are the facts accurate?
2. Completeness (0-3): Does it cover key aspects (definition,
   types, example)?
3. Clarity (0-3): Is it well-structured and easy to follow?

For each criterion:
- Give a score
- Explain what I got right
- Explain what is missing
- Give the total score out of 9
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
1. Correctness: 2/3
   Right: The definition "many forms" is correct.
   Missing: No mention of compile-time vs runtime polymorphism.

2. Completeness: 1/3
   Right: You identified the language (Java).
   Missing: No types, no example, no mention of method
   overloading or overriding.

3. Clarity: 1/3
   Right: Short and simple.
   Missing: Too brief to demonstrate understanding. Needs
   structure and an example.

Total: 4/9
Tip: Add one example of method overriding to jump to 6/9.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
You are a technical interviewer evaluating a candidate's answer.

Question: "Explain polymorphism in object-oriented programming."

My answer: "Polymorphism means many forms. It is used in Java."

Step 1 — Grade my answer using this rubric:
1. Correctness (0-3): Are the facts accurate?
2. Completeness (0-3): Does it cover key aspects (definition,
   types, example)?
3. Clarity (0-3): Is it well-structured and easy to follow?

For each criterion, give a score and explain what is right
and what is missing.

Step 2 — Write an ideal answer to the same question (under
100 words).

Step 3 — Compare my answer to the ideal answer. Show a table
with columns: Criterion | My Score | Ideal Score | Gap.

Step 4 — Give me 2 specific action items to close the gap.
```

**What changed:** We added comparative scoring. The AI now writes an ideal answer, puts both scores side by side in a table, and gives you targeted action items. You can see exactly where you fall short and what to fix first.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Pick an interview question you recently practiced (e.g., "What is DBMS normalization?").
2. Write your best answer in 3–4 sentences.
3. Use the good prompt template above — paste your question, your answer, and the rubric. Run it and read the scores.

**Your task:** Write a rubric-based evaluation prompt for this question: "What is the difference between a process and a thread?" Use three criteria: Correctness (0-3), Completeness (0-3), Example Quality (0-3). Include your own answer and ask the AI to grade it.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You just practiced a behavioral interview question: "Tell me about a time you worked in a team."

Your answer: "In my third year, I worked on a group project. We divided the work. I did the frontend. We submitted on time."

Write an upgrade prompt that:
- Grades this answer on Relevance (0-3), Depth (0-3), and STAR format usage (0-3)
- Writes an ideal answer for comparison
- Shows a comparison table
- Gives 2 action items to improve

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I can write a rubric with named criteria and point scales
- [ ] The AI gives me a score per criterion with reasons
- [ ] I tried comparative scoring with an ideal answer table
- [ ] I got specific action items to improve my answer

---

<!-- SEC-12 -->
## 📚 What You Learned

1. A rubric with named criteria and point values turns vague feedback into precise, actionable scores.
2. Asking the AI to write an ideal answer lets you compare and see exactly where you fall short.
3. A comparison table plus action items gives you a clear roadmap from your current level to a top-scoring answer.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You ask the AI "Is my answer good?" and get "It's mostly correct." Why is this feedback unhelpful?

- A) The AI is wrong
- B) There is no rubric, so the AI cannot give specific scores or explain what is missing
- C) The answer was actually perfect

> **A1:** B — Without a rubric, the AI has no framework to score against, so it falls back on vague phrases like "mostly correct."

**Q2:** What does comparative scoring add that a simple rubric alone does not?

> **A2:** It shows you the gap between your answer and an ideal one, criterion by criterion. This makes it clear which areas need the most work and what a top answer looks like.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Give the AI a rubric and it stops being a cheerleader — it becomes a coach who shows you exactly where to improve.
