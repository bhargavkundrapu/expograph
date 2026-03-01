# Lesson: Few-Shot Examples — Teach AI by Showing, Not Telling

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M1-L4                          |
| Module     | M1 — Foundations               |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Use 2–3 input-output examples inside a prompt to teach the AI a pattern
- 🎯 Distinguish between zero-shot, one-shot, and few-shot prompting
- 🎯 Add edge-case examples to handle tricky inputs the AI might get wrong

---

<!-- SEC-02 -->
## 💡 Use Case

Few-shot examples are powerful when you need the AI to follow a specific style, tone, or transformation rule — converting informal notes to formal language, formatting data in a custom way, or generating quiz questions that match your professor's style. Instead of explaining the pattern in words, you show it.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Convert this to formal language:
"hey can u send me the report asap thx"
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
"Could you please send me the report as soon as possible? Thank you."
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No examples** — the AI used its own idea of "formal," which may not match what you need.
- **Inconsistent style** — without a reference, the next sentence you convert may come out in a completely different tone.
- **No edge-case handling** — slang, abbreviations, or emojis would be treated unpredictably.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Convert informal messages into formal professional English.
Follow the pattern shown in these examples:

Input: "hey can we meet tmrw to discuss the stuff"
Output: "Dear colleague, could we schedule a meeting tomorrow to
discuss the pending items?"

Input: "yo the server's down again lol fix it pls"
Output: "I would like to report that the server is currently
experiencing downtime. Could the technical team please investigate
and resolve the issue?"

Now convert this:
Input: "hey can u send me the report asap thx"
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Output: "Dear colleague, could you please send me the report at your
earliest convenience? Thank you for your prompt attention to this
matter."
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Convert informal messages into formal professional English.
Follow the pattern shown in these examples:

Input: "hey can we meet tmrw to discuss the stuff"
Output: "Dear colleague, could we schedule a meeting tomorrow to
discuss the pending items?"

Input: "yo the server's down again lol fix it pls"
Output: "I would like to report that the server is currently
experiencing downtime. Could the technical team please investigate?"

Edge case — message with emoji and slang:
Input: "great job on the demo 🔥🔥 u killed it ngl"
Output: "Congratulations on an excellent demonstration. Your
performance was truly impressive."

Now convert this:
Input: "hey can u send me the report asap thx"
```

**What changed:** We added an *edge-case example* that includes emojis and modern slang. This teaches the AI how to handle non-standard inputs gracefully instead of leaving them in or stripping them awkwardly.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Pick a transformation you actually need (e.g., converting bullet notes into full sentences, or rewriting code comments into documentation).
2. Write 2 input-output examples that show the exact style you want.
3. Add a third example for an edge case, then test the prompt on a new input.

**Your task:** Write a few-shot prompt that converts plain English descriptions into SQL `CREATE TABLE` statements. Provide 2 normal examples and 1 edge case where the description mentions a foreign key.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You are building a study-note formatter. You want the AI to convert messy lecture notes into clean flashcard-style Q&A pairs.

Write a few-shot prompt with 3 examples: two straightforward notes and one edge case where the note contains a diagram description that should become a "Describe the diagram" question.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] My prompt includes at least 2 input-output examples before the real input.
- [ ] The examples are consistent in style, tone, and format.
- [ ] I included at least 1 edge-case example for unusual inputs.
- [ ] The final line clearly marks where the AI should start generating.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Showing the AI 2–3 examples is often clearer than writing a paragraph of instructions.
2. Consistent examples lock in the style so every output matches.
3. Edge-case examples prevent the AI from breaking on unusual inputs.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** What is the difference between zero-shot and few-shot prompting?

> **A1:** Zero-shot gives the AI no examples — just the instruction. Few-shot provides 2 or more input-output examples so the AI can learn the pattern before generating.

**Q2:** You provide 3 examples but the AI still changes the format on the 4th input. What should you try?

> **A2:** Add an explicit format instruction (e.g., "Always follow the exact format shown in the examples") or add a 4th example that covers the specific case the AI got wrong.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Don't explain the pattern — show it twice, and the AI will follow it forever.
