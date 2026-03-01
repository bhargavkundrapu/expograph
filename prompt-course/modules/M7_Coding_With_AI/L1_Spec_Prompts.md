# Lesson: Turn Ideas Into Coding Specs

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                              |
|------------|------------------------------------|
| Lesson ID  | M7-L1                              |
| Module     | M7 — Coding With AI                |
| Difficulty | Intermediate                       |
| Time       | 10–15 minutes                      |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Turn a vague project idea into a detailed coding specification using AI
- 🎯 Use the CRAFTED framework to generate specs with features, tech stack, and file structure
- 🎯 Add acceptance criteria and edge cases to make specs production-ready

---

<!-- SEC-02 -->
## 💡 Use Case

You have a hackathon in 48 hours. Your team picked an idea but nobody wrote down what you are actually building. You need a clear spec — features, tech stack, folder structure, and what "done" looks like — before anyone writes a line of code. A good spec prompt saves you hours of confusion and mid-project rewrites.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Build me a todo app.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Here's a simple todo app using HTML, CSS, and JavaScript:

<!DOCTYPE html>
<html>
<head><title>Todo App</title></head>
<body>
  <input type="text" id="task">
  <button onclick="addTask()">Add</button>
  <ul id="list"></ul>
  <script>
    function addTask() { ... }
  </script>
</body>
</html>
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **Jumped to code instead of planning** — You asked to "build" so the AI started coding immediately. You never got a spec.
- **No requirements** — The AI guessed the tech stack, features, and scope because you gave it nothing to work with.
- **No structure** — There is no mention of file organization, data model, or what features the app actually supports.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Clear objective: Generate a detailed project specification for a task
management web app.

Role: Act as a senior full-stack developer writing a spec document for
a junior team.

Added context: This is a 48-hour hackathon project. Team of 3 people.
We know React and Python (Flask). We need a working demo, not a
production app.

Format: Return the spec with these sections:
1. Project summary (3 lines max)
2. Core features (numbered list)
3. Tech stack (frontend, backend, database)
4. Folder structure (tree format)
5. Data model (table format)

Task breakdown:
1. Define the MVP features first
2. Then pick the simplest tech stack that works
3. Then outline the folder structure

Examples: Features should be like "User can create a task with a title
and due date" — specific and testable.

Desired depth: Keep it concise. One page max. No boilerplate.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
## Project Spec: Task Manager (Hackathon MVP)

**Summary:** A web app where users create, complete, and filter tasks.
Built with React frontend and Flask API. SQLite for storage.

**Core Features:**
1. User can create a task with title, description, and due date
2. User can mark a task as complete
3. User can delete a task
4. User can filter tasks by status (all / active / completed)
5. Tasks persist across page reloads

**Tech Stack:**
- Frontend: React + Vite
- Backend: Flask (Python)
- Database: SQLite
- Styling: Tailwind CSS

**Folder Structure:**
├── client/          (React app)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
├── server/          (Flask API)
│   ├── app.py
│   ├── models.py
│   └── routes.py
└── README.md

**Data Model:**
| Field       | Type     | Notes              |
|-------------|----------|--------------------|
| id          | int      | primary key        |
| title       | string   | required           |
| description | string   | optional           |
| due_date    | date     | optional           |
| is_complete | boolean  | default: false     |
| created_at  | datetime | auto-generated     |
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Clear objective: Generate a detailed project specification for a task
management web app.

Role: Act as a senior full-stack developer writing a spec document for
a junior team.

Added context: 48-hour hackathon. Team of 3 (React + Python). Need a
working demo.

Format: Return these sections:
1. Project summary (3 lines)
2. Core features (numbered, testable)
3. Tech stack
4. Folder structure (tree)
5. Data model (table)
6. Acceptance criteria for each feature
7. Edge cases to handle

Task breakdown:
1. Define MVP features
2. Write one acceptance criterion per feature
3. List 3–5 edge cases that could break the demo

Examples: Acceptance criterion — "When user clicks 'Add Task' with an
empty title, the app shows a validation error."

Desired depth: One page. No boilerplate. Focus on what a reviewer
would check during the demo.
```

**What changed:** We added acceptance criteria and edge cases. This turns a feature list into something testable. Each feature now has a clear "done" definition, and the team knows what could break during the demo.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

Try this yourself:

1. Pick a project idea you have been thinking about — a side project, a hackathon idea, or a college assignment.
2. Write a CRAFTED prompt asking AI to generate a one-page spec. Include all seven CRAFTED fields.
3. Check the output: does it have features, tech stack, folder structure, and a data model? If anything is missing, refine and try again.

**Your task:** Write a CRAFTED spec prompt for a "student expense tracker" app. The spec should include at least 5 features, a tech stack, and a folder structure.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend says "I want to build a weather app" and asks AI to help. The AI dumps 200 lines of React code with no plan.

Your job:
1. Write a CRAFTED prompt that generates a spec (not code) for the weather app.
2. Include at least: features, tech stack, folder structure, and one acceptance criterion per feature.
3. Keep the spec to one page.

---

<!-- SEC-11 -->
## ✅ Checklist

Before moving on, confirm:

- [ ] I can turn a vague project idea into a CRAFTED spec prompt
- [ ] I know the difference between asking AI to "build" vs asking it to "spec"
- [ ] I can include acceptance criteria that make features testable
- [ ] I tried the guided practice and got a usable spec

---

<!-- SEC-12 -->
## 📘 What You Learned

1. Asking AI to "build" something skips planning. Ask for a spec first, then code.
2. The CRAFTED framework gives AI enough structure to produce a real specification with features, tech stack, and file layout.
3. Adding acceptance criteria and edge cases turns a wish list into a testable plan.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You prompt "make me a chat app" and the AI writes 300 lines of code. What is the core mistake?

> **A1:** The prompt asked to "make" (build), not to "spec" (plan). The AI skipped planning entirely because the prompt never asked for a specification.

**Q2:** Which CRAFTED field is most responsible for getting a folder structure and data model in the output?

> **A2:** **Format** — it tells the AI exactly which sections to include and how to structure the output. Without it, the AI picks its own format.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Never let AI write the first line of code until it has written the last line of the spec.
