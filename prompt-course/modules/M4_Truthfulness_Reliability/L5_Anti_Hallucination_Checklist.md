# 🛡️ Anti-Hallucination Checklist

## SEC-00: Lesson ID

| Field      | Value                        |
|------------|------------------------------|
| Lesson ID  | M4-L5                       |
| Module     | M4 — Truthfulness & Reliability |
| Difficulty | Intermediate                 |
| Time       | 10–15 minutes                |

---

## SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Apply a systematic 5-step checklist to verify any AI-generated output before using it
- 🎯 Build a reusable verification prompt chain that automates hallucination detection
- 🎯 Identify the most common hallucination patterns so you know where to look first

---

## SEC-02: 💡 Use Case

You've used AI to draft a technical report, generate study notes, or prepare answers for a placement interview. The output looks great — clear, confident, well-structured. But how do you know it's accurate?

This lesson gives you a repeatable system for checking. Whether you're reviewing AI-generated code explanations, summarized research papers, or factual claims for a presentation, the 5-step checklist catches the most common types of hallucination before they become your problem.

---

## SEC-03: ❌ Bad Prompt

```
Write a 200-word summary of how blockchain works
for my project report.
```

(Student copies the output directly into their report without checking.)

---

## SEC-04: ❌ Bad Output

```
Blockchain is a distributed ledger technology invented by
Satoshi Nakamoto in 2007. Each block contains a SHA-512
hash of the previous block, creating an immutable chain.
Bitcoin processes approximately 50,000 transactions per
second, making it faster than Visa. All Fortune 500
companies are now using blockchain for supply chain
management.
```

---

## SEC-05: 🔍 Why It Failed

- **No verification step.** The student trusted the output and copied it directly. At least three claims are wrong: the year (Bitcoin whitepaper was 2008, not 2007), the hash function (Bitcoin uses SHA-256, not SHA-512), and the transaction speed (Bitcoin handles ~7 TPS, not 50,000).
- **Confident tone masked errors.** Every sentence reads as authoritative, making it hard to spot which claims are fabricated.
- **No checklist or review process.** Without a systematic way to verify, the student would need deep domain knowledge to catch these errors — which defeats the purpose of using AI in the first place.

---

## SEC-06: ✅ Good Prompt

```
Write a 200-word summary of how blockchain works
for my project report.

After writing the summary, run it through this 5-step
verification checklist:

1. DATES & NUMBERS — Are all dates, statistics, and
   figures accurate? Flag any you're uncertain about.
2. NAMES & ENTITIES — Are all people, companies, and
   organizations correctly named and attributed?
3. TECHNICAL CLAIMS — Are all technical details (algorithms,
   protocols, specifications) correct?
4. CAUSE & EFFECT — Are all causal claims actually supported,
   or are correlations presented as causation?
5. SCOPE & SCALE — Are any claims exaggerated or
   overgeneralized? (e.g., "all," "every," "always")

Present the checklist results after the summary.
```

---

## SEC-07: ✅ Good Output

```
SUMMARY:
Blockchain is a distributed ledger technology conceptualized
in the 2008 Bitcoin whitepaper attributed to Satoshi Nakamoto.
Each block contains a SHA-256 hash of the previous block,
forming a tamper-resistant chain. Transactions are validated
through consensus mechanisms like Proof of Work. Bitcoin
processes roughly 7 transactions per second, which is slower
than traditional payment networks like Visa (~1,700 TPS).

VERIFICATION CHECKLIST:
1. DATES & NUMBERS — ✅ 2008 is correct. ~7 TPS is the
   commonly cited figure for Bitcoin.
2. NAMES & ENTITIES — ✅ Satoshi Nakamoto attribution is
   accurate. Said "attributed to" since identity is unconfirmed.
3. TECHNICAL CLAIMS — ✅ SHA-256 is correct. Proof of Work
   is Bitcoin's consensus mechanism.
4. CAUSE & EFFECT — ✅ No causal claims made.
5. SCOPE & SCALE — ✅ Used "roughly" and "commonly cited"
   to avoid false precision.
```

