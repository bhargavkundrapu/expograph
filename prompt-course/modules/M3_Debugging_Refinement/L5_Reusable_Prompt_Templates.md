# 🧩 Lesson: Reusable Prompt Templates

## SEC-00 · Lesson ID

| Field | Value |
|-------|-------|
| Lesson ID | M3-L5 |
| Module | M3 — Debugging and Refinement |
| Difficulty | Intermediate |
| Time | 10–15 minutes |

---

## SEC-01 · 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Build prompt templates with `[VARIABLE]` placeholders that you can reuse across tasks
- 🎯 Identify which parts of a prompt are fixed (structure) and which are variable (content)
- 🎯 Organize templates into a personal library categorized by use case

---

## SEC-02 · Use Case

You keep writing similar prompts from scratch — one for summarizing, another for explaining concepts, another for debugging code. Each time you start with a blank page and reinvent the structure.

Templates fix this. Once you build a good prompt, you extract the reusable skeleton and swap in new content using placeholders. This saves time in study sessions (swap topics), coding (swap error messages), project work (swap requirements), and placements (swap interview questions). Think of templates as functions — write once, call many times.

---

## SEC-03 · ❌ Bad Prompt

```
Explain binary search to me. Make it simple with an example.
```

*(Next day, different topic:)*

```
Can you explain how hash tables work? I need a simple explanation with maybe an example.
```

*(Next day:)*

```
I want to understand recursion. Explain simply, give example.
```

---

## SEC-04 · Bad Output

```
[Each prompt produces inconsistent outputs:
- Binary search explanation: 200 words, one example, no complexity analysis
- Hash tables explanation: 400 words, two examples, includes complexity
- Recursion explanation: 150 words, no example despite asking for one

Different structures, different depths, different quality — because each
prompt was written from scratch with slightly different wording.]
```

---

## SEC-05 · Why It Failed

- **Reinventing the wheel** — Each prompt was written from scratch even though they all ask for the same thing: explain a CS concept simply with an example.
- **Inconsistent wording** — Small wording differences ("Make it simple" vs. "Explain simply" vs. "I need a simple explanation") led to inconsistent output quality.
- **No structure guarantee** — Without a fixed template, some outputs included complexity analysis and some didn't, some had examples and some didn't.

---

## SEC-06 · ✅ Good Prompt

```
Explain [TOPIC] in simple terms for a computer science student.

Structure your answer as:
1. One-sentence definition
2. How it works (3-4 sentences, no jargon)
3. A practical example with step-by-step walkthrough
4. Time complexity (Big O) in one line
5. One common mistake beginners make
```

**Used with `[TOPIC] = binary search`:**

```
Explain binary search in simple terms for a computer science student.

Structure your answer as:
1. One-sentence definition
2. How it works (3-4 sentences, no jargon)
3. A practical example with step-by-step walkthrough
4. Time complexity (Big O) in one line
5. One common mistake beginners make
```

---

## SEC-07 · Good Output

```
1. DEFINITION: Binary search is an algorithm that finds a target value in a
   sorted list by repeatedly cutting the search area in half.

2. HOW IT WORKS: Start with the middle element. If it matches the target,
   you're done. If the target is smaller, search the left half. If larger,
   search the right half. Repeat until found or the search area is empty.

3. EXAMPLE: Searching for 7 in [1, 3, 5, 7, 9, 11]:
   - Step 1: Middle = 5. Target 7 > 5, search right half [7, 9, 11]
   - Step 2: Middle = 9. Target 7 < 9, search left half [7]
   - Step 3: Middle = 7. Found!

4. TIME COMPLEXITY: O(log n) — halving the list each step.

5. COMMON MISTAKE: Using binary search on an unsorted list. It only works
   on sorted data.
```

---

## SEC-08 · 🚀 Upgrade Prompt

Build a template library with categories.

