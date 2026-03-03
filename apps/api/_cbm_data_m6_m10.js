// ChatGPT Business & Marketing Mastery — Modules M6–M10 seed data
// Covers: Email Marketing, Website/E-commerce, SEO Content, Affiliate Marketing, Facebook Marketing

function sec(type, data) { return { type, data }; }

const buildLesson = (opts) => ({
  title: opts.title,
  slug: opts.slug,
  goal: opts.goal || "",
  summary: opts.summary || "",
  sections: opts.sections || [],
});

const MODULES_M6_M10 = [

/* ═══════════════════════════════════════════════════════════════
   MODULE 6 — Email Marketing System
   slug: m6-email-marketing-system
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Email Marketing System",
  slug: "m6-email-marketing-system",
  lessons: [

    /* ── L1: Generate Email Subject Lines ── */
    buildLesson({
      title: "Generate Email Subject Lines",
      slug: "generate-email-subject-lines",
      goal: "Create scroll-stopping subject lines that boost open rates.",
      summary: "Use ChatGPT to generate A/B-tested subject lines for newsletters, promos, and cold outreach.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L1", title: "Generate Email Subject Lines", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 5+ high-converting email subject lines in under 2 minutes.", real_world: "Newsletters see 2–3x higher opens when subject lines are AI-assisted." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Newsletter launches, product promos, abandoned cart emails, cold outreach, event reminders.", tags: ["email", "newsletter", "conversion", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Email topic or product", "Audience (e.g., B2B SaaS buyers)", "Goal (open, click, reply)", "Brand tone (professional, playful, urgent)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write subject lines for my email." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Great Subject Lines\n1. Check this out\n2. Important update\n3. Don't miss this" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No context on product or audience", "Generic results anyone could write", "No variation in length or style", "No emotion or curiosity hooks"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "You are an email copywriter. I need 10 subject lines for a product launch email.\n\nProduct: [Premium project management tool for remote teams]\nAudience: Team leads and project managers at 10–50 person companies\nGoal: Get opens and clicks to the landing page\nTone: Professional but warm, not salesy\n\nProvide 10 options. Mix: curiosity gaps, benefit-led, urgency, and question-based. Keep each under 50 characters. Number them.",
          framework_used: "Role + Context + Constraints"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. Your team is missing this [Curiosity]\n2. 5 minutes to better project visibility [Benefit]\n3. Last chance: early pricing ends Friday [Urgency]\n4. Why top remote teams use [Product] [Social proof]\n5. Still tracking projects in spreadsheets? [Question]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Generate 15 email subject lines for [product/topic]. Audience: [detailed persona]. Include: 5 curiosity-driven, 5 benefit-led, 5 urgency/FOMO. Add A/B test pairs (Option A vs B). Max 45 chars each. Output as a table: Type | Subject | Chars", what_changed: "Structured output + A/B pairs + character limit table" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Newsletter", prompt: "I run a [industry] newsletter. This week's topic: [topic]. Give 8 subject lines that feel personal and intriguing. Mix curiosity and value. Under 50 chars." },
            { title: "Promo", prompt: "Sale email for [product]. Discount: [X%]. Audience: [buyer type]. Give 10 subject lines—mix urgency, scarcity, and benefit. Under 50 chars each." },
            { title: "Cold outreach", prompt: "Cold email to [role] at [company type]. Goal: book a 15-min call. Give 8 subject lines that are specific, not spammy. No clickbait." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "You are an email copywriter. Create [N] subject lines for [email type].\n\nProduct/Topic: [describe]\nAudience: [persona]\nGoal: [open/click/reply]\nTone: [tone]\n\nMix: curiosity, benefit-led, urgency. Max [X] characters each. Number them.", notes: "Swap [N], [email type], [describe], [persona], [tone], [X] for each use." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a real product or newsletter you know", "Fill in the prompt template with that product and audience", "Run it in ChatGPT and copy the top 3 lines", "Check character count in your email tool"], task: "Generate 5 subject lines for one of your actual emails this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Run the same prompt twice with different tones (e.g., playful vs serious). Compare outputs and pick the best 2 from each for A/B testing.", hint: "Add 'Tone A: [X], Tone B: [Y]' and ask for 5 per tone." }),
        sec("CBM-14_CHECKLIST", { items: ["Product/topic and audience defined", "Goal (open/click/reply) clear", "Character limit checked (under 50 for mobile)", "Mix of curiosity, benefit, and urgency", "At least one A/B pair for testing"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["AI subject lines need clear context: product, audience, goal, tone", "Mix curiosity, benefit-led, and urgency for variety", "Keep under 50 characters for mobile", "A/B test pairs increase open rate predictability"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Give ChatGPT product + audience + goal → get scroll-stopping subject lines in seconds." })
      ]
    }),

    /* ── L2: Craft a Sales Email ── */
    buildLesson({
      title: "Craft a Sales Email",
      slug: "craft-a-sales-email",
      goal: "Write persuasive sales emails that convert without sounding pushy.",
      summary: "Use ChatGPT to draft B2B and B2C sales emails with clear structure and a strong CTA.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L2", title: "Craft a Sales Email", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a complete, ready-to-send sales email with hook, proof, offer, and CTA.", real_world: "Sales reps save 40% of writing time with AI-drafted emails." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Outbound sales, follow-ups, product upsells, webinar signups, demo requests.", tags: ["sales", "email", "conversion", "B2B"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/service and main benefit", "Target prospect (role, company size)", "Trigger or reason for reaching out", "One clear CTA"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a sales email for my software." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hi,\n\nWe have great software. It does many things. Would you like to learn more? Let me know.\n\nBest,\n[Name]" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personalization or reason for outreach", "Vague benefits, no proof", "Weak, generic CTA", "Too short, no structure"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a sales email for [Product] targeting [role] at [company type].\n\nProduct benefit: [main outcome, e.g. 'saves 10 hrs/week on project updates']\nReason for outreach: [e.g. they just raised funding / launched a product]\nCTA: Book a 15-min demo\n\nKeep it under 150 words. Structure: 1-sentence hook, 2–3 bullet benefits, social proof (one stat), soft CTA. No hype or pressure.",
          framework_used: "PAS (Problem-Agitate-Solve) + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hi [Name],\n\n[Company] just launched [X]—congrats. Teams like yours usually hit a wall once projects scale. [Product] cuts status-update time by ~10 hrs/week so you can focus on shipping.\n\n• Real-time dashboards so everyone’s aligned\n• One-click updates from Slack\n• 40% less “where are we?” meetings (internal benchmark)\n\nWorth a 15-min look? [Link to calendar]\n\n[Your name]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Write a 3-email sequence for [Product] to [role]. Email 1: value-first intro + CTA. Email 2: case study + ROI. Email 3: last touch, soft close. Each under 120 words. Include subject lines. Tone: consultative, not pushy.", what_changed: "Sequenced nurture, case study, ROI, and subject lines" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "B2B cold", prompt: "B2B cold email to [role] at [industry] company. Product: [X]. Hook: [trigger—e.g. recent news]. CTA: 15-min call. Under 120 words. Consultative tone." },
            { title: "Upsell", prompt: "Upsell email to existing [product] user. Offer: [upgrade/feature]. They already use [Y]. One short paragraph + CTA. Friendly, not salesy." },
            { title: "Webinar", prompt: "Sales email for a webinar: [topic]. Audience: [persona]. CTA: register. Include: 3 takeaways, social proof, urgency. Under 150 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write a sales email for [product] to [role] at [company type].\n\nMain benefit: [outcome]\nReason for outreach: [trigger]\nCTA: [action]\n\nStructure: hook, 2–3 bullets, one proof point, CTA. Under 150 words. Tone: [consultative/professional/warm]." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define one product and one target persona", "Choose a trigger (funding, launch, pain point)", "Run the prompt and paste into your email client", "Replace [Name] and add a personalization line"], task: "Draft and send one sales email to a real prospect this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a 2-email follow-up sequence. Email 1: no reply after 5 days. Email 2: last try, different angle.", hint: "Use 'assume no response to first email' in the prompt." }),
        sec("CBM-14_CHECKLIST", { items: ["Clear hook tied to prospect’s world", "2–3 concrete benefits", "One proof point (stat, case, testimonial)", "Single, specific CTA", "Under 150 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Sales emails need a reason for outreach and a clear CTA", "Short bullets outperform long paragraphs", "Social proof increases reply rates", "Consultative tone beats hype"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook + bullets + proof + one CTA = sales email that converts." })
      ]
    }),

    /* ── L3: Write an Onboarding Email ── */
    buildLesson({
      title: "Write an Onboarding Email",
      slug: "write-an-onboarding-email",
      goal: "Create welcome/onboarding emails that activate new users quickly.",
      summary: "Use ChatGPT to draft onboarding sequences that drive first actions and reduce churn.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L3", title: "Write an Onboarding Email", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft a 3-email onboarding sequence that gets users to their first win.", real_world: "Good onboarding emails improve activation by 20–30%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "SaaS signups, app downloads, course enrollments, membership starts.", tags: ["onboarding", "activation", "email", "retention"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/app name and core value", "First key action (e.g., complete profile)", "3–5 steps to first success", "Support resources (help docs, video)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write onboarding emails." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Welcome! Thanks for signing up. Let us know if you need help." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No structure or sequence", "No clear first action", "Generic, no product context", "No next steps or resources"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create a 3-email onboarding sequence for [Product], a [type of product].\n\nProduct: [1-sentence description]\nFirst key action: [e.g. complete your first project]\nSteps to first win: 1. [X] 2. [Y] 3. [Z]\n\nEmail 1 (immediate): Welcome + one immediate action. Email 2 (Day 2): Push step 2, add tip. Email 3 (Day 5): Push step 3, offer help/support link.\n\nEach under 100 words. Subject lines included. Tone: friendly, encouraging.",
          framework_used: "Action-first + progressive reveal"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Email 1: Welcome! Your first step: Create a project in 60 seconds → [Link]\nEmail 2: Ready for step 2? Add your first task and assign it.\nEmail 3: Almost there—complete your first project and see the dashboard light up." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "5-email onboarding for [Product]. Map to days 0, 1, 3, 5, 7. Include: milestone celebration, tips, support links, and soft upsell in email 5. Subject lines + preview text. Under 80 words per email.", what_changed: "Longer sequence, milestone framing, preview text" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "SaaS", prompt: "3-email onboarding for [SaaS product]. First action: [X]. Steps: [1,2,3]. Include subject lines. Under 100 words each. Friendly." },
            { title: "Course", prompt: "3-email course onboarding. Course: [name]. Module 1 action: [X]. Emails: Day 0 welcome, Day 1 start Module 1, Day 3 checkpoint. Encouraging tone." },
            { title: "App", prompt: "3-email app onboarding. App: [name]. First win: [e.g. send first message]. Emails: immediate, 24h, 72h. Push one action per email." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Create a [N]-email onboarding sequence for [product].\n\nFirst key action: [X]\nSteps: 1. [A] 2. [B] 3. [C]\n\nTiming: [e.g. immediate, Day 2, Day 5]. Include subject lines. Under 100 words each. Tone: friendly, action-focused." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List your product’s 3 steps to first success", "Fill the prompt with those steps", "Copy output into your email tool", "Add your logo and links"], task: "Draft one onboarding sequence for a product you use." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add a “stuck?” email for users who don’t complete step 1 within 48 hours. Soft, helpful, not pushy.", hint: "Prompt: 'Email for users who signed up but didn't do [action]. Offer help, FAQ link.'" }),
        sec("CBM-14_CHECKLIST", { items: ["One clear action per email", "Progressive steps (1 → 2 → 3)", "Subject lines included", "Support/help link in at least one email", "Under 100 words each"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Onboarding emails should drive one action at a time", "Short, focused emails outperform long guides", "Day 0, 2, 5 timing works for most products", "Include a support path for stuck users"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "One action per email, one win in 7 days—that’s onboarding that sticks." })
      ]
    }),

    /* ── L4: Write a Customer Welcome Email ── */
    buildLesson({
      title: "Write a Customer Welcome Email",
      slug: "write-a-customer-welcome-email",
      goal: "Create post-purchase welcome emails that build loyalty and drive referrals.",
      summary: "Use ChatGPT to draft welcome emails after a purchase or signup.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L4", title: "Write a Customer Welcome Email", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write a warm, actionable welcome email that sets expectations and drives next steps.", real_world: "Welcome emails have 4x higher open rates than standard newsletters." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "E-commerce order confirmation, SaaS subscription start, event registration, download/lead magnet.", tags: ["welcome", "post-purchase", "email", "loyalty"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product or service purchased", "What happens next (delivery, access, etc.)", "One secondary CTA (review, referral, social)", "Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a welcome email for customers." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Thanks for your order. We will ship it soon. Have a nice day." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personality or warmth", "Missing next steps or timeline", "No secondary CTA", "Feels like a receipt, not a welcome"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a post-purchase welcome email for [Product/Service].\n\nProduct: [e.g. Online course / Physical product]\nWhat happens next: [e.g. Access in 24h / Ships in 3–5 days]\nSecondary CTA: [e.g. Join our community / Leave a review]\nTone: [warm / professional / playful]\n\nInclude: thank-you, what to expect, one next step, CTA. Under 150 words. Subject line included.",
          framework_used: "Thank + Expectation + Next Step + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Subject: You're in! Here's what happens next\n\nHi [Name], thanks for joining [Course]. Your login is ready—check your inbox for access. Week 1 focuses on [topic]. Your first action: complete the 5-min intro video. Questions? Reply to this email or join our [Community]. We're glad you're here." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Welcome email + 2 follow-ups. Email 1: thank-you + next steps. Email 2 (3 days): tips for getting started. Email 3 (7 days): ask for review or referral. Subject lines + under 120 words each.", what_changed: "3-email welcome sequence with review/referral ask" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "E-commerce", prompt: "Post-purchase welcome for [product]. Ship time: [X] days. Include: thank-you, tracking note, care tips, review CTA. Warm tone. Under 150 words." },
            { title: "SaaS", prompt: "Welcome email for [SaaS] new subscriber. Include: thank-you, login link, first action, help/support link. Professional, friendly. Under 120 words." },
            { title: "Event", prompt: "Welcome email for [event] registrants. Include: confirmation, date/time, what to bring, add-to-calendar CTA. Energetic tone. Under 100 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write a post-[purchase/signup] welcome email for [product/service].\n\nWhat happens next: [X]\nSecondary CTA: [Y]\nTone: [tone]\n\nInclude: thank-you, expectations, one next step, CTA. Under 150 words. Subject line." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Choose a real product you bought recently", "Define what happens next and one CTA", "Run the prompt and adapt to your brand", "Add personalization tokens"], task: "Draft a welcome email for your own product or a client." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add a P.S. that drives one extra action (e.g., follow on Instagram, join a group).", hint: "Ask: 'Add a P.S. that encourages [action] in one sentence.'" }),
        sec("CBM-14_CHECKLIST", { items: ["Thank-you in first line", "Clear what happens next", "One primary CTA", "Subject line included", "Under 150 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Welcome emails should set expectations and one next step", "Warmth and personality outperform generic receipts", "Secondary CTA (review, community) builds loyalty", "Subject lines matter—welcome emails get high opens"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Thank them, tell them what’s next, give them one clear action." })
      ]
    }),

    /* ── L5: Write a Cart Abandonment Email ── */
    buildLesson({
      title: "Write a Cart Abandonment Email",
      slug: "write-a-cart-abandonment-email",
      goal: "Recover lost sales with strategic cart abandonment sequences.",
      summary: "Use ChatGPT to draft abandonment emails that bring back buyers.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L5", title: "Write a Cart Abandonment Email", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a 2-3 email abandonment sequence that recovers 10-15% of lost carts.", real_world: "Abandonment emails convert at 3-5x the rate of regular promo emails." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "E-commerce checkout abandonment, SaaS trial signup drop-off, form abandonment.", tags: ["ecommerce", "abandonment", "recovery", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product category or type", "Typical cart value", "Any offer (e.g., free shipping, discount)", "Brand tone"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write cart abandonment emails." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "You left something in your cart. Come back and buy it." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too pushy or guilt-trippy", "No reminder of what they left", "No incentive or urgency", "Single email only"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a 3-email cart abandonment sequence for [product type] e-commerce store.\n\nTypical cart: [e.g. $50-150]. Offer in email 2: [e.g. 10% off / free shipping over $75]. Tone: helpful, not desperate.\n\nEmail 1 (1h): Gentle reminder + cart summary + CTA. Email 2 (24h): Add incentive + urgency. Email 3 (72h): Last chance, softer tone. Include subject lines. Each under 120 words.",
          framework_used: "Remind -> Incentivize -> Last chance"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Email 1: Your cart is waiting. Email 2: 10% off if you complete in 24h. Email 3: Last chance - items still reserved." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "3-email abandonment. Include: product images placeholder, dynamic [FirstName], urgency. Add P.S. with FAQ. Subject lines + preview text.", what_changed: "Personalization, urgency, FAQ P.S." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "No discount", prompt: "3-email abandonment. No discount. Use reminder, social proof, urgency. Helpful tone. Under 100 words each." },
            { title: "With discount", prompt: "3-email abandonment. Email 2: 10% off. Email 3: 15% last chance. Subject lines. Under 120 words each." },
            { title: "SaaS signup", prompt: "2-email for signup drop-off. Product: [SaaS]. Offer: extended trial. Gentle. Under 100 words each." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write [N]-email cart abandonment for [product type]. Offer: [X]. Tone: [helpful/urgent]. Timing: 1h, 24h, 72h. Subject lines. Under 120 words each." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define product and cart value", "Decide incentive", "Run prompt, paste into ESP", "Add merge tags"], task: "Draft 3-email abandonment for a store." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 4th email for opened-but-no-click - testimonial or guarantee angle.", hint: "Assume they saw 1-3. Use trust/guarantee/support angle." }),
        sec("CBM-14_CHECKLIST", { items: ["Cart reminder in email 1", "Incentive/urgency in email 2", "Last-chance in email 3", "Subject lines", "Under 120 words each"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["3-email sequences beat single emails", "Incentives in email 2 double conversion", "Helpful tone beats guilt", "1h, 24h, 72h timing works"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Remind -> Incentivize -> Last chance - three emails to win back the cart." })
      ]
    }),

    /* ── L6: Generate a Newsletter ── */
    buildLesson({
      title: "Generate a Newsletter",
      slug: "generate-a-newsletter",
      goal: "Draft engaging newsletter content that keeps subscribers opening.",
      summary: "Use ChatGPT to outline and write newsletter issues with structure.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L6", title: "Generate a Newsletter", time: "25 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a full newsletter outline + draft in under 10 minutes.", real_world: "AI-assisted newsletters save 50%+ writing time." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Weekly/biweekly newsletters, industry updates, curated content.", tags: ["newsletter", "content", "email", "engagement"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic or theme", "Audience", "Length", "Key links or sources"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a newsletter." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hi everyone. Here is some news. Check these links. Thanks." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No structure", "Generic, no personality", "No takeaways", "Link dump"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Draft a [weekly/biweekly] newsletter for [audience]. Topic: [X]. This week: [angle]. Include: intro (2-3 sentences), 3 sections with headlines, 1-2 takeaways per section, CTA. Tone: [tone]. ~400 words. Subject line + body with section breaks.",
          framework_used: "Intro + 3 sections + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Subject: 3 moves that move the needle. Intro + 3 sections (headline + 2-3 sentences + link each) + CTA." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Newsletter: subject, preview text, intro, 4 sections (headline + 80 words + link), takeaways, CTA, P.S., reply prompt. ~500 words.", what_changed: "Preview text, reply prompt" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Curated", prompt: "Curated newsletter. Topic: [X]. Intro + 5 links with 1-sentence takeaway each + CTA. ~300 words." },
            { title: "Thought leadership", prompt: "Thought leadership newsletter. One main opinion. Audience: [X]. Hook, argument, 3 points, CTA. ~400 words." },
            { title: "Promo + value", prompt: "Newsletter promoting [product] but value first. 2 tips, soft promo, CTA. ~350 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Draft [frequency] newsletter for [audience]. Topic: [X]. This week: [angle]. Intro + [N] sections + CTA. Tone: [tone]. ~[X] words. Subject line." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick topic and angle", "Run prompt", "Add links", "Paste into email tool"], task: "Draft one newsletter issue." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Turn one section into a contrarian hot take to boost replies.", hint: "Add: Section 2 = contrarian take that sparks replies." }),
        sec("CBM-14_CHECKLIST", { items: ["Subject line", "Hooking intro", "3+ sections with headlines", "One CTA", "~400 words or less"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Intro + sections + CTA = scannable", "One theme per issue", "Personality > length", "Reply prompts boost engagement"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Intro + 3 sections + CTA = newsletter people open and read." })
      ]
    }),

    /* ── L7: Write a Cold Email ── */
    buildLesson({
      title: "Write a Cold Email",
      slug: "write-a-cold-email",
      goal: "Write cold outreach emails that get replies, not spam flags.",
      summary: "Use ChatGPT to draft personalized cold emails that stand out.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M6-L7", title: "Write a Cold Email", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create personalized cold email that gets 15-25% reply rates.", real_world: "Personalized cold emails outperform templates by 3-5x." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "B2B prospecting, partnerships, influencer DMs, podcast pitches.", tags: ["cold email", "outreach", "B2B", "sales"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Prospect role and company", "Reason for outreach", "One specific ask", "Proof or credibility"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a cold email." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hi, I am [Name]. We help companies. Can we schedule a call?" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personalization", "All about sender", "Vague ask", "Generic"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write cold email to [role] at [company type]. My offer: [1 sentence]. Their pain: [X]. Proof: [Y]. Ask: [Z]. Under 125 words. Lead with them. One ask. No hype. Subject line.",
          framework_used: "Personalization + Pain + Proof + Ask"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Subject: [Company] + [topic]. Hi [Name], [Company]'s growth in [area] caught my eye. Teams at your stage often hit [pain]. We helped [Similar Co] cut [metric] by [X]%. Worth a 15-min call? [Name]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Cold email + 2 follow-ups. Email 1: value-first. Follow-up 1 (5 days): insight or case study. Follow-up 2 (7 days): soft break-up. Each under 100 words. No 'just checking in'.", what_changed: "Sequence + break-up" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Partnership", prompt: "Cold email to [company] for partnership. My offer: [X]. Their benefit: [Y]. Ask: intro call. Under 120 words." },
            { title: "Podcast pitch", prompt: "Cold email to podcast host. Expertise: [X]. Topic: [Y]. Why audience cares. Ask: guest spot. Concise." },
            { title: "Influencer", prompt: "Cold DM to influencer. Product: [X]. Collaboration idea: [Y]. Compliment work. Ask: [specific]. Brief." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write cold email to [role] at [company type]. Offer: [1 sentence]. Their pain: [X]. Proof: [Y]. Ask: [Z]. Under 125 words. Lead with them. Subject line." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick prospect, research", "Identify pain, proof, ask", "Run prompt", "Send to 5, track replies"], task: "Send 5 personalized cold emails." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write break-up email for non-responders - professional, no guilt.", hint: "Last email. No hard feelings. Door open if timing changes." }),
        sec("CBM-14_CHECKLIST", { items: ["Prospect-specific opener", "Their pain not your pitch", "One proof point", "Single clear ask", "Under 125 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Personalization beats volume", "Lead with their world", "One ask, one proof", "Follow-ups double reply rates"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Them first, pain + proof, one ask - cold email that gets replies." })
      ]
    }),

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 7 — Website & E-commerce
   slug: m7-website-ecommerce
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Website & E-commerce",
  slug: "m7-website-ecommerce",
  lessons: [
    buildLesson({
      title: "Generate Product Descriptions",
      slug: "generate-product-descriptions",
      goal: "Write product copy that sells with benefit-focused descriptions.",
      summary: "Use ChatGPT to generate e-commerce product descriptions that convert.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L1", title: "Generate Product Descriptions", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create SEO-friendly product descriptions in under 2 minutes.", real_world: "Benefit-led product copy increases conversion by 20-30%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "E-commerce product pages, Amazon listings, Shopify stores.", tags: ["ecommerce", "copywriting", "product", "SEO"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product name and category", "Key features and specs", "Target buyer", "Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write product descriptions." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "This is a great product. It has many features. Buy now." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No benefits or outcome focus", "Feature dump", "Generic", "No SEO keywords"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a product description for [product]. Category: [X]. Features: [list]. Target buyer: [persona]. Include: headline, 2-3 benefit-led bullets, 100-word body. Tone: [professional/warm]. Add 3 SEO keywords naturally.",
          framework_used: "Headline + Benefits + Body"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: [Benefit-focused]. Bullets: [3 outcome-led]. Body: 100 words weaving features into benefits. Keywords: [woven in]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Product description + short version (50 words), meta description (155 chars), 5 bullet points for Amazon. Include keywords. Tone: [X].", what_changed: "Multiple formats, meta description" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Amazon", prompt: "Amazon listing for [product]. Bullets: 5, benefit-led. A+ content section: 3 modules. Keywords: [list]. Under 2000 chars bullets." },
            { title: "Luxury", prompt: "Luxury product description for [product]. Evocative, sensory language. Emphasize craftsmanship, exclusivity. 150 words." },
            { title: "Tech/SaaS", prompt: "SaaS product description. Feature: [X]. Outcome: [Y]. For [persona]. Headline + 3 bullets + 80-word body. Professional." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write product description for [product]. Features: [X]. Buyer: [persona]. Headline + bullets + body (~100 words). Tone: [X]. Keywords: [list]." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a real product", "List features and buyer", "Run prompt", "Paste into storefront"], task: "Write 3 product descriptions for your or a client's store." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write A/B headlines - benefit vs feature-led. Test which performs better.", hint: "Generate 2 headlines, run small test." }),
        sec("CBM-14_CHECKLIST", { items: ["Benefit-led headline", "2-5 outcome bullets", "~100 word body", "SEO keywords woven in", "Tone matches brand"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Benefits beat features", "Short bullets convert", "SEO keywords matter", "Multiple formats (meta, short) save time"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Features tell, benefits sell - lead with outcomes." })
      ]
    }),
    buildLesson({
      title: "Write an Advertorial",
      slug: "write-an-advertorial",
      goal: "Create native-style sponsored content that blends with editorial.",
      summary: "Use ChatGPT to draft advertorials that feel like articles, not ads.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L2", title: "Write an Advertorial", time: "20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft a 500-word advertorial that reads like an article and converts.", real_world: "Advertorials often outperform banner ads by 2-3x." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Sponsored posts, native ads, content marketing, affiliate articles.", tags: ["advertorial", "native", "content", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/brand", "Target audience", "Publication style", "One CTA"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write an advertorial." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Buy our product. It is the best. Order now." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Obvious ad", "No story or hook", "All pitch", "No value-first content"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a 500-word advertorial for [product]. Audience: [persona]. Style: [e.g. Forbes / lifestyle blog]. Structure: Hook (problem or story), 3 value sections (tips/insights), soft product intro, CTA. Disclose as sponsored. Tone: editorial, not salesy.",
          framework_used: "Story + Value + Soft pitch + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hook: relatable problem. 3 sections: actionable tips. Product mentioned naturally in section 3. CTA at end. Sponsored disclosure." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Advertorial + 3 headline options, meta description, 2 CTA variants. 500 words. SEO keywords: [list]. Disclosure compliant.", what_changed: "Headlines, meta, CTA variants" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Problem-solution", prompt: "Advertorial. Problem: [X]. Product solves it. Audience: [Y]. 400 words. Value-first, product in 2nd half." },
            { title: "Listicle", prompt: "Advertorial as listicle: '5 ways to [outcome]'. Product is #3 or #4. 500 words. Editorial tone." },
            { title: "How-to", prompt: "How-to advertorial. Topic: [X]. Product as tool. Steps + product mention. 450 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Write 500-word advertorial for [product]. Audience: [X]. Style: [publication]. Hook + value sections + soft pitch + CTA. Disclose sponsored. Editorial tone." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick product and publication style", "Define audience", "Run prompt", "Add disclosure", "Edit for brand voice"], task: "Draft one advertorial for a product." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write same advertorial in 2 tones - formal (Forbes) vs casual (lifestyle blog).", hint: "Run twice with different style instructions." }),
        sec("CBM-14_CHECKLIST", { items: ["Value-first content", "Product woven in naturally", "Clear CTA", "Sponsored disclosure", "~500 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Editorial style converts better than ad copy", "Value sections before pitch", "Disclosure is required", "Match publication voice"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Value first, product second - advertorials that read and convert." })
      ]
    }),
    buildLesson({
      title: "Optimize Site for SEO",
      slug: "optimize-site-for-seo",
      goal: "Generate on-page SEO copy: titles, meta descriptions, headers.",
      summary: "Use ChatGPT to create SEO-optimized page elements.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L3", title: "Optimize Site for SEO", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create title tags, meta descriptions, and H1/H2 structure for any page.", real_world: "Strong meta copy can lift CTR from search by 20%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Landing pages, product pages, blog posts, service pages.", tags: ["SEO", "on-page", "meta", "titles"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Page topic or URL", "Target keyword", "Page purpose", "Brand name"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Optimize my page for SEO." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Use keywords. Write good content. Add meta tags." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No actual copy", "Vague advice", "No character limits", "No structure"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create on-page SEO for [page topic]. Keyword: [X]. Purpose: [e.g. convert / inform]. Output: Title tag (60 chars), meta description (155 chars), H1, 3-5 H2s. Include keyword naturally. Brand: [name].",
          framework_used: "Title + Meta + Headers"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Title: [60 chars]. Meta: [155 chars]. H1: [compelling]. H2s: [3-5 logical]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "SEO pack: Title (60), meta (155), H1, H2s, 3 internal link suggestions, FAQ schema questions (5). Keyword: [X].", what_changed: "Internal links, FAQ schema" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Landing page", prompt: "SEO for landing page. Offer: [X]. Keyword: [Y]. Title, meta, H1, H2s. Conversion-focused. 60/155 chars." },
            { title: "Product page", prompt: "SEO for product page. Product: [X]. Keyword: [Y]. Title, meta, H1, H2s. E-commerce style." },
            { title: "Blog post", prompt: "SEO for blog post. Topic: [X]. Keyword: [Y]. Title, meta, H1, H2s (outline). Informational." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "SEO for [page type]. Topic: [X]. Keyword: [Y]. Output: Title (60), meta (155), H1, H2s. Brand: [name]." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a page", "Identify keyword", "Run prompt", "Paste into CMS", "Check character counts"], task: "Optimize 3 pages with AI-generated SEO." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 3 title variants for A/B testing in Google Search Console.", hint: "Generate 3 titles, pick 2 to test." }),
        sec("CBM-14_CHECKLIST", { items: ["Title under 60 chars", "Meta under 155 chars", "H1 with keyword", "H2 structure", "Keyword natural, not stuffed"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Character limits matter for titles/meta", "Headers outline content", "Keyword in title and H1", "Multiple variants enable testing"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Title (60) + meta (155) + H1/H2s = on-page SEO that clicks." })
      ]
    }),
    buildLesson({
      title: "Create Customer Testimonials",
      slug: "create-customer-testimonials",
      goal: "Turn raw feedback into polished, usable testimonials.",
      summary: "Use ChatGPT to rewrite and expand customer feedback into compelling testimonials.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L4", title: "Create Customer Testimonials", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Transform rough feedback into 3-5 ready-to-use testimonials.", real_world: "Testimonials with outcomes convert 30%+ better." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Website, landing pages, sales decks, case studies.", tags: ["testimonials", "social proof", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Raw feedback or interview notes", "Product/service", "Customer name/role (optional)", "Desired length"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write testimonials." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Great product! - Happy Customer" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Generic", "No specifics or outcomes", "Fake tone", "No credibility"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Turn this feedback into 3 testimonial variants (short 1-sentence, medium 2-3 sentences, long paragraph): [paste raw feedback]. Product: [X]. Keep their voice, add outcome/metric if implied. Professional, authentic. No fake superlatives.",
          framework_used: "Short + Medium + Long variants"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Short: [1 sentence]. Medium: [2-3 with outcome]. Long: [paragraph with story + result]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Testimonials + 1-sentence pull quote, before/after framing, and headline for case study. Keep authentic.", what_changed: "Pull quote, case study angle" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "From interview", prompt: "Interview notes: [paste]. Product: [X]. Create 3 testimonial lengths. Add role/company if given. Authentic voice." },
            { title: "From review", prompt: "Reviews: [paste Amazon/G2/etc]. Product: [X]. Polish into 3 testimonials. Keep specifics. No fabrication." },
            { title: "For landing page", prompt: "Feedback: [paste]. Create 5 short testimonials (1-2 sentences each) for landing page. Include outcome. Varied angles." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Turn feedback into testimonials: [paste]. Product: [X]. Output: short, medium, long. Authentic. Add outcome if implied." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Gather 2-3 real feedback snippets", "Run prompt", "Pick best variant per use case", "Get approval if needed"], task: "Create 5 testimonials from existing feedback." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Rewrite one testimonial for 3 audiences: B2B, B2C, technical.", hint: "Adjust tone and emphasis per audience." }),
        sec("CBM-14_CHECKLIST", { items: ["Specific outcome or result", "Authentic voice", "No fabrication", "Multiple lengths for different uses"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Outcomes beat vague praise", "Multiple lengths = flexibility", "Authenticity > polish", "Always keep customer voice"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Raw feedback + polish = testimonials that build trust." })
      ]
    }),
    buildLesson({
      title: "Translate Website Copy",
      slug: "translate-website-copy",
      goal: "Translate and localize web copy while preserving tone and conversion focus.",
      summary: "Use ChatGPT to translate headlines, CTAs, and page copy for new markets.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L5", title: "Translate Website Copy", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Translate key page elements with local nuance, not literal word-for-word.", real_world: "Localized copy outperforms literal translation by 40%+." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Multilingual sites, regional landing pages, international campaigns.", tags: ["translation", "localization", "copy", "international"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Source copy (English or base language)", "Target language and locale", "Brand voice", "Key terms to preserve or adapt"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Translate this to Spanish." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Literal, awkward translation that loses tone and conversion focus." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Literal translation", "Lost tone and urgency", "Idioms wrong", "CTA weakened"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Translate this web copy for [target language/locale]. Preserve: tone ([professional/casual]), CTA impact, brand voice. Adapt idioms and cultural references. Do not translate [brand name / product name]. Output: [headline], [subhead], [CTA buttons], [body]. Natural, conversion-focused.",
          framework_used: "Localize, don't literalize"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: [adapted]. CTA: [conversion-strong in target language]. Body: natural, not stiff." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Translate + provide 2 CTA variants per locale, glossary of key terms, and notes on cultural adjustments. [Target language].", what_changed: "CTA variants, glossary, cultural notes" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Landing page", prompt: "Translate landing page to [language]. Headline, subhead, 3 bullets, CTA. Conversion-focused. Locale: [e.g. Spain vs LATAM]." },
            { title: "Product page", prompt: "Translate product description to [language]. Features, benefits, CTA. E-commerce tone. Preserve brand terms." },
            { title: "Email", prompt: "Translate email to [language]. Subject, preview, body, CTA. Urgency and tone preserved." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Translate to [language/locale]. Copy: [paste]. Preserve tone, CTA impact. Adapt idioms. Do not translate: [brand/product]. Natural, conversion-focused." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick page or email", "Specify locale", "Run prompt", "Review with native speaker if possible", "Update CMS"], task: "Translate 2 key pages to a new language." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Translate same CTA for 3 regional variants (e.g., Spain, Mexico, Argentina).", hint: "Specify region in prompt for each." }),
        sec("CBM-14_CHECKLIST", { items: ["Tone preserved", "CTA strong in target language", "Idioms adapted", "Brand terms untouched", "Natural flow"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Localize > literal translate", "CTAs need cultural adaptation", "Locale matters (Spain vs LATAM)", "Native review recommended"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Translate meaning and intent, not just words." })
      ]
    }),
    buildLesson({
      title: "Design CTAs",
      slug: "design-ctas",
      goal: "Create high-converting call-to-action copy for buttons and links.",
      summary: "Use ChatGPT to generate CTA variations that drive clicks.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M7-L6", title: "Design CTAs", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 10+ CTA options for any page or campaign.", real_world: "CTA copy tests often yield 10-20% lift." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Buttons, links, banners, emails, landing pages.", tags: ["CTA", "conversion", "copywriting", "buttons"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Action (sign up, buy, download)", "Context (page, offer)", "Tone (urgent, soft, professional)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write CTAs." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Click here. Submit. Learn more." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Generic", "No benefit or urgency", "Same as everyone", "Weak verbs"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 10 CTA options for [action] on [context]. Offer: [X]. Tone: [urgent/soft/professional]. Mix: action verbs, benefit-led, urgency, first-person. 2-5 words each. No 'Click here' or 'Submit'.",
          framework_used: "Action + Benefit + Urgency mix"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Get my free guide. Start free trial. Yes, I want this. Unlock access. Reserve my spot. Join 10,000+ users. etc." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "15 CTAs: 5 action-led, 5 benefit-led, 5 urgency/scarcity. For [action/context]. A/B pairing suggestions.", what_changed: "Categorized, A/B pairs" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Sign up", prompt: "10 CTAs for sign-up. Product: [X]. Tone: [Y]. No generic. Action/benefit/urgency mix." },
            { title: "Purchase", prompt: "10 CTAs for purchase. Product: [X]. Urgency optional. Conversion-focused." },
            { title: "Download", prompt: "10 CTAs for lead magnet download. Offer: [X]. Soft, value-led." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "10 CTAs for [action]. Context: [X]. Offer: [Y]. Tone: [Z]. Mix action/benefit/urgency. 2-5 words. No Click here/Submit." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define action and context", "Run prompt", "Pick 2-3 for A/B test", "Implement and track"], task: "Generate CTAs for 2 key pages." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create CTAs for same action in 3 tones: soft, urgent, playful.", hint: "Run 3 times with different tone." }),
        sec("CBM-14_CHECKLIST", { items: ["Action verb or benefit", "2-5 words", "No generic (Click, Submit)", "Tone matches page"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Specific beats generic", "Benefit-led CTAs convert", "A/B test 2-3 options", "First-person can work (Get my X)"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Action + benefit + urgency = CTAs that get clicked." })
      ]
    }),
  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 8 — SEO Content Engine
   slug: m8-seo-content-engine
   ═══════════════════════════════════════════════════════════════ */
{
  title: "SEO Content Engine",
  slug: "m8-seo-content-engine",
  lessons: [
    buildLesson({
      title: "Generate Keyword List",
      slug: "generate-keyword-list",
      goal: "Create targeted keyword lists for content and campaigns.",
      summary: "Use ChatGPT to brainstorm and structure keyword ideas.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M8-L1", title: "Generate Keyword List", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 50+ relevant keywords organized by intent and volume tier.", real_world: "Structured keyword lists inform content strategy and SEO." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Content planning, SEO strategy, ad campaigns, blog topics.", tags: ["SEO", "keywords", "research", "content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic or product", "Target audience", "Goals (traffic, leads, sales)", "Competitors (optional)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me keywords." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "marketing, SEO, content" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too broad", "No structure", "No intent", "Not actionable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate a keyword list for [topic/product]. Audience: [persona]. Organize by intent: informational, commercial, transactional. Include: head terms (1-2 words), body (3-4 words), long-tail (5+ words). 50+ keywords. Add brief intent label per group.",
          framework_used: "Intent + length tiers"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Informational: [list]. Commercial: [list]. Transactional: [list]. Each with head/body/long-tail mix." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Keyword list + content angle per top 10 (what article/ad to create). Include question keywords. 80+ total.", what_changed: "Content angles, question keywords" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Blog", prompt: "Keywords for blog about [topic]. Audience: [X]. 40 keywords. Mix informational + commercial. Long-tail focus." },
            { title: "Product", prompt: "Keywords for [product] landing pages. Intent: commercial + transactional. 50 keywords. Include comparison terms." },
            { title: "Local", prompt: "Local SEO keywords for [business type] in [location]. Include 'near me', service + location. 30 keywords." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Keyword list for [topic/product]. Audience: [X]. Organize by intent (info/commercial/transactional) and length (head/body/long-tail). 50+ keywords." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick topic", "Define audience", "Run prompt", "Export to sheet", "Validate top 10 in tool"], task: "Create keyword list for one content area." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add 'people also ask' style questions for your top 5 keywords.", hint: "Ask: 'Generate 5 PAA questions for [keyword].'" }),
        sec("CBM-14_CHECKLIST", { items: ["Intent-based grouping", "Head/body/long-tail mix", "50+ keywords", "Audience-aligned", "Actionable for content"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Intent matters more than volume", "Long-tail = less competition", "Structure enables prioritization", "Validate with tools after"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Intent + tiers = keyword list that fuels content." })
      ]
    }),
    buildLesson({
      title: "Write Compelling Blog Posts",
      slug: "write-compelling-blog-posts",
      goal: "Outline and draft SEO blog posts that rank and engage.",
      summary: "Use ChatGPT to create blog outlines and full drafts.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M8-L2", title: "Write Compelling Blog Posts", time: "25 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Produce a full blog outline or draft in under 15 minutes.", real_world: "AI-assisted posts cut writing time 50-70%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "SEO blog, content marketing, thought leadership.", tags: ["blog", "content", "SEO", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic and target keyword", "Audience", "Length", "Angle or differentiator"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a blog post about [topic]." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, thin content with no structure." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No keyword focus", "No outline", "Generic", "Wrong length"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create blog post outline for [topic]. Keyword: [X]. Audience: [persona]. Length: [800/1500/2000] words. Include: H1, intro (hook + promise), 5-7 H2 sections with 2-3 bullet points each, CTA, meta description. SEO-friendly structure.",
          framework_used: "H1 + Intro + H2s + CTA + Meta"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "H1, intro with hook, H2s with sub-bullets, conclusion + CTA, meta 155 chars." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Full draft (not just outline) for [topic]. Keyword: [X]. 1200 words. Include internal link placeholders, FAQ section, CTA. Tone: [X].", what_changed: "Full draft, internal links, FAQ" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "How-to", prompt: "How-to blog post. Topic: [X]. Keyword: [Y]. Steps with H2s. 1000 words. Audience: [Z]." },
            { title: "Listicle", prompt: "Listicle: [N] ways to [outcome]. Keyword: [X]. 1200 words. Each item: tip + 1-2 sentences. SEO structure." },
            { title: "Comparison", prompt: "Comparison post: [A] vs [B]. Keyword: [X]. Fair, balanced. 1000 words. Table suggestion." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Blog [outline/draft] for [topic]. Keyword: [X]. Audience: [Y]. Length: [Z] words. H1, intro, H2s, CTA, meta. SEO structure." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick topic + keyword", "Run outline prompt", "Expand one section manually or with AI", "Add links and images"], task: "Publish one AI-assisted blog post." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Turn outline into full draft using follow-up prompt.", hint: "Use 'Expand section [N] into 200 words' for each." }),
        sec("CBM-14_CHECKLIST", { items: ["Keyword in H1 and H2s", "Hook in intro", "5-7 H2 sections", "CTA at end", "Meta 155 chars"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Outline first speeds drafting", "Structure = SEO + readability", "Expand sections iteratively", "Always add your expertise"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Outline first, draft second - blog posts that rank and read." })
      ]
    }),
    buildLesson({
      title: "Do OnPage SEO Optimization",
      slug: "do-onpage-seo-optimization",
      goal: "Optimize existing content for better search performance.",
      summary: "Use ChatGPT to audit and improve on-page SEO of current content.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M8-L3", title: "Do OnPage SEO Optimization", time: "20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get actionable on-page SEO recommendations for any article.", real_world: "On-page tweaks can lift rankings 10-30%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Underperforming posts, new content, content refresh.", tags: ["SEO", "on-page", "optimization", "content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Current content (or URL)", "Target keyword", "Current title/meta", "Goal (rank, CTR)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Optimize this for SEO." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Add keywords. Use headers. Write more." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No specifics", "No before/after", "Vague", "No structure changes"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "On-page SEO audit for this content. Target keyword: [X]. Current: [paste title, meta, H1, first 200 words]. Output: 1) Suggested title (60 chars), 2) Meta (155 chars), 3) H1 improvement, 4) H2 structure changes, 5) Keyword placement suggestions, 6) Internal link ideas. Be specific.",
          framework_used: "Audit + recommendations"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Title: [new]. Meta: [new]. H1: [improved]. H2s: [restructure]. Keyword: [where to add]. Links: [3 ideas]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Full audit + rewritten intro paragraph, 3 FAQ questions for schema, and image alt text suggestions. Keyword: [X].", what_changed: "Rewritten intro, FAQ schema, alt text" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Quick audit", prompt: "Quick on-page audit. Content: [paste]. Keyword: [X]. Top 5 changes. Prioritized." },
            { title: "Title/meta only", prompt: "Improve title and meta for [content]. Keyword: [X]. 3 title options, 3 meta options. 60/155 chars." },
            { title: "Header restructure", prompt: "Restructure headers for [content]. Keyword: [X]. Current H2s: [list]. Suggest new H2/H3 outline. SEO + readability." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "On-page audit. Content: [paste or describe]. Keyword: [X]. Output: title, meta, H1, H2 changes, keyword placement, link ideas. Specific." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick underperforming post", "Paste title, meta, start", "Run audit", "Implement top 3 changes", "Monitor"], task: "Optimize 2 posts with AI audit." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Optimize same post for 2 different keywords (primary + secondary).", hint: "Run twice with different keyword focus." }),
        sec("CBM-14_CHECKLIST", { items: ["Title 60 chars", "Meta 155 chars", "Keyword in H1", "Logical H2 structure", "Intro hooks"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Audits uncover quick wins", "Title/meta drive CTR", "Structure helps ranking", "Iterative optimization works"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Audit -> prioritize -> implement = on-page SEO that moves the needle." })
      ]
    }),
    buildLesson({
      title: "Create a Content Calendar",
      slug: "create-a-content-calendar",
      goal: "Plan and schedule content with SEO and audience alignment.",
      summary: "Use ChatGPT to build content calendars from keywords and goals.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M8-L4", title: "Create a Content Calendar", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate a 4-week content calendar with topics, angles, and formats.", real_world: "Calendars reduce last-minute scramble and improve consistency." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Blog, social, email, campaigns.", tags: ["content", "planning", "calendar", "SEO"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Content pillars or themes", "Target keywords", "Publish frequency", "Channels"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Make a content calendar." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Week 1: post. Week 2: post." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topics", "No keywords", "Generic", "Not actionable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create 4-week content calendar for [blog/brand]. Themes: [list]. Keywords: [top 10]. Frequency: [e.g. 2 posts/week]. Output: table with Week, Date, Topic, Keyword, Format (how-to/listicle/etc), Angle. Align topics with keywords.",
          framework_used: "Week + Topic + Keyword + Format"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Week | Topic | Keyword | Format |\n| 1 | ... | ... | how-to |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Content calendar + social post ideas per piece, email angle, and internal link targets. 4 weeks.", what_changed: "Social, email, internal links" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Blog only", prompt: "4-week blog calendar. Themes: [X]. Keywords: [list]. 2 posts/week. Topic, keyword, format per post." },
            { title: "Multi-channel", prompt: "4-week calendar: blog, social, email. Themes: [X]. 1 blog, 3 social, 1 email/week. Aligned." },
            { title: "Seasonal", prompt: "Q1 content calendar. Themes: [X]. Include seasonal hooks (New Year, Valentine's, etc). 12 weeks." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Content calendar for [channel]. Themes: [X]. Keywords: [list]. [N] weeks. Frequency: [X]. Table: Week, Topic, Keyword, Format, Angle." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List themes and keywords", "Run prompt", "Export to sheet or Notion", "Assign writers", "Schedule"], task: "Create next month's content calendar." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add content refresh items - which old posts to update each week.", hint: "Ask: 'Which existing posts should we refresh each week and why?'" }),
        sec("CBM-14_CHECKLIST", { items: ["Topics aligned to keywords", "Mix of formats", "Realistic frequency", "Angles defined", "Actionable"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Calendars reduce chaos", "Keywords guide topics", "Format mix keeps variety", "Adjust as you learn"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Themes + keywords + frequency = content calendar that executes." })
      ]
    }),
    buildLesson({
      title: "Update Old Content for Growth",
      slug: "update-old-content-for-growth",
      goal: "Refresh underperforming content to regain rankings and traffic.",
      summary: "Use ChatGPT to identify and improve outdated or thin content.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M8-L5", title: "Update Old Content for Growth", time: "25 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get a prioritized refresh plan for existing content.", real_world: "Content refresh can recover 50%+ of lost traffic." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Declining posts, outdated guides, thin content.", tags: ["SEO", "content refresh", "optimization"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["List of URLs or titles", "Current performance (optional)", "Target keywords", "Available capacity"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Update my content." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Rewrite everything." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No prioritization", "No specific actions", "Unrealistic scope", "No criteria"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Content refresh plan for these posts: [list titles/URLs]. Target keywords: [list]. Output: Priority (High/Med/Low), Post, Issue (outdated/thin/wrong keyword), Action (update stats/add section/rewrite intro/restructure), Est. effort (hours). Prioritize by impact.",
          framework_used: "Priority + Issue + Action + Effort"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Priority | Post | Issue | Action | Hours |" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Refresh plan + specific rewrite prompts for top 3 posts. Include: new intro, new sections, FAQ addition. Keyword: [X].", what_changed: "Rewrite prompts for top posts" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Quick audit", prompt: "Which of these 10 posts should we refresh first? [list]. Criteria: SEO potential, effort. Top 5 with reasons." },
            { title: "Per-post plan", prompt: "Refresh plan for [single post]. Current: [paste intro + outline]. Keyword: [X]. Specific edits: intro, sections to add, stats to update." },
            { title: "Quarterly", prompt: "Quarterly content refresh plan. 20 posts. Prioritize. Include: update dates, add E-E-A-T signals, internal links." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Content refresh plan. Posts: [list]. Keywords: [X]. Output: Priority, Post, Issue, Action, Effort. Prioritize by impact." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List 10-20 posts", "Add keywords", "Run prompt", "Pick top 5", "Execute refresh"], task: "Refresh 3 posts using AI plan." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 'update checklist' for one post - exact edits to make.", hint: "Ask for line-by-line or section-by-section changes." }),
        sec("CBM-14_CHECKLIST", { items: ["Prioritized list", "Clear issue per post", "Specific action", "Effort estimate", "Impact focus"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Refresh > new for quick wins", "Prioritize by impact", "Specific actions beat vague 'improve'", "Track before/after"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Audit -> prioritize -> refresh = content that grows again." })
      ]
    }),
  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 9 — Affiliate Marketing
   slug: m9-affiliate-marketing
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Affiliate Marketing",
  slug: "m9-affiliate-marketing",
  lessons: [
    buildLesson({
      title: "Write Affiliate Product Reviews",
      slug: "write-affiliate-product-reviews",
      goal: "Create honest, persuasive affiliate reviews that convert.",
      summary: "Use ChatGPT to draft review structure and copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M9-L1", title: "Write Affiliate Product Reviews", time: "25 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft a full affiliate review with structure, pros/cons, and CTA.", real_world: "Structured reviews convert 2-3x better than rambling posts." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Review blogs, comparison sites, YouTube descriptions.", tags: ["affiliate", "review", "conversion", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product name and category", "Key features", "Pros and cons", "Target buyer", "Affiliate disclosure"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a review for [product]." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "This product is great. Buy it." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too salesy", "No structure", "No pros/cons", "No disclosure"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write affiliate review outline for [product]. Category: [X]. Features: [list]. Pros: [list]. Cons: [list]. Buyer: [persona]. Include: intro, quick verdict, who it's for, pros/cons table, detailed sections, verdict, CTA. Honest tone. Add disclosure placeholder.",
          framework_used: "Verdict + Who + Pros/Cons + Sections + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Intro, Quick verdict, Who it's for, Pros/cons table, 3-4 detail sections, Final verdict, CTA, Disclosure." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Full draft (800 words) for [product] review. Include FAQ schema, internal link ideas, 2 CTA variants. Honest, helpful. Disclosure.", what_changed: "Full draft, FAQ, links" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Software", prompt: "Affiliate review for [software]. Features, pricing, pros/cons. Buyer: [persona]. 600 words. Honest. CTA + disclosure." },
            { title: "Physical product", prompt: "Affiliate review for [product]. Specs, use cases, pros/cons. 500 words. Include 'worth it?' section." },
            { title: "Course", prompt: "Affiliate review for [course]. Curriculum, instructor, pros/cons. Who it's for. 550 words. Honest." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Affiliate review for [product]. Category: [X]. Pros: [list]. Cons: [list]. Buyer: [persona]. Structure: intro, verdict, who for, pros/cons, sections, CTA. Honest. Disclosure." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List product features, pros, cons", "Define buyer", "Run prompt", "Add personal experience", "Insert links and disclosure"], task: "Write one full affiliate review." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write same review in 2 tones: thorough/analytical vs casual/friendly.", hint: "Run twice with different tone instructions." }),
        sec("CBM-14_CHECKLIST", { items: ["Honest pros and cons", "Who it's for section", "Structured layout", "Clear CTA", "Disclosure"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Honesty builds trust and conversions", "Structure (verdict, pros/cons) helps", "Who it's for = qualification", "Disclosure is required"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Honest structure + pros/cons + CTA = affiliate reviews that convert." })
      ]
    }),
    buildLesson({
      title: "Create Comparison Tables",
      slug: "create-comparison-tables",
      goal: "Build clear comparison tables for products or services.",
      summary: "Use ChatGPT to generate comparison tables and supporting copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M9-L2", title: "Create Comparison Tables", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create markdown or HTML comparison tables in minutes.", real_world: "Comparison tables improve time-on-page and affiliate clicks." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Vs posts, buyer guides, review roundups.", tags: ["affiliate", "comparison", "table", "SEO"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Products to compare (3-5)", "Comparison criteria", "Key differentiators", "Format (markdown/HTML)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Compare these products." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Product A is good. Product B is also good." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No table structure", "Vague", "No criteria", "Not scannable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create comparison table for [Product A] vs [Product B] vs [Product C]. Criteria: [price, features, ease of use, support, best for]. Use checkmarks, X, or short text. Output: markdown table. Add 1-sentence verdict per product.",
          framework_used: "Criteria rows + product columns + verdicts"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "| Criteria | A | B | C |\n| Price | $X | $Y | $Z |\n... Verdict A: ... Verdict B: ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Comparison table + intro paragraph, 'which to choose' flowchart (text), and 3 FAQ questions. Format: markdown.", what_changed: "Intro, flowchart, FAQ" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "2-way", prompt: "[Product A] vs [Product B]. Criteria: [list]. Markdown table. Verdict each. 150 words." },
            { title: "5-way", prompt: "Compare 5 [category] products. Criteria: price, key features, best for. Table + 1-line verdict each." },
            { title: "Pricing", prompt: "Pricing comparison: [Product A] vs [B] vs [C]. Plans, price, features per tier. Table format." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Comparison table: [products]. Criteria: [list]. Format: markdown. Add verdict per product. Scannable." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List 3 products and criteria", "Run prompt", "Paste into post", "Add affiliate links to product names"], task: "Create one comparison table for a vs post." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Add 'winner' badges for specific use cases (best for beginners, best value).", hint: "Ask: 'Add best-for-X winner per product.'" }),
        sec("CBM-14_CHECKLIST", { items: ["Clear criteria", "Consistent format", "Scannable", "Verdict per product", "Accurate data"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Tables aid decision-making", "Criteria = your framing", "Verdicts drive clicks", "Markdown = easy paste"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Criteria + table + verdicts = comparison that converts." })
      ]
    }),
    buildLesson({
      title: "Generate Product Recommendations",
      slug: "generate-product-recommendations",
      goal: "Create 'best of' lists and personalized recommendations.",
      summary: "Use ChatGPT to draft recommendation copy for roundups and guides.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M9-L3", title: "Generate Product Recommendations", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft best-of list intros, product blurbs, and recommendation copy.", real_world: "Roundup posts drive high affiliate revenue per page." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Best X for Y posts, buyer guides, gift guides.", tags: ["affiliate", "roundup", "recommendations"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product list", "Category and use case", "Target buyer", "Selection criteria"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Recommend some products." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Here are some good products." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No specifics", "No criteria", "Generic", "No structure"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 'Best [N] [products] for [use case]' intro and product blurbs. Products: [list with 1-line each]. Buyer: [persona]. Criteria: [price, quality, ease]. Each blurb: 2-3 sentences, why it made the list, best for. Honest. Include 'how we picked' sentence.",
          framework_used: "Intro + Blurbs + Criteria"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Intro (why this list). Blurb 1: [product] - why, best for. Blurb 2: ... How we picked: [criteria]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Best-of list + table summary, pros/cons per product, and FAQ (5 questions). Honest. SEO-friendly structure.", what_changed: "Table, pros/cons, FAQ" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Gift guide", prompt: "Gift guide: Best [category] for [recipient]. 5 products. Each: 2 sentences, price, why gift-worthy." },
            { title: "Budget", prompt: "Best budget [products] under $[X]. 5 picks. Each: price, why value, trade-off. Honest." },
            { title: "Beginner", prompt: "Best [products] for beginners. 5 picks. Each: why beginner-friendly, ease score, one tip." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Best [N] [products] for [use case]. Products: [list]. Buyer: [persona]. Intro + blurb per product (why, best for). How we picked." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List 5 products", "Define use case and buyer", "Run prompt", "Add links", "Add disclosure"], task: "Create one best-of list." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 'avoid these' or 'overhyped' section for same category.", hint: "Ask for products that don't make the list and why." }),
        sec("CBM-14_CHECKLIST", { items: ["Clear criteria", "Blurb per product", "Best-for qualification", "Honest", "Disclosure"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Criteria = credibility", "Best-for helps match", "Honest > hype", "Roundups = high affiliate potential"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Criteria + blurbs + best-for = recommendations that convert." })
      ]
    }),
    buildLesson({
      title: "Write Affiliate Product Descriptions",
      slug: "write-affiliate-product-descriptions",
      goal: "Create affiliate-focused product copy for landing pages and roundups.",
      summary: "Use ChatGPT to write product descriptions that drive affiliate clicks.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M9-L4", title: "Write Affiliate Product Descriptions", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate short, punchy product descriptions for affiliate contexts.", real_world: "Benefit-led descriptions in roundups increase CTR." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Roundup blurbs, comparison posts, sidebar widgets.", tags: ["affiliate", "product", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product name and category", "Key benefit", "Differentiator", "Length (short/medium)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Describe this product." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "A good product with many features." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Generic", "Feature dump", "No benefit", "No CTA hook"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 3 affiliate product descriptions for [product]. Length: 50 words, 100 words, 150 words. Lead with main benefit. Include: outcome, differentiator, who it's for. CTA hook at end. No hype.",
          framework_used: "Benefit + Differentiator + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "50w: [benefit-led]. 100w: [add differentiator]. 150w: [add who for, CTA]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "3 lengths + 1-sentence tagline, 2 CTA variants, and 'best for' one-liner. Product: [X]. Benefit: [Y].", what_changed: "Tagline, CTA variants" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Roundup blurb", prompt: "50-word blurb for [product] in 'best [X]' roundup. Benefit, differentiator. End with CTA hook." },
            { title: "Comparison cell", prompt: "30-word description for [product] in comparison table. Key benefit + 1 differentiator." },
            { title: "Landing page", prompt: "150-word product description for affiliate landing page. Benefit, 3 bullets, CTA. Conversion-focused." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Affiliate product description for [product]. Length: [50/100/150] words. Benefit, differentiator, who for, CTA. No hype." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick product", "Define benefit and differentiator", "Run prompt", "Pick best length for context", "Add link"], task: "Write 3 product descriptions for roundup." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write same product for 2 audiences - beginner vs advanced.", hint: "Adjust benefit emphasis per audience." }),
        sec("CBM-14_CHECKLIST", { items: ["Benefit-led", "Differentiator clear", "Length appropriate", "CTA hook", "No hype"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Short blurbs = roundup standard", "Benefit > features", "Multiple lengths = flexible", "CTA hooks boost clicks"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Benefit + differentiator + CTA = affiliate descriptions that click." })
      ]
    }),
    buildLesson({
      title: "Write Affiliate Product Emails",
      slug: "write-affiliate-product-emails",
      goal: "Draft affiliate promotional emails that drive clicks without spamming.",
      summary: "Use ChatGPT to create value-first affiliate email copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M9-L5", title: "Write Affiliate Product Emails", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create affiliate emails that deliver value and earn clicks.", real_world: "Value-first affiliate emails get 2x clicks of pure promo." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Newsletter promotions, dedicated recommendation emails, product launch alerts.", tags: ["affiliate", "email", "newsletter", "promotion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product and offer", "Audience", "Value angle (tip, story, review)", "Disclosure"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write affiliate email." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check out this product. Buy it. Link below." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Pure promo", "No value", "No disclosure", "Spammy"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write affiliate promo email for [product]. Audience: [persona]. Value first: lead with [tip/story/insight] (50 words). Then product: why I recommend, who it's for, one con (honest). CTA. Disclosure. Under 200 words. Tone: helpful, not pushy.",
          framework_used: "Value first + Honest reco + CTA + Disclosure"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hook: tip or story. Product: why recommend, who for, one con. CTA. Disclosure (e.g. I earn a commission)." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Affiliate email + subject line options (5), preview text, P.S. with secondary CTA. Value-first. 200 words. Disclosure.", what_changed: "Subject options, preview, P.S." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Newsletter slot", prompt: "Affiliate segment for newsletter. Product: [X]. Value: [tip first]. 100 words. Soft CTA. Disclosure." },
            { title: "Dedicated", prompt: "Dedicated affiliate email. Product: [X]. Full review summary, pros/cons, CTA. 180 words. Honest. Disclosure." },
            { title: "Launch", prompt: "Product launch affiliate email. Product: [X]. Why excited, key benefit, early offer if any. 120 words. Disclosure." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Affiliate email for [product]. Audience: [X]. Value first: [tip/story]. Product: why, who for, one con. CTA. Disclosure. Under 200 words." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick product and audience", "Define value angle", "Run prompt", "Add link and disclosure", "Send"], task: "Write and send one affiliate email." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 2 versions: 80% value / 20% promo vs 50/50. Test which performs better.", hint: "Adjust word count ratio in prompt." }),
        sec("CBM-14_CHECKLIST", { items: ["Value first (tip/story)", "Honest (pro + con)", "Clear CTA", "Disclosure", "Under 200 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Value first = trust", "Honest cons = credibility", "Disclosure required", "Short and scannable"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Value first, honest reco, disclosure = affiliate emails that convert." })
      ]
    }),
  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 10 — Facebook Marketing
   slug: m10-facebook-marketing
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Facebook Marketing",
  slug: "m10-facebook-marketing",
  lessons: [
    buildLesson({
      title: "Create Facebook Ad Copy",
      slug: "create-facebook-ad-copy",
      goal: "Write scroll-stopping Facebook ad copy that converts.",
      summary: "Use ChatGPT to generate primary text, headlines, and CTA for FB ads.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L1", title: "Create Facebook Ad Copy", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create full ad copy set (primary, headlines, CTA) in under 5 minutes.", real_world: "Testing 3-5 copy variants improves ROAS 20-40%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Feed ads, Stories, Reels, lead gen.", tags: ["Facebook", "ads", "copywriting", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Offer or product", "Target audience", "Campaign goal", "Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write Facebook ad copy." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Buy our product. Best quality. Click here." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too salesy", "No hook", "Over character limit", "Generic CTA"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create Facebook ad copy for [product/offer]. Audience: [persona]. Goal: [conversion/awareness/leads]. Output: Primary text (125 chars hook + 200 chars body), 5 headlines (40 chars each), 3 descriptions (30 chars), 1 CTA. Scroll-stopping hook. No hype.",
          framework_used: "Hook + Body + Headlines + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Primary: [hook + body]. Headlines: [5 options]. Descriptions: [3]. CTA: [button]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "FB ad copy + 3 angle variants (pain, desire, social proof). Each: primary, 5 headlines. Character limits: primary 125, headlines 40.", what_changed: "Multiple angles, strict limits" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Lead gen", prompt: "FB lead gen ad. Offer: [free guide/webinar]. Audience: [X]. Primary (300 chars), 5 headlines (40). CTA: Learn More." },
            { title: "E-commerce", prompt: "FB e-commerce ad. Product: [X]. Audience: [Y]. Primary, 5 headlines, urgency. CTA: Shop Now." },
            { title: "Awareness", prompt: "FB awareness ad. Brand: [X]. Message: [Y]. Primary (250), 5 headlines. CTA: Learn More." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "FB ad copy for [offer]. Audience: [X]. Goal: [Y]. Primary (125 hook + 200 body), 5 headlines (40), 3 descriptions (30), CTA. Hook first." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define offer and audience", "Run prompt", "Paste into Ads Manager", "Test 3 headline variants"], task: "Launch one ad set with AI copy." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create copy for same offer in 3 hooks: curiosity, pain, desire.", hint: "Run 3 times with different hook instruction." }),
        sec("CBM-14_CHECKLIST", { items: ["Hook in first 125 chars", "Headlines under 40", "Multiple variants for testing", "CTA matches goal", "No hype"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Hook stops the scroll", "Character limits matter", "Test 3-5 headlines", "Primary text = story"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook + headlines + CTA = Facebook ad copy that converts." })
      ]
    }),
    buildLesson({
      title: "Write Headlines for Facebook Ads",
      slug: "write-headlines-for-facebook-ads",
      goal: "Generate high-converting ad headlines under 40 characters.",
      summary: "Use ChatGPT to create headline variations for A/B testing.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L2", title: "Write Headlines for Facebook Ads", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create 15+ headline options under 40 chars for testing.", real_world: "Headline tests often yield 15-25% CTR lift." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Feed ads, Stories, carousel, lead ads.", tags: ["Facebook", "headlines", "ads", "A/B test"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Offer/product", "Key benefit", "Audience", "Angle (curiosity/pain/benefit)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write headlines." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Great product. Best deal. Click now." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Over 40 chars", "Generic", "No variation", "Same angle"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 15 Facebook ad headlines for [product/offer]. Benefit: [X]. Audience: [Y]. Mix: 5 curiosity, 5 benefit-led, 5 urgency. Each under 40 characters. Number them. No 'click here'.",
          framework_used: "Curiosity + Benefit + Urgency mix"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. [curiosity 38 chars]\n2. [benefit 40 chars]\n3. [urgency 35 chars]\n..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "20 headlines: 5 curiosity, 5 benefit, 5 urgency, 5 question. Each under 40 chars. Add character count. For [offer].", what_changed: "Question angle, char count" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Lead magnet", prompt: "15 headlines for lead magnet: [offer]. Benefit: [X]. Mix curiosity/benefit. Under 40 chars." },
            { title: "Product", prompt: "15 headlines for product: [X]. Mix benefit, social proof, urgency. Under 40 chars." },
            { title: "Event", prompt: "15 headlines for event: [name]. Mix FOMO, benefit, curiosity. Under 40 chars." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "15 FB ad headlines for [offer]. Benefit: [X]. Audience: [Y]. Mix curiosity/benefit/urgency. Under 40 chars each. Numbered." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define offer and benefit", "Run prompt", "Pick top 5", "Create ad set with 5 headlines", "Monitor performance"], task: "Test 5 AI-generated headlines." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write headlines for 3 audiences - cold, warm, retargeting.", hint: "Adjust angle: cold=curiosity, warm=benefit, retarget=urgency." }),
        sec("CBM-14_CHECKLIST", { items: ["All under 40 chars", "Mix of angles", "No generic", "5+ for testing", "Benefit or curiosity"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["40 chars = FB limit", "Curiosity and benefit work best", "Test 5+ headlines", "Angle variety = learn faster"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Curiosity + benefit + urgency, under 40 chars = headlines that perform." })
      ]
    }),
    buildLesson({
      title: "Generate Ideas for Creatives",
      slug: "generate-ideas-for-creatives",
      goal: "Brainstorm ad creative concepts and visual directions.",
      summary: "Use ChatGPT to generate creative briefs and concepts for ad visuals.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L3", title: "Generate Ideas for Creatives", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get 10+ creative concepts with scene, text overlay, and style direction.", real_world: "Creative testing drives 50%+ of ad performance." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Image ads, video thumbnails, carousel concepts.", tags: ["Facebook", "creative", "concept", "ads"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Key message", "Audience", "Brand guidelines"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Ideas for ad creatives." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Use a nice image. Add text." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Vague", "No scene direction", "No variation", "Not actionable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 10 creative concepts for Facebook ad. Product: [X]. Message: [Y]. Audience: [Z]. For each: 1) Scene description (what to show), 2) Text overlay (5 words max), 3) Style (photo/UGC/animation), 4) Hook angle. Variety: lifestyle, product shot, testimonial, problem/solution.",
          framework_used: "Scene + Overlay + Style + Angle"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. Scene: [X]. Overlay: [Y]. Style: photo. Angle: lifestyle. 2. ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "10 concepts + Canva/Figma prompt for each (describe for AI image gen). Include aspect ratios: 1:1, 9:16.", what_changed: "AI image prompts, aspect ratios" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Product", prompt: "10 creative concepts for product: [X]. Mix: product shot, in-use, before/after, UGC style. Scene + overlay each." },
            { title: "Service", prompt: "10 creative concepts for service: [X]. Mix: outcome, testimonial, process. Scene + overlay each." },
            { title: "Lead magnet", prompt: "10 creative concepts for lead magnet: [X]. Mix: benefit, curiosity, social proof. Scene + overlay each." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "10 creative concepts for [product/offer]. Message: [X]. Audience: [Y]. Each: scene, overlay (5 words), style, angle. Variety." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define product and message", "Run prompt", "Pick top 3", "Brief designer or create in Canva", "Launch tests"], task: "Create 2 ad creatives from AI concepts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Generate concepts for 3 formats: single image, carousel, video.", hint: "Specify format in prompt, get format-specific ideas." }),
        sec("CBM-14_CHECKLIST", { items: ["Scene clearly described", "Overlay under 5 words", "Style specified", "Angle variety", "Actionable for designer"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Concepts beat vague briefs", "Variety enables testing", "Overlay = key message", "Format matters (1:1 vs 9:16)"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Scene + overlay + style = creative concepts that convert." })
      ]
    }),
    buildLesson({
      title: "Write Facebook Ad Video Scripts",
      slug: "write-facebook-ad-video-scripts",
      goal: "Create short video ad scripts for Feed and Reels.",
      summary: "Use ChatGPT to draft video scripts (15-60 seconds) for Facebook ads.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L4", title: "Write Facebook Ad Video Scripts", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft 15-60 second video scripts with hook, body, CTA.", real_world: "Video ads with strong hooks see 2-3x retention." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Feed video, Reels, Stories, UGC-style ads.", tags: ["Facebook", "video", "script", "ads"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Key message", "Length (15/30/60 sec)", "Style (talking head/UGC/product)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a video script." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Talk about the product. Say it is good. Tell them to buy." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No hook", "No timing", "Too long", "No CTA"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write [15/30/60] second Facebook video ad script. Product: [X]. Message: [Y]. Style: [talking head/UGC/product demo]. Structure: Hook (3 sec), Problem/desire (5-10 sec), Solution (10-20 sec), CTA (3 sec). Include [VISUAL] cues. Word count ~[150/300/500] for timing.",
          framework_used: "Hook + Problem + Solution + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "[0-3s] Hook: ... [3-10s] Problem: ... [10-25s] Solution: ... [25-30s] CTA: ... [VISUAL: show product]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Video script + shot list, on-screen text suggestions, and thumbnail concept. 30 seconds. [Product].", what_changed: "Shot list, text, thumbnail" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "15 sec", prompt: "15-second video script. Product: [X]. Hook + benefit + CTA. ~40 words. [VISUAL] cues." },
            { title: "UGC style", prompt: "30-second UGC-style script. Product: [X]. Casual, relatable. Hook (problem), show product, result, CTA. ~90 words." },
            { title: "Talking head", prompt: "60-second talking head script. Offer: [X]. Hook, 3 points, CTA. Conversational. ~150 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "[N] second video script. Product: [X]. Style: [Y]. Hook (3s) + body + CTA (3s). [VISUAL] cues. ~[words] for timing." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define product and length", "Run prompt", "Time the script", "Add visuals", "Record or brief creator"], task: "Script and produce one video ad." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 2 versions: native/Reels style vs polished/brand style.", hint: "Run twice with different style instructions." }),
        sec("CBM-14_CHECKLIST", { items: ["Hook in first 3 sec", "Clear structure", "Timing/word count", "[VISUAL] cues", "CTA at end"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Hook = retention", "Structure = clarity", "Timing matters", "Visual cues help production"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook in 3 sec + solution + CTA = video scripts that convert." })
      ]
    }),
    buildLesson({
      title: "Create Attention Grabbing Images",
      slug: "create-attention-grabbing-images",
      goal: "Generate prompts and concepts for scroll-stopping ad images.",
      summary: "Use ChatGPT to create prompts for AI image tools and visual concepts.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L5", title: "Create Attention Grabbing Images", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get AI image prompts and concepts for ad creatives.", real_world: "Custom visuals outperform stock photos by 30%+." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Feed ads, carousel, Stories, landing pages.", tags: ["Facebook", "creative", "images", "AI"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Key message", "Style (lifestyle/product/abstract)", "Aspect ratio"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Create an ad image." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "A nice image with a product." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Vague", "No prompt", "Not actionable", "No variation"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create 5 AI image prompts for Facebook ad. Product: [X]. Message: [Y]. Style: [lifestyle/product/UGC]. For each: detailed prompt for DALL-E/Midjourney (scene, lighting, mood, style). Include: 1:1 and 9:16 versions. No text in image (we add overlay).",
          framework_used: "Scene + Lighting + Mood + Style"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. [Full prompt for 1:1]. 2. [Full prompt for 9:16]. ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "5 image prompts + text overlay suggestions (where to place, font style), color palette. Product: [X]. Brand: [Y].", what_changed: "Overlay placement, color palette" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Product", prompt: "5 AI image prompts for product: [X]. Mix: hero shot, in-use, flat lay. 1:1. No text." },
            { title: "Lifestyle", prompt: "5 lifestyle image prompts. Product: [X]. Audience: [Y]. Scenes: [contexts]. 9:16. No text." },
            { title: "Abstract", prompt: "5 abstract/visual metaphor prompts. Message: [X]. Mood: [Y]. 1:1. Brand-safe." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "5 AI image prompts for [product]. Message: [X]. Style: [Y]. Aspect: 1:1 and 9:16. Scene, lighting, mood. No text in image." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define product and message", "Run prompt", "Copy into DALL-E/Midjourney", "Generate", "Add overlay in Canva"], task: "Create 2 ad images from AI prompts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create prompts for A/B test: bold/contrast vs soft/pastel.", hint: "Specify lighting and color in prompt." }),
        sec("CBM-14_CHECKLIST", { items: ["Detailed scene", "Lighting and mood", "Aspect ratio", "No text in prompt", "Brand-appropriate"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Detail = better AI output", "Leave space for overlay", "Style consistency helps", "Test visuals"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Scene + lighting + mood = AI image prompts that stop the scroll." })
      ]
    }),
    buildLesson({
      title: "AB Testing Copy for Conversion",
      slug: "ab-testing-copy-for-conversion",
      goal: "Design A/B test frameworks for ad copy and creative.",
      summary: "Use ChatGPT to create testable copy variants and hypotheses.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L6", title: "AB Testing Copy for Conversion", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create structured A/B test plans with hypotheses and variants.", real_world: "Structured tests beat random changes by 2x." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Ad copy tests, headline tests, CTA tests.", tags: ["Facebook", "A/B test", "conversion", "optimization"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Element to test (headline, primary, CTA)", "Current control", "Goal metric", "Audience"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me A/B test." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Test different things." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No structure", "No variants", "No hypothesis", "Unclear metric"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create A/B test plan for Facebook ad. Element: [headline/primary text/CTA]. Control: [current copy]. Goal: [CTR/conversion/CPA]. Generate: 1) Hypothesis (what we believe), 2) 4 variants (each with different angle: curiosity, benefit, urgency, social proof), 3) How to interpret (what metric, significance).",
          framework_used: "Hypothesis + Variants + Interpretation"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hypothesis: Benefit-led headlines will outperform curiosity. Variants: A control, B benefit, C urgency, D social proof. Interpret: CTR, 1000+ impressions per variant." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Test plan + sample size calculator note (when to read results), creative matrix (what to keep constant). Element: [X].", what_changed: "Sample size, creative matrix" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Headline", prompt: "Headline A/B test. Control: [X]. 4 variants: curiosity, benefit, urgency, question. Hypothesis. Interpretation." },
            { title: "Primary text", prompt: "Primary text test. Control: [X]. 4 variants: story, bullet, pain-first, social proof. Hypothesis." },
            { title: "CTA", prompt: "CTA button test. Options: [list]. 4 variants. Hypothesis. Which CTA for which intent." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "A/B test plan. Element: [X]. Control: [current]. Goal: [metric]. Hypothesis + 4 variants (curiosity/benefit/urgency/social proof) + interpretation." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick element and control", "Run prompt", "Set up test in Ads Manager", "Run 7 days or 1000+ impressions", "Analyze and implement winner"], task: "Run one structured A/B test." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create multivariate test: 2 headlines x 2 images = 4 combos.", hint: "Ask for matrix of headline + image combinations." }),
        sec("CBM-14_CHECKLIST", { items: ["Clear hypothesis", "4+ variants", "One element changed", "Metric defined", "Sample size considered"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Hypothesis guides learning", "One variable per test", "Curiosity/benefit/urgency = angles", "Sample size matters"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hypothesis + variants + metric = A/B tests that improve performance." })
      ]
    }),
    buildLesson({
      title: "Research PainPoints and Desires",
      slug: "research-painpoints-and-desires",
      goal: "Uncover audience pain points and desires for messaging.",
      summary: "Use ChatGPT to brainstorm pain points and desires from audience data.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L7", title: "Research PainPoints and Desires", time: "20 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 20+ pain points and desires for any audience.", real_world: "Pain-led ads often outperform benefit-led by 15-25%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Ad copy, landing pages, email, positioning.", tags: ["research", "audience", "pain points", "messaging"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Audience (role, industry)", "Product category", "Context (what they do)", "Optional: objections"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "What are their pain points?" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "They have problems. They want solutions." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague", "Generic", "No specificity", "Not actionable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "List 20 pain points and 20 desires for [audience]. Role: [X]. Industry: [Y]. Context: [what they do daily]. Organize: Pain points (frustrations, fears, costs) and Desires (outcomes, status, ease). Be specific, not generic. Output as two lists with 1-line each.",
          framework_used: "Pain (frustrations/fears/costs) + Desire (outcomes/status/ease)"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Pain: [20 specific]. Desire: [20 specific]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Pain points + desires + ad hook ideas for top 5 pains and top 5 desires. Audience: [X]. Product: [Y].", what_changed: "Ad hook ideas" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "B2B", prompt: "20 pains + 20 desires for B2B [role] in [industry]. Specific to their daily work." },
            { title: "B2C", prompt: "20 pains + 20 desires for [consumer persona]. [Life stage/context]. Specific." },
            { title: "Niche", prompt: "20 pains + 20 desires for [niche audience]. [Specific context]. Avoid generic." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "20 pain points + 20 desires for [audience]. Role: [X]. Context: [Y]. Pain: frustrations, fears, costs. Desire: outcomes, status, ease. Specific." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define audience and context", "Run prompt", "Pick top 5 pains and 5 desires", "Use in next ad copy", "Test which resonates"], task: "Research one audience, use in 2 ads." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Map top 5 pains to product features - which feature solves which pain.", hint: "Ask: 'Map these 5 pains to [product] features.'" }),
        sec("CBM-14_CHECKLIST", { items: ["Specific, not generic", "Pain + desire both", "20+ each", "Actionable for copy", "Audience-aligned"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Pain-led messaging converts", "Specific > generic", "Desires = aspiration", "Test which resonates"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Pain + desire research = messaging that resonates." })
      ]
    }),
    buildLesson({
      title: "Brainstorm New Angles for Creatives",
      slug: "brainstorm-new-angles-for-creatives",
      goal: "Generate fresh creative angles when performance plateaus.",
      summary: "Use ChatGPT to brainstorm new ad angles and concepts.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M10-L8", title: "Brainstorm New Angles for Creatives", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get 15+ new creative angles when current ads fatigue.", real_world: "Creative refresh can restore performance by 30-50%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Creative fatigue, new campaign, seasonal refresh.", tags: ["Facebook", "creative", "angles", "brainstorm"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Current angles (what you've used)", "Audience", "Goal"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "New ad ideas." }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Try different things." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Vague", "No structure", "Repetitive", "Not differentiated"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Brainstorm 15 new creative angles for [product/offer]. Current angles we've used: [list]. Audience: [X]. Avoid repeating these. Mix: pain-led, desire-led, social proof, curiosity, controversy, story, before/after, 'secret', objection-handling. Each: angle name + 1-line hook idea.",
          framework_used: "Angle + Hook"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. Pain-led: [hook]. 2. Social proof: [hook]. 3. Curiosity: [hook]. ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "15 angles + suggested creative format per angle (image/video/carousel), and ad copy opener. Product: [X].", what_changed: "Format suggestion, copy opener" }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Fresh campaign", prompt: "15 angles for new campaign. Product: [X]. Audience: [Y]. No previous angles. Full variety." },
            { title: "Fatigue refresh", prompt: "15 NEW angles. We've exhausted: [list]. Product: [X]. Different frameworks. Avoid repetition." },
            { title: "Seasonal", prompt: "15 angles for [season/holiday]. Product: [X]. Tie to occasion. Mix sentimental, urgency, gift." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "15 creative angles for [product]. Current: [list - avoid]. Audience: [X]. Mix: pain, desire, social proof, curiosity, story, etc. Angle + hook each." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List current angles", "Run prompt", "Pick 3 new angles", "Create 3 new ad concepts", "Launch and compare"], task: "Refresh creatives with 3 new angles." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 'angle calendar' - which angle to test each week for 4 weeks.", hint: "Prioritize by hypothesized impact." }),
        sec("CBM-14_CHECKLIST", { items: ["Different from current", "Mix of frameworks", "15+ angles", "Hook per angle", "Actionable"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Creative fatigue is normal", "New angles restore performance", "Variety = learning", "Track which angles win"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Fresh angles = creatives that keep converting." })
      ]
    }),
  ]
}

];

module.exports = { MODULES_M6_M10 };
