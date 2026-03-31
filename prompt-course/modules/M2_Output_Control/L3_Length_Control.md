# SEC-00: Lesson ID

**M2-L3 - Length Control**
- **Module:** M2 – Output Control
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Set exact length constraints (word count, sentence count, paragraph count) in your prompts
- 🎯 Prevent AI from over-explaining or under-delivering on your requests
- 🎯 Generate multiple lengths of the same content in a single prompt

---

# SEC-02: 💡 Use Case

Length control matters when:

- **Studying:** You need a one-line definition for a flashcard, not a full essay
- **Projects:** Your README summary must be under 50 words to fit a template
- **Placements:** You want a 2-sentence elevator pitch, not a 3-paragraph answer
- **Coding:** Your code comment or docstring should be exactly one line

Without length control, AI guesses how much to write. Sometimes it gives you three words. Sometimes three pages.

---

# SEC-03: ❌ Bad Prompt

```
Explain cloud computing.
```

---

# SEC-04: ❌ Bad Output

```
Cloud computing is the delivery of computing services - including servers,
storage, databases, networking, software, analytics, and intelligence - over
the internet to offer faster innovation, flexible resources, and economies
of scale. There are three main types: IaaS, PaaS, and SaaS. IaaS provides
virtualized computing resources, PaaS provides a platform for developers,
and SaaS delivers software applications over the web. Companies like AWS,
Azure, and Google Cloud dominate this space...
```

*(continues for 200+ more words)*

---

# SEC-05: 🔍 Why It Failed

- **No length constraint.** The AI had no idea if you wanted one sentence or one page.
- **No audience signal.** Without knowing who it's for, the AI defaulted to a textbook-style explanation.
- **Open-ended topic.** "Cloud computing" is broad - the AI tried to cover everything instead of being concise.

---

# SEC-06: ✅ Good Prompt

```
Explain cloud computing in exactly 2 sentences. 
Target audience: a first-year CS student.
Keep it simple - no jargon.
```

---

# SEC-07: ✅ Good Output

```
Cloud computing means using someone else's computers (servers) over the
internet instead of running everything on your own machine. Services like
Google Drive, AWS, and Netflix all run on cloud infrastructure, letting
you access storage, processing power, and apps from anywhere.
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Explain cloud computing at three different lengths. Use simple language.

1. **One-liner:** A single sentence, under 15 words.
2. **Short paragraph:** 3-4 sentences for a quick overview.
3. **Detailed explanation:** 8-10 sentences covering types (IaaS, PaaS, SaaS), 
   benefits, and one real-world example.

Label each section clearly.
```

**What changed:**
- Requests three versions in one prompt, each with a specific length
- Sets word or sentence limits for every version
- Adds content requirements for the longer version (types, benefits, example)
- Asks for clear labels so the output is easy to scan

---

# SEC-09: 🛠️ Guided Practice

Follow these steps:

1. **Pick a concept.** Choose something you are currently studying (e.g., recursion, REST APIs, normalization).
2. **Write three length constraints.** One-liner (under 15 words), short (2-3 sentences), detailed (8-10 sentences).
3. **Prompt the AI.** Ask for all three versions in a single prompt with clear labels for each.

**Your task:** Check each version. Does the one-liner actually stay under 15 words? Does the detailed version hit 8-10 sentences? If not, tighten your constraints and try again.

---

# SEC-10: 🏆 Challenge

**5-minute challenge:**

Your team lead asks you to explain "What is Docker?" for three different audiences in one prompt:

1. **Slack message:** Maximum 1 sentence, under 20 words.
2. **Team wiki intro:** Exactly 1 paragraph (4-5 sentences).
3. **Onboarding doc section:** 2 paragraphs, covering what Docker is, why it's used, and one example with a Node.js app.

Write the prompt. Each section must be labeled and respect its length limit.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I specified a measurable length (word count, sentence count, or paragraph count)
- [ ] I tested whether the AI respected my length constraint
- [ ] I can request multiple lengths in a single prompt using labels
- [ ] I combined length control with audience or complexity level for better results

---

# SEC-12: 📚 What You Learned

1. AI has no default sense of "how long" - you must set the length explicitly every time.
2. Specific units work best: say "2 sentences" or "under 50 words," not "keep it short."
3. You can get multiple lengths in one prompt by labeling each version and setting separate limits.

---

# SEC-13: ❓ Mini Quiz

**Q1:** You ask for "a short explanation" and get 150 words. Is "short" a good length constraint?

**A1:** No. "Short" is subjective - the AI interprets it differently every time. Use a measurable unit like "in 2 sentences" or "under 40 words" instead.

**Q2:** You want a one-liner and a full paragraph from the same prompt. What is the best way to structure this?

**A2:** Use labeled sections with separate length constraints: "1. **One-liner:** 1 sentence, under 15 words. 2. **Paragraph:** 4-5 sentences." Labels and specific numbers give the AI clear targets for each section.

---

# SEC-14: 💬 One-Line Takeaway

> "Keep it short" is not a length - give the AI a number, and it will hit the mark.