---

## SEC-08: 🚀 Upgrade Prompt

```
Write a 200-word summary of how blockchain works
for my project report.

After writing the summary, I want you to verify it
using an automated 3-step prompt chain:

STEP 1 — GENERATE: Write the summary.

STEP 2 — CHALLENGE: Re-read the summary as a skeptical
reviewer. For each sentence, ask: "Is this definitely
true?" Mark any sentence you're less than 90% confident
about with [REVIEW NEEDED].

STEP 3 — REVISE: Rewrite the summary, fixing or removing
any [REVIEW NEEDED] sentences. Add a final confidence
score (0-100%) for the revised version.

Show me the output of all three steps.
```

**What changed:** The upgrade replaces a passive checklist with an active **3-step prompt chain** (Generate → Challenge → Revise). Instead of just checking boxes, the AI actively attacks its own output, flags weak claims, and produces a revised version. This is the **3R Loop** (Request, Review, Refine) applied to hallucination prevention.

---

## SEC-09: 🧪 Guided Practice

1. **Pick any factual topic** you recently asked AI about — something for coursework, a project, or general knowledge.
2. **Ask AI to write a short summary** (100–200 words) without any verification step. Read the output and try to spot errors yourself.
3. **Now re-prompt with the 3-step prompt chain** (Generate → Challenge → Revise). Compare the two outputs and note which errors the chain caught that you missed.

**Your task:** Run the 3-step prompt chain on a topic from your current semester. Submit all three steps (Generate, Challenge, Revise) and highlight at least one claim that was corrected or removed during the process.

---

## SEC-10: 🏋️ Challenge

**5-minute challenge:**

You're preparing a one-page fact sheet about Python for a college workshop. Use AI to generate 8 quick facts about Python (history, features, usage stats). Then write a verification prompt that:

- Runs the 5-step checklist on all 8 facts
- Flags any fact the AI is less than 90% confident about
- Produces a final "verified" version with a confidence score
- Lists which facts were corrected and why

---

## SEC-11: ✅ Checklist

Before using any AI-generated factual content:

- [ ] I ran the output through the 5-step verification checklist (Dates, Names, Technical, Cause/Effect, Scope)
- [ ] I asked the AI to self-challenge its own output and flag weak claims
- [ ] I checked that specific numbers, dates, and names are accurate (or at least flagged as uncertain)
- [ ] I have a final confidence score and understand which parts still need independent verification

---

## SEC-12: 📚 What You Learned

1. **Hallucinations follow patterns.** The most common types are wrong dates/numbers, incorrect technical details, and overgeneralized claims. The 5-step checklist targets these systematically.
2. **Self-verification catches real errors.** When you ask AI to challenge its own output, it often identifies and corrects mistakes it made in the first pass.
3. **The Generate → Challenge → Revise chain is reusable.** You can apply this 3-step pattern to any factual content — reports, study notes, code explanations, or presentation prep. It works the same way every time.

---

## SEC-13: ❓ Mini Quiz

**Q1:** You run the 5-step checklist and all items come back with green checkmarks. Does this guarantee the output is 100% accurate?

**A1:** No. The checklist reduces risk significantly, but AI can still be confidently wrong about things it "believes" are true. The checklist catches the most common hallucination types, but critical claims should still be independently verified using reliable external sources.

---

**Q2:** What is the advantage of the 3-step prompt chain (Generate → Challenge → Revise) over a simple checklist?

**A2:** A checklist passively confirms or denies. The 3-step chain actively forces the AI to attack its own output, find weaknesses, and produce a corrected version. It's the difference between proofreading (checklist) and peer review (prompt chain) — the chain produces a better final output, not just a list of issues.

---

## SEC-14: 💬 One-Line Takeaway

> Don't just ask AI for answers — ask it to prove its answers are right, then check the proof.
