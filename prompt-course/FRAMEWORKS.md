# FRAMEWORKS - Prompt Engineering Course

> These three frameworks are used consistently across all 50 lessons. Learn them here. Use them everywhere.

---

## 1. GCCF Model (Foundation Framework)

**Used in**: Every lesson from M1 onwards

GCCF stands for:

| Letter | Meaning | What to write |
|---|---|---|
| **G** | Goal | What do you want the AI to do? |
| **C** | Context | What background info does the AI need? |
| **C** | Constraints | What rules should the AI follow? |
| **F** | Format | How should the output look? |

### Example

**Without GCCF**:

```
Tell me about Python.
```

**With GCCF**:

```
Goal: Explain Python's top 5 features for a beginner.
Context: I'm a first-year engineering student learning my first programming language.
Constraints: Use simple words. No jargon. Max 200 words.
Format: Numbered list with one-line explanation per feature.
```

### When to use GCCF
- Every time you write a prompt (yes, every time)
- You don't always need to label G/C/C/F explicitly - but think through all four parts
- For simple prompts, you can combine them into one paragraph

### Quick memory trick
> **G**ive **C**lear **C**ontext **F**irst = better outputs, every time.

---

## 2. 3R Loop (Refinement Framework)

**Used in**: M3 (Debugging) + whenever a prompt doesn't work

3R stands for:

| Step | Meaning | What you do |
|---|---|---|
| **Request** | Write and send your prompt | Give the AI your best attempt |
| **Review** | Read the output carefully | Check: is it accurate? Complete? Right format? |
| **Refine** | Fix what's wrong and try again | Change the prompt based on what failed |

### How it works

```
Step 1: REQUEST - Send your prompt
Step 2: REVIEW - Read the output. Ask yourself:
   Is it accurate?
   Is it complete?
   Is it the right format?
   Is it useful for my purpose?
Step 3: REFINE - If any answer is "No":
   Identify what went wrong
   Change that part of the prompt
   Send again
   Repeat until satisfied
```

### Example

**Request (Round 1)**:

```
Write a resume summary for me.
```

Output: Generic, vague summary.

**Review**: No specific skills. No role mentioned. Too generic.

**Refine (Round 2)**:

```
Write a 3-line resume summary for a final-year CSE student.
Skills: Python, React, Machine Learning.
Target role: Frontend Developer Intern.
Tone: Professional and confident.
```

Output: Sharp, specific, ready to use.

### When to use 3R
- When your first prompt gives a bad output
- When you're not sure what's wrong - the Review step helps you diagnose
- When building complex prompts - iterate in 2-3 rounds

### Quick memory trick
> **R**equest, **R**eview, **R**efine. Never settle for the first output.

---

## 3. CRAFTED (Advanced Framework)

**Used in**: M3 onwards (for complex, multi-part prompts)

CRAFTED stands for:

| Letter | Meaning | What to write |
|---|---|---|
| **C** | Clear objective | What exactly do you want? Be specific. |
| **R** | Role | Who should the AI pretend to be? |
| **A** | Added context | Background info the AI needs |
| **F** | Format | How should the output look? |
| **T** | Task breakdown | Break complex tasks into steps |
| **E** | Examples | Show the AI what good output looks like |
| **D** | Desired depth | How detailed should the answer be? |

### Example

**Without CRAFTED**:

```
Help me prepare for a coding interview.
```

**With CRAFTED**:

```
Clear objective: Generate 5 coding interview questions on arrays.
Role: Act as a senior software engineer conducting a campus interview.
Added context: I'm a final-year CSE student. I know Python. I've solved 50+ LeetCode easy problems.
Format: For each question, provide: Question, Hint, Solution approach (3 lines max), Time complexity.
Task breakdown:
  1. Start with 2 easy questions
  2. Then 2 medium questions
  3. End with 1 tricky question
Examples: Similar to LeetCode easy/medium difficulty.
Desired depth: Solution approach only, no full code. Keep explanations under 3 lines each.
```

### When to use CRAFTED
- Complex tasks with multiple requirements
- When GCCF isn't giving you detailed enough results
- Interview prep, project specs, content creation, research tasks
- When you need the AI to play a specific role

### GCCF vs CRAFTED

| Use GCCF when... | Use CRAFTED when... |
|---|---|
| Simple, single-task prompts | Complex, multi-step prompts |
| You need a quick answer | You need a structured, detailed answer |
| Format is simple (list, paragraph) | Format has multiple parts |
| No role needed | AI needs to act as a specific persona |

### Quick memory trick
> **CRAFTED** prompts get **CRAFTED** outputs. The more specific your prompt, the more useful the result.

---

## Framework Cheat Sheet

| Situation | Framework |
|---|---|
| Simple prompt | GCCF |
| Complex prompt | CRAFTED |
| Output not right | 3R Loop |

**Combine all three**: Write with GCCF or CRAFTED. Review with 3R. Refine until perfect.
