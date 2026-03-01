# 🛑 Don't Guess Mode

## SEC-00: Lesson ID

| Field      | Value                        |
|------------|------------------------------|
| Lesson ID  | M4-L1                       |
| Module     | M4 — Truthfulness & Reliability |
| Difficulty | Intermediate                 |
| Time       | 10–15 minutes                |

---

## SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Force AI to admit uncertainty instead of fabricating answers
- 🎯 Add explicit "I don't know" instructions to your prompts
- 🎯 Require confidence levels so you can judge how much to trust each answer

---

## SEC-02: 💡 Use Case

You're researching a niche topic for your thesis — maybe a specific algorithm's time complexity on a rare data structure, or a regulation from an obscure government body. You paste the question into AI and get a confident-sounding answer. You cite it in your report. Your professor flags it as completely wrong.

This happens because AI models are trained to be helpful, not honest. They will guess rather than stay silent. Whether you're studying for exams, debugging code, or preparing placement interview answers, you need AI to tell you when it doesn't actually know something.

---

## SEC-03: ❌ Bad Prompt

```
What is the exact population of Mawsynram village
according to the 2023 micro-census?
```

---

## SEC-04: ❌ Bad Output

```
According to the 2023 micro-census, the population of
Mawsynram village is approximately 6,285 residents,
comprising 1,340 households. The census also recorded
a literacy rate of 78.3% and a male-to-female ratio
of 1,012 females per 1,000 males.
```

---

## SEC-05: 🔍 Why It Failed

- **No uncertainty instruction.** The prompt didn't tell the AI what to do when it lacks data, so it defaulted to inventing plausible-sounding numbers.
- **Specific data request without a source.** Asking for "exact" figures from a specific census gives the AI no room to generalize, so it fabricates precise-looking data.
- **No verification mechanism.** There's nothing in the prompt that asks the AI to flag whether it actually has access to this information.

---

## SEC-06: ✅ Good Prompt

```
What is the exact population of Mawsynram village
according to the 2023 micro-census?

If you are not sure or do not have verified data,
say "I don't know" instead of guessing.
```

---

## SEC-07: ✅ Good Output

```
I don't know the exact population of Mawsynram village
from a 2023 micro-census. I do not have access to that
specific dataset.

What I can tell you is that Mawsynram is a small village
in the East Khasi Hills district of Meghalaya, India,
known for being one of the wettest places on Earth.
For accurate population data, I recommend checking the
Census of India website or the Meghalaya state government
records.
```

---

## SEC-08: 🚀 Upgrade Prompt

```
What is the exact population of Mawsynram village
according to the 2023 micro-census?

Rules:
1. If you are unsure, say "I don't know."
2. For every claim you DO make, add a confidence tag:
   [HIGH] = verified, well-known fact
   [MEDIUM] = likely correct but not certain
   [LOW] = rough estimate, may be wrong
```

**What changed:** The upgrade adds a confidence-tagging system. Now you don't just get a binary "I know / I don't know" — you get a spectrum. This lets you decide which parts of the answer to trust and which to double-check.

---

## SEC-09: 🧪 Guided Practice

1. **Pick an obscure question** from one of your courses — something specific enough that the AI probably doesn't have the answer (e.g., "What was the pass percentage for my university's Data Structures exam in 2022?").
2. **First, ask it without any safety instruction.** Notice how the AI gives you a confident answer anyway.
3. **Now re-ask with the "I don't know" rule and confidence tags.** Compare the two outputs.

**Your task:** Write a prompt asking about a very specific statistic from your college or city. Add the "I don't know" instruction and confidence tags. Paste both outputs side by side and note the differences.

---

## SEC-10: 🏋️ Challenge

**5-minute challenge:**

You are preparing a fact sheet about a rare programming language called **Zig** for a college tech talk. Write a prompt that asks AI to list 5 key facts about Zig's memory management model. Your prompt must include:

- An explicit "say I don't know" instruction
- Confidence tags for each fact
- A final line where the AI states how many of the 5 facts it is fully confident about

---

## SEC-11: ✅ Checklist

Before submitting any research prompt, verify:

- [ ] I told the AI what to do when it's unsure (explicit "I don't know" instruction)
- [ ] I asked for confidence levels or certainty tags on each claim
- [ ] I did not assume the AI's confident tone means the answer is correct
- [ ] I have a plan to verify any [MEDIUM] or [LOW] confidence claims independently

---

## SEC-12: 📚 What You Learned

1. **AI defaults to guessing.** Without an explicit instruction, models will fabricate plausible-sounding answers rather than admit ignorance.
2. **"If unsure, say I don't know" is a simple, powerful addition** that changes the AI's behavior from always-answer mode to honest mode.
3. **Confidence tags give you a trust spectrum** — not just yes/no, but a scale you can use to decide what needs independent verification.

---

## SEC-13: ❓ Mini Quiz

**Q1:** You ask AI: "What is the median salary for a fresher data analyst in Pune in 2024?" and it gives you ₹5.2 LPA with full confidence. What is the safest assumption?

**A1:** The number might be fabricated. Without a "say I don't know" instruction and confidence tag, you cannot trust specific figures. Always cross-check salary data with sources like Glassdoor or AmbitionBox.

---

**Q2:** What is the difference between adding "If unsure, say I don't know" versus adding confidence tags?

**A2:** "I don't know" is binary — the AI either answers or refuses. Confidence tags are a spectrum — the AI answers everything but labels each claim with how certain it is, giving you more nuanced information to work with.

---

## SEC-14: 💬 One-Line Takeaway

> A confident tone is not the same as a correct answer — always give AI permission to say "I don't know."
