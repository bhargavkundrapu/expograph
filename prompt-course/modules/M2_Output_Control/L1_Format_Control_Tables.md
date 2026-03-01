# SEC-00: Lesson ID

**M2-L1 — Format Control: Tables**
- **Module:** M2 – Output Control
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Force AI to output clean, structured markdown tables instead of paragraphs
- 🎯 Define column headers, row count, and sorting order inside your prompt
- 🎯 Add extra columns like notes, ratings, or tags to enrich table output

---

# SEC-02: 💡 Use Case

Tables are everywhere in real work. You need them when:

- **Studying:** Comparing programming languages, algorithms, or frameworks side by side
- **Projects:** Creating feature comparison charts for documentation
- **Placements:** Quickly generating structured data for interview prep (e.g., time complexities, design pattern summaries)
- **Coding:** Producing API endpoint references or config option tables

Without format control, AI gives you a wall of text. With it, you get ready-to-paste tables.

---

# SEC-03: ❌ Bad Prompt

```
Compare Python and Java.
```

---

# SEC-04: ❌ Bad Output

```
Python is an interpreted, dynamically typed language known for its simplicity
and readability. It is widely used in data science, web development, and
scripting. Java, on the other hand, is a compiled, statically typed language
popular in enterprise applications and Android development. Both are
general-purpose languages, but Python has a gentler learning curve while
Java offers better performance in large-scale systems.
```

---

# SEC-05: 🔍 Why It Failed

- **No format specified.** The AI defaulted to a paragraph because you never asked for a table.
- **No structure cues.** Without column names or comparison criteria, the AI chose what to compare on its own.
- **No constraints on length.** The output rambles instead of delivering scannable data.

---

# SEC-06: ✅ Good Prompt

```
Compare Python and Java in a markdown table with these columns:
| Feature | Python | Java |

Include rows for: Typing, Speed, Learning Curve, Primary Use Case, Package Manager.
```

---

# SEC-07: ✅ Good Output

```
| Feature          | Python              | Java                   |
|------------------|----------------------|------------------------|
| Typing           | Dynamic              | Static                 |
| Speed            | Slower (interpreted) | Faster (compiled)      |
| Learning Curve   | Easy                 | Moderate               |
| Primary Use Case | Data Science, Web    | Enterprise, Android    |
| Package Manager  | pip                  | Maven / Gradle         |
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Compare Python, Java, and Go in a markdown table.

Columns: Feature | Python | Java | Go | Notes
Rows: Typing, Speed, Concurrency Support, Learning Curve, Primary Use Case, Package Manager.

Sort rows alphabetically by Feature name.
Add a "Notes" column with a one-line tip for beginners.
Bold the best option in each row.
```

**What changed:**
- Added a third language (Go) to make the table richer
- Added a "Notes" column for extra context
- Asked for alphabetical sorting so the table is organized
- Requested bold formatting to highlight the best option per row

---

# SEC-09: 🛠️ Guided Practice

Follow these steps:

1. **Pick three things to compare.** Choose three databases you've heard of (e.g., MySQL, MongoDB, PostgreSQL).
2. **Define your columns.** Write column headers: Feature, then one column per database.
3. **Write the prompt.** Ask the AI for a markdown table with at least 5 rows covering: Type (SQL/NoSQL), Scalability, Learning Curve, Best For, and License.

**Your task:** Paste your prompt into an AI tool and check — did you get a clean table with exactly the columns and rows you asked for?

---

# SEC-10: 🏆 Challenge

**5-minute challenge:**

You are preparing a study sheet for your upcoming exam on sorting algorithms. Write a single prompt that produces a markdown table comparing Bubble Sort, Merge Sort, Quick Sort, and Heap Sort across these columns:

- Algorithm Name
- Time Complexity (Best)
- Time Complexity (Worst)
- Space Complexity
- Stable?
- When to Use

The table must be sorted by Worst-case Time Complexity (best first).

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I specified "markdown table" (or similar) in my prompt
- [ ] I listed exact column headers I wanted
- [ ] I defined which rows or items to include
- [ ] I added at least one formatting constraint (sorting, bold, notes column)

---

# SEC-12: 📚 What You Learned

1. AI defaults to paragraphs unless you explicitly ask for a table format.
2. Naming your columns and rows gives you precise control over table structure.
3. Extras like sorting, bold highlights, and notes columns make tables more useful with minimal extra effort.

---

# SEC-13: ❓ Mini Quiz

**Q1:** You prompt "List the pros and cons of React" and get a paragraph. What is the simplest fix?

**A1:** Add "in a markdown table with columns: Aspect | Pros | Cons" to your prompt. The key fix is specifying the format explicitly.

**Q2:** Your table prompt returns 3 rows but you needed 6. What did you forget?

**A2:** You forgot to list the specific rows you wanted. Always define both columns AND rows (e.g., "Include rows for: Speed, Cost, Scalability, Security, Ease of Use, Community Support").

---

# SEC-14: 💬 One-Line Takeaway

> If you don't tell the AI what shape the answer should be, it will always choose a paragraph — so always specify your table structure.
