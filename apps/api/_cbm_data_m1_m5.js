// ChatGPT Business & Marketing Mastery — Modules 1–5 seed data
// Covers: Master ChatGPT, Prompt Skills, General Business Toolkit, Offer/Niche/Funnel, Funnel Copy Pages

function sec(type, data) { return { type, data }; }

const MODULES_M1_M5 = [

/* ═══════════════════════════════════════════════════════════════
   MODULE 1 — Master ChatGPT
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Master ChatGPT",
  slug: "m1-master-chatgpt",
  lessons: [

    {
      title: "How to Master ChatGPT",
      slug: "how-to-master-chatgpt",
      goal: "Learn the mindset and habits that separate ChatGPT power users from casual users.",
      summary: "This lesson lays the foundation: treat ChatGPT like a skilled teammate, not a search engine. You will learn how to give clear instructions, iterate quickly, and get outputs you can use in real business tasks.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M1-L1", title: "How to Master ChatGPT", time: "10–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "By the end you will know how to talk to ChatGPT so it gives you useful, actionable answers every time.", real_world: "Professionals who prompt well finish tasks 3–5x faster than those who use vague questions." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Any time you need ideas, drafts, lists, or explanations for business tasks—emails, proposals, competitor research, copy, and more.", tags: ["Daily use", "Foundation", "All roles"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["A clear goal (what you want as output)", "Context (your industry, audience, constraints)", "Format preference (bullet list, paragraph, table, etc.)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Tell me about marketing." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Marketing is the process of promoting and selling products or services. It involves various strategies such as advertising, public relations, digital marketing, content marketing, and more. Companies use marketing to reach their target audience and build brand awareness..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague—ChatGPT has no idea what you need or how to help.", "No context—it cannot tailor the answer to your business.", "No format—you get a generic essay instead of something usable."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I run a small B2B consulting firm. List 5 concrete marketing actions I can do this week to get more clients. Output as a numbered list with one sentence each.", framework_used: "Goal + Context + Format" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. Reach out to 3 past clients and ask for a LinkedIn recommendation or testimonial.\n2. Write and post one LinkedIn article on a problem your ideal client faces and how you solve it.\n3. Join one industry Slack or Facebook group and answer 2 questions helpfully.\n4. Send a short email to 10 warm leads with a free resource or audit offer.\n5. Comment meaningfully on 5 posts from ideal clients or partners." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Role: You are a senior B2B marketing strategist. I run a small consulting firm. List 5 marketing actions I can do this week to get more clients. For each: action, why it works, and how long it takes. Output as a markdown table with columns: Action | Why | Time.", what_changed: "Added role, structured output, and 'why + time' for prioritization." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Quick brainstorm", prompt: "I need 10 headline ideas for a webinar about [TOPIC]. Target audience: [AUDIENCE]. Tone: professional but friendly. Output as a numbered list." },
            { title: "Explainer", prompt: "Explain [CONCEPT] in 3 short paragraphs for a busy executive. Assume they know nothing about it. End with one takeaway." },
            { title: "Draft email", prompt: "Draft a 3-sentence email to [PERSON] about [TOPIC]. Goal: [GOAL]. Tone: [TONE]. Keep it under 75 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "I [CONTEXT/ROLE]. I need [GOAL]. Output as [FORMAT]. Constraints: [CONSTRAINTS if any].", notes: "Always include goal, context, and format." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Open ChatGPT.", "Pick one real task you did this week (email, list, or idea).", "Write a bad prompt (one vague sentence).", "Write a good prompt with goal, context, and format.", "Compare the outputs."], task: "Get 3 usable outputs from ChatGPT in the next 24 hours using the good prompt formula." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Use ChatGPT to draft a real email or message you need to send this week. Iterate until it sounds like you and hits your goal. Send it.", hint: "Add 'Sound like me: [describe your style]' or paste a sample of your writing for tone matching." }),
        sec("CBM-14_CHECKLIST", { items: ["I include a clear goal in every prompt.", "I add context (role, audience, constraints).", "I specify the output format I want.", "I iterate when the first output is not quite right."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["ChatGPT needs goal, context, and format to give useful answers.", "Vague prompts produce vague outputs—specificity wins.", "Treat ChatGPT as a teammate: give clear briefs and iterate."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Talk to ChatGPT like you would brief a skilled colleague: clear goal, context, and format." })
      ]
    },

    {
      title: "Crack How ChatGPT Works",
      slug: "crack-how-chatgpt-works",
      goal: "Understand how ChatGPT processes prompts and generates text so you can prompt more effectively.",
      summary: "Learn the basics of tokenization, context windows, and how ChatGPT predicts the next word. This knowledge helps you avoid common mistakes and get better outputs.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M1-L2", title: "Crack How ChatGPT Works", time: "12–18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will understand how ChatGPT thinks so you can write prompts that align with how it processes language.", real_world: "Users who understand tokens and context write shorter, clearer prompts and get better results." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "When you need longer outputs, precise wording, or you hit length limits. Also useful when debugging why a prompt did not work.", tags: ["Advanced use", "Troubleshooting", "Long content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Understanding of tokens (roughly 4 chars per token in English)", " awareness of context window limits", "Basic idea of how next-word prediction works"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write me a comprehensive 5000 word guide on SEO for beginners with every detail and example and make it super detailed and cover absolutely everything." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(ChatGPT starts well but trails off, repeats, or hits limits. Output feels padded or incomplete.)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Overspecified length—ChatGPT may pad or cut awkwardly.", "Too broad—'everything' gives no structure.", "Single monolithic request—hard to control quality."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write a 500-word SEO guide for beginners. Structure: 1) What SEO is (2 sentences), 2) Three actions to start today, 3) One common mistake to avoid. Use simple language. No filler.", framework_used: "Structure + Length + Tone" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "SEO (Search Engine Optimization) means improving your website so it shows up when people search on Google. The goal is free, relevant traffic.\n\nThree actions to start today:\n1. Use Google Search Console to see how people find you.\n2. Add target keywords to your titles and first paragraph.\n3. Get one quality backlink from a relevant site.\n\nCommon mistake: Stuffing keywords. Write for humans first." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "You are an SEO expert. Write a 500-word beginner SEO guide. Sections: What is SEO (2 sentences max), 3 actions to start today (each 2–3 sentences), 1 mistake to avoid (2 sentences). Tone: direct, no jargon. Output as markdown.", what_changed: "Role, explicit section lengths, markdown for structure." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Chunked long content", prompt: "Write section 1 only of a 5-part guide on [TOPIC]. Section 1 covers [SCOPE]. Max 300 words. I will ask for sections 2–5 next." },
            { title: "Precise length", prompt: "List 7 bullet points on [TOPIC]. Each bullet is 1–2 sentences. Total under 200 words." },
            { title: "Token-aware", prompt: "Summarize this article in 3 sentences. Then add 5 bullet takeaways. Keep total under 150 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Role: [ROLE]. Task: [TASK]. Structure: [SECTIONS/LENGTH]. Format: [FORMAT]. Tone: [TONE]. Max length: [APPROX WORDS] if needed.", notes: "Break long content into sections; specify structure to control quality." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Ask ChatGPT: 'How many words is this?' and paste a paragraph.", "Try a prompt with no structure, then the same goal with clear sections.", "Request 'under X words' and see how it trims."], task: "Write one prompt that produces a structured 300-word piece without filler." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create a 3-part piece (intro, body, close) by prompting each part separately. Combine them. Notice how section-by-section beats one giant prompt.", hint: "End each section prompt with 'End with a transition to the next part' to keep flow." }),
        sec("CBM-14_CHECKLIST", { items: ["I break long content into sections rather than one huge ask.", "I specify approximate length when it matters.", "I use structure (sections, bullets) to guide output.", "I avoid 'everything' or 'comprehensive' without limits."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["ChatGPT predicts next tokens—structure helps it stay on track.", "Context and length limits mean chunking long content works better.", "Explicit sections and word limits reduce padding and repetition."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Work with how ChatGPT thinks: give structure and boundaries, not one giant vague request." })
      ]
    },

    {
      title: "13 Types of Prompts",
      slug: "13-types-of-prompts",
      goal: "Learn 13 prompt types you can reuse for almost any business task.",
      summary: "From brainstorming to rewriting to summarizing, you will have a prompt playbook. Each type has a clear use case and example.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M1-L3", title: "13 Types of Prompts", time: "15–20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have 13 prompt types ready to copy and adapt for emails, content, research, and strategy.", real_world: "Power users have 10–15 go-to prompt patterns they tweak instead of starting from scratch." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Any time you are stuck on how to phrase a prompt. Use the type that matches your goal: brainstorm, rewrite, summarize, compare, etc.", tags: ["Playbook", "Templates", "Speed"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Your goal (idea, draft, summary, etc.)", "The prompt type that fits (e.g. brainstorm, rewrite, list)", "Context (audience, tone, format)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with my business." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "I would be happy to help! Could you tell me more about your business and what specific area you need assistance with? Are you looking for advice on marketing, operations, strategy, or something else?" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No type—ChatGPT does not know if you want ideas, a draft, or advice.", "No focus—your business could mean anything.", "Puts the burden on ChatGPT to guess your intent."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Type: Brainstorm. I need 10 webinar topics for a B2B audience in the HR software space. Focus on pain points: hiring, retention, compliance. Output as a numbered list with one-line description each.", framework_used: "Type + Context + Format" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. How to Cut Time-to-Hire by 40% Without Losing Quality\n2. The Compliance Checklist Every HR Manager Needs in 2025\n3. Why Top Talent Leaves (And How to Fix It)\n4. Remote Hiring: Best Practices for Async Interviews\n5. Building a Culture That Reduces Turnover\n6. Onboarding That Actually Sticks\n7. Pay Transparency: What to Say and What to Avoid\n8. Scaling HR When You Are Understaffed\n9. DEI Without the Drama: Practical Steps\n10. HR Tech Stack: What to Buy First" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Role: B2B content strategist. Type: Brainstorm. Generate 10 webinar topics for HR software buyers. For each: title, target pain, and one hook question. Output as a markdown table. Avoid generic topics.", what_changed: "Role, richer output structure, anti-pattern (avoid generic)." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Rewrite", prompt: "Type: Rewrite. Take this [COPY] and make it [SHORTER/LONGER/MORE FORMAL/FRIENDLIER]. Keep the core message. Output the new version only." },
            { title: "Summarize", prompt: "Type: Summarize. Condense this into 3 bullet points. Each bullet = one key idea. Max 20 words per bullet." },
            { title: "Compare", prompt: "Type: Compare. Compare [A] vs [B] for [USE CASE]. List 3 pros of each, 3 cons of each. Output as a table." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Type: [BRAINSTORM/REWRITE/SUMMARIZE/COMPARE/LIST/ROLE-PLAY/STEP-BY-STEP/...]. [REST OF CONTEXT]. Output: [FORMAT].", notes: "Name the type first so ChatGPT knows the pattern." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List 5 tasks you do often (emails, ideas, summaries).", "Match each to a prompt type (brainstorm, rewrite, summarize, etc.).", "Write one prompt per type using the template.", "Run each and save the best in a prompt library."], task: "Create a personal prompt library with at least 5 types you will reuse." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Pick one real project. Use 3 different prompt types (e.g. brainstorm, then rewrite, then summarize) in sequence. Document which combo works best.", hint: "Chain: brainstorm → pick best → rewrite for audience → summarize for quick reference." }),
        sec("CBM-14_CHECKLIST", { items: ["I name the prompt type (brainstorm, rewrite, etc.) when relevant.", "I have go-to prompts for my top 5 tasks.", "I save and reuse prompts that work well.", "I adapt the template with context, not reinvent."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["13+ prompt types cover most business needs: brainstorm, rewrite, summarize, compare, list, and more.", "Naming the type helps ChatGPT follow the right pattern.", "A small prompt library saves time and improves consistency."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Know your prompt types—brainstorm, rewrite, summarize—and reuse them instead of starting from zero." })
      ]
    },

    {
      title: "Fill in the Blank vs Open Ended",
      slug: "fill-in-the-blank-vs-open-ended",
      goal: "Know when to use constrained (fill-in) prompts vs open-ended prompts for better control and consistency.",
      summary: "Fill-in prompts give you predictable, repeatable outputs. Open-ended prompts unlock creativity. Learn when to use each.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M1-L4", title: "Fill in the Blank vs Open Ended", time: "10–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will choose the right prompt style for each task: constrained for consistency, open for ideation.", real_world: "Templates with blanks outperform fully open prompts for recurring tasks like emails and reports." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Fill-in: emails, reports, forms, anything you do repeatedly. Open-ended: brainstorming, exploration, first drafts when you are not sure what you want.", tags: ["Templates", "Consistency", "Creativity"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Clarity on whether you need consistency (fill-in) or novelty (open-ended)", "For fill-in: a template with clear blanks", "For open-ended: guardrails (tone, format) to avoid chaos"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write something for my client." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "I would be glad to help. Could you provide more details about your client, the type of content you need, and any key points to include?" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Neither constrained nor well-guided—ChatGPT has nothing to fill in or explore.", "No template, no structure, no guardrails.", "Puts the work back on you to clarify."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Fill in this template for a follow-up email:\n\nHi [NAME],\nThanks for [MEETING/EMAIL]. I wanted to share [RESOURCE] that addresses [THEIR PAIN]. Would you be open to [NEXT STEP]?\n\nFill in: NAME=Sarah, MEETING=our call Tuesday, RESOURCE=a short guide on X, THEIR PAIN=reducing churn, NEXT STEP=a 15-min demo next week.", framework_used: "Template + Fill-in values" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hi Sarah,\nThanks for our call Tuesday. I wanted to share a short guide on reducing churn that addresses what you mentioned. Would you be open to a 15-min demo next week?" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Use this template. Keep tone professional and under 75 words.\n\nHi [NAME], thanks for [EVENT]. I am following up with [RESOURCE] about [PAIN]. Open to [NEXT STEP]?\n\nValues: NAME=Sarah, EVENT=Tuesday call, RESOURCE=churn guide, PAIN=reducing churn, NEXT STEP=15-min demo.", what_changed: "Explicit tone and length; structured value list." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Fill-in report", prompt: "Fill this report template:\nSummary: [1-2 sentences]\nKey findings: [3 bullets]\nRecommendation: [1 sentence]\n\nContext: [YOUR CONTEXT]. Output the completed report." },
            { title: "Open-ended ideation", prompt: "I need 5 creative angles for [TOPIC]. No constraints—surprise me. Then pick the best and say why." },
            { title: "Hybrid", prompt: "Open brainstorm 5 [THING]. Then fill in: 'The best option is [X] because [Y].' Pick one and complete the sentence." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Fill-in: [TEMPLATE WITH BLANKS]. Values: [LIST]. Output: [FORMAT].\n\nOR Open-ended: [GOAL]. Constraints: [TONE, LENGTH]. Surprise me within those bounds.", notes: "Choose one style per prompt." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Create a 3-blank email template for a task you do often.", "Fill it in via ChatGPT with real values.", "Try the same goal as open-ended and compare outputs.", "Decide which style you prefer for that task."], task: "Build 2 fill-in templates you will use this month." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Use a fill-in template to produce 3 variations of the same email for 3 different clients. Check that structure stays consistent while content changes.", hint: "Use a table of values: Client A, B, C with NAME, PAIN, OFFER columns." }),
        sec("CBM-14_CHECKLIST", { items: ["I use fill-in templates for repeat tasks (emails, reports).", "I use open-ended prompts when I need new ideas.", "I add guardrails (tone, length) even for open prompts.", "I know which style fits each of my main tasks."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Fill-in prompts give consistent, repeatable outputs for recurring work.", "Open-ended prompts are best for ideation and exploration.", "Adding constraints to open prompts keeps outputs useful."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Use fill-in for consistency, open-ended for creativity—and add guardrails either way." })
      ]
    },

    {
      title: "Build Your Prompt Playbook System",
      slug: "build-your-prompt-playbook-system",
      goal: "Create a personal prompt playbook so you never start from scratch again.",
      summary: "Organize your best prompts by task type, save them in a simple system, and refine them over time.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M1-L5", title: "Build Your Prompt Playbook System", time: "15–20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have a working prompt playbook—a go-to set of prompts for your top 5–10 business tasks.", real_world: "A simple Notion, Google Doc, or text file of prompts can save 30+ minutes per day." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Use your playbook whenever you repeat a task: client emails, proposals, social posts, research, summaries. One place to find and tweak prompts.", tags: ["System", "Productivity", "Reuse"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["List of your top 5–10 recurring tasks", "Best prompt per task (from earlier lessons)", "A place to store them (Notion, Doc, text file)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Do that thing again." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(ChatGPT has no memory of prior conversations in a new chat. It cannot 'do that thing again' without the prompt.)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Assumes ChatGPT remembers—it does not across sessions.", "No stored prompt to reuse.", "Wastes time recreating what worked before."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "From my playbook: 'Client follow-up email'\n\nTemplate: Hi [NAME], thanks for [EVENT]. Following up with [RESOURCE] about [PAIN]. Open to [NEXT STEP]?\n\nValues: NAME=Alex, EVENT=yesterday's call, RESOURCE=case study, PAIN=scaling support, NEXT STEP=quick call Friday.\n\nOutput: completed email, under 75 words.", framework_used: "Playbook reference + Template + Values" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hi Alex,\nThanks for yesterday's call. I'm following up with a case study on scaling support—thought it might help. Open to a quick call Friday?" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Playbook: Client follow-up. Rules: professional, under 75 words, no jargon.\n\nTemplate: [YOUR TEMPLATE]\nValues: [YOUR VALUES]\n\nOutput the email. Then suggest one alternative subject line.", what_changed: "Rules, plus bonus deliverable (subject line)." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Proposal prompt", prompt: "Playbook: 'Proposal draft'. Client: [NAME]. Project: [PROJECT]. Scope: [SCOPE]. Price: [PRICE]. Output: 3-section proposal (overview, approach, terms)." },
            { title: "Social post", prompt: "Playbook: 'LinkedIn post'. Topic: [TOPIC]. Angle: [ANGLE]. CTA: [CTA]. Output: post, 150 words max, hook + value + CTA." },
            { title: "Research summary", prompt: "Playbook: 'Competitor summary'. Company: [NAME]. Focus: [ASPECT]. Output: 5 bullets, then 1-sentence recommendation." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Playbook: [TASK NAME]\nTemplate: [YOUR TEMPLATE]\nValues: [BLANK=VALUE, ...]\nOutput: [FORMAT]. Rules: [TONE, LENGTH, ETC.]", notes: "Keep playbook prompts copy-paste ready with clear blanks." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List your top 5 recurring tasks.", "For each, write one prompt (use types from M1-L3).", "Create a doc or Notion page: 'Prompt Playbook'.", "Paste each prompt with a short title and when to use it.", "Use one this week and note what to improve."], task: "Build and use your playbook with at least 5 prompts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Use only your playbook for one full workday. Do not write any prompt from scratch. At day end, add 1 improvement to each prompt you used.", hint: "If a prompt falls short, add a rule or constraint to the playbook version." }),
        sec("CBM-14_CHECKLIST", { items: ["I have a playbook (doc or app) with my top prompts.", "Each prompt has a name and when to use it.", "I copy-paste and fill values instead of rewriting.", "I update the playbook when a prompt needs improvement."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["A prompt playbook saves time by reusing what works.", "Store prompts with templates and clear blanks.", "Refine playbook prompts over time based on real use."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Your playbook is your leverage—save, reuse, and refine your best prompts." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 2 — Prompt Skills for Business
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Prompt Skills for Business",
  slug: "m2-prompt-skills-for-business",
  lessons: [

    {
      title: "GCCF for Business Prompts",
      slug: "gccf-for-business-prompts",
      goal: "Master the GCCF framework (Goal, Context, Constraints, Format) for professional business prompts.",
      summary: "GCCF gives you a repeatable structure for any business prompt. You will learn how to define each element and apply GCCF to emails, proposals, and strategy docs.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M2-L1", title: "GCCF for Business Prompts", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will use GCCF (Goal, Context, Constraints, Format) to structure every business prompt for clear, usable outputs.", real_world: "Teams using GCCF report 40% fewer 'wrong output' rewrites." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Any business prompt: client emails, proposals, internal docs, strategy briefs, meeting notes.", tags: ["Framework", "GCCF", "Business"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Goal: what you want as output", "Context: who, what, why", "Constraints: tone, length, rules", "Format: structure (list, table, paragraph, etc.)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a proposal for a client." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Generic proposal with no client details, wrong scope, or inappropriate tone.)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No goal—proposal for what outcome?", "No context—which client, project, budget?", "No constraints—length, tone, style?", "No format—sections, structure?"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Goal: A 1-page proposal that wins the project. Context: Client is a 20-person SaaS company. Project: 3-month marketing audit and strategy. Budget: $8K. Constraints: Professional, no jargon, no fluff. Format: 3 sections—Overview (2 sentences), Approach (3 bullets), Terms (timeline, deliverables, investment).", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Overview: We will conduct a 3-month marketing audit of your current channels and deliver a prioritized strategy to increase qualified leads by 25%.\n\nApproach:\n• Audit: SEO, paid, content, and conversion points\n• Strategy: 90-day roadmap with clear milestones\n• Handoff: Documented playbook for your team\n\nTerms: 12 weeks, 2 kickoff calls, final deliverable by [DATE]. Investment: $8,000." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "GCCF. Goal: Proposal that wins. Context: [CLIENT], [PROJECT], [BUDGET]. Constraints: Professional, no jargon, under 400 words. Format: Overview (2 sent), Approach (3 bullets), Terms (timeline, deliverables, $). Add a PS: one risk we will help them avoid.", what_changed: "Explicit GCCF label, PS hook for differentiation." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Email", prompt: "GCCF. Goal: Get a reply. Context: Follow-up after demo, client seemed interested. Constraints: Under 100 words, friendly but professional. Format: 3 sentences—thanks, reminder of value, soft CTA." },
            { title: "Strategy doc", prompt: "GCCF. Goal: One-page strategy brief. Context: [PROJECT], [AUDIENCE], [TIMELINE]. Constraints: Action-oriented, no fluff. Format: Problem, Solution, 3 Key Actions, Success metric." },
            { title: "Meeting summary", prompt: "GCCF. Goal: Shareable summary. Context: [MEETING TYPE], [ATTENDEES], [DECISIONS]. Constraints: Neutral tone, bullet-heavy. Format: Decisions, Action items (owner + due date), Open questions." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "GCCF\nGoal: [WHAT YOU WANT]\nContext: [WHO, WHAT, WHY]\nConstraints: [TONE, LENGTH, RULES]\nFormat: [SECTIONS, STRUCTURE]", notes: "Always include all four elements." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick one real task (email, proposal, or doc).", "Write Goal, Context, Constraints, Format in 4 lines.", "Combine into one GCCF prompt.", "Run it and refine any weak element."], task: "Apply GCCF to 3 different tasks this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Rewrite your worst-performing prompt from last month using GCCF. Compare outputs. Document what improved.", hint: "Often the missing piece is Constraints or Format." }),
        sec("CBM-14_CHECKLIST", { items: ["I include Goal in every prompt.", "I add Context (who, what, why).", "I specify Constraints (tone, length, rules).", "I define Format (sections, structure)."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["GCCF = Goal, Context, Constraints, Format.", "All four elements reduce rewrites and improve quality.", "GCCF works for any business prompt type."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Every business prompt needs GCCF: Goal, Context, Constraints, Format." })
      ]
    },

    {
      title: "Output Control Tables",
      slug: "output-control-tables",
      goal: "Get consistent tabular outputs from ChatGPT for comparisons, lists, and structured data.",
      summary: "Tables are powerful for business: competitor comparisons, feature lists, pricing. Learn how to prompt for clean, scannable tables.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M2-L2", title: "Output Control Tables", time: "10–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will reliably get markdown or text tables from ChatGPT for comparisons, feature lists, and structured data.", real_world: "Tables make research and proposals instantly scannable for clients and stakeholders." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Competitor comparisons, feature matrices, pricing tables, pros/cons lists, timelines, option evaluations.", tags: ["Format", "Tables", "Structure"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Clear column headers (what each column represents)", "What to compare or list", "Any sorting or filtering rules"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Compare some project management tools." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "There are many project management tools. Asana is good for teams. Trello uses boards. Monday.com has many features. ClickUp is versatile. Each has pros and cons..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No table format requested—you get prose.", "Vague comparison—which tools, which criteria?", "No structure—hard to scan or use."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Compare Asana, Trello, Monday.com for a 15-person marketing team. Output as a markdown table. Columns: Tool | Price (approx) | Best for | Pros | Cons. One row per tool. Keep cells short (1 line each).", framework_used: "Format + Structure + Constraints" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Tool | Price | Best for | Pros | Cons |\n|------|-------|----------|------|------|\n| Asana | $11/user | Complex projects | Strong workflows, templates | Steep learning curve |\n| Trello | $5/user | Visual work | Simple, flexible | Limited reporting |\n| Monday | $8/user | All-in-one | Customizable, automations | Can get expensive |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Output a markdown table. Rows: Asana, Trello, Monday. Columns: Price | Best for | Key strength | Dealbreaker. Add a row at bottom: 'Recommendation' with one tool and 1-sentence reason. Base on 15-person marketing team.", what_changed: "Recommendation row, specific use case." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Feature matrix", prompt: "Create a markdown table. Rows: [Product A], [Product B], [Product C]. Columns: Feature 1 | Feature 2 | Feature 3. Use Yes/No or brief notes. Focus on [CRITERIA]." },
            { title: "Timeline", prompt: "Output a table. Columns: Week | Milestone | Owner | Status. Rows: 4 weeks for [PROJECT]. Fill with realistic milestones." },
            { title: "Options", prompt: "List 5 options for [DECISION]. Table: Option | Pros | Cons | Cost | Best when. One sentence per cell." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Output as a markdown table. Rows: [ITEMS]. Columns: [COL1] | [COL2] | [COL3]. [CONSTRAINTS]. [EXTRA ROWS if needed].", notes: "Always specify rows and columns explicitly." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define 3 columns for a comparison you need.", "Write the prompt with explicit row/column names.", "Request markdown table format.", "Copy into a doc or spreadsheet."], task: "Produce 2 useful tables this week using the prompt." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Build a competitor comparison table for 3 alternatives in your space. Add a 'Recommendation' row. Use it in a real proposal or internal doc.", hint: "Include 'Recommendation' as a final row with tool + reason." }),
        sec("CBM-14_CHECKLIST", { items: ["I request 'markdown table' or 'table format'.", "I define rows and columns explicitly.", "I keep cell content short for scannability.", "I use tables for comparisons, options, and lists."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Explicit row/column definitions produce usable tables.", "Markdown tables paste cleanly into docs and tools.", "Tables make comparisons and options easy to scan."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Define rows and columns explicitly, request markdown table, and keep cells short." })
      ]
    },

    {
      title: "Output Control JSON",
      slug: "output-control-json",
      goal: "Get valid JSON from ChatGPT for automations, APIs, and structured data workflows.",
      summary: "When you need machine-readable output for spreadsheets, APIs, or automation tools, JSON is the format. Learn how to prompt for valid JSON.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M2-L3", title: "Output Control JSON", time: "12–15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will reliably get valid JSON from ChatGPT for use in spreadsheets, automations, and data pipelines.", real_world: "JSON output feeds into Make, Zapier, Airtable, and custom scripts—saving manual reformatting." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Data for automations, API-style responses, structured lists for Airtable/Sheets, taxonomy or tagging systems.", tags: ["JSON", "Automation", "Data"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Exact schema (keys and structure you need)", "Example of desired format if complex", "Validation rule: 'Valid JSON only, no markdown'"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me a list of 5 blog topics in JSON." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Here are 5 blog topics:\n1. How to start a business\n2. Marketing tips\n...\nOr in JSON: { \"topics\": [...] }" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No schema—ChatGPT may use wrong keys or nesting.", "Output wrapped in prose or markdown—not parseable.", "No 'valid JSON only' instruction."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Output valid JSON only. No markdown, no explanation. Schema:\n{ \"topics\": [ { \"title\": string, \"angle\": string, \"target_keyword\": string } ] }\nGenerate 5 blog topics for a B2B SaaS audience. Focus on lead generation.", framework_used: "Schema + Format + Constraints" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "{\"topics\":[{\"title\":\"10 Lead Magnet Ideas That Convert\",\"angle\":\"practical templates\",\"target_keyword\":\"lead magnets\"},{\"title\":\"How to Score Leads Without Annoying Them\",\"angle\":\"lead scoring best practices\",\"target_keyword\":\"lead scoring\"},{\"title\":\"From Cold to Close: Lead Nurture Sequences That Work\",\"angle\":\"email sequences\",\"target_keyword\":\"lead nurturing\"},{\"title\":\"Landing Page Copy That Gets Sign-Ups\",\"angle\":\"conversion copywriting\",\"target_keyword\":\"landing page conversion\"},{\"title\":\"Webinar to Sales: Converting Registrants\",\"angle\":\"webinar funnel\",\"target_keyword\":\"webinar conversion\"}]}" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Output ONLY valid JSON. No ```, no markdown, no text before or after. Schema: { topics: [{ title, angle, target_keyword, est_read_min }] }. 5 items. B2B SaaS, lead gen focus. Validate: must parse with JSON.parse().", what_changed: "Strict 'only JSON' rule, extra field, validation mention." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "List of objects", prompt: "Output valid JSON only. Array of 5 objects: { name, email, company, role }. Use placeholder data. No other text." },
            { title: "Nested", prompt: "Output valid JSON. Structure: { category: string, items: [ { name, description } ] }. 3 items. Topic: [YOUR TOPIC]. No markdown." },
            { title: "For Airtable", prompt: "Output JSON array. Each object: { Name, Status, Notes }. 3 rows. Use realistic sample data for [USE CASE]. Paste-ready for Airtable import." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Output valid JSON only. No markdown, no ```. Schema: [YOUR SCHEMA]. Data: [WHAT TO GENERATE]. Validate: parses correctly.", notes: "Always say 'valid JSON only' and provide schema." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define a simple schema (2–3 keys).", "Prompt for 3 items in that schema.", "Copy output and run through jsonlint.com or JSON.parse().", "Fix the prompt if output is invalid."], task: "Produce one JSON output that parses correctly and use it (paste into Sheet, Airtable, or script)." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Generate a JSON list of 5 'content ideas' with title, type, and priority. Import into a spreadsheet or Airtable. Use it to plan next week.", hint: "If ChatGPT wraps in ```json, add: 'No code fences. Raw JSON only.'" }),
        sec("CBM-14_CHECKLIST", { items: ["I request 'valid JSON only' and no markdown.", "I provide a clear schema (keys, structure).", "I validate output with a parser before using.", "I use JSON for automations and data import."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Explicit schema and 'valid JSON only' prevent formatting issues.", "JSON output feeds automations and data tools.", "Validate with a parser before feeding into systems."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Provide schema, demand valid JSON only, and validate before use." })
      ]
    },

    {
      title: "Brand Tone and Voice Control",
      slug: "brand-tone-and-voice-control",
      goal: "Get ChatGPT outputs that match your or your client's brand voice consistently.",
      summary: "Tone and voice are often the giveaway that copy was AI-generated. Learn how to define and enforce brand voice in prompts.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M2-L4", title: "Brand Tone and Voice Control", time: "12–15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will write prompts that produce on-brand copy—matching tone, vocabulary, and style every time.", real_world: "Clients and audiences notice when tone is off; consistent voice builds trust." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Client copy, marketing materials, emails, social posts, website copy. Any customer-facing content.", tags: ["Brand", "Tone", "Copy"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Tone descriptors (e.g. friendly, authoritative, playful)", "Vocabulary rules (words to use/avoid)", "Sample of target voice (1–2 paragraphs)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a welcome email for our SaaS product." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Welcome to [Product]! We are thrilled to have you on board. Our mission is to help you achieve your goals. Feel free to reach out if you need anything. Happy building!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No tone specified—generic 'thrilled' and 'on board'.", "No brand vocabulary—sounds like every other SaaS.", "No sample to mimic—ChatGPT defaults to generic."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write a welcome email for our project management SaaS. Tone: direct, no fluff, slightly witty. Avoid: 'thrilled,' 'excited,' 'journey,' 'leverage.' Sound like: a skilled colleague, not a marketing bot. Length: under 120 words. Include: one clear first step.", framework_used: "Tone + Avoid + Sample style" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "You're in. Here's the one thing to do first: create a project, add one task, and invite one person. That's it. Once you've done that, you'll see why teams stick with us. Questions? Hit reply—we read everything." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Brand voice: [PASTE 2–3 SENTENCES FROM YOUR BEST COPY]. Tone: [DESCRIPTORS]. Avoid: [BANNED WORDS]. Write: [TASK]. Match the voice sample. No generic marketing phrases.", what_changed: "Paste real sample—strongest signal for voice." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Tone profile", prompt: "Tone: professional but warm, like a trusted advisor. Avoid: jargon, hype, exclamation marks. Write: [TASK]. Sound human, not corporate." },
            { title: "Voice sample", prompt: "Match this voice: '[PASTE 2 SENTENCES]'. Write: [TASK]. Same sentence length, vocabulary, and rhythm." },
            { title: "Anti-patterns", prompt: "Write: [TASK]. Do NOT use: excited, amazing, game-changer, leverage, synergy, cutting-edge. Do use: [3–5 preferred words/phrases]." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Tone: [DESCRIPTORS]. Avoid: [WORDS]. Sound like: [COMPARISON]. [Optional: paste voice sample]. Write: [TASK]. Length: [X] words.", notes: "Paste real sample for best results." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Find 2–3 sentences of copy you love (yours or a client's).", "List 5 words to avoid and 5 to use.", "Write a tone line (e.g. 'like a skilled colleague').", "Prompt for new copy with tone + avoid + sample."], task: "Create a tone brief for one brand and use it in 3 prompts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a 100-word 'tone brief' for your brand or a client. Include: 3 tone words, 5 banned words, 5 preferred phrases, and 2 sample sentences. Use it in all prompts this week.", hint: "The sample sentences are the most powerful part." }),
        sec("CBM-14_CHECKLIST", { items: ["I define tone (2–3 descriptors) in prompts.", "I list words to avoid and prefer.", "I paste a voice sample when possible.", "I edit outputs to tighten any generic bits."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Tone + avoid words + voice sample = on-brand output.", "Pasting real copy is the strongest voice signal.", "Generic words (thrilled, journey, leverage) are easy to ban."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Define tone, ban generic words, and paste a voice sample for on-brand copy." })
      ]
    },

    {
      title: "3R Refinement Workflow",
      slug: "3r-refinement-workflow",
      goal: "Master the 3R workflow: Request, Refine, Repeat—for iterative prompt improvement.",
      summary: "First outputs are rarely perfect. 3R teaches you to request, review, refine with follow-up prompts, and repeat until you get what you need.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M2-L5", title: "3R Refinement Workflow", time: "10–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will use Request → Refine → Repeat to improve outputs instead of starting over.", real_world: "Power users refine in 1–2 follow-ups; beginners rewrite from scratch." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "When the first output is close but not quite right: too long, wrong tone, missing a section, needs more examples.", tags: ["Workflow", "3R", "Iteration"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Initial prompt (Request)", "Specific feedback on what to change (Refine)", "Willingness to iterate (Repeat)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "That's not what I wanted. Try again." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(ChatGPT tries something different but still may not address the real issue.)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Vague feedback—'not what I wanted' gives no direction.", "No specifics—what exactly is wrong?", "Wastes tokens—ChatGPT guesses instead of fixing."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Refine the previous output: 1) Cut it to half the length. 2) Make the tone more direct and less formal. 3) Add one concrete example in the second section. Keep the structure.", framework_used: "3R Refinement" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "(Tighter, more direct version with one added example, structure preserved.)" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Changes needed: [1) Specific change], [2) Specific change], [3) Specific change]. Keep: [what to preserve]. Output the revised version only.", what_changed: "Numbered changes, explicit 'keep' instruction." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Shorten", prompt: "Shorten the previous output to [X] words. Keep the key points. Remove filler and repetition." },
            { title: "Tone shift", prompt: "Same content as before, but make the tone [MORE X / LESS Y]. Do not add new sections." },
            { title: "Add/remove", prompt: "Add a section on [X]. Remove the part about [Y]. Keep everything else." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Refine: [1) change], [2) change], [3) change]. Keep: [what stays]. Output: [format].", notes: "Be specific; numbered changes work best." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Request an output (any task).", "List 2–3 specific changes needed.", "Refine with a follow-up prompt.", "Repeat once more if needed."], task: "Use 3R on 2 real outputs this week instead of starting over." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Get a first draft from ChatGPT. Refine it 3 times with different instructions (length, tone, add/remove). Compare v1 and v4.", hint: "Track what each refinement changed." }),
        sec("CBM-14_CHECKLIST", { items: ["I give specific feedback (not 'try again').", "I list changes in numbered form.", "I say what to keep when refining.", "I refine instead of rewriting from scratch."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Request → Refine → Repeat beats starting over.", "Specific, numbered feedback gets better revisions.", "Saying what to keep prevents losing good parts."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Refine with specific, numbered changes—and say what to keep." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 3 — General Business Toolkit
   ═══════════════════════════════════════════════════════════════ */
{
  title: "General Business Toolkit",
  slug: "m3-general-business-toolkit",
  lessons: [

    {
      title: "Research Competitors",
      slug: "research-competitors",
      goal: "Use ChatGPT to quickly research competitors and map the competitive landscape.",
      summary: "Get structured competitor intel: positioning, pricing, strengths, weaknesses. Turn raw info into a usable competitive brief.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L1", title: "Research Competitors", time: "12–18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will produce a structured competitor brief with positioning, pricing, strengths, and gaps—in minutes.", real_world: "Sales and marketing teams use competitor intel to differentiate and win deals." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Sales prep, positioning docs, pricing strategy, content planning, pitch decks.", tags: ["Research", "Competition", "Strategy"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Your company and product", "Competitor names (2–5)", "What you need: positioning, pricing, features, gaps"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Tell me about my competitors." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Without knowing your industry or product, I cannot identify your competitors. Could you provide more context?" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No context—ChatGPT does not know your market.", "No competitor names or scope.", "No structure—hard to act on."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I run [COMPANY], a [PRODUCT] for [AUDIENCE]. Research these competitors: [A], [B], [C]. Output a table: Company | Positioning | Price range | Key strength | Weakness vs us. One row each. Base on public info.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Company | Positioning | Price | Strength | Weakness vs us |\n| A | Enterprise-focused | $$ | Scale | Complex setup |\n| B | SMB-friendly | $ | Ease of use | Limited integrations |\n| C | Mid-market | $$ | Support | Older UX |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Competitive brief. Us: [COMPANY]—[PRODUCT] for [AUDIENCE]. Competitors: [A], [B], [C]. For each: positioning, price, strength, weakness. Add a final row: 'Gaps we can own' with 2–3 opportunities. Output as markdown table.", what_changed: "Strategic addition: gaps we can own." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Positioning map", prompt: "Map [COMPANY] vs [A], [B], [C] on price vs complexity. Output table: Company | Price tier | Complexity | Best for. One sentence positioning each." },
            { title: "Feature comparison", prompt: "Compare [OUR PRODUCT] vs [A], [B] on: [FEATURE 1], [FEATURE 2], [FEATURE 3]. Table: Feature | Us | A | B. Use Yes/Partial/No." },
            { title: "Sales battlecard", prompt: "Battlecard for [COMPETITOR]. Sections: Their pitch, Our counter, Weakness to press, Proof points. 2–3 bullets each. For [OUR PRODUCT] vs [THEM]." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Competitor research. Us: [COMPANY], [PRODUCT], [AUDIENCE]. Competitors: [LIST]. Output: [TABLE/BRIEF]. Include: [FIELDS]. Add: [GAPS/RECOMMENDATIONS] if needed.", notes: "Always state your context and desired output structure." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List your top 3 competitors.", "Write a GCCF prompt with your product and their names.", "Request a table with positioning, price, strength, weakness.", "Add one 'gap we can own' row."], task: "Produce one competitor brief and use it in a real doc or call." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Build a 1-page competitive brief for your top 3 competitors. Include a 'How we win' section. Share with a colleague or use in a sales call.", hint: "End prompt with 'Add: How we win—3 bullets.'" }),
        sec("CBM-14_CHECKLIST", { items: ["I include my company and product in the prompt.", "I name specific competitors.", "I request a structured output (table or sections).", "I add a strategic takeaway (gaps, how we win)."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context + competitor names + structure = actionable intel.", "Tables make competitor briefs scannable.", "Add strategic sections: gaps, how we win."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Give context, name competitors, and request a structured brief with strategic takeaways." })
      ]
    },

    {
      title: "Create a Business Plan",
      slug: "create-a-business-plan",
      goal: "Use ChatGPT to draft sections of a business plan: overview, market, go-to-market, and financials.",
      summary: "Get a solid first draft of key plan sections. Refine with your numbers and specifics.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L2", title: "Create a Business Plan", time: "15–20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have a draft business plan structure with placeholder content you can fill and refine.", real_world: "Founders use AI drafts to save 10+ hours on first plan versions." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Pitching investors, internal planning, grant applications, partner conversations.", tags: ["Business plan", "Strategy", "Pitching"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Business idea and model", "Target market and customer", "Revenue model and rough numbers"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a business plan for me." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "A business plan typically includes an executive summary, company description, market analysis..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No business context—ChatGPT describes a plan, not yours.", "Generic template output.", "Not actionable or specific."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Draft the Executive Summary and Problem/Solution sections of a business plan. Business: [NAME]—[ONE-LINE DESCRIPTION]. Target: [AUDIENCE]. Problem: [PAIN]. Solution: [OFFERING]. Revenue: [MODEL]. Output 2 sections, 2–3 paragraphs each. Professional tone.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Executive Summary: [Company] provides [solution] for [audience] who struggle with [problem]. We offer [core offering] and charge [model]. Our differentiator is [X]. We are seeking [funding/partners] to [next milestone].\n\nProblem/Solution: [Problem description]. [Solution description]. [Why now, why us]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Business plan draft. Company: [NAME]. [ONE-LINER]. Sections: 1) Executive Summary (4–5 sentences), 2) Problem (3 bullets), 3) Solution (3 bullets), 4) Market (size + segment), 5) Go-to-market (3 channels). Use placeholder numbers where needed. Output as markdown.", what_changed: "Multiple sections, placeholders for numbers." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Executive summary", prompt: "Executive summary for [COMPANY]. [PRODUCT], [AUDIENCE], [PROBLEM], [SOLUTION], [REVENUE MODEL], [ASK]. 4–5 sentences. Investor-ready tone." },
            { title: "Market section", prompt: "Market analysis section for a business plan. Product: [PRODUCT]. Target: [AUDIENCE]. Include: TAM/SAM/SOM estimates, trends, and competition in 3 short paragraphs." },
            { title: "Go-to-market", prompt: "Go-to-market section. Product: [PRODUCT]. Audience: [AUDIENCE]. Budget: [LOW/MED/HIGH]. Output: 3 channels with tactic, cost, timeline. Table format." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Business plan section: [SECTION]. Company: [NAME], [ONE-LINER]. [KEY DETAILS]. Output: [LENGTH/FORMAT]. Tone: professional.", notes: "Do one section at a time for best quality." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick one section (Executive Summary, Problem, Market, or GTM).", "Write key facts: company, audience, problem, solution.", "Prompt for that section only.", "Edit with your real numbers and voice."], task: "Draft 2 business plan sections and refine them." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Draft a full 1-page business plan outline: Exec Summary, Problem, Solution, Market, GTM, Ask. Fill in your real details. Use it in a pitch or internal review.", hint: "Prompt section by section, then combine." }),
        sec("CBM-14_CHECKLIST", { items: ["I provide company, audience, problem, solution.", "I request one section at a time.", "I replace placeholders with real numbers.", "I tighten tone to match my voice."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Section-by-section drafting beats one giant prompt.", "Placeholder numbers help structure; replace with real data.", "A business plan draft is a starting point—refine with specifics."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Draft business plan sections one at a time, then fill in your real numbers and voice." })
      ]
    },

    {
      title: "Write Client Proposals",
      slug: "write-client-proposals",
      goal: "Draft professional client proposals quickly with ChatGPT.",
      summary: "Structure a proposal with overview, approach, deliverables, and terms. Customize for each client.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L3", title: "Write Client Proposals", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will produce client-ready proposal drafts in minutes, with clear sections and professional tone.", real_world: "Freelancers and agencies save 2–3 hours per proposal using AI drafts." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Sending proposals for projects, retainers, audits, consulting engagements.", tags: ["Proposals", "Sales", "Freelance"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Client name and project scope", "Your offering and deliverables", "Pricing, timeline, and terms"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a proposal for a marketing project." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Thank you for the opportunity. We would love to work with you on your marketing needs. Our team has extensive experience..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No client or project details.", "Generic opening and no specifics.", "No structure or deliverables."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Draft a 1-page client proposal. Client: [NAME]. Project: [SCOPE]. Deliverables: [LIST]. Timeline: [X weeks]. Investment: $[AMOUNT]. Sections: Overview (2 sentences), Approach (3 bullets), Deliverables (bullets), Terms (timeline, payment, next step). Professional, confident tone.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Overview: [Client], we will deliver [scope] in [timeline] with [key outcome]. Approach: 1) Discovery, 2) Strategy, 3) Delivery. Deliverables: [List]. Terms: [Timeline], [Payment], [Next step]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Proposal for [CLIENT]. Project: [SCOPE]. $[AMOUNT], [TIMELINE]. Sections: Overview, Approach (3 phases), Deliverables, Terms. Add a PS: one risk we will help them avoid. Tone: confident, no groveling. Under 400 words.", what_changed: "PS hook, tone rule, word limit." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Audit proposal", prompt: "Proposal for [AUDIT TYPE] audit. Client: [NAME]. Deliverables: report, 1-hour call, recommendations. Price: $[X]. Timeline: 2 weeks. 3 sections. Professional." },
            { title: "Retainer", prompt: "Monthly retainer proposal. Client: [NAME]. Scope: [SERVICES]. Hours: [X]/month. Rate: $[X]. Include: what's included, what's extra, start date." },
            { title: "Project + upsell", prompt: "Proposal: [PROJECT] for $[X]. Add optional add-on: [ADD-ON] for +$[Y]. Make add-on feel like natural next step." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Proposal. Client: [NAME]. Project: [SCOPE]. Deliverables: [LIST]. $[AMOUNT], [TIMELINE]. Sections: Overview, Approach, Deliverables, Terms. Tone: professional, confident.", notes: "Keep proposals under 1 page when possible." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List one real project you are proposing.", "Gather: scope, deliverables, price, timeline.", "Prompt for proposal with those details.", "Edit to match your voice and add any specifics."], task: "Draft and send one real proposal using this prompt." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 2 proposal variants for the same project: one standard, one with an add-on. Compare how the add-on reads.", hint: "In the add-on version, phrase it as 'Many clients also add...' or 'Natural next step'." }),
        sec("CBM-14_CHECKLIST", { items: ["I include client, scope, deliverables, price, timeline.", "I request clear sections.", "I edit for my voice and accuracy.", "I add a clear next step (sign, call, etc.)."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Structured sections make proposals scannable and professional.", "Specifics (scope, price, timeline) reduce back-and-forth.", "A PS with risk/benefit can differentiate."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Proposals need structure, specifics, and a clear next step—AI drafts get you 80% there." })
      ]
    },

    {
      title: "Company Vision Statement",
      slug: "company-vision-statement",
      goal: "Use ChatGPT to brainstorm and refine a company vision or mission statement.",
      summary: "Get multiple drafts and angles for vision, mission, and values. Refine until it sounds like you.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L4", title: "Company Vision Statement", time: "10–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have draft vision and mission statements you can refine into something that truly represents your company.", real_world: "Clear vision guides decisions and attracts aligned team members and customers." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Website, investor deck, hiring, internal alignment, brand guidelines.", tags: ["Vision", "Mission", "Brand"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["What you do and for whom", "What you believe or stand for", "Tone (aspirational, practical, bold, etc.)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a vision statement for my company." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "To be the leading provider of innovative solutions that empower organizations to achieve excellence." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No company context—generic output.", "Mission and vision often confused.", "Sounds like every other corporate statement."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Company: [NAME]. We [DO WHAT] for [WHO]. We believe [CORE BELIEF]. Draft 3 vision statements (1 sentence each) and 3 mission statements (1–2 sentences). Tone: [ASPIRATIONAL/PRACTICAL/BOLD]. Avoid corporate jargon.", framework_used: "Context + Belief + Options" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Vision options: 1) A world where [X]. 2) To make [Y] accessible to everyone. 3) [Company] exists so that [Z]. Mission options: 1) We help [audience] [achieve X] by [how]. 2) Our mission is to [action] for [audience] so they can [outcome]. 3) We build [what] so [audience] can [outcome]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Vision/mission for [COMPANY]. We [DO WHAT] for [WHO]. Belief: [X]. Avoid: 'synergy,' 'empower,' 'leverage,' 'excellence.' Give 5 vision options (1 sent) and 5 mission options (1–2 sent). Mark the 2 strongest of each.", what_changed: "Anti-jargon, more options, recommend best." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Vision only", prompt: "Draft 5 one-sentence vision statements for [COMPANY]—[WHAT WE DO] for [WHO]. Belief: [X]. Tone: [TONE]. Avoid jargon." },
            { title: "Mission only", prompt: "Draft 5 mission statements (1–2 sentences) for [COMPANY]. Format: We help [WHO] [ACHIEVE X] by [HOW]. Varied angles." },
            { title: "Values", prompt: "Suggest 5–7 company values for [COMPANY]—[WHAT/WHO]. One word + one sentence each. Action-oriented, not generic." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Company: [NAME]. [WHAT], [WHO], [BELIEF]. Draft: [VISION/MISSION/VALUES]. Options: [N]. Tone: [TONE]. Avoid: [JARGON].", notes: "Request multiple options and pick/merge." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Write: what we do, who for, what we believe.", "Request 3 vision + 3 mission options.", "Pick favorites and blend into one of each.", "Edit until it sounds like your company."], task: "Draft vision and mission and refine one set for real use." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Get 5 vision and 5 mission options. Mix and match parts to create your final versions. Test on one person: does it resonate?", hint: "Combine the best parts of 2–3 options." }),
        sec("CBM-14_CHECKLIST", { items: ["I provide what we do, who for, and core belief.", "I request multiple options.", "I avoid generic jargon in the brief.", "I refine until it sounds authentic."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context and belief produce more relevant statements.", "Multiple options let you pick and blend.", "Ban generic words (empower, synergy) for distinctiveness."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Give context and belief, get options, then refine until it sounds like you." })
      ]
    },

    {
      title: "Generate Business Ideas",
      slug: "generate-business-ideas",
      goal: "Use ChatGPT to brainstorm and pressure-test business ideas.",
      summary: "Generate ideas from skills, problems, and trends. Then quickly evaluate them for viability.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L5", title: "Generate Business Ideas", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will generate and shortlist business ideas using your skills, problems you see, and market gaps.", real_world: "Entrepreneurs use AI to expand the idea funnel before committing to validation." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Side projects, pivots, new revenue streams, niche exploration.", tags: ["Ideas", "Entrepreneurship", "Brainstorm"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Your skills or expertise", "Problems you have seen or experienced", "Constraints (time, capital, market)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me business ideas." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Here are some business ideas: 1) Start a blog. 2) Sell on Amazon. 3) Offer consulting. 4) Create an app..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personal context—generic ideas.", "No filter for your skills or market.", "Hard to act on—no evaluation."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I have skills in [X] and experience with [Y]. I see a problem: [PROBLEM]. Generate 10 business ideas that fit my skills and address this problem or related ones. For each: idea, one-sentence description, why it fits me, potential first step. Output as table.", framework_used: "Skills + Problem + Structure" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Idea | Description | Fit | First step |\n| Coaching | 1:1 help for [audience] | Uses your [skill] | Offer 3 free calls |\n| Template | Done-for-you [X] | Leverages your experience | Build MVP, sell on Gumroad |..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Business ideas. My skills: [X]. Problem I see: [Y]. Constraints: [time/money]. Generate 10 ideas. Table: Idea | One-liner | Fit | Risk | First $100 step. Rank top 3 by speed to first dollar.", what_changed: "Constraints, risk, first $100 step, ranking." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Skill-based", prompt: "I am good at [X] and [Y]. List 10 business ideas that use these skills. Low startup cost. For each: idea, first step, time to first dollar." },
            { title: "Problem-based", prompt: "Problem: [PROBLEM]. Who has it? Generate 10 ways to solve it (product, service, content, community). Table: Solution | Who pays | Why." },
            { title: "Evaluate", prompt: "Evaluate this idea: [IDEA]. Pros, cons, biggest risk, easiest validation step. 1 paragraph." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Ideas. Skills: [X]. Problem: [Y]. Constraints: [Z]. Output: [N] ideas. Table: Idea | Fit | Risk | First step.", notes: "Add 'first dollar' or 'validation' step for actionability." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List your top 3 skills and 1 problem you care about.", "Prompt for 10 ideas in table format.", "Pick 3 and ask for evaluation (pros, cons, first step).", "Choose one to explore further."], task: "Generate 10 ideas, evaluate 3, pick 1 to validate." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Generate 10 ideas, then prompt ChatGPT to pressure-test your favorite: 'What would make this fail? What is the simplest validation?' Act on one validation step.", hint: "Ask 'What is the fastest way to test if anyone would pay?'" }),
        sec("CBM-14_CHECKLIST", { items: ["I include my skills and a real problem.", "I request structured output (table).", "I evaluate top ideas with pros/cons/risk.", "I define a first step for at least one idea."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Skills + problem + constraints = relevant ideas.", "Evaluation and 'first step' make ideas actionable.", "Pressure-testing reduces wasted effort."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Ideas need context, structure, and a validation step—AI helps with all three." })
      ]
    },

    {
      title: "Prepare to Pitch Investors",
      slug: "prepare-to-pitch-investors",
      goal: "Use ChatGPT to draft and refine investor pitch content: problem, solution, traction, ask.",
      summary: "Get pitch narrative, slide outlines, and Q&A prep. Refine for clarity and impact.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L6", title: "Prepare to Pitch Investors", time: "15–20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have draft pitch content and Q&A prep so you can refine and rehearse with confidence.", real_world: "Founders who prep answers to hard questions close more conversations." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Pitch decks, meetings, accelerators, demo days.", tags: ["Pitching", "Investors", "Fundraising"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Problem, solution, market, traction", "Ask (amount, use of funds)", "Obvious objections or concerns"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me pitch to investors." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "When pitching investors, you should have a clear problem, solution, market size..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Generic advice, not your pitch.", "No company details.", "Nothing to use directly."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Draft investor pitch content. Company: [NAME]. Problem: [X]. Solution: [Y]. Market: [SIZE/SEGMENT]. Traction: [METRICS]. Ask: $[X] for [USE]. Output: 1) 60-sec pitch script, 2) 5 slide titles + 1 bullet each, 3) Top 5 investor questions + suggested answers.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "60-sec: [Problem]. [Solution]. [Traction]. We are raising [X] to [use]. Slides: Problem, Solution, Market, Traction, Ask. Q&A: Why now? Competition? Unit economics?..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Pitch prep. [COMPANY], [PROBLEM], [SOLUTION], [TRACTION], [ASK]. Output: 1) 60-sec script, 2) Slide outline (title + bullets), 3) 5 hardest questions + answers, 4) One-liner for 'What do you do?'", what_changed: "Explicit one-liner, hardest questions focus." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Elevator pitch", prompt: "60-second pitch. Company: [NAME]. Problem: [X]. Solution: [Y]. Traction: [Z]. Ask: [A]. Conversational, no jargon." },
            { title: "Slide outline", prompt: "10-slide deck outline. Company: [NAME]. [PROBLEM, SOLUTION, MARKET, TRACTION, ASK]. Each slide: title + 3 bullets max." },
            { title: "Q&A prep", prompt: "Investor Q&A prep. Company: [NAME]. [KEY FACTS]. List 10 questions investors will ask. For each: answer (2–3 sentences), backup data if needed." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Pitch prep. [COMPANY], [PROBLEM], [SOLUTION], [TRACTION], [ASK]. Output: [SCRIPT/SLIDES/Q&A]. Tone: confident, concise.", notes: "Do script, slides, and Q&A as separate prompts for best quality." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Gather: problem, solution, traction, ask.", "Prompt for 60-sec script.", "Prompt for slide outline.", "Prompt for top 5 Q&A. Rehearse answers."], task: "Create pitch script + Q&A and do one practice run." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Get a full pitch pack: script, slides, Q&A. Practice the script out loud. Identify 2 weak answers and refine them with a follow-up prompt.", hint: "Ask 'Make this answer shorter and more confident' for weak ones." }),
        sec("CBM-14_CHECKLIST", { items: ["I include problem, solution, traction, ask.", "I get a script and slide outline.", "I prep answers to top investor questions.", "I rehearse out loud."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Script + slides + Q&A = complete pitch prep.", "Preparing for hard questions reduces stumble moments.", "Rehearsal reveals what to refine."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Prepare script, slides, and Q&A—then rehearse until it feels natural." })
      ]
    },

    {
      title: "Hiring and Leadership",
      slug: "hiring-and-leadership",
      goal: "Use ChatGPT to draft job descriptions, interview questions, and feedback scripts.",
      summary: "Get job posts, structured interview questions, and templates for feedback and 1:1s.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L7", title: "Hiring and Leadership", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will draft job descriptions, interview questions, and feedback scripts that are clear and professional.", real_world: "Managers save hours on JD writing and interview prep with AI drafts." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Job posts, interview prep, performance feedback, 1:1 agendas.", tags: ["Hiring", "Leadership", "People"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Role and level", "Key responsibilities and must-haves", "Company context and culture"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a job description for a marketing manager." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "We are seeking a dynamic Marketing Manager to join our team. The ideal candidate will have 5+ years of experience..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Generic—sounds like every other JD.", "No company or role specifics.", "Buzzy words (dynamic, rockstar) instead of clarity."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Draft a job description. Role: [TITLE]. Company: [NAME]—[WHAT WE DO]. Responsibilities: [3–5]. Must-haves: [3–5]. Nice-to-haves: [2–3]. Tone: direct, no buzzwords. Include: who we are, what the role does, what we offer. 300 words max.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "[Company] is [one-liner]. We are hiring a [Role] to [primary outcome]. You will: [responsibilities]. You have: [must-haves]. Bonus: [nice-to-haves]. We offer: [benefits/culture]. Apply: [CTA]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "JD for [ROLE]. Company: [NAME], [CONTEXT]. Responsibilities: [LIST]. Must-haves: [LIST]. Avoid: 'rockstar,' 'ninja,' 'guru,' 'dynamic.' Add: 3 interview questions we will ask. Output: JD + questions.", what_changed: "Anti-buzzwords, interview questions included." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Job post", prompt: "Job description. Role: [TITLE]. Company: [ONE-LINER]. Responsibilities: [LIST]. Must-haves: [LIST]. 250 words. No buzzwords. Include CTA." },
            { title: "Interview questions", prompt: "10 interview questions for [ROLE]. Mix: experience, behavior, skill. Include 2 'red flag' questions. Output: question + what to listen for." },
            { title: "Feedback script", prompt: "Feedback script for [SITUATION: e.g. missed deadline]. Tone: direct, kind. Structure: observation, impact, ask. 5–6 sentences." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "JD/Interview/Feedback: [TYPE]. Role/Context: [DETAILS]. Output: [FORMAT]. Tone: direct, no buzzwords. [LENGTH].", notes: "Specify type: job post, interview Qs, or feedback." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a role you are hiring for.", "List responsibilities and must-haves.", "Prompt for JD with company context.", "Prompt for 5 interview questions. Refine."], task: "Draft one JD and one set of interview questions." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create a full hiring pack: JD + 8 interview questions (mix of experience, behavior, skills). Use or adapt for a real role.", hint: "Add 'What would make us not hire someone?' to get red-flag questions." }),
        sec("CBM-14_CHECKLIST", { items: ["I include role, company, responsibilities, must-haves.", "I avoid buzzwords in the brief.", "I request interview questions when hiring.", "I use feedback scripts for tough conversations."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Specifics make JDs and interview prep useful.", "Ban buzzwords for clearer, more honest copy.", "Feedback scripts (observation, impact, ask) keep conversations productive."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hiring content needs specifics and no buzzwords—AI drafts get you 80% there." })
      ]
    },

    {
      title: "Write a Meeting Summary",
      slug: "write-a-meeting-summary",
      goal: "Use ChatGPT to turn meeting notes into clear, actionable summaries.",
      summary: "Paste notes or a transcript and get a structured summary: decisions, action items, owners, open questions.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M3-L8", title: "Write a Meeting Summary", time: "10–12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will turn messy meeting notes into clean summaries with decisions, action items, and owners.", real_world: "Teams that share summaries get better follow-through and alignment." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Client calls, internal meetings, 1:1s, workshops.", tags: ["Meetings", "Productivity", "Communication"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Meeting notes or transcript", "Attendees and meeting type", "Any specific format (decisions first, action items table, etc.)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Summarize these notes." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "The meeting covered various topics including..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No notes provided in prompt.", "No structure requested—vague summary.", "No action items or owners."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Turn these meeting notes into a summary. Format: 1) Decisions made, 2) Action items (owner, due date, task), 3) Open questions. Keep it scannable. Notes: [PASTE NOTES].", framework_used: "Structure + Paste" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Decisions: [List]. Action items: | Owner | Task | Due |. Open questions: [List]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Meeting summary. Notes: [PASTE]. Output: Decisions (bullets), Action items (table: Owner | Task | Due), Open questions (bullets), Next meeting (if any). Neutral tone. Under 300 words.", what_changed: "Table for actions, next meeting, word limit." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Client call", prompt: "Client call summary. Notes: [PASTE]. Sections: What we discussed, What they need, Next steps, Owner. Professional tone." },
            { title: "1:1", prompt: "1:1 summary. Notes: [PASTE]. Format: Wins, Blockers, Action items (who, what, when). Private—do not share without review." },
            { title: "Workshop", prompt: "Workshop summary. Notes: [PASTE]. Sections: Key takeaways, Decisions, Action items, Follow-up. 200 words max." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Meeting summary. Notes: [PASTE]. Format: Decisions, Action items (Owner | Task | Due), Open questions. Tone: neutral. [LENGTH].", notes: "Always include owner for action items." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Take notes in your next meeting (or use past notes).", "Paste into a summary prompt with structure.", "Edit for accuracy and share.", "Add owners and due dates if missing."], task: "Summarize 2 meetings this week using this prompt." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Summarize a recent meeting. Send to attendees and ask: 'Anything missing or wrong?' Use feedback to refine the prompt.", hint: "Add 'Assume owner is [NAME] if not stated' when it's a 1:1." }),
        sec("CBM-14_CHECKLIST", { items: ["I paste full notes or key points.", "I request Decisions, Action items, Open questions.", "I include owner and due date for each action.", "I review before sharing."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Structure (decisions, actions, questions) makes summaries useful.", "Action items need owners and due dates.", "Summaries improve follow-through and accountability."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Summaries need structure: decisions, action items with owners, and open questions." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 4 — Offer + Niche + Funnel Strategy
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Offer + Niche + Funnel Strategy",
  slug: "m4-offer-niche-funnel-strategy",
  lessons: [

    {
      title: "Pick a Niche",
      slug: "pick-a-niche",
      goal: "Use ChatGPT to explore and narrow niche options based on your skills, demand, and competition.",
      summary: "Get a list of potential niches, then evaluate them for fit, demand, and differentiation.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M4-L1", title: "Pick a Niche", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will shortlist 3–5 niche options with a clear rationale for fit, demand, and opportunity.", real_world: "Focused niches convert better and command higher prices than 'everyone.'" }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Starting a business, pivoting, launching a new offer, content strategy.", tags: ["Niche", "Strategy", "Positioning"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Your skills and experience", "Problems you can solve", "Your constraints (time, capital, interest)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "What niche should I pick?" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Consider your passion, skills, and market demand. Some popular niches include..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personal context.", "Generic advice.", "No evaluation framework."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I have skills in [X] and experience with [Y]. I want to serve [B2B/B2C]. Generate 8 niche options. For each: niche, why it fits me, demand signal, competition level (low/med/high). Output as table. Rank top 3.", framework_used: "Skills + Context + Evaluation" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Niche | Fit | Demand | Competition |\n| HR for startups | Your ops background | Hiring pain high | Med |\n| ... | ... | ... | ... |\n\nTop 3: 1) X, 2) Y, 3) Z." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Niche options. Skills: [X]. Experience: [Y]. Prefer: [B2B/B2C, industry]. Generate 10 niches. Table: Niche | Fit | Demand | Competition | First offer idea. Add: 'Avoid' list (3 niches that look good but are traps).", what_changed: "First offer idea, avoid list." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Skill-to-niche", prompt: "I am skilled at [X]. List 10 niche markets that value this. Table: Niche | Why they pay | Competition. Rank by opportunity." },
            { title: "Problem-to-niche", prompt: "Problem: [X]. Who has it worst? List 5 niche segments (specific industries/roles). Table: Segment | Pain intensity | Willingness to pay." },
            { title: "Narrow down", prompt: "I am considering [NICHE A] vs [NICHE B]. Compare: fit for me, demand, competition, speed to first dollar. Recommend one with 3 reasons." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Niche options. Skills: [X]. Experience: [Y]. Context: [B2B/B2C, etc]. Output: [N] options. Table: Niche | Fit | Demand | Competition. Rank top 3.", notes: "Include why each fits you." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List your top 3 skills and 2 experiences.", "Prompt for 8 niche options in table format.", "Evaluate top 3: which feels right?", "Pick one and define it in one sentence."], task: "Get 8 options, shortlist 3, pick 1 with a clear definition." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Pick a niche. Define it in one sentence. Then prompt: 'What are 3 ways to validate this niche before going all in?' Act on one.", hint: "Validation might be: surveys, paid test, content test." }),
        sec("CBM-14_CHECKLIST", { items: ["I include my skills and experience.", "I request evaluation (fit, demand, competition).", "I shortlist and pick one.", "I define my niche in one sentence."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Niche options need fit, demand, and competition evaluation.", "Table format helps compare quickly.", "Validation before full commitment saves time."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Niche = skills + problem + segment. Evaluate, pick one, validate." })
      ]
    },

    {
      title: "Generate Product Ideas",
      slug: "generate-product-ideas",
      goal: "Use ChatGPT to brainstorm product ideas that fit your niche and audience.",
      summary: "Generate product ideas (courses, templates, consulting, digital products) and evaluate them for viability.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M4-L2", title: "Generate Product Ideas", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have 10+ product ideas mapped to your niche, with a shortlist of the most viable.", real_world: "Product ideas that solve a specific pain for a specific audience sell." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "New offer creation, product expansion, course planning, digital product launches.", tags: ["Products", "Offers", "Ideation"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Your niche and audience", "Their main problems", "Product type (course, template, service, etc.)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me product ideas." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "You could create a course, an eBook, a template pack, a membership..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No niche or audience.", "Generic ideas.", "No evaluation."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Niche: [NICHE]. Audience: [WHO]. Problem: [PAIN]. Generate 10 product ideas (mix: course, template, 1:1, done-for-you). For each: product, one-liner, price range, build effort (low/med/high). Output as table. Mark top 3.", framework_used: "Niche + Problem + Mix" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Product | One-liner | Price | Effort |\n| Mini-course on X | Get from A to B in 5 steps | $97 | Low |\n| Template pack | Done-for-you X templates | $47 | Low |\n| 1:1 audit | We analyze and fix your X | $500 | Med |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Product ideas. Niche: [NICHE]. Audience: [WHO]. Pain: [PAIN]. Types: course, template, service, cohort. Generate 12. Table: Product | One-liner | Price | Effort | First validation step. Add: recommended lead product and why.", what_changed: "Validation step, lead product recommendation." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Course ideas", prompt: "Course ideas for [NICHE] audience. Problem: [PAIN]. Generate 10. Table: Course title | Outcome | Modules (3–5) | Price range." },
            { title: "Template ideas", prompt: "Template product ideas for [NICHE]. Audience: [WHO]. Generate 10. Table: Template | Use case | Price | Effort to build." },
            { title: "Service packages", prompt: "Service package ideas. Niche: [NICHE]. Audience: [WHO]. Mix: audit, done-with-you, done-for-you. Table: Package | Deliverable | Price | Duration." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Product ideas. Niche: [NICHE]. Audience: [WHO]. Pain: [PAIN]. Types: [COURSE/TEMPLATE/SERVICE]. Output: [N] ideas. Table: Product | One-liner | Price | Effort.", notes: "Add validation step for top picks." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche, audience, and main pain.", "Prompt for 10 product ideas in table.", "Pick top 3 by fit and effort.", "Define one validation step for your favorite."], task: "Generate 10 ideas, shortlist 3, validate 1." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Pick one product idea. Prompt for: 'What would a $X version vs $Y version include?' Create a good-better-best structure.", hint: "Good = entry, Better = core, Best = premium or done-with-you." }),
        sec("CBM-14_CHECKLIST", { items: ["I include niche, audience, and pain.", "I request a mix of product types.", "I evaluate by effort and price.", "I define a validation step for top ideas."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Product ideas need niche and pain alignment.", "Mix formats (course, template, service) expands options.", "Validation and good-better-best structure improve viability."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Products that solve a specific pain for a specific niche sell." })
      ]
    },

    {
      title: "Generate Online Funnel Ideas",
      slug: "generate-online-funnel-ideas",
      goal: "Use ChatGPT to brainstorm funnel structures: lead magnet → nurture → offer.",
      summary: "Map funnel ideas from top-of-funnel (awareness) to bottom (sale). Get concrete lead magnet and offer combos.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M4-L3", title: "Generate Online Funnel Ideas", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have 5+ funnel ideas with lead magnets, nurture path, and paid offer clearly mapped.", real_world: "Funnels that match audience stage convert 2–3x better than one-size-fits-all." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Launching a course, webinar, coaching, or digital product. Planning lead gen and conversion path.", tags: ["Funnel", "Lead magnet", "Conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche and audience", "Main offer (product or service)", "Audience awareness level (cold, warm, hot)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Design a funnel for me." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "A typical funnel includes awareness, interest, desire, action. You could use a lead magnet..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No offer or audience.", "Generic funnel theory.", "Nothing to implement."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Niche: [NICHE]. Offer: [PRODUCT] at $[PRICE]. Audience: [WHO], mostly cold. Generate 5 funnel ideas. For each: lead magnet, nurture (3 emails or steps), offer. Output as table. Mark the best fit.", framework_used: "Niche + Offer + Structure" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Lead magnet | Nurture | Offer |\n| Checklist: X | Email 1: problem, Email 2: solution, Email 3: proof | $X course |\n| Mini-guide: Y | ... | ... |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Funnel ideas. Niche: [NICHE]. Offer: [PRODUCT], $[PRICE]. Audience: [WHO], awareness: [COLD/WARM]. Output: 5 funnels. Each: lead magnet, 3 nurture steps, offer, objection to address. Table format. Recommend one.", what_changed: "Objection handling, recommendation." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Lead magnet ideas", prompt: "Lead magnet ideas for [NICHE]. Audience: [WHO]. Offer: [PRODUCT]. Generate 10. Table: Lead magnet | Format | Why it converts | Effort." },
            { title: "Nurture sequence", prompt: "5-email nurture sequence. Audience: [WHO]. Lead magnet: [X]. Offer: [Y]. Goal: convert to [OFFER]. Outline: subject + goal per email." },
            { title: "Webinar funnel", prompt: "Webinar funnel. Topic: [X]. Audience: [WHO]. Offer: [Y]. Outline: landing page hook, webinar structure (5 parts), offer moment, objection handlers." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Funnel ideas. Niche: [NICHE]. Offer: [PRODUCT], $[PRICE]. Audience: [WHO]. Output: [N] funnels. Each: lead magnet, nurture, offer. Table.", notes: "Match lead magnet to offer—same outcome path." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche, offer, and audience.", "Prompt for 5 funnel ideas.", "Pick one: lead magnet + 3 nurture steps + offer.", "Sketch the flow on paper or in a doc."], task: "Map one full funnel from lead magnet to offer." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Build one funnel: name the lead magnet, write the 3 nurture email subjects, and define the offer moment. Use ChatGPT to draft email 1.", hint: "Email 1 = problem agitate, tease solution. Email 2 = solution + proof. Email 3 = offer + urgency." }),
        sec("CBM-14_CHECKLIST", { items: ["I include niche, offer, and audience.", "I map lead magnet → nurture → offer.", "I ensure lead magnet connects to offer.", "I define objection handlers for the offer."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Funnels = lead magnet + nurture + offer.", "Lead magnet should lead naturally to the offer.", "Nurture sequence addresses problem, solution, proof, then offer."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Funnel = lead magnet that qualifies, nurture that builds trust, offer that converts." })
      ]
    },

    {
      title: "Funnel Map LeadMagnet to Upsell",
      slug: "funnel-map-leadmagnet-to-upsell",
      goal: "Map a complete funnel: lead magnet, core offer, and upsell path.",
      summary: "Design a full path from free lead magnet to paid offer to upsell. Maximize customer value.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M4-L4", title: "Funnel Map LeadMagnet to Upsell", time: "12–15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have a funnel map from lead magnet through core offer to upsell, with clear logic for each step.", real_world: "Upsells can add 20–50% to average order value when they fit the journey." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Course launches, product bundles, coaching + group + 1:1, webinar + course + high-ticket.", tags: ["Funnel", "Upsell", "Revenue"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Lead magnet and core offer", "Potential upsell (or need to generate one)", "Audience and price range"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Add an upsell to my funnel." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "You could add a workbook, a coaching call, or a premium upgrade..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No funnel context.", "Generic upsell ideas.", "No connection to core offer."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Funnel: Lead magnet = [X]. Core offer = [Y] at $[PRICE]. Audience: [WHO]. Generate 5 upsell ideas that make sense right after purchase. For each: upsell, price, why it fits, when to offer (checkout, email 2, etc). Table.", framework_used: "Funnel context + Logic" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Upsell | Price | Fit | When |\n| Implementation call | $197 | They have the system, need help applying | Checkout |\n| Template pack | $47 | Extends core offer | Email 2 post-purchase |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Funnel map. Lead magnet: [X]. Core: [Y] $[PRICE]. Audience: [WHO]. Output: 1) Funnel diagram (text), 2) 5 upsell options with price + fit + timing, 3) One order bump (checkout) + one post-purchase upsell. Explain logic.", what_changed: "Full map, order bump + upsell, logic." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Order bump", prompt: "Order bump for [CORE OFFER]. Price: $[X]. Generate 5 options. Table: Bump | Price | Why at checkout." },
            { title: "Post-purchase upsell", prompt: "Post-purchase upsell for [CORE OFFER]. Buyer just got [X]. Generate 5 upsells. Table: Upsell | Price | Timing (email/day) | Angle." },
            { title: "Full funnel", prompt: "Map full funnel. Lead: [X]. Core: [Y]. Upsell: [Z]. Output: step-by-step flow with trigger, page, email, offer at each step." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Funnel: Lead [X], Core [Y], Upsell? Output: [N] upsell options. Table: Upsell | Price | Fit | When. [Order bump option if needed].", notes: "Upsell must extend core offer value." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Write: lead magnet, core offer, audience.", "Prompt for 5 upsell options with fit and timing.", "Pick one order bump and one upsell.", "Map the flow: lead → core → bump → upsell."], task: "Map your funnel with one bump and one upsell." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Design a full funnel: lead magnet → core offer → order bump → 48hr upsell email. Write the upsell email subject and 2-sentence angle.", hint: "Upsell email = 'You got X. Here is the next step to get Y.'" }),
        sec("CBM-14_CHECKLIST", { items: ["I map lead magnet → core → upsell.", "I ensure upsell fits the buyer journey.", "I define when to offer (checkout vs email).", "I have an order bump and one upsell."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Upsells should extend core offer value, not random add-ons.", "Order bumps work at checkout; upsells work in email.", "Timing and fit matter more than quantity."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Upsells that extend the core offer and fit the journey increase AOV." })
      ]
    },

    {
      title: "Messaging Pain to Benefit to Proof",
      slug: "messaging-pain-to-benefit-to-proof",
      goal: "Use ChatGPT to craft messaging that moves from pain → benefit → proof.",
      summary: "Structure your copy and offers around the Pain-Benefit-Proof framework for stronger conversion.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M4-L5", title: "Messaging Pain to Benefit to Proof", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will write and structure messaging using Pain → Benefit → Proof for higher conversion.", real_world: "Copy that names pain, shows benefit, and backs with proof converts 2–3x better." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Sales pages, emails, ads, webinar scripts, landing pages.", tags: ["Copy", "Messaging", "Conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Target audience and their pain", "Your solution and benefit", "Proof points (results, testimonials, data)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write sales copy for my product." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Introducing the best solution for your needs. Our product helps you achieve your goals. Join thousands of satisfied customers..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No pain, benefit, or proof.", "Generic hype.", "No structure."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Messaging using Pain → Benefit → Proof. Product: [PRODUCT]. Audience: [WHO]. Pain: [PAIN]. Benefit: [OUTCOME]. Proof: [TESTIMONIAL/RESULT/DATA]. Output: 3 pain bullets, 3 benefit bullets, 3 proof bullets. Then one 2-sentence headline that weaves all three.", framework_used: "Pain-Benefit-Proof" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Pain: [3 bullets]. Benefit: [3 bullets]. Proof: [3 bullets]. Headline: [Pain]? [Product] helps you [Benefit]—[Proof]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Pain-Benefit-Proof for [PRODUCT]. Audience: [WHO]. Pain: [X]. Benefit: [Y]. Proof: [Z]. Output: 5 pain bullets, 5 benefit bullets, 5 proof bullets. Add: 3 headlines (pain-led, benefit-led, proof-led). Add: one objection + counter.", what_changed: "More bullets, headline variants, objection handling." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Pain bullets", prompt: "10 pain point bullets for [AUDIENCE] regarding [PROBLEM]. First-person or 'you' phrasing. Mix emotional and practical. Use in ads or emails." },
            { title: "Benefit bullets", prompt: "10 benefit bullets for [PRODUCT]. Audience: [WHO]. Outcome-focused. Avoid features—focus on results. Before/after style where possible." },
            { title: "Proof bullets", prompt: "Proof formats for [PRODUCT]. I have: [TESTIMONIALS/RESULTS/CREDENTIALS]. Turn into 5 proof bullets. Mix: quote, number, credential." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Pain-Benefit-Proof. Product: [X]. Audience: [Y]. Pain: [Z]. Benefit: [A]. Proof: [B]. Output: pain bullets, benefit bullets, proof bullets, headline.", notes: "Lead with pain in cold traffic, benefit in warm." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List: audience, pain, benefit, proof.", "Prompt for pain, benefit, proof bullets.", "Request one headline weaving all three.", "Use in a real email or page."], task: "Create one Pain-Benefit-Proof set and use it somewhere." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a short sales email (5–6 sentences) using Pain → Benefit → Proof. Test it. Track opens/clicks.", hint: "Open with pain. Middle = benefit. End = proof + CTA." }),
        sec("CBM-14_CHECKLIST", { items: ["I include pain, benefit, and proof in the brief.", "I get bullets for each.", "I craft a headline that weaves all three.", "I use the structure in real copy."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Pain → Benefit → Proof is a proven conversion structure.", "Bullets for each create reusable messaging blocks.", "Headlines that weave all three perform best."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Structure copy: pain first, benefit second, proof third." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 5 — Funnel Copy Pages
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Funnel Copy Pages",
  slug: "m5-funnel-copy-pages",
  lessons: [

    {
      title: "Write a Landing Page OptIn Webinar",
      slug: "write-landing-page-optin-webinar",
      goal: "Use ChatGPT to draft webinar registration landing page copy: hook, benefits, and CTA.",
      summary: "Get conversion-focused copy for opt-in webinar pages. Structure: headline, subhead, benefits, social proof, CTA.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M5-L1", title: "Write a Landing Page OptIn Webinar", time: "12–15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have draft landing page copy for a webinar opt-in that converts visitors to registrants.", real_world: "Clear benefit-led headlines and strong CTAs can double registration rates." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Webinar launches, live training sign-ups, free workshop pages.", tags: ["Landing page", "Webinar", "Opt-in"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Webinar topic and outcome", "Target audience and pain", "Date, time, format (live/replay)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a webinar landing page." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Join our webinar! We will cover important topics. Register now to secure your spot..." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or outcome.", "Generic CTA.", "No benefit or urgency."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Webinar landing page copy. Topic: [TOPIC]. Outcome: [WHAT THEY GET]. Audience: [WHO]. Pain: [PAIN]. Date: [DATE]. Output: headline (1 line), subhead (1–2 lines), 4 benefit bullets, CTA button text, one urgency line.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: How to [OUTCOME] Without [PAIN]. Subhead: In this free [X]-minute webinar, you will [BENEFIT 1], [BENEFIT 2], [BENEFIT 3]. Benefits: [4 bullets]. CTA: Reserve My Spot. Urgency: Limited to [X] live attendees." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Webinar page. Topic: [X]. Outcome: [Y]. Audience: [Z]. Pain: [P]. Date: [D]. Output: 3 headline options, 1 subhead, 5 benefits, CTA + 2 alternates, FAQ (3 Qs). Add: one objection and counter.", what_changed: "Headline options, FAQ, objection handler." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Headline options", prompt: "10 webinar landing page headlines. Topic: [X]. Outcome: [Y]. Audience: [Z]. Mix: outcome-led, pain-led, curiosity. One line each." },
            { title: "Benefits section", prompt: "5 benefit bullets for webinar. Topic: [X]. Outcome: [Y]. Audience: [Z]. Start each with 'You will' or 'Discover'. Action-oriented." },
            { title: "Full page", prompt: "Full webinar page copy. [TOPIC], [OUTCOME], [AUDIENCE], [DATE]. Sections: headline, subhead, benefits, who it's for, CTA, FAQ (3). 400 words max." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Webinar page. Topic: [X]. Outcome: [Y]. Audience: [Z]. Pain: [P]. Date: [D]. Output: headline, subhead, benefits, CTA, urgency.", notes: "Lead with outcome, not topic." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define topic, outcome, audience, pain, date.", "Prompt for headline, subhead, benefits, CTA.", "Edit for your voice.", "Add to your page builder."], task: "Draft one webinar landing page and publish or refine." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a full webinar page (headline to CTA). A/B test two headlines. Track which gets more registrations.", hint: "Get 3 headline options and pick the top 2 to test." }),
        sec("CBM-14_CHECKLIST", { items: ["I include topic, outcome, audience, pain.", "I request headline, subhead, benefits, CTA.", "I add urgency or scarcity where appropriate.", "I keep CTA above the fold."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Outcome-led headlines outperform topic-led.", "Benefit bullets should be concrete and action-oriented.", "CTA + urgency improve conversion."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Webinar pages: outcome headline, benefit bullets, strong CTA, and urgency." })
      ]
    },

    {
      title: "Write a Sales Page",
      slug: "write-a-sales-page",
      goal: "Use ChatGPT to draft sales page copy: headline, pain/benefit/proof, offer, and CTA.",
      summary: "Get full sales page structure and copy. Use Pain-Benefit-Proof and clear offer presentation.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M5-L2", title: "Write a Sales Page", time: "15–20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have draft sales page copy with headline, problem, solution, proof, offer, and CTA.", real_world: "Structured sales pages with clear offer and proof convert 2–3x better than feature dumps." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Course sales, digital product launches, coaching packages, service sales.", tags: ["Sales page", "Conversion", "Copy"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product and price", "Target audience and pain", "Benefits, proof, guarantee"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a sales page for my course." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Welcome to our amazing course! You will learn everything you need. Our students love it. Enroll now!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No product or audience details.", "No structure (headline, problem, solution, proof).", "Generic hype."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Sales page copy. Product: [NAME]—[ONE-LINER]. Price: $[X]. Audience: [WHO]. Pain: [PAIN]. Benefit: [OUTCOME]. Proof: [TESTIMONIAL/RESULT]. Sections: headline, problem (3 bullets), solution (3 bullets), proof (2–3), offer (what they get, price, guarantee), CTA. 500 words max.", framework_used: "Pain-Benefit-Proof + Offer" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: [Outcome] Without [Pain]. Problem: [3 bullets]. Solution: [3 bullets]. Proof: [2–3]. Offer: [What's included], $[X], [Guarantee]. CTA: [Get Access / Enroll Now]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Sales page. Product: [X], $[PRICE]. Audience: [Y]. Pain-Benefit-Proof: [DETAILS]. Output: headline, problem section, solution section, proof section, offer (modules/features), guarantee, FAQ (5), CTA. Add: one objection + counter. 600 words.", what_changed: "FAQ, objection, fuller structure." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Headline + subhead", prompt: "5 headline + subhead pairs for sales page. Product: [X]. Audience: [Y]. Pain: [Z]. Mix: pain-led, benefit-led, proof-led." },
            { title: "Offer section", prompt: "Offer section copy. Product: [X]. Include: [MODULES/FEATURES]. Price: $[Y]. Guarantee: [Z]. Format: what you get (bullets), price, guarantee, CTA." },
            { title: "FAQ", prompt: "5 FAQ for sales page. Product: [X]. Audience: [Y]. Common objections: [LIST]. Output: Q + A. 2–3 sentences per answer." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Sales page. Product: [X], $[PRICE]. Audience: [Y]. Pain: [Z]. Benefit: [A]. Proof: [B]. Sections: headline, problem, solution, proof, offer, CTA.", notes: "Keep sections scannable with bullets." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Gather: product, price, audience, pain, benefit, proof.", "Prompt for full structure.", "Edit each section for accuracy and voice.", "Add real testimonials and proof."], task: "Draft one sales page and refine for launch." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a full sales page. Get 3 headline options and test one against your current page. Track conversion.", hint: "Run a small ad test to the two headlines if possible." }),
        sec("CBM-14_CHECKLIST", { items: ["I include product, price, audience, pain, benefit, proof.", "I use Pain-Benefit-Proof structure.", "I have clear offer and guarantee.", "I add FAQ for objections."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Sales pages need: headline, problem, solution, proof, offer, CTA.", "Pain-Benefit-Proof drives emotional and logical buy-in.", "FAQ addresses objections and reduces friction."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Sales page = headline, pain, solution, proof, offer, guarantee, CTA." })
      ]
    },

    {
      title: "Write an Order Bump Copy",
      slug: "write-an-order-bump-copy",
      goal: "Use ChatGPT to draft order bump offers and copy for checkout.",
      summary: "Create a low-friction add-on offer and copy that converts at checkout.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M5-L3", title: "Write an Order Bump Copy", time: "10–12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have order bump copy that clearly explains the add-on and converts at checkout.", real_world: "Well-positioned order bumps can add 10–30% to average order value." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Checkout page, cart, purchase confirmation. Add-on to core offer.", tags: ["Order bump", "Checkout", "Upsell"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Core offer they are buying", "Order bump (product or service)", "Price and one clear benefit"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write order bump copy." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Add this to your order for an extra fee. Great value!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No core offer or bump details.", "Vague benefit.", "No urgency or logic."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Order bump copy. Core offer: [X]. Bump: [Y] at $[PRICE]. Benefit: [ONE SENTENCE]. Output: headline (1 line), benefit (2–3 lines), price display, checkbox label. Keep under 50 words total. Checkout style.", framework_used: "Core + Bump + Benefit" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: Add [Bump] for $[X]. Benefit: [Why it pairs with core—e.g. Get the templates that make [core] 10x easier]. Label: Yes, add [Bump] for $[X]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Order bump. Core: [X]. Bump: [Y], $[PRICE]. Benefit: [Z]. Output: 3 headline options, 2 benefit lines, checkbox label. Add: one objection (e.g. 'I have enough') + 1-line counter.", what_changed: "Options, objection counter." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Template bump", prompt: "Order bump: [TEMPLATE PACK] for $[X]. Core: [COURSE]. Benefit: ready-to-use, saves hours. Output: headline, 2 benefit lines, label." },
            { title: "Coaching bump", prompt: "Order bump: 1:1 call for $[X]. Core: [PRODUCT]. Benefit: personalized implementation. Output: headline, benefit, label. Urgency: limited spots." },
            { title: "Bundle bump", prompt: "Order bump: [ADD-ON] for $[X]. Core: [PRODUCT]. Discount: $[Y] off if added now. Output: headline, benefit, label." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Order bump. Core: [X]. Bump: [Y], $[PRICE]. Benefit: [Z]. Output: headline, benefit, checkbox label. Under 50 words.", notes: "Benefit must tie directly to core offer." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define core offer and bump.", "Write benefit (why add it now).", "Prompt for headline, benefit, label.", "Add to checkout. Test."], task: "Create one order bump and add it to a real checkout." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add an order bump to your next launch. Track bump rate. If under 10%, refine copy (clearer benefit, better headline).", hint: "A/B test two benefit angles." }),
        sec("CBM-14_CHECKLIST", { items: ["I tie bump benefit to core offer.", "I keep copy under 50 words.", "I use a clear checkbox label.", "I test and track bump rate."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Order bumps work when benefit ties to core offer.", "Short copy converts better at checkout.", "Track bump rate and refine."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Order bump = clear benefit tied to core offer, short copy, strong label." })
      ]
    },

    {
      title: "Write an Upsell Page",
      slug: "write-an-upsell-page",
      goal: "Use ChatGPT to draft post-purchase upsell page copy.",
      summary: "Create copy for a one-click upsell or upsell page after the initial purchase.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M5-L4", title: "Write an Upsell Page", time: "12–15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have upsell page copy that builds on the purchase and converts buyers to a higher-value add-on.", real_world: "Post-purchase upsells convert 15–25% when the offer clearly extends what they just bought." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Thank-you page upsell, one-click bump, post-purchase email with upsell link.", tags: ["Upsell", "Conversion", "Revenue"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["What they just bought", "Upsell offer and price", "Why it makes sense now (extension of purchase)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write an upsell page." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Upgrade your purchase! Add this amazing offer for a great price. Limited time!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No context (what they bought).", "Generic pitch.", "No logical connection to purchase."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Upsell page. They just bought: [X]. Upsell: [Y] at $[PRICE]. Logic: [WHY IT FITS NOW]. Output: headline (1 line), bridge (you got X, here is the next step), 3 benefit bullets, price + guarantee, CTA. 150 words max.", framework_used: "Bridge + Benefit + CTA" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: You got [X]. Here is how to [OUTCOME] faster. Bridge: [X] gives you the system. [Y] gives you [IMPLEMENTATION/SUPPORT]. 3 benefits. Price: $[X]. CTA: Yes, Add [Y]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Upsell. Just bought: [X]. Upsell: [Y], $[PRICE]. Bridge: [logic]. Output: headline, bridge (2 sentences), 4 benefits, objection counter, CTA + decline link copy. Add: scarcity if appropriate.", what_changed: "Objection counter, decline copy, scarcity." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "One-click", prompt: "One-click upsell copy. Bought: [X]. Upsell: [Y], $[PRICE]. Output: headline (1 line), benefit (2 lines), CTA. Under 40 words." },
            { title: "Full page", prompt: "Upsell page. Bought: [X]. Upsell: [Y]. Output: headline, bridge, 5 benefits, social proof line, price, CTA, 'No thanks' link copy." },
            { title: "Email upsell", prompt: "Upsell email. Bought: [X] today. Upsell: [Y]. Subject line options (3). Body: 4 sentences. CTA. Friendly tone." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Upsell. Bought: [X]. Upsell: [Y], $[PRICE]. Bridge: [WHY NOW]. Output: headline, bridge, benefits, CTA. 150 words.", notes: "Bridge = connect purchase to upsell." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define: what they bought, what you are upselling.", "Write the bridge (why add this now).", "Prompt for headline, bridge, benefits, CTA.", "Add to thank-you page or email."], task: "Create one upsell page and implement it." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Build an upsell flow: thank-you page → upsell page → yes/no. Track upsell rate. Aim for 15%+.", hint: "The bridge ('you got X, add Y to get Z') is the key." }),
        sec("CBM-14_CHECKLIST", { items: ["I connect upsell to what they just bought.", "I write a clear bridge (why now).", "I keep copy short and scannable.", "I include a clear CTA and decline option."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Upsells need a bridge from purchase to add-on.", "Benefits should extend core offer value.", "Short, benefit-focused copy converts."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Upsell = bridge from purchase + benefits that extend value + clear CTA." })
      ]
    },

    {
      title: "Write a Thank You Page",
      slug: "write-a-thank-you-page",
      goal: "Use ChatGPT to draft thank-you page copy that confirms, delivers next steps, and offers an upsell.",
      summary: "Thank-you pages should confirm the purchase, tell them what happens next, and optionally present an upsell.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M5-L5", title: "Write a Thank You Page", time: "10–12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "You will have thank-you page copy that confirms, sets expectations, and drives next steps (or upsell).", real_world: "Clear next steps reduce support tickets and improve satisfaction." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Post-purchase confirmation, lead magnet delivery, webinar registration confirmation.", tags: ["Thank you", "Confirmation", "Onboarding"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["What they just did (purchase, sign-up, etc.)", "What happens next (email, access, etc.)", "Optional: upsell or CTA"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a thank you page." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Thank you for your purchase! We appreciate your business. Check your email for details." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No product or action context.", "Vague 'check your email.'", "No next steps or upsell."] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Thank-you page. They just: [PURCHASED/SIGNED UP]. Product: [X]. Next steps: [WHAT HAPPENS—e.g. Check email for login, Allow 5 min for delivery]. Optional upsell: [Y] at $[Z]. Output: confirmation headline, 3 next-step bullets, upsell block (if yes), support contact.", framework_used: "Confirm + Next steps + Upsell" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: You are in! [Product] is yours. Next steps: 1) Check your email for login. 2) Allow 5 min for delivery. 3) Join our community [link]. Upsell: Add [Y] for $[Z] to [benefit]. CTA. Questions? [Support link]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Thank-you page. Action: [PURCHASED X / SIGNED UP FOR Y]. Next: [STEPS]. Upsell: [Z], $[PRICE]. Output: headline, 4 next-step bullets, upsell (headline + 2 benefits + CTA), support line. Add: one 'what to do right now' CTA.", what_changed: "Clear first action, fuller upsell block." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Purchase confirmation", prompt: "Thank-you page. Purchased: [X]. Next: [STEPS]. Output: headline, 3 next steps, support. No upsell." },
            { title: "Lead magnet delivery", prompt: "Thank-you page. Signed up for: [LEAD MAGNET]. Delivery: [EMAIL/LINK]. Next: [WHAT TO DO]. Output: headline, delivery note, 2 next-step bullets." },
            { title: "With upsell", prompt: "Thank-you page. Bought: [X]. Next: [STEPS]. Upsell: [Y], $[Z]. Output: confirm, next steps, upsell block, support." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Thank-you page. Action: [X]. Next steps: [LIST]. Upsell: [Y/N]. Output: headline, next steps, [upsell block if yes], support.", notes: "Always include clear next steps." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define: what they did, what happens next.", "Prompt for headline and next steps.", "Add upsell block if you have one.", "Include support/contact info."], task: "Create or improve one thank-you page." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Audit your thank-you page. Add or clarify next steps. If you have an upsell, test its placement (above vs below next steps).", hint: "Next steps first builds trust; upsell can go below or in a separate block." }),
        sec("CBM-14_CHECKLIST", { items: ["I confirm what they did.", "I list clear next steps (3–4).", "I add upsell if relevant.", "I include support/contact."] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Thank-you pages should confirm and set expectations.", "Clear next steps reduce confusion and support load.", "Upsell can sit below next steps for best results."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Thank-you page = confirm, next steps, optional upsell, support." })
      ]
    }

  ]
}

];

module.exports = { MODULES_M1_M5 };
