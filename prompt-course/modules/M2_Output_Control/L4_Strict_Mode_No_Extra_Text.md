# SEC-00: Lesson ID

**M2-L4 — Strict Mode: No Extra Text**
- **Module:** M2 – Output Control
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Eliminate preamble, filler, and closing remarks from AI output
- 🎯 Use strict mode instructions to get only the content you requested
- 🎯 Apply the "output nothing except" pattern for machine-readable results

---

# SEC-02: 💡 Use Case

Strict output matters when:

- **Coding:** You need raw code — not "Sure! Here's a function that…" before it
- **Projects:** You're piping AI output into another tool or script that breaks on extra text
- **Studying:** You want just the answer for flashcards, not a mini-lecture around it
- **Placements:** You need a clean, direct answer in a mock interview, not a preamble

Every extra word the AI adds is a word you have to manually delete. Strict mode saves that effort.

---

# SEC-03: ❌ Bad Prompt

```
List 5 sorting algorithms.
```

---

# SEC-04: ❌ Bad Output

```
Sure! Here are 5 popular sorting algorithms that are commonly used
in computer science:

1. Bubble Sort
2. Merge Sort
3. Quick Sort
4. Insertion Sort
5. Heap Sort

These algorithms vary in efficiency and use cases. Bubble Sort is the
simplest but least efficient, while Quick Sort and Merge Sort are
preferred for larger datasets. Let me know if you'd like more details!
```

---

# SEC-05: 🔍 Why It Failed

- **Unwanted intro.** "Sure! Here are 5 popular…" is filler you didn't ask for.
- **Unwanted outro.** The explanation after the list and "Let me know…" is noise.
- **No strictness signal.** The AI's default behavior is to be conversational and helpful, so it wraps your answer in extra text.

---

# SEC-06: ✅ Good Prompt

```
List exactly 5 sorting algorithms.

Rules:
- One per line
- No numbering, no bullet points
- No introduction, no explanation, no closing text
- Output ONLY the algorithm names
```

---

# SEC-07: ✅ Good Output

```
Bubble Sort
Merge Sort
Quick Sort
Insertion Sort
Heap Sort
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Output nothing except a newline-separated list of 5 sorting algorithm names.

Do not include:
- Any text before the list
- Any text after the list
- Numbering, bullets, or punctuation
- Explanations, notes, or sign-offs

Your entire response must be exactly 5 lines, each containing only an algorithm name.
```

**What changed:**
- Opens with "Output nothing except" — a strong strict-mode trigger
- Explicitly lists what to exclude (before-text, after-text, formatting, explanations)
- Defines the exact shape of the response (5 lines, one name per line)
- Leaves zero room for the AI to add anything extra

---

# SEC-09: 🛠️ Guided Practice

Follow these steps:

1. **Start with a basic request.** Ask the AI: "Give me 5 Python built-in data types."
2. **Check the output.** Does it have an intro sentence? A closing remark? Bullet points you didn't want?
3. **Rewrite with strict mode.** Add: "Output nothing except the 5 type names, one per line. No intro, no explanation, no extras."

**Your task:** Compare the two outputs side by side. The strict version should have exactly 5 lines and nothing else.

---

# SEC-10: 🏆 Challenge

**5-minute challenge:**

You are building a script that reads AI output line by line. You need exactly 8 country names (Asian countries only), one per line, no numbering, no extra text whatsoever.

Write a strict-mode prompt that guarantees the AI's entire response is exactly 8 lines of country names. Test it — if there is even one extra character of filler, refine your prompt until it's clean.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I can identify preamble and closing filler in AI output
- [ ] I used at least one strict instruction ("Output nothing except," "No introduction," etc.)
- [ ] My output has zero extra text — only the content I requested
- [ ] I defined the exact format of the response (lines, count, structure)

---

# SEC-12: 📚 What You Learned

1. AI adds conversational filler (intros, outros, "Let me know!") by default — you must explicitly turn it off.
2. The "output nothing except" pattern is the strongest way to enforce strict output.
3. Listing what to exclude is just as important as listing what to include.

---

# SEC-13: ❓ Mini Quiz

**Q1:** Your prompt says "List 10 items" and the AI starts with "Here are 10 items for you:". What single line can you add to stop this?

**A1:** Add "Output nothing except the 10 items." or "No text before or after the list." Either instruction removes the filler intro.

**Q2:** Why is strict mode especially important when AI output feeds into a script or pipeline?

**A2:** Scripts parse output literally. A stray "Sure!" or "Hope this helps!" before or after the data will break parsers, cause errors, or corrupt the data. Strict mode ensures machine-readable output.

---

# SEC-14: 💬 One-Line Takeaway

> The AI will always try to be polite — it's your job to tell it to stop talking and just give the answer.
