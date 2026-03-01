# 🪞 Lesson: Self-Critique Prompts

## SEC-00 · Lesson ID

| Field | Value |
|-------|-------|
| Lesson ID | M3-L3 |
| Module | M3 — Debugging and Refinement |
| Difficulty | Intermediate |
| Time | 10–15 minutes |

---

## SEC-01 · 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Ask the AI to evaluate and critique its own response before you accept it
- 🎯 Design self-critique prompts that surface hidden errors and weaknesses
- 🎯 Use a scoring rubric to get the AI to rate and then improve its own output

---

## SEC-02 · Use Case

You get a response from an AI and it looks fine at first glance. But is it actually good? You might not have the expertise to spot subtle errors, especially in technical topics.

Self-critique prompts solve this by making the AI act as its own reviewer. This is powerful for study notes (are they accurate?), coding solutions (are there edge cases?), project reports (is the logic sound?), and placement answers (would this impress an interviewer?). Instead of trusting blindly, you build a second layer of quality control into every interaction.

---

## SEC-03 · ❌ Bad Prompt

```
Explain the difference between TCP and UDP.
```

---

## SEC-04 · Bad Output

```
TCP is a connection-oriented protocol that ensures reliable data delivery.
UDP is a connectionless protocol that is faster but less reliable.
TCP uses a three-way handshake. UDP does not.
TCP is used for web browsing and email. UDP is used for streaming and gaming.
```

---

## SEC-05 · Why It Failed

- **No quality check** — The user accepted this at face value. The explanation is correct but shallow. It doesn't explain *why* TCP is reliable or *when* you'd choose one over the other.
- **Surface-level answer** — Without asking for depth, the AI gave a textbook-minimum response that wouldn't help in an exam or interview.
- **No self-review** — The user never asked the AI to check whether its own answer was complete, accurate, or useful.

---

## SEC-06 · ✅ Good Prompt

```
Explain the difference between TCP and UDP in a way that would score well
in a networking exam.

After your explanation, critique your own response:
- What did you explain well?
- What's missing or oversimplified?
- What would a professor mark as incomplete?

Then rewrite an improved version that fixes every issue you found.
```

---

## SEC-07 · Good Output

```
[Initial explanation of TCP vs UDP — covers handshake, reliability, ordering, use cases]

SELF-CRITIQUE:
- Well explained: basic differences and handshake concept
- Missing: no mention of flow control, congestion control, or packet ordering in TCP
- Oversimplified: said UDP is "less reliable" without explaining what "unreliable"
  means technically (no guaranteed delivery, no ordering, no retransmission)
- Incomplete for exam: didn't include header size comparison or real protocol examples
  (HTTP/HTTPS for TCP, DNS/VoIP for UDP)

IMPROVED VERSION:
TCP (Transmission Control Protocol) is connection-oriented. Before data transfer,
it establishes a connection using a 3-way handshake (SYN → SYN-ACK → ACK). It
guarantees reliable, ordered delivery through sequence numbers, acknowledgments,
flow control (sliding window), and congestion control. Header size: 20 bytes.
Used by: HTTP, HTTPS, FTP, SMTP.

UDP (User Datagram Protocol) is connectionless. It sends packets (datagrams)
without establishing a connection. No delivery guarantee, no ordering, no
retransmission. Header size: 8 bytes. Used by: DNS, VoIP, video streaming, gaming.

Choose TCP when data integrity matters. Choose UDP when speed matters more than
perfect delivery.
```

---

## SEC-08 · 🚀 Upgrade Prompt

```
Explain the difference between TCP and UDP for a networking exam.

After your answer, score yourself using this rubric (1-5 for each):
| Criterion      | Score | Justification |
|----------------|-------|---------------|
| Accuracy       |       |               |
| Completeness   |       |               |
| Clarity        |       |               |
| Exam-readiness |       |               |

Rules:
- Be harsh. A 5 means a professor would use your answer as a model answer.
- Any score below 4 means you MUST rewrite that part.
- After scoring, produce a final improved version that scores 4+ on everything.
```

**What changed:** The upgrade replaces vague self-critique ("what's missing?") with a structured scoring rubric. The AI must assign a number, justify it, and fix anything that scores below 4. This forces deeper self-evaluation and produces consistently better outputs.

---

## SEC-09 · 🧪 Guided Practice

Try this yourself:

1. **Ask without critique** — Send this prompt: "Explain what an API is and give an example." Save the response.
2. **Add self-critique** — Now send: "Critique your previous answer. What's missing? What would confuse a beginner? Rate its clarity from 1-5 and justify the score."
3. **Request improvement** — Send: "Now rewrite your answer fixing everything you identified. Target a 5/5 on clarity."

**Your task:** Compare your original answer to the final version. List 3 specific improvements that the self-critique process produced.

---

## SEC-10 · 💡 Challenge

**5-minute challenge:**

Use self-critique to improve a placement interview answer. Start with:

```
Answer this interview question: "What is the difference between a stack and a queue?"
```

Then add a self-critique prompt that includes:
- A 4-criterion rubric (Accuracy, Depth, Example Quality, Interview Impact)
- A rule that any criterion below 4 must be rewritten
- A request for the final improved answer

Compare the first and final answers. Could you use this self-critique technique for other interview questions?

---

## SEC-11 · ✅ Checklist

Before moving on, confirm you can do the following:

- [ ] I can write a prompt that asks the AI to critique its own output
- [ ] I can design a scoring rubric with clear criteria and thresholds
- [ ] I understand why self-critique produces better results than accepting the first answer
- [ ] I can combine self-critique with the 3R Loop from the previous lesson

---

## SEC-12 · 📘 What You Learned

1. **AI can review itself** — By explicitly asking the AI to critique its own output, you surface errors and gaps that you might miss, especially in unfamiliar topics.
2. **Rubrics force rigor** — A numbered scoring rubric (1-5) with named criteria produces more honest and actionable self-critique than an open-ended "what's wrong?"
3. **Critique + rewrite = one prompt** — The most efficient pattern is: answer, then critique, then improved answer — all in a single prompt. This gets you a better result in one shot.

---

## SEC-13 · ❓ Mini Quiz

**Q1:** Why is "Critique your answer" less effective than providing a rubric with specific criteria?

**A1:** "Critique your answer" is vague — the AI might mention one or two surface-level issues. A rubric with specific criteria (accuracy, completeness, clarity) forces the AI to evaluate each dimension separately, making it harder to skip over weaknesses.

**Q2:** You ask an AI to score itself on a coding explanation and it gives itself 5/5 on everything. What should you do?

**A2:** Add a constraint like "A score of 5 means a senior developer would use this as documentation. Be strict — most answers deserve a 3 or 4." You can also ask it to justify each score with evidence. AI tends to be generous with self-ratings unless you explicitly ask it to be critical.

---

## SEC-14 · 💬 One-Line Takeaway

> Don't just ask the AI for an answer — ask it to grade its own answer, then beat that grade.
