# 🔍 Lesson: Common Prompt Failure Types

## SEC-00 · Lesson ID

| Field | Value |
|-------|-------|
| Lesson ID | M3-L1 |
| Module | M3 — Debugging and Refinement |
| Difficulty | Intermediate |
| Time | 10–15 minutes |

---

## SEC-01 · 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Identify the 5 most common prompt failure types by name
- 🎯 Diagnose why a prompt produced a bad result using a failure checklist
- 🎯 Categorize any failed prompt into the correct failure type and pick the right fix

---

## SEC-02 · Use Case

You paste a prompt into an AI tool and the output is useless. Maybe it rambles for three paragraphs when you wanted a list. Maybe it invents facts. Maybe it answers a completely different question.

This happens to everyone — in study sessions, coding projects, placement prep, and professional work. The difference between a beginner and an expert is that the expert can look at a bad output, name the failure type in seconds, and know exactly what to fix. This lesson gives you that skill.

---

## SEC-03 · ❌ Bad Prompt

```
Tell me about machine learning.
```

---

## SEC-04 · Bad Output

```
Machine learning is a subset of artificial intelligence that focuses on building
systems that learn from data. It has many applications including natural language
processing, computer vision, recommendation systems, autonomous vehicles, healthcare
diagnostics, financial modeling, fraud detection, robotics, and much more. The field
was pioneered by Arthur Samuel in 1959 and has since grown enormously...
[continues for 12 more paragraphs]
```

---

## SEC-05 · Why It Failed

- **Too vague** — The prompt has no specific angle, scope, or purpose. The AI has no way to know what aspect of ML you care about.
- **No format constraint** — Without a requested format (list, summary, table), the AI defaults to a sprawling essay.
- **No length limit** — The AI generates as much as it can because nothing told it to stop.

These map to three of the five common failure types: **Too Vague**, **Wrong Format**, and **Too Long**.

---

## SEC-06 · ✅ Good Prompt

```
I got a bad AI response about machine learning. Help me diagnose it.

The prompt was: "Tell me about machine learning."
The output was a 15-paragraph essay covering everything from history to applications.

Classify this failure using these 5 categories:
1. Too Vague — prompt lacks specifics
2. Wrong Format — output structure doesn't match need
3. Hallucination — output contains made-up facts
4. Too Long — output exceeds useful length
5. Off-Topic — output doesn't address the actual question

Then suggest a one-line fix for each failure type you identify.
```

---

## SEC-07 · Good Output

```
Failure diagnosis for "Tell me about machine learning":

Failure types detected:
1. Too Vague — The prompt gives no specific angle (e.g., definition, comparison,
   use case). Fix: Add a specific question like "Explain how supervised learning
   differs from unsupervised learning."
2. Wrong Format — No format was requested, so the AI defaulted to an essay.
   Fix: Add "Answer in a 5-item bullet list."
3. Too Long — No length constraint led to 15 paragraphs.
   Fix: Add "Keep your answer under 100 words."

Not detected: Hallucination, Off-Topic (the response was about ML, just too broad).
```

---

## SEC-08 · 🚀 Upgrade Prompt

```
You are a prompt debugging assistant. I will paste a failed prompt and its output.

Failed prompt: "Tell me about machine learning."
Failed output: [15-paragraph essay covering history, types, and applications]

Step 1: Classify the failure using this checklist:
- [ ] Too Vague — prompt lacks who/what/why/how specifics
- [ ] Wrong Format — output structure mismatches user's need
- [ ] Hallucination — output contains unverifiable or false claims
- [ ] Too Long — output significantly exceeds useful length
- [ ] Off-Topic — output drifts from the core question

Step 2: For each checked failure, write the root cause in one sentence.
Step 3: Rewrite the original prompt to fix ALL identified failures.

Format your answer as a table with columns: Failure Type | Detected? | Root Cause | Fix
```

**What changed:** The upgrade turns diagnosis into a systematic checklist with a structured table output. It also asks the AI to rewrite the fixed prompt, closing the loop from diagnosis to solution.

---

## SEC-09 · 🧪 Guided Practice

Try this yourself:

1. **Pick a recent bad output** — Think of a time an AI gave you a useless answer (or use this: prompt "Help me with my project" → AI gives generic project management advice instead of coding help).
2. **Run the 5-type checklist** — Go through each failure type (Too Vague, Wrong Format, Hallucination, Too Long, Off-Topic) and check which ones apply.
3. **Write a diagnosis prompt** — Paste your failed prompt and output into the AI and ask it to classify the failure using the 5 categories, then suggest fixes.

**Your task:** Diagnose the following prompt failure and identify at least 2 failure types:
- Prompt: "Write code for sorting"
- Output: A 200-line Python file implementing 6 different sorting algorithms with no comments.

---

## SEC-10 · 💡 Challenge

**5-minute challenge:**

You are helping a friend who used this prompt for placement prep:

```
Tell me about interviews.
```

The AI responded with a 2000-word essay about the history of job interviews starting from the 1920s.

Your job:
1. Name every failure type that applies (there are at least 3).
2. Write a fixed prompt that would produce a useful answer for placement prep.
3. Predict what a good output would look like in 3–5 lines.

---

## SEC-11 · ✅ Checklist

Before moving on, confirm you can do the following:

- [ ] I can name all 5 prompt failure types from memory
- [ ] I can look at a bad output and identify which failure type(s) caused it
- [ ] I can explain the root cause behind each failure type
- [ ] I can rewrite a failed prompt to fix the identified failures

---

## SEC-12 · 📘 What You Learned

1. **The 5 failure types** — Too Vague, Wrong Format, Hallucination, Too Long, and Off-Topic cover the vast majority of prompt failures.
2. **Diagnosis before fixing** — Naming the failure type first makes fixing it faster and more reliable than random tweaking.
3. **Checklists beat guesswork** — Running through a systematic checklist catches failures you might miss by instinct alone.

---

## SEC-13 · ❓ Mini Quiz

**Q1:** A prompt asks "Explain React" and the AI produces a 3000-word essay covering React, Angular, and Vue. Which failure types apply?

**A1:** Too Vague (no specific aspect of React requested), Too Long (3000 words with no length limit), and Off-Topic (Angular and Vue were not asked about).

**Q2:** You ask "List 5 benefits of testing" and the AI responds with a numbered list of 5 real benefits. Is this a failure? Why or why not?

**A2:** No failure — the output matches the requested format (list), length (5 items), and topic (benefits of testing). Not every AI response is broken; knowing when the output is fine is also a diagnostic skill.

---

## SEC-14 · 💬 One-Line Takeaway

> Before you fix a prompt, name the failure — diagnosis is half the cure.
