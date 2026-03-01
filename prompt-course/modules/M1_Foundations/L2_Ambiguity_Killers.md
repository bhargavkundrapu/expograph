# Lesson: Ambiguity Killers — Remove Vagueness, Get Precision

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M1-L2                          |
| Module     | M1 — Foundations               |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Identify vague words and phrases that make a prompt ambiguous
- 🎯 Replace ambiguous language with specific, measurable details
- 🎯 Write prompts that leave zero room for the AI to guess what you need

---

<!-- SEC-02 -->
## 💡 Use Case

Ambiguity creeps in when you are in a hurry — asking for "help with my project," "a good resume," or "some code." Every time the AI guesses wrong, you waste a follow-up message. Killing ambiguity up front is the single fastest way to improve your results for assignments, coding tasks, and placement prep.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Help me with my project.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Sure! I'd be happy to help with your project. Could you tell me more
about what kind of project it is? What subject is it for? What do you
need help with — research, writing, coding, or something else? Please
share more details so I can assist you better.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No subject or domain** — the AI cannot tell if this is a coding project, a research paper, or a group presentation.
- **No specific ask** — "help" could mean brainstorming, debugging, writing, or reviewing.
- **No scope** — there is no indication of deadline, length, or deliverable.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
I am building a Python Flask web app for my third-year database course.
The app lets students search a library catalogue by title or author.
I have the SQL schema ready but I am stuck on connecting Flask to a
PostgreSQL database.

Help me write the database connection code using psycopg2, including
error handling for failed connections. Show the code in a single Python
file with comments explaining each step.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```python
import psycopg2
from psycopg2 import OperationalError
from flask import Flask

app = Flask(__name__)

def get_db_connection():
    """Create and return a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="library_db",
            user="student",
            password="secure_password"
        )
        return conn
    except OperationalError as e:
        print(f"Database connection failed: {e}")
        return None
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
I am building a Python Flask web app for my third-year database course.
The app lets students search a library catalogue by title or author.
I have the SQL schema ready but I am stuck on connecting Flask to
PostgreSQL.

Constraints: Use psycopg2. Include error handling for connection
failures and timeouts. Follow PEP 8 style.
Format: A single Python file with inline comments. End with a bullet
list of common connection errors and how to fix them.
```

**What changed:** We added explicit *Constraints* (PEP 8, timeout handling) and a richer *Format* (bullet list of common errors). This removes the ambiguity around coding style and tells the AI to provide troubleshooting help alongside the code.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Look at this vague prompt: *"Give me some tips for my interview."*
2. List three pieces of missing information (role, company type, experience level, etc.).
3. Rewrite the prompt with all three details filled in, plus a format instruction.

**Your task:** Turn the vague prompt into a specific one that asks for 7 behavioural interview tips for a fresher applying to a product-based company, formatted as a numbered list with one example answer per tip.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** A classmate sends this prompt to the AI and complains about a useless answer:

```
Write some code for sorting.
```

Rewrite it so the AI knows the programming language, the sorting algorithm, the input type, and the expected output format. Make sure your rewrite contains zero vague words.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I replaced every vague word ("some," "good," "help") with a specific detail.
- [ ] The prompt names the exact subject, tool, or language involved.
- [ ] I stated what the deliverable looks like (format, length, structure).
- [ ] Someone else could read my prompt and predict roughly what the AI will produce.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Vague prompts force the AI to guess — and it usually guesses wrong.
2. Swapping words like "help," "some," and "good" for concrete details is the fastest fix.
3. Adding constraints and format on top of specific details removes the last traces of ambiguity.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** What is wrong with the phrase "explain it in a good way" inside a prompt?

> **A1:** "Good" is subjective and vague. The AI does not know if you mean simple language, formal tone, visual analogies, or short sentences. Replace it with a specific instruction like "use simple analogies suitable for a beginner."

**Q2:** You ask the AI to "write some test cases." Name two details you should add to remove ambiguity.

> **A2:** (1) The programming language and testing framework (e.g., Python with pytest). (2) The function or feature being tested, including expected inputs and outputs.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Every vague word in your prompt is a coin flip — replace it with a fact and the AI stops guessing.
