// AI Automations — Modules 0–3 seed data
// Covers: Welcome + Mindset, Automation Basics, Make.com From Zero, n8n From Zero

function sec(type, data) { return { type, data }; }

const MODULES_0_3 = [

/* ═══════════════════════════════════════════════════════════════
   MODULE 0 — Welcome + Mindset
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Welcome + Mindset",
  slug: "m0-welcome-mindset",
  lessons: [

    /* ── L0: Start ── */
    {
      title: "Start",
      slug: "start",
      goal: "Get complete clarity on how to learn this course and feel excited to start.",
      summary: "A warm guide to getting the most from AI Automations — how to use every section, learn step by step, and practice with love.",
      sections: [
        sec("AA-START", { blocks: [
          { type: "hero", text: "Hey, we're so glad you're here. This lesson is just for you." },
          { type: "intro", text: "Before you dive in, we want you to know exactly how this course works. Every lesson follows a clear structure. Here's how each part helps you learn:" },
          { type: "section", title: "Today's Win", text: "Tells you what you'll get from the lesson — the real outcome. Read it first. It sets your intention and gets you curious about what you're building.", color: "emerald", icon: "zap" },
          { type: "section", title: "Why Care", text: "Shows why this matters — the benefit, the real-world example. Answers 'why should I care?' Keeps you motivated. Don't skip it.", color: "orange", icon: "heart" },
          { type: "section", title: "Simple Meaning", text: "Breaks down the key concept in plain language. If something sounds technical, this makes it clear. Use it when you're confused.", color: "blue", icon: "book" },
          { type: "section", title: "Where It's Used", text: "Shows real examples — how companies and creators use this. Connects the lesson to the real world. See the possibilities.", color: "indigo", icon: "target" },
          { type: "section", title: "Flow", text: "Walks you through the big idea: input, steps, output. Your mental model. Understand this before you build.", color: "teal", icon: "check" },
          { type: "section", title: "Tool Setup", text: "Lists what you need — Make.com, n8n, Google account, etc. Get these ready. No surprises mid-lesson.", color: "amber", icon: "alert" },
          { type: "section", title: "Build Steps", text: "Your action plan. Step by step, with instructions and tips. Open Make.com or n8n and follow along. This is where learning happens.", color: "emerald", icon: "zap" },
          { type: "section", title: "Test Like a Pro", text: "Quick checklist to verify you did it right. Use it. Catch mistakes early.", color: "teal", icon: "check" },
          { type: "section", title: "Common Mistakes", text: "Shows what goes wrong and how to fix it. Read before you build. Save hours of debugging.", color: "rose", icon: "alert" },
          { type: "section", title: "Upgrade Mode", text: "Ideas to go further — extra features, better workflows. Use when you're ready to level up.", color: "violet", icon: "star" },
          { type: "section", title: "Mini Task & Try It Yourself", text: "Small exercises and hands-on building. Do them. Practice is how skills stick. Create the automation. Test it.", color: "emerald", icon: "zap" },
          { type: "section", title: "Key Notes & Quick Quiz", text: "Summary and recap. Lock it in. Wrong answers are fine — they show what to review.", color: "blue", icon: "book" },
          { type: "section", title: "Money Angle", text: "In later lessons — shows you how to sell this skill. Your automation skills can become income.", color: "amber", icon: "star" },
          { type: "flow", steps: ["Read the lesson", "Do the Build Steps", "Try It Yourself", "Take the quiz", "Log it in your Automation Journal"] },
          { type: "tip", text: "Create an Automation Journal — a simple doc or sheet where you log what you build. It becomes your portfolio. You don't need to code. The tools are visual. You drag, you connect, you test. You've got this." },
          { type: "closing", text: "You've got everything it takes. Now let's go." }
        ] })
      ]
    },

    /* ── L1: What is Automation (and Why Learn It) ── */
    {
      title: "What is Automation (and Why Learn It)",
      slug: "what-is-automation",
      goal: "Understand what automation really means and why it is the most in-demand digital skill of the decade.",
      summary: "This lesson breaks down automation into plain language, shows you where it already runs your daily life, and explains why learning it now puts you ahead of 95 percent of professionals.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will finally understand what automation is — and why companies pay thousands for it.",
          description: "By the end of this lesson you can explain automation to anyone in one sentence and list three real ways it saves businesses money every single day."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Automation skills let you earn more while working less — you build systems that run 24/7 without you.",
          real_example: "A solo freelancer built a lead-capture automation for a real-estate agency using Make.com. It took four hours to set up and saves the agency 20 hours of manual data entry every week. The freelancer charged $1,500 for the project."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Automation",
          explanation: "Automation means setting up a system that does a task for you automatically, without you clicking buttons or copying data by hand every time.",
          analogy: "Think of a dishwasher. You load dishes, press start, and walk away. The machine handles the scrubbing, rinsing, and drying. Automation does the same thing for digital tasks like sending emails, updating spreadsheets, or posting on social media."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Shopify stores", use: "Automatically send a thank-you email and update inventory in Google Sheets every time a customer places an order." },
            { company: "HubSpot users", use: "When a new lead fills out a form, automation adds them to a CRM, sends a welcome email, and notifies the sales team on Slack." },
            { company: "YouTube creators", use: "New video upload triggers a tweet, a Discord announcement, and a newsletter draft — all without touching each platform." },
            { company: "Accounting firms", use: "Receipts emailed to a shared inbox are automatically parsed, categorized, and logged into QuickBooks." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A repetitive task you do by hand (e.g., copying form responses into a spreadsheet)",
          steps: [
            "Identify the trigger — the event that starts the task (new form submission).",
            "Map the action — what should happen next (add a row to Google Sheets).",
            "Connect the tools — link the form tool and the spreadsheet tool inside an automation platform.",
            "Test and activate — run it once to verify, then turn it on so it works forever."
          ],
          output: "A workflow that runs on its own every time the trigger fires, with zero manual effort."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Account", action: "Create a free Google account if you do not already have one — you will use Google Sheets and Gmail throughout this course." },
            { tool: "Make.com", action: "Go to make.com and sign up for the free plan. No credit card needed." },
            { tool: "n8n Cloud", action: "Go to n8n.io and create a free cloud trial account. You can also self-host later." },
            { tool: "Slack", action: "Create a free Slack workspace — we will use it for notification automations." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Open a Google Sheet", instruction: "Create a new Google Sheet called 'Automation Journal'. Add columns: Date, Task Name, Time Spent Manual, Time Spent Automated, Notes.", tip: "Bookmark this sheet — you will log every automation you build in this course." },
            { title: "List five repetitive tasks", instruction: "In the sheet, write down five tasks you do every week that feel repetitive. Examples: forwarding emails, updating a tracker, posting social content.", tip: "Focus on tasks that follow the same steps every time — those are the easiest to automate." },
            { title: "Estimate manual time", instruction: "For each task, write how many minutes it takes per week to do it by hand.", tip: "Be honest. Most people underestimate by 50 percent because they forget context switching." },
            { title: "Rank by impact", instruction: "Sort the five tasks by how much time they waste. The biggest time-waster goes to the top.", tip: "This ranked list is your automation hit-list for the rest of the course." },
            { title: "Pick your first target", instruction: "Highlight the top task. Write one sentence describing the trigger and the action. Example: When a new email arrives from support@, copy the subject line into row 2 of my tracker.", tip: "Keep it simple. One trigger, one action. You will build this for real in Module 1." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Open your Automation Journal sheet.", expected: "The sheet loads with five columns: Date, Task Name, Time Spent Manual, Time Spent Automated, Notes." },
            { test: "Review your five-task list.", expected: "Each row has a task name and an estimated manual time that makes sense." },
            { test: "Check your top-ranked task.", expected: "You can describe the trigger and the action in one clear sentence." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Thinking automation requires coding.", fix: "Modern tools like Make.com and n8n are fully visual — you drag, drop, and connect blocks. Zero code needed." },
            { mistake: "Trying to automate everything at once.", fix: "Start with one small task. Get it working perfectly before moving to the next one." },
            { mistake: "Choosing a complex task as your first project.", fix: "Pick something with a clear trigger and a single action. Save multi-step workflows for after Module 1." },
            { mistake: "Skipping the Automation Journal.", fix: "Tracking your builds helps you see progress and gives you a portfolio to show clients later." },
            { mistake: "Confusing automation with AI.", fix: "Automation follows rules you set. AI makes predictions. They work great together, but they are different skills." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Category' column to your journal (email, social, data entry) to spot patterns.",
            "Research one company in your industry that openly talks about automation — see what tools they use.",
            "Calculate your annual hours saved if you automate just your top task."
          ],
          challenge: "Find one real job listing on LinkedIn or Upwork that mentions 'Make.com' or 'n8n'. Screenshot it and save it in a folder called 'Automation Career Proof'."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Write a one-paragraph 'automation elevator pitch' explaining what automation is and why it matters, as if you were telling a friend who has never heard the word.",
          deliverable: "A 3-5 sentence paragraph saved in your Automation Journal under a new tab called 'Notes'.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Automation Audit — review a small business's daily tasks and identify the top five processes to automate.",
          price_range: "$200 – $500 per audit",
          pitch: "Most small businesses waste 10-20 hours a week on tasks a simple automation could handle. Offer a one-page report listing the top five automatable tasks, the tools required, and estimated time savings. Many audits convert into paid implementation projects worth $1,000+."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Automation means a system does repetitive work for you without manual effort every time.",
            "You do not need to code — tools like Make.com and n8n are visual drag-and-drop platforms.",
            "Start with one simple task: one trigger, one action.",
            "Tracking your automations in a journal builds your portfolio and shows progress.",
            "Automation is a high-demand skill — businesses actively hire freelancers who can set it up."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the simplest way to describe automation?", options: ["Writing code that runs on a server", "A system that does a task for you automatically when triggered", "Using AI to make decisions", "Replacing employees with robots"], correct: 1, explanation: "Automation is about setting up systems that perform tasks automatically when a trigger event occurs — no manual intervention needed each time." },
            { question: "Which tool is a visual, no-code automation platform?", options: ["Visual Studio Code", "Make.com", "GitHub", "Photoshop"], correct: 1, explanation: "Make.com is a visual automation platform where you connect apps by dragging and dropping modules — no coding required." },
            { question: "What should you automate first?", options: ["The most complex workflow in your company", "A task with one clear trigger and one action", "Something that only happens once a year", "A task you enjoy doing by hand"], correct: 1, explanation: "Starting with a simple one-trigger, one-action task gives you a quick win and builds confidence before tackling complex workflows." }
          ]
        })
      ]
    },

    /* ── L2: Manual vs Automated (The Time Comparison) ── */
    {
      title: "Manual vs Automated (The Time Comparison)",
      slug: "manual-vs-automated",
      goal: "See the jaw-dropping time difference between doing tasks by hand and letting automation handle them.",
      summary: "This lesson puts real numbers on the table. You will compare manual and automated versions of common tasks and discover that even simple automations can save hundreds of hours per year.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will measure exactly how many hours automation can give back to you every month.",
          description: "After this lesson you will have a personal time-savings calculator and a clear picture of why businesses pay premium rates for automation specialists."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "When you can show a client the exact hours and dollars they waste on manual work, selling your automation service becomes effortless.",
          real_example: "A marketing agency manually copied leads from Facebook Ads into Google Sheets, then emailed each lead a welcome message. It took one employee about 2 hours per day. A Make.com automation replaced the entire process in 15 minutes of setup — saving over 40 hours per month."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Manual Process",
          explanation: "A manual process is any task where a human has to click, copy, paste, type, or move data by hand every single time it needs to happen.",
          analogy: "Imagine hand-delivering every letter in a city instead of using a postal system. Manual work is the hand delivery — it works, but it does not scale."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "E-commerce brands", use: "Replaced manual order confirmation emails with automated flows — response time dropped from 4 hours to 10 seconds." },
            { company: "Recruiting agencies", use: "Automated resume screening and interview scheduling cut hiring cycle from 3 weeks to 5 days." },
            { company: "SaaS startups", use: "Automated trial-to-paid onboarding emails increased conversion by 23 percent, replacing a manual sales follow-up process." },
            { company: "Freelance consultants", use: "Automated invoicing and payment reminders eliminated 5 hours of monthly admin work." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A side-by-side comparison task (manual vs automated lead capture)",
          steps: [
            "Manual: a lead fills out a form, you get a notification, you open the form, copy the data, paste it into a spreadsheet, then draft and send an email.",
            "Automated: the form submission triggers a workflow — data is added to the sheet and a personalized email is sent instantly.",
            "Measure: the manual version takes about 5 minutes per lead. The automated version takes 0 minutes of your time.",
            "Calculate: at 20 leads per day, manual costs 100 minutes daily. Automated costs zero after setup."
          ],
          output: "A clear time-savings number that proves the value of automation to yourself or a client."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Open your Automation Journal and add a new tab called 'Time Comparison'." },
            { tool: "Stopwatch or timer", action: "Use your phone timer to measure how long manual tasks actually take — real data beats guesses." },
            { tool: "Calculator", action: "Use the built-in calculator on your computer or Google Sheets formulas to compute monthly and yearly savings." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the comparison table", instruction: "In the Time Comparison tab, add columns: Task Name, Manual Time (min), Frequency Per Week, Weekly Manual Hours, Automated Time (min), Weekly Saved Hours.", tip: "Use formulas: Weekly Manual Hours = (Manual Time × Frequency) / 60." },
            { title: "Fill in three tasks", instruction: "Pick three tasks from your Module 0 L1 journal. For each, enter the manual time and how often you do it per week.", tip: "Common examples: email follow-ups (5 min each, 20x/week), data entry (3 min each, 30x/week), social media posting (10 min each, 7x/week)." },
            { title: "Estimate automated time", instruction: "For the Automated Time column, enter 0 for fully automated tasks or 1 minute for tasks that need a quick human review.", tip: "Most well-built automations run in under 5 seconds. Your time cost drops to near zero." },
            { title: "Calculate weekly savings", instruction: "Add a formula: Weekly Saved Hours = Weekly Manual Hours minus (Automated Time × Frequency / 60). Sum the column at the bottom.", tip: "Multiply weekly savings by 52 to get your annual savings. This number will shock you." },
            { title: "Add dollar value", instruction: "Add a column: Hourly Rate. Multiply saved hours by a rate ($25, $50, or $100/hr depending on the role) to get the dollar value of automation.", tip: "This is the number you show clients when pitching. 'I can save you $X per year' is the strongest sales line." },
            { title: "Format and save", instruction: "Bold the totals row. Add a chart (Insert → Chart) showing manual vs automated time for each task.", tip: "A visual bar chart makes the difference instantly obvious — great for client proposals." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Open the Time Comparison tab.", expected: "Three tasks listed with manual time, frequency, and formulas calculating weekly hours." },
            { test: "Check the Weekly Saved Hours total.", expected: "A positive number showing at least a few hours saved per week." },
            { test: "Verify the dollar value column.", expected: "Each task has a dollar figure and the total annual savings is calculated." },
            { test: "Review the chart.", expected: "A bar chart clearly shows manual time is much higher than automated time for each task." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Underestimating manual time.", fix: "Time yourself with a stopwatch for one full cycle. Include the time to switch tabs, find the file, and fix typos." },
            { mistake: "Forgetting to count frequency.", fix: "A 2-minute task done 50 times a week is nearly 2 hours — frequency is what makes automation valuable." },
            { mistake: "Only measuring your own time.", fix: "If a team of 5 people each spends 30 minutes on the same task, automation saves 2.5 hours × frequency, not just your portion." },
            { mistake: "Not including error costs.", fix: "Manual work causes typos and missed entries. Factor in the time to find and fix mistakes." },
            { mistake: "Assuming automation setup takes too long to be worth it.", fix: "A 2-hour setup that saves 5 hours a week pays for itself in the first week." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Setup Time' column to track how long each automation takes to build — calculate the payback period.",
            "Interview a colleague or friend about their repetitive tasks and build a comparison table for them.",
            "Create a one-page PDF summary of your time savings — this becomes the first page of your freelance proposal template."
          ],
          challenge: "Calculate the total annual hours your top three tasks waste across a team of five people. Present the number to someone and watch their reaction."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Pick one task and do it manually while timing yourself. Then write down the exact steps an automation would follow to do the same thing.",
          deliverable: "A timed manual walkthrough and a written step-by-step automation plan for the same task, saved in your journal.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Time-Savings Report — analyze a client's top 10 manual processes and deliver a report showing hours and dollars wasted.",
          price_range: "$300 – $750 per report",
          pitch: "Walk into any small business and say: 'Let me watch your team for two hours. I will give you a report showing exactly how much time and money you lose to manual work every month — and how to fix it.' This report naturally leads to paid automation projects."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Manual processes cost more than you think — always measure time AND frequency.",
            "Even a 2-minute task becomes expensive when repeated 50 times a week.",
            "Showing dollar figures makes automation an easy sell to any business owner.",
            "Your time-savings spreadsheet doubles as a client proposal tool.",
            "Setup time is a one-time cost; savings compound every single week."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "A task takes 3 minutes and happens 40 times per week. How many hours per week does it consume?", options: ["1 hour", "2 hours", "3 hours", "40 minutes"], correct: 1, explanation: "3 minutes × 40 = 120 minutes = 2 hours per week. Over a year that is 104 hours of manual work." },
            { question: "What is the most persuasive number to show a client when pitching automation?", options: ["Number of apps you can connect", "Annual dollar value of time saved", "Number of steps in the workflow", "Your years of experience"], correct: 1, explanation: "Business owners care about money. Showing them the annual dollar value of wasted manual time makes the decision obvious." }
          ]
        })
      ]
    },

    /* ── L3: Your Automation Mindset Map ── */
    {
      title: "Your Automation Mindset Map",
      slug: "automation-mindset-map",
      goal: "Develop the mental framework that lets you spot automation opportunities everywhere you look.",
      summary: "This lesson teaches you to think like an automation engineer. You will build a personal mindset map that helps you identify triggers, actions, and bottlenecks in any process within seconds.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will train your brain to see automation opportunities in everyday tasks — a skill most people never develop.",
          description: "After this lesson, every time you see a repetitive process you will automatically think: trigger, action, tool. That reflex is what separates automation professionals from everyone else."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "The automation mindset is a career multiplier — it turns you from someone who follows instructions into someone who redesigns entire workflows.",
          real_example: "A virtual assistant noticed her client manually forwarded every invoice email to the bookkeeper. She suggested a simple automation: emails matching 'invoice' go to a shared folder and trigger a Slack notification. The client saved 3 hours a week and gave her a raise."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Automation Mindset",
          explanation: "The automation mindset means constantly asking: 'Does this have to be done by hand, or can a system handle it?' It is a thinking habit, not a technical skill.",
          analogy: "A chess player sees the board differently than a beginner — they spot patterns and possibilities instantly. The automation mindset does the same for workflows."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Amazon", use: "Warehouse workers do not decide where packages go — automated routing systems handle it. Someone had to spot that opportunity first." },
            { company: "Zapier power users", use: "Top Zapier users automate an average of 15 personal workflows — from morning news digests to automatic birthday reminders." },
            { company: "Digital agencies", use: "Project managers use automation thinking to design client onboarding flows that run on autopilot from signup to kickoff call." },
            { company: "Content creators", use: "Bloggers who think in automations repurpose one article into tweets, LinkedIn posts, and email newsletters without extra effort." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "Any process you observe (at work, at home, or online)",
          steps: [
            "Observe: Watch the process from start to finish. Write down every step.",
            "Identify the trigger: What event kicks off the process? (New email, new row, a clock hitting 9 AM, a button click.)",
            "Map the actions: What happens after the trigger? List each action in order.",
            "Find the bottleneck: Which step is slowest, most error-prone, or most repetitive?"
          ],
          output: "A simple Trigger → Actions → Bottleneck diagram you can draw for any process in under two minutes."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Pen and paper (or tablet)", action: "Grab something to sketch with — mindset mapping is faster when you draw it out." },
            { tool: "Google Sheets", action: "Open your Automation Journal and add a tab called 'Mindset Maps'." },
            { tool: "Sticky notes (optional)", action: "Physical sticky notes help if you prefer tactile brainstorming — one step per note, then arrange them in order." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Pick a daily routine", instruction: "Choose something you do every day. Example: your morning email check routine.", tip: "Pick something boring — boring processes are the best automation candidates." },
            { title: "Write every step", instruction: "List every single step. Be detailed. Example: Open Gmail → scan subjects → open important ones → reply to urgent ones → forward invoices to bookkeeper → star follow-ups → archive the rest.", tip: "Most people list 3 steps. Real processes have 8-12. Be honest about every click and decision." },
            { title: "Label the trigger", instruction: "Circle or highlight the event that starts the process. In our example it is 'new emails arrive in inbox'.", tip: "Good triggers are events that happen without your input — new data, a scheduled time, a form submission." },
            { title: "Label each action", instruction: "Number each action step. Mark which ones are mechanical (copy, paste, forward) vs which need human judgment (decide if urgent).", tip: "Mechanical steps are easy to automate. Judgment steps can often be handled with filters and rules." },
            { title: "Find the bottleneck", instruction: "Put a star next to the step that takes the most time or causes the most errors.", tip: "The bottleneck is your highest-value automation target." },
            { title: "Draw the map", instruction: "In your Mindset Maps tab, write: Trigger → Action 1 → Action 2 → ... → Output. Highlight the bottleneck in red.", tip: "Keep it simple. A horizontal flow with arrows is all you need." },
            { title: "Repeat for two more processes", instruction: "Map out two more processes from your work or personal life using the same method.", tip: "The more maps you make, the faster the mindset becomes automatic." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Open your Mindset Maps tab.", expected: "Three processes mapped with trigger, actions, and bottleneck identified." },
            { test: "Check that each map has a clear trigger.", expected: "Each map starts with a specific event, not a vague statement." },
            { test: "Verify the bottleneck is marked.", expected: "Each map has one step highlighted as the biggest time-waster or error source." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Mapping the process too vaguely (e.g., 'handle emails').", fix: "Break it into every single click and decision. Vague maps produce vague automations." },
            { mistake: "Trying to automate the entire process at once.", fix: "Start with automating just the bottleneck step. Expand later." },
            { mistake: "Ignoring processes that seem 'too small'.", fix: "Small tasks done frequently add up. A 30-second task done 100 times a week is nearly an hour." },
            { mistake: "Forgetting to include decision points.", fix: "Mark where you make choices (if urgent then X, else Y). These become filter and router nodes in your automation." },
            { mistake: "Not revisiting your maps after learning new tools.", fix: "As you learn Make.com and n8n, come back to these maps. You will spot new automation possibilities." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Map a process at your workplace that involves multiple people — identify handoff points where automation could eliminate waiting.",
            "Create a 'process library' in your journal with maps of the ten most common business processes (lead capture, invoicing, onboarding, etc.).",
            "Teach the Trigger → Action → Bottleneck method to a colleague and map a process together."
          ],
          challenge: "Over the next 48 hours, catch yourself doing something repetitive three times. Map each one immediately and file it in your Mindset Maps tab."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Map your social media posting process from content creation to publishing. Identify the trigger, every action, and the bottleneck.",
          deliverable: "A complete Trigger → Actions → Bottleneck map saved in your Mindset Maps tab.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Process Mapping Workshop — run a 90-minute session with a team to map their top workflows and identify automation candidates.",
          price_range: "$500 – $1,500 per workshop",
          pitch: "Offer a hands-on workshop where you guide a team through mapping their five most time-consuming processes. Deliver a summary document with clear automation recommendations. This positions you as a consultant, not just a technician."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "The automation mindset is a habit: always ask 'does this have to be manual?'",
            "Every process has a trigger, a series of actions, and at least one bottleneck.",
            "Mechanical steps (copy, paste, forward) are the easiest to automate first.",
            "Small tasks done frequently often save more time than big tasks done rarely.",
            "Mindset maps are living documents — revisit them as your skills grow."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What are the three components of an automation mindset map?", options: ["Input, Process, Output", "Trigger, Actions, Bottleneck", "Start, Middle, End", "Problem, Solution, Result"], correct: 1, explanation: "A mindset map breaks any process into its Trigger (what starts it), Actions (what happens), and Bottleneck (what slows it down the most)." },
            { question: "Which type of step is easiest to automate?", options: ["Steps that require creative judgment", "Steps that require emotional intelligence", "Mechanical steps like copy, paste, and forward", "Steps that change every time"], correct: 2, explanation: "Mechanical, repetitive steps that follow the same pattern every time are the lowest-hanging fruit for automation." }
          ]
        })
      ]
    },

    /* ── L4: Tools You Will Use in This Course ── */
    {
      title: "Tools You Will Use in This Course",
      slug: "tools-overview",
      goal: "Get a complete map of every tool you will master in this course so nothing surprises you later.",
      summary: "This lesson introduces every platform, app, and service you will use. You will create accounts, verify they work, and understand what each tool does — so when we start building, you are ready to go.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will set up every tool you need for the entire course in one session — zero setup headaches later.",
          description: "By the end of this lesson you will have active accounts on Make.com, n8n, Google Workspace, Slack, and more — fully verified and ready for your first build."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Having all tools ready before you start building means you can focus 100 percent on learning automation instead of troubleshooting logins.",
          real_example: "Students who skip tool setup often lose 30-60 minutes per lesson debugging account issues. Those who complete this lesson sail through every hands-on project without interruption."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Automation Platform",
          explanation: "An automation platform is software that connects different apps and services together so data can flow between them automatically. Make.com and n8n are the two main platforms in this course.",
          analogy: "Think of an automation platform as a universal power adapter. Each app is a different plug — the platform translates between them so they all work together."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Startups", use: "Use Make.com to connect Stripe payments, Slack notifications, and Google Sheets reporting into one automated pipeline." },
            { company: "Agencies", use: "Use n8n self-hosted to build custom client workflows with full data privacy — no data leaves their servers." },
            { company: "Nonprofits", use: "Use Google Sheets as a lightweight database connected to Make.com to manage volunteer sign-ups and send automated confirmation emails." },
            { company: "Freelancers", use: "Use Slack + Make.com to get instant notifications when a client fills out a project request form." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A list of tools to set up",
          steps: [
            "Create accounts on each platform using your Google account for fast signup.",
            "Verify your email on each platform to activate full features.",
            "Explore the dashboard of each tool for 2 minutes to get familiar with the interface.",
            "Connect one test integration (Google Sheets) on both Make.com and n8n to verify everything works."
          ],
          output: "All accounts active, verified, and connected — ready for hands-on lessons."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Make.com", action: "Sign up at make.com/en/register. Choose the Free plan. Verify your email. Log in and confirm you see the dashboard." },
            { tool: "n8n Cloud", action: "Sign up at n8n.io/cloud. Start the free trial. Complete the onboarding wizard." },
            { tool: "Google Sheets", action: "Open sheets.google.com and confirm you can create a new spreadsheet." },
            { tool: "Slack", action: "Create a workspace at slack.com/create or use an existing one. Create a channel called #automation-tests." },
            { tool: "Gmail", action: "Confirm you can access your Gmail — we will use it for email-trigger automations." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Sign up for Make.com", instruction: "Go to make.com, click Sign Up, use your Google account. After signup, click through the welcome tour.", tip: "The free plan gives you 1,000 operations per month — plenty for learning." },
            { title: "Sign up for n8n Cloud", instruction: "Go to n8n.io, click Get Started Free, create your account. Complete the onboarding steps.", tip: "n8n also has a self-hosted option. We will cover that in Module 3. For now, cloud is easiest." },
            { title: "Create a test Google Sheet", instruction: "Open Google Sheets, create a new sheet called 'Tool Test'. Add headers: Name, Email, Date.", tip: "This sheet will be your sandbox for testing connections from Make.com and n8n." },
            { title: "Set up Slack workspace", instruction: "If you do not have a Slack workspace, create one. Then create a channel called #automation-tests. Post a test message: 'Automation course setup complete!'", tip: "Slack is free for small teams. You only need the free tier for this course." },
            { title: "Connect Google Sheets in Make.com", instruction: "In Make.com, create a new Scenario. Add a Google Sheets module. Click it and follow the prompts to connect your Google account. Select your 'Tool Test' sheet.", tip: "If the connection fails, check that third-party access is allowed in your Google account security settings." },
            { title: "Connect Google Sheets in n8n", instruction: "In n8n, create a new Workflow. Add a Google Sheets node. Click Credentials and connect your Google account. Select your 'Tool Test' sheet.", tip: "n8n uses OAuth2 for Google. Allow all requested permissions." },
            { title: "Verify all connections", instruction: "Run a quick test in both platforms: read one row from your 'Tool Test' sheet. Confirm data appears correctly.", tip: "If you see your test data, everything is set up correctly. Take a screenshot for your journal." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Log in to Make.com.", expected: "Dashboard loads and you can see the Scenarios page." },
            { test: "Log in to n8n Cloud.", expected: "Dashboard loads and you can see the Workflows page." },
            { test: "Open your Tool Test Google Sheet.", expected: "Sheet opens with Name, Email, Date headers." },
            { test: "Open Slack and check #automation-tests.", expected: "Channel exists and your test message is visible." },
            { test: "Run the Google Sheets read test in both Make.com and n8n.", expected: "Both platforms successfully read data from your sheet." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Using a work Google account with restricted third-party app access.", fix: "Use a personal Google account or ask your IT admin to allow Make.com and n8n access." },
            { mistake: "Skipping email verification.", fix: "Check your spam folder. Without verification, most platforms limit features." },
            { mistake: "Creating accounts on different browsers and forgetting passwords.", fix: "Use one browser for all accounts. Better yet, use a password manager." },
            { mistake: "Not testing the connection immediately.", fix: "Always run one test read or write right after connecting. Catching issues early saves time." },
            { mistake: "Using a Google Sheet with restricted sharing settings.", fix: "For testing, set the sheet to 'Anyone with the link can edit' or grant specific access to the automation platform." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Install the Make.com and n8n mobile apps to monitor your automations on the go.",
            "Explore the Make.com template gallery — browse 10 templates to see what is possible.",
            "Check n8n's community workflows at n8n.io/workflows for inspiration."
          ],
          challenge: "Connect one additional app (like Notion, Trello, or Airtable) in both Make.com and n8n. The more connections you test now, the smoother future lessons will be."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Take a screenshot of each tool's dashboard after login. Arrange all screenshots in a single document titled 'My Automation Toolkit'.",
          deliverable: "A document or journal tab with screenshots of Make.com, n8n, Google Sheets, Slack, and Gmail — all logged in and ready.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Tool Setup Service — set up and configure automation accounts for clients who are not tech-savvy.",
          price_range: "$100 – $300 per setup",
          pitch: "Many business owners know they need automation but get stuck on the setup. Offer a service where you create their accounts, connect their apps, test everything, and hand over a working environment. Quick win, easy money."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Make.com and n8n are the two core automation platforms — learn both to maximize your opportunities.",
            "Always test connections immediately after setting them up.",
            "Use a personal Google account to avoid corporate access restrictions during learning.",
            "The free tiers of Make.com and n8n are more than enough for this entire course."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the main difference between Make.com and n8n?", options: ["Make.com is for email only", "n8n can be self-hosted while Make.com is cloud-only", "Make.com requires coding", "n8n only works on Linux"], correct: 1, explanation: "n8n offers both cloud and self-hosted options, giving you full control over your data. Make.com is a cloud-only platform." },
            { question: "Why should you test a connection right after creating it?", options: ["To use up your free operations faster", "To generate sample data", "To catch permission or configuration issues early", "It is required by the platform"], correct: 2, explanation: "Testing immediately lets you catch problems like missing permissions, wrong credentials, or restricted access while the setup is fresh in your mind." },
            { question: "How many free operations does Make.com give on the free plan?", options: ["100 per month", "500 per month", "1,000 per month", "Unlimited"], correct: 2, explanation: "Make.com's free plan includes 1,000 operations per month, which is enough for learning and small projects." }
          ]
        })
      ]
    },

    /* ── L5: How This Course Works ── */
    {
      title: "How This Course Works",
      slug: "how-course-works",
      goal: "Know exactly how this course is structured so you can learn faster and get the most out of every lesson.",
      summary: "This lesson walks you through the course structure, explains the lesson format, and shows you how to track your progress so you stay motivated from start to finish.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will have a clear roadmap of the entire course and a personal progress tracker to keep you accountable.",
          description: "After this lesson you will know what every module covers, what to expect in each lesson, and how to measure your progress week by week."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Students who understand the course structure complete it 3x faster than those who jump around randomly.",
          real_example: "A student who followed the module order built a complete automation portfolio in 8 weeks. Another who skipped around took 5 months and had gaps in their knowledge that cost them a freelance gig."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Module",
          explanation: "A module is a group of lessons focused on one topic. Each module builds on the one before it. Think of modules as chapters in a book.",
          analogy: "If the course is a building, each module is a floor. You need the foundation before you add the second floor. Skipping floors means the building collapses."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Coursera and Udemy", use: "Top-rated courses use modular structures because they help students build knowledge step by step." },
            { company: "Codecademy", use: "Lessons follow a build-test-review pattern similar to this course — learn a concept, practice it, then verify." },
            { company: "Google Career Certificates", use: "Google breaks complex skills into weekly modules with hands-on projects — the same approach we use here." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "The start of any lesson in this course",
          steps: [
            "Read 'Today's Win' to know what you will accomplish.",
            "Work through the Build Steps section hands-on — do not just read, actually build.",
            "Test your work using the Test section checklist.",
            "Review Key Notes and attempt the Quick Quiz to lock in knowledge."
          ],
          output: "A completed lesson with a working project, verified results, and reinforced knowledge."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Automation Journal (Google Sheets)", action: "Add a new tab called 'Progress Tracker' with columns: Module, Lesson, Status (Not Started / In Progress / Done), Date Completed, Notes." },
            { tool: "Calendar", action: "Block 3-5 hours per week for this course. Consistency beats marathon sessions." },
            { tool: "Notebook or note app", action: "Keep a scratch pad nearby for ideas that come up during lessons — capture them but stay focused on the current lesson." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create your Progress Tracker", instruction: "In your Automation Journal, add a tab called 'Progress Tracker'. Create columns: Module Number, Module Name, Lesson Number, Lesson Title, Status, Date Completed.", tip: "Pre-fill every module and lesson title from the course outline. That way you can see the full journey at a glance." },
            { title: "Set your weekly goal", instruction: "Decide how many lessons you will complete per week. Write this at the top of the tracker: 'Weekly Goal: X lessons'.", tip: "3-5 lessons per week is realistic for most people. Adjust based on your schedule." },
            { title: "Add a streak counter", instruction: "Add a row at the top of the tracker: 'Current Streak: 0 days'. Update it every time you complete a lesson.", tip: "Streaks are powerful motivators. Even 10 minutes of progress counts as a streak day." },
            { title: "Review the module map", instruction: "Read through the list of all modules and their topics. Write one sentence for each module about what you are most excited to learn.", tip: "This creates personal motivation. When a lesson feels hard, re-read your excitement note." },
            { title: "Set a course completion date", instruction: "Based on your weekly goal, calculate when you will finish the course. Write the target date on the tracker.", tip: "Having a deadline — even a self-imposed one — increases completion rates dramatically." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Open your Progress Tracker tab.", expected: "All modules and lessons are pre-filled with Status set to 'Not Started'." },
            { test: "Check your weekly goal.", expected: "A specific number of lessons per week is written at the top." },
            { test: "Find your target completion date.", expected: "A realistic date is written based on your weekly pace." },
            { test: "Mark Module 0 lessons as completed.", expected: "L1 through L5 of Module 0 are marked 'Done' as you finish them." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Skipping hands-on Build Steps and just reading.", fix: "Reading without building is like watching cooking videos without cooking. You must build to learn." },
            { mistake: "Jumping to advanced modules before finishing basics.", fix: "Follow the module order. Each module assumes you completed the ones before it." },
            { mistake: "Setting an unrealistic pace (10 lessons per day).", fix: "Quality beats speed. 1-2 focused lessons per day with hands-on practice is better than rushing." },
            { mistake: "Not tracking progress.", fix: "Your tracker is your accountability partner. Update it after every lesson. The visual progress is motivating." },
            { mistake: "Stopping after mistakes instead of pushing through.", fix: "Mistakes are part of learning. Every error you fix makes you a better automation engineer." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Find a study buddy and share progress — accountability partners double completion rates.",
            "Join an online automation community (Make.com Community, n8n Community) and introduce yourself.",
            "Set up a weekly calendar reminder to review your progress tracker."
          ],
          challenge: "Write a 'Future Me' note describing where you want to be in automation skills 3 months from now. Save it in your journal and re-read it when motivation dips."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Fill in the Progress Tracker for all of Module 0 and mark the first four lessons as 'Done'. Set your weekly goal and target completion date.",
          deliverable: "A fully set up Progress Tracker with Module 0 status updated and a clear weekly plan.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Course completion itself — finishing this course qualifies you to offer automation services.",
          price_range: "$500 – $5,000+ per automation project",
          pitch: "By the end of this course you will be able to build automations that businesses pay hundreds to thousands of dollars for. The faster you complete the course, the sooner you start earning."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Follow the module order — each one builds on the last.",
            "Always do the Build Steps hands-on. Reading alone is not enough.",
            "Track your progress in the Automation Journal to stay accountable.",
            "Set a realistic weekly goal and a target completion date.",
            "Mistakes are learning opportunities, not reasons to quit."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the recommended way to go through this course?", options: ["Skip to the modules that look most interesting", "Follow modules in order and complete Build Steps hands-on", "Only read the Key Notes sections", "Watch someone else do it on YouTube"], correct: 1, explanation: "The course is designed to build knowledge step by step. Doing the Build Steps yourself is the only way to develop real skills." },
            { question: "What should you do after every lesson?", options: ["Delete your test data", "Update your Progress Tracker", "Restart your computer", "Review the previous module"], correct: 1, explanation: "Updating your Progress Tracker after each lesson keeps you accountable and gives you a visual sense of achievement." }
          ]
        })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 1 — Automation Basics
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Automation Basics",
  slug: "m1-automation-basics",
  lessons: [

    /* ── L1: Triggers Actions and Workflows ── */
    {
      title: "Triggers Actions and Workflows",
      slug: "triggers-actions-workflows",
      goal: "Master the three building blocks that every automation in the world is built from.",
      summary: "This lesson teaches you triggers, actions, and workflows — the universal vocabulary of automation. Once you understand these three concepts, you can design any automation on any platform.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will understand the three core concepts behind every automation ever built.",
          description: "After this lesson, you can look at any automation tool — Make.com, n8n, Zapier, Power Automate — and instantly understand how it works because the building blocks are always the same."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Once you understand triggers, actions, and workflows, switching between automation tools becomes trivial — the concepts are universal.",
          real_example: "A freelancer learned these three concepts and then picked up Make.com in one day, n8n in two days, and Zapier in half a day. Understanding the fundamentals made every tool feel familiar."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Workflow",
          explanation: "A workflow is a complete automation from start to finish. It has one trigger (what starts it) and one or more actions (what it does). Think of it as a recipe with a starting event and a series of steps.",
          analogy: "A workflow is like a domino chain. The first domino falling is the trigger. Each subsequent domino is an action. The whole chain from first fall to last is the workflow."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Stripe + Slack + Google Sheets", use: "Trigger: new payment received. Actions: log payment in Sheets, send Slack notification to the sales channel." },
            { company: "Typeform + Mailchimp", use: "Trigger: form submitted. Actions: add contact to Mailchimp list, send welcome email sequence." },
            { company: "GitHub + Slack", use: "Trigger: new pull request opened. Actions: post PR details to #dev-updates channel with assignee and link." },
            { company: "Google Calendar + SMS", use: "Trigger: event starts in 30 minutes. Action: send SMS reminder to all attendees." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A business need (e.g., 'notify the team when a new customer signs up')",
          steps: [
            "Define the trigger: new row added to 'Customers' Google Sheet.",
            "Define action 1: format a message with the customer name and email.",
            "Define action 2: send the message to the #new-customers Slack channel.",
            "Combine: trigger → format message → send to Slack = one complete workflow."
          ],
          output: "A fully defined workflow with a clear trigger and sequenced actions, ready to build in any automation tool."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Make.com", action: "Log in and open the Scenarios page. Click 'Create a new scenario' to see the blank canvas." },
            { tool: "n8n", action: "Log in and open the Workflows page. Click 'New Workflow' to see the blank canvas." },
            { tool: "Google Sheets", action: "Open your Tool Test sheet from Module 0 and add a few sample rows: Name, Email, Date." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Write out three workflow ideas", instruction: "In your journal, write three automation ideas in this format: TRIGGER → ACTION 1 → ACTION 2. Example: New email with 'invoice' in subject → Save attachment to Google Drive → Send Slack message to #finance.", tip: "Focus on workflows with 1 trigger and 2-3 actions. Keep it manageable." },
            { title: "Open Make.com and explore the trigger list", instruction: "In a new scenario, click the first module (the big plus button). Browse the list of apps. Click Google Sheets and look at the available triggers: 'Watch New Rows', 'Watch Changes'.", tip: "Triggers always start a scenario. They are the entry point." },
            { title: "Add a trigger module", instruction: "Select Google Sheets → Watch New Rows. Connect your Google account. Select your 'Tool Test' spreadsheet and Sheet1.", tip: "Make.com calls it a 'scenario' and uses round modules. The first module is always the trigger." },
            { title: "Add an action module", instruction: "Click the plus arrow after the trigger. Search for Slack. Select 'Send a Message'. Connect your Slack workspace. Choose #automation-tests channel.", tip: "Actions come after triggers. Each action does one thing." },
            { title: "Map data between modules", instruction: "In the Slack message field, click and you will see data from the Google Sheets trigger (Name, Email, Date). Insert the Name field into the message: 'New entry: {{Name}}'.", tip: "This data mapping is the glue that connects triggers to actions. It lets data flow between steps." },
            { title: "Run the workflow", instruction: "Click 'Run once' in Make.com. Then add a new row to your Google Sheet. Go back to Make.com and check if the scenario picked it up.", tip: "If the Slack message appears with the name from your sheet, your first trigger-action workflow is alive!" },
            { title: "Save and name it", instruction: "Click the scenario name at the top and rename it to 'Sheet to Slack — Test'. Click the Save button (disk icon).", tip: "Always name your workflows descriptively. You will have many soon and good names save time." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a new row to your Google Sheet with a test name.", expected: "Make.com detects the new row within the polling interval." },
            { test: "Check the #automation-tests Slack channel.", expected: "A message appears with the name from the new row." },
            { test: "Open the scenario execution log in Make.com.", expected: "You see a green checkmark showing the scenario ran successfully." },
            { test: "Verify data mapping.", expected: "The Slack message contains the exact name you entered in the sheet." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Confusing triggers with actions.", fix: "A trigger STARTS the workflow (event happens). An action is what the workflow DOES. The trigger listens, actions execute." },
            { mistake: "Trying to use two triggers in one workflow.", fix: "Most workflows have exactly one trigger. If you need multiple triggers, create separate workflows or use advanced techniques covered later." },
            { mistake: "Forgetting to connect your accounts.", fix: "Each app module needs its own connection. If you see a 'Connection' dropdown, make sure an active connection is selected." },
            { mistake: "Not mapping data between steps.", fix: "Actions need data from previous steps. Always click into fields and use the dynamic data pills from the trigger or earlier actions." },
            { mistake: "Leaving the scenario in 'Off' mode.", fix: "After testing, turn the scenario ON (toggle switch in Make.com) so it runs automatically. Testing mode only runs when you click 'Run once'." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a third action to your workflow: after sending the Slack message, also send an email using Gmail.",
            "Create the same workflow in n8n to compare the experience between platforms.",
            "Replace Google Sheets with a Typeform or Google Forms trigger to see how different triggers feel."
          ],
          challenge: "Build a workflow with four actions in a chain: Trigger → Action 1 → Action 2 → Action 3 → Action 4. Example: New Sheet row → Slack message → Gmail email → Add row to a second Sheet."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Draw a workflow diagram (Trigger → Action → Action) for a real scenario at your job or school. Then build just the trigger part in Make.com.",
          deliverable: "A hand-drawn or typed workflow diagram plus a Make.com scenario with the trigger module connected and tested.",
          time: "20 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Basic Workflow Setup — build simple trigger-action automations for small businesses.",
          price_range: "$150 – $400 per workflow",
          pitch: "Small businesses often need simple workflows: new form → add to sheet → send email. You can build these in under an hour and charge $150-400 each. A single client with five workflows is $750-2,000."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Every automation has three parts: trigger (what starts it), action (what it does), and workflow (the complete chain).",
            "Triggers listen for events — new row, new email, new form submission, scheduled time.",
            "Actions execute tasks — send message, create row, update record, send email.",
            "Data mapping connects triggers to actions so information flows between steps.",
            "Name your workflows descriptively — you will build dozens and need to find them quickly."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is a trigger in an automation workflow?", options: ["The last step that produces output", "The event that starts the workflow", "A button you click to run it", "A filter that blocks data"], correct: 1, explanation: "A trigger is the event that starts the workflow — like a new row in a sheet, a new email, or a scheduled time." },
            { question: "What connects data between a trigger and an action?", options: ["A USB cable", "Data mapping", "A webhook URL", "An API key"], correct: 1, explanation: "Data mapping is how you pass information from the trigger (or a previous action) into the next action's fields." },
            { question: "How many triggers does a standard workflow have?", options: ["As many as you want", "Exactly one", "At least two", "Zero — triggers are optional"], correct: 1, explanation: "A standard workflow has exactly one trigger that starts it. Multiple triggers typically require separate workflows." }
          ]
        })
      ]
    },

    /* ── L2: Your First No-Code Automation ── */
    {
      title: "Your First No-Code Automation",
      slug: "first-no-code-automation",
      goal: "Build a complete, working automation from scratch in under 30 minutes — no code, no experience needed.",
      summary: "This is where theory becomes reality. You will build a real Google Sheets-to-email automation in Make.com, test it live, and experience the thrill of watching software work for you.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will build and run your first real automation today — a system that works while you sleep.",
          description: "By the end of this lesson you will have a live automation that watches a Google Sheet and sends a personalized email every time a new row is added."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Building your first automation proves to yourself that you can do this. That confidence snowball carries through the entire course.",
          real_example: "A student built this exact automation for a local gym. Every new member added to the gym's spreadsheet automatically received a personalized welcome email. The gym owner paid $300 for what took 25 minutes to build."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "No-Code Automation",
          explanation: "No-code automation means building automated workflows using visual tools — dragging modules, clicking options, and typing values — without writing a single line of programming code.",
          analogy: "It is like building with LEGO. You snap pre-made blocks together to create something new. You do not mold the plastic yourself."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Real estate agencies", use: "New lead in spreadsheet → automatic property brochure email sent within seconds." },
            { company: "Online course creators", use: "New student signup → welcome email with course access link → Slack notification to support team." },
            { company: "E-commerce", use: "New order row in sheet → confirmation email to customer → inventory update notification to warehouse." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A new row added to a Google Sheet (Name, Email columns)",
          steps: [
            "Make.com watches the Google Sheet for new rows.",
            "When a new row appears, Make.com reads the Name and Email values.",
            "Make.com composes a personalized email using those values.",
            "Make.com sends the email via Gmail to the address in the Email column."
          ],
          output: "A personalized welcome email arrives in the new contact's inbox automatically."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create a new sheet called 'Welcome Automation'. Add columns: Name, Email. Add one test row: John Doe, your-own-email@gmail.com." },
            { tool: "Make.com", action: "Log in and go to Scenarios. Click 'Create a new scenario'." },
            { tool: "Gmail", action: "Confirm your Gmail account is accessible and can send emails." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the Google Sheet", instruction: "Make a new spreadsheet called 'Welcome Automation'. In row 1, type 'Name' in A1 and 'Email' in B1. In row 2, type 'John Doe' in A2 and your own email address in B2.", tip: "Using your own email for testing means you can verify the email actually arrives." },
            { title: "Start a new Make.com scenario", instruction: "In Make.com, click 'Create a new scenario'. You will see a blank canvas with a big plus icon in the center.", tip: "The canvas is where you build visually. Each circle is a module (step)." },
            { title: "Add the Google Sheets trigger", instruction: "Click the plus icon. Search for 'Google Sheets'. Select 'Watch New Rows'. Connect your Google account. Select the 'Welcome Automation' spreadsheet and Sheet1. Set 'Column range' to A:B.", tip: "Watch New Rows polls the sheet on a schedule. For testing, you will use 'Run once' instead of waiting." },
            { title: "Add the Gmail action", instruction: "Click the plus arrow that appears after the Google Sheets module. Search for 'Gmail'. Select 'Send an Email'. Connect your Gmail account.", tip: "Make sure you use the same Google account or grant Make.com access to your Gmail." },
            { title: "Configure the email", instruction: "In the To field, click and select the 'Email' variable from the Google Sheets module. In Subject, type: 'Welcome, {{Name}}!' In Content, type: 'Hi {{Name}}, thank you for signing up! We are excited to have you.'", tip: "The {{Name}} and {{Email}} variables come from your Google Sheet. Click the variable pills to insert them." },
            { title: "Test with Run Once", instruction: "Click 'Run once' at the bottom-left of the screen. Then go to your Google Sheet and add a new row: Jane Smith, your-email@gmail.com. Go back to Make.com and watch the execution.", tip: "Make.com will show green checkmarks on each module when the run succeeds." },
            { title: "Check your inbox", instruction: "Open Gmail and look for the welcome email. Verify the subject says 'Welcome, Jane Smith!' and the body is personalized.", tip: "If the email is not there, check your spam folder. Also verify the Gmail connection in Make.com is authorized." },
            { title: "Turn on scheduling", instruction: "Click the clock icon on the trigger module and set the schedule to 'Every 15 minutes'. Toggle the scenario ON. Your automation is now live!", tip: "Free plans poll at 15-minute intervals. Paid plans can check as often as every minute." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a new test row to the Google Sheet.", expected: "Make.com picks it up on the next polling cycle (or on Run Once)." },
            { test: "Check your email inbox.", expected: "A personalized welcome email with the correct name from the sheet." },
            { test: "Open the Make.com scenario execution log.", expected: "Green checkmarks on both modules showing successful execution." },
            { test: "Verify the scenario is toggled ON.", expected: "The toggle shows ON (blue) and the schedule shows 'Every 15 minutes'." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Adding the test row before clicking Run Once.", fix: "Click Run Once first, then add the row. Make.com needs to be listening before the event happens (in Run Once mode)." },
            { mistake: "Wrong column mapping — Name and Email swapped.", fix: "Double-check which column letter maps to which field. Column A should be Name, Column B should be Email." },
            { mistake: "Email lands in spam.", fix: "Mark it as 'Not spam' in Gmail. For production use, consider using a proper email service like SendGrid." },
            { mistake: "Forgetting to set the column range.", fix: "Without the correct column range (A:B), Make.com may not read your data properly. Always specify the range." },
            { mistake: "Scenario runs but sends duplicate emails.", fix: "Make.com tracks which rows it has already processed. If you see duplicates, delete the scenario's data store and re-run." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Date Sent' column to the sheet and have Make.com write the current date after sending each email.",
            "Add conditional logic: if the name is empty, skip the row instead of sending a broken email.",
            "Replace Gmail with a SendGrid or Mailchimp module for professional email delivery."
          ],
          challenge: "Build the same automation in n8n. Compare the experience and note three differences between the Make.com and n8n versions."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Modify the email template to include a call-to-action link. Change the body to include 'Click here to get started: https://example.com/start'.",
          deliverable: "An updated Make.com scenario sending emails with a CTA link, verified by checking your inbox.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Welcome Email Automation — set up automatic welcome emails triggered by new signups or form submissions.",
          price_range: "$200 – $500 per setup",
          pitch: "Every business wants to welcome new customers instantly. Set up a Google Sheet or form → personalized email automation. Takes 30 minutes to build, delivers ongoing value. Charge for setup plus a monthly maintenance fee of $50."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Your first automation: Google Sheets trigger → Gmail action with dynamic data.",
            "Always test with 'Run Once' before turning on scheduling.",
            "Use your own email for testing so you can verify delivery.",
            "Dynamic variables like {{Name}} pull data from previous steps.",
            "Turn on the scenario and set the polling schedule to make it run automatically."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does 'Run Once' do in Make.com?", options: ["Permanently runs the scenario one time then deletes it", "Runs the scenario once for testing without starting the schedule", "Sends one email and stops", "Resets all modules"], correct: 1, explanation: "Run Once executes the scenario a single time so you can test it. The scenario remains intact and can be run again or scheduled." },
            { question: "Where does the email address come from in this automation?", options: ["You type it into the Gmail module each time", "It comes from the Google Sheet row via data mapping", "Gmail auto-detects it", "You hard-code it in the scenario settings"], correct: 1, explanation: "The email address is pulled dynamically from the Google Sheet's Email column using data mapping in the Gmail module." }
          ]
        })
      ]
    },

    /* ── L3: If-This-Then-That Logic ── */
    {
      title: "If-This-Then-That Logic",
      slug: "if-this-then-that",
      goal: "Add decision-making to your automations so they handle different situations automatically.",
      summary: "This lesson teaches you conditional logic — the ability to make your automation choose what to do based on the data it receives. This is what separates basic automations from smart ones.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "Your automations will start making decisions on their own — different data, different actions, all automatic.",
          description: "After this lesson you will be able to build automations that route leads to different teams, send different emails based on form answers, or skip steps when conditions are not met."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Conditional logic is what makes automations intelligent. Without it, every input gets the same treatment. With it, your automations adapt.",
          real_example: "An e-commerce store used conditional logic in Make.com to send different emails based on order value: orders over $100 got a thank-you with a 10 percent discount code, while smaller orders got a standard confirmation."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Conditional Logic (If-This-Then-That)",
          explanation: "Conditional logic means your automation checks a condition (is the value above 100?) and then does different things based on the answer (yes → path A, no → path B).",
          analogy: "It is like a traffic light. If the light is green, go. If it is red, stop. The light (condition) determines the action."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Customer support", use: "If a ticket is marked 'urgent', assign to a senior agent and send an SMS alert. Otherwise, add to the regular queue." },
            { company: "Lead scoring", use: "If a lead's company size is over 50 employees, route to enterprise sales. Under 50, route to SMB sales." },
            { company: "Content publishing", use: "If a blog post is tagged 'news', auto-tweet it. If tagged 'tutorial', add it to the newsletter queue instead." },
            { company: "Inventory management", use: "If stock drops below 10 units, send a reorder alert. Otherwise, do nothing." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A new Google Sheet row with a 'Priority' column (High or Low)",
          steps: [
            "Trigger: new row detected in Google Sheet.",
            "Filter checks: is the Priority column equal to 'High'?",
            "If YES: send Slack message to #urgent channel AND send email to the manager.",
            "If NO: log the entry silently — no notifications sent."
          ],
          output: "High-priority entries get immediate alerts. Low-priority entries are logged without noise."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Open your 'Welcome Automation' sheet. Add a third column called 'Priority' with values 'High' or 'Low'." },
            { tool: "Make.com", action: "Open your existing Sheet-to-Email scenario or create a new one." },
            { tool: "Slack", action: "Create a new channel called #urgent-alerts for high-priority notifications." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Update your Google Sheet", instruction: "Add a 'Priority' column (column C). Put 'High' for some rows and 'Low' for others.", tip: "Use consistent capitalization — filters are case-sensitive. 'High' and 'high' are different values." },
            { title: "Open your Make.com scenario", instruction: "Open the Sheet-to-Email scenario from the previous lesson (or create a new one with a Google Sheets trigger).", tip: "Make a copy of your existing scenario first so you do not break it. Right-click → Clone." },
            { title: "Add a filter", instruction: "Click the line between the Google Sheets module and the Gmail module. A filter dialog opens. Set it to: Priority (Column C) → Text operators → Equal to → 'High'.", tip: "Filters in Make.com are placed on the connections between modules, not as separate modules." },
            { title: "Add a Router for multiple paths", instruction: "Right-click on the connection after the trigger. Select 'Add a Router'. The Router creates two paths.", tip: "A Router lets your workflow split into multiple branches — like a fork in the road." },
            { title: "Configure Path 1 (High Priority)", instruction: "On the first path, add a filter: Priority equals 'High'. Connect this path to a Slack module that sends a message to #urgent-alerts: 'URGENT: {{Name}} needs attention!'", tip: "Label your paths by clicking the path name — call this one 'High Priority Path'." },
            { title: "Configure Path 2 (Low Priority)", instruction: "On the second path, add a filter: Priority equals 'Low'. Connect this path to the Gmail module that sends a standard welcome email.", tip: "Label this 'Low Priority Path'. Clear labels make complex scenarios easy to maintain." },
            { title: "Test both paths", instruction: "Click Run Once. Add a 'High' priority row — verify Slack gets a message. Add a 'Low' priority row — verify an email is sent.", tip: "Test each path separately to confirm the filters work correctly." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a row with Priority = 'High'.", expected: "A Slack message appears in #urgent-alerts with the person's name." },
            { test: "Add a row with Priority = 'Low'.", expected: "A welcome email is sent but no Slack message." },
            { test: "Check the Make.com execution log.", expected: "The log shows which path was taken for each execution." },
            { test: "Add a row with Priority = 'Medium' (not in any filter).", expected: "Nothing happens — neither path is triggered because no filter matches." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Filters are case-sensitive but your data has mixed case.", fix: "Use the 'lower()' function in Make.com to normalize values before comparing: lower(Priority) equals 'high'." },
            { mistake: "Forgetting to handle the 'else' case.", fix: "Always consider what happens when no filter matches. Add a fallback path or a catch-all filter." },
            { mistake: "Putting filters inside modules instead of on connections.", fix: "In Make.com, filters go on the lines between modules, not in the module settings." },
            { mistake: "Using Router when a simple filter would do.", fix: "If you only need to block/allow one path, a simple filter is enough. Use Router only when you need multiple branches." },
            { mistake: "Not testing each path individually.", fix: "Test with data that matches each filter condition separately. Do not assume both paths work just because one does." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a third path for 'Medium' priority that sends an email to a different recipient.",
            "Use a 'Contains' filter instead of 'Equals' to catch variations like 'HIGH', 'High', 'high'.",
            "Add an error-handling path that catches rows with empty Priority fields."
          ],
          challenge: "Build a lead router that checks three conditions: country, company size, and priority — and sends each lead to a different Slack channel based on the combination."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add a 'Status' column to your sheet (New, Returning). Build a filter that only sends welcome emails to 'New' entries.",
          deliverable: "An updated Make.com scenario with a working Status filter, tested with both 'New' and 'Returning' rows.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Smart Lead Routing — build conditional automations that route leads to the right team or response based on their data.",
          price_range: "$400 – $1,000 per workflow",
          pitch: "Businesses waste hours manually sorting leads. Offer to build a system that instantly routes each lead to the right salesperson, sends the right email template, and updates the CRM — all based on conditions you set up once."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Conditional logic (if-this-then-that) makes automations smart — different data triggers different actions.",
            "Filters block or allow data through a connection based on conditions.",
            "Routers create multiple paths so one trigger can lead to different outcomes.",
            "Always test each path separately with matching test data.",
            "Handle the 'else' case — what happens when no condition matches?"
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does a Router do in Make.com?", options: ["Routes emails to different folders", "Creates multiple paths from one module so data can go in different directions", "Connects to your internet router", "Deletes duplicate data"], correct: 1, explanation: "A Router splits the workflow into multiple branches. Each branch can have its own filter and actions." },
            { question: "Where do you place a filter in Make.com?", options: ["Inside the module settings", "On the connection line between two modules", "At the start of the scenario", "In the scenario settings menu"], correct: 1, explanation: "Filters are placed on the connection lines between modules. They control whether data passes through to the next module." }
          ]
        })
      ]
    },

    /* ── L4: Data Mapping Between Steps ── */
    {
      title: "Data Mapping Between Steps",
      slug: "data-mapping",
      goal: "Learn to pass data between automation steps like a pro so your workflows never break from missing or wrong values.",
      summary: "Data mapping is the skill that makes or breaks automations. This lesson teaches you to connect data from triggers to actions, transform values, and handle missing fields gracefully.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will master data mapping — the single most important skill for building automations that work reliably.",
          description: "After this lesson you will confidently connect data between any two modules, transform text and numbers on the fly, and handle missing data without your workflow crashing."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "90 percent of automation bugs come from bad data mapping. Master this and you eliminate the most common failure point.",
          real_example: "A freelancer's client automation kept sending emails with 'undefined' instead of the customer name. The fix took 30 seconds — a missing data mapping — but the client had been embarrassed for two weeks before calling for help."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Data Mapping",
          explanation: "Data mapping means telling your automation which piece of data from one step should go into which field of the next step. It is like filling out a form where some answers come from a previous form.",
          analogy: "Imagine passing a baton in a relay race. Data mapping is making sure the right baton gets to the right runner. If you hand the wrong baton, the whole race goes sideways."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "CRM systems", use: "Map form fields (first name, last name, email) to the correct CRM contact fields when creating a new record." },
            { company: "Invoice automation", use: "Map line item data from a spreadsheet to the correct fields in an invoice generator (quantity, unit price, description)." },
            { company: "Multi-channel marketing", use: "Map subscriber data from one platform's format to another's — Mailchimp's 'FNAME' to ActiveCampaign's 'first_name'." },
            { company: "Slack bots", use: "Map data from a webhook payload into a formatted Slack message: 'New order from {{customer_name}} for ${{total}}'." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "Raw data from a trigger (Google Sheets row with columns: Full Name, Email, Order Total)",
          steps: [
            "Read the trigger output — identify available data fields and their values.",
            "Open the action module — find the fields that need values.",
            "Click each field and select the correct variable from the trigger's output.",
            "Use functions to transform data if needed (e.g., capitalize names, format currency)."
          ],
          output: "Every action field is populated with the correct, formatted data from the trigger — no manual entry needed."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create a sheet called 'Data Mapping Practice' with columns: Full Name, Email, Order Total, Country." },
            { tool: "Make.com", action: "Create a new scenario with a Google Sheets Watch New Rows trigger." },
            { tool: "Gmail", action: "You will map sheet data into a well-formatted email." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Prepare test data", instruction: "In your 'Data Mapping Practice' sheet, add 3 rows of sample data. Example: 'Alice Johnson', 'alice@example.com', '149.99', 'United States'.", tip: "Use realistic data — it makes testing and debugging much easier." },
            { title: "Create the trigger", instruction: "In Make.com, add a Google Sheets Watch New Rows trigger pointing to your practice sheet.", tip: "Run it once with existing data so Make.com learns the column structure." },
            { title: "Add a Gmail Send Email action", instruction: "After the trigger, add Gmail → Send an Email.", tip: "Do not fill in any fields yet — first understand what data is available." },
            { title: "Map the To field", instruction: "Click the To field in the Gmail module. A panel shows available data from the Google Sheets module. Click the Email variable to insert it.", tip: "The variable appears as a colored pill. It dynamically pulls the value from each sheet row." },
            { title: "Map the Subject with a function", instruction: "In the Subject field, type: 'Order Confirmation for ' then click the Full Name variable. The result: 'Order Confirmation for {{Full Name}}'.", tip: "You can mix static text and dynamic variables in any field." },
            { title: "Map the Body with formatting", instruction: "In the Content field, build a formatted message: 'Hi {{Full Name}},\\n\\nThank you for your order of ${{Order Total}}.\\n\\nShipping to: {{Country}}\\n\\nBest regards,\\nThe Team'.", tip: "Use \\n for line breaks. This makes emails look professional instead of cramped." },
            { title: "Handle missing data", instruction: "Use Make.com's ifempty() function: ifempty({{Country}}, 'Not provided'). This replaces empty Country fields with 'Not provided' instead of leaving a blank.", tip: "Always add fallbacks for optional fields. Empty values in emails look unprofessional." },
            { title: "Test with complete and incomplete data", instruction: "Run Once. Add a row with all fields filled. Then add another row with an empty Country field. Check both emails.", tip: "Testing with both complete and incomplete data is how professionals ensure reliability." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Send a row with all fields filled.", expected: "Email arrives with correct name, order total, and country — all formatted properly." },
            { test: "Send a row with an empty Country.", expected: "Email shows 'Not provided' for the country instead of a blank space." },
            { test: "Check that the Subject line has the correct name.", expected: "Subject reads 'Order Confirmation for Alice Johnson' (or whatever name was in the row)." },
            { test: "Verify the Order Total is in the email body.", expected: "The dollar amount from the sheet appears correctly in the email body." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Mapping the wrong column to a field (e.g., Name in the Email field).", fix: "Always check the column letter and name. Hover over the variable pill to confirm what data it contains." },
            { mistake: "Forgetting to handle empty or null values.", fix: "Use ifempty() or coalesce() functions to provide fallback values for any field that might be blank." },
            { mistake: "Not testing with edge cases (empty fields, special characters, long text).", fix: "Always test with at least one 'perfect' row and one 'messy' row to catch mapping issues." },
            { mistake: "Hard-coding values instead of using dynamic mapping.", fix: "If a value should change per row, it must be mapped dynamically. Hard-code only values that are the same every time (like your company name)." },
            { mistake: "Ignoring data types — sending a number where text is expected.", fix: "Use toString() to convert numbers to text when mapping to text fields, and parseNumber() when mapping text to number fields." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Use the upper() function to capitalize names: upper({{Full Name}}) → 'ALICE JOHNSON'.",
            "Split 'Full Name' into First Name and Last Name using substring() and indexOf() functions.",
            "Map data from one Google Sheet to another — trigger from Sheet A, write to Sheet B with transformed data."
          ],
          challenge: "Build an automation that reads a row from one sheet, transforms the data (capitalize name, format currency, add a date), and writes it to a different sheet."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add an 'Order Date' column to your sheet and map it into the email body with a formatted date string.",
          deliverable: "An updated email template that includes the formatted order date from the sheet.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Data Integration Service — connect a client's data sources so information flows automatically between apps.",
          price_range: "$300 – $800 per integration",
          pitch: "Businesses often have data in five different places — a CRM, a spreadsheet, an email tool, an accounting system, and a project manager. Offer to build the data pipelines that sync everything together. One integration saves hours of copy-paste work weekly."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Data mapping connects the output of one step to the input of the next.",
            "Always check which data fields are available from previous modules before mapping.",
            "Use ifempty() to handle missing data gracefully — never let blank values break your emails or messages.",
            "Test with both complete and incomplete data to ensure your automation handles edge cases.",
            "Mix static text with dynamic variables for professional-looking outputs."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does the ifempty() function do?", options: ["Deletes empty rows", "Returns a fallback value if the input is empty", "Sends an error notification", "Skips the entire module"], correct: 1, explanation: "ifempty() checks if a value is empty and returns a fallback value if it is — preventing blank fields in your outputs." },
            { question: "What is the most common cause of automation bugs?", options: ["Slow internet connection", "Incorrect data mapping between steps", "Using too many modules", "Running the workflow too often"], correct: 1, explanation: "Incorrect data mapping — like mapping the wrong field or forgetting to handle empty values — causes the vast majority of automation failures." }
          ]
        })
      ]
    },

    /* ── L5: Scheduling and Time-Based Triggers ── */
    {
      title: "Scheduling and Time-Based Triggers",
      slug: "scheduling-triggers",
      goal: "Make your automations run on a schedule — every hour, every morning, or at the exact moment you choose.",
      summary: "Not all automations are event-driven. Some need to run at specific times — daily reports, weekly digests, or hourly checks. This lesson teaches you to set up time-based triggers that work like clockwork.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will schedule automations to run at exact times — like having a personal assistant who never forgets.",
          description: "By the end of this lesson you will have a scheduled automation that sends a daily summary email every morning at 9 AM without any manual trigger."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Time-based automations are the most 'set and forget' type of automation. Once configured, they run for months without attention.",
          real_example: "A project manager set up a daily 9 AM automation that pulls incomplete tasks from Asana, formats them into a summary, and posts it in Slack. The team starts every morning with a clear task list — no manual work needed."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Scheduled Trigger",
          explanation: "A scheduled trigger starts your automation at a specific time or on a repeating schedule — not when an event happens, but when the clock says so.",
          analogy: "Think of an alarm clock. It does not wait for something to happen — it goes off at the time you set. A scheduled trigger is an alarm clock for your automation."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Sales teams", use: "Every Monday at 8 AM, pull last week's sales from the CRM and email a summary to the VP of Sales." },
            { company: "Content teams", use: "Every day at 6 PM, check a content calendar Google Sheet and remind writers about tomorrow's deadlines via Slack." },
            { company: "IT departments", use: "Every hour, check if a website is responding. If it is down, send an SMS alert to the on-call engineer." },
            { company: "E-commerce", use: "Every Friday at 5 PM, generate a weekly inventory report and email it to the warehouse manager." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A schedule rule: 'Every weekday at 9 AM'",
          steps: [
            "Set the automation's trigger to 'Schedule' mode with the desired timing.",
            "At the scheduled time, the trigger fires and passes the current date/time to the next step.",
            "The workflow executes its actions (fetch data, format report, send message).",
            "The workflow completes and waits until the next scheduled time."
          ],
          output: "A workflow that runs like clockwork at the exact times you set, with no human intervention."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Make.com", action: "Open your scenarios page. You will build a new scheduled scenario from scratch." },
            { tool: "Google Sheets", action: "Create a sheet called 'Daily Tasks' with columns: Task, Assignee, Status (Done/Pending), Due Date." },
            { tool: "Gmail", action: "You will receive the daily summary email that the automation generates." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the tasks sheet", instruction: "Make a new Google Sheet called 'Daily Tasks'. Add columns: Task, Assignee, Status, Due Date. Add 5-8 sample tasks with a mix of 'Done' and 'Pending' statuses.", tip: "Use today's date for some tasks so you can test the daily filter." },
            { title: "Create a new Make.com scenario", instruction: "In Make.com, create a new scenario. For the first module, choose Google Sheets → Search Rows.", tip: "We are using Search Rows instead of Watch New Rows because we want to pull all pending tasks, not just new ones." },
            { title: "Configure the search", instruction: "Connect your Google account, select the 'Daily Tasks' sheet. Set the filter to: Status column equals 'Pending'.", tip: "This search returns all rows where the task is not done — your daily pending task list." },
            { title: "Add a Text Aggregator", instruction: "After the Google Sheets module, add a 'Text Aggregator' tool (search for 'Tools' → 'Text Aggregator'). Map it to combine all pending tasks into one formatted list.", tip: "The Text Aggregator takes multiple rows and merges them into a single text block — perfect for summaries." },
            { title: "Configure the aggregator", instruction: "In the Text Aggregator, set the template to: '- {{Task}} (assigned to {{Assignee}}, due {{Due Date}})'. Set the row separator to a newline.", tip: "Each pending task becomes a bullet point in the final list." },
            { title: "Add Gmail Send Email", instruction: "After the aggregator, add Gmail → Send an Email. Set To to your email. Subject: 'Daily Task Summary — {{formatDate(now; \"MMM DD, YYYY\")}}'. Body: 'Here are your pending tasks:\\n\\n{{aggregated text}}'.", tip: "The formatDate function formats today's date nicely in the subject line." },
            { title: "Set the schedule", instruction: "Click the clock icon on the first module. Set 'Run scenario' to 'Every day' and set the time to '09:00'. Set the timezone to your local timezone.", tip: "For testing, you can set it to run every 15 minutes, then change to daily after confirming it works." },
            { title: "Test and activate", instruction: "Click Run Once to test the full flow. Verify the email arrives with your pending tasks list. Then toggle the scenario ON.", tip: "Check the email formatting — make sure each task is on its own line and the date is correct." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Run the scenario once manually.", expected: "An email arrives with a list of all 'Pending' tasks from the sheet." },
            { test: "Mark one task as 'Done' in the sheet, then run again.", expected: "The completed task no longer appears in the email." },
            { test: "Check the subject line.", expected: "It includes today's date formatted as 'MMM DD, YYYY'." },
            { test: "Verify the schedule is set.", expected: "The clock icon shows 'Every day at 09:00' with your timezone." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Setting the wrong timezone.", fix: "Always set the timezone explicitly in the scenario schedule settings. UTC is not the same as your local time." },
            { mistake: "Using Watch New Rows instead of Search Rows for scheduled summaries.", fix: "Watch New Rows only catches new entries. For daily summaries of existing data, use Search Rows to pull all matching records." },
            { mistake: "Forgetting the Text Aggregator and getting one email per row.", fix: "Without an aggregator, Make.com processes each row individually — sending 8 emails instead of one summary. Always aggregate before sending." },
            { mistake: "Schedule set to run too frequently during testing.", fix: "Set a wide interval while testing (every hour) to avoid burning through your free operations. Switch to the final schedule after testing." },
            { mistake: "Not handling the case where there are zero pending tasks.", fix: "Add a filter after the Search: if the number of results is 0, skip the email. Otherwise, you send empty daily summaries." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a filter for today's due date so the summary only shows tasks due today.",
            "Send the summary to Slack instead of (or in addition to) email.",
            "Add conditional formatting: if a task is overdue, prefix it with '⚠️ OVERDUE' in the summary."
          ],
          challenge: "Build a weekly summary that runs every Monday at 8 AM and includes a count of tasks completed last week, tasks still pending, and a completion percentage."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Change the schedule from daily to 'every weekday' (Monday through Friday). Verify that weekend days are excluded.",
          deliverable: "An updated scenario schedule showing weekday-only execution, confirmed in the scenario settings.",
          time: "5 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Automated Reports — build scheduled automations that generate and deliver daily, weekly, or monthly reports.",
          price_range: "$300 – $1,000 per report automation",
          pitch: "Every manager wants reports but nobody wants to make them. Offer automated daily, weekly, and monthly reports pulled from the client's existing data. Once built, they run forever. Charge setup plus $50-100/month for maintenance."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Scheduled triggers run at set times — daily, weekly, hourly — not when events happen.",
            "Use Search Rows (not Watch New Rows) for scheduled summaries of existing data.",
            "The Text Aggregator combines multiple rows into one message — essential for summary emails.",
            "Always set the correct timezone in schedule settings.",
            "Handle the 'zero results' case so you do not send empty reports."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the difference between Watch New Rows and Search Rows?", options: ["There is no difference", "Watch New Rows detects newly added rows; Search Rows queries existing rows based on criteria", "Search Rows only works with scheduled triggers", "Watch New Rows is faster"], correct: 1, explanation: "Watch New Rows triggers on newly added rows. Search Rows queries all existing rows that match your filter criteria — ideal for scheduled summaries." },
            { question: "Why do you need a Text Aggregator in a daily summary automation?", options: ["To make the text bigger", "To combine multiple rows into a single formatted message instead of one message per row", "To convert numbers to text", "To remove duplicate entries"], correct: 1, explanation: "Without the Text Aggregator, Make.com sends a separate email for each matching row. The aggregator combines all rows into one formatted summary." }
          ]
        })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 2 — Make.com From Zero
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Make.com From Zero",
  slug: "m2-make-com",
  lessons: [

    /* ── L1: Make.com Account Setup and Dashboard ── */
    {
      title: "Make.com Account Setup and Dashboard",
      slug: "make-account-setup",
      goal: "Navigate the Make.com dashboard like a power user and configure your account for maximum productivity.",
      summary: "This lesson gives you a complete tour of Make.com — from account settings to the scenario editor. You will know where every button is and what it does before building your first scenario.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will master the Make.com interface so building automations feels natural instead of confusing.",
          description: "By the end of this lesson you will know every section of the Make.com dashboard, understand your plan limits, and have your workspace organized for the rest of the course."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Students who skip dashboard orientation waste 20+ minutes per lesson looking for buttons. Knowing the interface first makes everything faster.",
          real_example: "A freelancer lost a client demo because she could not find the execution history during a live call. Knowing your dashboard prevents embarrassing moments."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Scenario (Make.com)",
          explanation: "A scenario is Make.com's name for a workflow — a complete automation from trigger to final action. Each scenario is one automation.",
          analogy: "Think of a scenario like a recipe card. Each card has a list of steps. Your Make.com dashboard is the recipe box that holds all your cards."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Marketing teams", use: "Dashboard folders organize scenarios by campaign — 'Q1 Launch', 'Newsletter', 'Social Media' — for easy management." },
            { company: "Agencies", use: "Separate Make.com organizations for each client keep data isolated and billing clear." },
            { company: "SaaS companies", use: "Teams use the Make.com Team plan to share scenarios and connections across departments." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A fresh Make.com account",
          steps: [
            "Tour the left sidebar: Scenarios, Templates, Connections, Webhooks, Data Stores.",
            "Check your plan limits: operations per month, data transfer, active scenarios.",
            "Create folders to organize your scenarios by module or project.",
            "Explore the scenario editor canvas — understand modules, connections, and the toolbar."
          ],
          output: "A fully oriented Make.com account with organized folders and a clear understanding of every dashboard section."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Make.com", action: "Log in to your Make.com account and stay on the dashboard." },
            { tool: "Browser", action: "Use Chrome or Firefox for the best Make.com experience. Keep one tab open for Make.com." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Explore the Scenarios page", instruction: "Click 'Scenarios' in the left sidebar. This is your home base — it lists every automation you have created. Note the search bar, filter options, and the '+ Create a new scenario' button.", tip: "Pin the Scenarios page in your browser for quick access." },
            { title: "Check your plan limits", instruction: "Click your profile icon (top-right) → Organization → Subscription. Note: Operations per month, active scenarios limit, data transfer limit.", tip: "Free plan: 1,000 operations/month, 2 active scenarios. Track this so you do not hit limits during the course." },
            { title: "Create folders", instruction: "On the Scenarios page, click 'Create a folder'. Make folders: 'Module 0 - Mindset', 'Module 1 - Basics', 'Module 2 - Make.com', 'Practice', 'Client Work'.", tip: "Organized folders prevent chaos when you have 20+ scenarios. Start organized, stay organized." },
            { title: "Tour the Connections page", instruction: "Click 'Connections' in the sidebar. This shows all connected apps (Google, Slack, etc.). Each connection can be reused across scenarios.", tip: "If a connection shows a red warning, click it to re-authorize. Stale connections are the #1 cause of scenario failures." },
            { title: "Explore Templates", instruction: "Click 'Templates' in the sidebar. Browse the top templates. Open 2-3 that interest you to see how experienced builders structure their scenarios.", tip: "Templates are a goldmine for learning. Study the module arrangement and data mapping in professional templates." },
            { title: "Open the scenario editor", instruction: "Create a new scenario (do not add modules yet). Notice the toolbar at the bottom: Run once, scheduling clock, undo/redo, and the modules panel on the right.", tip: "Right-click the canvas to access quick options like adding notes, aligning modules, and exporting." },
            { title: "Enable execution history", instruction: "In any scenario, click the three dots (top-right) → Settings → check 'Enable detailed logging for debugging'. This saves execution data for troubleshooting.", tip: "Detailed logging uses slightly more operations but is invaluable when debugging. Always enable it during development." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Click Scenarios in the sidebar.", expected: "Your scenario list appears with folders you created." },
            { test: "Click your profile → Organization → Subscription.", expected: "You can see your plan's operation limit and current usage." },
            { test: "Open the Connections page.", expected: "Your Google and Slack connections appear with green status indicators." },
            { test: "Open a blank scenario canvas.", expected: "You see the editor with the modules panel and bottom toolbar." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Not organizing scenarios into folders.", fix: "Create folders before you start building. Moving 30 scenarios later is painful." },
            { mistake: "Ignoring plan limits until operations run out.", fix: "Check your usage weekly. The free plan's 1,000 operations go fast with scheduled scenarios." },
            { mistake: "Leaving broken connections unfixed.", fix: "Re-authorize connections immediately when you see a red warning. Broken connections silently fail." },
            { mistake: "Not enabling detailed logging.", fix: "Without logging, debugging is guesswork. Enable it for every scenario during development." },
            { mistake: "Using one Make.com account for personal and client work.", fix: "Create separate organizations for clients. This keeps data separate and looks professional." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Explore the Make.com API documentation — you can manage scenarios programmatically.",
            "Connect your Make.com account to the Make.com mobile app for monitoring on the go.",
            "Look at the Webhooks section — custom webhooks let you trigger scenarios from any app."
          ],
          challenge: "Open three different templates from the Make.com library and sketch out their module flow on paper. Note which apps they connect and how data flows."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Create a folder structure in Make.com matching the course modules. Move any existing scenarios into the correct folder.",
          deliverable: "A clean Scenarios page with organized folders: one per module plus 'Practice' and 'Client Work'.",
          time: "5 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Make.com Account Setup and Training — set up a client's Make.com workspace with organized folders, connections, and a 30-minute walkthrough.",
          price_range: "$150 – $350 per setup",
          pitch: "Many businesses sign up for Make.com and then stare at the dashboard confused. Offer a setup service: create their organization, connect their apps, organize folders, and give a 30-minute screen-share tour."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "A scenario is Make.com's word for a workflow — one scenario = one automation.",
            "Organize scenarios into folders from day one to avoid chaos.",
            "Check your plan limits regularly — free plan has 1,000 operations per month.",
            "Keep connections healthy — re-authorize any that show warnings.",
            "Enable detailed logging on every scenario for easy debugging."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is a 'scenario' in Make.com?", options: ["A test environment", "A complete automation workflow from trigger to actions", "A pricing plan", "A folder for organizing templates"], correct: 1, explanation: "In Make.com, a scenario is a complete workflow — your trigger, actions, and all logic in between." },
            { question: "How many operations does the Make.com free plan include monthly?", options: ["100", "500", "1,000", "Unlimited"], correct: 2, explanation: "The free plan includes 1,000 operations per month. Each module execution in a scenario run counts as one operation." }
          ]
        })
      ]
    },

    /* ── L2: Your First Make.com Scenario ── */
    {
      title: "Your First Make.com Scenario",
      slug: "first-make-scenario",
      goal: "Build a real-world Make.com scenario from scratch that you could sell to a client today.",
      summary: "This hands-on lesson walks you through building a complete form-to-spreadsheet-to-notification scenario. Every click is documented. You will go from blank canvas to working automation.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will build a production-ready Make.com scenario and understand every piece of how it works.",
          description: "By the end you will have a working scenario: when someone fills out a Google Form, their data lands in a Google Sheet and your Slack channel gets an instant notification."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "This exact scenario pattern (form → spreadsheet → notification) is the foundation of 60 percent of all client automation requests.",
          real_example: "A freelancer built this pattern for a dental clinic: patient inquiry form → Google Sheet CRM → Slack notification to receptionist. Setup took 40 minutes, client paid $400, and the clinic reduced response time from 24 hours to 5 minutes."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Module",
          explanation: "In Make.com, a module is a single step in your scenario. Each module connects to one app and performs one action — like reading a row, sending a message, or creating a record.",
          analogy: "If a scenario is a sentence, each module is a word. You string words together to say something meaningful."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Event planners", use: "RSVP form → attendee spreadsheet → confirmation email → Slack alert to the events team." },
            { company: "Job boards", use: "Application form → applicant tracker sheet → hiring manager notification via email." },
            { company: "Fitness studios", use: "Class booking form → attendance sheet → Slack message to instructor with student count." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A Google Form submission",
          steps: [
            "Google Form responses auto-populate a linked Google Sheet.",
            "Make.com watches the sheet for new rows (trigger).",
            "Make.com reads the new row data (name, email, message).",
            "Make.com sends a formatted Slack notification with the form data."
          ],
          output: "Every form submission instantly appears in Slack with all details — your team never misses a lead."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Forms", action: "Create a form called 'Contact Us' with fields: Name (short text), Email (short text), Message (paragraph)." },
            { tool: "Google Sheets", action: "Link the form to a sheet (Forms auto-creates one). Open the linked sheet to verify it exists." },
            { tool: "Make.com", action: "Open Make.com and create a new scenario in your 'Module 2 - Make.com' folder." },
            { tool: "Slack", action: "Make sure your #automation-tests channel is ready." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the Google Form", instruction: "Go to forms.google.com, create a form called 'Contact Us'. Add three fields: Name (Short answer), Email (Short answer), Message (Paragraph). Click 'Responses' tab → green Sheets icon to create a linked sheet.", tip: "Submit one test response yourself so the linked sheet has data." },
            { title: "Start the Make.com scenario", instruction: "In Make.com, create a new scenario. Click the big plus icon. Search 'Google Sheets'. Select 'Watch New Rows'.", tip: "Name your scenario 'Contact Form → Slack Notification' right away." },
            { title: "Configure the trigger", instruction: "Connect your Google account. Select the form's linked spreadsheet. Choose Sheet1 (or 'Form Responses 1'). Set the column range to match your form fields.", tip: "Submit another test form response and click 'Run once' in Make.com to verify it captures the data." },
            { title: "Add Slack notification module", instruction: "Click the plus after the Google Sheets module. Search 'Slack'. Select 'Send a Message'. Connect your Slack workspace.", tip: "If you connected Slack before, select the existing connection from the dropdown." },
            { title: "Design the Slack message", instruction: "Channel: #automation-tests. Message: '📬 New Contact Form Submission\\n\\nName: {{Name}}\\nEmail: {{Email}}\\nMessage: {{Message}}\\n\\nReceived: {{Timestamp}}'.", tip: "Use the data pills from the Google Sheets module. Click into the field and select variables." },
            { title: "Test the complete flow", instruction: "Click 'Run once'. Submit a new Google Form response. Return to Make.com and check execution. Then check Slack for the notification.", tip: "If the scenario shows green checkmarks on all modules, it worked. If any module is red, click it to see the error." },
            { title: "Schedule and activate", instruction: "Click the clock icon on the trigger. Set to check every 15 minutes. Toggle the scenario ON.", tip: "15 minutes is the fastest polling for free plans. Paid plans support real-time webhooks." },
            { title: "Save and organize", instruction: "Save the scenario. Move it to your 'Module 2 - Make.com' folder.", tip: "Your first real Make.com scenario is now live and will run automatically." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Submit a Google Form response with test data.", expected: "Data appears in the linked Google Sheet within seconds." },
            { test: "Make.com picks up the new row.", expected: "Execution log shows the Google Sheets module found 1 new row." },
            { test: "Slack message appears.", expected: "A formatted notification with Name, Email, and Message appears in #automation-tests." },
            { test: "Scenario is scheduled.", expected: "Clock icon shows 'Every 15 minutes' and the scenario toggle is ON." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Selecting the wrong spreadsheet (not the one linked to the form).", fix: "The form-linked sheet usually has the same name as the form or is called 'Form Responses 1'. Double-check by submitting a test response and seeing where it appears." },
            { mistake: "Column range mismatch.", fix: "Make sure the column range matches your actual data columns. If your form has 3 fields plus a timestamp, set the range to A:D." },
            { mistake: "Slack message has empty fields.", fix: "Run the trigger once with existing data first so Make.com detects the column structure. Then map fields correctly." },
            { mistake: "Scenario runs but sends duplicate notifications.", fix: "Make.com tracks processed rows. If duplicates appear, check the 'From which row' setting in the trigger — set it to start after your test data." },
            { mistake: "Not testing before activating the schedule.", fix: "Always use Run Once at least twice before turning on scheduling. Fix all issues in test mode." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add an auto-reply email: after the Slack notification, add a Gmail module to send a 'Thank you for contacting us' email to the submitter.",
            "Add a filter: only notify Slack if the Message field contains the word 'urgent'.",
            "Replace Google Sheets trigger with a Make.com Webhook for instant (not polled) notifications."
          ],
          challenge: "Add a Google Sheets 'Add a Row' module at the end that logs each notification to a separate 'Notification Log' sheet with a timestamp."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Customize the Slack message format with bold text, line breaks, and a direct link to the Google Sheet row.",
          deliverable: "A Slack notification with formatted text including bold headers and a clickable link to the spreadsheet.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Lead Notification System — connect any web form to instant team notifications via Slack or email.",
          price_range: "$250 – $600 per setup",
          pitch: "Most businesses have web forms that dump into spreadsheets nobody checks. Offer instant notification systems so the team sees every lead within seconds. Include a one-page setup guide so the client understands what is running."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "The form → sheet → notification pattern is the most common automation request from clients.",
            "In Make.com, each round icon on the canvas is a module — one app, one action.",
            "Always Run Once before activating a schedule to catch errors early.",
            "Check the execution log (History tab) to see exactly what happened in each run.",
            "Organize scenarios into folders as you build them — do not wait until later."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does a module represent in Make.com?", options: ["An entire workflow", "A single step that connects to one app and performs one action", "A folder for organizing scenarios", "A billing unit"], correct: 1, explanation: "Each module is one step in your scenario, connected to one app and performing one specific action (read, send, create, etc.)." },
            { question: "Why should you click 'Run Once' before activating a schedule?", options: ["To use up test operations", "To initialize the database", "To test the scenario and catch errors before it runs automatically", "It is required by Make.com"], correct: 2, explanation: "Run Once lets you test the entire scenario with real data so you can find and fix errors before the automation runs on a schedule." }
          ]
        })
      ]
    },

    /* ── L3: Filters and Routers in Make.com ── */
    {
      title: "Filters and Routers in Make.com",
      slug: "make-filters-routers",
      goal: "Build intelligent scenarios that split, filter, and route data to different destinations based on conditions.",
      summary: "Filters and routers turn linear workflows into smart decision trees. This lesson teaches you to control exactly which data goes where — the key to building automation systems that handle real-world complexity.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "Your Make.com scenarios will become intelligent — automatically routing data down different paths based on rules you define.",
          description: "After this lesson you can build scenarios that handle VIP customers differently from regulars, route support tickets by category, and skip irrelevant data automatically."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Without filters and routers, every input gets the same treatment. With them, your automations handle the nuance that real businesses need.",
          real_example: "A SaaS company used a Make.com router to sort trial signups by company size: enterprises went to the sales team via Slack, mid-market got an email sequence, and solo users got a self-serve onboarding flow. Conversion increased 35 percent."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Router",
          explanation: "A router splits your scenario into multiple paths. Each path can have its own filter and its own modules. It is like a fork in the road where each direction has different rules.",
          analogy: "A router is like an airport security checkpoint with multiple lanes. Some passengers go to the fast lane (priority), some to the regular lane, and some get flagged for extra screening. Each lane leads to a different outcome."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Customer support", use: "Router splits incoming tickets: billing issues → finance Slack channel, technical issues → engineering channel, feature requests → product board." },
            { company: "E-commerce", use: "Filter skips orders under $10 (not worth the processing overhead). Router sends domestic and international orders to different fulfillment flows." },
            { company: "HR departments", use: "Router sorts job applications by department: engineering, marketing, sales — each goes to the relevant hiring manager." },
            { company: "Newsletters", use: "Filter blocks subscribers who have unsubscribed. Router segments remaining subscribers by interest tag for personalized content." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A new row in a 'Support Tickets' Google Sheet with columns: Name, Email, Category, Priority",
          steps: [
            "Trigger: new row detected in the sheet.",
            "Router splits into three paths based on Category.",
            "Path 1 (Billing): filter checks Category = 'Billing' → sends Slack message to #billing-support.",
            "Path 2 (Technical): filter checks Category = 'Technical' → sends Slack message to #tech-support AND creates a Trello card.",
            "Path 3 (General): fallback path for everything else → sends email to the general support inbox."
          ],
          output: "Each support ticket automatically goes to the right team through the right channel — no manual sorting."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create a 'Support Tickets' sheet with columns: Name, Email, Category (Billing/Technical/General), Priority (High/Low)." },
            { tool: "Make.com", action: "Create a new scenario in your Module 2 folder." },
            { tool: "Slack", action: "Create channels: #billing-support, #tech-support, #general-support." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Prepare test data", instruction: "In the Support Tickets sheet, add 4 rows: one Billing ticket, one Technical ticket, one General ticket, and one Technical + High Priority ticket.", tip: "Use realistic names and emails. This data will flow through your router." },
            { title: "Create the trigger", instruction: "In Make.com, add Google Sheets → Watch New Rows. Connect to the Support Tickets sheet.", tip: "Run once with existing data so Make.com learns the column structure." },
            { title: "Add a Router", instruction: "After the trigger, right-click and select 'Add a Router'. Three paths will appear. You can add more by clicking the Router node.", tip: "The Router itself does not filter — filters go on each individual path." },
            { title: "Configure Path 1 (Billing)", instruction: "Click the line connecting the Router to the first path. Add a filter: Category equals 'Billing'. Then add a Slack module on this path: Send Message to #billing-support: 'Billing ticket from {{Name}}: {{Email}}'.", tip: "Name the filter 'Billing Only' for clarity in the scenario view." },
            { title: "Configure Path 2 (Technical)", instruction: "On the second path, add a filter: Category equals 'Technical'. Add a Slack module: Send Message to #tech-support: 'Tech ticket from {{Name}} [{{Priority}}]'.", tip: "Including the Priority in the message helps engineers triage quickly." },
            { title: "Configure Path 3 (General / Fallback)", instruction: "On the third path, add a filter: Category does not equal 'Billing' AND does not equal 'Technical'. Add a Gmail module: send email to support@yourdomain.com with ticket details.", tip: "This catch-all path handles any category that is not Billing or Technical." },
            { title: "Add a secondary filter on Path 2", instruction: "On the Technical path, after the Slack module, add another filter: Priority equals 'High'. After this filter, add another Slack module that sends to #urgent-alerts: 'URGENT TECH ISSUE: {{Name}}'.", tip: "You can chain filters and actions within a single path for complex logic." },
            { title: "Test all paths", instruction: "Click Run Once. Add rows one at a time for each category. Verify each row goes to the correct Slack channel or email.", tip: "Check the execution log — it shows which paths were taken and which were filtered out." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a Billing category row.", expected: "Message appears in #billing-support only." },
            { test: "Add a Technical + Low Priority row.", expected: "Message appears in #tech-support only." },
            { test: "Add a Technical + High Priority row.", expected: "Messages appear in both #tech-support and #urgent-alerts." },
            { test: "Add a General category row.", expected: "Email sent to support inbox; no Slack messages." },
            { test: "Check the execution log.", expected: "Each run shows which paths were followed and which were blocked by filters." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Forgetting to add filters to Router paths (all paths execute).", fix: "Without filters, every path runs for every input. Add a filter on every path to control routing." },
            { mistake: "Overlapping filters — a row matches two paths.", fix: "Make filters mutually exclusive. Use 'equals' for specific paths and 'does not equal' for the fallback." },
            { mistake: "No fallback path for unmatched data.", fix: "Always add a catch-all path. Without it, data that matches no filter is silently lost." },
            { mistake: "Using nested Routers when one Router with more paths would work.", fix: "You can add many paths to a single Router. Only nest Routers when you need sub-routing within a path." },
            { mistake: "Filter names are generic like 'Filter 1'.", fix: "Name every filter descriptively: 'Billing Only', 'High Priority Technical'. This makes the scenario readable." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a fourth path that specifically handles 'Refund' category tickets with a Gmail auto-reply to the customer.",
            "Use the 'Contains' operator instead of 'Equals' to catch variations in Category (e.g., 'billing' vs 'Billing').",
            "Add an Iterator before the Router to handle rows where one ticket has multiple categories separated by commas."
          ],
          challenge: "Build a lead router with 5 paths based on different criteria: region, company size, product interest, source channel, and budget range."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add a Priority filter to the Billing path so only High Priority billing tickets trigger a Slack notification. Low Priority billing tickets should only be logged in the sheet.",
          deliverable: "An updated scenario where Billing + High Priority → Slack alert, Billing + Low Priority → no alert.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Intelligent Routing System — build Make.com scenarios that automatically sort and distribute incoming data to the right team or tool.",
          price_range: "$500 – $1,500 per routing system",
          pitch: "Businesses drown in unsorted data: leads, tickets, orders. Offer to build a smart routing system that sends each item to the right person instantly. A support ticket router alone can save a team 10+ hours per week of manual sorting."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Routers split scenarios into multiple paths — each path can have its own filter and actions.",
            "Filters go on the connection lines between modules, not inside modules.",
            "Always add a fallback path to catch data that does not match any specific filter.",
            "Name your filters descriptively — 'Billing Only' is better than 'Filter 1'.",
            "Test each path individually with data that matches its filter."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What happens if no filter is added to a Router path?", options: ["The path is ignored", "The path executes for every input", "Make.com shows an error", "Only the first data item goes through"], correct: 1, explanation: "Without a filter, a Router path runs for every input. Always add filters to control which data takes which path." },
            { question: "What is the purpose of a fallback path on a Router?", options: ["To run the scenario faster", "To catch data that does not match any other path's filter", "To duplicate data to all paths", "To reset the scenario"], correct: 1, explanation: "The fallback path ensures that data which does not match any specific filter is still handled — preventing silent data loss." }
          ]
        })
      ]
    },

    /* ── L4: Google Sheets + Make.com ── */
    {
      title: "Google Sheets + Make.com",
      slug: "make-google-sheets",
      goal: "Master every Google Sheets operation in Make.com — read, write, update, search, and delete rows like a database.",
      summary: "Google Sheets is the most popular data source in automation. This lesson covers every Google Sheets module in Make.com so you can treat a spreadsheet as a full database for your automations.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will use Google Sheets as a powerful automation database — reading, writing, and updating data from Make.com.",
          description: "By the end of this lesson you will have built an automation that reads data, processes it, writes results back to a sheet, and updates existing rows — all automatically."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Google Sheets is free, familiar to clients, and works as a lightweight database. Mastering it in Make.com covers 80 percent of client data needs.",
          real_example: "A consultant built a client CRM entirely in Google Sheets with Make.com automations handling lead capture, follow-up reminders, and status updates. The client avoided paying $200/month for a CRM tool."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "CRUD Operations",
          explanation: "CRUD stands for Create, Read, Update, Delete — the four basic things you can do with data. In Google Sheets terms: add a row, read rows, update a cell, and delete a row.",
          analogy: "Think of a notebook. You can write new entries (Create), flip back to read them (Read), cross something out and rewrite it (Update), or tear out a page (Delete). CRUD is the same for digital data."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Freelancers", use: "Track client projects in Google Sheets. Make.com updates status, logs hours, and sends invoices automatically." },
            { company: "Teachers", use: "Grade submissions tracked in Google Sheets. Make.com sends personalized grade notifications to each student via email." },
            { company: "Event planners", use: "RSVPs stored in Google Sheets. Make.com watches for new entries, updates seat counts, and sends confirmation emails." },
            { company: "Sales teams", use: "Lead tracker in Google Sheets. Make.com searches for leads with no follow-up in 3 days and sends reminder emails to reps." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A Google Sheet with customer data (Name, Email, Status, Last Contact Date)",
          steps: [
            "Read: Search Rows to find all customers with Status = 'Pending'.",
            "Process: For each result, check if Last Contact Date is more than 7 days ago.",
            "Update: Change Status to 'Follow-up Needed' for stale entries.",
            "Create: Add a row to a 'Follow-up Log' sheet with the customer name and today's date."
          ],
          output: "Stale leads are automatically flagged and logged — no manual checking required."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create a sheet called 'Customer Tracker' with columns: Name, Email, Status (Active/Pending/Closed), Last Contact Date, Notes." },
            { tool: "Google Sheets", action: "Create a second sheet called 'Follow-up Log' with columns: Customer Name, Email, Flagged Date, Reason." },
            { tool: "Make.com", action: "Create a new scenario in your Module 2 folder." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Add sample data", instruction: "In Customer Tracker, add 6 rows. Mix statuses: 2 Active, 2 Pending (one with a recent date, one with a date 10+ days ago), 2 Closed.", tip: "Use dates that let you test the 'older than 7 days' logic. Set one Pending row's date to 2 weeks ago." },
            { title: "Create the Search trigger", instruction: "In Make.com, add Google Sheets → Search Rows. Select Customer Tracker. Filter: Status equals 'Pending'.", tip: "Search Rows returns all matching rows — perfect for batch operations." },
            { title: "Add a date filter", instruction: "After the Search Rows module, add a filter on the connection line: Last Contact Date is before {{addDays(now; -7)}}. This passes only entries older than 7 days.", tip: "addDays(now; -7) gives you the date 7 days ago. Any contact date before that is stale." },
            { title: "Add Update Row module", instruction: "After the filter, add Google Sheets → Update a Row. Select Customer Tracker. Row number: use the row number from the Search Rows output. Set Status column to 'Follow-up Needed'.", tip: "The row number from Search Rows tells Update Row exactly which row to modify." },
            { title: "Add a Create Row module", instruction: "After the Update Row module, add Google Sheets → Add a Row. Select the Follow-up Log sheet. Map: Customer Name = {{Name}}, Email = {{Email}}, Flagged Date = {{now}}, Reason = 'No contact in 7+ days'.", tip: "This creates a paper trail of all follow-up flags — useful for managers and auditing." },
            { title: "Add a Gmail notification", instruction: "After the log entry, add Gmail → Send an Email to yourself: 'Follow-up flagged for {{Name}} ({{Email}}). Last contact: {{Last Contact Date}}'.", tip: "This email nudge ensures someone actually follows up — the automation flags it, a human acts on it." },
            { title: "Test with Run Once", instruction: "Click Run Once. Check: Customer Tracker should show updated Status. Follow-up Log should have a new row. Your email should have a notification.", tip: "If the date filter blocks all rows, adjust test data dates to be more than 7 days old." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Check Customer Tracker after running.", expected: "Stale Pending row now shows 'Follow-up Needed' status." },
            { test: "Check Follow-up Log.", expected: "A new row with the customer name, email, today's date, and reason." },
            { test: "Check email.", expected: "A notification email with the flagged customer's details." },
            { test: "Verify recent Pending rows were not touched.", expected: "Pending rows with recent Last Contact Dates remain unchanged." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Using Add a Row when you meant Update a Row.", fix: "Add creates a new row. Update modifies an existing one. Check which module you are using." },
            { mistake: "Wrong row number in Update a Row.", fix: "Always map the row number dynamically from the Search Rows output — never hard-code a row number." },
            { mistake: "Date comparison fails because of format mismatch.", fix: "Use Make.com's parseDate() function to standardize date formats before comparing." },
            { mistake: "Search Rows returns too many results and burns through operations.", fix: "Add specific filters to narrow results. Also consider using the 'Maximum number of returned rows' setting." },
            { mistake: "Forgetting that Google Sheets rows shift when you delete rows.", fix: "Avoid deleting rows in automated sheets. Instead, mark rows as 'Archived' with a status column." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Follow-up Count' column and increment it each time the automation flags a customer.",
            "If Follow-up Count reaches 3, automatically change Status to 'Lost' and stop sending notifications.",
            "Build a weekly summary that counts Active, Pending, and Closed customers and emails the totals."
          ],
          challenge: "Add a Delete Row module that removes rows from Follow-up Log after a human marks them as 'Resolved'. Build the full loop: flag → follow up → resolve → clean up."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add a 'Last Automated Check' column to Customer Tracker. Have Make.com write today's date to this column every time it checks a row.",
          deliverable: "An updated scenario that writes the current date to the Last Automated Check column for each processed row.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Google Sheets CRM Automation — build a lightweight CRM in Google Sheets powered by Make.com automations.",
          price_range: "$500 – $2,000 per CRM setup",
          pitch: "Small businesses that cannot afford Salesforce or HubSpot love a Google Sheets CRM. Build it with automated follow-up reminders, status updates, and email notifications. It costs the client $0/month in software — your setup fee is pure profit."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Google Sheets is the most versatile data source for automation — free, familiar, and powerful.",
            "Master CRUD: Create (Add a Row), Read (Search Rows), Update (Update a Row), Delete (Delete a Row).",
            "Always map row numbers dynamically from search results — never hard-code them.",
            "Use date functions like addDays() and parseDate() for time-based logic.",
            "Avoid deleting rows in automated sheets — use a Status column to mark records instead."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does CRUD stand for?", options: ["Connect, Route, Upload, Download", "Create, Read, Update, Delete", "Copy, Rename, Undo, Duplicate", "Configure, Run, Update, Deploy"], correct: 1, explanation: "CRUD stands for Create, Read, Update, Delete — the four fundamental operations for managing data." },
            { question: "Why should you avoid deleting rows in automated Google Sheets?", options: ["It costs extra operations", "Row numbers shift, breaking row-number references in other modules", "Google does not allow it", "It is slower than other operations"], correct: 1, explanation: "When you delete a row, all rows below it shift up by one. This breaks any automation that references specific row numbers." }
          ]
        })
      ]
    },

    /* ── L5: Error Handling in Make.com ── */
    {
      title: "Error Handling in Make.com",
      slug: "make-error-handling",
      goal: "Build bulletproof automations that handle errors gracefully instead of silently failing.",
      summary: "Every automation will eventually encounter errors — bad data, disconnected accounts, rate limits. This lesson teaches you to catch, handle, and recover from errors so your workflows never break without you knowing.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "Your automations will never fail silently again — you will know about every error and have a plan to fix it.",
          description: "By the end of this lesson you will have error handlers on your scenarios that catch failures, notify you, and even retry automatically."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Automations without error handling are ticking time bombs. They break silently and you only find out when a client complains.",
          real_example: "A freelancer's client automation failed for 2 weeks because of an expired Google connection. No error handling meant no alerts. 300 leads were lost. Proper error handling would have sent an alert on the first failure."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Error Handler",
          explanation: "An error handler is a backup path in your scenario that activates when something goes wrong. Instead of the whole scenario crashing, the error handler decides what to do — retry, skip, log, or alert you.",
          analogy: "Think of a safety net under a tightrope. The performer (your automation) walks the wire. If they slip (an error), the net catches them. Without a net, they fall. Without an error handler, your automation crashes."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Payment processing", use: "If a Stripe charge fails, the error handler retries once, then sends a Slack alert to the billing team if it fails again." },
            { company: "Data sync", use: "If Google Sheets is temporarily unavailable, the error handler waits 60 seconds and retries instead of losing the data." },
            { company: "API integrations", use: "If an API returns a rate-limit error (429), the error handler pauses for 30 seconds then retries the request." },
            { company: "Email campaigns", use: "If an email bounces, the error handler logs the bad address and continues sending to the next contact instead of stopping the entire campaign." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A scenario where a Gmail module might fail (expired token, invalid email address)",
          steps: [
            "The Gmail module encounters an error (authentication expired).",
            "Make.com triggers the error handler attached to the Gmail module.",
            "The error handler sends a Slack notification: 'Gmail module failed — re-authorize needed'.",
            "The error handler logs the error details to an 'Error Log' Google Sheet for tracking."
          ],
          output: "You get an instant alert about the failure and a detailed log for troubleshooting — the scenario does not crash silently."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Make.com", action: "Open an existing scenario or create a new one with at least 2 modules." },
            { tool: "Google Sheets", action: "Create an 'Error Log' sheet with columns: Date, Scenario Name, Module, Error Message, Status (New/Resolved)." },
            { tool: "Slack", action: "Use your #automation-tests channel for error notifications." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Open an existing scenario", instruction: "Open the Contact Form → Slack Notification scenario from L2 (or any scenario with multiple modules).", tip: "Error handling is best practiced on a scenario you have already tested successfully." },
            { title: "Add an error handler to the Slack module", instruction: "Right-click the Slack module. Select 'Add error handler'. A new branch appears below the module with a red circle.", tip: "Error handlers only activate when the module they are attached to encounters an error." },
            { title: "Add a Slack alert on the error path", instruction: "On the error handler path, add a Slack → Send Message module. Channel: #automation-tests. Message: '❌ Error in Contact Form scenario — Slack module failed: {{error.message}}'.", tip: "The {{error.message}} variable contains the actual error text from the failed module." },
            { title: "Add an error log entry", instruction: "After the Slack alert, add Google Sheets → Add a Row pointing to your Error Log sheet. Map: Date = {{now}}, Scenario Name = 'Contact Form → Slack', Module = 'Send Slack Message', Error Message = {{error.message}}.", tip: "Logging errors lets you spot patterns — if the same error happens repeatedly, you know what to fix." },
            { title: "Set up the error handler type", instruction: "Click the error handler circle (red icon on the error path). Choose 'Resume' — this tells Make.com to continue the scenario even after the error, using the error handler's output.", tip: "Other options: 'Ignore' (skip and continue), 'Rollback' (undo changes), 'Break' (stop and retry later), 'Commit' (save progress and stop)." },
            { title: "Test with a deliberate error", instruction: "Temporarily break the Slack connection: go to Connections, disconnect Slack. Run the scenario. The Slack module should fail and the error handler should fire.", tip: "Re-connect Slack after testing! This is a controlled way to verify your error handler works." },
            { title: "Verify error handling", instruction: "Check #automation-tests for the error alert. Check the Error Log sheet for the logged entry. Then reconnect Slack and run the scenario normally to confirm it works again.", tip: "A good error handler fires on failure and stays invisible during normal operation." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Disconnect Slack and run the scenario.", expected: "The Slack module fails but the error handler catches it." },
            { test: "Check #automation-tests (if using a secondary notification method like email).", expected: "An error notification was sent via the error handler's alternative path." },
            { test: "Check the Error Log sheet.", expected: "A new row with today's date, scenario name, module name, and error message." },
            { test: "Reconnect Slack and run normally.", expected: "The scenario runs successfully with no error handler activation." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Not adding error handlers at all.", fix: "Every production scenario should have error handlers on critical modules. Spend 5 extra minutes now to save hours of debugging later." },
            { mistake: "Using 'Ignore' for every error.", fix: "Ignore silently skips errors. Use it only for non-critical modules. For important steps, use Resume or Break." },
            { mistake: "Error handler sends alerts to the same channel that is failing.", fix: "If Slack is down, your Slack error alert will also fail. Use email as a backup notification channel for Slack errors." },
            { mistake: "Not logging errors to a sheet or database.", fix: "Memory is unreliable. Always log errors somewhere persistent. The Error Log sheet is your safety net's safety net." },
            { mistake: "Forgetting to reconnect services after testing error handlers.", fix: "After deliberately breaking a connection to test, immediately reconnect it and run a success test." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Break' error handler that retries the scenario automatically after 10 minutes.",
            "Build a daily error summary: scheduled scenario reads the Error Log sheet and emails you a digest of all errors from the past 24 hours.",
            "Create a global error handler template that you reuse across all scenarios."
          ],
          challenge: "Build a scenario where three different modules each have their own error handler, and a final module sends a summary of all errors encountered in that run."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add error handlers to two modules in your most important scenario. Make sure one sends a Slack alert and the other logs to the Error Log sheet.",
          deliverable: "A scenario with error handlers on two critical modules, tested by deliberately triggering an error.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Automation Reliability Audit — review a client's existing automations and add error handling, logging, and alerting.",
          price_range: "$400 – $1,200 per audit",
          pitch: "Most businesses set up automations and forget them. When they break, nobody knows until damage is done. Offer a reliability audit: review all scenarios, add error handlers, set up an error dashboard, and deliver a monitoring guide."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Error handlers catch failures and prevent silent breakdowns.",
            "Always log errors to a persistent location (Google Sheet, database, or error tracking service).",
            "Use backup notification channels — if Slack is down, send errors via email.",
            "Error handler types: Resume (continue), Ignore (skip), Break (retry later), Rollback (undo), Commit (save and stop).",
            "Test error handlers by deliberately breaking a connection — then reconnect immediately after."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does the 'Break' error handler type do?", options: ["Permanently stops the scenario", "Pauses the scenario and retries it later", "Deletes the failed module", "Sends a break-time reminder"], correct: 1, explanation: "Break pauses the scenario execution and adds it to the incomplete executions queue for retry later — useful for temporary failures like API rate limits." },
            { question: "Why should you log errors to a Google Sheet?", options: ["To use more operations", "To create a persistent record that helps spot error patterns and ensures no failure goes unnoticed", "It is required by Make.com", "To fill up storage space"], correct: 1, explanation: "Logging errors creates a paper trail. You can spot patterns (same module failing daily = stale connection) and prove to clients that your automations are monitored." }
          ]
        })
      ]
    },

    /* ── L6: Multi-Step Email Automation ── */
    {
      title: "Multi-Step Email Automation",
      slug: "make-email-automation",
      goal: "Build a multi-step email sequence that nurtures leads automatically over days without you lifting a finger.",
      summary: "This lesson combines everything you have learned into a powerful multi-step email automation. You will build a drip sequence that sends different emails over time based on user behavior.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will build an automated email drip sequence — the same system companies pay thousands for using tools like Mailchimp.",
          description: "By the end of this lesson you will have a Make.com scenario that sends a welcome email on Day 1, a follow-up on Day 3, and a special offer on Day 7 — all automatically."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Email drip sequences are one of the highest-ROI automations. They turn leads into customers on autopilot.",
          real_example: "An online course creator built a 5-email drip sequence using Make.com and Google Sheets. The sequence converted 12 percent of free trial users into paying customers — generating $4,000/month in extra revenue with zero ongoing effort."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Email Drip Sequence",
          explanation: "An email drip sequence is a series of pre-written emails sent automatically over time. Each email 'drips' out on a schedule after the user triggers the sequence (like signing up or making a purchase).",
          analogy: "Think of a drip irrigation system in a garden. Instead of flooding plants with water all at once, it drips slowly over time. An email drip sequence does the same — delivering messages at the right pace so recipients are not overwhelmed."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "SaaS companies", use: "Welcome email → Feature tour email (Day 2) → Case study email (Day 5) → Upgrade offer (Day 7) → Last chance (Day 10)." },
            { company: "E-commerce", use: "Cart abandonment email (1 hour later) → Reminder with discount (Day 1) → Final reminder (Day 3)." },
            { company: "Real estate", use: "New inquiry → Property matching email (Day 0) → Agent intro email (Day 1) → Scheduling email (Day 3)." },
            { company: "Freelancers", use: "New lead from website → Intro email → Portfolio showcase email (Day 2) → Call booking link (Day 5)." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A new subscriber row in Google Sheets (Name, Email, Signup Date)",
          steps: [
            "Day 0: Trigger fires on new row → send welcome email immediately.",
            "Day 3: Scheduled check finds subscribers where Signup Date = 3 days ago → send follow-up email.",
            "Day 7: Scheduled check finds subscribers where Signup Date = 7 days ago → send special offer email.",
            "Track: Update the subscriber row with a 'Last Email Sent' column after each send."
          ],
          output: "Each new subscriber automatically receives a 3-email sequence over 7 days without manual intervention."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create a 'Subscribers' sheet with columns: Name, Email, Signup Date, Last Email Sent (Day 0 / Day 3 / Day 7), Status (Active/Completed)." },
            { tool: "Make.com", action: "You will build three separate scenarios: one for each email in the drip sequence." },
            { tool: "Gmail", action: "Prepare three email templates: Welcome, Follow-Up, Special Offer." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Set up the Subscribers sheet", instruction: "Create the Google Sheet with columns: Name, Email, Signup Date, Last Email Sent, Status. Add 3 test rows with different signup dates: today, 3 days ago, and 7 days ago.", tip: "Vary the dates so you can test all three email scenarios at once." },
            { title: "Build Scenario 1: Welcome Email (Day 0)", instruction: "Create a new scenario. Trigger: Google Sheets → Watch New Rows on the Subscribers sheet. Action: Gmail → Send Email. Subject: 'Welcome, {{Name}}!' Body: 'Hi {{Name}}, thanks for subscribing! Here is what to expect...' Then add Google Sheets → Update a Row to set 'Last Email Sent' to 'Day 0'.", tip: "This scenario fires immediately when a new subscriber is added." },
            { title: "Build Scenario 2: Follow-Up Email (Day 3)", instruction: "Create a new scenario. Trigger: Schedule → Every day at 10 AM. Next: Google Sheets → Search Rows where Signup Date = 3 days ago AND Last Email Sent = 'Day 0'. Action: Gmail → Send Email. Subject: 'How is it going, {{Name}}?' Body: 'Hi {{Name}}, just checking in. Here are some tips to get started...' Then update Last Email Sent to 'Day 3'.", tip: "Use addDays(now; -3) and formatDate() to match the date format in your sheet." },
            { title: "Build Scenario 3: Special Offer (Day 7)", instruction: "Create a new scenario. Trigger: Schedule → Every day at 10 AM. Next: Google Sheets → Search Rows where Signup Date = 7 days ago AND Last Email Sent = 'Day 3'. Action: Gmail → Send Email. Subject: 'A special offer for you, {{Name}}' Body: 'Hi {{Name}}, since you have been with us a week, here is 20% off...' Then update Last Email Sent to 'Day 7' and Status to 'Completed'.", tip: "Checking Last Email Sent = Day 3 ensures only people who received the Day 3 email get the Day 7 one." },
            { title: "Test Scenario 1", instruction: "Run Scenario 1. Add a new row to the sheet. Check that the welcome email arrives and Last Email Sent updates to 'Day 0'.", tip: "Use your own email for testing." },
            { title: "Test Scenario 2", instruction: "Manually set a test row's Signup Date to 3 days ago and Last Email Sent to 'Day 0'. Run Scenario 2. Verify the follow-up email arrives.", tip: "You may need to adjust the date comparison if your sheet uses a different date format." },
            { title: "Test Scenario 3", instruction: "Set a test row's Signup Date to 7 days ago and Last Email Sent to 'Day 3'. Run Scenario 3. Verify the offer email arrives and Status changes to 'Completed'.", tip: "After testing, activate all three scenarios on their schedules." },
            { title: "Activate all three scenarios", instruction: "Turn on Scenario 1 (event-based). Set Scenarios 2 and 3 to run daily at 10 AM. Your drip sequence is now live.", tip: "Use a consistent time (10 AM) for scheduled emails so subscribers receive them at a predictable hour." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a brand-new subscriber to the sheet.", expected: "Welcome email arrives within the polling interval. Last Email Sent = Day 0." },
            { test: "Set a row to 3 days old with Day 0 sent. Run Scenario 2.", expected: "Follow-up email arrives. Last Email Sent updates to Day 3." },
            { test: "Set a row to 7 days old with Day 3 sent. Run Scenario 3.", expected: "Offer email arrives. Last Email Sent = Day 7, Status = Completed." },
            { test: "Verify completed subscribers are not re-emailed.", expected: "Running Scenario 2 or 3 again does not send duplicate emails to completed subscribers." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Date format mismatch between the sheet and Make.com.", fix: "Standardize on YYYY-MM-DD in your sheet. Use Make.com's formatDate(now; 'YYYY-MM-DD') to match." },
            { mistake: "Sending duplicate emails because Search Rows returns already-processed subscribers.", fix: "Always check the Last Email Sent column to filter out subscribers who already received that email." },
            { mistake: "All three scenarios competing for the same rows.", fix: "Each scenario's search filter should be specific: Day 0 scenario looks for new rows, Day 3 looks for Day 0 sent, Day 7 looks for Day 3 sent." },
            { mistake: "Not updating the tracker column after sending.", fix: "Always update Last Email Sent immediately after the Gmail module. Otherwise the next run will send the same email again." },
            { mistake: "Testing with real client emails.", fix: "Always test with your own email address first. Only switch to real contacts after all scenarios are verified." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a Day 1 email between Welcome and Day 3 for a 4-step sequence.",
            "Track opens using a tracking pixel URL in the email and update the sheet when a subscriber opens an email.",
            "Add an unsubscribe link that, when clicked, triggers a webhook that sets Status to 'Unsubscribed' and stops future emails."
          ],
          challenge: "Build a 5-email drip sequence with conditional branching: if the subscriber opens Email 2, they get the sales pitch on Day 5. If they do not open it, they get a softer reminder instead."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Write the three email templates (welcome, follow-up, offer) in a Google Doc. Include a subject line, body text, and one call-to-action link for each.",
          deliverable: "A Google Doc with three polished email templates ready to use in the automation.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Email Drip Sequence Setup — build automated email sequences that nurture leads into customers.",
          price_range: "$500 – $2,000 per sequence",
          pitch: "Email sequences are proven money-makers. Offer to build a 3-7 email drip sequence for a client. Include the Google Sheets tracker, Make.com scenarios, and polished email templates. Charge setup plus $100/month for monitoring and optimization."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Email drip sequences send pre-written emails automatically over time — Day 0, Day 3, Day 7, etc.",
            "Use separate Make.com scenarios for each email in the sequence, with scheduled triggers.",
            "Always track which email was last sent to prevent duplicates.",
            "Date math is critical — use addDays() and formatDate() for reliable date comparisons.",
            "Test every scenario with your own email before going live with real contacts."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "Why use separate scenarios for each drip email instead of one big scenario?", options: ["Separate scenarios are faster", "Each email runs on a different schedule and has different search criteria — keeping them separate makes debugging easier", "Make.com requires it", "It uses fewer operations"], correct: 1, explanation: "Separate scenarios let each email run on its own schedule with its own search criteria. If one breaks, the others keep running. Debugging is also much simpler." },
            { question: "How do you prevent a subscriber from receiving the same drip email twice?", options: ["Delete the subscriber row after each email", "Track which email was last sent in a column and filter by it in each scenario", "Use a random delay", "Trust Make.com to handle it automatically"], correct: 1, explanation: "A 'Last Email Sent' column tracks progress through the drip sequence. Each scenario's search filter checks this column to only target subscribers at the right stage." }
          ]
        })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 3 — n8n From Zero
   ═══════════════════════════════════════════════════════════════ */
{
  title: "n8n From Zero",
  slug: "m3-n8n",
  lessons: [

    /* ── L1: n8n Setup Cloud or Self-Hosted ── */
    {
      title: "n8n Setup Cloud or Self-Hosted",
      slug: "n8n-setup",
      goal: "Get n8n running — either on the cloud or self-hosted — and understand which option is best for you.",
      summary: "n8n gives you a choice: use the cloud version for convenience or self-host for full control and zero recurring costs. This lesson walks you through both setups so you can make an informed decision.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will have n8n up and running — either in the cloud or on your own server — ready to build powerful workflows.",
          description: "After this lesson you will have a working n8n instance, understand the difference between cloud and self-hosted, and know which option to recommend to clients."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "n8n is the only major automation tool that offers true self-hosting. This means you own your data, face no operation limits, and pay zero monthly fees.",
          real_example: "A startup self-hosted n8n on a $5/month server and ran over 100,000 automations per month. The same volume on Make.com would have cost $300+/month. Self-hosting saved them $3,500 per year."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Self-Hosting",
          explanation: "Self-hosting means running the software on your own computer or rented server instead of using the company's cloud version. You get full control over the data and no usage limits.",
          analogy: "Cloud is like renting an apartment — easy to move in but you follow the landlord's rules. Self-hosting is like owning a house — more setup, but you control everything and there is no monthly rent to the platform."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Healthcare companies", use: "Self-host n8n to ensure patient data never leaves their own servers — required by HIPAA compliance." },
            { company: "High-volume e-commerce", use: "Self-hosted n8n processes thousands of orders per hour without worrying about operation limits." },
            { company: "Freelancers and beginners", use: "Use n8n Cloud to get started in minutes without any server management knowledge." },
            { company: "Agencies", use: "Self-host one n8n instance and manage automations for 10+ clients from a single dashboard — massive cost savings." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "Decision: cloud or self-hosted?",
          steps: [
            "Cloud: sign up at n8n.io → complete onboarding → start building workflows immediately.",
            "Self-hosted: get a server (or use Docker on your laptop) → install n8n → configure access → start building.",
            "For this course: use n8n Cloud to avoid setup friction. You can migrate to self-hosted later.",
            "For client work: recommend self-hosted for high volume or data-sensitive industries."
          ],
          output: "A running n8n instance (cloud or self-hosted) ready for workflow creation."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "n8n Cloud", action: "Go to n8n.io/cloud and sign up for the free trial. Complete the onboarding wizard." },
            { tool: "Docker (optional, self-hosted)", action: "If you want to self-host: install Docker Desktop from docker.com. Run: docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n" },
            { tool: "Browser", action: "Open n8n in Chrome or Firefox. Bookmark the URL for quick access." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Sign up for n8n Cloud", instruction: "Go to n8n.io, click 'Get Started Free'. Create your account with email or Google. Complete the welcome wizard — choose your experience level and use case.", tip: "The free trial includes all features. No credit card needed to start." },
            { title: "Explore the n8n dashboard", instruction: "After login, you will see the main dashboard with: Workflows (your automations), Credentials (connected apps), Executions (run history). Click each section to explore.", tip: "n8n calls automations 'Workflows' — same concept as Make.com's 'Scenarios'." },
            { title: "Create your first empty workflow", instruction: "Click 'New Workflow'. You will see a canvas with a Start node already placed. This is your trigger point.", tip: "The canvas in n8n works similarly to Make.com but uses rectangular nodes instead of round modules." },
            { title: "Explore the node library", instruction: "Click the plus button on the canvas. Browse the node categories: Core, Actions, Triggers. Search for 'Google Sheets' and 'Slack' to see what is available.", tip: "n8n has 400+ integrations. The search bar is the fastest way to find what you need." },
            { title: "(Optional) Self-hosted setup", instruction: "If you want to try self-hosting: open a terminal and run 'docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n'. Then open http://localhost:5678 in your browser.", tip: "The -v flag creates a persistent volume so your workflows survive container restarts." },
            { title: "Connect Google Sheets", instruction: "In n8n, go to Credentials → New Credential → Google Sheets OAuth2. Follow the prompts to connect your Google account.", tip: "n8n uses OAuth2 for Google connections. Allow all requested permissions." },
            { title: "Verify everything works", instruction: "Create a workflow with one Google Sheets node. Select 'Read Rows' and pick your test sheet. Click 'Test step'. Verify data loads correctly.", tip: "If you see your sheet data in the output panel, n8n is fully configured and ready." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Log in to n8n.", expected: "Dashboard loads with Workflows, Credentials, and Executions sections visible." },
            { test: "Create a new workflow.", expected: "Canvas opens with a Start node." },
            { test: "Search for Google Sheets in the node library.", expected: "Google Sheets node appears with options like Read Rows, Append Row, Update Row." },
            { test: "Test a Google Sheets Read Rows node.", expected: "Your test sheet data appears in the output panel." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Skipping the credential setup and trying to build workflows first.", fix: "Connect your key services (Google, Slack) in the Credentials section before building. It saves time during workflow creation." },
            { mistake: "Self-hosting without persistent storage.", fix: "Always use the -v volume flag with Docker. Without it, restarting the container deletes all your workflows." },
            { mistake: "Using an outdated Docker image.", fix: "Always pull the latest image: docker pull n8nio/n8n before running. Older versions may have bugs." },
            { mistake: "Not bookmarking the n8n URL.", fix: "Bookmark your n8n instance URL immediately. Cloud: your-name.app.n8n.cloud. Self-hosted: localhost:5678." },
            { mistake: "Choosing self-hosted when cloud is more practical for learning.", fix: "Use Cloud while learning. Self-hosting is great for production but adds server management overhead during a course." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "If using Cloud, explore the Admin panel to see user management and execution history.",
            "If self-hosting, set up HTTPS using a reverse proxy (nginx or Caddy) for secure access.",
            "Install the n8n community nodes package to access additional integrations built by the community."
          ],
          challenge: "Set up n8n both ways — Cloud AND a local Docker instance. Compare the experience and decide which you prefer for different use cases."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Take a screenshot of your n8n dashboard showing at least one workflow and one credential. Add it to your Automation Journal.",
          deliverable: "A screenshot saved in your journal confirming n8n is set up and working.",
          time: "5 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "n8n Server Setup — install and configure self-hosted n8n for clients who want full data control.",
          price_range: "$300 – $1,000 per setup",
          pitch: "Businesses that care about data privacy (healthcare, finance, legal) want self-hosted solutions. Offer n8n server setup with Docker, HTTPS, backups, and a 30-minute training session. Charge setup plus $100/month for server maintenance."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "n8n offers Cloud (easy, managed) and Self-Hosted (free, full control) — both are production-ready.",
            "Cloud is best for learning and small projects. Self-hosted is best for high volume or data-sensitive work.",
            "n8n calls automations 'Workflows' and steps 'Nodes'.",
            "Always set up credentials (Google, Slack, etc.) before building workflows.",
            "Self-hosted n8n with Docker needs a persistent volume to keep data between restarts."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the main advantage of self-hosting n8n?", options: ["It looks different", "You get full data control and no operation limits", "It has more integrations", "It runs faster"], correct: 1, explanation: "Self-hosting n8n gives you complete control over your data, no monthly platform fees, and unlimited operations." },
            { question: "What is a 'Node' in n8n?", options: ["A server computer", "A single step in a workflow that performs one operation", "A type of JavaScript framework", "A security certificate"], correct: 1, explanation: "In n8n, a Node is a single step in your workflow — similar to a Module in Make.com. Each Node connects to one app and does one thing." },
            { question: "Which Docker flag ensures n8n data persists between restarts?", options: ["-p (port mapping)", "-it (interactive mode)", "-v (volume)", "--rm (auto-remove)"], correct: 2, explanation: "The -v flag mounts a Docker volume for persistent storage. Without it, restarting the container wipes all workflows and credentials." }
          ]
        })
      ]
    },

    /* ── L2: Your First n8n Workflow ── */
    {
      title: "Your First n8n Workflow",
      slug: "first-n8n-workflow",
      goal: "Build a complete n8n workflow from scratch and see how it compares to Make.com.",
      summary: "This lesson walks you through building a real workflow in n8n: Google Sheets trigger → data processing → Slack notification. You will experience n8n's interface and understand its strengths.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will build your first n8n workflow — a real automation that watches a spreadsheet and sends Slack alerts.",
          description: "By the end of this lesson you will have a working n8n workflow and a clear sense of how n8n compares to Make.com for building automations."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Knowing both Make.com and n8n doubles your marketability. Some clients prefer one, some prefer the other. You can serve both.",
          real_example: "A freelancer who knew both platforms won a $3,000 project because the client specifically wanted n8n for data privacy. Competitors who only knew Make.com could not bid."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "n8n Workflow",
          explanation: "An n8n workflow is a series of connected nodes that process data from a trigger to one or more actions — the same concept as a Make.com scenario, just with different terminology and interface.",
          analogy: "If Make.com scenarios are recipes on index cards, n8n workflows are recipes in a digital cookbook. Different format, same concept — ingredients (data) go in, a meal (result) comes out."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Development teams", use: "n8n workflows monitor GitHub repos and post deployment notifications to Slack with commit details." },
            { company: "Data teams", use: "n8n reads CSV uploads from Google Drive, processes the data, and writes clean results to a database." },
            { company: "Marketing agencies", use: "n8n watches social media mentions and logs them in a Google Sheet for daily review." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A Google Sheet with new entries (Name, Email, Source)",
          steps: [
            "Trigger: n8n polls Google Sheets for new rows.",
            "Process: Format a notification message with the row data.",
            "Action: Send the formatted message to a Slack channel.",
            "Log: Update the Google Sheet row to mark it as 'Notified'."
          ],
          output: "Every new sheet entry triggers a Slack message and gets marked as processed — fully automatic."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "n8n", action: "Log in to your n8n instance and click 'New Workflow'." },
            { tool: "Google Sheets", action: "Create a sheet called 'n8n Test' with columns: Name, Email, Source, Notified (leave blank initially)." },
            { tool: "Slack", action: "Have your #automation-tests channel ready." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the Google Sheet", instruction: "Make a sheet called 'n8n Test'. Columns: Name, Email, Source, Notified. Add 2 sample rows: 'Bob Smith', 'bob@example.com', 'Website', '' and 'Carol Lee', 'carol@example.com', 'Referral', ''.", tip: "Leave the Notified column empty — n8n will fill it in." },
            { title: "Start a new n8n workflow", instruction: "In n8n, click 'New Workflow'. Rename it to 'Sheet to Slack Test' by clicking the workflow name at the top.", tip: "Name your workflows immediately. 'My Workflow 1' tells you nothing later." },
            { title: "Add the Google Sheets Trigger node", instruction: "Click the plus button. Search 'Google Sheets Trigger'. Add it. Select your credentials. Set it to trigger on 'Row Added'. Select your 'n8n Test' spreadsheet and Sheet1.", tip: "In n8n, trigger nodes have a lightning bolt icon. Regular nodes do not." },
            { title: "Add a Slack node", instruction: "Click the plus button on the Google Sheets Trigger output. Search 'Slack'. Select 'Send a Message'. Connect your Slack credentials. Set Channel to #automation-tests.", tip: "n8n shows you available fields from the previous node — click the expression editor to insert dynamic data." },
            { title: "Configure the Slack message", instruction: "In the Message field, click the expression editor (the small icon). Type: 'New entry: {{ $json.Name }} ({{ $json.Email }}) from {{ $json.Source }}'. Close the editor.", tip: "In n8n, dynamic data uses {{ $json.fieldName }} syntax — different from Make.com's variable pills." },
            { title: "Add a Google Sheets Update node", instruction: "After the Slack node, add another Google Sheets node. Set operation to 'Update Row'. Select the same sheet. Map the row number from the trigger. Set the Notified column to 'Yes'.", tip: "Updating the row prevents re-processing. The trigger node remembers which rows it has already seen." },
            { title: "Test the workflow", instruction: "Click 'Test Workflow' at the top. Then add a new row to your Google Sheet. Return to n8n and check the execution results.", tip: "n8n shows the data flowing through each node in the right panel — extremely helpful for debugging." },
            { title: "Activate the workflow", instruction: "Click the toggle switch at the top-right to activate the workflow. It will now run automatically on the polling schedule.", tip: "Active workflows show as green in the workflow list." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a new row to the Google Sheet.", expected: "n8n detects the new row on the next poll." },
            { test: "Check the Slack channel.", expected: "A message with the name, email, and source from the new row." },
            { test: "Check the Notified column in the sheet.", expected: "The processed row now shows 'Yes' in the Notified column." },
            { test: "Check the n8n execution log.", expected: "A successful execution showing data flowing through all three nodes." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Using the wrong expression syntax: {{Name}} instead of {{ $json.Name }}.", fix: "n8n uses {{ $json.fieldName }} for accessing data from previous nodes. Always include $json." },
            { mistake: "Forgetting to select credentials for each node.", fix: "Every node that connects to an external service needs credentials selected. Check each node before testing." },
            { mistake: "Not activating the workflow after testing.", fix: "Clicking 'Test Workflow' runs it once. To run it automatically, toggle the Active switch." },
            { mistake: "Trigger node set to wrong event type.", fix: "Make sure 'Row Added' is selected (not 'Row Updated'). The wrong trigger type captures the wrong events." },
            { mistake: "Expression editor not opening or syntax errors.", fix: "Click the small expression icon next to the field. Make sure expressions are wrapped in {{ }}. Check for typos in field names." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 'Set' node between the trigger and Slack to format and transform the data before sending.",
            "Add a second Slack message to a different channel based on the Source value.",
            "Replace the Google Sheets Trigger with a Webhook trigger for instant (not polled) execution."
          ],
          challenge: "Build the same workflow in Make.com side by side. Compare: which was faster to build? Which has a better debugging experience? Write your comparison in your journal."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Change the Slack message format to include a timestamp and a custom emoji based on the Source value (Website = link emoji, Referral = handshake emoji).",
          deliverable: "An updated Slack message with dynamic emoji and timestamp.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "n8n Workflow Development — build custom workflows for clients who prefer n8n over Make.com.",
          price_range: "$200 – $600 per workflow",
          pitch: "Position yourself as an n8n specialist. Many tech-savvy clients prefer n8n for its open-source nature and self-hosting capability. Charge per workflow and offer a maintenance package."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "n8n uses Nodes (steps) and Workflows (automations) — similar to Make.com's Modules and Scenarios.",
            "Dynamic data syntax in n8n: {{ $json.fieldName }} — different from Make.com's visual variable pills.",
            "Trigger nodes have a lightning bolt icon. Action nodes do not.",
            "Test Workflow runs once. Toggle Active ON for continuous automatic execution.",
            "n8n shows data flowing through each node — use the right panel to debug."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What is the correct syntax to access a 'Name' field from the previous node in n8n?", options: ["{{Name}}", "{{ $json.Name }}", "${Name}", "data.Name"], correct: 1, explanation: "In n8n, you access data from previous nodes using {{ $json.fieldName }}. The $json object contains all fields from the previous node's output." },
            { question: "How do you make an n8n workflow run automatically?", options: ["Click Test Workflow repeatedly", "Toggle the Active switch on", "Set a cron job on your server", "It runs automatically by default"], correct: 1, explanation: "Toggling the Active switch turns the workflow on for automatic execution. Without it, the workflow only runs when you manually click Test Workflow." }
          ]
        })
      ]
    },

    /* ── L3: IF Nodes and Switch Nodes ── */
    {
      title: "IF Nodes and Switch Nodes",
      slug: "n8n-if-switch",
      goal: "Add conditional logic to n8n workflows using IF and Switch nodes for intelligent data routing.",
      summary: "This lesson teaches you n8n's conditional logic tools. The IF node handles simple yes/no decisions. The Switch node handles multiple conditions. Together, they let you build workflows that think.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "Your n8n workflows will make smart decisions — routing data to different paths based on any condition you set.",
          description: "After this lesson you will use IF nodes for binary decisions and Switch nodes for multi-path routing, handling real-world complexity automatically."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Without conditional nodes, every item gets the same treatment. With them, your workflows handle VIP customers, urgent tickets, and edge cases correctly.",
          real_example: "A marketing team used n8n Switch nodes to route incoming leads by channel: Google Ads leads got a phone call workflow, organic leads got an email sequence, and referral leads got a personal thank-you message. Each channel's conversion improved by 20+ percent."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "IF Node vs Switch Node",
          explanation: "An IF node checks one condition and splits data into two paths: True or False. A Switch node checks multiple conditions and splits data into many paths — like a multi-way fork in the road.",
          analogy: "An IF node is like a coin flip: heads or tails, two outcomes. A Switch node is like a sorting hat: it looks at the data and sends it to one of many possible destinations."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "E-commerce", use: "IF node: order total over $100? True → apply discount code. False → send standard confirmation." },
            { company: "Customer support", use: "Switch node: ticket category is Billing → finance team. Technical → engineering. Sales → sales reps. Other → general inbox." },
            { company: "HR", use: "IF node: applicant has 5+ years experience? True → senior track. False → junior track." },
            { company: "Content management", use: "Switch node: content type is Blog → WordPress. Video → YouTube. Podcast → Spotify. Social → Buffer." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "An order from Google Sheets with columns: Customer, Email, Total, Country",
          steps: [
            "Trigger: new row in the Orders sheet.",
            "IF node: is Total greater than 100?",
            "True path: send VIP thank-you email with discount code.",
            "False path: send standard thank-you email.",
            "After both paths: Switch node on Country to route order to the correct fulfillment Slack channel."
          ],
          output: "Each order gets personalized treatment based on value AND gets routed to the right regional team."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create an 'Orders' sheet with columns: Customer, Email, Total, Country (US/UK/EU)." },
            { tool: "n8n", action: "Create a new workflow called 'Order Router'." },
            { tool: "Slack", action: "Create channels: #orders-us, #orders-uk, #orders-eu." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Prepare test data", instruction: "In the Orders sheet, add 4 rows: a $150 US order, a $50 UK order, a $200 EU order, and a $30 US order.", tip: "Cover different combinations: high/low value × different countries." },
            { title: "Add the Google Sheets Trigger", instruction: "In n8n, add a Google Sheets Trigger node. Set it to trigger on 'Row Added'. Select the Orders sheet.", tip: "Test it with one row first to verify the data structure." },
            { title: "Add an IF node", instruction: "After the trigger, add an IF node. Set condition: Value 1 = {{ $json.Total }}, Operation = 'Greater than', Value 2 = 100.", tip: "The IF node has two outputs: True (green) and False (red). Each leads to a different path." },
            { title: "Configure the True path (VIP)", instruction: "On the True output, add a Gmail node. Subject: 'Thank you for your VIP order, {{ $json.Customer }}!' Body: 'As a valued customer, here is your 10% discount code: VIP10SAVE.'", tip: "The True path only receives orders over $100." },
            { title: "Configure the False path (Standard)", instruction: "On the False output, add a Gmail node. Subject: 'Thanks for your order, {{ $json.Customer }}!' Body: 'Your order has been received and is being processed.'", tip: "Standard customers get a simpler email without the discount code." },
            { title: "Add a Merge node", instruction: "After both Gmail nodes, add a Merge node to bring both paths back together. This lets you add a Switch node that processes all orders regardless of their value.", tip: "Merge combines branched paths back into one. Set mode to 'Append' to keep all items." },
            { title: "Add a Switch node for Country", instruction: "After the Merge, add a Switch node. Add three rules: Rule 1: Country equals 'US'. Rule 2: Country equals 'UK'. Rule 3: Country equals 'EU'. Each rule creates a separate output.", tip: "The Switch node replaces the need for multiple IF nodes in sequence." },
            { title: "Connect Slack nodes to each Switch output", instruction: "On each Switch output, add a Slack node sending to the corresponding channel: #orders-us, #orders-uk, #orders-eu. Message: 'New order: {{ $json.Customer }} — ${{ $json.Total }}'.", tip: "Test all paths to confirm each country routes correctly." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Add a $150 US order.", expected: "VIP email sent + message in #orders-us." },
            { test: "Add a $50 UK order.", expected: "Standard email sent + message in #orders-uk." },
            { test: "Add a $200 EU order.", expected: "VIP email sent + message in #orders-eu." },
            { test: "Check execution in n8n.", expected: "Data flow shows correct branching through IF and Switch nodes." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Comparing a string to a number in the IF node.", fix: "Make sure Total is treated as a number. Use {{ Number($json.Total) }} if the sheet stores it as text." },
            { mistake: "Switch node rules overlap — data matches multiple rules.", fix: "Make Switch rules mutually exclusive. If using 'Contains', be careful about partial matches." },
            { mistake: "Forgetting the Merge node before the Switch.", fix: "Without Merge, only one branch of data reaches the Switch. Both paths need to converge first." },
            { mistake: "Not adding a Fallback output on the Switch node.", fix: "Enable the 'Fallback' output for data that matches no rule. Otherwise, unmatched data is silently dropped." },
            { mistake: "Using IF chains instead of a single Switch node.", fix: "If you need 3+ branches based on the same field, use a Switch node. It is cleaner and easier to maintain than nested IF nodes." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a second IF node inside the VIP path: if Total > $500, add them to a 'Platinum' list.",
            "Add a date-based condition: if the order is placed on a weekend, add a special note to the Slack message.",
            "Use the Switch node's fallback output to send unknown-country orders to a #orders-review channel."
          ],
          challenge: "Build a customer segmentation workflow with nested logic: IF (is existing customer) → Switch (by purchase tier: Bronze/Silver/Gold) → different Slack channels and email templates for each tier."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add a fourth Switch rule for 'AU' (Australia) that sends to a new #orders-au Slack channel.",
          deliverable: "An updated Switch node with four country rules, tested with an Australian order.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Order Processing Automation — build n8n workflows that automatically sort, notify, and route orders based on value and region.",
          price_range: "$500 – $1,500 per workflow",
          pitch: "E-commerce businesses process hundreds of orders daily. Offer a smart routing workflow that sorts orders by value (VIP vs standard), region (local vs international), and product category — each going to the right team instantly."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "IF nodes handle yes/no decisions — one condition, two outputs (True/False).",
            "Switch nodes handle multi-way decisions — multiple conditions, many outputs.",
            "Use Merge nodes to bring branched paths back together.",
            "Always enable the Fallback output on Switch nodes to catch unmatched data.",
            "Convert data types before comparing — numbers and strings are not the same."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "When should you use a Switch node instead of an IF node?", options: ["When you only have two options", "When you need to split data into three or more paths based on conditions", "When the data is numeric", "When you want to merge paths"], correct: 1, explanation: "Switch nodes are ideal when you need three or more branches. IF nodes handle binary (yes/no) decisions." },
            { question: "What does the Fallback output on a Switch node do?", options: ["Shuts down the workflow", "Catches data that does not match any of the defined rules", "Resets the data to defaults", "Sends data back to the trigger"], correct: 1, explanation: "The Fallback output catches any data items that do not match any of the Switch node's rules — preventing silent data loss." }
          ]
        })
      ]
    },

    /* ── L4: HTTP Requests in n8n ── */
    {
      title: "HTTP Requests in n8n",
      slug: "n8n-http-requests",
      goal: "Connect n8n to any app in the world using HTTP requests — even apps without a built-in node.",
      summary: "The HTTP Request node is n8n's most powerful tool. It lets you talk to any API, pull data from any website, and connect to services that have no official n8n node. This lesson teaches you to use it confidently.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will connect n8n to any API using HTTP requests — unlocking thousands of services beyond the built-in integrations.",
          description: "After this lesson you can call any REST API from n8n, send and receive JSON data, and handle authentication — the skill that makes you an advanced automation builder."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "The HTTP Request node removes all limitations. If a service has an API, you can automate it with n8n — even without a pre-built node.",
          real_example: "A developer used n8n's HTTP Request node to connect to a niche inventory management API that had no built-in integration. The client was thrilled because no other automation freelancer could do it."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "HTTP Request",
          explanation: "An HTTP request is how computers talk to each other over the internet. When you type a URL in your browser, you are making an HTTP request. The HTTP Request node in n8n lets your workflow do the same thing — ask a server for data or send data to it.",
          analogy: "An HTTP request is like ordering food at a restaurant. You send your order (the request), the kitchen prepares it (the server processes it), and the waiter brings your meal (the response). Your workflow is the customer, the API is the restaurant."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Weather notifications", use: "HTTP request to OpenWeatherMap API every morning → send a weather summary to Slack." },
            { company: "Crypto tracking", use: "HTTP request to CoinGecko API every hour → log Bitcoin price to Google Sheets → alert if price drops 5%." },
            { company: "Competitor monitoring", use: "HTTP request to a competitor's public API → compare pricing changes → email alert to the sales team." },
            { company: "Custom CRMs", use: "HTTP request to a company's internal API to create, read, or update customer records from n8n." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "A scheduled trigger (every day at 8 AM)",
          steps: [
            "Trigger fires at 8 AM.",
            "HTTP Request node calls the OpenWeatherMap API with your city and API key.",
            "n8n receives the JSON response with temperature, conditions, and forecast.",
            "A Set node extracts the key fields (temperature, description).",
            "A Slack node posts: 'Good morning! Today's weather: 72°F, Partly Cloudy.'"
          ],
          output: "A daily weather notification in Slack, pulled from a live API — zero manual effort."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "OpenWeatherMap", action: "Sign up at openweathermap.org/api. Get a free API key from your account dashboard." },
            { tool: "n8n", action: "Create a new workflow called 'Daily Weather Bot'." },
            { tool: "Slack", action: "Use #automation-tests for the weather messages." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Get your API key", instruction: "Sign up at openweathermap.org. Go to API Keys in your account. Copy your default key. It may take a few hours to activate after signup.", tip: "The free tier allows 60 calls per minute — more than enough for daily use." },
            { title: "Create the workflow", instruction: "In n8n, create a new workflow. Add a Schedule Trigger node. Set it to run every day at 8:00 AM.", tip: "For testing, set it to run every 5 minutes. Switch to daily after confirming it works." },
            { title: "Add an HTTP Request node", instruction: "After the trigger, add an HTTP Request node. Set Method to GET. URL: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric", tip: "Replace 'London' with your city and 'YOUR_API_KEY' with your actual key. Use units=metric for Celsius or units=imperial for Fahrenheit." },
            { title: "Test the HTTP request", instruction: "Click 'Test step' on the HTTP Request node. You should see a JSON response with fields like: main.temp, weather[0].description, name.", tip: "If you get a 401 error, your API key is not activated yet. Wait a few hours and try again." },
            { title: "Add a Set node to extract data", instruction: "After the HTTP Request, add a Set node. Add fields: City = {{ $json.name }}, Temperature = {{ $json.main.temp }}, Condition = {{ $json.weather[0].description }}.", tip: "The Set node cleans up the data so the Slack message only uses the fields you need." },
            { title: "Add a Slack node", instruction: "After the Set node, add a Slack node. Channel: #automation-tests. Message: '☀️ Weather update for {{ $json.City }}: {{ $json.Temperature }}°C, {{ $json.Condition }}.'", tip: "You can add more data like humidity ({{ $json.main.humidity }}) or wind speed later." },
            { title: "Test the full workflow", instruction: "Click 'Test Workflow'. Check Slack for the weather message. Verify the city, temperature, and condition are correct.", tip: "If the data looks right in the HTTP response but wrong in Slack, check your Set node field mappings." },
            { title: "Activate", instruction: "Set the Schedule Trigger to daily at 8 AM. Toggle the workflow Active.", tip: "Your team now gets a daily weather update automatically. Fun, useful, and impressive." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Test the HTTP Request node alone.", expected: "JSON response with temperature, weather description, and city name." },
            { test: "Test the full workflow.", expected: "Slack message with correct city, temperature, and condition." },
            { test: "Change the city in the URL and test again.", expected: "Weather data updates to reflect the new city." },
            { test: "Check the execution log.", expected: "All nodes show green with data flowing correctly." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Exposing the API key in shared workflows.", fix: "Store API keys in n8n Credentials (use 'Header Auth' or 'Query Auth' credential type) instead of pasting them in the URL." },
            { mistake: "Wrong HTTP method (POST instead of GET).", fix: "Read the API documentation. Most data-fetching endpoints use GET. Creating or updating data uses POST or PUT." },
            { mistake: "Not handling API errors (500, 404, 429).", fix: "Enable 'Continue On Fail' on the HTTP Request node and add an IF node to check for errors after it." },
            { mistake: "Forgetting the units parameter and getting Kelvin temperatures.", fix: "OpenWeatherMap defaults to Kelvin. Add units=metric or units=imperial to the URL." },
            { mistake: "Trying to access nested JSON without correct path.", fix: "For nested data like weather[0].description, use the exact JSON path: {{ $json.weather[0].description }}." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a 5-day forecast by using the /forecast endpoint instead of /weather.",
            "Add an IF node: if temperature is below 5°C, add a 'Bundle up!' warning to the message.",
            "Call multiple APIs in parallel: weather + news headlines + crypto prices → combined morning briefing."
          ],
          challenge: "Connect to the JSONPlaceholder API (jsonplaceholder.typicode.com) and build a workflow that fetches posts, filters for ones with specific keywords, and logs matches to Google Sheets."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add humidity and wind speed to your weather Slack message. Update the Set node and Slack message format.",
          deliverable: "A Slack weather message showing temperature, condition, humidity, and wind speed.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Custom API Integration — connect a client's niche software to their automation stack using HTTP requests.",
          price_range: "$400 – $2,000 per integration",
          pitch: "When a client uses software without a built-in integration, you are the person who can still connect it. Custom API integrations command premium prices because few automation freelancers know how to do them."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "The HTTP Request node connects n8n to any service with an API — no built-in node needed.",
            "GET requests fetch data. POST requests send data. PUT/PATCH update data. DELETE removes data.",
            "Always store API keys in Credentials, not hard-coded in URLs.",
            "Use the Set node to extract and rename fields from complex API responses.",
            "Enable 'Continue On Fail' to handle API errors gracefully instead of crashing the workflow."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What HTTP method do you use to fetch data from an API?", options: ["POST", "DELETE", "GET", "PATCH"], correct: 2, explanation: "GET is used to fetch/read data from an API. POST is for sending/creating data, and DELETE is for removing data." },
            { question: "Where should you store API keys in n8n?", options: ["In the URL of the HTTP Request node", "In a Set node", "In the n8n Credentials manager", "In a Google Sheet"], correct: 2, explanation: "The n8n Credentials manager securely stores API keys and tokens. Hard-coding them in URLs is a security risk, especially in shared workflows." }
          ]
        })
      ]
    },

    /* ── L5: Merge and Split Data ── */
    {
      title: "Merge and Split Data",
      slug: "n8n-merge-split",
      goal: "Combine data from multiple sources and split large datasets into manageable pieces using n8n.",
      summary: "Real-world automations rarely use a single data source. This lesson teaches you to merge data from multiple inputs, split arrays into individual items, and aggregate results — essential skills for complex workflows.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will merge data from different apps and split complex datasets into individual items for processing.",
          description: "After this lesson you can pull data from Google Sheets and an API, merge them, process each item individually, and aggregate the results — all in one workflow."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Most useful automations involve multiple data sources. Without merge and split skills, you are limited to single-source workflows.",
          real_example: "A data analyst used n8n to merge customer data from Salesforce with order data from Shopify, matched by email. The combined dataset went into a Google Sheet for analysis — saving 4 hours of manual VLOOKUP work per week."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Merge and Split",
          explanation: "Merge combines data from two or more sources into one stream. Split takes a group of items (like an array) and breaks it into individual items so you can process each one separately.",
          analogy: "Merge is like shuffling two decks of cards together. Split is like dealing a deck out — each player gets one card at a time. In automation, you often shuffle sources together and then deal the results out for processing."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Sales teams", use: "Merge CRM leads with marketing email engagement data to identify the hottest prospects." },
            { company: "Inventory management", use: "Merge product data from two suppliers into one unified spreadsheet, deduplicating by SKU." },
            { company: "Reporting", use: "Split a monthly report with 500 line items into individual records, process each, then aggregate into a summary." },
            { company: "Multi-platform publishing", use: "Split a content brief into individual sections and send each to a different writer via email." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "Two Google Sheets: 'Customers' (Name, Email) and 'Orders' (Email, Product, Amount)",
          steps: [
            "Read all rows from the Customers sheet.",
            "Read all rows from the Orders sheet.",
            "Merge both datasets on the Email field (like a VLOOKUP or SQL JOIN).",
            "The merged result contains: Name, Email, Product, Amount — one complete view."
          ],
          output: "A unified dataset combining customer info with their order history, ready for analysis or reporting."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Create two sheets: 'Customers' (Name, Email) and 'Orders' (Email, Product, Amount). Add 5 customers and 8 orders (some customers with multiple orders)." },
            { tool: "n8n", action: "Create a new workflow called 'Merge and Split Demo'." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the test data", instruction: "Customers sheet: Alice (alice@test.com), Bob (bob@test.com), Carol (carol@test.com), Dave (dave@test.com), Eve (eve@test.com). Orders sheet: alice@test.com bought Widget ($50), bob@test.com bought Gadget ($75), alice@test.com bought Gizmo ($30), carol@test.com bought Widget ($50), bob@test.com bought Doohickey ($100).", tip: "Give some customers multiple orders and some customers zero orders to test different merge scenarios." },
            { title: "Add the Manual Trigger", instruction: "In n8n, add a Manual Trigger node. This lets you test without waiting for a schedule.", tip: "Use Manual Trigger during development. Switch to a Schedule Trigger for production." },
            { title: "Add two Google Sheets Read nodes", instruction: "Add two Google Sheets nodes in parallel (both connected to the Manual Trigger). Node 1 reads the Customers sheet. Node 2 reads the Orders sheet.", tip: "In n8n, you can connect one trigger to multiple nodes — they run in parallel." },
            { title: "Add a Merge node", instruction: "After both Google Sheets nodes, add a Merge node. Set Mode to 'Combine' and Combine By to 'Matching Fields'. Set Field 1 (from Customers) to 'Email' and Field 2 (from Orders) to 'Email'.", tip: "This creates a JOIN — matching customers with their orders by email address." },
            { title: "Test the merge", instruction: "Click Test Workflow. Check the Merge node output. You should see combined records with Name from Customers and Product/Amount from Orders.", tip: "Customers without orders will not appear (inner join). To include them, change to 'Keep Everything' mode." },
            { title: "Add an Item Lists node to split", instruction: "If any API or data source returns an array field (e.g., a customer with an 'orders' array), add an Item Lists node with 'Split Out Items' operation to convert each array item into a separate data item.", tip: "Split Out Items is essential when an API returns nested arrays that you want to process individually." },
            { title: "Add an aggregation step", instruction: "After processing individual items, add a Summarize node to calculate totals. Group by 'Name' and sum 'Amount' to get total spending per customer.", tip: "The Summarize node is like a GROUP BY in SQL — it aggregates data by a field you choose." },
            { title: "Output to a new sheet", instruction: "After the Summarize node, add a Google Sheets Append Row node pointing to a new 'Customer Summary' sheet. Map: Name, Total Spent.", tip: "This final sheet gives you a clean summary of spending per customer — from two separate data sources." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Test the Merge node output.", expected: "Combined records with Name + Email + Product + Amount for matching rows." },
            { test: "Check that customers with multiple orders appear multiple times.", expected: "Alice should appear twice (Widget + Gizmo) and Bob twice (Gadget + Doohickey)." },
            { test: "Check the Summarize output.", expected: "Each customer shows once with a total: Alice = $80, Bob = $175, Carol = $50." },
            { test: "Check the Customer Summary sheet.", expected: "Three rows with correct names and total spending." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Merge field names do not match exactly.", fix: "Field names are case-sensitive. 'email' and 'Email' are different. Standardize column headers before merging." },
            { mistake: "Using Append mode instead of Combine on the Merge node.", fix: "Append stacks data end-to-end (like UNION). Combine matches records by a field (like JOIN). Choose the right mode for your use case." },
            { mistake: "Not handling customers with zero orders.", fix: "By default, Merge only returns matching records (inner join). Switch to 'Keep Everything' to include unmatched records too." },
            { mistake: "Splitting data that does not need splitting.", fix: "Only use Split Out Items when a field contains an array. Regular single-value fields do not need splitting." },
            { mistake: "Summarize node groups by wrong field.", fix: "Double-check the Group By field. If you group by Email instead of Name, customers with the same name but different emails are separate." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Merge data from three sources: Customers, Orders, and Support Tickets — creating a complete customer 360 view.",
            "Add a filter after the merge to only keep customers with total spending above $100.",
            "Schedule the workflow daily and compare the new Customer Summary with the previous day to flag changes."
          ],
          challenge: "Build a workflow that merges product data from two supplier APIs (using HTTP Request nodes), deduplicates by product SKU, and outputs a unified product catalog to Google Sheets."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add an IF node after the Summarize step: if total spending > $100, add the customer to a 'VIP Customers' sheet.",
          deliverable: "A VIP Customers sheet populated only with high-spending customers from the merged dataset.",
          time: "15 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Data Consolidation Automation — merge data from multiple client systems into unified reports.",
          price_range: "$600 – $2,500 per project",
          pitch: "Businesses with data in multiple places (CRM, accounting, spreadsheets) struggle to get a complete picture. Offer a data consolidation workflow that merges everything into one dashboard. This solves a painful, expensive problem."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Merge combines data from multiple sources — like a JOIN in databases.",
            "Split (Item Lists) breaks arrays into individual items for processing.",
            "Summarize aggregates data — grouping and calculating totals, counts, or averages.",
            "Match merge fields carefully — case and spelling must be identical.",
            "Choose the right Merge mode: Combine (JOIN) vs Append (UNION) depending on your goal."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "What does the Merge node's 'Combine' mode do?", options: ["Stacks all data end-to-end", "Matches records from two sources by a shared field (like a JOIN)", "Removes duplicate records", "Splits an array into items"], correct: 1, explanation: "Combine mode matches records from two sources by a shared field — similar to a JOIN in SQL or VLOOKUP in spreadsheets." },
            { question: "When should you use the Item Lists 'Split Out Items' operation?", options: ["When you have too many columns", "When a field contains an array and you want to process each item individually", "When you want to merge data", "When you need to delete rows"], correct: 1, explanation: "Split Out Items converts each element of an array field into a separate data item, allowing you to process each one through subsequent nodes." }
          ]
        })
      ]
    },

    /* ── L6: Slack Notification Bot ── */
    {
      title: "Slack Notification Bot",
      slug: "n8n-slack-bot",
      goal: "Build a full-featured Slack bot that monitors events and sends rich notifications to your team.",
      summary: "This capstone lesson for Module 3 combines everything you have learned about n8n. You will build a Slack bot that monitors multiple sources, formats rich messages, and routes notifications to the right channels.",
      sections: [
        sec("AA-01_TODAYS_WIN", {
          headline: "You will build a professional Slack notification bot that your team will actually use every day.",
          description: "By the end of this lesson you will have an n8n-powered bot that watches Google Sheets, checks an API, and sends beautifully formatted Slack notifications with buttons and alerts."
        }),
        sec("AA-02_WHY_CARE", {
          benefit: "Slack bots are one of the most requested automations in modern workplaces. Teams live in Slack and want everything to come to them.",
          real_example: "A project manager built an n8n Slack bot that posted daily standup summaries, flagged overdue tasks, and sent weekly metrics — all in formatted Slack messages. The team rated it their most useful productivity tool."
        }),
        sec("AA-03_SIMPLE_MEANING", {
          term: "Slack Bot (via Automation)",
          explanation: "A Slack bot built with automation is not a chatbot that has conversations. It is a notification system that sends structured messages to Slack channels when specific events happen. Think of it as a silent team member who reports important information.",
          analogy: "It is like having a personal news ticker in your office. Instead of checking five different apps for updates, the bot brings all the important updates to one place — your Slack channel."
        }),
        sec("AA-04_WHERE_USED", {
          examples: [
            { company: "Sales teams", use: "Bot posts in #sales every time a deal closes in the CRM — team celebrates wins in real time." },
            { company: "Engineering teams", use: "Bot alerts #on-call when server response time exceeds 2 seconds — issues caught in minutes instead of hours." },
            { company: "Customer success", use: "Bot posts in #churn-risk when a customer has not logged in for 14 days — proactive outreach prevents cancellations." },
            { company: "Marketing", use: "Bot sends weekly campaign performance stats to #marketing every Monday — no manual reporting." }
          ]
        }),
        sec("AA-05_FLOW", {
          input: "Multiple sources: Google Sheet (tasks), HTTP API (weather), Schedule (daily at 9 AM)",
          steps: [
            "Daily trigger fires at 9 AM.",
            "Branch 1: Read pending tasks from Google Sheets → format task list.",
            "Branch 2: HTTP Request to weather API → extract temperature and conditions.",
            "Merge: Combine task list and weather into one rich Slack message.",
            "Send: Post the formatted daily briefing to #daily-standup channel."
          ],
          output: "A daily Slack message combining pending tasks and weather — a personal morning briefing for your team."
        }),
        sec("AA-06_TOOL_SETUP", {
          items: [
            { tool: "Google Sheets", action: "Use your existing 'Daily Tasks' sheet with Task, Assignee, Status, Due Date columns." },
            { tool: "n8n", action: "Create a new workflow called 'Daily Slack Briefing Bot'." },
            { tool: "Slack", action: "Create a #daily-standup channel." },
            { tool: "OpenWeatherMap", action: "Have your API key ready from the HTTP Requests lesson." }
          ]
        }),
        sec("AA-07_BUILD_STEPS", {
          steps: [
            { title: "Create the scheduled trigger", instruction: "In n8n, add a Schedule Trigger node. Set it to run every weekday at 9:00 AM. Set your timezone.", tip: "Weekday-only prevents unnecessary weekend messages. Respect your team's time off." },
            { title: "Add the Tasks branch", instruction: "Connect a Google Sheets node to the trigger. Read all rows from the Daily Tasks sheet. Add an IF node: filter for Status = 'Pending'.", tip: "Only include pending tasks — completed ones should not appear in the daily briefing." },
            { title: "Format the task list", instruction: "After the IF node (True output), add a Code node. Write: return items.map(item => ({ json: { text: '• ' + item.json.Task + ' (assigned to ' + item.json.Assignee + ', due ' + item.json['Due Date'] + ')' } }));", tip: "The Code node gives you full JavaScript power for formatting. Use it when visual nodes feel limiting." },
            { title: "Aggregate tasks into one message", instruction: "After the Code node, add a Summarize node or another Code node that joins all task lines into a single string with newlines between them.", tip: "You want one Slack message with all tasks, not one message per task." },
            { title: "Add the Weather branch", instruction: "Connect a second branch from the trigger to an HTTP Request node. Use the OpenWeatherMap URL from the previous lesson.", tip: "Both branches run in parallel from the same trigger — tasks and weather are fetched simultaneously." },
            { title: "Add a Set node for weather data", instruction: "After the HTTP Request, add a Set node. Extract: City = {{ $json.name }}, Temperature = {{ $json.main.temp }}, Condition = {{ $json.weather[0].description }}.", tip: "Clean data before merging it into the final message." },
            { title: "Merge both branches", instruction: "Add a Merge node that takes the aggregated tasks string and the weather data. Use 'Combine' mode to put them together.", tip: "If field matching does not work well here, use 'Append' mode and combine them in the Slack message template." },
            { title: "Build the Slack message", instruction: "Add a Slack node. Channel: #daily-standup. Use Block Kit for rich formatting. Message: '📋 *Daily Briefing — {{ $now.format(\"MMM DD, YYYY\") }}*\\n\\n*Weather:* {{ $json.Temperature }}°C, {{ $json.Condition }} in {{ $json.City }}\\n\\n*Pending Tasks:*\\n{{ $json.taskList }}\\n\\nHave a productive day!'", tip: "Block Kit lets you add bold text, emojis, and sections. Check Slack's Block Kit Builder for advanced formatting." },
            { title: "Test and activate", instruction: "Click Test Workflow. Verify the message appears in #daily-standup with weather and task data. Then activate the workflow.", tip: "Run a few tests with different task combinations to make sure the formatting looks good." }
          ]
        }),
        sec("AA-08_TEST", {
          checks: [
            { test: "Run the workflow manually.", expected: "A formatted Slack message appears in #daily-standup." },
            { test: "Verify the task list.", expected: "Only pending tasks appear. Completed tasks are excluded." },
            { test: "Verify weather data.", expected: "City, temperature, and condition are accurate and current." },
            { test: "Check formatting.", expected: "Bold headers, bullet points for tasks, and emojis display correctly." },
            { test: "Verify the schedule.", expected: "The workflow is active and scheduled for weekdays at 9 AM." }
          ]
        }),
        sec("AA-09_MISTAKES", {
          mistakes: [
            { mistake: "Sending one Slack message per task instead of one combined message.", fix: "Use an aggregation step (Summarize or Code node) to combine all tasks into a single string before sending to Slack." },
            { mistake: "Weather API fails and the entire workflow stops.", fix: "Enable 'Continue On Fail' on the HTTP Request node. Add a fallback message like 'Weather data unavailable' if the API fails." },
            { mistake: "Slack message is too long and gets truncated.", fix: "Slack truncates messages over 4,000 characters. If you have many tasks, show only the top 10 and add a 'See all tasks' link to the Google Sheet." },
            { mistake: "Timezone mismatch — bot sends messages at the wrong time.", fix: "Set the timezone explicitly in the Schedule Trigger node. Do not rely on the server's default timezone." },
            { mistake: "Not handling the case where there are zero pending tasks.", fix: "Add a check: if no pending tasks, change the message to 'All caught up — no pending tasks today!' instead of an empty task list." }
          ]
        }),
        sec("AA-10_UPGRADE", {
          ideas: [
            "Add a third data source: pull today's calendar events from Google Calendar and include them in the briefing.",
            "Add an interactive button to the Slack message: 'Mark All as Done' that triggers a webhook to update the Google Sheet.",
            "Send a different message tone based on the number of pending tasks: 0 = celebration, 1-5 = normal, 6+ = warning."
          ],
          challenge: "Build a multi-channel bot: #daily-standup gets the full briefing, #weather gets just the weather, and #task-alerts gets only tasks due today — all from one workflow."
        }),
        sec("AA-11_MINI_TASK", {
          task: "Add a task count to the Slack message. Before the task list, add a line: 'You have X pending tasks today.' where X is the actual count.",
          deliverable: "A Slack briefing message that includes the total count of pending tasks above the task list.",
          time: "10 minutes"
        }),
        sec("AA-12_MONEY_ANGLE", {
          service: "Custom Slack Bot Development — build automated notification bots for Slack teams.",
          price_range: "$500 – $2,000 per bot",
          pitch: "Every team on Slack wants a bot that does something useful. Daily standup summaries, deal alerts, customer churn warnings, deployment notifications — these bots save teams hours and are easy to maintain. Charge for setup and offer monthly optimization."
        }),
        sec("AA-13_KEY_NOTES", {
          notes: [
            "Slack bots built with n8n are notification systems, not conversational chatbots.",
            "Combine multiple data sources (sheets, APIs, databases) into a single rich message.",
            "Use Code nodes for complex formatting that visual nodes cannot handle.",
            "Always handle the zero-results case — empty messages look broken.",
            "Use Block Kit for professional Slack formatting with bold text, sections, and emojis."
          ]
        }),
        sec("AA-14_QUICK_QUIZ", {
          questions: [
            { question: "Why should you aggregate tasks into one Slack message instead of sending one message per task?", options: ["To save API calls", "One combined message is easier to read and does not flood the channel with notifications", "Slack requires it", "It is faster to build"], correct: 1, explanation: "Flooding a channel with individual messages for each task is noisy and annoying. One well-formatted summary is professional and easy to scan." },
            { question: "What should you do if the weather API fails during the daily briefing?", options: ["Stop the entire workflow", "Send the briefing without weather data and include a fallback message", "Retry the API 100 times", "Send an error message to the channel"], correct: 1, explanation: "Enable Continue On Fail on the HTTP node and use a fallback message. The briefing should still go out — missing weather is better than no briefing at all." },
            { question: "What does a Code node allow you to do in n8n?", options: ["Only write SQL queries", "Write custom JavaScript to transform and format data in ways visual nodes cannot", "Replace all other nodes", "Only handle errors"], correct: 1, explanation: "The Code node lets you write custom JavaScript for complex data transformation, formatting, and logic that would be difficult or impossible with visual nodes alone." }
          ]
        })
      ]
    }

  ]
}

];

module.exports = { MODULES_0_3 };
