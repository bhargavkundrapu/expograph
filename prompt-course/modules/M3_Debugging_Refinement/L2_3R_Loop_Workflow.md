# 🔄 Lesson: The 3R Loop Workflow

## SEC-00 · Lesson ID

| Field | Value |
|-------|-------|
| Lesson ID | M3-L2 |
| Module | M3 - Debugging and Refinement |
| Difficulty | Intermediate |
| Time | 10–15 minutes |

---

## SEC-01 · 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Apply the 3R Loop (Request → Review → Refine) to fix any underperforming prompt
- 🎯 Identify exactly what went wrong in an AI response before rewriting the prompt
- 🎯 Iterate through at least two refinement cycles to reach a high-quality output

---

## SEC-02 · Use Case

Most people try a prompt once, get a mediocre result, and either accept it or start over from scratch. Neither approach is efficient.

The 3R Loop gives you a structured method for improving prompts - the same way a developer debugs code. You don't rewrite the whole program; you find the bug, fix it, and test again. Whether you're generating study notes, debugging code, writing project reports, or preparing for placements, the 3R Loop turns a 30-minute frustration into a 5-minute iteration.

---

## SEC-03 · ❌ Bad Prompt

```
Write a function to validate an email address.
```

---

## SEC-04 · Bad Output

```python
def validate_email(email):
    if "@" in email and "." in email:
        return True
    return False
```

---

## SEC-05 · Why It Failed

- **Single attempt, no review** - The user accepted the first output without checking if it actually handles edge cases (e.g., "@@.." would pass this check).
- **No success criteria stated** - The prompt didn't define what "validate" means, so the AI used the simplest possible check.
- **No iteration** - Without a Review step, the user never identified the gap between what they got and what they needed.

---

## SEC-06 · ✅ Good Prompt

This shows the full 3R Loop in action across three turns.

**Turn 1 - REQUEST:**
```
Write a Python function to validate an email address. It should check for
a proper format like user@domain.com.
```

*AI gives a basic regex solution. You review it.*

**Turn 2 - REVIEW + REFINE:**
```
Your function has issues:
- It accepts emails with spaces like "user @domain.com"
- It doesn't check for valid TLDs
- No error message is returned, just True/False

Refine the function to:
1. Strip whitespace before validating
2. Check that the domain has at least one dot after @
3. Return a tuple (bool, str) where str explains why validation failed
```

*AI gives an improved version. You review again.*

**Turn 3 - REVIEW + REFINE:**
```
Better, but two more issues:
- It allows consecutive dots like "user@domain..com"
- Add type hints and a docstring

Fix these and show me 3 test cases that would have caught the original bugs.
```

---

## SEC-07 · Good Output

```python
def validate_email(email: str) -> tuple[bool, str]:
    """Validate an email address and return (is_valid, reason)."""
    email = email.strip()
    if not email:
        return (False, "Email is empty")
    if " " in email:
        return (False, "Email contains spaces")
    parts = email.split("@")
    if len(parts) != 2:
        return (False, "Email must contain exactly one @")
    local, domain = parts
    if ".." in domain:
        return (False, "Domain contains consecutive dots")
    if "." not in domain:
        return (False, "Domain must contain at least one dot")
    return (True, "Valid")

# Test cases:
assert validate_email("user @domain.com") == (False, "Email contains spaces")
assert validate_email("user@domain..com") == (False, "Domain contains consecutive dots")
assert validate_email("user@domain.com") == (True, "Valid")
```

---

## SEC-08 · 🚀 Upgrade Prompt

```
I'm using the 3R Loop to refine a prompt. Track changes between versions.

ORIGINAL REQUEST (v1):
"Write a Python function to validate an email address."

REVIEW of v1 output:
- Too simple (only checks for @ and .)
- No error messages
- No edge case handling

REFINED REQUEST (v2):
"Write a Python function that validates email format with these rules:
[list of rules]. Return (bool, str) with the reason."

REVIEW of v2 output:
- Fixed error messages ✓
- Still allows consecutive dots �-
- Missing type hints �-

REFINED REQUEST (v3):
"Fix consecutive dots and add type hints + docstring + 3 test cases."

Now generate the v3 output AND a changelog showing what changed from v1 → v2 → v3.
```

**What changed:** The upgrade adds explicit version tracking and a changelog. Instead of just iterating, you document what changed at each step. This makes the 3R Loop repeatable and helps you learn which refinements matter most.

---

## SEC-09 · 🧪 Guided Practice

Try this yourself:

1. **Request** - Send this prompt to an AI: "Write a summary of the Python `map()` function."
2. **Review** - Read the output carefully. Find at least 2 things that are missing, wrong, or not useful for your level. Write them down.
3. **Refine** - Send a follow-up prompt that says: "Your summary had these issues: [your list]. Rewrite it to fix them and add a practical example using `map()` with a list of student grades."

**Your task:** Complete all three steps and compare your v1 output to your v2 output. Notice how much better v2 is - that's the power of one 3R cycle.

---

## SEC-10 · 💡 Challenge

**5-minute challenge:**

Start with this prompt:

```
Explain how Git branching works.
```

1. Send it and save the output (this is your v1).
2. Review: find 3 specific problems with the output (too generic? missing diagrams? no commands shown?).
3. Write a refined prompt that fixes all 3 problems.
4. Send the refined prompt and compare outputs.

Bonus: Do a third round (v3) and note what changed.

---

## SEC-11 · ✅ Checklist

Before moving on, confirm you can do the following:

- [ ] I can explain the 3 steps of the 3R Loop (Request, Review, Refine)
- [ ] I can review an AI output and list specific problems before refining
- [ ] I can write a refinement prompt that references what went wrong in the previous output
- [ ] I understand that multiple iterations produce better results than one perfect attempt

---

## SEC-12 · 📘 What You Learned

1. **The 3R Loop is a cycle, not a one-shot** - Request, Review, Refine. Then repeat. Each pass gets you closer to what you actually need.
2. **Review is the critical step** - Most people skip it. Naming what's wrong before refining is what makes the next version better, not random rewording.
3. **Tracked changes beat guesswork** - When you document what changed between versions, you learn which tweaks have the biggest impact and can reuse those patterns.

---

## SEC-13 · ❓ Mini Quiz

**Q1:** What are the three steps of the 3R Loop, and which step do most beginners skip?

**A1:** Request, Review, Refine. Most beginners skip the Review step - they either accept the first output or rewrite from scratch without analyzing what specifically went wrong.

**Q2:** You asked AI to "explain recursion" and got a 500-word essay with no code examples. You refine by saying "Add a code example." Is this a good refinement? Why or why not?

**A2:** It's a partial refinement. A better approach would be to review all issues first (too long, no code, too abstract) and address them all in one refined prompt: "Explain recursion in under 100 words, include a Python factorial example, and list 2 common mistakes beginners make." Fixing one issue at a time is slower than fixing all identified issues in one pass.

---

## SEC-14 · 💬 One-Line Takeaway

> Great prompts aren't written - they're refined through the loop of Request, Review, and Refine.
