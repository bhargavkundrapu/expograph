#!/usr/bin/env node
require("dotenv").config();
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const API_BASE = process.env.PUBLIC_API_URL || "http://localhost:4000";

const pool = new Pool({ connectionString: DATABASE_URL, ssl: DATABASE_URL.includes("sslmode=require") ? { rejectUnauthorized: false } : false });

async function q(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

function sec(type, data) {
  return { type, data };
}

const MODULES = [
  {
    title: "Foundations",
    slug: "m1-foundations",
    lessons: [
      {
        title: "Prompt Anatomy & GCCF Model",
        slug: "prompt-anatomy-gccf",
        goal: "Learn the 4 building blocks of every great prompt so you never get vague AI answers again.",
        summary: "Master the GCCF framework to write clear, structured prompts.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Learn the 4 building blocks of every great prompt so you never get vague AI answers again.", real_world: "Like giving clear directions to a taxi driver -- the more specific, the faster you reach your destination." }),
          sec("SEC-02_USE_CASE", { scenario: "You need AI to explain a concept for your exam notes, but it keeps giving generic Wikipedia-style answers.", tags: ["study", "coding", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Tell me about machine learning" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. It encompasses supervised learning, unsupervised learning, and reinforcement learning... (continues for 2000 words with no focus)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No specific goal -- AI doesn't know what you need", "No context about your level or use case", "No format instruction -- AI defaults to essay style", "No constraints -- output is unfocused and too long"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Goal: Explain machine learning in simple terms for a 3rd-year CS student preparing for exams.\nContext: I know basic programming but haven't studied ML before.\nConstraints: Keep it under 150 words. Use a real-world analogy.\nFormat: Start with a one-line definition, then the analogy, then 3 key types listed as bullets.", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Machine Learning** = Teaching computers to learn patterns from data instead of writing explicit rules.\n\n**Analogy:** Think of Netflix recommendations. Nobody programs \"show this movie.\" Instead, the system learns your taste from what you watch.\n\n**3 Key Types:**\n- **Supervised Learning** -- learns from labeled examples (spam vs not spam)\n- **Unsupervised Learning** -- finds hidden patterns (customer grouping)\n- **Reinforcement Learning** -- learns by trial and reward (game-playing AI)" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Role: You are a patient CS tutor.\nGoal: Explain machine learning for a 3rd-year CS student preparing for university exams.\nContext: Student knows Python basics but zero ML background.\nConstraints: Under 150 words. Use Netflix as analogy. No math formulas.\nFormat: One-line definition → Real-world analogy → 3 types as bullet points with one-line examples.\nDepth: Intermediate -- assume basic programming knowledge.", what_changed: "Added Role, tightened Context, specified the analogy, and set Depth -- this uses the CRAFTED framework for even more precision." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick any topic from your current semester", "Write a prompt using only Goal + Context (2 parts of GCCF)", "Run it and note what's missing in the output", "Now add Constraints + Format (remaining 2 parts)", "Run again and compare the difference"], task: "Write a GCCF prompt to explain any data structure (stack, queue, tree) for exam prep." }),
          sec("SEC-10_CHALLENGE", { description: "Write a GCCF prompt that makes AI generate a comparison table between Arrays and Linked Lists -- in under 100 words, formatted as a markdown table.", hint: "Start with Goal: Compare arrays and linked lists. Add Context about your level. Constrain the word count and number of comparison points. Set Format as a markdown table." }),
          sec("SEC-11_CHECKLIST", { items: ["My prompt has a clear Goal", "I included relevant Context about myself/situation", "I set specific Constraints (length, style, what to avoid)", "I specified the output Format I want"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Every strong prompt has 4 parts: Goal, Context, Constraints, Format", "Vague prompts give vague answers -- specificity is your superpower", "GCCF works for any AI tool (ChatGPT, Claude, Gemini, Copilot)", "Adding even 2 parts of GCCF dramatically improves output quality"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What does the 'C' in GCCF stand for?", options: ["Commands", "Context", "Code", "Clarity"], correct: 1, explanation: "GCCF = Goal, Context, Constraints, Format. Context tells AI about your situation." }, { question: "Which part of GCCF controls output length and style?", options: ["Goal", "Context", "Constraints", "Format"], correct: 2, explanation: "Constraints set limits -- word count, tone, what to include/exclude." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "A great prompt is a clear instruction with Goal, Context, Constraints, and Format -- never leave AI guessing." })
        ]
      },
      {
        title: "Ambiguity Killers",
        slug: "ambiguity-killers",
        goal: "Eliminate vague words from your prompts so AI gives you exactly what you need, every time.",
        summary: "Remove ambiguity from prompts for precise AI responses.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Eliminate vague words from your prompts so AI gives you exactly what you need, every time.", real_world: "Like ordering food -- 'something good' gets you random dishes, but 'paneer butter masala, medium spice, no cream' gets exactly what you want." }),
          sec("SEC-02_USE_CASE", { scenario: "You ask AI for a 'good resume summary' but keep getting generic paragraphs that don't match your profile.", tags: ["resume", "interview", "content"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write a good resume summary for me" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Highly motivated professional with strong communication skills and a passion for technology. Proven track record of delivering results in fast-paced environments. Seeking a challenging role to leverage my skills and contribute to organizational growth." }),
          sec("SEC-05_WHY_FAILED", { reasons: ["'Good' is subjective -- AI doesn't know your definition of good", "'For me' gives zero information about who you are", "No role, skills, experience level, or target company mentioned", "Result is a generic template that fits nobody"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Write a 3-line resume summary for a final-year B.Tech CSE student.\nSkills: Python, React, SQL, basic ML.\nExperience: 2 internships (web dev at a startup, data analysis at an MNC).\n1 hackathon win (built a campus navigation app).\nTarget role: Junior Full-Stack Developer at a product company.\nTone: Confident but not arrogant. No buzzwords like 'passionate' or 'driven'.", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "B.Tech CSE final-year student with hands-on experience in Python, React, and SQL across 2 internships -- building production features at a startup and analyzing datasets at an MNC. Built a hackathon-winning campus navigation app. Looking for a junior full-stack role at a product company where I can ship real features from day one." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Role: You are a tech recruiter reviewing resumes for a product startup.\nTask: Rewrite this student's resume summary so it passes ATS screening and catches a hiring manager's eye in 6 seconds.\n[Same details as above]\nConstraints: Exactly 3 lines. Start with strongest credential. Include at least 2 measurable achievements. No generic adjectives.\nFormat: Plain text, no bullets.", what_changed: "Added a Role (recruiter perspective), quantified constraints (3 lines, 2 achievements), and added an ATS context -- making it hyper-targeted." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Take any prompt you recently wrote", "Circle every vague word (good, nice, some, a few, interesting, etc.)", "Replace each vague word with a specific detail", "Add numbers wherever possible (3 points, 100 words, 2 examples)", "Run both versions and compare"], task: "Rewrite this vague prompt: 'Give me some tips for interviews' -- make every word specific." }),
          sec("SEC-10_CHALLENGE", { description: "Rewrite this prompt removing ALL ambiguity: 'Help me write a nice email to my professor about my project.' -- Your version should specify the professor's name/title, the project details, the purpose of the email, the tone, and the length.", hint: "Think: Who is the professor? What's the project? Why are you emailing? How formal should it be? How long?" }),
          sec("SEC-11_CHECKLIST", { items: ["I replaced every vague adjective with a specific detail", "I included numbers and quantities where possible", "I specified WHO, WHAT, WHY, and HOW in my prompt", "I removed words like 'good', 'nice', 'some', 'interesting'", "My prompt could only have ONE correct interpretation"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Vague words are the #1 reason for bad AI outputs", "Replace 'good' with what 'good' means to you", "Numbers and specifics are your best friends in prompts", "If a human would ask 'what do you mean?', your prompt is too vague"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Which prompt is more specific?", options: ["Write some code for a website", "Write a React login form with email/password fields and validation", "Write good code", "Make a nice app"], correct: 1, explanation: "It specifies the framework (React), component (login form), fields (email/password), and feature (validation)." }, { question: "What should replace 'a few examples' in a prompt?", options: ["Some examples", "Many examples", "Exactly 3 examples", "Good examples"], correct: 2, explanation: "A specific number (3) removes all ambiguity about how many examples you want." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "If your prompt uses words like 'good', 'some', or 'nice', you're letting AI guess -- replace every vague word with a specific detail." })
        ]
      },
      {
        title: "Clarifying Questions System",
        slug: "clarifying-questions-system",
        goal: "Make AI ask YOU the right questions before answering -- so the output is perfect on the first try.",
        summary: "Use clarifying question prompts for first-try accuracy.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Make AI ask YOU the right questions before answering -- so the output is perfect on the first try.", real_world: "Like a good doctor who asks about symptoms before prescribing -- AI gives better answers when it gathers info first." }),
          sec("SEC-02_USE_CASE", { scenario: "You need AI to write project documentation but the output misses key details because you forgot to mention them.", tags: ["projects", "coding", "content"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write documentation for my project" }),
          sec("SEC-04_BAD_OUTPUT", { output: "# Project Documentation\n\n## Overview\nThis project is a web application that...\n(Generic template with placeholder text that doesn't match your actual project)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["AI has zero context about your project", "It fills gaps with assumptions instead of asking", "You get a generic template, not real documentation", "You'll spend more time fixing it than writing from scratch"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "I need help writing project documentation. But before you write anything, ask me 5-7 clarifying questions to understand:\n- What the project does\n- The tech stack\n- Who will read this documentation\n- What sections I need\nAsk one question at a time. Wait for my answer before asking the next.", framework_used: "GCCF + Clarifying System" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "Great! Let me understand your project first.\n\n**Question 1:** What does your project do in one sentence? (e.g., 'A campus event booking app' or 'A REST API for inventory management')" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "You are a senior technical writer.\nI need project documentation. Before writing:\n1. Ask me 5 targeted questions (project purpose, tech stack, audience, scope, deadline)\n2. After I answer, summarize your understanding in 3 bullets\n3. Ask me to confirm or correct\n4. Only then write the documentation\nFormat: Ask questions as a numbered list. Keep each question under 15 words.", what_changed: "Added a confirmation step (summarize → confirm → write) to prevent misunderstandings before the AI starts writing." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Think of something you need AI to create (email, report, code)", "Instead of asking directly, write: 'Before doing X, ask me Y clarifying questions'", "Answer each question AI asks", "Notice how the final output is much more accurate", "Try adding 'Summarize your understanding before proceeding'"], task: "Write a prompt that makes AI ask 4 questions before generating a study plan for your exam." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'clarifying questions' prompt for this scenario: You want AI to build a personal portfolio website. Make AI ask questions about design preferences, sections needed, tech stack, and content -- all before writing any code.", hint: "Start with: 'I want to build a portfolio website. Before suggesting anything, ask me questions about...' and list the categories." }),
          sec("SEC-11_CHECKLIST", { items: ["I told AI to ask questions BEFORE answering", "I specified how many questions to ask", "I included what topics the questions should cover", "I added a confirmation step before the final output", "I set the format for how questions should be asked"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Making AI ask questions first = better output quality", "You can control how many questions and what topics they cover", "The 'summarize and confirm' step prevents misunderstandings", "This technique works for any complex request"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why should you make AI ask questions before answering?", options: ["It's slower but more fun", "AI gathers context for a more accurate response", "AI doesn't know anything without questions", "It's a required step for all prompts"], correct: 1, explanation: "Clarifying questions help AI understand your exact needs, leading to accurate first-try outputs." }, { question: "What extra step improves the clarifying system?", options: ["Ask more questions", "Add a confirm/summary step before the final answer", "Skip the questions", "Use shorter prompts"], correct: 1, explanation: "A summary + confirmation step lets you catch misunderstandings before AI generates the final output." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Don't let AI assume -- make it ask the right questions first, and your output will be perfect on the first try." })
        ]
      },
      {
        title: "Few-Shot Examples",
        slug: "few-shot-examples",
        goal: "Show AI exactly what you want by giving 2-3 examples -- it copies your style perfectly.",
        summary: "Use few-shot examples to control AI output style and format.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Show AI exactly what you want by giving 2-3 examples -- it copies your style perfectly.", real_world: "Like training a new teammate by showing them completed work samples instead of explaining rules for hours." }),
          sec("SEC-02_USE_CASE", { scenario: "You want AI to generate flashcards from your notes, but the format and difficulty level keep being inconsistent.", tags: ["study", "content", "research"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Make flashcards from these notes about Operating Systems" }),
          sec("SEC-04_BAD_OUTPUT", { output: "**Card 1:** What is an operating system?\nAn operating system is system software that manages computer hardware and software resources.\n\n**Card 2:** Define process.\nA process is a program in execution.\n\n(Inconsistent format, some too simple, some too detailed)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No example of the desired flashcard format", "AI guesses the difficulty level and style", "Some cards are one-word answers, others are paragraphs", "No consistency in question type or answer length"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Create flashcards from my OS notes. Follow this exact format:\n\nExample 1:\nQ: What is a deadlock? (1 sentence)\nA: A deadlock is when two or more processes are stuck waiting for each other to release resources, so none can proceed.\nDifficulty: Medium\n\nExample 2:\nQ: Name 3 CPU scheduling algorithms. (List)\nA: 1) FCFS 2) SJF 3) Round Robin\nDifficulty: Easy\n\nNow create 5 more flashcards in this exact format from these notes:\n[paste notes]", framework_used: "GCCF + Few-Shot" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "Q: What is the difference between a process and a thread? (1 sentence)\nA: A process is an independent program with its own memory space, while a thread is a lightweight unit within a process that shares memory.\nDifficulty: Medium\n\nQ: Name the 4 conditions required for a deadlock. (List)\nA: 1) Mutual Exclusion 2) Hold and Wait 3) No Preemption 4) Circular Wait\nDifficulty: Easy\n\n(... consistent format continues)" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Role: You are a CS professor creating exam-prep flashcards.\nCreate flashcards from my OS notes.\n\n[Same 2 examples as above]\n\nRules:\n- Alternate between 'definition' and 'list' type questions\n- Keep answers under 30 words\n- Mark difficulty as Easy or Medium (no Hard)\n- Add a 'Memory Tip' line with a short mnemonic or analogy\n\nCreate 10 flashcards from:\n[paste notes]", what_changed: "Added Role, explicit rules for alternation and answer length, plus a Memory Tip feature that wasn't in the examples." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick a topic from your current coursework", "Write 2 example outputs in the exact format you want", "Add them to your prompt with 'Follow this exact format:'", "Ask AI to generate 5 more in the same format", "Compare: Are all 5 consistent with your examples?"], task: "Create a few-shot prompt that generates 5 quiz questions about any topic -- show AI 2 examples first." }),
          sec("SEC-10_CHALLENGE", { description: "Write a few-shot prompt to generate LinkedIn posts about your projects. Give 2 example posts with specific style (opening hook, 3 bullet points, CTA). Then ask AI to write 3 more about different projects.", hint: "Your examples should show: hook line, project description in bullets, and a call-to-action. AI will copy this structure." }),
          sec("SEC-11_CHECKLIST", { items: ["I included at least 2 clear examples in my prompt", "My examples show the exact format I want", "I said 'Follow this exact format' or similar instruction", "My examples cover different variations (not identical)", "The output matches my example style consistently"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["2-3 examples teach AI your style better than long instructions", "Few-shot works for any format: tables, bullets, paragraphs, code", "Your examples should show variety, not repetition", "Combining few-shot with GCCF gives the most consistent results"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "How many examples should you typically give for few-shot?", options: ["0 (zero-shot)", "1 (one-shot)", "2-3 (few-shot)", "10+ (many-shot)"], correct: 2, explanation: "2-3 examples strike the best balance -- enough for AI to learn the pattern without overloading the prompt." }, { question: "What should your examples demonstrate?", options: ["Only the correct answer", "The exact format and style you want", "Random variations", "The longest possible response"], correct: 1, explanation: "Examples show AI your desired format, tone, and structure -- it copies the pattern." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Show AI what you want with 2-3 examples, and it will copy your style perfectly every time." })
        ]
      },
      {
        title: "Persona Basics",
        slug: "persona-basics",
        goal: "Assign AI a specific role (tutor, recruiter, reviewer) to get expert-level responses instantly.",
        summary: "Use persona/role assignment for expert-quality AI responses.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Assign AI a specific role (tutor, recruiter, reviewer) to get expert-level responses instantly.", real_world: "Like asking a friend who happens to be a doctor vs. Googling symptoms -- the expert gives focused, relevant advice." }),
          sec("SEC-02_USE_CASE", { scenario: "You want feedback on your code but AI gives generic 'looks good' responses instead of actionable review.", tags: ["coding", "interview", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Review my Python code:\ndef add(a, b):\n    return a + b" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Your code looks correct! The function takes two parameters and returns their sum. Good job!" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No persona -- AI acts as a generic assistant", "No review criteria or depth expectation", "AI just describes the code instead of analyzing it", "No actionable feedback or improvement suggestions"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "You are a senior Python developer with 10 years of experience at Google.\nReview this code like you're conducting a code review for a junior developer's pull request.\nCheck for: naming conventions, type hints, edge cases, documentation, and Pythonic style.\nBe honest and specific. For each issue, show the fix.\n\ndef add(a, b):\n    return a + b", framework_used: "GCCF + Persona" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Code Review -- Pull Request Feedback:**\n\n1. **Missing type hints** (PEP 484)\n   - Current: `def add(a, b)`\n   - Fix: `def add(a: float, b: float) -> float:`\n\n2. **No docstring** (PEP 257)\n   - Add: `\"\"\"Return the sum of two numbers.\"\"\"`\n\n3. **No edge case handling**\n   - What if someone passes strings? Add: `if not isinstance(a, (int, float)): raise TypeError`\n\n4. **Function is too generic**\n   - Consider: Is this utility needed? Built-in `sum()` or `operator.add()` already exist.\n\n**Verdict:** Functional but needs production hardening. Add types, docs, and validation." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "You are a senior Python developer at Google conducting a code review.\nReview as if this is a production pull request.\n\nCheck these categories and rate each (Pass/Needs Work/Fail):\n1. Naming & Style (PEP 8)\n2. Type Safety (PEP 484)\n3. Error Handling\n4. Documentation (PEP 257)\n5. Performance\n\nFor each 'Needs Work' or 'Fail', show the fix.\nEnd with an overall verdict: Approve / Request Changes / Reject.\n\n```python\ndef add(a, b):\n    return a + b\n```", what_changed: "Added a structured rating system (Pass/Needs Work/Fail) and a final verdict -- making the review systematic and actionable." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick a role relevant to what you need (tutor, recruiter, reviewer)", "Write: 'You are a [role] with [experience] at [company/context]'", "Add what specific task they should perform", "Include how they should communicate (honest, simple, structured)", "Run it and notice how the response depth changes"], task: "Assign AI the role of a campus placement interviewer and ask it to evaluate your self-introduction." }),
          sec("SEC-10_CHALLENGE", { description: "Create a prompt where AI acts as 3 different personas reviewing the same resume: (1) an ATS scanner, (2) an HR manager, (3) a technical lead. Each should give different feedback from their perspective.", hint: "Structure it as: 'Review this resume from 3 perspectives. For each, state the role, what they look for, and their verdict.'" }),
          sec("SEC-11_CHECKLIST", { items: ["I assigned a specific role with expertise level", "I described what the persona should do (not just who they are)", "I set the communication style (honest, structured, simple)", "I included relevant context for the persona", "The output sounds like a real expert, not a generic assistant"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Personas make AI responses deeper and more expert-like", "Specify experience level and context for the role", "Different personas give different perspectives on the same input", "Combine personas with GCCF for maximum output quality"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What makes a good persona prompt?", options: ["Just saying 'be smart'", "Specifying role + experience + task + communication style", "Using the word 'expert'", "Making the persona fictional"], correct: 1, explanation: "A good persona has 4 parts: who they are, their experience, what to do, and how to communicate." }, { question: "Can you use multiple personas in one prompt?", options: ["No, only one persona per prompt", "Yes, each persona can give a different perspective", "Only if they agree with each other", "Multiple personas confuse AI"], correct: 1, explanation: "Multiple personas provide different viewpoints -- like getting feedback from different team members." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Tell AI WHO to be and HOW to think -- 'You are a senior developer reviewing code' beats 'review my code' every time." })
        ]
      }
    ]
  },
  {
    title: "Output Control",
    slug: "m2-output-control",
    lessons: [
      {
        title: "Format Control: Tables",
        slug: "format-control-tables",
        goal: "Force AI to output clean, structured tables instead of walls of text.",
        summary: "Master table-format outputs from AI.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Force AI to output clean, structured tables instead of walls of text.", real_world: "Like organizing your bookshelf -- scattered books are hard to find, but a catalogued shelf saves hours." }),
          sec("SEC-02_USE_CASE", { scenario: "You're comparing 5 programming languages for a project decision, but AI gives you paragraphs instead of a clean comparison.", tags: ["study", "projects", "research"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Compare Python, JavaScript, Java, Go, and Rust" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Python is a versatile language known for its simplicity... JavaScript is primarily used for web development... Java is an enterprise-grade language... (5 paragraphs with scattered information, impossible to compare side-by-side)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No format instruction -- AI defaults to paragraphs", "No comparison criteria specified", "Information is scattered, not aligned for comparison", "You can't quickly scan and decide"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Compare these 5 languages in a markdown table.\nLanguages: Python, JavaScript, Java, Go, Rust\nColumns: Language | Best For | Learning Curve | Job Market | Performance\nRules:\n- Keep each cell under 8 words\n- Rate Learning Curve as Easy/Medium/Hard\n- Rate Job Market as High/Medium/Low\n- Rate Performance as Fast/Medium/Slow", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "| Language | Best For | Learning Curve | Job Market | Performance |\n|----------|----------|---------------|------------|-------------|\n| Python | AI/ML, scripting, automation | Easy | High | Medium |\n| JavaScript | Web apps, full-stack | Medium | High | Medium |\n| Java | Enterprise, Android apps | Medium | High | Fast |\n| Go | Cloud, microservices, DevOps | Medium | Medium | Fast |\n| Rust | Systems, performance-critical | Hard | Medium | Fast |" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Create a decision matrix as a markdown table.\nLanguages: Python, JavaScript, Java, Go, Rust\nColumns: Language | Best For | Learning Curve (1-5) | Jobs (1-5) | Performance (1-5) | Ecosystem (1-5) | Total Score\nRules:\n- Rate each category 1-5 (1=worst, 5=best)\n- Calculate Total Score as sum of all ratings\n- Sort by Total Score descending\n- Add a 'Verdict' row at bottom recommending best for a fresh graduate", what_changed: "Added numerical scoring, a total score column, sorting, and a verdict row -- making it a real decision matrix." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick any comparison you need (frameworks, tools, courses)", "Define exactly which columns you want", "Specify the rating system for each column", "Add cell-level constraints (word limits, rating scales)", "Run it and check if every cell follows your rules"], task: "Create a table prompt comparing 3 databases (PostgreSQL, MongoDB, Redis) with 4 columns of your choice." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'weekly study planner' table with columns: Day | Subject | Focus Topic | Time (hrs) | Resources. Fill it for a student preparing for 3 subjects over 7 days. Include a Total row.", hint: "Specify the 3 subjects, time per day limit, and ask AI to distribute topics evenly with variety." }),
          sec("SEC-11_CHECKLIST", { items: ["I specified 'markdown table' or 'table format' explicitly", "I defined all column headers", "I set cell-level constraints (word limits, rating scales)", "I included sorting or ranking if needed", "The output is scannable in under 10 seconds"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Always specify 'table format' -- AI won't default to it", "Define columns AND cell constraints for consistent output", "Numerical ratings make tables actionable for decisions", "Tables work best for comparisons, schedules, and tracking"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What makes a table prompt effective?", options: ["Just saying 'make a table'", "Specifying columns, cell constraints, and sorting", "Using the word 'compare'", "Making it very long"], correct: 1, explanation: "Effective table prompts define columns, set cell limits, and specify any sorting or rating system." }, { question: "When should you use table format instead of paragraphs?", options: ["Always", "When comparing multiple items across same criteria", "Only for numbers", "Never -- paragraphs are better"], correct: 1, explanation: "Tables are ideal for side-by-side comparisons where you need to scan across multiple items and criteria quickly." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Want clean comparisons? Tell AI the exact columns, cell limits, and rating system -- tables beat paragraphs every time." })
        ]
      },
      {
        title: "Format Control: JSON",
        slug: "format-control-json",
        goal: "Get AI to output valid, structured JSON that you can directly use in your code.",
        summary: "Extract structured JSON data from AI outputs.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Get AI to output valid, structured JSON that you can directly use in your code.", real_world: "Like getting data in a spreadsheet format vs. a handwritten letter -- JSON is machine-readable and saves you hours of manual parsing." }),
          sec("SEC-02_USE_CASE", { scenario: "You need to generate mock API data for your project but AI gives you random text instead of valid JSON.", tags: ["coding", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Generate sample data for a student management system" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Here's some sample data:\n\nStudent 1: John Doe, Age 20, CS department, GPA 3.5\nStudent 2: Jane Smith, Age 21, ECE department, GPA 3.8\n..." }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No JSON format specified", "AI outputs plain text that needs manual conversion", "Inconsistent structure -- some fields may be missing", "Cannot be directly used in code"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Generate mock API data for a student management system.\nOutput: Valid JSON array of 3 student objects.\nEach object must have these exact keys:\n- id (string, UUID format)\n- name (string)\n- age (number, 18-25)\n- department (string, one of: CSE, ECE, ME, CE)\n- gpa (number, 2 decimal places, range 2.0-4.0)\n- enrolled_courses (array of strings, 2-4 items)\nOutput ONLY the JSON. No explanation. No markdown code fences.", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "[\n  {\n    \"id\": \"a1b2c3d4-e5f6-7890-abcd-ef1234567890\",\n    \"name\": \"Arjun Patel\",\n    \"age\": 21,\n    \"department\": \"CSE\",\n    \"gpa\": 3.65,\n    \"enrolled_courses\": [\"Data Structures\", \"Machine Learning\", \"DBMS\"]\n  },\n  ...\n]" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Generate a complete mock REST API response for GET /api/students.\nOutput valid JSON with this exact structure:\n{\n  \"status\": 200,\n  \"message\": \"Success\",\n  \"data\": {\n    \"students\": [3 student objects],\n    \"pagination\": { \"page\": 1, \"limit\": 10, \"total\": 3 }\n  }\n}\nStudent object keys: id, name, age, department, gpa, enrolled_courses, created_at (ISO 8601).\nOutput ONLY valid JSON. I will paste this directly into Postman.", what_changed: "Added API response wrapper with status/message/pagination, ISO timestamps, and a real-world context (Postman usage)." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Think of a data structure your project needs (users, products, orders)", "Define the exact keys and their data types", "Specify the number of items and value ranges", "Add 'Output ONLY valid JSON' to enforce clean output", "Paste the result into a JSON validator to verify"], task: "Create a JSON prompt for generating 3 mock 'job listing' objects with fields: id, title, company, salary_range, location, skills_required." }),
          sec("SEC-10_CHALLENGE", { description: "Generate a complete package.json file for a React project with TypeScript, Tailwind, and React Router. Include scripts for dev, build, and test. Make AI output ONLY valid JSON.", hint: "List the exact dependencies with realistic version numbers. Specify the scripts object with actual commands." }),
          sec("SEC-11_CHECKLIST", { items: ["I specified 'valid JSON' in my prompt", "I defined all keys and their data types", "I set value ranges and constraints for each field", "I said 'Output ONLY JSON, no explanation'", "I validated the output in a JSON parser"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["'Output ONLY valid JSON' prevents extra text around the data", "Define key names, types, and value ranges for consistency", "You can generate API responses, configs, and mock data this way", "Always validate AI-generated JSON before using it in code"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "How do you prevent AI from adding explanations around JSON?", options: ["You can't", "Say 'Output ONLY valid JSON. No explanation.'", "Use a special command", "Ask nicely"], correct: 1, explanation: "Explicitly telling AI to output only JSON and nothing else prevents wrapper text." }, { question: "What should you always do with AI-generated JSON?", options: ["Trust it completely", "Validate it in a JSON parser", "Add comments to it", "Convert it to XML"], correct: 1, explanation: "Always validate AI-generated JSON before using it -- AI can sometimes output invalid syntax." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Define exact keys, types, and ranges, then say 'output ONLY valid JSON' -- and you'll get code-ready data every time." })
        ]
      },
      {
        title: "Length Control",
        slug: "length-control",
        goal: "Control exactly how long or short AI responses are -- from one-liners to detailed guides.",
        summary: "Master AI output length for any situation.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Control exactly how long or short AI responses are -- from one-liners to detailed guides.", real_world: "Like writing an exam answer -- 2-mark questions need 2 lines, not 2 pages." }),
          sec("SEC-02_USE_CASE", { scenario: "You ask AI to explain something 'briefly' but get a 500-word essay, or ask for 'detailed' and get 3 sentences.", tags: ["study", "content", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Explain REST APIs briefly" }),
          sec("SEC-04_BAD_OUTPUT", { output: "REST (Representational State Transfer) is an architectural style for distributed systems... (continues for 400+ words covering history, principles, methods, status codes, examples, and best practices)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["'Briefly' is subjective -- means different things to different people", "No word/sentence count specified", "No structure for what to include vs. skip", "AI defaults to covering everything it knows"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Explain REST APIs in exactly 3 levels:\n\nLevel 1 (Tweet -- under 30 words): One-sentence definition.\nLevel 2 (Flashcard -- 50-80 words): Definition + how it works + one example.\nLevel 3 (Study Notes -- 150-200 words): Full explanation with HTTP methods, status codes, and a real example.\n\nLabel each level clearly.", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Level 1 (Tweet):**\nREST API is a way for apps to talk to servers using standard HTTP methods like GET, POST, PUT, DELETE.\n\n**Level 2 (Flashcard):**\nREST API lets your app communicate with a server over HTTP. You send requests (GET to fetch data, POST to create) and receive responses in JSON. Example: GET /api/users returns a list of all users.\n\n**Level 3 (Study Notes):**\n[150-200 word detailed explanation with methods, status codes, and examples]" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Explain REST APIs at 3 depth levels. For each level:\n- State the word limit\n- Match the audience\n- Include only what fits that level\n\nLevel 1 (Elevator Pitch, <30 words): For a non-tech friend.\nLevel 2 (Interview Answer, 60-80 words): For a tech recruiter.\nLevel 3 (Exam Answer, 150-200 words): For a CS professor.\n\nFormat each with the level name, word count in brackets, and the explanation.", what_changed: "Added audience context for each level, making the tone and complexity match the reader -- not just the length." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick a concept you need to explain", "Write 3 length targets: 1 sentence, 1 paragraph, 1 page", "For each, specify word count AND audience", "Run the prompt and count the actual words", "Adjust your constraints if the output is off"], task: "Create a 3-level explanation of 'Git version control' with specific word limits for each level." }),
          sec("SEC-10_CHALLENGE", { description: "Write a prompt that generates your project description in 4 versions: (1) Twitter bio -- 15 words max, (2) LinkedIn summary -- 50 words, (3) README intro -- 150 words, (4) Presentation slide -- 5 bullet points of 10 words each.", hint: "Specify each format with exact word/bullet constraints and the platform context." }),
          sec("SEC-11_CHECKLIST", { items: ["I specified exact word/sentence counts (not 'briefly' or 'detailed')", "I matched length to purpose (tweet, flashcard, essay)", "I included audience context for appropriate depth", "I labeled each section clearly", "I verified the output meets my length constraints"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Never use vague words like 'briefly' or 'in detail'", "Specify exact word counts or sentence limits", "Multi-level explanations (tweet/flashcard/essay) are versatile", "Audience context affects depth even at the same length"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Which is a better length instruction?", options: ["Keep it short", "Explain in exactly 80-100 words", "Be brief", "Don't write too much"], correct: 1, explanation: "Exact word ranges (80-100 words) give AI a clear target. 'Short' and 'brief' are subjective." }, { question: "What else should you add besides word count?", options: ["Nothing -- word count is enough", "Audience and purpose context", "More words", "A longer prompt"], correct: 1, explanation: "Audience context helps AI match the complexity level to the reader, not just the length." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Replace 'briefly' with '80 words for a recruiter' -- exact numbers + audience = perfect length every time." })
        ]
      },
      {
        title: "Strict Mode: No Extra Text",
        slug: "strict-mode-no-extra-text",
        goal: "Make AI output ONLY what you asked for -- no intros, disclaimers, or 'hope this helps!'",
        summary: "Eliminate filler text and get clean, direct AI outputs.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Make AI output ONLY what you asked for -- no intros, disclaimers, or 'hope this helps!'", real_world: "Like ordering 'just black coffee' and getting it without being asked about sugar, milk, size, and your life story." }),
          sec("SEC-02_USE_CASE", { scenario: "You need a clean code snippet but AI wraps it in 'Sure! Here's the code...' and 'Let me know if you need anything else!'", tags: ["coding", "content", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write a Python function to reverse a string" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Sure! Here's a Python function to reverse a string:\n\n```python\ndef reverse_string(s):\n    return s[::-1]\n```\n\nThis function uses Python's slicing feature to reverse the string. The `[::-1]` syntax creates a reversed copy. Let me know if you need any modifications!" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["'Sure! Here's...' is filler you don't need", "The explanation after the code was not requested", "'Let me know if...' adds nothing useful", "You have to manually strip the wrapper text to use the code"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Write a Python function to reverse a string.\n\nRules:\n- Output ONLY the code\n- No introduction or greeting\n- No explanation after the code\n- No markdown code fences\n- No 'let me know' or similar phrases", framework_used: "GCCF + Strict Mode" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "def reverse_string(s):\n    return s[::-1]" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "STRICT OUTPUT MODE.\nYou will output ONLY what is requested. Nothing more.\nDo NOT include:\n- Greetings or introductions\n- Explanations or commentary\n- Markdown formatting\n- Sign-off phrases\n- Disclaimers\n\nRequest: Python function to reverse a string, with type hints and docstring.\nOutput starts on the next line:", what_changed: "Created a reusable 'STRICT OUTPUT MODE' header that can be added to any prompt for clean, direct responses." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Write any prompt that asks for code or content", "Run it without strict mode and note the filler text", "Add the strict mode rules from above", "Run again and compare -- notice the clean output", "Save your strict mode header as a reusable template"], task: "Create a strict-mode prompt that outputs ONLY a SQL query (no explanation) to find the top 5 students by GPA." }),
          sec("SEC-10_CHALLENGE", { description: "Create a prompt that generates ONLY a .gitignore file content for a Node.js + React project. The output should be directly pasteable into a file -- no explanations, no code fences, just the raw content.", hint: "Use 'STRICT OUTPUT MODE' and specify: 'Output the raw file content only. First line of your response should be the first line of the file.'" }),
          sec("SEC-11_CHECKLIST", { items: ["I explicitly said 'No introduction/greeting'", "I said 'No explanation after the output'", "I specified 'No markdown fences' if I need raw content", "I said 'Output starts on the next line:' to force clean start", "The output is directly usable without any editing"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["AI adds filler text by default -- you must explicitly tell it not to", "Create a reusable 'STRICT OUTPUT MODE' template", "'Output starts on the next line:' forces AI to begin with the actual content", "This is essential for code, configs, and any copy-paste-ready content"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why does AI add 'Sure! Here's...' to responses?", options: ["It's required by AI rules", "It defaults to being conversational and helpful", "You asked for it", "It's a bug"], correct: 1, explanation: "AI is trained to be conversational. You need explicit instructions to get clean, direct output." }, { question: "What phrase forces AI to start with actual content?", options: ["Please be direct", "Output starts on the next line:", "Just the code please", "Skip the intro"], correct: 1, explanation: "'Output starts on the next line:' clearly tells AI where to begin, forcing it to skip all filler." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Add 'STRICT OUTPUT MODE: No intro, no explanation, output starts on the next line' -- and get exactly what you asked for." })
        ]
      },
      {
        title: "Multi-Version Output",
        slug: "multi-version-output",
        goal: "Get AI to generate multiple versions of the same content so you can pick the best one.",
        summary: "Generate multiple content variations in a single prompt.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Get AI to generate multiple versions of the same content so you can pick the best one.", real_world: "Like a designer showing you 3 logo options instead of 1 -- more choices mean better final decisions." }),
          sec("SEC-02_USE_CASE", { scenario: "You need a project tagline but the first AI output is 'meh' -- instead of reprompting 5 times, get 5 options at once.", tags: ["content", "resume", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write a tagline for my portfolio website" }),
          sec("SEC-04_BAD_OUTPUT", { output: "\"Building the future, one line of code at a time.\"" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["Only one option -- if you don't like it, you reprompt", "Each reprompt wastes time and may give similar results", "No variety in tone, style, or approach", "No criteria to evaluate which version is best"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Write 5 tagline options for my developer portfolio.\nAbout me: Final-year CSE student, full-stack developer, built 3 projects.\n\nGenerate 5 versions, each with a different style:\n1. Professional and clean\n2. Bold and confident\n3. Minimal (under 5 words)\n4. Question-based (hooks curiosity)\n5. Technical but approachable\n\nFormat: Number | Style | Tagline", framework_used: "GCCF" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "1 | Professional | Full-stack developer turning ideas into production-ready applications.\n2 | Bold | I don't just write code. I build products.\n3 | Minimal | Code. Build. Ship.\n4 | Question | What if your next developer is already building?\n5 | Technical | From React components to PostgreSQL queries -- I own the full stack." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Write 5 tagline options for my developer portfolio.\n[Same context as above]\n\nFor each version:\n- State the style\n- Write the tagline\n- Rate its impact (1-5)\n- Explain in 10 words why this style works\n\nFormat as a table: # | Style | Tagline | Impact | Why It Works\nAfter the table, recommend the best one for a placement portfolio.", what_changed: "Added impact ratings, brief justifications, and a final recommendation -- making it easy to decide without analysis paralysis." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick something you need written (email, bio, message)", "Ask for 3-5 versions with different styles", "Define each style clearly (formal, casual, bold, minimal)", "Add a rating or comparison criteria", "Pick the best version or mix elements from multiple"], task: "Create a multi-version prompt for your LinkedIn headline -- generate 4 versions (professional, creative, keyword-rich, story-based)." }),
          sec("SEC-10_CHALLENGE", { description: "Generate 3 versions of a cold email to a startup founder asking for an internship. Version 1: Formal. Version 2: Direct and confident. Version 3: Story-based opening. Each under 100 words. Add a 'Best For' note for each.", hint: "Define the context (your background, the startup), then ask for each version with its style label and word limit." }),
          sec("SEC-11_CHECKLIST", { items: ["I asked for a specific number of versions (3-5)", "Each version has a distinct style label", "I specified format for easy comparison", "I included evaluation criteria (rating, 'best for')", "I can pick the best one without reprompting"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Multi-version prompts save time vs. reprompting multiple times", "Label each version with a clear style for easy comparison", "Add ratings or 'best for' notes to help you choose", "Mix elements from different versions for the perfect result"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why generate multiple versions instead of reprompting?", options: ["It's more fun", "You get variety in one shot and save time", "AI gives better results the first time", "You should never reprompt"], correct: 1, explanation: "Multi-version prompts give you diverse options in one response, saving the time of multiple back-and-forth prompts." }, { question: "What makes each version useful?", options: ["Making them identical", "Giving each a distinct style and purpose", "Making them very long", "Using different languages"], correct: 1, explanation: "Distinct styles (formal, bold, minimal) give you real variety to choose from." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Ask for 5 versions with different styles in one prompt -- pick the best, mix the rest, and never settle for the first draft." })
        ]
      }
    ]
  },
  {
    title: "Debugging & Refinement",
    slug: "m3-debugging-refinement",
    lessons: [
      {
        title: "Common Failure Types",
        slug: "common-failure-types",
        goal: "Identify the 5 most common reasons AI gives bad answers -- and fix each one instantly.",
        summary: "Diagnose and fix the top 5 prompt failure patterns.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Identify the 5 most common reasons AI gives bad answers -- and fix each one instantly.", real_world: "Like a mechanic who can hear the engine sound and know exactly what's wrong -- diagnose prompt problems by their symptoms." }),
          sec("SEC-02_USE_CASE", { scenario: "Your prompts keep giving inconsistent or wrong results but you don't know why -- you just keep rewriting from scratch.", tags: ["study", "coding", "projects", "content"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Why is my code not working? Fix it." }),
          sec("SEC-04_BAD_OUTPUT", { output: "I'd be happy to help! Could you please share the code you're referring to? Without seeing the actual code, I can provide some general debugging tips...\n(Generic advice that doesn't solve anything)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["Missing Input -- no code was provided", "Vague Request -- 'fix it' gives AI nothing to work with", "No Context -- language, error message, expected behavior all missing", "This is Failure Type #1: The Empty Prompt"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Here are the 5 common prompt failure types. I'll show you each with a fix:\n\n1. EMPTY PROMPT: Missing key information\n   Fix: Add the missing context, code, or data\n\n2. VAGUE WORDS: Using 'good', 'better', 'some'\n   Fix: Replace with specifics and numbers\n\n3. CONTRADICTIONS: Conflicting instructions\n   Fix: Review and remove conflicting requirements\n\n4. WRONG SCOPE: Asking too much or too little\n   Fix: Break large tasks into steps\n\n5. FORMAT MISMATCH: Not specifying output format\n   Fix: Add explicit format instructions\n\nDiagnose this prompt: 'Make my essay better'\nIdentify which failure types apply and rewrite it.", framework_used: "Diagnostic Framework" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Diagnosis of 'Make my essay better':**\n\n- Failure Type #1 (Empty): No essay provided\n- Failure Type #2 (Vague): 'Better' is undefined\n- Failure Type #5 (Format): No output format specified\n\n**Rewritten Prompt:**\n'Review my essay on climate change (pasted below). Improve clarity, fix grammar, and strengthen the argument. Keep the same structure. Mark changes in bold. Word limit: stay within 500 words.'" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "You are a prompt debugging expert.\nI'll give you a failed prompt. For each:\n1. Identify which of the 5 failure types apply\n2. Rate severity (Low/Medium/High) for each\n3. Show the specific words/phrases that caused each failure\n4. Rewrite the prompt fixing all issues\n5. Explain what changed and why\n\nFailed prompt: 'Write some good code for my project'\nDiagnose and fix.", what_changed: "Turned diagnosis into a systematic framework with severity ratings and specific word-level analysis." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Look at your last 5 AI prompts that gave poor results", "For each, identify which of the 5 failure types apply", "Note the pattern -- which failure type do you make most?", "Rewrite your worst prompt fixing all identified failures", "Run the fixed version and compare results"], task: "Take this prompt: 'Help me study for my exam' -- diagnose all failure types and rewrite it." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'Prompt Doctor' prompt: Give AI a bad prompt and make it diagnose all 5 failure types, rate each, and output a fixed version with a before/after comparison table.", hint: "Include the 5 failure types as reference, then ask AI to analyze the given prompt against each type." }),
          sec("SEC-11_CHECKLIST", { items: ["I can identify Empty Prompts (missing information)", "I can spot Vague Words (subjective language)", "I can find Contradictions (conflicting instructions)", "I can detect Wrong Scope (too broad or too narrow)", "I can recognize Format Mismatches (no output format)"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["5 failure types: Empty, Vague, Contradictions, Wrong Scope, Format Mismatch", "Most bad prompts have 2-3 failure types simultaneously", "Diagnosing the failure type tells you exactly what to fix", "You can create a 'Prompt Doctor' that debugs prompts automatically"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "'Write something nice about dogs' -- which failure type?", options: ["Empty Prompt", "Vague Words", "Contradiction", "Wrong Scope"], correct: 1, explanation: "'Something nice' is subjective and vague. Replace with specific tone, length, and purpose." }, { question: "'Make it short but include everything' -- which failure type?", options: ["Empty Prompt", "Vague Words", "Contradiction", "Format Mismatch"], correct: 2, explanation: "'Short' and 'include everything' directly contradict each other. Pick one or define what 'everything' means within a word limit." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Every bad AI answer falls into 5 fixable failure types -- diagnose first, then fix the specific problem instead of rewriting from scratch." })
        ]
      },
      {
        title: "3R Loop Workflow",
        slug: "3r-loop-workflow",
        goal: "Master the Request-Review-Refine loop to improve any AI output in 3 quick iterations.",
        summary: "Use the 3R Loop for iterative prompt improvement.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Master the Request-Review-Refine loop to improve any AI output in 3 quick iterations.", real_world: "Like editing a photo -- the first shot is raw, but crop, adjust brightness, and sharpen = perfect in 3 steps." }),
          sec("SEC-02_USE_CASE", { scenario: "Your first AI output is 70% right but needs tweaking -- instead of rewriting from scratch, you refine in 3 quick steps.", tags: ["study", "coding", "content", "resume"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "That's not what I wanted. Try again." }),
          sec("SEC-04_BAD_OUTPUT", { output: "(AI regenerates something equally wrong because it doesn't know WHAT was wrong or HOW to fix it)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["'Try again' gives zero feedback on what was wrong", "AI doesn't know which parts to keep vs. change", "Each 'try again' is basically a fresh start, not a refinement", "You waste 10 prompts when 3 targeted ones would work"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Step 1 (Request): Write a cover letter for a junior developer applying to a startup.\n\n[After getting output]\n\nStep 2 (Review): The output is too formal. Keep the structure but:\n- Make the tone more conversational\n- Remove 'I am writing to express my interest'\n- Add a specific project I built (campus event app)\n- Keep it under 200 words\n\n[After getting refined output]\n\nStep 3 (Refine): Almost perfect. Final tweaks:\n- Make the opening hook stronger\n- End with a specific call-to-action\n- Replace 'utilize' with simpler words", framework_used: "3R Loop" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**After 3R Loop, Final Version:**\n\nHi [Name],\n\nLast semester, I built a campus event app that 200 students now use daily. That project taught me what good software feels like -- fast, intuitive, and actually useful.\n\nI'm a final-year CSE student with hands-on experience in React, Node.js, and PostgreSQL. Your startup's focus on user experience is exactly where I want to grow.\n\nI'd love a 15-minute chat about how I can contribute to your team. Free this Thursday or Friday?\n\nBest,\n[Name]" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "We're using the 3R Loop. I'll give you my request. After your output, I'll review and give specific feedback. Rules for the loop:\n- Keep everything I don't mention in my review\n- Only change what I specifically point out\n- After each refinement, briefly list what you changed\n- After 3 iterations, we stop and finalize\n\nRequest: Write a project description for my GitHub README (campus event booking app, React + Node.js + PostgreSQL, 200 users).", what_changed: "Set explicit loop rules: preserve unchanged parts, list changes made, and cap iterations at 3 -- making the refinement systematic." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Write a Request prompt for something you need", "Run it and read the output critically", "Write a Review that points out exactly what to keep, change, and add", "Run the Review prompt and check the result", "Write a Refine prompt for final polish -- then stop after 3 total rounds"], task: "Use the 3R Loop to create your perfect LinkedIn summary. Start with a basic request, then refine twice." }),
          sec("SEC-10_CHALLENGE", { description: "Use the 3R Loop to write a technical blog post intro (about any topic). Round 1: Basic draft. Round 2: Fix tone and add a hook. Round 3: Tighten to under 100 words. Show all 3 versions.", hint: "In each review, be specific about what's wrong and what to keep. Don't say 'make it better' -- say 'change the opening line to a question'." }),
          sec("SEC-11_CHECKLIST", { items: ["Round 1 (Request): I wrote a clear initial prompt", "Round 2 (Review): I gave specific feedback, not 'try again'", "Round 3 (Refine): I made final tweaks only", "I told AI to keep unchanged parts", "I stopped after 3 rounds (no endless loop)"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["3R Loop: Request → Review → Refine -- never more than 3 rounds", "Always specify what to keep AND what to change", "Tell AI to list what it changed after each round", "'Try again' wastes time -- targeted feedback saves it"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What's wrong with saying 'Try again' to AI?", options: ["Nothing -- it works fine", "AI doesn't know what to keep, change, or fix", "AI refuses to try again", "It's rude to AI"], correct: 1, explanation: "'Try again' gives no feedback. AI needs to know what was wrong and what to change specifically." }, { question: "How many rounds should the 3R Loop have?", options: ["1 round", "3 rounds maximum", "As many as needed", "10 rounds"], correct: 1, explanation: "The 3R Loop caps at 3 rounds: Request, Review, Refine. If it's not right in 3, your initial prompt needs redesigning." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Never say 'try again' -- tell AI exactly what to keep, what to change, and what to add, in 3 rounds max." })
        ]
      },
      {
        title: "Self-Critique Prompts",
        slug: "self-critique-prompts",
        goal: "Make AI review and improve its OWN output before you even read it.",
        summary: "Use self-critique prompts for higher quality first drafts.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Make AI review and improve its OWN output before you even read it.", real_world: "Like having a built-in editor who reviews the draft before sending it to you -- you get a polished version on the first try." }),
          sec("SEC-02_USE_CASE", { scenario: "AI gives you a 'good enough' answer but it always needs your manual editing -- you want it polished from the start.", tags: ["content", "coding", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write an introduction for my blog post about AI in education" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Artificial Intelligence is transforming the education sector in remarkable ways. From personalized learning to automated grading, AI tools are changing how students learn and how teachers teach. In this blog post, we will explore...\n(Generic, boring opening that sounds like every other AI-written intro)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No self-review step -- AI outputs its first draft", "First drafts are usually generic and safe", "No criteria for what 'good' means", "You become the editor instead of the reader"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Write an introduction for a blog post about AI in education (for college students).\n\nAfter writing, review your own output:\n1. Is the opening line a hook or a boring statement?\n2. Does it sound like a human wrote it, not AI?\n3. Is there a specific example or statistic?\n4. Would a college student actually want to keep reading?\n\nIf any answer is 'no', rewrite before showing me. Show only the final polished version.", framework_used: "GCCF + Self-Critique" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "Last month, a student passed her Data Structures exam by studying entirely with AI-generated flashcards and practice problems. No textbook. No tuition class. Just prompts.\n\nThis isn't the future of education -- it's already happening on campuses right now. But most students are using AI wrong: copying answers instead of using it as a study partner.\n\nHere's how to actually use AI to learn faster without losing the ability to think." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Write a blog intro about AI in education (audience: college students).\n\nThen run this internal checklist BEFORE showing output:\n[ ] Opening line is a story, statistic, or question (not 'AI is transforming...')\n[ ] Tone is conversational (read it aloud -- does it sound human?)\n[ ] At least 1 specific detail (name, number, example)\n[ ] Under 80 words\n[ ] Would pass the 'would I share this on Instagram stories?' test\n\nIf ANY box is unchecked, rewrite. Show ONLY the final version.", what_changed: "Turned self-critique into a checklist with a fun quality test ('Instagram stories' test), making the review systematic and relatable." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Write a prompt for any content you need", "Add 'After writing, check: [3-4 specific quality criteria]'", "Add 'If any criteria fails, rewrite before showing me'", "Run it and notice the quality improvement", "Create your own 3-item quality checklist for future use"], task: "Write a self-critique prompt for generating a professional email to a professor. Include 3 quality criteria." }),
          sec("SEC-10_CHALLENGE", { description: "Create a prompt that generates a resume bullet point AND self-critiques it against these criteria: (1) starts with action verb, (2) includes a number, (3) shows impact, (4) under 20 words. The output should show the revised version only.", hint: "Give AI the bullet point task, then the 4-point checklist, then say 'Rewrite until all 4 pass. Show only the final version.'" }),
          sec("SEC-11_CHECKLIST", { items: ["I added a self-review step after the main task", "I listed specific quality criteria (not just 'make it good')", "I said 'rewrite before showing me' to enforce self-editing", "I requested only the final polished version", "My quality criteria match what I would check manually"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Self-critique prompts make AI its own editor", "Specific checklists work better than vague 'make it better'", "This saves you manual editing time", "You can create reusable quality checklists for different content types"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What is a self-critique prompt?", options: ["A prompt that criticizes the user", "A prompt that makes AI review and improve its own output", "A prompt about criticism", "A very negative prompt"], correct: 1, explanation: "Self-critique prompts include a review step where AI checks its output against quality criteria before showing you." }, { question: "What should you add to make self-critique effective?", options: ["Just say 'review it'", "Specific quality criteria as a checklist", "Ask AI to be harsh", "Nothing -- AI reviews automatically"], correct: 1, explanation: "Specific, measurable criteria (starts with verb, under 20 words, includes number) make the self-review actionable." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Add 'Review your output against these criteria and rewrite before showing me' -- AI becomes its own editor, and you get polished results." })
        ]
      },
      {
        title: "Prompt Versioning",
        slug: "prompt-versioning",
        goal: "Save and improve your best prompts like code versions -- never lose a great prompt again.",
        summary: "Create a personal prompt versioning system for reuse.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Save and improve your best prompts like code versions -- never lose a great prompt again.", real_world: "Like Git for code -- version control your prompts so you can track what works, what changed, and roll back if needed." }),
          sec("SEC-02_USE_CASE", { scenario: "You wrote an amazing prompt 2 weeks ago but can't find it. Now you're recreating it from memory and it's not as good.", tags: ["projects", "content", "coding"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "(No prompt -- you just type new prompts every time and never save them)" }),
          sec("SEC-04_BAD_OUTPUT", { output: "(Inconsistent results because every prompt is written from scratch, no learning from past successes)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No system to save successful prompts", "Recreating from memory loses key details", "No way to track what changed between versions", "Same mistakes get repeated because nothing is documented"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Here's a simple prompt versioning format:\n\n---\nPrompt ID: CODE-REVIEW-v3\nLast Updated: 2025-02-20\nPurpose: Code review for Python\nWorks with: ChatGPT, Claude, Gemini\n\nPrompt:\n\"You are a senior Python developer...\n[full prompt text]\"\n\nChangelog:\n- v1: Basic code review\n- v2: Added rating system (Pass/Needs Work/Fail)\n- v3: Added performance category and verdict line\n---\n\nUse this format to save your best prompts.", framework_used: "Prompt Versioning System" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Your Prompt Library (Example Entry):**\n\nPrompt ID: RESUME-SUMMARY-v2\nLast Updated: 2025-02-20\nPurpose: Generate ATS-friendly resume summary\n\nPrompt: \"Role: Tech recruiter. Write a 3-line resume summary for a B.Tech CSE student...\"\n\nChangelog:\n- v1: Basic summary generation\n- v2: Added ATS focus, removed buzzwords, added measurable achievements" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Help me create a prompt versioning template with these fields:\n- Prompt ID (short, descriptive, versioned)\n- Purpose (one line)\n- Category (code/content/study/career)\n- Works with (which AI tools)\n- Full prompt text\n- Variables (parts that change each time, marked with [BRACKETS])\n- Changelog (version history)\n- Success rate (how often it gives good results)\n\nCreate the template and fill it with one example for a 'code review' prompt.", what_changed: "Added Variables (reusable parts), Category tags, Success rate tracking, and clear bracketed placeholders." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Think of your 3 best prompts from this course", "Save each using the versioning format above", "For each, mark the parts that change with [BRACKETS]", "Create a folder/document called 'My Prompt Library'", "Next time you need a similar prompt, check your library first"], task: "Create a versioned prompt entry for the GCCF prompt from Lesson 1. Use the template and mark variables with [BRACKETS]." }),
          sec("SEC-10_CHALLENGE", { description: "Create a prompt library with 3 entries: (1) Study notes generator, (2) Resume bullet writer, (3) Code reviewer. Each entry should follow the versioning template with variables marked in [BRACKETS].", hint: "Use the template format from this lesson. For variables, think: what changes each time you use this prompt? (topic, code, skills, etc.)" }),
          sec("SEC-11_CHECKLIST", { items: ["I saved my best prompts with version numbers", "Variables are marked with [BRACKETS] for reuse", "Each entry has a changelog showing improvements", "I have a dedicated document/folder for my prompt library", "I check my library before writing new prompts from scratch"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Version your prompts like code -- track changes and improvements", "Mark variables with [BRACKETS] so prompts are reusable", "A prompt library saves time and ensures consistency", "Changelogs help you understand what improvements matter most"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why should you version your prompts?", options: ["It's fun to name things", "Track improvements and never lose a working prompt", "AI requires it", "It's just for documentation"], correct: 1, explanation: "Versioning helps you track what works, what changed, and reuse proven prompts instead of starting from scratch." }, { question: "What are [BRACKETS] used for in prompt templates?", options: ["Decoration", "Variables that change each time you use the prompt", "Comments for AI", "Error markers"], correct: 1, explanation: "[BRACKETS] mark the parts that change each time (topic, code, name) -- everything else stays the same." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Save your best prompts with version numbers and [BRACKET] variables -- your prompt library is your most valuable AI tool." })
        ]
      },
      {
        title: "Reusable Prompt Templates",
        slug: "reusable-prompt-templates",
        goal: "Build fill-in-the-blank prompt templates you can reuse for any task in seconds.",
        summary: "Create modular, reusable prompt templates with variables.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Build fill-in-the-blank prompt templates you can reuse for any task in seconds.", real_world: "Like having a recipe card -- you don't reinvent the recipe each time, you just swap the ingredients." }),
          sec("SEC-02_USE_CASE", { scenario: "You write the same type of prompt daily (study notes, code review, email) but rewrite it from scratch every time.", tags: ["study", "coding", "content", "career"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "(Writing a new 10-line prompt every time you need study notes for a different topic)" }),
          sec("SEC-04_BAD_OUTPUT", { output: "(Inconsistent quality because each prompt is slightly different, and you forget key instructions)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["Rewriting from scratch wastes time", "You forget important instructions in some versions", "Quality varies because the prompt quality varies", "No systematic approach to prompt reuse"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "STUDY NOTES TEMPLATE:\n\nRole: You are a [SUBJECT] tutor for [LEVEL] students.\nTask: Create study notes on [TOPIC] for exam preparation.\nConstraints:\n- Length: [WORD_COUNT] words\n- Include: [NUM_EXAMPLES] examples\n- Difficulty: [DIFFICULTY]\nFormat: [FORMAT_TYPE]\n\n---\nFilled example:\nRole: You are a DBMS tutor for 3rd-year B.Tech students.\nTask: Create study notes on Normalization for exam preparation.\nConstraints: 200 words, 2 examples, Medium difficulty.\nFormat: Bullet points with bold key terms.", framework_used: "GCCF Template" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Normalization -- Quick Study Notes**\n\n- **What:** Process of organizing database tables to reduce redundancy\n- **Why:** Prevents data anomalies (insert, update, delete problems)\n\n**The Normal Forms:**\n- **1NF:** Each cell has a single value (no lists in columns)\n  - Example: Split 'CSE, Math' into separate rows\n- **2NF:** 1NF + no partial dependencies (every non-key column depends on the FULL primary key)\n- **3NF:** 2NF + no transitive dependencies\n  - Example: If Student → Department → HOD, move HOD to Department table\n\n**Exam Tip:** Draw the dependency diagram first, then normalize step by step." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Create a mega-template system with these 5 templates:\n\n1. STUDY-NOTES: [SUBJECT] + [TOPIC] + [LEVEL] + [FORMAT]\n2. CODE-REVIEW: [LANGUAGE] + [CODE] + [REVIEW_DEPTH]\n3. EMAIL-WRITER: [RECIPIENT] + [PURPOSE] + [TONE] + [LENGTH]\n4. RESUME-BULLET: [ACTION] + [PROJECT] + [IMPACT] + [TECH]\n5. EXPLAIN-CONCEPT: [CONCEPT] + [AUDIENCE] + [ANALOGY_DOMAIN]\n\nFor each template:\n- Show the template with [VARIABLES]\n- Show one filled example\n- List all available variable options", what_changed: "Created a complete template system covering 5 common use cases with clear variables and examples." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Identify your top 3 most-used prompt types", "Convert each into a template with [BRACKET] variables", "List all possible values for each variable", "Test each template by filling it with different values", "Save templates in your prompt library from Lesson 4"], task: "Create a reusable template for 'Interview question practice' with at least 4 variables." }),
          sec("SEC-10_CHALLENGE", { description: "Build a 'Universal Email Template' with these variables: [RECIPIENT_ROLE], [PURPOSE], [TONE], [KEY_POINTS], [CALL_TO_ACTION], [LENGTH]. Show the template and 3 different filled versions (professor, recruiter, teammate).", hint: "Write the template first with all variables. Then fill it 3 times with different values to show its versatility." }),
          sec("SEC-11_CHECKLIST", { items: ["I identified my most-used prompt types", "Each template has clearly marked [VARIABLES]", "I listed possible values for each variable", "I tested the template with different fills", "Templates are saved in my prompt library"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Templates save time and ensure consistent quality", "Use [BRACKETS] for parts that change each time", "5 good templates can cover 80% of your daily AI use", "Combine templates with versioning for a powerful prompt system"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What is a prompt template?", options: ["A pre-written prompt that never changes", "A fill-in-the-blank prompt with swappable variables", "A prompt for making templates", "A very long prompt"], correct: 1, explanation: "Templates have fixed structure with [VARIABLES] you swap out -- same prompt quality, different inputs." }, { question: "How many templates do you need for most daily tasks?", options: ["1", "3-5 cover about 80% of use cases", "50+", "You need a new one every time"], correct: 1, explanation: "3-5 well-designed templates with variables can handle most daily AI tasks -- study, code, email, resume, explain." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Build 5 templates with [VARIABLES], save them, and you'll handle 80% of your AI tasks in seconds -- not minutes." })
        ]
      }
    ]
  },
  {
    title: "Truthfulness & Reliability",
    slug: "m4-truthfulness-reliability",
    lessons: [
      {
        title: "Don't Guess Mode",
        slug: "dont-guess-mode",
        goal: "Stop AI from making up facts by telling it to say 'I don't know' when unsure.",
        summary: "Prevent AI hallucinations with explicit uncertainty rules.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Stop AI from making up facts by telling it to say 'I don't know' when unsure.", real_world: "Like a friend who says 'I'm not sure, let me check' instead of confidently giving wrong directions." }),
          sec("SEC-02_USE_CASE", { scenario: "You ask AI a factual question and it gives a confident but completely wrong answer -- and you don't realize it's wrong.", tags: ["study", "research", "interview"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "What is the time complexity of Dijkstra's algorithm with a Fibonacci heap?" }),
          sec("SEC-04_BAD_OUTPUT", { output: "The time complexity of Dijkstra's algorithm with a Fibonacci heap is O(V log V + E).\n(This happens to be correct, but AI often gets such details wrong without warning)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["AI never says 'I'm not sure' by default", "It generates confident-sounding answers even when uncertain", "No instruction to flag uncertain information", "You might use wrong facts in your exam or project"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Answer this question about Dijkstra's algorithm.\n\nCRITICAL RULES:\n- If you're not 100% certain, say 'NOT VERIFIED: [your answer]'\n- If you don't know, say 'I don't have reliable information on this'\n- Never make up numbers, dates, or references\n- If there are multiple valid answers, list all with confidence levels\n\nQuestion: What is the time complexity of Dijkstra's algorithm with a Fibonacci heap?", framework_used: "GCCF + Don't Guess Mode" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "The time complexity of Dijkstra's algorithm with a Fibonacci heap is **O(V log V + E)**.\n\nConfidence: High -- this is well-documented in CLRS (Introduction to Algorithms, Chapter 24).\n\nNote: This assumes a sparse graph. For dense graphs (E close to V^2), the improvement over a binary heap (O((V+E) log V)) is significant." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "FACT-CHECK MODE ON.\n\nRules:\n- Rate every factual claim: [VERIFIED], [LIKELY], or [UNVERIFIED]\n- For [UNVERIFIED] claims, suggest how to verify\n- Cite sources when possible (textbook, documentation, RFC)\n- If conflicting information exists, present both sides\n- At the end, give an overall reliability score (1-10)\n\nQuestion: What is the time complexity of Dijkstra's algorithm with a Fibonacci heap?", what_changed: "Added a 3-tier confidence system, source citations, conflict handling, and an overall reliability score." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick a factual question from your course material", "Ask AI without Don't Guess Mode and note the answer", "Now add the Don't Guess Mode rules and ask again", "Compare: did AI flag any uncertainty the second time?", "Verify the flagged items with your textbook or professor"], task: "Ask AI about a specific algorithm's space complexity with Don't Guess Mode enabled. Check if it flags any uncertainty." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'Fact-Check Mode' prompt that reviews a paragraph of technical content. AI should mark each claim as VERIFIED, LIKELY, or UNVERIFIED, and suggest a source for each unverified claim.", hint: "Provide a sample paragraph with 3-4 factual claims. Ask AI to annotate each claim with confidence level and source." }),
          sec("SEC-11_CHECKLIST", { items: ["I told AI to flag uncertain answers with 'NOT VERIFIED'", "I said 'If you don't know, say so'", "I asked for confidence levels on factual claims", "I requested sources or verification methods", "I didn't trust any unverified claims without checking"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["AI makes up facts by default -- you must tell it not to", "'NOT VERIFIED' and 'I don't know' are more useful than wrong answers", "Confidence levels help you prioritize what to fact-check", "Always verify AI's factual claims with primary sources"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why does AI make up facts?", options: ["It's dishonest", "It's trained to always provide an answer, even when uncertain", "It doesn't understand the question", "It's a bug"], correct: 1, explanation: "AI is trained to be helpful and generate responses -- it doesn't naturally say 'I don't know' unless you explicitly tell it to." }, { question: "What's the best way to prevent AI hallucinations?", options: ["Ask shorter questions", "Tell AI to flag uncertainty and say 'I don't know' when unsure", "Only ask easy questions", "Use multiple AI tools"], correct: 1, explanation: "Explicit instructions to flag uncertainty and admit not knowing prevent confident-sounding but wrong answers." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Tell AI: 'If you're not sure, say so' -- an honest 'I don't know' is infinitely better than a confident wrong answer." })
        ]
      },
      {
        title: "Verification Prompts",
        slug: "verification-prompts",
        goal: "Make AI double-check its own answers and catch errors before you use them.",
        summary: "Use verification prompts to catch AI errors automatically.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Make AI double-check its own answers and catch errors before you use them.", real_world: "Like asking a calculator to show its work so you can verify the steps, not just the final number." }),
          sec("SEC-02_USE_CASE", { scenario: "AI gave you a code solution that compiles but has a logical bug you didn't catch until your project broke.", tags: ["coding", "study", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Write a function to check if a number is prime" }),
          sec("SEC-04_BAD_OUTPUT", { output: "def is_prime(n):\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True\n\n(Missing edge case: returns True for 0 and 1, which are NOT prime)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No verification step requested", "AI didn't test edge cases", "The code 'looks right' but has a hidden bug", "You trust AI output without verification"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Write a function to check if a number is prime.\n\nThen verify your own code:\n1. Test with these inputs: 0, 1, 2, 3, 4, 17, -5, 1000003\n2. Show expected output vs actual output for each\n3. If any test fails, fix the code and show the corrected version\n4. List any edge cases you might have missed", framework_used: "GCCF + Verification" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "```python\ndef is_prime(n):\n    if n < 2:\n        return False\n    if n < 4:\n        return True\n    if n % 2 == 0 or n % 3 == 0:\n        return False\n    i = 5\n    while i * i <= n:\n        if n % i == 0 or n % (i + 2) == 0:\n            return False\n        i += 6\n    return True\n```\n\n**Verification:**\n| Input | Expected | Actual | Pass |\n|-------|----------|--------|------|\n| 0 | False | False | Pass |\n| 1 | False | False | Pass |\n| 2 | True | True | Pass |\n| -5 | False | False | Pass |\n| 17 | True | True | Pass |\nAll tests pass." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Write a function to check if a number is prime.\n\nVerification protocol:\n1. Write the initial solution\n2. Run a mental test suite (at least 8 cases including edge cases)\n3. If any test fails, fix and retest\n4. After all tests pass, review for:\n   - Time complexity (state Big-O)\n   - Space complexity\n   - Any remaining edge cases\n5. Rate your confidence: (High/Medium/Low)\n\nShow the final code, test results table, and complexity analysis.", what_changed: "Added complexity analysis, confidence rating, and a systematic test-fix-retest cycle for thorough verification." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Ask AI to solve any coding problem", "Add: 'Test with at least 5 inputs including edge cases'", "Add: 'Show expected vs actual output in a table'", "Add: 'Fix any failures and show corrected code'", "Verify the test results yourself with a quick manual check"], task: "Write a verification prompt for a function that finds the longest common substring between two strings." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'Code Auditor' prompt that takes any function and automatically: (1) generates 10 test cases, (2) identifies potential bugs, (3) rates code quality 1-10, (4) suggests improvements. Test it with a simple sorting function.", hint: "Structure the prompt as: 'Act as a code auditor. For the given function, perform these 4 checks...' and list each check with clear output format." }),
          sec("SEC-11_CHECKLIST", { items: ["I asked AI to test its own output with specific inputs", "I included edge cases in the test requirements", "I requested expected vs actual comparison", "I asked AI to fix failures before showing final output", "I verified the results myself (don't trust AI's verification blindly)"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["Always ask AI to verify its own code with test cases", "Include edge cases: 0, negative, empty, very large values", "Expected vs actual comparison tables make bugs visible", "AI verification is a first filter -- always do your own check too"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "Why is verification important for AI-generated code?", options: ["AI code always has bugs", "Code can look correct but fail on edge cases", "AI can't write code", "Verification is optional"], correct: 1, explanation: "AI code often handles the main case but misses edge cases (0, negative, empty). Verification catches these before they break your project." }, { question: "What should a good verification include?", options: ["Just running the code once", "Multiple test cases including edge cases with expected vs actual output", "Only testing with normal inputs", "Asking another AI to check"], correct: 1, explanation: "Good verification uses diverse test cases (normal + edge) and compares expected vs actual output systematically." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Never trust AI code without testing -- add 'verify with 5+ edge cases and show expected vs actual' to every code prompt." })
        ]
      },
      {
        title: "Answer From Given Text Only",
        slug: "answer-from-given-text-only",
        goal: "Force AI to answer ONLY from the text you provide -- no outside knowledge, no made-up facts.",
        summary: "Restrict AI responses to provided source material only.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Force AI to answer ONLY from the text you provide -- no outside knowledge, no made-up facts.", real_world: "Like an open-book exam -- answer only from the material provided, not from your general knowledge." }),
          sec("SEC-02_USE_CASE", { scenario: "You paste your lecture notes and ask a question, but AI adds information from its training data that wasn't in your notes.", tags: ["study", "research", "content"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Based on these notes, explain the water cycle:\n[notes about evaporation and condensation only]" }),
          sec("SEC-04_BAD_OUTPUT", { output: "The water cycle includes evaporation, condensation, precipitation, and collection...\n(Added 'precipitation' and 'collection' which weren't in your notes)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["No instruction to limit answers to provided text", "AI supplements with its own knowledge by default", "You can't distinguish what came from your notes vs AI's training data", "This can lead to studying wrong or extra information for exams"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "STRICT SOURCE MODE.\n\nAnswer ONLY from the text provided below. Rules:\n- Use ONLY information from the provided text\n- If the answer is not in the text, say 'NOT FOUND IN PROVIDED TEXT'\n- Do NOT add any outside knowledge\n- Quote relevant sentences from the text to support your answer\n\nText:\n[paste your notes]\n\nQuestion: Explain the water cycle.", framework_used: "GCCF + Source-Locked Mode" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "Based on the provided text:\n\nThe water cycle involves two processes mentioned in your notes:\n1. **Evaporation** -- \"Water from oceans and lakes turns into vapor due to heat\" (from text)\n2. **Condensation** -- \"Water vapor cools and forms clouds\" (from text)\n\n**NOT FOUND IN PROVIDED TEXT:** The text does not mention precipitation or collection phases." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "STRICT SOURCE MODE -- ENHANCED.\n\nRules:\n- Answer ONLY from the provided text\n- For each claim, cite the exact line/paragraph from the text\n- Mark information as: [FROM TEXT] or [NOT IN TEXT]\n- If you need to infer something, mark as [INFERRED] and explain the reasoning\n- At the end, list any gaps: 'These topics were NOT covered in the provided text: ...'\n\nText:\n[paste your notes]\n\nQuestion: Explain the complete water cycle.", what_changed: "Added citation requirements, inference marking, and gap analysis -- so you know exactly what's from notes, what's inferred, and what's missing." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Copy a section of your study notes", "Ask a question that requires information from those notes", "Add 'Answer ONLY from the text. Say NOT FOUND if not in text.'", "Check: did AI add any outside information?", "Try asking a question that ISN'T in the notes to test the system"], task: "Paste one page of any course notes. Ask 3 questions -- make sure 1 answer ISN'T in the notes. Check if AI says 'NOT FOUND'." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'Study Notes Analyzer' prompt that takes your notes and: (1) answers a question using ONLY the notes, (2) cites specific lines, (3) identifies gaps in your notes, (4) suggests what topics you need to add.", hint: "Combine source-locked mode with gap analysis: 'After answering from the text, list topics that are missing for complete understanding.'" }),
          sec("SEC-11_CHECKLIST", { items: ["I said 'Answer ONLY from the provided text'", "I added 'Say NOT FOUND if the answer isn't in the text'", "I told AI not to use outside knowledge", "I requested citations/quotes from the source text", "I verified AI didn't sneak in extra information"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["AI adds outside knowledge by default -- you must explicitly restrict it", "'STRICT SOURCE MODE' prevents AI from making up extra information", "Always test with a question NOT in the text to verify it works", "This is essential for study notes, research, and document analysis"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What does 'source-locked mode' prevent?", options: ["AI from answering", "AI from adding information not in your provided text", "AI from reading your text", "AI from being helpful"], correct: 1, explanation: "Source-locked mode restricts AI to ONLY the text you provide -- no outside knowledge, no made-up additions." }, { question: "What should AI say if the answer isn't in the provided text?", options: ["Make up an answer", "'NOT FOUND IN PROVIDED TEXT'", "Search the internet", "Give a general answer"], correct: 1, explanation: "'NOT FOUND IN PROVIDED TEXT' is honest and tells you exactly what your notes are missing." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Add 'Answer ONLY from the text I provide -- say NOT FOUND if it's not there' to keep AI honest and your answers accurate." })
        ]
      },
      {
        title: "Handle Missing Info",
        slug: "handle-missing-info",
        goal: "Tell AI exactly what to do when information is missing -- ask, skip, or flag instead of guessing.",
        summary: "Control AI behavior when data is incomplete or missing.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Tell AI exactly what to do when information is missing -- ask, skip, or flag instead of guessing.", real_world: "Like a form that says 'required field' vs. silently submitting with empty data -- explicit handling prevents hidden problems." }),
          sec("SEC-02_USE_CASE", { scenario: "You ask AI to analyze data but some fields are missing. AI fills them with guesses instead of telling you what's missing.", tags: ["coding", "research", "projects"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Analyze this student data and give recommendations:\nName: Arjun, GPA: 3.5, Skills: Python\n(No internship info, no projects, no target role)" }),
          sec("SEC-04_BAD_OUTPUT", { output: "Arjun should focus on getting an internship at a top tech company. He should build projects in web development and aim for a Software Engineer role at Google...\n(AI made up career path, assumed web dev interest, and suggested Google -- all guesses)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["Missing: internship history, project details, target role, interests", "AI filled all gaps with assumptions", "Recommendations are based on guesses, not facts", "Arjun might want data science, not web dev -- AI doesn't know"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "Analyze this student profile and give career recommendations.\n\nMISSING DATA PROTOCOL:\n- If any important information is missing, LIST what's missing before answering\n- DO NOT guess or assume missing information\n- For each recommendation, note if it depends on missing data\n- Ask me for the missing information before finalizing\n\nStudent: Name: Arjun, GPA: 3.5, Skills: Python", framework_used: "GCCF + Missing Data Protocol" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**Missing Information Detected:**\n\n1. Target role/industry (SDE? Data Science? DevOps?)\n2. Internship experience (0? 1? 2+?)\n3. Project portfolio (academic only? personal? hackathons?)\n4. Preferred company type (startup? MNC? FAANG?)\n5. Location preference\n\n**Before I give recommendations, please share:**\n- What role are you targeting?\n- Any internship experience?\n- What projects have you built?\n\nI'll give personalized recommendations once I have this context." }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "Analyze this student profile.\n\nMissing Data Rules:\n- REQUIRED fields (must have): target role, experience, skills, projects\n- OPTIONAL fields (nice to have): location, company preference, timeline\n- For REQUIRED fields: Stop and ask before proceeding\n- For OPTIONAL fields: Note as 'assumed' and explain the assumption\n- Tag all recommendations: [BASED ON DATA] or [ASSUMPTION -- verify]\n\nStudent: Name: Arjun, GPA: 3.5, Skills: Python", what_changed: "Split missing data into REQUIRED (must ask) and OPTIONAL (can assume with tag), plus tagged every recommendation with its basis." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Pick a prompt where AI needs information you might not have", "Add 'MISSING DATA PROTOCOL: List missing info before answering'", "Add 'Do NOT guess -- ask me for missing details'", "Run it and check: did AI identify what's missing?", "Provide the missing data and see how the answer improves"], task: "Create a prompt asking AI to review your resume, with missing data protocol. Don't include target role or experience -- see if AI flags them." }),
          sec("SEC-10_CHALLENGE", { description: "Create a 'Data Validator' prompt that takes any structured data (CSV, JSON) and identifies missing, incomplete, or suspicious values. It should categorize each issue as CRITICAL, WARNING, or INFO.", hint: "Provide sample data with intentional gaps. Ask AI to scan each field and report issues with severity levels." }),
          sec("SEC-11_CHECKLIST", { items: ["I added a Missing Data Protocol to my prompt", "I told AI to list missing information before answering", "I separated required vs optional missing data", "I asked AI to tag assumptions clearly", "I provided missing data when asked, then got the refined answer"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["AI fills gaps with assumptions by default -- always add a missing data protocol", "Split missing data into REQUIRED (ask) and OPTIONAL (assume + tag)", "Tag every recommendation as data-based or assumption-based", "Missing data protocols prevent bad advice built on false assumptions"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What should AI do when important information is missing?", options: ["Guess the answer", "List what's missing and ask before proceeding", "Ignore the missing data", "Give a generic answer"], correct: 1, explanation: "AI should flag missing information and ask for it before giving recommendations based on incomplete data." }, { question: "Why tag recommendations as [BASED ON DATA] or [ASSUMPTION]?", options: ["It looks professional", "You know which advice to trust and which to verify", "AI requires it", "It's not important"], correct: 1, explanation: "Tags tell you which recommendations are reliable (based on real data) and which need verification (based on AI's guesses)." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Add 'If data is missing, flag it and ask me -- do NOT guess' to every prompt that needs accurate, personalized results." })
        ]
      },
      {
        title: "Anti-Hallucination Checklist",
        slug: "anti-hallucination-checklist",
        goal: "Use a 5-point checklist to catch AI hallucinations before they cost you marks or credibility.",
        summary: "Systematic checklist to detect and prevent AI hallucinations.",
        sections: [
          sec("SEC-01_GOAL", { headline: "Use a 5-point checklist to catch AI hallucinations before they cost you marks or credibility.", real_world: "Like a pilot's pre-flight checklist -- 5 quick checks prevent disasters that overconfidence causes." }),
          sec("SEC-02_USE_CASE", { scenario: "You submitted an AI-generated answer in your assignment that had a fake citation -- now the professor flagged it.", tags: ["study", "research", "projects", "content"] }),
          sec("SEC-03_BAD_PROMPT", { prompt: "Give me 5 references for a paper on neural networks in healthcare" }),
          sec("SEC-04_BAD_OUTPUT", { output: "1. Smith, J. (2023). Neural Networks in Medical Imaging. Nature Medicine, 29(4), 112-118.\n2. Wang, L. (2022). Deep Learning for Drug Discovery...\n(These papers may NOT exist -- AI frequently generates fake citations with realistic-looking details)" }),
          sec("SEC-05_WHY_FAILED", { reasons: ["AI generates realistic-looking but often fake citations", "Paper titles, authors, and journals may all be fabricated", "You can't verify without checking each one manually", "Submitting fake references destroys academic credibility"] }),
          sec("SEC-06_GOOD_PROMPT", { prompt: "I need references for a paper on neural networks in healthcare.\n\nANTI-HALLUCINATION RULES:\n1. Only suggest papers you are confident exist (published in well-known venues)\n2. For each paper, rate your confidence: HIGH / MEDIUM / LOW\n3. For LOW confidence papers, say 'VERIFY: This may not be a real paper'\n4. Suggest Google Scholar search queries to find real papers\n5. Do NOT invent DOIs, page numbers, or specific dates if unsure\n\nGive me 5 references following these rules.", framework_used: "Anti-Hallucination Checklist" }),
          sec("SEC-07_GOOD_OUTPUT", { output: "**References (with confidence ratings):**\n\n1. [HIGH] Esteva, A. et al. (2017). Dermatologist-level classification of skin cancer with deep neural networks. Nature, 542(7639).\n\n2. [HIGH] Rajpurkar, P. et al. (2017). CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays.\n\n3. [MEDIUM] Topol, E. (2019). Deep Medicine. Basic Books.\n\n4. [LOW] VERIFY: Chen, J. (2023). Transformer architectures for medical NLP -- may not be exact title.\n\n5. **Search Query Instead:** Try: site:scholar.google.com \"neural networks\" \"healthcare\" \"deep learning\" 2022-2024" }),
          sec("SEC-08_UPGRADE_PROMPT", { prompt: "ANTI-HALLUCINATION PROTOCOL -- FULL VERSION.\n\nBefore outputting, run this 5-point check on EVERY factual claim:\n\n1. SOURCE CHECK: Can you cite a specific source? (YES/NO)\n2. RECENCY CHECK: Is the information current? (YES/NO/UNKNOWN)\n3. CONSENSUS CHECK: Is this widely accepted or controversial? (CONSENSUS/DEBATED/NICHE)\n4. DETAIL CHECK: Are specific numbers/dates verifiable? (VERIFIED/APPROXIMATE/UNCERTAIN)\n5. CONFIDENCE CHECK: Overall confidence in this claim? (HIGH/MEDIUM/LOW)\n\nFor any claim scoring LOW or UNCERTAIN: Mark with a warning flag.\nAt the end, output a TRUST SCORE (1-10) for the entire response.", what_changed: "Created a 5-point systematic protocol that checks source, recency, consensus, detail accuracy, and overall confidence for every claim." }),
          sec("SEC-09_GUIDED_PRACTICE", { steps: ["Ask AI any factual question (history, science, tech)", "Apply the 5-point anti-hallucination check to the response", "Source: Did AI cite where this info comes from?", "Detail: Are specific numbers/dates plausible?", "Cross-check: Search one claim on Google to verify"], task: "Ask AI about any recent technology (released after 2023). Apply all 5 checks and note which claims need verification." }),
          sec("SEC-10_CHALLENGE", { description: "Create an 'AI Output Auditor' prompt that takes any AI-generated response and runs the 5-point anti-hallucination check on it. Output a table with each claim, its check results, and a final trust score.", hint: "Structure: 'Take this AI response. For each factual claim: [5-point check table]. End with Trust Score 1-10 and list of claims to verify.'" }),
          sec("SEC-11_CHECKLIST", { items: ["I checked: Does AI cite sources? (Source Check)", "I checked: Is the information current? (Recency Check)", "I checked: Is this widely accepted? (Consensus Check)", "I checked: Are numbers/dates verifiable? (Detail Check)", "I checked: Overall confidence rating? (Confidence Check)"] }),
          sec("SEC-12_WHAT_YOU_LEARNED", { points: ["AI hallucinations look real -- fake citations, wrong dates, made-up stats", "The 5-point check catches most hallucinations before they cause problems", "Never trust AI citations without verifying through Google Scholar", "Search queries are often more useful than AI-generated references"] }),
          sec("SEC-13_MINI_QUIZ", { questions: [{ question: "What is an AI hallucination?", options: ["AI seeing images", "AI generating false information that looks real and confident", "AI being confused", "AI refusing to answer"], correct: 1, explanation: "Hallucinations are false but confident-sounding outputs -- fake citations, wrong dates, made-up statistics that look completely real." }, { question: "Which check catches fake citations?", options: ["Recency Check", "Consensus Check", "Source Check -- verifying the source actually exists", "Confidence Check"], correct: 2, explanation: "Source Check asks: 'Can you cite a specific, verifiable source?' This catches fabricated papers and references." }] }),
          sec("SEC-14_ONE_LINE_TAKEAWAY", { line: "Run the 5-point check on every AI fact: Source, Recency, Consensus, Detail, Confidence -- 60 seconds of checking saves hours of damage control." })
        ]
      }
    ]
  }
];

// --- Remaining modules will be added in the next part ---
// This is Part 1 of the seed script containing M1-M4

module.exports = { MODULES, sec };

// If run directly, continue with the full seeding logic
if (require.main === module) {
  (async () => {
    console.log("Loading additional modules...");
    const m2 = require("./_seed_pe_m5_10");
    const ALL_MODULES = [...MODULES, ...m2.MODULES];
    
    // Get course info
    const courses = await q("SELECT id, title, slug FROM courses WHERE slug ILIKE '%prompt%' OR title ILIKE '%prompt%' LIMIT 5");
    if (!courses.length) { console.error("No Prompt Engineering course found!"); process.exit(1); }
    const course = courses[0];
    console.log(`Course: ${course.title} (${course.id})`);

    const tenants = await q("SELECT id, slug FROM tenants LIMIT 1");
    const tenant = tenants[0];
    console.log(`Tenant: ${tenant.slug} (${tenant.id})`);

    const admins = await q(`
      SELECT u.id, u.email FROM users u
      JOIN memberships m ON m.user_id = u.id
      JOIN roles r ON r.id = m.role_id
      WHERE r.name = 'SuperAdmin' AND m.tenant_id = $1
      LIMIT 1
    `, [tenant.id]);
    if (!admins.length) { console.error("No superadmin found!"); process.exit(1); }
    const admin = admins[0];
    console.log(`Admin: ${admin.email} (${admin.id})`);

    // Get membership ID for this admin
    const memberships = await q("SELECT id FROM memberships WHERE user_id=$1 AND tenant_id=$2 LIMIT 1", [admin.id, tenant.id]);
    const membershipId = memberships[0]?.id;
    
    const token = jwt.sign(
      { tid: tenant.id, mid: membershipId, role: "SuperAdmin" },
      JWT_SECRET,
      { subject: admin.id, expiresIn: "1h" }
    );

    // Wipe existing modules for this course
    console.log("Wiping existing course modules...");
    await q("DELETE FROM course_modules WHERE course_id = $1", [course.id]);
    console.log("Wiped.");

    // Direct DB inserts (bypass API to avoid Zod schema limitations)
    const { v4: uuidv4 } = require("uuid");
    
    function slugify(text) {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    for (let mi = 0; mi < ALL_MODULES.length; mi++) {
      const mod = ALL_MODULES[mi];
      console.log(`\nCreating module ${mi + 1}/${ALL_MODULES.length}: ${mod.title}`);
      
      const modId = uuidv4();
      await q(
        `INSERT INTO course_modules (id, tenant_id, course_id, title, slug, position, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, 'published', NOW(), NOW())`,
        [modId, tenant.id, course.id, mod.title, mod.slug, mi]
      );
      console.log(`  Module created: ${modId}`);

      for (let li = 0; li < mod.lessons.length; li++) {
        const lesson = mod.lessons[li];
        console.log(`  Creating lesson ${li + 1}/${mod.lessons.length}: ${lesson.title}`);
        
        const lessonId = uuidv4();
        await q(
          `INSERT INTO lessons (id, tenant_id, module_id, title, slug, summary, position, goal, learn_setup_steps, prompts, status, created_by, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'published', $11, NOW(), NOW())`,
          [
            lessonId, tenant.id, modId,
            lesson.title, lesson.slug,
            lesson.summary, li,
            lesson.goal,
            JSON.stringify(lesson.sections),
            JSON.stringify({}),
            admin.id
          ]
        );
        console.log(`    Lesson created: ${lessonId}`);
      }
    }

    console.log("\n=== SEEDING COMPLETE ===");
    
    // Quick verification
    const mods = await q("SELECT COUNT(*) as c FROM course_modules WHERE course_id = $1", [course.id]);
    const lessonsCount = await q(`
      SELECT COUNT(*) as c FROM lessons l 
      JOIN course_modules m ON l.module_id = m.id 
      WHERE m.course_id = $1
    `, [course.id]);
    console.log(`Modules: ${mods[0].c}, Lessons: ${lessonsCount[0].c}`);
    
    await pool.end();
  })().catch(err => { console.error(err); process.exit(1); });
}
