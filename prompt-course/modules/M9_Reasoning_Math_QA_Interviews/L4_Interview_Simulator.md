# Lesson: Interview Simulator - Your 24/7 Mock Interview Partner

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                                      |
|------------|--------------------------------------------|
| Lesson ID  | M9-L4                                      |
| Module     | M9 - Reasoning, Math, QA & Interviews      |
| Difficulty | Intermediate                               |
| Time       | 10–15 minutes                              |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Use the CRAFTED framework to set up a realistic AI interview simulation
- 🎯 Simulate different interview rounds (HR, technical, behavioral)
- 🎯 Add follow-up questions and performance scoring for deeper practice

---

<!-- SEC-02 -->
## 💡 Use Case

Placement season is here and you need mock interview practice. Finding a human partner at midnight is hard. The AI can play the role of an interviewer - asking questions, pressing with follow-ups, and scoring your answers - if you set it up correctly. Use this for campus placements, internship interviews, or any job prep.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Prepare me for an interview.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Sure! Here are some tips for interview preparation:
1. Research the company beforehand.
2. Practice common questions like "Tell me about yourself."
3. Dress professionally.
4. Arrive on time.
5. Prepare questions to ask the interviewer.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No role assigned** - the AI gave generic tips instead of acting as an interviewer.
- **No context** - it does not know your field, experience level, or the type of interview.
- **No interaction** - you got a tips list, not an actual mock interview you can practice with.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Clear objective: Simulate a technical interview for a software
engineering internship.

Role: You are a senior engineer at a mid-size product company.
You are conducting a 30-minute technical round.

Added context: I am a third-year CS student. I know Python, SQL,
and basic data structures.

Format: Ask me one question at a time. Wait for my answer before
asking the next question.

Task breakdown:
- Start with 1 easy warm-up question
- Then ask 2 medium data structure questions
- Then ask 1 hard problem-solving question

Examples: Questions should be similar to what Infosys, TCS, or
Wipro ask in campus placements.

Desired depth: Keep questions practical, not theoretical definitions.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Welcome! I'm your interviewer today. Let's get started.

Question 1 (Warm-up):
You have a list of integers in Python. How would you find the
second largest number without using the built-in sort function?

Take your time. Type your answer when you're ready.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Clear objective: Simulate a technical interview for a software
engineering internship.

Role: You are a senior engineer at a mid-size product company.
You are conducting a 30-minute technical round.

Added context: I am a third-year CS student. I know Python, SQL,
and basic data structures.

Format: Ask me one question at a time. Wait for my answer before
asking the next question.

Task breakdown:
- Start with 1 easy warm-up question
- Then ask 2 medium data structure questions
- Then ask 1 hard problem-solving question

Follow-up rule: After each of my answers, ask one follow-up
question that probes deeper or challenges my approach.

Scoring: After all questions, rate my performance out of 10 in
three categories: correctness, communication, problem-solving
approach. Give one specific tip for improvement.

Examples: Questions should be similar to what Infosys, TCS, or
Wipro ask in campus placements.

Desired depth: Keep questions practical, not theoretical definitions.
```

**What changed:** We added a follow-up rule and a scoring rubric. Now the AI does not just accept your answer - it pushes deeper like a real interviewer, then gives you a score and actionable feedback at the end.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Copy the good prompt above and paste it into your AI tool.
2. Answer the first question the AI asks. Notice how it waits for you before moving on.
3. After 2–3 questions, check: Is the AI staying in character as an interviewer?

**Your task:** Modify the good prompt to simulate an HR round instead of a technical round. Change the role to "HR manager," change the task breakdown to include questions like "Tell me about yourself," "Why this company?", and "Describe a challenge you faced." Keep the one-at-a-time format.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You have a final-round interview tomorrow at a startup. The round mixes behavioral and technical questions.

Write a CRAFTED prompt that:
- Sets the AI as a startup CTO doing a mixed round
- Asks 2 behavioral questions and 2 technical questions
- Uses follow-ups after each answer
- Scores you on correctness, communication, and culture fit at the end

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I can use CRAFTED to set up a realistic interview simulation
- [ ] The AI asks one question at a time and waits for my answer
- [ ] I tried follow-up questions and got deeper probing
- [ ] I received a performance score with specific feedback

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Assigning a role and round type turns the AI from a tips generator into an actual interviewer.
2. "Ask one question at a time. Wait for my answer." creates a real back-and-forth conversation.
3. Follow-up questions and scoring make the simulation feel like a real interview with actionable feedback.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You want the AI to act as an interviewer but it keeps giving you tips instead. What is most likely missing from your prompt?

- A) A format instruction
- B) A role assignment telling the AI to be the interviewer
- C) A word count limit

> **A1:** B - Without a clear role ("You are a senior engineer conducting an interview"), the AI defaults to giving advice instead of asking questions.

**Q2:** Why should you include "Ask one question at a time. Wait for my answer." in an interview simulation prompt?

> **A2:** Without it, the AI dumps all questions at once, which kills the interactive back-and-forth that makes mock interviews effective practice.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Give the AI a role, a round type, and a wait instruction - and you have a mock interviewer available 24/7.