```
I'm building a prompt template library. Here are my templates:

CATEGORY: Concept Explanation
TEMPLATE ID: T-EXPLAIN-01
---
Explain [TOPIC] in simple terms for a [AUDIENCE].

Structure:
1. One-sentence definition
2. How it works (3-4 sentences, no jargon)
3. Practical example with walkthrough
4. Time/space complexity in one line (if applicable)
5. One common mistake beginners make
---

CATEGORY: Code Debugging
TEMPLATE ID: T-DEBUG-01
---
I have a bug in my [LANGUAGE] code.

Code:
[CODE_BLOCK]

Expected behavior: [EXPECTED]
Actual behavior: [ACTUAL]

Find the bug, explain why it happens, and give the corrected code.
---

CATEGORY: Study Summary
TEMPLATE ID: T-STUDY-01
---
Summarize [TOPIC] for exam revision.

Format:
- Key definition (1 sentence)
- 5 most important points as bullet points (under 15 words each)
- 2 likely exam questions with short answers
- One mnemonic or memory trick
---

Task: Use template T-EXPLAIN-01 with [TOPIC] = "recursion" and
[AUDIENCE] = "first-year CS student".
```

**What changed:** The upgrade organizes multiple templates into a named, categorized library. Each template has an ID so you can reference it quickly (like calling a function). The placeholders are clearly marked, making it obvious what to swap. You can add new templates to this library over time.

---

## SEC-09 · 🧪 Guided Practice

Try this yourself:

1. **Identify a repeated task** — Think of a prompt you've written more than twice (explaining concepts, summarizing, reviewing code, preparing for interviews).
2. **Extract the template** — Take your best version of that prompt and replace the specific content with `[PLACEHOLDER]` variables. Keep the structure and format instructions fixed.
3. **Test with two topics** — Use your template with two different inputs. Check that both outputs have consistent structure and quality.

**Your task:** Create a template for placement interview prep using this skeleton:

```
Answer this [ROLE] interview question: "[QUESTION]"

Structure:
1. Direct answer (2-3 sentences)
2. [fill in more sections]
```

Fill in at least 3 more sections, then test it with two different questions.

---

## SEC-10 · 💡 Challenge

**5-minute challenge:**

Create a mini template library with exactly 3 templates. Each template must:
- Have a category name and template ID
- Include at least 2 `[PLACEHOLDER]` variables
- Have a fixed structure with at least 3 sections

Suggested categories (pick 3):
- Concept Explanation
- Code Review
- Study Notes
- Email Drafting
- Project Planning
- Bug Report

Test one of your templates by filling in the placeholders and sending it to an AI.

---

## SEC-11 · ✅ Checklist

Before moving on, confirm you can do the following:

- [ ] I can identify the fixed parts (structure) vs. variable parts (content) of a prompt
- [ ] I can create a template with clearly named `[PLACEHOLDER]` variables
- [ ] I can reuse one template across multiple topics with consistent output quality
- [ ] I have started a personal template library with at least 2 templates

---

## SEC-12 · 📘 What You Learned

1. **Templates are prompt functions** — Write the structure once, then call it with different inputs. This saves time and guarantees consistent output quality.
2. **Placeholders make prompts modular** — Using `[TOPIC]`, `[AUDIENCE]`, `[LANGUAGE]` and similar variables makes it clear what to change and what to keep.
3. **A template library compounds your skills** — Every good prompt you build becomes a reusable tool. Over time, your library becomes a personal AI toolkit that makes you faster and more consistent.

---

## SEC-13 · ❓ Mini Quiz

**Q1:** What's the difference between a prompt and a prompt template?

**A1:** A prompt is a specific, one-time instruction (e.g., "Explain binary search simply"). A template is a reusable structure with placeholders (e.g., "Explain [TOPIC] simply for [AUDIENCE]"). You turn a template into a prompt by filling in the placeholders.

**Q2:** You have a template that works well for explaining algorithms but produces bad results for explaining databases. What should you do?

**A2:** Create a separate template for database topics. One template doesn't have to cover everything. Your library should have different templates for different categories. The algorithm template might emphasize time complexity and step-by-step examples, while the database template might emphasize schemas, queries, and use cases.

---

## SEC-14 · 💬 One-Line Takeaway

> Write every great prompt as a template — your future self will thank you for the reusable shortcut.
