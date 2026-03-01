# Lesson: ATS Resume Rewrite

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M10-L1                         |
| Module     | M10 — Placement Toolkit        |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Rewrite a resume using AI so it passes ATS (Applicant Tracking System) filters
- 🎯 Extract keywords from a job description and weave them into your resume
- 🎯 Identify missing skills and gaps before you apply

---

<!-- SEC-02 -->
## 💡 Use Case

You found a great job posting online. You have a resume, but it was written for a general audience. Most companies use an ATS — software that scans resumes for matching keywords before a human ever sees them. If your resume does not match the job description, it gets rejected automatically. Use this prompt technique to tailor your resume for every application.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Improve my resume.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Here are some tips to improve your resume:
1. Use action verbs like "led" and "managed."
2. Quantify your achievements with numbers.
3. Keep it to one page.
4. Use a clean, professional font.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No resume text** — the AI has nothing to work with, so it gives generic advice.
- **No job description** — without knowing the target role, the AI cannot match keywords.
- **No format** — you got tips instead of an actual rewritten resume.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Goal: Rewrite my resume so it passes ATS filters for the job below.
Context: I am a final-year CS student applying for a Junior Backend
Developer role.

My current resume summary:
"Computer science student with experience in Python and web development.
Built multiple projects including a chat app and a to-do list. Looking
for a software engineering role."

Job description (key section):
"We are looking for a Junior Backend Developer with experience in Python,
Django, REST APIs, PostgreSQL, and Git. Familiarity with Docker and CI/CD
is a plus."

Constraints: Keep the summary under 60 words. Use keywords from the job
description naturally — do not stuff them.
Format: Return only the rewritten summary. No tips or explanations.
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Backend-focused computer science graduate with hands-on experience
building Python and Django applications. Developed a real-time chat
app using REST APIs and PostgreSQL. Comfortable with Git-based
workflows and familiar with Docker for containerized deployments.
Seeking a Junior Backend Developer role to apply strong fundamentals
in scalable server-side development.
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Goal: Rewrite my resume summary for ATS optimization AND provide a
keyword analysis.
Context: I am a final-year CS student applying for a Junior Backend
Developer role.

My current resume summary:
"Computer science student with experience in Python and web development.
Built multiple projects including a chat app and a to-do list. Looking
for a software engineering role."

Job description (key section):
"We are looking for a Junior Backend Developer with experience in Python,
Django, REST APIs, PostgreSQL, and Git. Familiarity with Docker and CI/CD
is a plus."

Constraints: Summary under 60 words. Natural keyword placement.
Format: Return three things:
1. Rewritten summary
2. A table showing each job-description keyword and whether my resume
   now includes it (Yes / No)
3. A list of missing skills I should consider adding to other resume
   sections
```

**What changed:** We added a keyword density analysis table and a missing-skills highlight. Now you can see exactly which keywords are covered and which gaps remain, so you can fix the rest of your resume too.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Copy a real job posting you are interested in. Paste the key requirements section.
2. Write your current resume summary (or the experience section) below it.
3. Use the Good Prompt structure above. Replace the example text with your own details and run it.

**Your task:** Rewrite your own resume summary for a specific job posting using the GCCF structure. Check if the output includes at least 5 keywords from the job description.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your friend's resume summary says: "I am a hardworking student who knows Java and some web stuff. I want a good job in IT."

The target job posting asks for: "Java Developer with Spring Boot, REST API, MySQL, and Agile experience."

Write a prompt that rewrites their summary for ATS and includes a keyword match table. Paste your prompt into an AI tool and check the result.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I understand what an ATS is and why keyword matching matters.
- [ ] I can write a prompt that feeds both my resume and the job description to the AI.
- [ ] I tried the guided practice with a real job posting.
- [ ] I completed the challenge and checked the keyword table.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. An ATS scans for keyword matches — your resume must mirror the job description's language.
2. Giving the AI both your resume and the job description produces a tailored rewrite, not generic tips.
3. Adding a keyword analysis step shows you exactly what is covered and what is missing.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** You submit a prompt with your resume but forget to include the job description. What will the AI most likely return?

- A) A perfectly tailored resume
- B) A generic rewrite with no keyword targeting
- C) An error message

> **A1:** B — without the job description, the AI has no keywords to target, so the rewrite will be generic.

**Q2:** What is the purpose of adding a keyword match table to your prompt?

> **A2:** It lets you see at a glance which job-description keywords are in your resume and which are missing, so you can fill the gaps.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Your resume is not for humans first — it is for the ATS, so feed the AI both your resume and the job description to beat the filter.
