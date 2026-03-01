# Lesson: Debug Code With AI Systematically

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                              |
|------------|------------------------------------|
| Lesson ID  | M7-L2                              |
| Module     | M7 — Coding With AI                |
| Difficulty | Intermediate                       |
| Time       | 10–15 minutes                      |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a debugging prompt that gives AI all the context it needs to find the bug
- 🎯 Structure bug reports with code, error, expected behavior, and actual behavior
- 🎯 Ask AI for root cause analysis instead of just a quick fix

---

<!-- SEC-02 -->
## 💡 Use Case

It is 2 AM. Your assignment is due in 4 hours. Your code throws an error you have never seen before. You paste it into an AI tool and say "fix it" — the AI guesses wrong and you waste another hour. This lesson teaches you how to give AI the right context so it finds the real bug on the first try. Works for assignments, side projects, and coding interviews.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
My code doesn't work fix it.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Could you please share the code you're referring to? Without seeing
the actual code, I can only offer general debugging tips:

1. Check for syntax errors
2. Make sure all variables are defined
3. Add print statements to trace the flow
4. Check your input data
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No code provided** — The AI cannot debug code it cannot see. It gave generic advice instead.
- **No error message** — Without the actual error, the AI has no clue what went wrong.
- **No expected vs actual behavior** — The AI does not know what "doesn't work" means. A crash? Wrong output? Infinite loop?

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Find and fix the bug in my Python function.
Context: I am writing a function that calculates the average of a list
of numbers. It should handle empty lists gracefully.

Here is my code:

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

Error: ZeroDivisionError: division by zero
When I call: calculate_average([])

Expected behavior: Return 0 when the list is empty.
Actual behavior: Crashes with ZeroDivisionError.

Constraints: Fix the bug. Show the corrected code. Explain what
caused the error in one sentence.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Bug: The function divides by len(numbers) without checking if the
list is empty. When numbers is [], len(numbers) is 0, causing
ZeroDivisionError.

Fixed code:

def calculate_average(numbers):
    if not numbers:
        return 0
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

Cause: No guard clause for empty input before the division.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Find and fix the bug in my Python function. Then do a root
cause analysis.
Context: Function calculates average of a list. Crashes on empty
input.

Code:
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

Error: ZeroDivisionError on calculate_average([])
Expected: Return 0 for empty list.
Actual: Crashes.

Tasks:
1. Identify the exact line causing the error
2. Explain the root cause (not just "add a check")
3. Show the fixed code
4. List 2 other inputs that could also cause problems
5. Suggest a defensive coding pattern to prevent similar bugs

Format: Number each section. Keep explanations to 1–2 sentences each.
```

**What changed:** We added root cause analysis, asked for other risky inputs, and requested a defensive coding pattern. This turns a one-off fix into a learning moment. You do not just fix this bug — you learn to prevent the next one.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

Try this yourself:

1. Find a piece of code you wrote recently that had a bug (or use the example below).
2. Write a debug prompt with all four parts: code, error, expected behavior, actual behavior.
3. Paste it into an AI tool. Check if the fix is correct, then ask for root cause analysis.

**Your task:** Debug this code using a structured prompt:

```python
def find_max(items):
    max_val = 0
    for item in items:
        if item > max_val:
            max_val = item
    return max_val

# Bug: find_max([-3, -1, -7]) returns 0 instead of -1
```

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your teammate sends you this message: "The login function is broken. It always returns False even when the password is correct."

Here is the code:

```python
def check_login(stored_password, entered_password):
    if stored_password == entered_password:
        return true
    return False
```

Your job:
1. Write a structured debug prompt (code + error + expected + actual).
2. Get the AI to find the bug, explain the root cause, and give you the fix.
3. Ask for one more edge case that could break this function.

---

<!-- SEC-11 -->
## ✅ Checklist

Before moving on, confirm:

- [ ] I can write a debug prompt that includes code, error, expected behavior, and actual behavior
- [ ] I understand why "fix my code" without context gives useless results
- [ ] I can ask AI for root cause analysis, not just a patch
- [ ] I tried the guided practice and got a correct fix

---

<!-- SEC-12 -->
## 📘 What You Learned

1. AI cannot debug code it cannot see. Always paste the code, the error, and both expected and actual behavior.
2. A structured debug prompt gets the right fix on the first try instead of generic advice.
3. Asking for root cause analysis teaches you to prevent similar bugs in the future.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You paste your code into AI and say "this has a bug." The AI suggests 5 different possible fixes. What went wrong with your prompt?

> **A1:** You did not include the error message or describe expected vs actual behavior. Without that context, the AI has to guess what the bug is, so it gives multiple possibilities instead of one targeted fix.

**Q2:** What is the difference between asking for a "fix" and asking for a "root cause analysis"?

> **A2:** A fix tells you what to change. A root cause analysis tells you *why* the bug happened, which helps you avoid the same mistake in future code.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Show AI the code, the error, and the gap between what you expected and what happened — that is the fastest path to a fix.
