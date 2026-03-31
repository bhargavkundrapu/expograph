# Lesson: LinkedIn Profile Upgrade

<!-- SEC-00 -->
## 🆔 Lesson ID

| Field      | Value                          |
|------------|--------------------------------|
| Lesson ID  | M10-L2                         |
| Module     | M10 - Placement Toolkit        |
| Difficulty | Intermediate                   |
| Time       | 10–15 minutes                  |

---

<!-- SEC-01 -->
## 🎯 Goal

By the end of this lesson you will be able to:

- 🎯 Write a prompt that rewrites your LinkedIn headline, about section, and experience using the CRAFTED framework
- 🎯 Optimize your profile for LinkedIn's search algorithm using role-specific keywords
- 🎯 Turn a bland profile into one that attracts recruiters

---

<!-- SEC-02 -->
## 💡 Use Case

Recruiters search LinkedIn using keywords like "React Developer" or "Data Analyst SQL." If those words are missing from your profile, you will not show up. Use this technique when you create your LinkedIn profile, update it before placement season, or pivot to a new target role.

---

<!-- SEC-03 -->
## ❌ Bad Prompt

```
Write my LinkedIn bio.
```

---

<!-- SEC-04 -->
## 📤 Bad Output

```
Passionate and motivated individual seeking exciting opportunities in
the tech industry. I love learning new things and working with teams.
I am a quick learner with good communication skills.
```

---

<!-- SEC-05 -->
## 🔍 Why It Failed

- **No role specified** - the AI wrote a generic bio that fits nobody and everybody.
- **No current profile details** - the AI invented filler phrases like "passionate" and "quick learner."
- **No format guidance** - you got one blob instead of separate headline, about, and experience sections.

---

<!-- SEC-06 -->
## ✅ Good Prompt

```
Clear objective: Rewrite my LinkedIn profile to attract recruiters for
Frontend Developer roles.
Role: You are a LinkedIn profile optimization expert.
Added context: I am a final-year IT student. I know React, JavaScript,
Tailwind CSS, and have built 3 projects: a weather app, a portfolio
site, and an e-commerce dashboard. I interned at a startup for 2 months
doing UI bug fixes.
Format: Give me three separate sections:
  1. Headline (under 120 characters)
  2. About section (under 150 words, first person)
  3. Rewritten experience entry for my internship (3 bullet points
     starting with action verbs)
Task breakdown: Focus on skills that frontend recruiters search for.
Examples: Use terms like "React.js," "responsive design," and
"component-based architecture."
Desired depth: Professional but approachable tone. No buzzwords like
"passionate" or "synergy."
```

---

<!-- SEC-07 -->
## 📤 Good Output

```
Headline:
Frontend Developer | React.js · JavaScript · Tailwind CSS | Building
responsive, user-first interfaces

About:
I build clean, responsive web interfaces using React.js and Tailwind
CSS. Over the past year I shipped three projects - a weather app with
live API data, a personal portfolio, and an e-commerce dashboard with
filtering and cart logic. During my internship at a startup, I fixed
UI bugs across 12 screens and improved load time by reducing
unnecessary re-renders. I am looking for frontend roles where I can
grow while delivering polished user experiences.

Experience - Frontend Intern, XYZ Startup:
• Resolved 40+ UI bugs across 12 screens, improving cross-browser
  consistency
• Reduced component re-renders by 30% through memoization techniques
• Collaborated with the design team to implement pixel-perfect layouts
  using Tailwind CSS
```

---

<!-- SEC-08 -->
## 🚀 Upgrade Prompt

```
Clear objective: Rewrite my LinkedIn profile AND provide a keyword
optimization report.
Role: You are a LinkedIn profile optimization expert.
Added context: I am a final-year IT student. I know React, JavaScript,
Tailwind CSS, and have built 3 projects: a weather app, a portfolio
site, and an e-commerce dashboard. I interned at a startup for 2 months
doing UI bug fixes.
Format: Give me four sections:
  1. Headline (under 120 characters)
  2. About section (under 150 words, first person)
  3. Rewritten experience entry (3 bullet points with action verbs)
  4. Keyword report - a table with two columns: "Keyword" and "Where
     it appears" (headline / about / experience / missing)
Task breakdown: Target keywords that recruiters use when searching for
frontend developers.
Examples: Include terms like "React.js," "responsive design,"
"component-based architecture," "REST API," "Git."
Desired depth: Professional but approachable. No buzzwords.
```

**What changed:** We added a keyword optimization report. The table shows exactly where each recruiter-searched keyword appears in your profile, so you can spot and fix any gaps.

---

<!-- SEC-09 -->
## 🛠️ Guided Practice

1. Open your current LinkedIn profile. Copy your headline, about section, and one experience entry.
2. Decide your target role (e.g., "Backend Developer," "Data Analyst").
3. Build a CRAFTED prompt using the Good Prompt structure above. Paste your real profile text and run it.

**Your task:** Rewrite your LinkedIn headline and about section for your target role. Check that the output includes at least 4 role-specific keywords.

---

<!-- SEC-10 -->
## ⚡ Challenge (5 minutes)

**Scenario:** Your classmate's LinkedIn headline says: "Student | Tech Enthusiast | Open to Work." Their about section is empty.

They want to target Data Analyst roles. They know Python, SQL, Excel, Pandas, and built a sales dashboard project.

Write a CRAFTED prompt that generates a headline, about section, and a keyword placement table for them. Run it and check the result.

---

<!-- SEC-11 -->
## ✅ Checklist

- [ ] I understand why LinkedIn keyword optimization matters for recruiter search.
- [ ] I can write a CRAFTED prompt that rewrites headline, about, and experience sections.
- [ ] I tried the guided practice with my real LinkedIn profile.
- [ ] I completed the challenge for a classmate's profile.

---

<!-- SEC-12 -->
## 📚 What You Learned

1. Recruiters find you on LinkedIn through keyword searches - your profile must contain the right terms.
2. The CRAFTED framework helps you give the AI enough context to write a specific, non-generic profile.
3. A keyword placement report shows where each important term appears and what is missing.

---

<!-- SEC-13 -->
## ❓ Mini Quiz

**Q1:** Your LinkedIn about section uses the phrase "tech enthusiast with a passion for innovation." What is the problem?

- A) It is too short
- B) It contains no searchable keywords tied to a specific role
- C) It uses first person

> **A1:** B - phrases like "tech enthusiast" are not terms recruiters search for. Use specific skills like "React.js" or "SQL" instead.

**Q2:** In the CRAFTED framework, what does the "E" (Examples) do for a LinkedIn prompt?

> **A2:** It tells the AI which specific keywords and phrases to include, like "responsive design" or "REST API," so the output matches what recruiters actually search for.

---

<!-- SEC-14 -->
## 💬 One-Line Takeaway

> Recruiters search LinkedIn like Google - if the right keywords are not in your profile, you are invisible.
