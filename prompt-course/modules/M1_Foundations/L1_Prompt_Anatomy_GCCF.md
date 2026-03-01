# Lesson: Prompt Anatomy — The GCCF Framework

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M1-L1                          |
| Module     | M1 — Foundations               |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Break any prompt into the four GCCF components: Goal, Context, Constraints, Format
- 🎯 Rewrite a vague prompt into a structured one using GCCF
- 🎯 Evaluate whether a prompt is missing one or more GCCF elements

---

<!-- SEC-02 -->
## 💡 Use Case

Use GCCF every time you ask an AI for help — whether you are studying for exams, writing project documentation, preparing for a placement interview, or debugging code. A structured prompt saves you from getting generic answers you cannot use.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Tell me about machine learning.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Machine learning is a subset of artificial intelligence that focuses on
building systems that learn from data. There are three main types:
supervised learning, unsupervised learning, and reinforcement learning.
It is used in many industries such as healthcare, finance, and
transportation.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No goal** — the AI does not know if you want a definition, a tutorial, or a comparison.
- **No context** — it has no idea about your background or why you need this.
- **No format** — you got a wall of text instead of something you can actually study from.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Explain the core ideas of machine learning in simple terms.
Context: I am a second-year computer science student preparing for my
mid-semester exam.
Constraints: Keep it under 200 words. Avoid heavy math.
Format: Use a numbered list with one sentence per point.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
1. Machine learning lets computers find patterns in data without being
   explicitly programmed for every scenario.
2. Supervised learning uses labelled examples — like showing the model
   1,000 photos tagged "cat" or "dog" so it learns to classify new ones.
3. Unsupervised learning finds hidden groups in data with no labels,
   such as clustering customers by purchase behaviour.
4. Reinforcement learning trains an agent by rewarding good actions and
   penalising bad ones, similar to teaching a dog with treats.
5. Common real-world uses include spam filters, recommendation engines,
   and medical image diagnosis.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Explain the core ideas of machine learning in simple terms.
Context: I am a second-year CS student preparing for my mid-semester exam.
Constraints: Under 200 words. No heavy math. Use analogies a student
would relate to.
Format: Numbered list, one sentence per point.
Persona: You are a friendly senior student who just aced this course.
Examples: When explaining supervised learning, compare it to studying
with a solved question paper.
```

**What changed:** We added a *Persona* (friendly senior student) and an *Examples* instruction. This gives the AI a tone and a concrete analogy style to follow, making the output more relatable and memorable.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Pick a topic from your current syllabus (e.g., "sorting algorithms").
2. Write a prompt that fills in all four GCCF slots for that topic.
3. Paste it into an AI tool and compare the output with what you would get from just typing the topic name.

**Your task:** Write a GCCF prompt asking the AI to explain *recursion* to a first-year student in under 150 words using bullet points.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend asks the AI "What is cloud computing?" and gets a long, confusing answer full of jargon.

Rewrite their prompt using GCCF so the output is a short, jargon-free explanation formatted as a 5-point numbered list suitable for a non-technical presentation.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] My prompt states a clear **Goal** (what I want the AI to produce).
- [ ] I provided **Context** (who I am, why I need this).
- [ ] I set **Constraints** (length, complexity, what to avoid).
- [ ] I specified a **Format** (list, table, paragraph, code block).

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Every strong prompt has four layers: Goal, Context, Constraints, and Format.
2. Missing even one layer leads to vague, unusable output.
3. Adding persona and examples on top of GCCF makes the response even sharper.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You write a prompt with a clear goal and format but no context. What is the most likely problem with the AI's response?

> **A1:** The response will be generic because the AI does not know your background, level, or purpose — so it cannot tailor the depth or tone.

**Q2:** Which GCCF element would you adjust to change the AI's reply from a paragraph to a table?

> **A2:** **Format** — it controls the structure and layout of the output.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> A prompt without structure is a question without direction — use GCCF to give the AI a map before it starts walking.
