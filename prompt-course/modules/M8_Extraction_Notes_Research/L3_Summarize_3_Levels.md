# SEC-00: Lesson ID

**M8-L3 — Summarize at 3 Levels**
- **Module:** M8 – Extraction, Notes & Research
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Get the AI to produce summaries at three distinct levels: one-line, one-paragraph, and detailed
- 🎯 Request all three levels in a single prompt for maximum efficiency
- 🎯 Add audience-specific summaries that adjust tone and depth for different readers

---

# SEC-02: 💡 Use Case

Different situations need different summary lengths. A quick glance needs one line. A slide deck needs a paragraph. A report needs detail.

- **Studying:** Summarize a research paper at all three levels — one for your flashcard, one for your notes, one for your assignment
- **Projects:** Give your team lead a one-liner and your documentation a detailed version
- **Placements:** Quickly summarize a company's product for interview prep at whatever depth you need

One prompt, three summaries. No re-prompting needed.

---

# SEC-03: ❌ Bad Prompt

```
Summarize this article about climate change and renewable energy
adoption in developing nations.
```

---

# SEC-04: ❌ Bad Output

```
Climate change is a growing concern in developing nations. Many
countries are now adopting renewable energy sources such as solar and
wind power to reduce their carbon emissions. However, challenges
remain including high initial costs, lack of infrastructure, and
policy gaps. International organizations are providing funding and
technical support to help bridge these gaps.
```

---

# SEC-05: 🔍 Why It Failed

- **No level specified.** The AI picked one medium-length summary. You have no idea if this is the short version or the long version.
- **No structure.** It's a single block of text with no labels or sections.
- **Not reusable.** You can't paste this into a flashcard (too long) or into a report (too shallow).

---

# SEC-06: ✅ Good Prompt

```
Summarize the following article at 3 levels:

Level 1 — One-Line Summary: Max 20 words. Capture the core message.
Level 2 — One-Paragraph Summary: 3–4 sentences. Cover the main argument, key evidence, and conclusion.
Level 3 — Detailed Summary: 8–10 bullet points. Include key facts, statistics, examples, and counterarguments.

Label each level clearly.

Article:
[paste article text here]
```

---

# SEC-07: ✅ Good Output

```
**Level 1 — One-Line Summary:**
Developing nations are shifting to renewable energy but face cost,
infrastructure, and policy barriers.

**Level 2 — One-Paragraph Summary:**
Developing nations are accelerating renewable energy adoption to combat
climate change, with solar and wind leading the shift. Key barriers
include high upfront costs, weak grid infrastructure, and inconsistent
government policies. International funding from organizations like the
World Bank is helping, but progress remains uneven across regions.

**Level 3 — Detailed Summary:**
- Renewable energy adoption grew 15% in developing nations in 2024
- Solar energy leads adoption due to falling panel costs
- Wind energy is growing in coastal and high-altitude regions
- High initial investment remains the top barrier for low-income countries
- Grid infrastructure in rural areas cannot support new energy sources
- Government subsidies exist but are inconsistent across countries
- The World Bank committed $12 billion to clean energy in 2024
- India and Brazil are leading among developing nations
- Critics argue the pace is too slow to meet 2030 climate targets
- Local job creation is a key benefit of renewable energy projects
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Summarize the following article at 3 levels. Produce each level
for TWO audiences:

Audience A: A 10-year-old student (simple words, no jargon)
Audience B: A policy researcher (technical terms, include data)

Levels:
Level 1 — One-Line Summary: Max 20 words.
Level 2 — One-Paragraph Summary: 3–4 sentences.
Level 3 — Detailed Summary: 8–10 bullet points.

Format as:
### Audience A
[Level 1, 2, 3]

### Audience B
[Level 1, 2, 3]

Article:
[paste article text here]
```

**What changed:**
- Added audience-specific summaries so the same content is explained differently for different readers
- A child gets simple language; a researcher gets data and technical terms
- This produces six summaries in one prompt — highly efficient for real-world use

---

# SEC-09: 📝 Guided Practice

Follow these steps:

1. **Find a long article.** Copy any news article or blog post (300+ words). Wikipedia sections work well.
2. **Write the 3-level prompt.** Ask for Level 1 (one line, max 20 words), Level 2 (one paragraph, 3–4 sentences), and Level 3 (8–10 bullet points).
3. **Check the output.** Is Level 1 actually one line? Is Level 3 detailed enough? If not, tighten the word counts or bullet point range.

**Your task:** Take your Level 1 output and paste it as a flashcard front. Take your Level 3 output and paste it into a study document. Both should feel like they belong in those formats without any editing.

---

# SEC-10: 🏆 Challenge

**5-Minute Challenge:**

Find any Wikipedia article about a scientific topic (e.g., photosynthesis, black holes, CRISPR). Write one prompt that produces:

- A one-line summary a high school student could understand
- A one-paragraph summary for a college assignment
- A 6-bullet detailed summary for a study guide

All three must come from the same prompt. Label each level clearly.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I requested all three summary levels in a single prompt
- [ ] I set word or sentence limits for each level
- [ ] I labeled each level clearly in the prompt
- [ ] I tried adding audience-specific versions for at least one level

---

# SEC-12: 🧠 What You Learned

- Asking for "a summary" gives you one random-length output. Asking for three labeled levels gives you exactly what you need.
- Setting word limits and sentence counts keeps each level the right length.
- Audience-specific summaries let you reuse the same source text for different readers without re-prompting.

---

# SEC-13: 📋 Mini Quiz

**Q1:** You ask for a one-line summary and get a 3-sentence paragraph. What should you fix?

- A) Use a different article
- B) Add a strict word limit like "Max 20 words" to your prompt
- C) Ask the AI to try again without changing the prompt

**Answer:** B — The AI doesn't know what "one line" means to you. A specific word limit like "Max 20 words" forces a short output.

**Q2:** Your Level 3 detailed summary has only 3 bullet points. What went wrong?

**Answer:** You didn't specify a minimum. Add "8–10 bullet points" to your prompt. The AI respects number ranges better than vague words like "detailed."

---

# SEC-14: ⚡ One-Line Takeaway

> One prompt, three levels — a one-liner for your flashcard, a paragraph for your notes, and bullets for your report.
