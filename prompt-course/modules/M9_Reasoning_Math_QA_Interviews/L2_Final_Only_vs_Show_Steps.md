# Lesson: Final Only vs Show Steps — Controlling Reasoning Visibility

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                                      |
|------------|--------------------------------------------|
| Lesson ID  | M9-L2                                      |
| Module     | M9 — Reasoning, Math, QA & Interviews      |
| Difficulty | Intermediate                               |
| Time       | 10–15 minutes                              |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Tell the AI to give only the final answer with zero explanation
- 🎯 Tell the AI to show full working with labeled steps
- 🎯 Use a conditional mode that picks the right style based on complexity

---

<!-- SEC-02 -->
## 💡 Use Case

Sometimes you need a quick answer — like converting units while coding or checking a formula during a timed exam. Other times you need the full solution path — like studying a proof or reviewing a tricky word problem. This lesson teaches you to control exactly how much reasoning the AI shows, so you get what you need without wasting time.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
What is the capital of France?
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
The capital of France is Paris. Paris is located in the north-central
part of the country along the River Seine. It has been the capital
since the 10th century and is known for landmarks such as the Eiffel
Tower, the Louvre Museum, and Notre-Dame Cathedral. It is also the
political, economic, and cultural centre of France.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **Too much information** — you asked a one-line question and got a paragraph you did not need.
- **No output control** — the AI defaults to being "helpful" by over-explaining.
- **Wastes time** — during rapid-fire study or quizzes, extra text slows you down.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
What is the capital of France?
Show only the final answer. No explanation.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Paris.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
I will ask you questions. Follow these rules:
- If the question is simple (single fact or short calculation),
  give only the final answer. No explanation.
- If the question is complex (multi-step or requires reasoning),
  show full working with each step labeled Step 1, Step 2, etc.

Question: What is the capital of France?
```

**What changed:** We added a conditional mode. The AI now decides on its own whether to show steps or just the answer, based on complexity. This saves you from rewriting the instruction every time.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Open your AI tool. Ask: "What is 12 × 8? Show only the final answer. No explanation."
2. Confirm you get a single number with no extra text.
3. Now ask: "Explain why 0.1 + 0.2 ≠ 0.3 in programming. Show full working with each step labeled."

**Your task:** Write one prompt that uses the conditional mode from the upgrade. Ask two questions inside the same prompt — one simple ("What is 7²?") and one complex ("Why is the sum of angles in a triangle 180°?"). Check that the AI gives a short answer for the first and detailed steps for the second.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You are doing a rapid revision session with 10 flashcard-style questions. You need instant answers for factual questions and full explanations for conceptual ones.

Write a single system-style prompt that sets the conditional mode, then list three questions below it:
1. "What is the boiling point of water in Celsius?" (expect: answer only)
2. "Derive the quadratic formula from ax² + bx + c = 0." (expect: full steps)
3. "Who wrote Romeo and Juliet?" (expect: answer only)

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I can write a prompt that returns only the final answer
- [ ] I can write a prompt that forces labeled step-by-step output
- [ ] I tried the conditional mode and the AI picked the right style
- [ ] I completed the challenge with mixed question types

---

<!-- SEC-12 -->
## 📚 What You Learned

1. "Show only the final answer. No explanation." stops the AI from over-explaining simple questions.
2. "Show full working with each step labeled." gives you a clear reasoning trail for complex problems.
3. A conditional instruction lets the AI switch modes automatically, saving you time across mixed question sets.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You need the AI to answer 50 quick trivia questions with no extra text. Which instruction works best?

- A) "Answer briefly."
- B) "Show only the final answer. No explanation."
- C) "Keep it short."

> **A1:** B — "Show only the final answer. No explanation." is the most precise. Options A and C are vague and the AI may still add extra sentences.

**Q2:** What is the benefit of a conditional mode prompt over writing separate instructions each time?

> **A2:** It saves time. You set the rules once and the AI automatically picks the right level of detail for each question, so you do not need to rewrite instructions per question.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Control the dial — tell the AI when to think out loud and when to just give you the answer.
