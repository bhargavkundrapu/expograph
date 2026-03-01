# SEC-00: Lesson ID

**M8-L1 — Extract to Table**
- **Module:** M8 – Extraction, Notes & Research
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Extract structured data from messy, unstructured paragraphs into clean tables
- 🎯 Specify exact columns, row format, and sorting order in your extraction prompt
- 🎯 Add conditional formatting notes to highlight important data points

---

# SEC-02: 💡 Use Case

You have a paragraph full of facts, stats, or details buried in sentences. You need that data in a table — fast.

- **Studying:** Pull key dates, events, and outcomes from a history textbook paragraph
- **Projects:** Extract feature lists from competitor product descriptions
- **Placements:** Turn a job description paragraph into a structured requirements table

Raw text is hard to scan. Tables make data instantly usable.

---

# SEC-03: ❌ Bad Prompt

```
Make a table from this:

India has 28 states. The largest by area is Rajasthan at 342,239 sq km
with a population of about 68 million. Uttar Pradesh is the most
populous state with over 200 million people and an area of 243,286 sq
km. Maharashtra has Mumbai as its capital, covers 307,713 sq km, and
has around 112 million people. Kerala is smaller at 38,863 sq km with
about 33 million people but has the highest literacy rate at 94%.
```

---

# SEC-04: ❌ Bad Output

```
| State | Info |
|-------|------|
| Rajasthan | Largest by area, 342,239 sq km, 68 million people |
| Uttar Pradesh | Most populous, 200 million, 243,286 sq km |
| Maharashtra | Capital Mumbai, 307,713 sq km, 112 million |
| Kerala | Smallest listed, 38,863 sq km, 33 million, highest literacy |
```

---

# SEC-05: 🔍 Why It Failed

- **No columns specified.** The AI lumped everything into a single "Info" column, making the data hard to compare.
- **No sorting rule.** The rows appear in paragraph order, not any logical order.
- **No formatting guidance.** Numbers are mixed with text descriptions, so you can't scan or sort the data easily.

---

# SEC-06: ✅ Good Prompt

```
Extract data from the text below into a markdown table.

Columns: State | Area (sq km) | Population (millions) | Notable Fact
Sort rows by Area, largest first.
Use numbers only in the Area and Population columns — no words.

Text:
India has 28 states. The largest by area is Rajasthan at 342,239 sq km
with a population of about 68 million. Uttar Pradesh is the most
populous state with over 200 million people and an area of 243,286 sq
km. Maharashtra has Mumbai as its capital, covers 307,713 sq km, and
has around 112 million people. Kerala is smaller at 38,863 sq km with
about 33 million people but has the highest literacy rate at 94%.
```

---

# SEC-07: ✅ Good Output

```
| State           | Area (sq km) | Population (millions) | Notable Fact          |
|-----------------|-------------:|----------------------:|-----------------------|
| Rajasthan       |      342,239 |                    68 | Largest by area       |
| Maharashtra     |      307,713 |                   112 | Capital is Mumbai     |
| Uttar Pradesh   |      243,286 |                   200 | Most populous state   |
| Kerala          |       38,863 |                    33 | Highest literacy (94%)|
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Extract data from the text below into a markdown table.

Columns: State | Area (sq km) | Population (millions) | Notable Fact | Flag
Sort rows by Population, largest first.
Use numbers only in Area and Population columns.

Flag rules:
- If population > 100 million, flag as "🔴 High"
- If population 50–100 million, flag as "🟡 Medium"
- If population < 50 million, flag as "🟢 Low"

Text:
[paste text here]
```

**What changed:**
- Added a conditional "Flag" column that categorizes each row based on population size
- This turns a plain data table into an insight-ready table where patterns jump out instantly

---

# SEC-09: 📝 Guided Practice

Follow these steps:

1. **Find a paragraph with data.** Open any Wikipedia article and copy a paragraph that contains at least 4 items with numbers (e.g., a paragraph about planets, cities, or companies).
2. **Define your columns.** Pick 3–4 columns that capture the key facts. Write them out before writing your prompt.
3. **Write the prompt.** Ask the AI to extract the data into a markdown table with your columns, sorted by one numeric column.

**Your task:** Compare the AI's table to the original paragraph. Did it capture every data point? Did it sort correctly? If anything is off, tweak your column names or sorting rule and try again.

---

# SEC-10: 🏆 Challenge

**5-Minute Challenge:**

Here is a paragraph. Write one prompt that extracts it into a clean, sorted table:

"Tesla reported revenue of $81.5 billion in 2023. Apple led with $383 billion. Microsoft earned $211 billion. Amazon reported $575 billion in revenue. Google's parent Alphabet brought in $307 billion."

Your table must have columns: Company | Revenue ($ billions) | Rank. Sort by revenue, highest first. The Rank column should be numbered 1 through 5.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I specified exact column names in my extraction prompt
- [ ] I defined a sorting rule for the rows
- [ ] I set number formatting rules (numbers only, no text in data columns)
- [ ] I tried adding a conditional column (flag, category, or note)

---

# SEC-12: 🧠 What You Learned

- Messy paragraphs become scannable tables when you name your columns and define a sort order.
- Telling the AI how to format numbers (digits only, no words) keeps data columns clean and consistent.
- Conditional columns like flags or categories transform raw data tables into insight-ready outputs.

---

# SEC-13: 📋 Mini Quiz

**Q1:** You extract data into a table but the "Price" column shows "$50", "$thirty", and "50 USD". What went wrong?

- A) The AI hallucinated the data
- B) You didn't specify a number format for that column
- C) The source text was too long

**Answer:** B — You need to tell the AI exactly how to format the column, e.g., "numbers only, no currency symbols or words."

**Q2:** Your extracted table has 3 rows but the source text mentions 5 items. What should you fix?

**Answer:** Add "Extract ALL items mentioned in the text" to your prompt. The AI may skip items it considers less important unless you tell it to include every one.

---

# SEC-14: ⚡ One-Line Takeaway

> Name your columns, set your sort order, and the AI will pull clean data out of any messy paragraph.
