# Lesson: Stepwise Reasoning — Chain-of-Thought Prompting

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                                      |
|------------|--------------------------------------------|
| Lesson ID  | M9-L1                                      |
| Module     | M9 — Reasoning, Math, QA & Interviews      |
| Difficulty | Intermediate                               |
| Time       | 10–15 minutes                              |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Force AI to show its reasoning step by step instead of jumping to an answer
- 🎯 Use chain-of-thought prompting to reduce calculation errors
- 🎯 Add a verification step so the AI checks its own work

---

<!-- SEC-02 -->
## 💡 Use Case

You are solving a math problem for an exam or assignment. You paste it into the AI and get a final number — but no working. You have no idea if it is right, and you cannot learn from it. Chain-of-thought prompting fixes this. It forces the AI to show each step, so you can follow the logic, catch mistakes, and actually understand the solution.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
What is 23% of 847?
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
23% of 847 is 194.81.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No reasoning shown** — the AI jumped straight to the answer. If it made an error, you would never notice.
- **No learning value** — you cannot study from a single number with no working.
- **No verification** — the AI did not double-check itself, so silent mistakes slip through.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Solve this step by step. Show each calculation on a new line.

What is 23% of 847?
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Step 1: Convert the percentage to a decimal.
        23% = 23 / 100 = 0.23

Step 2: Multiply the decimal by the number.
        0.23 × 847 = 194.81

Answer: 23% of 847 is 194.81.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Solve this step by step. Show each calculation on a new line.
After the final answer, verify by working backwards to confirm
the result is correct.

What is 23% of 847?
```

**What changed:** We added a verification step. The AI now checks its own answer by reversing the calculation, which catches errors before you ever see them.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Open your AI tool and type: "Solve step by step: If a shirt costs ₹1,200 and has a 15% discount, what is the final price?"
2. Check that the output shows at least two clear steps (discount amount, then subtraction).
3. Add the verification line: "Verify by adding the discount back to the final price."

**Your task:** Write a step-by-step prompt for this problem: "A train travels 360 km in 4.5 hours. What is its average speed?" Make sure your prompt asks for each calculation on a new line and includes a verification step.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend is preparing for a competitive exam. They need to solve this problem and understand every step:

"A shopkeeper buys 80 items at ₹25 each. He sells 60% of them at ₹35 each and the rest at ₹20 each. What is his total profit or loss?"

Write a chain-of-thought prompt that forces the AI to show the cost, revenue from each group, total revenue, and profit/loss — each on a separate line — with a verification step at the end.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I can write a prompt that forces step-by-step reasoning
- [ ] I understand why "solve step by step" beats a bare question
- [ ] I tried the guided practice and got a multi-step output
- [ ] I added a verification step and saw the AI check its own work

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Adding "solve step by step" makes the AI show its full reasoning chain, reducing hidden errors.
2. Each step should appear on its own line so you can follow and verify the logic.
3. A verification instruction at the end turns the AI into its own proofreader.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** What is the simplest phrase you can add to a math prompt to trigger chain-of-thought reasoning?

- A) "Give me the answer"
- B) "Solve step by step"
- C) "Be accurate"

> **A1:** B — "Solve step by step" tells the AI to show each calculation instead of jumping to the final number.

**Q2:** Why does adding "verify your answer" improve accuracy?

> **A2:** It forces the AI to check its result using a different method (like reversing the calculation), which catches arithmetic mistakes before you see them.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> When you make the AI show its work, you catch its mistakes — and learn the method yourself.
