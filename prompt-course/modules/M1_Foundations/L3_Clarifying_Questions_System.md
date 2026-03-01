# Lesson: The Clarifying Questions System

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M1-L3                          |
| Module     | M1 — Foundations               |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Instruct the AI to ask clarifying questions before it starts answering
- 🎯 Use the question-first pattern to surface requirements you forgot to mention
- 🎯 Customise the clarifying questions to a specific domain (coding, writing, research)

---

<!-- SEC-02 -->
## 💡 Use Case

When you are unsure about your own requirements — picking a project topic, drafting a cover letter, or designing a database schema — the AI can interview you first. This prevents wasted iterations and teaches you to think through requirements before building.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Write me an essay.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Here is an essay on the importance of education:

Education is a fundamental pillar of society. It empowers individuals
to achieve their potential and contributes to economic growth.
Throughout history, access to education has been a key driver of
social progress...
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No topic given** — the AI picked "importance of education" at random.
- **No audience or purpose** — it does not know if this is for a class, a blog, or a scholarship application.
- **No structure preference** — you got a generic five-paragraph style you may not even need.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
I need help writing an essay, but before you start writing, ask me
exactly 5 clarifying questions so you understand what I need. Do not
write anything until I answer all 5 questions.

Questions should cover: topic, audience, word count, tone, and
submission context.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Great — let me ask a few things before I begin:

1. What is the essay topic or subject area?
2. Who is the audience (professor, admissions committee, blog readers)?
3. What is the required or preferred word count?
4. What tone should the essay have (formal, conversational, persuasive)?
5. Is this for a class assignment, a scholarship, or personal use?

Once you answer these, I will draft the essay to match your exact needs.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
I need help writing an essay. Before you start, ask me exactly 5
clarifying questions. Tailor the questions to academic writing
specifically:

- Ask about the citation style (APA, MLA, IEEE).
- Ask about the thesis statement or argument I want to make.
- Ask whether I need an abstract or executive summary.
- Ask about any sources or references I already have.
- Ask about the grading rubric or evaluation criteria.

Do not write anything until I answer all questions.
```

**What changed:** Instead of generic question categories, we gave the AI *domain-specific* question topics. This means the AI's questions will directly match academic writing requirements, saving another round of back-and-forth.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Think of a task you recently asked an AI to do where the first answer missed the mark.
2. Write a prompt that forces the AI to ask you 5 clarifying questions before starting.
3. Answer the questions, then compare the final output with your original attempt.

**Your task:** Write a clarifying-questions prompt for this scenario — you want the AI to help you plan a final-year capstone project, but you have not decided on a domain yet.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You want the AI to help you write a cover letter for a summer internship, but you are not sure which role to target.

Write a prompt that makes the AI ask 5 role-specific clarifying questions (company type, tech stack, your strengths, preferred team size, location preference) before it writes a single word of the cover letter.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] My prompt explicitly tells the AI to ask questions **before** answering.
- [ ] I specified the exact number of questions I want.
- [ ] I guided the AI on what topics the questions should cover.
- [ ] I included "Do not write anything until I answer" to prevent premature output.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. You can flip the conversation — make the AI interview you instead of guessing.
2. Specifying the number and topic of questions keeps the process focused.
3. Domain-specific question prompts surface requirements you would otherwise forget.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** Why is it important to add "Do not write anything until I answer" in a clarifying-questions prompt?

> **A1:** Without that instruction, many AI models will ask the questions and then immediately generate a default answer anyway, defeating the purpose of the clarification step.

**Q2:** You want the AI to help you debug a Python script. Name two domain-specific clarifying questions it should ask before helping.

> **A2:** (1) What Python version and OS are you running? (2) What is the exact error message or traceback you are seeing?

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> The best prompt is sometimes not an answer — it is a set of questions that makes the real answer possible.
