# 📋 Lesson: Prompt Versioning

## SEC-00 · Lesson ID

| Field | Value |
|-------|-------|
| Lesson ID | M3-L4 |
| Module | M3 - Debugging and Refinement |
| Difficulty | Intermediate |
| Time | 10–15 minutes |

---

## SEC-01 · 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Track prompt improvements systematically using version numbers (v1, v2, v3)
- 🎯 Write a changelog that explains what changed and why between prompt versions
- 🎯 Compare prompt versions side by side to identify which changes had the biggest impact

---

## SEC-02 · Use Case

You've tweaked a prompt five times and finally got a great result. But can you remember what you changed? Could you reproduce it? Could you apply the same fixes to a different prompt?

Prompt versioning is how professionals manage prompts in real projects. If you're building a study assistant, a code reviewer, or a project chatbot, you need to track which version of the prompt works best and why. This is also essential when working in teams - you can't share "I changed some stuff and it worked" with a teammate. Version numbers and changelogs give you a clear history.

---

## SEC-03 · ❌ Bad Prompt

```
Summarize this article for me.

[tweaks prompt randomly]

Summarize this article in bullet points.

[tweaks again]

Give me a short summary of this article with key points.
```

---

## SEC-04 · Bad Output

```
[After 3 random tweaks, the user has no record of what they changed.
The last output is okay but they can't explain why it's better than
the first attempt or reproduce their process for a different article.]
```

---

## SEC-05 · Why It Failed

- **No version tracking** - Each tweak overwrites the previous one mentally. There's no record of what v1, v2, or v3 looked like.
- **No changelog** - The user can't explain what they changed between versions or why.
- **No comparison** - Without side-by-side versions, there's no way to measure improvement or identify which change made the difference.

---

## SEC-06 · ✅ Good Prompt

```
I'm developing a summarization prompt. Here is my version history:

v1: "Summarize this article for me."
Problem: Output was a 300-word paragraph with no structure.

v2: "Summarize this article in 5 bullet points, each under 20 words."
Problem: Bullet points were good but missed the article's main argument.

v3: "Summarize this article. Start with the main argument in one sentence,
then list 5 supporting points as bullet points, each under 20 words."

Generate the output for v3. Then tell me which change between v1→v2 and
v2→v3 had a bigger impact on output quality, and why.
```

---

## SEC-07 · Good Output

```
SUMMARY (v3 output):
Main argument: Remote work increases productivity but requires intentional
communication practices to avoid team isolation.

Supporting points:
• Studies show 13% productivity gain for remote workers
• Unstructured communication drops by 40% without daily standups
• Async tools like Slack reduce meeting time by 25%
• Employee satisfaction rises but loneliness increases after 3 months
• Hybrid models (3 office / 2 remote) show the best retention rates

VERSION IMPACT ANALYSIS:
- v1→v2 impact: HIGH. Adding bullet points and word limits transformed a
  wall of text into a scannable format. This was the biggest structural fix.
- v2→v3 impact: MEDIUM. Adding "main argument first" ensured the summary
  had a clear thesis. Without it, the bullets lacked a unifying thread.
```

---

## SEC-08 · 🚀 Upgrade Prompt

```
I track my prompts using versions. Here is my full version history:

| Version | Prompt | Change Made | Reason |
|---------|--------|-------------|--------|
| v1 | "Summarize this article." | (baseline) | First attempt |
| v2 | "Summarize in 5 bullet points, each under 20 words." | Added format + length constraint | v1 output was unstructured and too long |
| v3 | "Start with main argument, then 5 bullets under 20 words." | Added thesis-first structure | v2 bullets lacked a unifying point |

Task:
1. Generate the v3 output for the article below.
2. Rate each version's expected output quality (1-10) and justify.
3. Suggest a v4 improvement and explain what it would fix.

Article: [paste article here]
```

**What changed:** The upgrade uses a version comparison table that documents every change, its rationale, and its impact. It also asks the AI to rate each version and propose the next improvement. This turns versioning from a passive log into an active optimization tool.

---

## SEC-09 · 🧪 Guided Practice

Try this yourself:

1. **Write v1** - Start with a simple prompt: "Explain what a REST API is."
2. **Log and improve** - Run it, note what's wrong, then create v2 with a specific fix. Write down: version number, what you changed, and why.
3. **Create v3** - Review v2's output, find another issue, and create v3. Maintain your changelog.

**Your task:** After three versions, create a table like this and fill it in:

| Version | Prompt (first 10 words) | What Changed | Quality (1-10) |
|---------|------------------------|--------------|----------------|
| v1 | | (baseline) | |
| v2 | | | |
| v3 | | | |

---

## SEC-10 · 💡 Challenge

**5-minute challenge:**

You need a prompt that generates practice interview questions for a software developer role. Start from scratch and create 3 versions:

- **v1:** Your first instinct (keep it simple)
- **v2:** Fix the biggest problem with v1's output
- **v3:** Add one advanced feature (difficulty levels, topic tags, or model answers)

Write a 3-row changelog table. For each version, note: what changed, why, and rate the output quality from 1-10.

---

## SEC-11 · ✅ Checklist

Before moving on, confirm you can do the following:

- [ ] I can track prompt versions using v1, v2, v3 labels
- [ ] I write a changelog entry for every prompt change (what changed + why)
- [ ] I can compare two versions and identify which change had the most impact
- [ ] I can suggest a next version improvement based on the current version's weaknesses

---

## SEC-12 · 📘 What You Learned

1. **Version numbers create accountability** - Labeling prompts v1, v2, v3 forces you to be intentional about changes instead of randomly tweaking words.
2. **Changelogs capture knowledge** - Writing down what you changed and why turns trial-and-error into a reusable learning record.
3. **Comparison reveals impact** - A side-by-side version table shows which changes matter most, so you can apply the same patterns to future prompts.

---

## SEC-13 · ❓ Mini Quiz

**Q1:** You've improved a prompt three times but didn't track versions. A teammate asks "What changes made the biggest difference?" Can you answer? What should you have done?

**A1:** You probably can't answer accurately - memory of small prompt tweaks fades fast. You should have labeled each version (v1, v2, v3), noted what changed and why, and rated the output quality. A simple table would let you point to the exact change that helped most.

**Q2:** Your v2 prompt is worse than v1. Should you go back to v1 or try a v3?

**A2:** Go back to v1 as your base and try a different change for v3. This is why versioning matters - you can always revert. Without version tracking, you might not even remember what v1 said. Note in your changelog: "v2 - added X - made output worse, reverted."

---

## SEC-14 · 💬 One-Line Takeaway

> Number your prompts, log your changes - what you can track, you can improve.
