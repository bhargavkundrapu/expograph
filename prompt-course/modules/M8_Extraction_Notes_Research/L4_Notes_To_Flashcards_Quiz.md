# SEC-00: Lesson ID

**M8-L4 — Notes to Flashcards & Quiz**
- **Module:** M8 – Extraction, Notes & Research
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Turn study notes into well-structured flashcards with clear Q&A format
- 🎯 Generate quiz questions at multiple difficulty levels with topic tags
- 🎯 Add spaced repetition hints and distractor options to make revision more effective

---

# SEC-02: 💡 Use Case

You have pages of notes. Exams are next week. You need flashcards and quiz questions — fast.

- **Exam prep:** Convert lecture notes into flashcards you can review on your phone
- **Study groups:** Generate quiz questions to test your friends before a test
- **Coding practice:** Turn documentation notes into Q&A cards for memorizing syntax or concepts

Manually creating flashcards takes hours. AI does it in seconds — if you prompt it right.

---

# SEC-03: ❌ Bad Prompt

```
Make flashcards from my notes on operating systems.

Notes:
A process is a program in execution. It has states: new, ready,
running, waiting, terminated. A thread is a lightweight process that
shares memory with other threads. Context switching is when the OS
saves the state of one process and loads another. It is expensive
because it involves saving registers, memory maps, and other state.
Deadlock occurs when two or more processes wait for each other to
release resources, and none can proceed.
```

---

# SEC-04: ❌ Bad Output

```
Flashcard 1: What is a process? - A program in execution.
Flashcard 2: What is a thread? - A lightweight process.
Flashcard 3: What is context switching? - Saving and loading process state.
Flashcard 4: What is deadlock? - When processes wait for each other.
```

---

# SEC-05: 🔍 Why It Failed

- **No format structure.** Each card is a flat line. Real flashcard apps need clear "Front" and "Back" fields.
- **No difficulty levels.** All cards are basic recall. None test understanding or application.
- **Answers are too shallow.** "A lightweight process" doesn't help you actually learn what a thread does or why it matters.

---

# SEC-06: ✅ Good Prompt

```
Convert the following notes into 6 flashcards.

Format each flashcard as:
- Front: A clear question
- Back: A complete answer in 1–2 sentences
- Difficulty: Easy, Medium, or Hard
- Topic: A short tag (e.g., "Processes", "Threads")

Rules:
- 2 Easy cards (basic definitions)
- 2 Medium cards (explain "why" or "how")
- 2 Hard cards (compare, contrast, or apply concepts)

Notes:
A process is a program in execution. It has states: new, ready,
running, waiting, terminated. A thread is a lightweight process that
shares memory with other threads. Context switching is when the OS
saves the state of one process and loads another. It is expensive
because it involves saving registers, memory maps, and other state.
Deadlock occurs when two or more processes wait for each other to
release resources, and none can proceed.
```

---

# SEC-07: ✅ Good Output

```
**Flashcard 1**
- Front: What is a process in operating systems?
- Back: A process is a program in execution. It moves through five
  states: new, ready, running, waiting, and terminated.
- Difficulty: Easy
- Topic: Processes

**Flashcard 2**
- Front: What is a thread, and how does it differ from a process?
- Back: A thread is a lightweight unit of execution within a process.
  Unlike separate processes, threads share the same memory space.
- Difficulty: Easy
- Topic: Threads

**Flashcard 3**
- Front: Why is context switching considered expensive?
- Back: Context switching requires saving the current process's
  registers, memory maps, and state, then loading another's. This
  overhead slows down the system.
- Difficulty: Medium
- Topic: Context Switching

**Flashcard 4**
- Front: How does a process transition from "ready" to "running"?
- Back: The OS scheduler selects a ready process and loads its state
  into the CPU. This transition happens during CPU scheduling.
- Difficulty: Medium
- Topic: Processes

**Flashcard 5**
- Front: Compare a deadlock with a normal waiting state. What
  makes deadlock worse?
- Back: In a normal wait, a process waits for a resource that will
  eventually be released. In deadlock, two or more processes form
  a circular wait — none can proceed because each holds what the
  other needs.
- Difficulty: Hard
- Topic: Deadlock

**Flashcard 6**
- Front: If threads share memory, what problem can arise during
  concurrent execution?
- Back: Race conditions. Multiple threads may read and write shared
  data simultaneously, causing unpredictable results unless
  synchronization mechanisms like mutexes are used.
- Difficulty: Hard
- Topic: Threads
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Convert the following notes into 6 flashcards AND 3 multiple-choice
quiz questions.

Flashcard format:
- Front: A clear question
- Back: A complete answer (1–2 sentences)
- Difficulty: Easy / Medium / Hard
- Topic: Short tag
- Hint: A one-line clue for spaced repetition (helps if stuck)

Quiz question format:
- Question: A clear question
- A) [option]
- B) [option]
- C) [option]
- D) [option]
- Correct: [letter]
- Explanation: One sentence explaining why the correct answer is right
  and why the best distractor is wrong

Rules:
- Include 2 Easy, 2 Medium, 2 Hard flashcards
- Quiz distractors must be plausible, not obviously wrong
- Each quiz question tests a different topic

Notes:
[paste notes here]
```

