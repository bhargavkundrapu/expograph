// ChatGPT Business & Marketing Mastery — Modules 16–19 seed data
// Covers: Customer Service + Retention, SMS Marketing, Podcast Marketing, Instagram Complete Starter Pack

function sec(type, data) { return { type, data }; }

const MODULES_M16_M19 = [

/* ═══════════════════════════════════════════════════════════════
   MODULE 16 — Customer Service + Retention
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Customer Service + Retention",
  slug: "m16-customer-service-retention",
  lessons: [

    /* ── L1: Create FAQs ── */
    {
      title: "Create FAQs",
      slug: "create-faqs",
      goal: "Use ChatGPT to generate comprehensive, on-brand FAQs that deflect support tickets and improve customer self-service.",
      summary: "Learn to prompt ChatGPT to create organized FAQ content that answers real customer questions and reduces support load.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M16-L1", title: "Create FAQs", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate a complete FAQ section that covers common customer questions and feels on-brand.", real_world: "Good FAQs cut support tickets by 30–50% and help customers find answers 24/7." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need to add an FAQ page to your website, product help center, or sales page. Customers keep asking the same questions in email or chat.", tags: ["customer service", "website", "help center"] }),
        sec("CBM-03_INPUTS_YOU_NEED", {
          items: [
            "Your product or service name and description",
            "List of 5–10 real customer questions you receive",
            "Brand voice guidelines (formal, friendly, casual)",
            "Any policies (returns, shipping, guarantees)"
          ]
        }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write some FAQs for my business" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Q: What is your return policy?\nA: We have a return policy.\n\nQ: How do I contact support?\nA: You can contact us.\n\n(Generic, unhelpful, no specifics — customers still have to email you.)" }),
        sec("CBM-06_WHY_IT_FAILED", {
          reasons: [
            "Zero context about your product or real questions",
            "AI invents generic answers with no real details",
            "No brand voice or policy specifics",
            "Output is useless for actual support deflection"
          ]
        }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "You are a customer service copywriter. Create an FAQ section for [Product Name], a [brief description].\n\nReal customer questions we receive:\n1. [Question 1]\n2. [Question 2]\n...\n\nInclude: return window (30 days), shipping time (3–5 business days), how to reach support (email + live chat).\nTone: Friendly, clear, reassuring. Each answer 2–4 sentences max.\nFormat: Q: ... A: ...",
          framework_used: "GCCF"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Q: How long does shipping take?\nA: We ship within 24 hours and delivery typically takes 3–5 business days for continental US. You'll get a tracking number as soon as your order ships.\n\nQ: What is your return policy?\nA: We offer a 30-day hassle-free return. If you're not satisfied, email support@[company].com with your order number. We'll send a prepaid label and process your refund within 5 business days of receiving the item." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", {
          prompt: "Role: Senior customer success copywriter. Create an FAQ for [Product]. Include categories: Shipping & Returns, Account & Billing, Product Usage, Support. Use our real questions [list]. Add 2–3 proactive FAQs customers should ask but often don't. Tone: [brand voice]. Each A under 50 words. End with: 'Still have questions? [CTA].'",
          what_changed: "Added categories, proactive FAQs, and a CTA for unaddressed questions."
        }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Short-form FAQ for sales page", prompt: "Create 5 FAQ items for a sales page. Product: [X]. Address: price, delivery, guarantee. Each A is 1–2 sentences. Goal: reduce friction and boost conversions." },
            { title: "Detailed help center FAQ", prompt: "Create a 15-item FAQ for our help center. Product: [X]. Include expandable section headers: Getting Started, Orders, Account, Technical. Each answer 3–5 sentences with links placeholder [Learn more]." },
            { title: "Product-specific FAQ", prompt: "Create FAQs for our [software/hardware]. Focus on setup, troubleshooting, and integrations. Use questions: [list]. Tone: technical but friendly. Include 'Still stuck? Contact support.'" }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", {
          template: "Create an FAQ for [Product/Service].\n\nReal questions:\n[list 5–10]\n\nPolicies/numbers:\n[returns, shipping, support contact]\n\nTone: [friendly/formal/casual]\nFormat: Q: ... A: ... (2–4 sentences each)",
          notes: "Feed real customer questions — AI guesses poorly. Update FAQ when new recurring questions appear."
        }),
        sec("CBM-12_GUIDED_PRACTICE", {
          steps: [
            "List 5 real questions your customers ask",
            "Gather your policies (returns, shipping, support)",
            "Use the prompt card to generate an FAQ",
            "Edit any numbers or links AI got wrong",
            "Publish and track which questions get fewer follow-ups"
          ],
          task: "Generate a 7-item FAQ for one product or service you offer. Use at least 5 real questions."
        }),
        sec("CBM-13_CHALLENGE_TASK", {
          description: "Create an FAQ that covers both pre-purchase (pricing, features) and post-purchase (setup, returns, billing). Add one proactive 'What if...' question that anticipates a common worry.",
          hint: "Pre-purchase: FAQs that help close the sale. Post-purchase: FAQs that prevent refunds and support overload."
        }),
        sec("CBM-14_CHECKLIST", {
          items: [
            "Used real customer questions, not invented ones",
            "Included specific policies and numbers",
            "Set tone and word limits for answers",
            "Organized into categories if 10+ items",
            "Added a CTA for unresolved questions"
          ]
        }),
        sec("CBM-15_WHAT_YOU_LEARNED", {
          points: [
            "FAQs need real customer questions — AI invents generic ones otherwise",
            "Include policies and numbers so answers are actionable",
            "Short answers (2–4 sentences) perform better than long ones",
            "Categorize FAQs when you have 10+ items",
            "Good FAQs reduce support load and boost conversions"
          ]
        }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Feed ChatGPT real customer questions and your policies — it writes on-brand FAQs that deflect support tickets." })
      ]
    },

    /* ── L2: Manage Client Communication ── */
    {
      title: "Manage Client Communication",
      slug: "manage-client-communication",
      goal: "Use ChatGPT to draft professional, empathetic client emails that maintain relationships and resolve issues.",
      summary: "Learn to prompt ChatGPT for client-facing emails that strike the right tone and save time on follow-ups.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M16-L2", title: "Manage Client Communication", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft client emails that are professional, empathetic, and on-brand in seconds.", real_world: "Good client communication reduces escalations and builds trust." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "A client emails about a delay, complaint, or request. You need a professional, empathetic reply that acknowledges the issue and outlines next steps.", tags: ["client communication", "email", "customer service"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["The client's message or situation summary", "Your role and relationship", "What you can actually do", "Tone: apologetic, reassuring, solution-focused"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write an email to a client who is upset" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Dear Client, We apologize for any inconvenience. We value your business. Please let us know if you have further concerns. Best regards." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too generic — does not reference the actual issue", "No specific next steps or timeline", "Feels robotic and dismissive", "Does not show empathy or ownership"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "You are a [role] at [company]. A client wrote: '[message]'. Draft a reply that: 1) Acknowledges their concern specifically, 2) Apologizes and takes ownership, 3) States what we will do and by when, 4) Offers a clear next step. Tone: Professional, warm. 100-150 words.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hi [Name], thank you for reaching out. I'm sorry your order has been delayed — I've checked and your shipment will go out tomorrow. You'll receive tracking by end of day. If it doesn't arrive by [date], reply and I'll escalate personally. Thanks for your patience. Best, [You]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Role: Senior account manager. Client wrote: [message]. Reply must: name their concern explicitly, apologize once, list 2-3 concrete actions with dates, offer goodwill gesture if appropriate. End with clear CTA. Max 120 words.", what_changed: "Added goodwill option and tighter structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Delay reply", prompt: "Client upset about delayed order. Draft reply: acknowledge, give new date, offer expedited shipping or partial refund. 80 words." }, { title: "Complaint with constraint", prompt: "Client complained about [issue]. We can offer [alternative]. Draft reply that validates feelings, explains constraint, offers alternative." }, { title: "Scope creep / say no", prompt: "Client asked for [extra work] outside scope. Draft reply that says no kindly and suggests paid add-on." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "I'm a [role]. Client wrote: [message]. Draft reply: 1) Acknowledge concern, 2) Apologize/own it, 3) State actions + when, 4) Clear next step. Tone: professional. Max [X] words.", notes: "Customize dates and names. Never promise what you can't deliver." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Copy a real client message", "List what you can/cannot offer", "Use prompt card to draft reply", "Edit for accuracy", "Read aloud — does it sound human?"], task: "Draft reply to client upset about missed deadline. Include new date and one goodwill gesture." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Draft reply to client who wants full refund outside policy. Say no clearly but keep them as future customer.", hint: "Validate frustration, explain policy, offer partial refund or store credit." }),
        sec("CBM-14_CHECKLIST", { items: ["Addressed specific concern", "Included next steps and dates", "Tone matches brand", "No promises you can't keep", "Clear CTA"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Reference client message directly", "Own the problem and state actions", "Give dates, not vague assurances", "Goodwill gesture can turn complainers into advocates", "Short clear emails outperform long ones"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Acknowledge the issue, state your actions and timeline, end with clear next step — ChatGPT drafts it, you personalize it." })
      ]
    },

    /* ── L3: Respond to Comments and Haters ── */
    {
      title: "Respond to Comments and Haters",
      slug: "respond-to-comments-and-haters",
      goal: "Use ChatGPT to draft professional, brand-safe responses to negative comments and criticism on social media.",
      summary: "Learn to prompt ChatGPT for replies that defend your brand without escalating conflict.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M16-L3", title: "Respond to Comments and Haters", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Draft replies to negative comments that are professional, empathetic, and brand-safe.", real_world: "A good response can turn a hater into a fan — or at least show others you handle criticism well." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Someone leaves a negative comment on your post, review, or product page. You need to respond publicly without making things worse.", tags: ["social media", "reviews", "reputation"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["The comment text", "Context: product/service, platform", "Your brand voice (professional, playful)", "Whether to apologize, clarify, or redirect"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a reply to this negative comment" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Thank you for your feedback. We strive to provide the best experience. Please contact us if you have concerns." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Ignores the specific complaint", "Sounds like a bot", "Does not offer a real solution", "Others reading think you dodged the issue"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Brand: [X]. Platform: [Instagram/Google/YouTube]. Comment: '[comment]'. Draft a public reply that: 1) Acknowledges their frustration briefly, 2) Clarifies or apologizes where appropriate, 3) Offers a next step (DM, email, link). Tone: [professional/friendly]. Under 80 words. No defensive language.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hey [Name], sorry you had that experience — that's not what we want for our customers. We'd love to make it right. Can you DM us your order number? We'll look into it and get back to you within 24 hours. Thanks for giving us a chance to fix this." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Comment: '[comment]'. Type: [legitimate complaint / troll / competitor]. Draft reply. If legitimate: acknowledge + offer fix. If troll: brief, polite, do not engage. If competitor: factual, no attack. Brand voice: [X]. Max 60 words.", what_changed: "Classify comment type and tailor response strategy." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Legitimate complaint", prompt: "Customer complained about [issue]. Draft public reply: acknowledge, apologize, offer DM/email to resolve. Professional tone. 60 words." }, { title: "Troll / hate comment", prompt: "Troll comment: '[comment]'. Draft a brief, polite reply that does not escalate. Option: thank them and move on. No engagement bait." }, { title: "Unfair or false review", prompt: "False/competitor review on Google. Draft reply: thank for feedback, invite them to contact us to verify. Stay factual, no accusations. 50 words." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Brand: [X]. Comment: '[comment]'. Draft reply: 1) Acknowledge, 2) Clarify/apologize if needed, 3) Offer next step (DM, email). Tone: [professional]. Max 80 words. No defensiveness.", notes: "Take serious complaints offline. Public replies are for optics — real resolution happens in DMs or email." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Find a real negative comment (yours or a brand's)", "Classify: complaint, troll, or unfair", "Use prompt card to draft reply", "Check: does it sound human? Does it invite resolution?", "Adjust tone if needed"], task: "Draft replies for one legitimate complaint and one troll comment." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Draft a reply to a comment that mixes valid criticism with rude language. Respond to the criticism, not the rudeness.", hint: "Address the substance. Ignore the tone. Offer a real fix." }),
        sec("CBM-14_CHECKLIST", { items: ["Acknowledged the specific complaint", "No defensive or dismissive language", "Offered a next step", "Kept it short", "Sounds human, not robotic"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Legitimate complaints: acknowledge + fix. Trolls: brief, polite, move on.", "Public replies are for optics — resolution happens privately", "Never attack or get defensive in public", "Short replies perform better", "One good response can win over lurkers reading the thread"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Acknowledge the complaint, offer a fix, take it offline — ChatGPT drafts it, you add the human touch." })
      ]
    },

    /* ── L4: Increase Customer Retention ── */
    {
      title: "Increase Customer Retention",
      slug: "increase-customer-retention",
      goal: "Use ChatGPT to draft retention emails, win-back campaigns, and loyalty messaging that bring customers back.",
      summary: "Learn to prompt ChatGPT for retention-focused copy that reduces churn and increases repeat purchases.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M16-L4", title: "Increase Customer Retention", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create retention emails and loyalty messages that reduce churn and drive repeat purchases.", real_world: "Retaining a customer costs 5–25x less than acquiring a new one." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need win-back emails for dormant customers, loyalty program messaging, or post-purchase sequences that encourage repeat buys.", tags: ["email marketing", "retention", "loyalty"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/service type", "Customer segment (new, dormant, VIP)", "Offer if any (discount, freebie)", "Brand voice and CTA goal"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a customer retention email" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "We miss you! Come back and shop with us again. Use code COMEBACK for 10% off. Thank you for being a customer." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personalization or reason to care", "Generic offer with no urgency", "Does not remind them what they liked", "Feels like spam"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "You are an email copywriter. Draft a win-back email for [product type]. Customer hasn't purchased in [X months]. Include: 1) Subject line (under 50 chars), 2) Opening that acknowledges we haven't seen them, 3) Remind them of one benefit they loved, 4) Exclusive offer: [discount/free shipping], 5) Clear CTA. Tone: warm, not salesy. 150 words.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Subject: We miss you — here's 20% off\n\nHey [Name], it's been a minute. You were one of our early supporters and we noticed you haven't stopped by in a while. We've added [new feature/product] — thought you'd like it. As a thank you, here's 20% off your next order: COMEBACK20. No pressure, just wanted you to know we appreciate you. [CTA Button: Shop Now]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Segment: [dormant 90 days / at-risk / VIP]. Product: [X]. Draft 3-email sequence: 1) We miss you + soft CTA, 2) Reminder + stronger offer, 3) Last chance + best offer. Each: subject + body 100 words. Tone: [warm/playful].",
          what_changed: "Full sequence with escalation." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Win-back (dormant)", prompt: "Win-back email for customer who hasn't bought in 6 months. Product: [X]. Offer: 15% off. Remind them of one benefit. 120 words." }, { title: "Post-purchase upsell", prompt: "Email 7 days after purchase. Product: [X]. Suggest complementary product or subscription. Thank them, add value tip, soft CTA. 100 words." }, { title: "Loyalty / VIP thank you", prompt: "Thank-you email for VIP/loyalty member. No discount. Focus on appreciation, exclusive preview, early access. Make them feel special. 80 words." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Retention email: [segment — win-back/post-purchase/VIP]. Product: [X]. Offer: [discount/none]. Include: subject, acknowledgment, benefit reminder, offer if any, CTA. Tone: warm. [X] words.", notes: "Segment matters — dormant needs stronger offer than post-purchase." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a segment: dormant, post-purchase, or VIP", "Define offer (or none for thank-you)", "Use prompt card to draft email", "Add personalization placeholders", "A/B test subject line"], task: "Draft a win-back email for a customer who hasn't purchased in 4 months." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create a 2-email win-back sequence. Email 1: no discount, just 'we miss you' + new feature. Email 2: 15% off, urgency (expires in 7 days).", hint: "First email warms them up. Second email converts with offer." }),
        sec("CBM-14_CHECKLIST", { items: ["Segment is clear (dormant, post-purchase, VIP)", "Acknowledged their history with you", "Included benefit reminder or new value", "Offer matches segment (stronger for dormant)", "Clear CTA"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Retention emails need personalization — remind them what they liked", "Win-back needs stronger offer than post-purchase", "Sequences outperform single emails", "Thank-you emails (no offer) build loyalty", "Subject lines drive opens — test them"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Segment first: dormant needs a win-back offer, post-purchase needs value, VIP needs appreciation — ChatGPT drafts all three." })
      ]
    },

    /* ── L5: Survey Your Customers ── */
    {
      title: "Survey Your Customers",
      slug: "survey-your-customers",
      goal: "Use ChatGPT to create effective customer surveys and feedback forms that get honest, actionable responses.",
      summary: "Learn to prompt ChatGPT for survey questions that are clear, unbiased, and drive high completion rates.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M16-L5", title: "Survey Your Customers", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create surveys that get honest, actionable feedback and high completion rates.", real_world: "Good surveys inform product, marketing, and support — bad ones get ignored or skewed data." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need an NPS survey, post-purchase feedback form, or product research survey. Questions must be clear and unbiased.", tags: ["surveys", "feedback", "NPS", "research"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Survey goal (satisfaction, feature request, churn reason)", "Audience (new buyers, churned, power users)", "Length (short 3–5 Q vs long 10+ Q)", "Format (NPS, scale, open-ended)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write survey questions for my business" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "How do you feel about our product? (Great / Good / Bad)\n\nWould you recommend us? (Yes / No)\n\nAny comments? (_____)\n\n(Leading, vague, no actionable structure)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Leading questions bias answers", "Too vague to get actionable data", "No logic or flow", "Open-ended overload kills completion"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Create a post-purchase survey for [product]. Goal: understand satisfaction and identify improvement areas. Include: 1) NPS (0-10), 2) 3 multiple-choice (satisfaction, likelihood to recommend, top benefit), 3) 1 open-ended (what could we improve?). Keep under 5 questions. No leading language. Add short intro (1 sentence).", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Thanks for your purchase! Quick feedback helps us improve.\n\n1. How likely are you to recommend us to a friend? (0 = Not at all, 10 = Extremely likely)\n2. What did you like most? [Speed / Quality / Support / Price / Other]\n3. What's one thing we could do better? [open text]\n\nThank you!" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Survey type: [NPS / post-purchase / churn / feature prioritization]. Product: [X]. Length: [5 / 10] questions. Include: intro, mix of scale + multiple choice + 1 open-ended, thank-you. No leading questions. Add skip logic note: if NPS < 7, ask 'What could we do better?'", what_changed: "Conditional logic and survey type variations." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "NPS + follow-up", prompt: "Create NPS survey: 0-10 question + if score under 7, add open-ended 'What could we improve?'. Intro 1 sentence. Thank-you at end." }, { title: "Churn exit survey", prompt: "Exit survey for churned customers. 5 questions: reason (multi-select), what we could have done, would they return, feedback. Tone: respectful, no guilt." }, { title: "Feature prioritization", prompt: "Survey: which features matter most? List 5 features. Ask: rank 1-5 or pick top 2. Add one open-ended: 'What's missing?' 5 questions max." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Survey type: [NPS/post-purchase/churn/feature]. Product: [X]. Length: [5/10] Q. Include: intro, mix of scale + multi-choice + 1 open-ended, thank-you. No leading questions.", notes: "Keep it under 5 questions for higher completion. One open-ended max." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define survey goal and audience", "Choose length (5 Q for high completion)", "Use prompt card to generate questions", "Remove any leading language", "Test with 2-3 people first"], task: "Create a 5-question post-purchase survey for your product or service." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create a churn exit survey. Include: multi-select reason, one open-ended, optional 'would you return' and 'what would need to change'.", hint: "Make it easy to complete. Don't make them feel guilty." }),
        sec("CBM-14_CHECKLIST", { items: ["Clear goal and audience", "Under 5-7 questions for completion", "No leading questions", "Mix of scale, multi-choice, 1 open-ended", "Short intro and thank-you"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Short surveys (5 Q or less) get higher completion", "NPS + conditional follow-up captures detractors' feedback", "Avoid leading questions — use neutral language", "One open-ended is enough — more kills completion", "Churn surveys need a respectful, non-guilty tone"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Define goal, keep it short, mix question types, avoid leading language — ChatGPT writes the questions, you refine for bias." })
      ]
    },

  ]
},

