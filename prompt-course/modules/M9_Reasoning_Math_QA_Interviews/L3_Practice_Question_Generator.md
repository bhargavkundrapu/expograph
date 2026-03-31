# Lesson: Practice Question Generator - Unlimited Drills on Any Topic

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                                      |
|------------|--------------------------------------------|
| Lesson ID  | M9-L3                                      |
| Module     | M9 - Reasoning, Math, QA & Interviews      |
| Difficulty | Intermediate                               |
| Time       | 10–15 minutes                              |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a prompt that generates practice questions with controlled topic, difficulty, and count
- 🎯 Specify the output format so questions come with an answer key
- 🎯 Add progressive difficulty and topic mixing for realistic exam simulation

---

<!-- SEC-02 -->
## 💡 Use Case

Exams are coming and you have run out of practice questions. Textbooks repeat the same problems. Previous-year papers are limited. With the right prompt, the AI becomes an unlimited question bank - customized to your syllabus, your difficulty level, and your preferred format. Use this for exam prep, competitive tests, or daily revision.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Give me some questions on data structures.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
1. What is a data structure?
2. Explain the difference between an array and a linked list.
3. What is a stack?
4. Define a queue.
5. What are the types of trees in data structures?
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No difficulty level** - the AI gave basic definition questions, not the problem-solving type you need for exams.
- **No format specified** - you got open-ended questions with no answer key, so you cannot self-check.
- **No count or scope** - "some questions" is vague. The AI picked 5 easy ones and stopped.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Generate 5 multiple-choice questions on stacks and queues.

Rules:
- Difficulty: Medium (application-level, not just definitions)
- Each question has 4 options (A, B, C, D)
- Mark the correct answer after each question
- Add a one-line explanation for the correct answer
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Q1: What is the output when you push 1, 2, 3 onto a stack
    and then pop twice?
    A) 1, 2    B) 3, 2    C) 2, 3    D) 3, 1
    Answer: B - A stack is LIFO, so the last pushed (3) is
    popped first, then 2.

Q2: Which data structure is used in BFS traversal of a graph?
    A) Stack    B) Queue    C) Array    D) Tree
    Answer: B - BFS uses a queue to process nodes level by level.

Q3: You insert elements 10, 20, 30 into a queue and dequeue
    once. What is at the front now?
    A) 10    B) 20    C) 30    D) Queue is empty
    Answer: B - A queue is FIFO. After dequeuing 10, the
    front becomes 20.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Generate 8 multiple-choice questions mixing stacks, queues,
and linked lists.

Rules:
- Start with 3 easy questions, then 3 medium, then 2 hard
- Each question has 4 options (A, B, C, D)
- Mark the correct answer after each question
- Add a one-line explanation for the correct answer
- Hard questions should involve code snippets or tricky edge cases
```

**What changed:** We added progressive difficulty (easy → medium → hard) and topic mixing (three topics instead of one). This simulates a real exam paper where difficulty ramps up and topics are blended.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Pick a subject you are currently studying (e.g., DBMS, OS, or Aptitude).
2. Write a prompt asking for 5 MCQs at medium difficulty with an answer key and explanations.
3. Paste it into the AI, then check: Are the questions actually medium-level? Do the answers and explanations make sense?

**Your task:** Write a prompt that generates 6 practice questions on SQL joins - 2 easy, 2 medium, 2 hard - in MCQ format with answers and one-line explanations.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You have a placement test next week covering aptitude (percentages, time-and-work, probability). You need a quick practice set.

Write a single prompt that generates 10 MCQs:
- Mix all three aptitude topics
- Progressive difficulty (easy → medium → hard)
- Each question has 4 options, a correct answer, and a one-line explanation
- The last 2 questions should be word problems

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I can specify topic, difficulty, count, and format in a question-generation prompt
- [ ] My prompt includes an answer key with explanations
- [ ] I tried progressive difficulty and got ramping question levels
- [ ] I completed the challenge with a mixed-topic practice set

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Specifying topic, difficulty, count, and format turns the AI into a custom question bank.
2. Always ask for an answer key with explanations so you can self-check without a teacher.
3. Progressive difficulty and topic mixing make practice sets feel like real exams.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** Your prompt says "Give me questions on arrays." What is the biggest problem?

- A) It will generate too many questions
- B) It lacks difficulty, count, and format - so you get random, uncheckable questions
- C) Arrays are too easy for practice

> **A1:** B - Without specifying difficulty, count, and format, the AI gives you a random grab-bag of questions with no answer key.

**Q2:** Why is progressive difficulty useful in a practice set?

> **A2:** It warms you up with easy questions first, builds confidence, then pushes you with harder ones - just like a real exam paper.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> The AI has infinite questions - but only a specific prompt gives you the right ones at the right level.
