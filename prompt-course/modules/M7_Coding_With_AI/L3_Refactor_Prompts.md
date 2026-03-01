# Lesson: Refactor Messy Code With AI

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                              |
|------------|------------------------------------|
| Lesson ID  | M7-L3                              |
| Module     | M7 — Coding With AI                |
| Difficulty | Intermediate                       |
| Time       | 10–15 minutes                      |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a refactoring prompt that tells AI exactly what to improve
- 🎯 Ask for specific improvements — readability, performance, or DRY principle (Don't Repeat Yourself)
- 🎯 Get AI to explain each change it makes so you learn while you clean up

---

<!-- SEC-02 -->
## 💡 Use Case

Your semester project works, but the code is a mess. Copy-pasted blocks, confusing variable names, functions that do five things at once. You need to clean it up before the submission — or before a teammate reads it and loses their mind. AI can refactor your code fast, but only if you tell it what "better" means.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Make this code better.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Here are some general suggestions to improve your code:

1. Use meaningful variable names
2. Add comments to explain your logic
3. Break large functions into smaller ones
4. Consider using list comprehensions
5. Follow PEP 8 style guidelines
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No code provided** — The AI gave textbook advice because it had nothing to refactor.
- **"Better" is vague** — Better how? Faster? More readable? Fewer lines? The AI cannot read your mind.
- **No constraints** — Without knowing the goal, the AI defaults to a generic checklist.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Refactor this Python function for readability and DRY principle.
Context: This function processes student grades. It works correctly
but has repeated logic and unclear variable names.

Code:
def process(d):
    r = []
    for i in d:
        if i[1] >= 90:
            r.append({"name": i[0], "grade": "A", "status": "pass"})
        elif i[1] >= 80:
            r.append({"name": i[0], "grade": "B", "status": "pass"})
        elif i[1] >= 70:
            r.append({"name": i[0], "grade": "C", "status": "pass"})
        elif i[1] >= 60:
            r.append({"name": i[0], "grade": "D", "status": "pass"})
        else:
            r.append({"name": i[0], "grade": "F", "status": "fail"})
    return r

Constraints:
- Keep the same input/output behavior
- Rename variables to be descriptive
- Remove repeated dict construction
- Do not add external libraries

Format: Show the refactored code, then a short list of what changed.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Refactored code:

def process_grades(student_data):
    def get_grade(score):
        if score >= 90: return "A"
        if score >= 80: return "B"
        if score >= 70: return "C"
        if score >= 60: return "D"
        return "F"

    results = []
    for name, score in student_data:
        grade = get_grade(score)
        status = "pass" if grade != "F" else "fail"
        results.append({"name": name, "grade": grade, "status": status})
    return results

What changed:
1. Renamed d, r, i to student_data, results, name/score
2. Extracted grade logic into get_grade() helper — removes 5 repeated
   dict constructions
3. Derived status from grade instead of duplicating pass/fail logic
4. Used tuple unpacking (name, score) for clarity
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Refactor this Python function for readability and DRY principle.
Context: Function processes student grades. Works correctly but has
repeated logic and unclear names.

Code:
def process(d):
    r = []
    for i in d:
        if i[1] >= 90:
            r.append({"name": i[0], "grade": "A", "status": "pass"})
        elif i[1] >= 80:
            r.append({"name": i[0], "grade": "B", "status": "pass"})
        elif i[1] >= 70:
            r.append({"name": i[0], "grade": "C", "status": "pass"})
        elif i[1] >= 60:
            r.append({"name": i[0], "grade": "D", "status": "pass"})
        else:
            r.append({"name": i[0], "grade": "F", "status": "fail"})
    return r

Tasks:
1. Refactor for readability and DRY
2. Keep same input/output behavior
3. For each change, explain WHY it improves the code (not just what
   changed)
4. Rate the before and after on a 1–10 readability scale

Constraints: No external libraries. Keep it beginner-friendly.

Format:
- Refactored code first
- Then a numbered changelog with explanations
- End with the readability rating (before → after)
```

**What changed:** We asked AI to explain *why* each change improves the code and to rate readability before and after. This turns refactoring from a black box into a learning experience. You understand the reasoning, not just the result.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

Try this yourself:

1. Find a function you wrote recently that you know is messy — long, repetitive, or hard to read.
2. Write a refactoring prompt with: the code, the specific improvement you want (readability, DRY, performance), and the constraint to keep the same behavior.
3. Compare the AI's refactored version with your original. Check that the output is still correct.

**Your task:** Refactor this code using a prompt that targets DRY principle and readability:

```python
def format_user(user):
    if user["role"] == "admin":
        return "Name: " + user["name"] + " | Role: Admin | Access: Full"
    elif user["role"] == "editor":
        return "Name: " + user["name"] + " | Role: Editor | Access: Write"
    elif user["role"] == "viewer":
        return "Name: " + user["name"] + " | Role: Viewer | Access: Read"
```

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You are reviewing a teammate's code before a submission. Their function works, but it has three problems: single-letter variable names, repeated logic, and one function doing too many things.

Your job:
1. Write a refactoring prompt that asks AI to fix all three problems.
2. Include the constraint: "Keep the same input/output behavior."
3. Ask AI to explain each change in one sentence.

Use this code as input:

```python
def f(x):
    t = 0
    c = 0
    for i in x:
        if i > 0:
            t += i
            c += 1
    if c > 0:
        return t / c
    return 0
```

---

<!-- SEC-11 -->
## ✅ Checklist

Before moving on, confirm:

- [ ] I can write a refactoring prompt that specifies what to improve
- [ ] I know the difference between asking to "make it better" and targeting specific qualities
- [ ] I can ask AI to explain its changes so I learn from the refactoring
- [ ] I tried the guided practice and verified the refactored code still works

---

<!-- SEC-12 -->
## 📘 What You Learned

1. "Make it better" gives generic advice. Targeting specific qualities — readability, DRY, performance — gives real refactoring.
2. Always include the original code and the constraint to keep the same behavior. AI cannot refactor code it cannot see.
3. Asking AI to explain each change turns refactoring into a learning session, not just a cleanup.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You ask AI to "optimize this code" and it rewrites the function using a completely different algorithm. What constraint was missing from your prompt?

> **A1:** "Keep the same input/output behavior." Without that constraint, the AI may change the logic, not just clean it up.

**Q2:** What does DRY stand for, and why is it useful to mention it in a refactoring prompt?

> **A2:** DRY stands for Don't Repeat Yourself. Mentioning it tells AI to look for repeated blocks and consolidate them, giving you a specific and actionable refactoring target.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Tell AI what "better" means — vague refactoring requests get vague results.