/* MODULE 17 — SMS Marketing */
{
  title: "SMS Marketing",
  slug: "m17-sms-marketing",
  lessons: [
    {
      title: "SMS Promotions and Sales",
      slug: "sms-promotions-and-sales",
      goal: "Use ChatGPT to write high-converting SMS promo copy that drives clicks and sales within character limits.",
      summary: "Learn to craft SMS promotions that are punchy, clear, and conversion-focused.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M17-L1", title: "SMS Promotions and Sales", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write SMS promos that fit 160 characters, include urgency, and drive conversions.", real_world: "SMS has 98% open rate — but you have seconds and minimal characters to convert." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Flash sale, limited-time offer, or promo you want to push via SMS. Need copy that fits carrier limits and drives action.", tags: ["SMS", "promotions", "sales"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Offer details (discount, product)", "Urgency (time limit, quantity)", "CTA (link, code)", "Brand tone"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write an SMS for a sale" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hey! We're having a big sale! Check it out here: [link] Don't miss out!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No specific offer or value", "Vague urgency", "Over 160 chars (extra segment cost)", "No clear CTA or code"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write SMS promo for [product/brand]. Offer: [X% off / BOGO]. Urgency: [24hr / ends Sunday]. Include: hook, offer, code if applicable, CTA. Max 160 characters. Tone: [urgent/friendly].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "FLASH: 25% off everything ends tonight. Code: SAVE25. Shop now: [link] Reply STOP to opt out." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "SMS promo. Product: [X]. Offer: [details]. Urgency: [specific]. Include opt-out. A/B: version A with emoji, version B without. Both under 160 chars.", what_changed: "A/B variants and compliance (opt-out)." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Flash sale", prompt: "SMS: 24hr flash sale, 30% off. Product: [X]. Include code and link. 160 chars max." }, { title: "BOGO", prompt: "SMS: Buy one get one free. Product: [X]. Ends [date]. Link + opt-out. 160 chars." }, { title: "Free shipping", prompt: "SMS: Free shipping this weekend. Min order $50. Link. 160 chars." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "SMS promo. Offer: [X]. Urgency: [time/quantity]. Include: hook, offer, code, link, opt-out. Max 160 chars. Tone: [urgent/friendly].", notes: "Stay under 160 chars to avoid multi-segment fees. Always include opt-out." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define offer and urgency", "Use prompt card to draft", "Count characters (aim under 160)", "Add opt-out if missing", "Test link and code"], task: "Draft a 160-char SMS for a weekend sale with a code." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 2 SMS promos for same offer: one under 160 chars, one under 80 chars (ultra-short). Compare impact potential.", hint: "80 chars = even punchier. Cut everything but offer + link." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 160 characters", "Specific offer and urgency", "Code or link included", "Opt-out language", "Clear CTA"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["160 chars = 1 segment — more = higher cost", "Lead with offer or urgency", "Code + link drive conversions", "Opt-out is required for compliance", "Short and punchy outperforms long SMS"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook + offer + urgency + link + opt-out — under 160 chars. ChatGPT drafts it, you trim to fit." })
      ]
    },
    {
      title: "SMS OptIn Lead Generation",
      slug: "sms-optin-lead-generation",
      goal: "Use ChatGPT to write opt-in campaigns and lead magnets that grow your SMS list with quality subscribers.",
      summary: "Learn to craft opt-in messages and landing page copy that convert visitors into SMS subscribers.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M17-L2", title: "SMS OptIn Lead Generation", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create opt-in offers and messages that grow your SMS list with qualified leads.", real_world: "Opt-in rates drop when value prop is unclear — good copy = higher signups." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need opt-in copy for a landing page, popup, or form. Subscriber gets a reward (discount, content, early access) in exchange for their number.", tags: ["SMS", "lead gen", "opt-in"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Reward (discount %, freebie, exclusive)", "Placement (landing page, popup, checkout)", "Frequency expectation", "Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write SMS signup copy" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Sign up for texts! We'll send you deals. Enter your number below." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No clear value", "Does not mention what they get", "No frequency or privacy reassurance", "Weak CTA"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write SMS opt-in copy for [product]. Reward: [10% off / exclusive tips]. Include: headline, benefit bullets, frequency, privacy note, CTA. Max 80 words.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Get 10% off your first order + exclusive deals. Text JOIN to 55555. 2-4 msgs/mo. Unsubscribe anytime." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "SMS opt-in. Product: [X]. Reward: [details]. Add A/B headline. Include TCPA consent. CTA options.", what_changed: "A/B headlines and TCPA consent." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Discount opt-in", prompt: "SMS opt-in: 15% off first order. Headline, benefit, frequency, CTA. 60 words." }, { title: "Content lead magnet", prompt: "SMS opt-in: weekly tips. Headline, what they get, frequency. 50 words." }, { title: "Early access VIP", prompt: "SMS opt-in: early access to sales. Headline, exclusivity angle, CTA. 50 words." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "SMS opt-in. Reward: [X]. Include: headline, benefit, frequency, privacy/consent, CTA. Max 80 words.", notes: "TCPA requires clear consent. State frequency." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define the reward", "Use prompt card to draft", "Add consent language", "Test headline variations"], task: "Draft SMS opt-in copy for 10% first-order discount." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create opt-in copy for content lead magnet (weekly tips). No discount. Include frequency and unsubscribe note.", hint: "Focus on exclusivity and value of tips." }),
        sec("CBM-14_CHECKLIST", { items: ["Clear reward stated", "Frequency mentioned", "Privacy/consent language", "Strong CTA"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Value must be clear", "State frequency for expectations", "TCPA requires explicit consent", "Discount opt-ins convert higher than content-only"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "State reward, frequency, consent — ChatGPT drafts opt-in copy, you add TCPA language." })
      ]
    },
    {
      title: "SMS Reminders and Followups",
      slug: "sms-reminders-and-followups",
      goal: "Use ChatGPT to write transactional and reminder SMS that reduce no-shows and drive post-purchase engagement.",
      summary: "Learn to craft order confirmations, appointment reminders, and follow-up sequences via SMS.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M17-L3", title: "SMS Reminders and Followups", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create reminder and follow-up SMS that reduce no-shows and drive repeat engagement.", real_world: "Appointment reminders cut no-shows 25-30%. Order follow-ups increase repeat purchases." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Appointment reminder, order confirmation, cart abandonment, or post-purchase follow-up.", tags: ["SMS", "reminders", "follow-up"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Type (appointment, order, cart)", "Key details (date, time, order #)", "CTA (confirm, reschedule, shop)", "Brand tone"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a reminder SMS" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Reminder: You have an appointment. See you soon!" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No date, time, or location", "No action to take", "Too vague", "No brand identification"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write [appointment/order/cart] SMS. Include: key info (date, time, order #), clear CTA, brand. Max 160 chars. Tone: helpful.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Reminder: Your appointment at [Business] is tomorrow 2pm. Reply YES to confirm or RESCHEDULE. See you!" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "SMS reminder. Type: [appointment/order/cart]. Draft: confirmation, 24hr reminder, 1hr reminder. Each under 160 chars. Add opt-out to first.", what_changed: "Multi-message sequence." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Appointment", prompt: "SMS appointment reminder. Business, date, time, location. CTA: confirm or reschedule. 160 chars." }, { title: "Order", prompt: "SMS order confirmation. Order #, ETA, tracking link. 160 chars." }, { title: "Cart abandon", prompt: "SMS cart reminder. Product hint, discount if any, link. 160 chars." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "SMS [reminder/follow-up]. Type: [appointment/order/cart]. Include: key info, CTA, brand. Max 160 chars.", notes: "Appointments need date/time. Orders need order # and tracking." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick type", "List key details", "Use prompt card", "Add CTA", "Verify under 160 chars"], task: "Draft appointment reminder SMS with confirm/reschedule CTA." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 2-message cart abandon: 1hr reminder, then 24hr with 10% off. Both under 160 chars.", hint: "First: gentle. Second: add incentive." }),
        sec("CBM-14_CHECKLIST", { items: ["Key details included", "Clear CTA", "Under 160 chars", "Brand identified"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Reminders need date, time, location", "Order SMS need order # and tracking", "Sequences outperform single messages", "Cart abandon: first soft, second with offer"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Key details + clear CTA — ChatGPT drafts reminders, you plug in dates and links." })
      ]
    },
    {
      title: "SMS Tone Timing and Compliance Basics",
      slug: "sms-tone-timing-and-compliance-basics",
      goal: "Use ChatGPT to draft compliant SMS and adapt tone/timing best practices.",
      summary: "Learn TCPA, opt-out, and tone/timing guidelines for SMS marketing.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M17-L4", title: "SMS Tone Timing and Compliance Basics", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write SMS that stays compliant and uses right tone and timing.", real_world: "Compliance violations can cost thousands. Tone and timing affect engagement." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Audit existing SMS or draft new ones. Must include opt-out, avoid spam triggers, send at appropriate times.", tags: ["SMS", "compliance", "TCPA"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Message type", "Audience (B2C/B2B)", "Timezone", "Opt-out mechanism"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Make this SMS compliant" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "BUY NOW!!! LIMITED TIME!!! [link] (All caps, no opt-out — spam and compliance fail)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["All caps = spam", "No opt-out (TCPA)", "Misleading language", "Wrong tone"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Review SMS: '[message]'. Add opt-out if missing, remove spam triggers, adjust tone for [B2C/B2B]. Output revised version under 160 chars.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "25% off ends tonight. Code: SAVE25. Shop: [link]. Reply STOP to opt out." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "SMS compliance check. Message: [X]. Check: opt-out, no ALL CAPS, no misleading claims, send 9am-8pm local. Output compliant version + 3 timing tips.", what_changed: "Full checklist + timing." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Compliance audit", prompt: "Audit SMS. List: compliance issues, spam triggers, fixes. Add opt-out if missing." }, { title: "Tone adjust", prompt: "Rewrite SMS for [B2C/B2B] tone. Same offer. 160 chars." }, { title: "Timing", prompt: "Best send times for [product] SMS to [audience]. 3-5 windows + reasoning." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "SMS: '[message]'. Review: opt-out, spam triggers, misleading claims. Suggest compliant revision. 160 chars.", notes: "TCPA: consent + opt-out. Send 9am-8pm local." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick SMS", "Check opt-out", "Remove spam triggers", "Verify tone", "Confirm send window"], task: "Audit one SMS for compliance and suggest revision." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Draft compliant promo SMS. Two tones: urgent vs friendly. Both need opt-out, no spam triggers.", hint: "Urgent = limited time. Friendly = warm. Both need Reply STOP." }),
        sec("CBM-14_CHECKLIST", { items: ["Opt-out (Reply STOP)", "No ALL CAPS", "No excessive punctuation", "No misleading claims", "Send 9am-8pm local"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["TCPA: consent + easy opt-out", "ALL CAPS and !!! = spam", "Send 9am-8pm recipient timezone", "B2C: friendly. B2B: professional."] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Opt-out + no spam triggers + right tone + timing — ChatGPT audits; you enforce compliance." })
      ]
    },

  ]
},

/* MODULE 18 — Podcast Marketing */
{
  title: "Podcast Marketing",
  slug: "m18-podcast-marketing",
  lessons: [
    {
      title: "Podcast Interview Questions",
      slug: "podcast-interview-questions",
      goal: "Use ChatGPT to create engaging podcast interview questions that keep listeners hooked and highlight your expertise.",
      summary: "Learn to prompt ChatGPT for interview question lists that flow well and showcase guests or your own authority.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M18-L1", title: "Podcast Interview Questions", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create interview question lists that are engaging, non-generic, and showcase expertise.", real_world: "Great questions = great content. Bad questions = boring episodes." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You host a podcast and need questions for a guest, or you're a guest prepping for an interview.", tags: ["podcast", "interview", "content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Guest name and expertise", "Episode topic/angle", "Episode length", "Audience (who listens)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me podcast interview questions" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Tell us about yourself. What inspired you? What's your biggest challenge? (Generic, boring, guest has answered these 100 times)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Zero context about guest or topic", "Generic questions guest has heard before", "No flow or arc", "No hooks or curiosity builders"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Create 10 podcast interview questions for [guest name], [expertise]. Topic: [X]. Audience: [Y]. Include: 2 opening (warm-up), 5 deep-dive (specific to their experience), 2 curveball (unexpected), 1 closing (takeaway/CTA). Avoid generic 'tell us about yourself' questions. Questions should prompt stories.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. You once said [specific quote] — what led you there? 2. What's one decision you made early that most people get wrong? 3. If you had to start over tomorrow with $0, what would you do first? ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Podcast questions for [guest]. Topic: [X]. Include: opening, deep-dive (with follow-up prompts), curveball, closing. Add 2 'listener would ask' questions. Note timing (30 sec vs 3 min answers).", what_changed: "Follow-ups, listener angle, timing." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Expert interview", prompt: "10 questions for [expert] on [topic]. Focus on actionable insights. Avoid generic. Include 2 story prompts." }, { title: "Founder story", prompt: "Podcast questions for founder of [company]. Origin story, pivots, lessons. 8 questions, story-focused." }, { title: "Guest prep", prompt: "I'm a guest on [podcast]. Topic: [X]. Give me 5 questions they might ask + suggested talking points for each." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Podcast interview questions for [guest], [expertise]. Topic: [X]. Include: opening, deep-dive, curveball, closing. Avoid generic. Prompt stories.", notes: "Research guest first — reference their work, quotes, or recent news." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Research guest (bio, recent work, quotes)", "Define episode topic and angle", "Use prompt card to generate questions", "Add 1-2 personalized questions", "Order for flow"], task: "Create 8 interview questions for a hypothetical or real podcast guest." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create questions for a guest who's been on 20+ podcasts. Make yours stand out — no generic questions.", hint: "Find a niche angle, recent news, or controversial take they've shared." }),
        sec("CBM-14_CHECKLIST", { items: ["Guest and topic context", "Mix of warm-up, deep-dive, curveball", "No generic 'tell us about yourself'", "Story-prompting questions", "Flow from intro to closing"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Generic questions = generic answers", "Reference guest's work or quotes", "Story questions get best content", "Curveballs keep it interesting", "Order questions for narrative arc"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Context + structure + avoid generic — ChatGPT drafts questions, you personalize from guest research." })
      ]
    },

    {
      title: "Write a Podcast Script",
      slug: "write-a-podcast-script",
      goal: "Use ChatGPT to write podcast scripts for solo episodes, intros, outros, and ad reads.",
      summary: "Learn to create scripts that sound natural and keep listeners engaged.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M18-L2", title: "Write a Podcast Script", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write podcast scripts for intros, outros, ad reads that sound natural.", real_world: "Scripts keep you on track but must sound conversational." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Solo episode, intro/outro, ad read. Need script that sounds like you.", tags: ["podcast","script"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Segment type","Topic or sponsor details","Tone","Length"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a podcast script" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hello listeners. Today we will discuss marketing. (Robotic, no hook)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Sounds like essay","No hook","Too formal"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write [intro/outro/ad/solo] script. Topic: [X]. Length: 60 sec. Include: hook, main points, CTA. Write for speaking.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Hey everyone. Today we're talking about [topic]. In the next 20 min we'll cover [X], [Y], [Z]. Let's go." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Podcast script. Add delivery notes. Sound natural.", what_changed: "Delivery notes." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Intro", prompt: "Podcast intro. Hook + what they'll learn. 60 sec." }, { title: "Ad read", prompt: "Mid-roll ad. Benefits, CTA. 90 sec." }, { title: "Outro", prompt: "Recap, CTA, sign-off. 45 sec." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Podcast [intro/outro/ad/solo]. Topic: [X]. Hook, main points, CTA. Write for speaking.", notes: "Read aloud to test." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick segment","Define topic","Use prompt card","Read aloud"], task: "Write 60-sec intro." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write ad read for sponsor. Sound like recommendation.", hint: "Share why YOU use it." }),
        sec("CBM-14_CHECKLIST", { items: ["Hook in first 10 sec","Short sentences","Clear structure","Sounds natural"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Write for speaking","Hook early","Read aloud to test"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Write for the ear. ChatGPT drafts, you read aloud and tweak." })
      ]
    },
    {
      title: "Podcast Guest Outreach",
      slug: "podcast-guest-outreach",
      goal: "Use ChatGPT to draft podcast guest outreach emails that get responses.",
      summary: "Learn to write outreach that stands out and secures guest appearances.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M18-L3", title: "Podcast Guest Outreach", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write outreach emails that get podcast guests to say yes.", real_world: "Busy people get 100+ pitches. Yours must stand out in 5 seconds." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Invite someone to your podcast or pitch yourself as guest. Need outreach that gets opened and replied.", tags: ["podcast","outreach","guest"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Their name and work","Your show (name, audience, reach)","Proposed topic","Why they fit"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write an email to invite a podcast guest" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hi, I have a podcast and would like you to be a guest. Please let me know. Thanks." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No show context","No topic","No reason to care","Too vague"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Write podcast guest outreach. My show: [name], [audience]. Guest: [name], [expertise]. Topic: [X]. Why they fit: [reason]. Under 150 words. Subject included. Tone: professional, personal.", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Subject: [Their topic] + [Your audience]?\n\nHi [Name], I run [Show]. Your take on [specific thing] stuck with me. I'd love to have you on to discuss [angle]. Would [date range] work? No prep needed. [Your name]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Guest outreach. Include: personalized opener, show stats, topic, 2-3 time options, no-prep reassurance. 120 words.", what_changed: "Time options, no-prep." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Invite", prompt: "Email to invite [expert] to podcast. Show, topic, why them. 120 words." }, { title: "Pitch yourself", prompt: "Pitch yourself as guest on [podcast]. Expertise, topics, why fit. 100 words." }, { title: "Follow-up", prompt: "Follow-up after no response. Add new angle. 60 words. Not pushy." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Podcast guest outreach. Show, guest, topic, why fit. Subject, personalized opener, ask, time options. Under 150 words.", notes: "Reference their work — not mass-pitching." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Research guest","Define topic","Use prompt card","Personalize opener"], task: "Draft outreach to invite one person." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Pitch yourself as guest. Include 3 topics, why fit, one social proof.", hint: "Make it easy — topics ready, no prep." }),
        sec("CBM-14_CHECKLIST", { items: ["Personalized opener","Show context","Clear topic","Specific ask","Under 150 words"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Reference their work","Short emails get replies","Clear topic + why fit","Offer time options"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Personalize + value + clear ask — ChatGPT drafts, you add personal touch." })
      ]
    },
    {
      title: "Repurpose Podcast into Short Content",
      slug: "repurpose-podcast-into-short-content",
      goal: "Use ChatGPT to turn podcast episodes into Reels, TikToks, quotes, and posts.",
      summary: "Learn to extract and repurpose podcast content for short-form platforms.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M18-L4", title: "Repurpose Podcast into Short Content", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Turn podcast episodes into Reels, quotes, carousels that drive listeners back.", real_world: "One episode = 10+ pieces of short content. Repurposing multiplies reach." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You have a podcast and want clips, quotes, carousels for Instagram, TikTok, LinkedIn.", tags: ["podcast","repurpose","short-form"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Episode topic and key points","Transcript or summary","Platform","Format (clip, quote, carousel)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Turn my podcast into social posts" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check out our latest podcast! Listen here: [link] (No hook, no value)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No hook or value","Just link drop","Does not standalone","Wrong format"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "Podcast topic: [X]. Key points: [list]. Create: 1) Reels hook + 30-sec script, 2) 3 quote graphics (standalone), 3) Carousel outline (5 slides). Each must work alone. Platform: [Instagram/TikTok/LinkedIn].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Reels hook: 'The #1 mistake I see...' Script: [30-sec]. Quote 1: '[insight]'. Carousel: Slide 1 hook, 2-4 takeaways, 5 CTA." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Repurpose podcast. Create: 3 Reels hooks, 5 quotes, 1 carousel, 1 LinkedIn post. Each standalone. Platform CTAs.", what_changed: "Multiple formats, platform CTAs." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "Reels clip", prompt: "Podcast clip for Reels. Best 30-sec. Hook + script. CTA to full ep." }, { title: "Quotes", prompt: "5 quote graphics from podcast. Each standalone. No link needed." }, { title: "Carousel", prompt: "5-slide carousel. Slide 1 hook, 2-4 takeaways, 5 CTA." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Repurpose podcast. Topic: [X]. Key points: [list]. Create: [Reels/quotes/carousel]. Each standalone. Include CTA.", notes: "Each piece must deliver value alone." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick episode","Extract key points","Choose format","Use prompt card","Add CTA"], task: "Create 3 quotes + 1 Reels script from episode." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Turn one episode into: 1 Reels script, 3 quotes, 1 carousel. All work without listening.", hint: "Pull best insights. Each asset = one idea." }),
        sec("CBM-14_CHECKLIST", { items: ["Each asset standalone","Hook in first 3 sec (Reels)","Quotes punchy","Carousel structure","CTA to full ep"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["One episode = many assets","Standalone value","Hooks matter","Platform-specific CTAs"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Extract best moments, make each standalone — ChatGPT repurposes, you pick the gold." })
      ]
    },

  ]
},

/* MODULE 19 — Instagram Complete Starter Pack */
{
  title: "Instagram Complete Starter Pack",
  slug: "m19-instagram-complete-starter-pack",
  lessons: [
    {
      title: "Start Instagram Journey",
      slug: "start-instagram-journey",
      goal: "Use ChatGPT for Instagram getting started.",
      summary: "Learn to use ChatGPT for getting started.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L1", title: "Start Instagram Journey", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master getting started for Instagram with ChatGPT.", real_world: "ChatGPT accelerates getting started." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram getting started.", tags: ["Instagram","getting started"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [getting started]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for getting started." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for getting started." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram getting started. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Research Instagram Audience",
      slug: "research-instagram-audience",
      goal: "Use ChatGPT for Instagram audience research.",
      summary: "Learn to use ChatGPT for audience research.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L2", title: "Research Instagram Audience", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master audience research for Instagram with ChatGPT.", real_world: "ChatGPT accelerates audience research." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram audience research.", tags: ["Instagram","audience research"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [audience research]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for audience research." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for audience research." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram audience research. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Generate Instagram Content Ideas",
      slug: "generate-instagram-content-ideas",
      goal: "Use ChatGPT for Instagram content ideas.",
      summary: "Learn to use ChatGPT for content ideas.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L3", title: "Generate Instagram Content Ideas", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master content ideas for Instagram with ChatGPT.", real_world: "ChatGPT accelerates content ideas." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram content ideas.", tags: ["Instagram","content ideas"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [content ideas]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for content ideas." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for content ideas." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram content ideas. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Write Instagram Ad Scripts",
      slug: "write-instagram-ad-scripts",
      goal: "Use ChatGPT for Instagram ad copy.",
      summary: "Learn to use ChatGPT for ad copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L4", title: "Write Instagram Ad Scripts", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master ad copy for Instagram with ChatGPT.", real_world: "ChatGPT accelerates ad copy." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram ad copy.", tags: ["Instagram","ad copy"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [ad copy]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for ad copy." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for ad copy." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram ad copy. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Instagram Algorithm Basics Verify",
      slug: "instagram-algorithm-basics-verify",
      goal: "Use ChatGPT for Instagram algorithm.",
      summary: "Learn to use ChatGPT for algorithm.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L5", title: "Instagram Algorithm Basics Verify", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master algorithm for Instagram with ChatGPT.", real_world: "ChatGPT accelerates algorithm." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram algorithm.", tags: ["Instagram","algorithm"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [algorithm]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for algorithm." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for algorithm." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram algorithm. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Reels Hooks and Structure",
      slug: "reels-hooks-and-structure",
      goal: "Use ChatGPT for Instagram Reels.",
      summary: "Learn to use ChatGPT for Reels.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L6", title: "Reels Hooks and Structure", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master Reels for Instagram with ChatGPT.", real_world: "ChatGPT accelerates Reels." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram Reels.", tags: ["Instagram","Reels"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [Reels]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for Reels." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for Reels." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram Reels. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Captions and CTA Templates",
      slug: "captions-and-cta-templates",
      goal: "Use ChatGPT for Instagram captions.",
      summary: "Learn to use ChatGPT for captions.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L7", title: "Captions and CTA Templates", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master captions for Instagram with ChatGPT.", real_world: "ChatGPT accelerates captions." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram captions.", tags: ["Instagram","captions"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [captions]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for captions." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for captions." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram captions. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    },
    {
      title: "Hashtags and Comments Strategy",
      slug: "hashtags-and-comments-strategy",
      goal: "Use ChatGPT for Instagram hashtags.",
      summary: "Learn to use ChatGPT for hashtags.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M19-L8", title: "Hashtags and Comments Strategy", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Master hashtags for Instagram with ChatGPT.", real_world: "ChatGPT accelerates hashtags." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "You need help with Instagram hashtags.", tags: ["Instagram","hashtags"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche/industry","Audience","Goals","Brand voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Help me with Instagram" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Generic, unhelpful output." }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too vague","No context","No specific ask"] }),
        sec("CBM-07_GOOD_PROMPT", { prompt: "I'm in [niche]. Help me with [hashtags]. Audience: [X]. Include: [specifics]. Tone: [X].", framework_used: "GCCF" }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Structured, actionable output for hashtags." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Add platform specifics, A/B options, metrics to track.", what_changed: "More depth and structure." }),
        sec("CBM-10_3_VARIATIONS", { variants: [{ title: "A", prompt: "Variation A for hashtags." }, { title: "B", prompt: "Variation B." }, { title: "C", prompt: "Variation C." }] }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram hashtags. Niche: [X]. Audience: [Y]. Include: [Z]. Tone: [T].", notes: "Be specific. Add your niche and audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and audience","Use prompt card","Customize output","Test and iterate"], task: "Apply this topic to your account." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Take this topic to the next level with ChatGPT.", hint: "Combine with other CBM lessons." }),
        sec("CBM-14_CHECKLIST", { items: ["Niche defined","Audience clear","Prompt specific","Output customized"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Context matters","Specific prompts win","Iterate on output","Combine with other strategies"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "This topic + ChatGPT + specificity = results." })
      ]
    }
  ]
}

];

module.exports = { MODULES_M16_M19 };