**What changed:**
- Added a "Hint" field to each flashcard for spaced repetition — helps you recall without flipping the card too soon
- Added multiple-choice quiz questions with plausible distractors (wrong answers that sound right)
- Requires an explanation for each quiz answer, so you learn even from practice questions

---

# SEC-09: 📝 Guided Practice

Follow these steps:

1. **Pick a topic.** Open your most recent lecture notes or textbook chapter. Copy one paragraph with at least 4 key concepts.
2. **Write the flashcard prompt.** Ask for 4 flashcards with Front, Back, Difficulty, and Topic fields. Request 1 Easy, 2 Medium, 1 Hard.
3. **Check the output.** Read each "Back" answer. Is it complete enough to actually learn from? If not, add "Answers must be 2 sentences minimum" to your prompt.

**Your task:** Take the flashcards and paste them into a study app (Anki, Quizlet, or Notion). Do they work as-is, or do you need to edit them? The goal is zero editing needed.

---

# SEC-10: 🏆 Challenge

**5-Minute Challenge:**

Use these notes on databases:

"A primary key uniquely identifies each record in a table. A foreign key links one table to another. Normalization reduces data redundancy by organizing tables. An index speeds up queries but slows down inserts. SQL stands for Structured Query Language."

Write one prompt that produces:
- 4 flashcards (1 Easy, 2 Medium, 1 Hard) with Front, Back, Difficulty, Topic, and Hint
- 2 multiple-choice quiz questions with 4 options each, a correct answer, and an explanation

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I defined a clear flashcard format with labeled fields (Front, Back, Difficulty, Topic)
- [ ] I specified a difficulty distribution (e.g., 2 Easy, 2 Medium, 2 Hard)
- [ ] I tried adding a Hint field for spaced repetition support
- [ ] I generated quiz questions with plausible distractors and explanations

---

# SEC-12: 🧠 What You Learned

- A structured flashcard prompt with labeled fields produces cards you can paste directly into study apps.
- Setting difficulty levels forces the AI to create a range of questions from recall to application.
- Hints and plausible distractors transform simple flashcards into effective revision tools.

---

# SEC-13: 📋 Mini Quiz

**Q1:** Your flashcards all have one-word answers like "Deadlock" or "Thread." What should you change?

- A) Use a different AI tool
- B) Add "Answers must be 1–2 complete sentences" to your prompt
- C) Copy more notes into the prompt

**Answer:** B — Short answers don't help you learn. Specifying sentence length forces the AI to write answers that explain the concept, not just name it.

**Q2:** Your quiz distractors are obviously wrong (e.g., "A process is a type of food"). How do you fix this?

**Answer:** Add "Distractors must be plausible and related to the topic" to your prompt. Good distractors sound like they could be right, which forces you to actually know the answer.

---

# SEC-14: ⚡ One-Line Takeaway

> Define your flashcard fields, set difficulty levels, and the AI will turn any notes into exam-ready revision material.
