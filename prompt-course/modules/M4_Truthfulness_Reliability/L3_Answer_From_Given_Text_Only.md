# 📄 Answer From Given Text Only

## SEC-00: Lesson ID

| Field      | Value                        |
|------------|------------------------------|
| Lesson ID  | M4-L3                       |
| Module     | M4 — Truthfulness & Reliability |
| Difficulty | Intermediate                 |
| Time       | 10–15 minutes                |

---

## SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Restrict AI to answer strictly from a provided text (closed-book mode)
- 🎯 Prevent the AI from injecting outside knowledge into your answers
- 🎯 Require direct quotes from the source text as proof of grounding

---

## SEC-02: 💡 Use Case

You're studying for a law exam. You paste a case summary into AI and ask a question about it. The AI gives you a nicely worded answer — but half of it comes from general legal knowledge, not from the case summary you pasted. You don't realize this, and your exam answer mixes up two different legal precedents.

Closed-book mode is essential anytime you need answers grounded in a specific document: reading comprehension, contract analysis, research paper review, studying from specific notes, or extracting data from a provided report. You want the AI to act like a student who can only use the open textbook in front of them.

---

## SEC-03: ❌ Bad Prompt

```
Here is an article about India's semiconductor policy:

"The India Semiconductor Mission (ISM), launched in 2021,
aims to build a semiconductor ecosystem with an outlay
of ₹76,000 crore. The mission focuses on compound
semiconductors, silicon photonics, and sensor fabrication.
Three companies have signed MOUs for fabrication plants
in Gujarat and Assam."

What is India doing in semiconductor manufacturing?
```

---

## SEC-04: ❌ Bad Output

```
India is making major strides in semiconductor manufacturing.
The India Semiconductor Mission has a ₹76,000 crore budget.
Vedanta-Foxconn has partnered to set up a $19.5 billion fab
plant in Gujarat. Micron Technology is also investing $2.75
billion in an assembly plant in Sanand. The government has
also introduced PLI schemes across 14 sectors to boost
domestic manufacturing capabilities.
```

---

## SEC-05: 🔍 Why It Failed

- **No closed-book instruction.** The prompt pasted text but never told the AI to limit itself to that text. The AI treated the article as a starting point and added its own knowledge.
- **Outside information mixed in.** Vedanta-Foxconn, Micron, and PLI scheme details are not in the provided article. The student cannot tell which parts came from their source and which the AI added.
- **No grounding mechanism.** Without a quoting requirement, there is no way to trace any claim back to the original text.

---

## SEC-06: ✅ Good Prompt

```
Read the following text carefully. Answer the question
using ONLY the information in this text. Do NOT add any
outside knowledge.

TEXT:
"The India Semiconductor Mission (ISM), launched in 2021,
aims to build a semiconductor ecosystem with an outlay
of ₹76,000 crore. The mission focuses on compound
semiconductors, silicon photonics, and sensor fabrication.
Three companies have signed MOUs for fabrication plants
in Gujarat and Assam."

QUESTION: What is India doing in semiconductor manufacturing?
```

---

## SEC-07: ✅ Good Output

```
Based on the provided text:

India launched the India Semiconductor Mission (ISM) in 2021
to build a semiconductor ecosystem. The mission has a budget
of ₹76,000 crore and focuses on three areas: compound
semiconductors, silicon photonics, and sensor fabrication.

Three companies have signed MOUs to set up fabrication plants,
with locations in Gujarat and Assam.

Note: The text does not specify which companies signed the
MOUs or provide further details about the plants.
```

---

## SEC-08: 🚀 Upgrade Prompt

```
Read the following text carefully. Answer the question
using ONLY the information in this text. Do NOT add any
outside knowledge.

For every claim in your answer, quote the exact phrase
from the text that supports it, using quotation marks.
If the text does not contain enough information to fully
answer the question, say "The text does not provide
this information."

TEXT:
"The India Semiconductor Mission (ISM), launched in 2021,
aims to build a semiconductor ecosystem with an outlay
of ₹76,000 crore. The mission focuses on compound
semiconductors, silicon photonics, and sensor fabrication.
Three companies have signed MOUs for fabrication plants
in Gujarat and Assam."

QUESTION: What is India doing in semiconductor manufacturing?
```

**What changed:** The upgrade adds a **quote-the-exact-line** requirement. Now every claim must be traceable to a specific phrase in the source text. This makes it impossible for the AI to sneak in outside knowledge, because any claim without a matching quote is immediately visible.

---

## SEC-09: 🧪 Guided Practice

1. **Pick a paragraph from your textbook or lecture notes** — something about 100–200 words on a specific topic.
2. **Paste it into AI with a question, but without any closed-book instruction.** Notice how the AI adds extra information beyond your text.
3. **Now re-prompt with the closed-book rules and the quoting requirement.** Compare how the output changes — especially notice what gets removed.

**Your task:** Take one paragraph from your study material. Write a closed-book prompt with the quoting requirement. In your submission, highlight which parts of the first (bad) output were NOT in the original text.

---

## SEC-10: 🏋️ Challenge

**5-minute challenge:**

You have this passage from a company's annual report:

> "Revenue for FY2024 was ₹12,400 crore, a 14% increase from the previous year. The company hired 8,200 new employees, bringing the total workforce to 45,000. Operations expanded to 3 new cities: Indore, Coimbatore, and Bhubaneswar."

Write a prompt that:
- Asks "Summarize this company's growth in FY2024"
- Restricts the AI to ONLY this text
- Requires a direct quote for each claim
- Instructs the AI to say "not provided" for anything the text doesn't cover

---

## SEC-11: ✅ Checklist

When using AI to answer from a specific document:

- [ ] I explicitly said "use ONLY the provided text" or "do NOT add outside knowledge"
- [ ] I asked the AI to quote the exact supporting phrase for each claim
- [ ] I instructed the AI to flag gaps with "the text does not provide this information"
- [ ] I reviewed the output to make sure no outside facts were injected

---

## SEC-12: 📚 What You Learned

1. **Pasting text is not enough.** Without explicit instructions, AI treats your text as a starting point and freely adds outside knowledge.
2. **"Answer ONLY from this text" creates closed-book mode.** This single instruction dramatically changes the AI's behavior from expansive to constrained.
3. **Quoting requirements make grounding verifiable.** When AI must cite exact phrases, you can instantly check whether a claim is actually supported by your source.

---

## SEC-13: ❓ Mini Quiz

**Q1:** You paste a research paper abstract and ask AI to summarize it. The summary includes a statistic that's not in the abstract. What likely happened?

**A1:** The AI pulled the statistic from its general training data, not from your abstract. Without a closed-book instruction, AI fills in gaps with outside knowledge. Re-prompt with "use ONLY the provided text."

---

**Q2:** Why is "quote the exact phrase" more effective than just saying "only use the provided text"?

**A2:** "Only use the provided text" tells the AI what to do, but provides no proof mechanism. "Quote the exact phrase" adds accountability — if the AI can't produce a matching quote, you know the claim isn't grounded in your source. It turns a rule into a verifiable constraint.

---

## SEC-14: 💬 One-Line Takeaway

> If you give AI a document but don't lock it down, the AI will answer from everywhere except your document.
