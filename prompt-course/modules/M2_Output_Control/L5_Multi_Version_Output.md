# SEC-00: Lesson ID

**M2-L5 — Multi-Version Output**
- **Module:** M2 – Output Control
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Get multiple distinct versions of the same content in a single prompt
- 🎯 Control the tone, style, and audience for each version
- 🎯 Add evaluation criteria so you can pick the best version objectively

---

# SEC-02: 💡 Use Case

Multi-version output is useful when:

- **Projects:** You need a formal bio for your portfolio AND a casual one for social media
- **Placements:** You want to see your "Tell me about yourself" answer in 3 different tones before an interview
- **Studying:** You want the same concept explained simply, technically, and as an analogy to compare which sticks
- **Coding:** You need a function docstring in 3 styles — minimal, standard, and verbose

Instead of prompting three times and losing context, you get everything in one shot.

---

# SEC-03: ❌ Bad Prompt

```
Write a bio for me. I'm a CS student who knows Python and React and
I'm looking for internships.
```

---

# SEC-04: ❌ Bad Output

```
I am a passionate computer science student with hands-on experience in
Python and React. I love building web applications and solving complex
problems. Currently, I am seeking internship opportunities where I can
apply my technical skills and grow as a developer. I am a team player
with strong communication skills and a desire to learn.
```

---

# SEC-05: 🔍 Why It Failed

- **Only one version.** You got a single generic bio. If you don't like the tone, you have to prompt again.
- **No tone control.** The AI picked a safe, bland tone by default.
- **No way to compare.** With only one output, you can't evaluate alternatives and pick the strongest.

---

# SEC-06: ✅ Good Prompt

```
Write 3 versions of a professional bio for me.

About me: CS student, 3rd year, skilled in Python and React, built 2 
full-stack projects, looking for backend internships.

Version 1 — Formal: For a LinkedIn profile. Professional tone, third person.
Version 2 — Conversational: For a personal website. Friendly, first person.
Version 3 — Minimal: For a GitHub profile. Under 25 words, direct.

Label each version clearly.
```

---

# SEC-07: ✅ Good Output

```
**Version 1 — Formal:**
Aarav is a third-year Computer Science student with proficiency in Python
and React. He has developed two full-stack applications and is actively
seeking backend engineering internship opportunities.

**Version 2 — Conversational:**
Hey! I'm a CS student in my third year who loves building things with
Python and React. I've shipped two full-stack projects so far, and now
I'm looking for a backend internship to level up.

**Version 3 — Minimal:**
CS student. Python & React. 2 full-stack projects. Seeking backend internships.
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Write 3 versions of a professional bio for me.

About me: CS student, 3rd year, skilled in Python and React, built 2 
full-stack projects, looking for backend internships.

Version 1 — Formal: LinkedIn profile. Professional, third person, 2-3 sentences.
Version 2 — Conversational: Personal website. Friendly, first person, 2-3 sentences.
Version 3 — Minimal: GitHub profile. Under 25 words, no filler.

After all 3 versions, add an evaluation table:
| Criteria         | Version 1 | Version 2 | Version 3 |
Criteria rows: Tone Match, Memorability, Word Count, Best Used For.

Rate Tone Match and Memorability as Low / Medium / High.
```

**What changed:**
- Added an evaluation table at the end so you can compare versions objectively
- Defined specific criteria (Tone Match, Memorability, Word Count, Best Used For)
- Used a rating scale (Low/Medium/High) to make comparison easy
- Keeps everything in a single prompt — three bios plus analysis

---

# SEC-09: 🛠️ Guided Practice

Follow these steps:

1. **Pick content to multi-version.** Choose something you actually need — maybe an email, a project description, or an "about me" section.
2. **Define 3 tones.** Examples: formal vs. casual vs. humorous, or beginner-friendly vs. technical vs. analogy-based.
3. **Add an evaluation section.** After the three versions, ask for a comparison table with at least 3 criteria.

**Your task:** Run your prompt. Read the evaluation table. Does it help you pick the best version? If the table feels generic, add more specific criteria (e.g., "Interview Impact" or "Readability Score 1-10").

---

# SEC-10: 🏆 Challenge

**5-minute challenge:**

You're preparing for a placement interview. Write a prompt that generates 3 versions of your answer to "Why should we hire you?"

- **Version A:** Confident and assertive (for a startup)
- **Version B:** Structured and metric-driven (for a large company)
- **Version C:** Story-based and personal (for a culture-fit round)

Each version must be 3-4 sentences. After the versions, include an evaluation table rating: Confidence Level, Specificity, Memorability, and Best Suited For.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I requested 3 distinct versions with clearly different tones or styles
- [ ] Each version had a label, target audience, and length constraint
- [ ] I included an evaluation table or comparison section after the versions
- [ ] I can use the comparison to objectively pick the best version for my need

---

# SEC-12: 📚 What You Learned

1. Asking for multiple versions in one prompt saves time and gives you options to compare.
2. Defining tone, audience, and length for each version ensures they are genuinely different, not just rephrased.
3. Adding an evaluation table at the end turns a creative task into a structured decision.

---

# SEC-13: ❓ Mini Quiz

**Q1:** You ask for "3 different versions" but all three come back sounding almost the same. What went wrong?

**A1:** You didn't define how they should differ. Each version needs a distinct tone, audience, or style instruction (e.g., "formal third person" vs. "casual first person" vs. "minimal, under 25 words"). Without clear differentiation rules, the AI produces slight variations of the same thing.

**Q2:** Why is an evaluation table useful when generating multiple versions?

**A2:** It gives you objective criteria to compare versions instead of relying on gut feeling. Criteria like Tone Match, Word Count, and Best Used For make it easy to pick the right version for your specific context.

---

# SEC-14: 💬 One-Line Takeaway

> Don't settle for one draft — ask for three versions with different tones, then let the AI help you pick the best one.
