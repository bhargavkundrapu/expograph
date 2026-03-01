# 🔎 Verification Prompts

## SEC-00: Lesson ID

| Field      | Value                        |
|------------|------------------------------|
| Lesson ID  | M4-L2                       |
| Module     | M4 — Truthfulness & Reliability |
| Difficulty | Intermediate                 |
| Time       | 10–15 minutes                |

---

## SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Write prompts that force AI to cite sources for every claim it makes
- 🎯 Add a self-verification step where AI fact-checks its own output
- 🎯 Distinguish between sourced facts and AI-generated reasoning in any output

---

## SEC-02: 💡 Use Case

You're writing a technical blog post about quantum computing for your college magazine. You ask AI for an overview, and it gives you five paragraphs of fluent, confident text. You publish it. A reader comments that two of the "facts" are completely wrong.

This happens all the time in study notes, project reports, and placement prep answers. AI mixes real facts with plausible-sounding inventions, and there's no way to tell them apart — unless you ask the AI to show its work. Verification prompts make AI accountable by forcing it to back up claims or flag them as uncertain.

---

## SEC-03: ❌ Bad Prompt

```
Tell me about quantum computing.
```

---

## SEC-04: ❌ Bad Output

```
Quantum computing uses qubits that can exist in multiple
states simultaneously through superposition. IBM's 1000-qubit
Condor processor, released in 2023, achieved quantum supremacy
on all classical benchmarks. Quantum computers can break all
existing encryption in seconds. They are expected to replace
classical computers entirely by 2030.
```

---

## SEC-05: 🔍 Why It Failed

- **No source requirement.** The prompt didn't ask for citations, so the AI mixed real concepts (superposition) with exaggerated or false claims (breaking all encryption "in seconds").
- **No separation between fact and speculation.** Claims about the future ("replace classical computers by 2030") are presented with the same confidence as established physics.
- **No self-check.** The AI never reviewed its own output, so errors went undetected.

---

## SEC-06: ✅ Good Prompt

```
Explain the current state of quantum computing in 5 key points.

For each point:
- State the claim clearly
- Provide the source (paper, company announcement, or
  well-known reference) that supports it
- If you cannot find a source, mark it as [UNSOURCED]
```

---

## SEC-07: ✅ Good Output

```
1. Qubits use superposition to represent 0 and 1 simultaneously.
   Source: Nielsen & Chuang, "Quantum Computation and Quantum
   Information" (Cambridge University Press, 2000)

2. IBM released the 1,121-qubit Condor processor in December 2023.
   Source: IBM Newsroom, "IBM Unveils Condor," Dec 2023

3. Google's Sycamore processor demonstrated quantum supremacy on
   a specific sampling task in 2019.
   Source: Arute et al., Nature, Vol 574, Oct 2019

4. Current quantum computers are NOT capable of breaking modern
   encryption standards like AES-256 in practice.
   Source: NIST Post-Quantum Cryptography project documentation

5. Quantum computers are expected to complement, not replace,
   classical computers for the foreseeable future.
   [UNSOURCED] — this is a widely held expert opinion but I
   cannot point to a single definitive source.
```

---

## SEC-08: 🚀 Upgrade Prompt

```
Explain the current state of quantum computing in 5 key points.

For each point:
- State the claim clearly
- Provide the source (paper, company announcement, or
  well-known reference)
- If no source, mark as [UNSOURCED]

After listing all 5 points, add a "Fact-Check Review" section
where you re-examine each claim and flag any that might be
outdated, exaggerated, or commonly misunderstood.
```

**What changed:** The upgrade adds a **3R Loop (Request → Review → Refine)** structure. After generating the initial output (Request), the AI reviews its own claims (Review) and corrects or qualifies them (Refine). This catches errors that slip through even with source requirements.

---

## SEC-09: 🧪 Guided Practice

1. **Pick a topic you're currently studying** — something technical where accuracy matters (e.g., "How does TCP/IP handle packet loss?" or "What is the time complexity of Dijkstra's algorithm?").
2. **Ask AI without any verification requirement.** Read the output and try to spot any claims that feel vague or suspiciously confident.
3. **Re-ask with the source-citation format and the fact-check review step.** Compare how the output changes.

**Your task:** Write a verification prompt about a topic from your current semester. Include source requirements and a fact-check review section. Submit both the prompt and the AI's output.

---

## SEC-10: 🏋️ Challenge

**5-minute challenge:**

You're helping a friend prepare for a placement interview at a fintech company. They ask you to use AI to generate 5 facts about UPI (Unified Payments Interface) in India. Write a prompt that:

- Asks for 5 specific facts about UPI
- Requires a source for each fact
- Marks unsourced claims with [UNSOURCED]
- Ends with a self-review section where the AI checks if any stat might be outdated

---

## SEC-11: ✅ Checklist

Before trusting any AI-generated factual content, verify:

- [ ] Every factual claim has a cited source or is marked [UNSOURCED]
- [ ] I can distinguish between established facts and AI reasoning/speculation
- [ ] I included a fact-check review step in the prompt
- [ ] I plan to independently verify at least the most critical claims

---

## SEC-12: 📚 What You Learned

1. **AI mixes facts and fabrications seamlessly.** Without source requirements, there is no visual difference between a real fact and an invented one.
2. **Asking for sources forces the AI to be more careful.** When required to cite, the AI tends to stick to claims it can actually back up and flag the rest.
3. **A self-review step catches additional errors.** Having the AI re-examine its own output adds a second layer of quality control before you use the information.

---

## SEC-13: ❓ Mini Quiz

**Q1:** You get an AI output that says "React was created by Facebook in 2013 [Source: React GitHub repository]." Should you trust this?

**A1:** It's a good sign that a source is cited, but you should still verify. Check the React GitHub repo or Wikipedia to confirm. The citation makes it easier to verify — that's the point. (In this case, the claim is accurate.)

---

**Q2:** What's the purpose of the fact-check review step at the end of a verification prompt?

**A2:** It forces the AI to re-read its own output with a critical eye. This second pass often catches exaggerations, outdated stats, or claims that seemed fine during generation but don't hold up under review.

---

## SEC-14: 💬 One-Line Takeaway

> If AI can't tell you where it learned something, you shouldn't assume it learned it at all.
