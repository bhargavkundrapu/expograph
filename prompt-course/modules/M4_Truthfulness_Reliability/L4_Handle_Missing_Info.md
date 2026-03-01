# 🕳️ Handle Missing Information

## SEC-00: Lesson ID

| Field      | Value                        |
|------------|------------------------------|
| Lesson ID  | M4-L4                       |
| Module     | M4 — Truthfulness & Reliability |
| Difficulty | Intermediate                 |
| Time       | 10–15 minutes                |

---

## SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Make AI flag missing information with clear labels instead of silently filling gaps
- 🎯 Distinguish between AI-confirmed facts, assumptions, and missing data in any output
- 🎯 Use confidence tags and assumption flags to control how AI handles incomplete inputs

---

## SEC-02: 💡 Use Case

You're building a project report and paste your team's data into AI to generate a summary table. The data is missing three fields — budget, timeline, and team lead for one sub-module. Instead of flagging the gaps, the AI invents plausible values. Your professor spots the fake data. You didn't even realize it was made up.

This pattern shows up everywhere: filling forms from incomplete data, generating summaries from partial meeting notes, creating profiles from sparse resumes, or analyzing datasets with missing columns. Whenever input data has holes, AI will quietly fill them unless you tell it not to.

---

## SEC-03: ❌ Bad Prompt

```
Here is information about our project team. Create a
summary table.

Name: Priya Sharma
Role: Frontend Developer
Experience: 3 years

Name: Rahul Verma
Role: Backend Developer

Name: Sneha Iyer
```

---

## SEC-04: ❌ Bad Output

```
| Name         | Role               | Experience |
|--------------|--------------------| ---------- |
| Priya Sharma | Frontend Developer | 3 years    |
| Rahul Verma  | Backend Developer  | 2 years    |
| Sneha Iyer   | Data Analyst       | 1 year     |
```

---

## SEC-05: 🔍 Why It Failed

- **Silent gap-filling.** Rahul's experience and Sneha's role and experience were not provided, but the AI invented "2 years," "Data Analyst," and "1 year" without any indication these are guesses.
- **No missing-data instruction.** The prompt didn't tell the AI how to handle incomplete records, so it defaulted to making things up.
- **Impossible to distinguish real from fake.** The table looks clean and complete, giving false confidence that all data is accurate.

---

## SEC-06: ✅ Good Prompt

```
Here is information about our project team. Create a
summary table.

IMPORTANT: If any field is missing from the data I
provided, write "NOT PROVIDED" in that cell. Do NOT
guess or fill in missing information.

Name: Priya Sharma
Role: Frontend Developer
Experience: 3 years

Name: Rahul Verma
Role: Backend Developer

Name: Sneha Iyer
```

---

## SEC-07: ✅ Good Output

```
| Name         | Role               | Experience   |
|--------------|--------------------| ------------ |
| Priya Sharma | Frontend Developer | 3 years      |
| Rahul Verma  | Backend Developer  | NOT PROVIDED |
| Sneha Iyer   | NOT PROVIDED       | NOT PROVIDED |

Note: 3 fields are missing across 2 team members.
Please provide the missing data for a complete table.
```

---

## SEC-08: 🚀 Upgrade Prompt

```
Here is information about our project team. Create a
summary table.

Rules for handling data:
1. If a field is directly stated, mark it as [CONFIRMED]
2. If a field is missing, write "NOT PROVIDED" and mark
   it as [MISSING]
3. If you can reasonably infer a field from context
   (but it's not stated), fill it in and mark it as
   [ASSUMED] with a brief reason

Name: Priya Sharma
Role: Frontend Developer
Experience: 3 years

Name: Rahul Verma
Role: Backend Developer

Name: Sneha Iyer
```

**What changed:** The upgrade introduces a three-tier tagging system — [CONFIRMED], [MISSING], and [ASSUMED]. Instead of a binary "fill or don't fill," the AI now has a middle option: it can make reasonable inferences but must label them clearly. This gives you maximum information while maintaining full transparency about data quality.

---

## SEC-09: 🧪 Guided Practice

1. **Create a deliberately incomplete dataset.** Use something from your project or coursework — a list of tasks with some missing deadlines, a table of students with some missing scores, or a set of API endpoints with some missing descriptions.
2. **First, ask AI to "create a summary table" without any missing-data instructions.** Count how many cells the AI fills in with made-up data.
3. **Now re-prompt with the three-tier tagging system** ([CONFIRMED], [MISSING], [ASSUMED]). Compare the outputs.

**Your task:** Create a prompt with at least 5 records where 3 have missing fields. Use the three-tier tagging system. In your submission, highlight which cells would have been silently fabricated without the tags.

---

## SEC-10: 🏋️ Challenge

**5-minute challenge:**

You received these partial meeting notes and need to generate an action-item table:

> "Aman will handle the database migration. Deadline is Friday. Neha is working on the UI redesign. Farhan mentioned something about testing but no details were discussed."

Write a prompt that generates a table with columns: Person, Task, Deadline, Status. Use the three-tier tag system. Make sure the AI flags what's missing and what it assumed.

---

## SEC-11: ✅ Checklist

When processing incomplete data through AI:

- [ ] I told the AI to write "NOT PROVIDED" for missing fields instead of guessing
- [ ] I used confidence tags ([CONFIRMED], [MISSING], [ASSUMED]) to label data quality
- [ ] I asked the AI to count and summarize the total missing fields at the end
- [ ] I reviewed the output specifically looking for plausible-but-unverified values

---

## SEC-12: 📚 What You Learned

1. **AI hates blank cells.** When data is missing, AI will fill gaps with plausible guesses rather than leave fields empty — and it won't tell you.
2. **"NOT PROVIDED" is a powerful label.** Explicitly telling AI to use this phrase converts silent fabrication into visible gaps you can address.
3. **Three-tier tags give you the full picture.** [CONFIRMED] / [MISSING] / [ASSUMED] lets AI still be helpful while being completely transparent about what's real, what's missing, and what's inferred.

---

## SEC-13: ❓ Mini Quiz

**Q1:** You ask AI to fill a table from incomplete data and every cell has a value. There are no "NOT PROVIDED" labels. Does this mean the data is complete?

**A1:** No. It almost certainly means the AI filled in missing values silently. Without an explicit instruction to flag gaps, a full-looking table is actually less trustworthy than one with visible "NOT PROVIDED" labels.

---

**Q2:** When should you use [ASSUMED] instead of [MISSING]?

**A2:** Use [ASSUMED] when the AI can make a reasonable inference from context — for example, inferring "Backend" as a category when the task mentions "database migration." Use [MISSING] when there is no contextual basis for a guess. The key is that [ASSUMED] must include the reasoning so you can accept or reject the inference.

---

## SEC-14: 💬 One-Line Takeaway

> A table with visible gaps is more honest — and more useful — than a table with invisible lies.
