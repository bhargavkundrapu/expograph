# Lesson: Auto-Generate Test Cases With AI

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                              |
|------------|------------------------------------|
| Lesson ID  | M7-L4                              |
| Module     | M7 — Coding With AI                |
| Difficulty | Intermediate                       |
| Time       | 10–15 minutes                      |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a prompt that generates thorough test cases for any function
- 🎯 Ask AI for edge cases, happy path, and error cases in one go
- 🎯 Request coverage analysis to find gaps in your test suite

---

<!-- SEC-02 -->
## 💡 Use Case

Your professor says "add unit tests" to your project. You wrote the code, it runs, but you have zero tests. Writing tests from scratch feels tedious — and you are not sure which cases to cover. AI can generate a complete test suite in seconds, but only if your prompt tells it the function, the expected behavior, and what kinds of cases to include.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Write tests.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Sure! Here are some general testing best practices:

1. Write unit tests for each function
2. Test both positive and negative cases
3. Use a testing framework like pytest or unittest
4. Aim for at least 80% code coverage
5. Run tests before every commit
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No function provided** — The AI has nothing to test. It gave advice instead of actual test code.
- **No context about behavior** — Without knowing what the function does, AI cannot write meaningful assertions.
- **No test categories specified** — You did not ask for edge cases, error handling, or boundary values.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Generate unit tests for this Python function using pytest.
Context: This function validates an email address. It should return
True for valid emails and False for invalid ones.

def is_valid_email(email):
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

Write tests covering:
1. Happy path — valid emails that should return True
2. Edge cases — unusual but technically valid or invalid formats
3. Error cases — inputs that are not strings or are empty

Constraints: Use pytest. One function per test case. Use descriptive
test names.

Format: Show the complete test file, ready to run.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```python
import pytest
from email_validator import is_valid_email

# Happy path
def test_standard_email():
    assert is_valid_email("user@example.com") == True

def test_email_with_dots():
    assert is_valid_email("first.last@company.org") == True

def test_email_with_plus():
    assert is_valid_email("user+tag@gmail.com") == True

# Edge cases
def test_single_char_local():
    assert is_valid_email("a@b.co") == True

def test_missing_at_symbol():
    assert is_valid_email("userexample.com") == False

def test_double_at():
    assert is_valid_email("user@@example.com") == False

def test_missing_domain():
    assert is_valid_email("user@") == False

# Error cases
def test_empty_string():
    assert is_valid_email("") == False

def test_spaces_only():
    assert is_valid_email("   ") == False
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Generate unit tests for this function AND analyze test coverage.
Context: Email validation function. Returns True for valid emails,
False for invalid.

def is_valid_email(email):
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

Tasks:
1. Write tests for: happy path, edge cases, error cases, boundary
   values
2. Use pytest with descriptive test names
3. After the tests, add a coverage analysis table

Coverage analysis format:
| Category       | # Tests | Gaps                    |
|----------------|---------|-------------------------|
| Happy path     | X       | Any missing scenarios?  |
| Edge cases     | X       | Any missing scenarios?  |
| Error cases    | X       | Any missing scenarios?  |
| Boundary       | X       | Any missing scenarios?  |

4. Suggest 2–3 additional tests that would improve coverage

Constraints: pytest only. No mocking. Ready-to-run code.
```

**What changed:** We added a coverage analysis table and asked AI to identify gaps. This shifts from "write some tests" to "build a test suite and tell me what is still missing." You get tests plus a roadmap for what to add next.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

Try this yourself:

1. Pick a function from your current project or use the one below.
2. Write a prompt that asks AI for happy path, edge cases, and error cases. Include the function code.
3. Run the generated tests. Check if any fail — that means either the test or your function has a bug.

**Your task:** Generate test cases for this function using a structured prompt:

```python
def calculate_discount(price, discount_percent):
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("Discount must be between 0 and 100")
    return price * (1 - discount_percent / 100)
```

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** You wrote a function that converts a temperature from Celsius to Fahrenheit:

```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32
```

Your job:
1. Write a prompt that generates at least 8 test cases covering happy path, edge cases (0, negative numbers, very large values), and boundary values.
2. Ask AI to include a coverage analysis at the end.
3. Check: did AI catch the edge case of non-numeric input?

---

<!-- SEC-11 -->
## ✅ Checklist

Before moving on, confirm:

- [ ] I can write a test generation prompt that includes the function and specifies test categories
- [ ] I know the difference between happy path, edge cases, and error cases
- [ ] I can ask AI for coverage analysis to find gaps in my test suite
- [ ] I tried the guided practice and ran the generated tests

---

<!-- SEC-12 -->
## 📘 What You Learned

1. "Write tests" without a function and test categories gives generic advice. Provide the code and specify what to test.
2. Asking for happy path, edge cases, and error cases in one prompt gives you broad coverage in one shot.
3. Adding coverage analysis makes AI tell you what is still missing, so your test suite has no blind spots.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You prompt "write tests for my app" and the AI generates tests for a function that does not exist in your code. What went wrong?

> **A1:** You did not provide the actual function code. The AI guessed what your app does and invented a function to test. Always paste the real code.

**Q2:** What is the difference between a happy path test and an edge case test?

> **A2:** A happy path test checks normal, expected inputs (the function should work perfectly). An edge case test checks unusual or extreme inputs — boundary values, empty inputs, or unexpected formats that might break the function.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Give AI the function, tell it what to test, and ask what it missed — that is a test suite, not a guess.
