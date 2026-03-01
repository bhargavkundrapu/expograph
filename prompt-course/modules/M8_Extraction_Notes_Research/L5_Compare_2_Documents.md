# SEC-00: Lesson ID

**M8-L5 — Compare 2 Documents**
- **Module:** M8 – Extraction, Notes & Research
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Write prompts that compare two texts using specific, named criteria
- 🎯 Get comparison results in a structured table format instead of vague prose
- 🎯 Add a verdict or recommendation row that tells you which text is stronger

---

# SEC-02: 💡 Use Case

You have two documents and need to spot what's different, what's similar, and which one is better.

- **Studying:** Compare two research papers on the same topic to find gaps and overlaps
- **Projects:** Compare your project proposal draft against a competitor's or a previous version
- **Placements:** Compare two job offer letters side by side — salary, benefits, role, growth

Reading both documents and mentally tracking differences is slow. A structured comparison table does it instantly.

---

# SEC-03: ❌ Bad Prompt

```
Compare these two:

Text A: Python is a high-level, interpreted language known for its
readability. It supports multiple paradigms including OOP and
functional programming. Python has a vast ecosystem with packages like
NumPy, Pandas, and Django. It is slower than compiled languages but
ideal for rapid prototyping and data science.

Text B: Rust is a systems programming language focused on safety and
performance. It has a steep learning curve but prevents memory errors
at compile time. Rust is used in operating systems, game engines, and
WebAssembly. It is faster than most languages but has a smaller
ecosystem.
```

---

# SEC-04: ❌ Bad Output

```
Python and Rust are both popular programming languages but serve
different purposes. Python is easier to learn and has more libraries,
while Rust is faster and safer. Python is better for data science and
web development, whereas Rust excels in systems programming. Both
support multiple paradigms. Overall, the choice depends on your needs.
```

---

# SEC-05: 🔍 Why It Failed

- **No comparison criteria.** The AI picked random points to compare instead of a consistent set of criteria.
- **No output format.** You got a paragraph instead of a structured comparison you can scan.
- **No verdict.** "The choice depends on your needs" is vague and unhelpful. You wanted a recommendation.

---

# SEC-06: ✅ Good Prompt

```
Compare Text A and Text B in a markdown table.

Comparison criteria (one row per criterion):
1. Learning Curve
2. Performance
3. Ecosystem Size
4. Primary Use Cases
5. Memory Safety

Columns: Criterion | Text A (Python) | Text B (Rust) | Key Difference

After the table, add a one-sentence summary of which text
describes a better language for a beginner and why.

Text A:
Python is a high-level, interpreted language known for its
readability. It supports multiple paradigms including OOP and
functional programming. Python has a vast ecosystem with packages like
NumPy, Pandas, and Django. It is slower than compiled languages but
ideal for rapid prototyping and data science.

Text B:
Rust is a systems programming language focused on safety and
performance. It has a steep learning curve but prevents memory errors
at compile time. Rust is used in operating systems, game engines, and
WebAssembly. It is faster than most languages but has a smaller
ecosystem.
```

---

# SEC-07: ✅ Good Output

```
| Criterion        | Text A (Python)           | Text B (Rust)               | Key Difference                   |
|------------------|---------------------------|-----------------------------|----------------------------------|
| Learning Curve   | Easy, readable syntax     | Steep, complex ownership    | Python is much easier to start   |
| Performance      | Slower (interpreted)      | Fast (compiled, zero-cost)  | Rust is significantly faster     |
| Ecosystem Size   | Vast (NumPy, Django, etc) | Smaller but growing         | Python has far more packages     |
| Primary Use Cases| Data science, web, scripts| OS, game engines, WebAssembly| Different domains entirely      |
| Memory Safety    | Not a focus (GC-based)    | Compile-time guarantees     | Rust prevents memory bugs early  |

**Verdict:** For a beginner, Python is the better choice because its
easy syntax and massive ecosystem let you build projects quickly
without fighting the language.
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Compare Text A and Text B in a markdown table.

Comparison criteria (one row per criterion):
1. Learning Curve
2. Performance
3. Ecosystem Size
4. Primary Use Cases
5. Memory Safety

Columns: Criterion | Text A (Python) | Text B (Rust) | Winner | Key Difference

Row rules:
- The "Winner" column must say "A", "B", or "Tie" for each row
- Bold the winner's cell in each row

After the table, add:
1. **Score:** Count how many rows each text won (e.g., "A: 3, B: 2")
2. **Recommendation:** One sentence recommending which is better
   for the given context
3. **Caveat:** One sentence noting when the other would be the
   better choice

Context: I am a second-year CS student choosing a language for a
side project in web development.

Text A:
[paste Text A]

Text B:
[paste Text B]
```

**What changed:**
- Added a "Winner" column with explicit A/B/Tie values per row, so you get a row-by-row verdict
- Added a score count to see the overall winner at a glance
- Added a context-aware recommendation and a caveat, so the advice fits your specific situation

---

# SEC-09: 📝 Guided Practice

Follow these steps:

1. **Pick two things to compare.** Choose two articles, product descriptions, or textbook sections on similar topics. Copy both texts.
2. **Define 4–5 comparison criteria.** Think about what matters most to you. Write them as a numbered list.
3. **Write the prompt.** Ask for a markdown table with columns: Criterion, Text A, Text B, Key Difference. Add a one-sentence verdict at the end.

**Your task:** Check the AI's table. Does each row directly answer the criterion? Does the "Key Difference" column actually highlight a meaningful difference? If any row is vague, make your criterion more specific (e.g., change "Features" to "Number of Integrations Available").

---

# SEC-10: 🏆 Challenge

**5-Minute Challenge:**

You received two internship offer summaries:

Offer A: "6-month internship at a startup in Bangalore. Stipend: 25,000/month. Role: Full-stack developer. Tech stack: React, Node.js. Team size: 5. No remote option."

Offer B: "3-month internship at an MNC in Hyderabad. Stipend: 40,000/month. Role: Backend developer. Tech stack: Java, Spring Boot. Team size: 50. Hybrid (2 days remote)."

Write one prompt that compares them across: Stipend, Duration, Role Scope, Team Size, and Flexibility. Output must be a table with a Winner column and a final recommendation row for a student who wants maximum learning.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I listed specific comparison criteria instead of saying "compare these"
- [ ] I requested a structured table format with clear column headers
- [ ] I asked for a verdict or recommendation after the table
- [ ] I provided context so the recommendation fits my actual situation

---

# SEC-12: 🧠 What You Learned

- Naming your comparison criteria forces the AI to compare point by point instead of rambling.
- A structured table with a "Key Difference" or "Winner" column makes results instantly scannable.
- Adding context (your goal, your situation) turns a generic comparison into personalized advice.

---

# SEC-13: 📋 Mini Quiz

**Q1:** You ask the AI to "compare these two articles" and get a vague paragraph. What's the most important thing to add?

- A) More text from the articles
- B) A list of specific comparison criteria
- C) A longer prompt

**Answer:** B — Without named criteria, the AI picks random points. A numbered list of criteria gives you a structured, row-by-row comparison.

**Q2:** Your comparison table has a "Winner" column but every row says "Depends on use case." How do you fix this?

**Answer:** Add context to your prompt, e.g., "I am a student choosing a tool for a web development project." When the AI knows your situation, it can pick a clear winner for each row instead of hedging.

---

# SEC-14: ⚡ One-Line Takeaway

> Name your criteria, set your columns, add a verdict row — and the AI will compare any two documents like a structured analyst.
