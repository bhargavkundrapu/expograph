// ChatGPT Business & Marketing Mastery — Modules 11–15 seed data
// Covers: YouTube Marketing, LinkedIn Growth + Automation, Twitter Growth, Social Media Creative Studio, Copywriting Assistant

function sec(type, data) { return { type, data }; }

const MODULES_M11_M15 = [

/* ═══════════════════════════════════════════════════════════════
   MODULE 11 — YouTube Marketing
   ═══════════════════════════════════════════════════════════════ */
{
  title: "YouTube Marketing",
  slug: "m11-youtube-marketing",
  lessons: [

    /* ── L1: Write YouTube Video Script ── */
    {
      title: "Write YouTube Video Script",
      slug: "write-youtube-video-script",
      goal: "Use ChatGPT to create engaging video scripts that hook viewers and deliver value.",
      summary: "Learn to prompt ChatGPT for YouTube scripts with hooks, structure, and clear CTAs.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M11-L1", title: "Write YouTube Video Script", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create complete video scripts with hook, body, and CTA in minutes.", real_world: "Structured scripts reduce editing time and improve viewer retention." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Educational videos, product demos, how-tos, vlogs. Need a script that flows and keeps viewers watching.", tags: ["YouTube", "video", "script", "content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Video topic and key message", "Target audience", "Video length (e.g., 5–10 min)", "Tone (educational, entertaining)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a YouTube script for me" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Generic intro, rambling body, no clear structure or CTA—unusable for recording.)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or audience specified", "No structure or length", "No hook or CTA", "Output feels generic and unfocused"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "You are a YouTube scriptwriter. Create a video script for: [TOPIC].\n\nAudience: [describe]. Length: [X] minutes (~[Y] words).\n\nStructure: 1) Hook (first 15 sec), 2) Problem/agitate, 3) Solution (3–5 key points), 4) CTA.\nTone: [educational/entertaining]. Include [A], [B] placeholders where I'll add b-roll notes.",
          framework_used: "Hook + Problem + Solution + CTA"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "[HOOK] Hey—if you've been struggling with [X], this video will fix it. Stay to the end for the exact steps.\n\n[PROBLEM] Most people do [wrong thing]...\n[SOLUTION] Step 1... Step 2... [CTA] Like, subscribe, comment your biggest challenge." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Script for [topic]. Hook: pattern interrupt (question or stat). Include timestamps, b-roll cues, on-screen text suggestions. Add retention beat at 30% and 70%. CTA: subscribe + specific comment ask.", what_changed: "Timestamps, b-roll cues, retention beats." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "How-to", prompt: "How-to script for [topic]. 5 min. Audience: [persona]. Hook with pain. 3 steps. CTA: download or subscribe. Include b-roll notes." },
            { title: "Product demo", prompt: "Product demo script for [product]. 3 min. Show problem, solution, key features, CTA to try. Conversational tone." },
            { title: "Story/entertainment", prompt: "Story-driven script for [topic]. Hook with curiosity. 3 acts. Emotional beat. Soft CTA at end. 8 min." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "YouTube script: [topic]. Audience: [X]. Length: [X] min. Structure: hook, problem, solution, CTA. Tone: [tone]. Include b-roll placeholders.", notes: "Add timestamps after drafting. Test hook aloud." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a video topic you know well", "Fill in audience and length", "Run prompt and read script aloud", "Add b-roll and timestamps", "Record or refine"], task: "Write a 5-min script for one real video idea." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a script with a pattern-interrupt hook (surprising stat, bold claim, or question). Test it on someone—do they want to keep listening?", hint: "First 15 seconds decide retention." }),
        sec("CBM-14_CHECKLIST", { items: ["Hook in first 15 seconds", "Clear structure (problem/solution)", "CTA at end", "Length matches target", "B-roll or visual cues noted"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Hooks drive retention—invest in the first 15 sec", "Structure keeps viewers engaged", "CTAs convert viewers to subscribers", "Scripts speed up filming and editing"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook → problem → solution → CTA. ChatGPT drafts it; you add your voice and b-roll." })
      ]
    },

    /* ── L2: Write YouTube Video Title ── */
    {
      title: "Write YouTube Video Title",
      slug: "write-youtube-video-title",
      goal: "Generate click-worthy YouTube titles that improve CTR without clickbait.",
      summary: "Use ChatGPT to create title options that balance curiosity, clarity, and keywords.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M11-L2", title: "Write YouTube Video Title", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 10+ title options that are clickable, accurate, and SEO-friendly.", real_world: "Titles drive 40–50% of click-through rate from search and suggested." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Every video needs a title. Titles affect search ranking and whether people click from browse or suggested.", tags: ["YouTube", "titles", "CTR", "SEO"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Video topic and core value", "Target keyword if known", "Tone (professional, playful, urgent)", "Length constraint (under 60 chars ideal)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a YouTube title" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "My Video About Marketing (Generic, no hook, no keyword)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or value proposition", "No curiosity or benefit", "Too long or too vague", "Ignores SEO keywords"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 10 YouTube titles for a video about [TOPIC].\n\nCore value: [what viewer gets]. Target keyword: [keyword]. Tone: [professional/playful].\n\nMix: curiosity gaps, how-to, numbers, and question format. Under 60 characters each. No clickbait—deliver on the promise.",
          framework_used: "Value + Keyword + Format mix"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. How to [X] in 5 Minutes (No Fluff)\n2. The [X] Trick Top Creators Use\n3. [X]: What They Don't Tell You\n4. Stop Doing [Y]—Do This Instead" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "10 titles for [topic]. Include: 3 curiosity, 3 how-to with numbers, 2 question, 2 list. Add A/B pairs. Max 60 chars. Front-load keyword where natural.", what_changed: "Structured mix, A/B pairs, keyword placement." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "How-to", prompt: "10 how-to titles for [topic]. Audience: [persona]. Include numbers. Under 60 chars. Mix formats." },
            { title: "List/roundup", prompt: "10 list-style titles for [topic]. Use numbers (5, 7, 10). Curiosity + value. Under 60 chars." },
            { title: "Tutorial", prompt: "10 tutorial titles for [topic]. Include 'how to' or 'step by step'. SEO-friendly. Under 60 chars." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "10 YouTube titles: [topic]. Value: [X]. Keyword: [Y]. Mix: curiosity, how-to, numbers. Under 60 chars. No clickbait.", notes: "Test top 2–3 in YouTube Studio. Front-load keywords." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List topic and one keyword", "Run prompt and copy top 5", "Check character count", "Pick 2 for A/B test"], task: "Generate titles for one existing or planned video." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write 5 titles that front-load your main keyword without feeling forced. Compare CTR over 2 weeks.", hint: "Keyword first 3–4 words often performs well." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 60 characters", "Delivers on promise (no clickbait)", "Keyword included where natural", "Mix of formats tested", "A/B pair for testing"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Titles drive CTR—invest time in them", "Curiosity + clarity beats vague or pure clickbait", "60 chars or less for mobile", "A/B test to find what works"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Curiosity + value + keyword = titles that get clicks and keep trust." })
      ]
    },

    /* ── L3: Write SEO YouTube Description ── */
    {
      title: "Write SEO YouTube Description",
      slug: "write-seo-youtube-description",
      goal: "Create descriptions that rank in search and help viewers find your content.",
      summary: "Use ChatGPT to draft SEO-optimized descriptions with keywords and structure.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M11-L3", title: "Write SEO YouTube Description", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write descriptions that rank in YouTube and Google search.", real_world: "Descriptions influence search visibility and help YouTube understand your content." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Every video needs a description. First 2–3 lines show in search—make them count.", tags: ["YouTube", "SEO", "description", "keywords"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Video topic and key takeaways", "Primary and secondary keywords", "Links (subscribe, website, social)", "Timestamps if applicable"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a YouTube description" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check out my video. Subscribe for more. (Generic, no keywords, no value)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No keywords for search", "First lines don't summarize value", "No structure or timestamps", "Wasted character space"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a YouTube description for a video: [TOPIC].\n\nKeywords: [primary], [secondary]. First 2 sentences (visible in search): summarize value and include primary keyword. Then: 3–5 bullet takeaways, timestamps if applicable, links placeholder. Under 200 words. Natural keyword placement.",
          framework_used: "Keyword-rich opening + structure"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "[Keyword-rich 2-sentence summary visible in search]\n\nIn this video you'll learn:\n• [Takeaway 1]\n• [Takeaway 2]\n\n0:00 Intro\n1:30 [Section]\n\n🔗 [Links]" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Description for [topic]. First 150 chars: keyword-rich summary (visible in search). Add: bullets, timestamps, related keywords sprinkled. Include CTA and links section. No keyword stuffing.", what_changed: "Character limit for fold, related keywords." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Tutorial", prompt: "SEO description for [tutorial topic]. Keywords: [list]. First 2 sentences for search. Add timestamps. Under 200 words." },
            { title: "List video", prompt: "Description for '[X] Best [topic]' video. Include all items in first 150 chars. Keywords. Timestamps for each item." },
            { title: "Product review", prompt: "Description for [product] review. Keywords. First 2 lines: summary + verdict. Bullets: pros, cons, who it's for." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "YouTube description: [topic]. Keywords: [primary, secondary]. First 150 chars: value + keyword. Then: bullets, timestamps, links.", notes: "First 150 chars show in search—make them count." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List topic and 3 keywords", "Run prompt and paste into YouTube", "Add real timestamps and links", "Check first 150 chars in search preview"], task: "Write an SEO description for one video." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Optimize an existing description. Compare search impressions before/after over 2 weeks.", hint: "Front-load primary keyword in first sentence." }),
        sec("CBM-14_CHECKLIST", { items: ["First 150 chars keyword-rich and valuable", "Primary keyword in first 2 sentences", "Timestamps included", "Links and CTA at end", "No keyword stuffing"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["First 150 chars matter most for search", "Natural keyword placement beats stuffing", "Structure (bullets, timestamps) helps viewers", "Descriptions support discovery"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Front-load value and keywords in the first 150 characters—that's what search shows." })
      ]
    },

    /* ── L4: Write YouTube Ad Script ── */
    {
      title: "Write YouTube Ad Script",
      slug: "write-youtube-ad-script",
      goal: "Create skippable and non-skippable ad scripts that convert viewers.",
      summary: "Use ChatGPT to draft YouTube ad scripts optimized for 6s, 15s, and 30s formats.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M11-L4", title: "Write YouTube Ad Script", time: "15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write ad scripts for 6s, 15s, 30s that hook and convert.", real_world: "6s ads need a punch in 5 sec; 30s ads need structure and CTA." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "YouTube TrueView (skippable), bumper (6s), non-skippable. Need scripts that work for each format.", tags: ["YouTube ads", "video ads", "TrueView", "bumper"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/service and main benefit", "Target audience", "Ad format (6s, 15s, 30s)", "CTA (sign up, buy, watch)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a YouTube ad" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Generic script, wrong length, no hook in first 5 sec, weak CTA)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No format or length specified", "Hook too late (viewers skip at 5 sec)", "No clear CTA", "Doesn't match skippable vs non-skippable logic"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a [6s / 15s / 30s] YouTube ad script for [PRODUCT].\n\nBenefit: [main outcome]. Audience: [persona]. CTA: [action].\n\nFor 6s: Hook in first 2 sec, brand + CTA. For 15s: Hook, benefit, CTA. For 30s: Hook, problem, solution, proof, CTA. Include word count (~150 words/30s).",
          framework_used: "Format-specific structure"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "6s: [Product] saves you 10 hours a week. Try free. [Brand].\n\n15s: Tired of [pain]? [Product] does [benefit] in minutes. Join 10k+ users. Start free—[CTA]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Create 3 scripts: 6s bumper, 15s skippable, 30s skippable for [product]. For each: hook timing, key beats, CTA. Add A/B variants for 15s (benefit-led vs problem-led).", what_changed: "Multi-format + A/B variants." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "6s bumper", prompt: "6s bumper ad for [product]. Hook in 2 sec. Product name + one benefit + CTA. ~25 words." },
            { title: "15s skippable", prompt: "15s skippable ad for [product]. Hook by 5 sec. Benefit, social proof, CTA. ~40 words." },
            { title: "30s story", prompt: "30s ad for [product]. Story arc: problem → solution → proof → CTA. ~75 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "YouTube ad: [6s/15s/30s]. Product: [X]. Benefit: [Y]. CTA: [Z]. Hook in first 5 sec. Include word count.", notes: "6s = punch only. 15s+ = benefit + CTA." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Choose format and product", "Run prompt for that format", "Time the script (read aloud)", "Adjust for length"], task: "Write a 6s and 15s ad for one product." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a 6s bumper that makes someone stop scrolling. Test: does it work without sound (caption-only)?", hint: "Visual + text must carry message in 6s." }),
        sec("CBM-14_CHECKLIST", { items: ["Hook in first 5 seconds", "Length matches format", "Clear CTA", "Brand mentioned", "Reads naturally when spoken"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["6s needs punch; 30s needs structure", "Hook timing is everything for skippable", "CTA must be explicit", "Test with and without sound"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "6s = hook + brand. 15s+ = hook + benefit + CTA. ChatGPT drafts; you time it." })
      ]
    },

    /* ── L5: Thumbnail Ideas ── */
    {
      title: "Thumbnail Ideas",
      slug: "thumbnail-ideas",
      goal: "Generate thumbnail concepts that stand out and increase CTR.",
      summary: "Use ChatGPT to brainstorm thumbnail ideas—faces, text, contrast, and emotion.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M11-L5", title: "Thumbnail Ideas", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get 10+ thumbnail concepts with text, composition, and emotion cues.", real_world: "Thumbnails + titles drive CTR. Testing both improves views." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Every video needs a thumbnail. Need ideas for faces, text overlay, colors, and emotional hooks.", tags: ["YouTube", "thumbnails", "CTR", "design"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Video topic and key hook", "Brand colors or style", "Face or no face (creator on camera)", "Emotion to convey (surprise, curiosity)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me thumbnail ideas" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Use bright colors. Add text. (Generic, no specificity)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or context", "No composition or text ideas", "No emotional direction", "Unusable for a designer"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 10 YouTube thumbnail concepts for a video: [TOPIC].\n\nFor each: 1) Main visual (face, product, scene), 2) Text overlay (3–5 words max), 3) Emotion (curiosity, surprise, etc.), 4) Color/composition note. Format: table with Concept | Visual | Text | Emotion | Notes.",
          framework_used: "Visual + Text + Emotion"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. Creator surprised face | 'You're Doing It Wrong' | Shock | Red text on yellow\n2. Before/after split | '5 Min Fix' | Curiosity | High contrast" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "10 thumbnail concepts for [topic]. Include: 3 face-forward, 3 text-heavy, 2 comparison, 2 curiosity gaps. For each: visual, text (max 5 words), color, why it works.", what_changed: "Category mix, rationale." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Face-forward", prompt: "5 thumbnail concepts with creator face for [topic]. Expressions and text overlay. Emotional hook." },
            { title: "Text-heavy", prompt: "5 text-heavy thumbnail ideas for [topic]. Max 5 words. Bold fonts. Color contrast." },
            { title: "Comparison", prompt: "5 before/after or vs thumbnail concepts for [topic]. Split screen or side-by-side. Clear contrast." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "10 thumbnail concepts: [topic]. For each: visual, text (max 5 words), emotion, color note. Mix: face, text, comparison.", notes: "Thumbnails must work at small size—bold and simple." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick a video topic", "Run prompt and copy top 5 concepts", "Brief a designer or create in Canva", "A/B test 2 thumbnails"], task: "Generate and implement one thumbnail from AI ideas." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 2 thumbnails (A: face, B: text-only) for same video. Compare CTR over 1 week.", hint: "Face thumbnails often win—but test your niche." }),
        sec("CBM-14_CHECKLIST", { items: ["Text under 5 words", "Readable at small size", "Emotional hook", "High contrast", "Delivers on title promise"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Visual + text + emotion = thumbnails that click", "Test face vs text-only for your audience", "Bold and simple works at thumbnail size", "Thumbnail + title work together"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Visual + 3–5 word text + emotion—ChatGPT gives concepts; you make them pop." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 12 — LinkedIn Growth + Automation
   ═══════════════════════════════════════════════════════════════ */
{
  title: "LinkedIn Growth + Automation",
  slug: "m12-linkedin-growth-automation",
  lessons: [

    {
      title: "Optimize LinkedIn Profile",
      slug: "optimize-linkedin-profile",
      goal: "Use ChatGPT to craft a headline, summary, and about section that attract your ideal audience.",
      summary: "Learn to prompt ChatGPT for profile copy that ranks and converts visitors to connections.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L1", title: "Optimize LinkedIn Profile", time: "18 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a headline and about section that position you clearly and attract ideal clients.", real_world: "Optimized profiles get 3–5x more profile views and connection requests." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Your LinkedIn profile is your landing page. Headline and about section need to communicate value fast.", tags: ["LinkedIn", "profile", "headline", "personal branding"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Role, industry, and target audience", "Key outcomes you deliver", "Brand voice", "Keywords for search"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write my LinkedIn headline" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Professional | Leader | Expert (Generic, no differentiation)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No context on role or value", "Generic buzzwords", "No audience or outcome", "Not searchable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 5 LinkedIn headlines for [ROLE] in [INDUSTRY].\n\nI help [TARGET] achieve [OUTCOME]. Keywords: [list]. Max 220 characters. Mix: outcome-led, curiosity, and credibility. No buzzwords like 'guru' or 'ninja'.",
          framework_used: "Role + Outcome + Keywords"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "I help B2B marketers turn cold outreach into booked calls | 2x response rates" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Headline + About section (1300 chars) for [role]. Include: who you help, what you do, proof, CTA. Keywords for search. Tone: [professional/approachable].", what_changed: "Full profile section, CTA." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Headline only", prompt: "5 LinkedIn headlines for [role]. Audience: [X]. Outcome: [Y]. Under 220 chars." },
            { title: "About section", prompt: "LinkedIn About (1300 chars) for [role]. Hook, value, proof, CTA. Keywords: [list]." },
            { title: "Featured section", prompt: "3 featured section blurbs for LinkedIn. Each 100 chars. Topics: [list]." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "LinkedIn [headline/about] for [role]. Help [audience] achieve [outcome]. Keywords: [list]. Max [X] chars. No buzzwords.", notes: "Headline = 220 chars. About = 2600 max." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List role, audience, outcome", "Run headline prompt, pick best", "Run about prompt, edit for voice", "Add keywords and CTA"], task: "Optimize headline and about section this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test 2 headlines for 2 weeks. Track profile views and connection acceptance.", hint: "Use LinkedIn analytics or note weekly views." }),
        sec("CBM-14_CHECKLIST", { items: ["Headline under 220 chars", "Outcome-focused", "Keywords included", "About has hook, value, proof, CTA", "No buzzwords"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Headline is searchable—include keywords", "Outcome > title", "About should hook and convert", "Test and iterate"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Headline = who you help + outcome. About = hook + value + proof + CTA." })
      ]
    },

    {
      title: "LinkedIn Content Strategy",
      slug: "linkedin-content-strategy",
      goal: "Build a content strategy and content calendar with ChatGPT.",
      summary: "Use ChatGPT to plan topics, formats, and posting cadence for LinkedIn growth.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L2", title: "LinkedIn Content Strategy", time: "20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a 4-week content plan with topics, formats, and hooks.", real_world: "Consistent strategy beats random posting—2–3x more engagement." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Planning LinkedIn content. Need themes, post types, and a calendar.", tags: ["LinkedIn", "content strategy", "calendar", "planning"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche and target audience", "Goals (leads, brand, thought leadership)", "Posting frequency", "Content pillars (3–5 themes)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me LinkedIn content ideas" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Post about your industry. Share tips. (Too vague, no structure)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No audience or pillars", "No calendar or cadence", "No format mix", "Unactionable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create a 4-week LinkedIn content strategy for [ROLE] in [INDUSTRY].\n\nAudience: [describe]. Pillars: [3–5 themes]. Post [X] times/week.\n\nOutput: Table with Week | Day | Topic | Format (carousel, text, poll) | Hook idea.",
          framework_used: "Pillars + Cadence + Format"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Week 1 Mon: [Topic] | Carousel | Hook: '3 mistakes...'\nWeek 1 Thu: [Topic] | Text | Hook: Story opening" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "4-week strategy for [role]. Pillars: [list]. Include: thought leadership, how-to, story, engagement (poll/question). Add CTA for each. Track KPIs.", what_changed: "Format mix, CTAs, KPIs." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "B2B", prompt: "B2B LinkedIn strategy for [role]. 3x/week. Mix: insights, case studies, tips. 4 weeks." },
            { title: "Personal brand", prompt: "Personal brand content plan for [niche]. 5x/week. Mix: story, opinion, how-to, engagement." },
            { title: "Lead gen", prompt: "Lead gen LinkedIn strategy. Audience: [X]. Include soft-sell posts, value posts, CTA posts. 4 weeks." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "4-week LinkedIn strategy. Role: [X]. Audience: [Y]. Pillars: [list]. Frequency: [N]/week. Output: Week | Day | Topic | Format | Hook.", notes: "Balance value and promo. 80/20 rule." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define pillars and audience", "Run prompt and export to calendar", "Assign topics to dates", "Draft first week"], task: "Create and implement a 2-week content plan." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Run the strategy for 4 weeks. Compare engagement (likes, comments, shares) to prior month.", hint: "Track which format and pillar performs best." }),
        sec("CBM-14_CHECKLIST", { items: ["3–5 content pillars", "Mix of formats", "Posting cadence defined", "Hooks for each post", "CTA in most posts"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Strategy beats random posting", "Pillars keep you focused", "Mix formats for engagement", "Test and adjust based on data"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Pillars + cadence + format mix = a strategy you can execute." })
      ]
    },

    {
      title: "Generate LinkedIn Post Ideas",
      slug: "generate-linkedin-post-ideas",
      goal: "Never run out of post ideas—generate batches with ChatGPT.",
      summary: "Use ChatGPT to brainstorm posts by pillar, format, and angle.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L3", title: "Generate LinkedIn Post Ideas", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 20+ post ideas in 2 minutes, organized by pillar and format.", real_world: "Idea bank eliminates blank-page syndrome." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Stuck on what to post. Need ideas that fit your brand and audience.", tags: ["LinkedIn", "content ideas", "brainstorm", "planning"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Content pillars", "Target audience", "Recent trends or news", "Format preference (text, carousel, poll)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me post ideas" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Post about success. Share a tip. (Generic, unusable)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No niche or pillars", "No format or angle", "Generic ideas", "No hook structure"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 20 LinkedIn post ideas for [ROLE] in [INDUSTRY].\n\nPillars: [list]. Audience: [describe]. Format mix: 10 text, 5 carousel, 5 engagement (poll/question).\n\nFor each: topic, hook (first line), format. Output as table.",
          framework_used: "Pillar + Format + Hook"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. [Topic] | Hook: 'I spent 5 years making this mistake...' | Text\n2. [Topic] | Hook: '3 frameworks that changed how I...' | Carousel" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "30 post ideas for [role]. Include: 10 thought leadership, 10 how-to, 10 engagement. Add hook + CTA suggestion. Tie to recent trends where relevant.", what_changed: "Category mix, CTA, trends." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Carousel ideas", prompt: "15 carousel post ideas for [niche]. Topics: [pillars]. Include hook for each." },
            { title: "Story-based", prompt: "15 story-based post ideas for [role]. Personal lessons, failures, wins. Hook = opening line." },
            { title: "Trending", prompt: "10 post ideas tied to [recent trend/news] in [industry]. Opinion and takeaway angles." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "20 LinkedIn ideas: [role]. Pillars: [list]. Mix: text, carousel, engagement. For each: topic, hook, format.", notes: "Save best ideas in a swipe file." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List pillars and audience", "Run prompt and copy to doc", "Pick top 5 and draft", "Use one this week"], task: "Generate and use 5 new post ideas." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Generate 30 ideas. Post 1 per day for 2 weeks. Track which hooks get most engagement.", hint: "Note which topics/comments get most likes and comments." }),
        sec("CBM-14_CHECKLIST", { items: ["Ideas match pillars", "Hooks included", "Format mix", "Relevant to audience", "Actionable"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Batch idea generation saves time", "Hooks drive engagement", "Format mix keeps feed fresh", "Track what works"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Pillar + hook + format = endless post ideas." })
      ]
    },

    {
      title: "Leverage LinkedIn Groups",
      slug: "leverage-linkedin-groups",
      goal: "Use ChatGPT to craft valuable comments and discussions in LinkedIn groups.",
      summary: "Learn to write group posts and comments that build authority without spamming.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L4", title: "Leverage LinkedIn Groups", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create group posts and comments that add value and attract connections.", real_world: "Groups put you in front of targeted audiences—value-first wins." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Participating in LinkedIn groups. Need to add value, not promote.", tags: ["LinkedIn", "groups", "engagement", "community"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Group topic and audience", "Your expertise", "Goal (visibility, connections)", "Tone (helpful, not salesy)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write something for a LinkedIn group" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check out my product! (Spammy, gets removed)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["Too promotional", "No value add", "Generic", "Ignores group norms"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write a value-first LinkedIn group post for [GROUP TOPIC].\n\nI'm a [role]. Post should: 1) Share a useful tip or insight, 2) Ask a question to spark discussion, 3) No direct promo—soft CTA in comments only if someone asks. Tone: helpful, expert. Under 200 words.",
          framework_used: "Value + Question + No promo"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "I've noticed a lot of questions about [topic]. Here's what's worked for me: [2-3 sentences of value]. Curious—what's your experience? Would love to hear different approaches." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Group post + 3 comment templates for replying to others. Post: value, question. Comments: add insight, offer help, soft CTA when relevant. All under 150 words.", what_changed: "Comment templates for engagement." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Discussion starter", prompt: "Discussion post for [group]. Topic: [X]. Share opinion, ask for others' take. No promo. 150 words." },
            { title: "Helpful reply", prompt: "3 templates for replying to group posts. Add value, offer resource, soft CTA. Match group tone." },
            { title: "Question post", prompt: "Post that asks a thoughtful question to [group]. Topic: [X]. Encourage sharing. 100 words." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "LinkedIn group post: [topic]. Value-first. Share tip, ask question. No promo. Under 200 words. Tone: helpful.", notes: "Value first. Promote only when asked." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick one group you're in", "Run prompt for that topic", "Post and respond to comments", "Note what gets engagement"], task: "Post once in a group and reply to 3 others." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Post in 3 different groups this week. Compare which gets most meaningful engagement.", hint: "Niche groups often outperform large ones." }),
        sec("CBM-14_CHECKLIST", { items: ["Value-first, no hard sell", "Question to spark discussion", "Under 200 words", "Matches group norms", "Reply to comments"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Value-first wins in groups", "Questions drive engagement", "Promote only when asked", "Consistency builds presence"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Value + question + no promo = group presence that converts." })
      ]
    },

    {
      title: "Create LinkedIn Ads",
      slug: "create-linkedin-ads",
      goal: "Write LinkedIn ad copy (single image, carousel) that converts.",
      summary: "Use ChatGPT to draft ad headlines, body copy, and CTAs for LinkedIn Campaign Manager.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L5", title: "Create LinkedIn Ads", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create ad copy for single image and carousel ads that drive leads.", real_world: "LinkedIn ads are expensive—good copy improves CTR and lowers CPA." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Running LinkedIn ads for lead gen, webinars, or product. Need headlines, body, CTA.", tags: ["LinkedIn ads", "lead gen", "B2B", "copywriting"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer and benefit", "Target audience (role, company size)", "Ad format (single image, carousel)", "CTA (download, register, learn more)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write LinkedIn ad copy" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Learn more. Sign up today. (Generic, no benefit)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No benefit or outcome", "No audience context", "Weak CTA", "Over character limits"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write LinkedIn ad copy for [PRODUCT/OFFER].\n\nAudience: [role] at [company size]. Benefit: [outcome]. CTA: [action].\n\nProvide: 5 headline options (70 chars max), 3 body copy options (150 chars max), 2 CTA button texts. Tone: professional, benefit-led.",
          framework_used: "Benefit + Audience + Constraints"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headlines: 'Save 10 hrs/week on [task]' | 'The [X] playbook for [role]'\nBody: 'Join 5,000+ [role] who...'\nCTA: 'Get the guide' | 'Start free'" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "LinkedIn ad: headline (70), intro (150), body (600). Carousel: 5 slide headlines + 1 line each. A/B variants. Include UTM param suggestions.", what_changed: "Full formats, carousel, UTM." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Lead gen", prompt: "LinkedIn lead gen ad for [offer]. Audience: [X]. Headline 70 chars. Body 150. CTA: download/register." },
            { title: "Carousel", prompt: "5-slide carousel ad for [product]. Headline per slide. 1 benefit each. CTA slide." },
            { title: "Retargeting", prompt: "Retargeting ad for [product]. They visited [page]. Remind benefit, add urgency. 150 chars." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "LinkedIn ad: [product]. Audience: [X]. Benefit: [Y]. Headline 70 chars. Body 150. CTA: [Z]. Professional tone.", notes: "LinkedIn limits: headline 70, intro 150, body 600." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define offer and audience", "Run prompt and copy to Campaign Manager", "A/B test 2 headlines", "Monitor CTR and CPA"], task: "Create one LinkedIn ad and run for 1 week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Run A/B test: benefit-led vs problem-led headline. Compare CTR and cost per lead.", hint: "Track in Campaign Manager." }),
        sec("CBM-14_CHECKLIST", { items: ["Headline under 70 chars", "Body under 150 (intro)", "Benefit clear", "CTA specific", "Audience-aligned"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Character limits matter—stay under", "Benefit-led copy performs", "A/B test headlines", "LinkedIn = professional tone"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Headline 70 chars + benefit + CTA. ChatGPT drafts; you test." })
      ]
    },

    {
      title: "Generate LinkedIn Hashtags",
      slug: "generate-linkedin-hashtags",
      goal: "Find the right hashtags for reach and relevance.",
      summary: "Use ChatGPT to generate hashtag sets for posts and campaigns.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L6", title: "Generate LinkedIn Hashtags", time: "10 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get 15–20 hashtags per post: mix of popular, niche, and brand.", real_world: "Right hashtags extend reach to relevant audiences." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Every LinkedIn post. Need a mix of broad and niche hashtags.", tags: ["LinkedIn", "hashtags", "reach", "discovery"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Post topic or niche", "Target audience", "Brand hashtag if any", "Count (typically 3–5 per post)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me hashtags" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "#marketing #business #success (Too broad, low relevance)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or niche", "All generic", "Too many or too few", "No mix of reach vs relevance"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 15 LinkedIn hashtags for [TOPIC/NICHE].\n\nInclude: 5 high-reach (popular), 5 niche (specific), 3 branded/community. Output as 3 groups. Explain which to use when (e.g., 2–3 per post from each group).",
          framework_used: "Reach + Niche + Brand mix"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "High: #Marketing #Leadership #Business\nNiche: #B2BMarketing #SaaS #GrowthHacking\nBrand: #YourBrand #CommunityName" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Hashtag sets for 5 post types: thought leadership, how-to, industry news, promo, engagement. 5–7 each. Mix reach, niche, brand.", what_changed: "Per-format sets." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "By topic", prompt: "15 hashtags for [topic]. Mix: popular, niche, emerging. 3 groups." },
            { title: "By goal", prompt: "Hashtags for [reach/engagement/community]. [Niche]. 10 each." },
            { title: "Campaign", prompt: "Hashtag set for [campaign topic]. Include campaign hashtag + supporting. 10 total." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "15 LinkedIn hashtags: [topic]. Mix: 5 popular, 5 niche, 3 brand. Output in groups. Use 3–5 per post.", notes: "3–5 hashtags per post is sweet spot." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Run prompt for your niche", "Save sets in doc", "Use 3–5 per post", "Check which drive reach"], task: "Create a hashtag set and use for 5 posts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Test: 3 posts with niche-only hashtags vs 3 with popular-only. Compare reach.", hint: "Niche often has higher relevance." }),
        sec("CBM-14_CHECKLIST", { items: ["Mix of popular and niche", "Relevant to post", "3–5 per post", "No banned or spammy", "Brand hashtag if applicable"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Mix reach and relevance", "3–5 hashtags is optimal", "Niche beats generic for targeting", "Test and refine"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Popular + niche + brand = hashtags that extend reach." })
      ]
    },

    {
      title: "LinkedIn Automation",
      slug: "linkedin-automation",
      goal: "Use ChatGPT to write connection requests, follow-ups, and sequences.",
      summary: "Draft personalized (not spammy) automation messages for LinkedIn outreach.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M12-L7", title: "LinkedIn Automation", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create connection requests and follow-up sequences that feel personal.", real_world: "Personalized messages get 2–3x higher acceptance than generic ones." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Outreach via LinkedIn. Connection requests, follow-ups, InMail. Need to sound human.", tags: ["LinkedIn", "automation", "outreach", "connection requests"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Target persona", "Reason for connecting", "Offer or value", "Tone (professional, warm)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a connection request" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Hi, I'd like to connect. (Generic, no reason, gets ignored)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No personalization", "No reason to connect", "Too salesy", "Over character limit (300)"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 5 LinkedIn connection request variations for [TARGET ROLE] at [COMPANY TYPE].\n\nI'm reaching out because [reason—e.g. same industry, mutual interest]. Goal: [book call / share resource].\n\nEach under 300 chars. Mix: compliment, mutual connection, value offer. No 'I'd like to add you.'",
          framework_used: "Reason + Value + Under 300"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Saw your post on [topic]—great take on [X]. I help [role] with [outcome]. Would love to connect and share a resource." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Connection request (300 chars) + 3 follow-up messages (day 3, 7, 14). Personalization placeholders: [mutual connection], [recent post], [company]. Goal: [X]. No pitch in request.", what_changed: "Full sequence with timing." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Connection", prompt: "5 connection requests for [target]. Reason: [X]. Under 300 chars. Personal, not salesy." },
            { title: "Follow-up", prompt: "3 follow-up messages after no response. Days 3, 7, 14. Add value each time. Soft CTA. Under 500 chars." },
            { title: "InMail", prompt: "InMail to [role]. Cold. Hook, value, CTA. Under 200 words. Professional." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Connection request for [target]. Reason: [X]. Value: [Y]. Under 300 chars. No 'I'd like to add you.' Personal.", notes: "Connection limit 300 chars. Personalize when possible." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define target and reason", "Run prompt, pick 2 variations", "Personalize with name/post", "Send and track acceptance"], task: "Write and send 10 personalized connection requests." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test: generic vs personalized (mention their post or company). Compare acceptance rate.", hint: "Personalized wins—always reference something specific." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 300 chars (connection)", "Reason to connect", "Value or soft CTA", "No generic opener", "Personalized where possible"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Personalization 2–3x acceptance", "Reason + value beats 'add me'", "300 char limit—every word counts", "Follow-up sequences need value each step"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Reason + value + under 300 chars. Personalize or don't send." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 13 — Twitter Growth
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Twitter Growth",
  slug: "m13-twitter-growth",
  lessons: [

    {
      title: "Optimize Twitter Profile",
      slug: "optimize-twitter-profile",
      goal: "Use ChatGPT to write a bio, pinned tweet, and profile that attract followers.",
      summary: "Learn to prompt for Twitter profile copy that converts visitors to followers.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L1", title: "Optimize Twitter Profile", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a bio and pinned tweet that clearly communicate who you are and why to follow.", real_world: "Optimized profiles get more profile visits and follower conversion." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Twitter/X profile. Bio (160 chars), pinned tweet, and link.", tags: ["Twitter", "profile", "bio", "personal brand"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Role, niche, and audience", "Key topic or value", "Tone (witty, professional)", "Link if any"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write my Twitter bio" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Marketing expert. Coffee lover. (Generic, no hook)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No niche or value", "Wastes 160 chars", "No curiosity or CTA", "Doesn't differentiate"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 5 Twitter bio options (160 chars max) for [ROLE] in [NICHE].\n\nI tweet about [topics]. Audience: [describe]. Tone: [witty/professional/edgy]. Include one with emoji, one without. Make each hook-y.",
          framework_used: "Role + Niche + Tone"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Helping [audience] [outcome]. Tweets: [topic]. Newsletter: [link]. Prev: [credibility]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Twitter bio (160) + pinned tweet (280). Bio: who, what, why follow. Pinned: best value tweet that summarizes your offer. Tone: [X].", what_changed: "Bio + pinned tweet." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Bio only", prompt: "5 Twitter bios for [role]. 160 chars. Mix: value-led, curiosity, credential." },
            { title: "Pinned tweet", prompt: "3 pinned tweet options for [niche]. Value-first. 280 chars. CTA to follow." },
            { title: "Full profile", prompt: "Bio + pinned + header text idea for [role]. Cohesive brand. 160 + 280." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Twitter bio: [role]. Niche: [X]. 160 chars. Tone: [Y]. Mix options. Include pinned tweet idea.", notes: "Bio = 160 chars. Be specific." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List role, niche, tone", "Run prompt and pick best bio", "Write or generate pinned tweet", "Update profile"], task: "Optimize bio and add pinned tweet." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test 2 bios for 2 weeks. Track follower growth and profile visits.", hint: "Use Twitter analytics." }),
        sec("CBM-14_CHECKLIST", { items: ["Bio under 160 chars", "Clear value or hook", "Pinned tweet adds value", "Link included", "Tone consistent"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Bio needs to hook in 160 chars", "Pinned tweet = first impression", "Specificity beats generic", "Test and iterate"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Bio = who + what + why follow. Pinned = your best value tweet." })
      ]
    },

    {
      title: "Write Tweets and Threads",
      slug: "write-tweets-and-threads",
      goal: "Create tweets and threads that get engagement and grow followers.",
      summary: "Use ChatGPT to draft single tweets and thread structures.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L2", title: "Write Tweets and Threads", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate tweets and thread outlines that are engaging and on-brand.", real_world: "Strong hooks and structure drive likes, retweets, and follows." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Daily tweeting, thread launches, thought leadership.", tags: ["Twitter", "tweets", "threads", "engagement"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic or idea", "Tone and voice", "Format (single, thread)", "Goal (engagement, leads, brand)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a tweet" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Here's a thought. (Vague, no hook, no engagement driver)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic or angle", "No hook", "Over 280 chars", "Doesn't invite engagement"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 5 tweets about [TOPIC].\n\nTone: [witty/professional/contrarian]. Audience: [describe]. Each under 280 chars. Include: 1 takeaway, 1 hot take, 1 question, 1 list, 1 story hook. Make each scroll-stopping.",
          framework_used: "Topic + Format mix + Hook"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Takeaway: '[Insight]'\nHot take: 'Unpopular opinion: [X]'\nQuestion: 'Why does everyone [X] when [Y] works better?'" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Thread outline: [topic]. 8 tweets. Tweet 1: hook. Tweets 2-7: one idea each, build. Tweet 8: CTA. Under 280 each. Add engagement prompt in middle.", what_changed: "Full thread structure." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Single tweets", prompt: "10 tweets for [topic]. Mix: insight, hot take, question, list. Under 280. Engaging." },
            { title: "Thread", prompt: "Thread outline for [topic]. 6-10 tweets. Hook, build, CTA. One idea per tweet." },
            { title: "Reply guy", prompt: "5 reply templates to engage with [niche] accounts. Add value, not generic. Under 280." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Tweets: [topic]. Tone: [X]. 5-10 options. Mix: insight, hot take, question, list. Under 280. Thread: add structure.", notes: "Hook in first line. Save chars for punch." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick topic", "Run tweet prompt", "Edit for voice", "Post and track engagement"], task: "Write and post 5 tweets + 1 thread." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Write a 10-tweet thread. Track: which tweet gets most engagement? Optimize next time.", hint: "Hook tweet and CTA tweet often perform best." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 280 chars", "Hook in first line", "Invites engagement", "On-brand tone", "Thread has clear structure"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Hooks win the scroll", "Mix formats: insight, hot take, question", "Threads need structure", "First tweet makes or breaks thread"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook + value + engagement prompt. ChatGPT drafts; you add the edge." })
      ]
    },

    {
      title: "Leverage Twitter Trends",
      slug: "leverage-twitter-trends",
      goal: "Use ChatGPT to create tweets that ride trends without forcing it.",
      summary: "Learn to tie your content to trending topics in an authentic way.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L3", title: "Leverage Twitter Trends", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create trend-adjacent tweets that get visibility without being cringe.", real_world: "Trends = visibility. Authentic tie-ins outperform forced ones." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Trending topic or hashtag. Want to join the conversation with relevance.", tags: ["Twitter", "trends", "virality", "timing"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Trend/hashtag", "Your niche and angle", "Tone", "Relevance check (does it fit?)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write about this trend" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Forced connection, feels spammy, off-brand)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No natural connection", "Feels forced or opportunistic", "Off-brand", "No unique angle"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Trend: [TREND/HASHTAG]. My niche: [NICHE]. Write 5 tweets that tie [trend] to [niche] in an authentic way.\n\nEach under 280 chars. Mix: insight, hot take, question. Must feel natural, not forced. Add why each angle works.",
          framework_used: "Trend + Niche + Authentic angle"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "[Trend] is basically [analogy to niche]. Here's what [audience] can learn: [insight]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Trend: [X]. Niche: [Y]. Create 5 angles: 1 analogy, 1 contrarian, 1 lesson, 1 prediction, 1 question. Under 280 each. Flag if trend is risky.", what_changed: "Angle variety, risk check." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Industry trend", prompt: "Trend: [X]. Industry: [Y]. 5 tweets linking them. Authentic. Under 280." },
            { title: "Meme format", prompt: "Trend: [meme/format]. Apply to [niche]. 3 options. Stay on brand." },
            { title: "Hot take", prompt: "Trend: [X]. Contrarian take for [niche]. 3 tweets. Under 280. Thought-provoking." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Trend: [X]. Niche: [Y]. 5 tweets. Authentic connection. Under 280. Mix: insight, take, question.", notes: "If no natural link, skip the trend." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Check trending", "Pick one that fits your niche", "Run prompt and edit", "Post when trend is hot"], task: "Create and post 3 trend-adjacent tweets." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Join a trend within 2 hours of it peaking. Compare engagement to non-trend tweets.", hint: "Speed matters for trends." }),
        sec("CBM-14_CHECKLIST", { items: ["Natural connection to trend", "On-brand", "Unique angle", "Under 280", "Posted while trend is hot"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Authentic tie-ins beat forced ones", "Speed matters", "Risk-check sensitive trends", "One great trend tweet > five forced ones"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Trend + authentic niche angle = visibility. No link? Skip it." })
      ]
    },

    {
      title: "Create Twitter Ads",
      slug: "create-twitter-ads",
      goal: "Write Twitter/X ad copy that converts.",
      summary: "Use ChatGPT to draft promoted tweet copy and campaign messaging.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L4", title: "Create Twitter Ads", time: "15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create promoted tweet copy that drives clicks and conversions.", real_world: "Twitter ads need concise, scroll-stopping copy." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Promoted tweets, website clicks, lead gen. Need copy that works in-feed.", tags: ["Twitter ads", "promoted tweets", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Target audience", "CTA", "280 char limit"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a Twitter ad" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check out our product! (Generic, no hook)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No benefit or hook", "Doesn't fit feed", "Weak CTA", "Over 280 chars"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write 5 promoted tweet options for [PRODUCT/OFFER].\n\nAudience: [describe]. Benefit: [outcome]. CTA: [action].\n\nEach under 280 chars. Mix: benefit-led, curiosity, urgency. Must feel like organic tweet, not ad. Include hook in first line.",
          framework_used: "Benefit + Hook + Under 280"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Stop [pain]. [Product] does [benefit] in [time]. [CTA link]. Used by [social proof]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "5 promoted tweets + 3 thread ad options (3 tweets each). Benefit, proof, CTA. Under 280 each. A/B variants: benefit vs pain-led.", what_changed: "Thread ads, A/B variants." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Single tweet", prompt: "5 promoted tweets for [product]. Benefit-led. Under 280. Hook + CTA." },
            { title: "Thread ad", prompt: "3-tweet thread ad for [product]. Tweet 1: hook. 2: benefit. 3: CTA. Under 280 each." },
            { title: "Lead gen", prompt: "Lead gen tweet for [offer]. Value prop. Under 280. Soft CTA." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Promoted tweet: [product]. Benefit: [X]. CTA: [Y]. Under 280. Mix: benefit, curiosity, urgency. Feel organic.", notes: "280 chars. Hook first." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define offer and audience", "Run prompt", "Pick 2 for A/B test", "Launch and monitor"], task: "Create and run one promoted tweet campaign." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test benefit-led vs curiosity-led hook. Compare CTR.", hint: "Track in Twitter Ads dashboard." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 280 chars", "Hook in first line", "Benefit clear", "CTA included", "Feels native to feed"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Ads that feel organic perform better", "280 chars—every word counts", "Hook drives scroll-stop", "A/B test hooks"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Hook + benefit + CTA in 280. Make it feel like a tweet, not an ad." })
      ]
    },

    {
      title: "Make Tweets Go Viral",
      slug: "make-tweets-go-viral",
      goal: "Understand and apply patterns that drive virality.",
      summary: "Use ChatGPT to apply viral patterns: hooks, formats, and engagement triggers.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L5", title: "Make Tweets Go Viral", time: "15 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Apply viral patterns to your tweets: hooks, formats, and triggers.", real_world: "Viral tweets follow patterns—hooks, curiosity gaps, and engagement drivers." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "When you want a tweet to break out. Need to maximize reach and engagement.", tags: ["Twitter", "viral", "engagement", "growth"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic or idea", "Viral format (list, hot take, story)", "Engagement trigger (question, poll)", "Your voice"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Make this tweet go viral" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Same tweet with 'GO VIRAL' — doesn't change structure)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No format change", "No hook upgrade", "No engagement driver", "Can't force virality with words alone"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Apply viral patterns to this tweet idea: [IDEA].\n\nRewrite in 5 formats: 1) Numbered list hook, 2) Hot take/contrarian, 3) Story opening, 4) Bold claim + proof, 5) Question that invites debate. Each under 280 chars. Add engagement CTA (comment, RT, etc.).",
          framework_used: "Format + Hook + Engagement"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "List: '5 [things] I wish I knew...'\nHot take: 'Unpopular: [X]'\nStory: 'I used to [wrong]. Then I [right].'\nBold: '[Claim]. Here's why.'" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Viral rewrite: [tweet idea]. Apply: curiosity gap, pattern interrupt, engagement ask. Create 5 variants. Add best posting time note. Under 280 each.", what_changed: "Timing, more patterns." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "List format", prompt: "Rewrite [idea] as numbered list hook. 5 variants. Under 280. Engagement ask." },
            { title: "Hot take", prompt: "Convert [idea] to contrarian hot take. 5 options. Controversial but defensible. Under 280." },
            { title: "Story format", prompt: "Rewrite [idea] as micro-story. Hook, pivot, lesson. Under 280. 3 variants." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Viral formats for [idea]: list, hot take, story, bold claim, question. Under 280 each. Add engagement CTA.", notes: "Format + hook + CTA. Virality isn't guaranteed." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Take one tweet idea", "Run viral format prompt", "Pick 2 formats and post", "Track which gets more engagement"], task: "Rewrite 3 tweets using viral formats." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Post the same idea in 3 different formats on different days. Compare performance.", hint: "List and hot take often win." }),
        sec("CBM-14_CHECKLIST", { items: ["Strong hook", "Viral format applied", "Engagement CTA", "Under 280", "On-brand"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Formats drive virality: list, hot take, story", "Hooks matter most", "Engagement CTA amplifies", "Test formats"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Format + hook + engagement CTA. Test, learn, repeat." })
      ]
    },

    {
      title: "Optimize Twitter Growth",
      slug: "optimize-twitter-growth",
      goal: "Build a Twitter growth system with ChatGPT.",
      summary: "Use ChatGPT to plan content, engagement, and growth tactics.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M13-L6", title: "Optimize Twitter Growth", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create a growth plan: content mix, engagement routine, and optimization tactics.", real_world: "Systematic growth beats random posting." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Planning Twitter growth. Need strategy, content calendar, and engagement plan.", tags: ["Twitter", "growth", "strategy", "optimization"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche and goals", "Current following", "Time available", "Content pillars"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "How do I grow on Twitter?" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Post more. Engage. (Generic, no system)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No niche-specific advice", "No actionable system", "No content plan", "No engagement routine"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create a Twitter growth plan for [NICHE].\n\nGoals: [followers/engagement/leads]. Current: [X] followers. Time: [Y] min/day.\n\nOutput: 1) Content mix (tweets, threads, replies %), 2) 7-day engagement routine, 3) 10 growth tactics specific to [niche], 4) Content pillars. Actionable.",
          framework_used: "Goals + Time + Tactics"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Content: 60% value tweets, 20% threads, 20% engagement. Daily: 2 tweets, 10 meaningful replies. Tactics: [niche-specific list]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Growth plan for [niche]. Include: content calendar (7 days), engagement targets, account to follow/engage, hashtags, best posting times. Metrics to track.", what_changed: "Calendar, targets, metrics." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Content mix", prompt: "Content mix for [niche] growth. % value vs engagement vs promo. With examples." },
            { title: "Engagement routine", prompt: "Daily engagement routine for [niche]. 15 min/day. Who to engage, how, what to say." },
            { title: "Growth tactics", prompt: "10 growth tactics for [niche]. Specific, actionable. Not generic." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Twitter growth plan: [niche]. Goals: [X]. Time: [Y] min/day. Output: content mix, engagement routine, 10 tactics, pillars.", notes: "Consistency > perfection." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche and goals", "Run prompt", "Implement for 2 weeks", "Review metrics"], task: "Create and follow a 2-week growth plan." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Run the plan for 4 weeks. Track followers, engagement rate. Adjust based on what works.", hint: "Double down on what gets traction." }),
        sec("CBM-14_CHECKLIST", { items: ["Content mix defined", "Engagement routine set", "Tactics are niche-specific", "Time-bound", "Metrics to track"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Content mix matters", "Engagement drives growth", "Niche-specific tactics work", "Consistency beats random bursts"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Content mix + engagement routine + tactics = systematic growth." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 14 — Social Media Creative Studio
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Social Media Creative Studio",
  slug: "m14-social-media-creative-studio",
  lessons: [

    {
      title: "Webinar Workshop Topic Brainstorm",
      slug: "webinar-workshop-topic-brainstorm",
      goal: "Generate webinar and workshop topics that convert.",
      summary: "Use ChatGPT to brainstorm topics that attract and convert your audience.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M14-L1", title: "Webinar Workshop Topic Brainstorm", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 15+ webinar/workshop topics that match audience pain and convert.", real_world: "Right topic = 2–3x more signups." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Planning webinars, workshops, masterclasses. Need topics that attract and sell.", tags: ["webinar", "workshop", "brainstorm", "content"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Target audience and pains", "Product/offer to promote", "Format (webinar, workshop)", "Positioning"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me webinar ideas" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Marketing webinar. Sales workshop. (Generic)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No audience context", "No pain or outcome", "Generic topics", "No bridge to offer"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 15 webinar/workshop topics for [AUDIENCE].\n\nPains: [list]. Offer: [product/course]. Each topic should: 1) Address a pain, 2) Lead naturally to [offer], 3) Be specific (not 'Marketing 101'). Include title + one-line description + why it converts.",
          framework_used: "Pain + Outcome + Bridge to offer"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. [Title]: [description] — converts because [reason]\n2. ..." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "15 topics. For each: title, description, hook, 3 takeaways, how it bridges to [offer]. Rank by conversion potential.", what_changed: "Hook, takeaways, ranking." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Webinar", prompt: "10 webinar topics for [audience]. Pains: [list]. Offer: [X]. Specific, conversion-focused." },
            { title: "Workshop", prompt: "10 workshop topics for [audience]. Hands-on angle. Include outcome. Bridge to [offer]." },
            { title: "Masterclass", prompt: "10 masterclass topics for [audience]. Premium positioning. Deep dive angle." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Webinar/workshop topics: [audience]. Pains: [list]. Offer: [X]. 15 topics. Title + description + why it converts.", notes: "Topic must bridge to offer naturally." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["List audience pains", "Define offer", "Run prompt", "Pick top 3", "Test one"], task: "Generate and choose one topic for next webinar." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Run 2 webinars with different topics. Compare signup and conversion rates.", hint: "Pain-specific often converts better." }),
        sec("CBM-14_CHECKLIST", { items: ["Audience pains clear", "Topics specific", "Bridge to offer", "15+ options", "Ranked by potential"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Pain-led topics convert", "Specific beats generic", "Topic must bridge to offer", "Test and compare"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Pain + outcome + bridge to offer = topics that convert." })
      ]
    },

    {
      title: "Attention Grabbing Social Headlines",
      slug: "attention-grabbing-social-headlines",
      goal: "Create headlines that stop the scroll on social.",
      summary: "Use ChatGPT to generate scroll-stopping headlines for posts and ads.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M14-L2", title: "Attention Grabbing Social Headlines", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Generate 10+ headlines that stop the scroll and drive clicks.", real_world: "Headlines drive 80% of click-through on social." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Social posts, ads, carousel titles. Need first-line hooks.", tags: ["headlines", "social", "copy", "CTR"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Topic or offer", "Platform", "Audience", "Tone"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write a headline" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Check this out. (Generic, no hook)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No topic", "No curiosity or benefit", "Platform-agnostic", "Doesn't stop scroll"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Generate 10 social headlines for [TOPIC].\n\nPlatform: [Instagram/LinkedIn/Facebook]. Audience: [describe]. Mix: curiosity gap, benefit-led, number, question, bold claim. Each under 60 chars for mobile. Scroll-stopping.",
          framework_used: "Platform + Format mix + Under 60"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "1. The [X] hack nobody talks about\n2. 5 [things] that changed how I [outcome]\n3. Stop [wrong]. Do this instead." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "15 headlines for [topic]. Platform: [X]. Mix: curiosity, benefit, number, question, hot take. Add A/B pairs. Under 60 chars. Flag best for each platform.", what_changed: "A/B pairs, platform-specific." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Instagram", prompt: "10 Instagram captions headline (first line). [Topic]. Scroll-stopping. Under 60 chars." },
            { title: "LinkedIn", prompt: "10 LinkedIn post hooks. [Topic]. Professional but engaging. Under 100 chars." },
            { title: "Ads", prompt: "10 ad headlines for [product]. Benefit-led. Under 40 chars. A/B variants." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "10 social headlines: [topic]. Platform: [X]. Mix: curiosity, benefit, number, question. Under 60 chars.", notes: "First line = 80% of click. Test multiple." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick topic and platform", "Run prompt", "Test 2-3 on posts", "Track which gets clicks"], task: "Create headlines for 5 posts this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test 2 headlines for same post. Compare engagement and clicks.", hint: "Curiosity often wins on social." }),
        sec("CBM-14_CHECKLIST", { items: ["Under 60 chars", "Scroll-stopping", "Platform-appropriate", "Mix of formats", "Delivers on promise"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["First line drives clicks", "Curiosity and benefit work", "Platform matters", "Test and iterate"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Curiosity + benefit + under 60 chars = headlines that stop the scroll." })
      ]
    },

    {
      title: "Custom Graphics for Social Ads",
      slug: "custom-graphics-for-social-ads",
      goal: "Use ChatGPT to write briefs and copy for ad graphics.",
      summary: "Create design briefs and overlay copy for social ad creatives.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M14-L3", title: "Custom Graphics for Social Ads", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Write design briefs and overlay text for ad graphics that convert.", real_world: "Clear briefs speed design; good overlay copy boosts CTR." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Briefing designers for social ads. Need layout, copy, and visual direction.", tags: ["design", "ads", "graphics", "brief"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Ad goal and offer", "Platform and format", "Brand colors/fonts", "Key message"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Design an ad" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Make it look good. (No direction)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No layout or copy", "No platform specs", "No visual direction", "Designer has to guess"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create a design brief for a social ad graphic: [PRODUCT/OFFER].\n\nPlatform: [Instagram/Facebook/LinkedIn]. Format: [1080x1080 / 1200x628]. Include: 1) Headline (5 words max), 2) Subheadline (10 words), 3) CTA text, 4) Layout description (visual hierarchy), 5) Color/mood note. Clear for designer.",
          framework_used: "Copy + Layout + Specs"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: [X]. Subhead: [Y]. CTA: [Z]. Layout: headline top, product center, CTA bottom. Mood: bold, high contrast." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Design brief + 3 layout variants for [ad]. Include: copy for each, layout notes, A/B test recommendation. Platform: [X]. Format: [dimensions].", what_changed: "Multiple variants, A/B." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Static ad", prompt: "Design brief for static ad. [Product]. Headline, subhead, CTA. Layout. Platform: [X]." },
            { title: "Carousel", prompt: "5-slide carousel brief. [Topic]. Copy per slide. Layout. Platform: [X]." },
            { title: "Story ad", prompt: "Story ad brief. [Product]. Vertical format. Headline, CTA. Under 5 sec read." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Design brief: [product]. Platform: [X]. Headline (5w), subhead (10w), CTA. Layout. Mood. Format: [dimensions].", notes: "Less text on graphic = more impact. 5-10 words max." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define ad and platform", "Run prompt", "Share brief with designer", "Review and refine"], task: "Write one design brief and get it designed." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Create 2 design variants (different headlines). A/B test. Compare CTR.", hint: "Headline on graphic drives CTR." }),
        sec("CBM-14_CHECKLIST", { items: ["Headline under 5-10 words", "Layout described", "Platform specs", "CTA clear", "Designer can execute"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Brief = copy + layout + specs", "Less text, more impact", "Platform dimensions matter", "A/B test creative"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Headline + layout + specs = brief that gets the graphic you want." })
      ]
    },

    {
      title: "Mood Boards for Instagram Pinterest",
      slug: "mood-boards-for-instagram-pinterest",
      goal: "Use ChatGPT to create mood board concepts and content themes.",
      summary: "Generate visual direction and theme ideas for Instagram and Pinterest.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M14-L4", title: "Mood Boards for Instagram Pinterest", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create mood board concepts: colors, aesthetics, and content themes.", real_world: "Clear visual direction improves feed cohesion and engagement." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Planning Instagram or Pinterest aesthetic. Need visual direction.", tags: ["mood board", "Instagram", "Pinterest", "aesthetic"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Brand/niche", "Target audience", "Mood (minimal, bold, earthy)", "Platform"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me a mood board" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Use nice colors. (Vague)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No brand context", "No specific direction", "Can't execute", "Generic"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create a mood board concept for [BRAND/NICHE] on [Instagram/Pinterest].\n\nAudience: [describe]. Mood: [minimal/bold/earthy/luxe]. Output: 1) Color palette (5 hex codes), 2) Aesthetic keywords (5), 3) Content themes (5), 4) Visual elements to include, 5) What to avoid. Actionable for designer.",
          framework_used: "Colors + Aesthetic + Themes"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Colors: #xxx, #xxx. Aesthetic: clean, modern, warm. Themes: flat lays, lifestyle, product. Include: natural light, negative space. Avoid: cluttered, cold tones." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Mood board for [brand]. Include: color palette, typography suggestions, photo style, grid layout idea (3x3), content pillars with visual examples. Platform: [X].", what_changed: "Typography, grid, pillars." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Instagram", prompt: "Instagram mood board: [niche]. Colors, aesthetic, 5 content themes. Feed cohesion." },
            { title: "Pinterest", prompt: "Pinterest mood board: [niche]. Pinnable style. Colors, themes, search keywords." },
            { title: "Brand refresh", prompt: "Visual refresh mood board for [brand]. New direction. Colors, mood, do/don't." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Mood board: [brand/niche]. Platform: [X]. Colors (5), aesthetic (5 words), themes (5), include, avoid.", notes: "Use output to brief designer or source imagery." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define brand and mood", "Run prompt", "Create or source visuals", "Apply to next 9 posts"], task: "Create a mood board and plan 9-grid." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Apply mood board to 9 posts. Compare engagement to prior 9.", hint: "Cohesive feeds often perform better." }),
        sec("CBM-14_CHECKLIST", { items: ["Color palette defined", "Aesthetic clear", "Content themes", "Actionable", "Platform-specific"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Direction beats random", "Colors and aesthetic drive cohesion", "Themes guide content", "Mood board = creative brief"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Colors + aesthetic + themes = direction you can execute." })
      ]
    },

    {
      title: "Instagram Hashtag Research",
      slug: "instagram-hashtag-research",
      goal: "Find and organize hashtags for Instagram reach.",
      summary: "Use ChatGPT to research and structure hashtag sets for Instagram.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M14-L5", title: "Instagram Hashtag Research", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create hashtag sets (high, mid, low reach) for consistent discoverability.", real_world: "Right hashtags extend reach to relevant audiences." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Every Instagram post. Need mix of reach and relevance.", tags: ["Instagram", "hashtags", "discovery", "reach"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Niche and content type", "Target audience", "Brand hashtag", "Goals (reach vs engagement)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Give me Instagram hashtags" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "#love #instagood (Too broad, no relevance)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No niche", "All huge hashtags", "No structure", "Banned or spam risk"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Research Instagram hashtags for [NICHE].\n\nContent type: [posts/reels/stories]. Output 3 tiers: 1) High reach (5), 2) Mid reach (10), 3) Niche/low (10). Include estimated post count. Add 2-3 branded. Flag any to avoid (banned, spam).",
          framework_used: "Tiered + Niche + Safety"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "High: #niche (2M posts). Mid: #specific (500K). Niche: #micro (50K). Brand: #yourbrand. Avoid: #spam." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Hashtag sets for 5 content types: [list]. Each: 5 high, 10 mid, 10 niche. Add emerging hashtags. Rotation strategy.", what_changed: "Per-content sets, emerging, rotation." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "By content", prompt: "Hashtags for [content type] in [niche]. 3 tiers. 30 total." },
            { title: "By goal", prompt: "Hashtags for [reach/engagement/community]. [Niche]. Tiered." },
            { title: "Reels", prompt: "Reels-specific hashtags for [niche]. Trending + niche. 20 total." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Instagram hashtags: [niche]. 3 tiers: high (5), mid (10), niche (10). Add brand. Flag avoid.", notes: "Use 20-30 per post. Rotate sets." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define niche", "Run prompt", "Save 3 sets", "Use different set per post", "Track reach"], task: "Create 3 hashtag sets and use for 9 posts." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Compare reach: niche-only vs high-reach mix. Run for 2 weeks.", hint: "Niche often has better engagement rate." }),
        sec("CBM-14_CHECKLIST", { items: ["3 tiers", "Niche-specific", "No banned", "20-30 per post", "Rotation strategy"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Tiered approach works", "Niche beats generic", "Rotate to avoid shadowban", "Track what drives reach"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "High + mid + niche = hashtags that extend reach." })
      ]
    }

  ]
},

/* ═══════════════════════════════════════════════════════════════
   MODULE 15 — Copywriting Assistant
   ═══════════════════════════════════════════════════════════════ */
{
  title: "Copywriting Assistant",
  slug: "m15-copywriting-assistant",
  lessons: [

    {
      title: "Improve Existing Copy",
      slug: "improve-existing-copy",
      goal: "Use ChatGPT to upgrade existing copy: clarity, punch, and conversion.",
      summary: "Learn prompts that improve headlines, body copy, and CTAs.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M15-L1", title: "Improve Existing Copy", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Upgrade copy for clarity, impact, and conversion without losing your voice.", real_world: "Small edits can lift conversions 10-30%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Existing landing pages, emails, ads. Copy works but could be stronger.", tags: ["copywriting", "rewrite", "improve", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Existing copy", "Goal (clarity, conversion, brevity)", "Audience", "Constraints (length, tone)"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Improve this copy" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Generic rewrite that loses brand voice)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No goal specified", "No audience", "Loses voice", "No constraints"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Improve this copy for [GOAL: clarity/conversion/brevity].\n\nAudience: [describe]. Keep my voice—[describe voice]. Constraints: [length, tone].\n\nCopy: [paste]\n\nOutput: improved version + 3 bullet changes made.",
          framework_used: "Goal + Audience + Voice + Constraints"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Improved: [version]. Changes: 1) Stronger hook 2) Clearer benefit 3) Punchier CTA" }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Improve [copy]. Goals: clarity + conversion. Add: before/after, rationale per change, A/B variant (different angle). Keep voice.", what_changed: "Rationale, A/B variant." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Headline", prompt: "Improve this headline for [goal]. Audience: [X]. 5 options. Keep under [N] chars." },
            { title: "Body", prompt: "Improve body copy. Goal: [X]. Audience: [Y]. Keep voice. Shorter or punchier." },
            { title: "CTA", prompt: "Improve this CTA. Goal: [click/convert]. 5 variants. Under 5 words each." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Improve: [copy]. Goal: [X]. Audience: [Y]. Voice: [Z]. Constraints: [length]. Output: improved + changes.", notes: "Specify voice or paste sample." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick underperforming copy", "Define goal and audience", "Run prompt", "Compare and test"], task: "Improve 3 pieces of copy this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B test original vs improved. Run for 2 weeks. Compare conversion.", hint: "Even 10% lift matters." }),
        sec("CBM-14_CHECKLIST", { items: ["Goal clear", "Audience specified", "Voice preserved", "Constraints set", "Changes documented"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Goal + audience = better improvements", "Voice matters—don't genericize", "Small edits, big impact", "Test improvements"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Goal + audience + voice. ChatGPT improves; you keep the brand." })
      ]
    },

    {
      title: "Find Unique Brand Voice",
      slug: "find-unique-brand-voice",
      goal: "Define and apply a distinctive brand voice with ChatGPT.",
      summary: "Use ChatGPT to articulate voice guidelines and apply them to copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M15-L2", title: "Find Unique Brand Voice", time: "18 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Create voice guidelines and apply them consistently across copy.", real_world: "Distinct voice builds recognition and trust." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Defining brand voice. Need guidelines for all copy.", tags: ["voice", "brand", "tone", "guidelines"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Brand personality", "Audience", "Examples of brands you like", "Do's and don'ts"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Define my brand voice" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Professional and friendly. (Generic)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No specificity", "No examples", "Unusable guidelines", "No do/don't"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Create brand voice guidelines for [BRAND].\n\nPersonality: [describe]. Audience: [X]. Reference brands: [list]. Competitors: [list—how we're different].\n\nOutput: 4 voice pillars with description + example phrases. Do's and don'ts. 3 sample sentences in voice.",
          framework_used: "Personality + Audience + Differentiation"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Pillar 1: [Name] — [desc]. Example: '[phrase]'. Do: [X]. Don't: [Y]. Sample: [sentence]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Voice guidelines + rewrite of [copy] in that voice. Add: word choices to use/avoid, sentence structure, 3 before/after examples.", what_changed: "Applied to copy, word list." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Guidelines only", prompt: "Voice guidelines for [brand]. 4 pillars. Examples. Do/don't." },
            { title: "Apply to copy", prompt: "Rewrite [copy] in [brand] voice. Guidelines: [paste]. Output: rewritten + changes." },
            { title: "Voice audit", prompt: "Audit [copy] against voice: [guidelines]. Rate 1-5. Specific fixes." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Voice guidelines: [brand]. Personality: [X]. Audience: [Y]. 4 pillars, examples, do/don't. 3 sample sentences.", notes: "Reference competitor voices for contrast." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Define personality and audience", "Run prompt", "Save guidelines", "Apply to one piece of copy"], task: "Create voice guidelines and apply to 3 pieces." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Rewrite 5 pieces in new voice. Get feedback: does it sound like us?", hint: "Share with team or customers." }),
        sec("CBM-14_CHECKLIST", { items: ["4 pillars", "Examples", "Do/don't", "Differentiation", "Sample sentences"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Voice = personality + consistency", "Examples make it usable", "Do/don't prevent drift", "Apply across all touchpoints"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Pillars + examples + do/don't = voice you can apply." })
      ]
    },

    {
      title: "Advanced Copywriting Prompts",
      slug: "advanced-copywriting-prompts",
      goal: "Master advanced prompt patterns for copy: PAS, AIDA, before/after.",
      summary: "Use frameworks (PAS, AIDA, BAB) in prompts for higher-converting copy.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M15-L3", title: "Advanced Copywriting Prompts", time: "20 min", difficulty: "Intermediate" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Apply PAS, AIDA, BAB in prompts for conversion-optimized copy.", real_world: "Frameworks structure persuasion—ChatGPT executes when prompted." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Sales pages, emails, ads. Need copy that converts.", tags: ["PAS", "AIDA", "copywriting", "conversion"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Product/offer", "Audience and pain", "Framework choice", "Format and length"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Write sales copy" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(Generic pitch, no structure)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No framework", "No pain or desire", "No structure", "No CTA"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Write [LANDING PAGE/EMAIL] copy using PAS (Problem-Agitate-Solve).\n\nProduct: [X]. Audience pain: [Y]. Agitate: [make it hurt]. Solve: [benefit]. Include: headline, 3 body sections, CTA. Tone: [X]. Under [N] words.",
          framework_used: "PAS"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Headline: [pain]. Agitate: [expand]. Solve: [product benefit]. CTA: [action]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Create copy using PAS, AIDA, and BAB. Same product. Output 3 versions. Compare which fits [format]. Include variant recommendation.", what_changed: "Multi-framework, comparison." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "PAS", prompt: "PAS copy for [product]. Pain: [X]. Agitate. Solve. CTA. [Length]." },
            { title: "AIDA", prompt: "AIDA copy for [product]. Attention, Interest, Desire, Action. [Length]." },
            { title: "BAB", prompt: "Before-After-Bridge for [product]. Before: [pain]. After: [outcome]. Bridge: [product]. [Length]." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "[Framework: PAS/AIDA/BAB] copy for [product]. Audience: [X]. Pain: [Y]. [Length]. Include: headline, body, CTA.", notes: "PAS = problem focus. AIDA = full funnel. BAB = transformation." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick product and pain", "Choose framework", "Run prompt", "Edit and test"], task: "Write one piece using PAS and one using BAB." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Same offer, 2 frameworks (PAS vs BAB). A/B test. Which converts?", hint: "Depends on audience and product." }),
        sec("CBM-14_CHECKLIST", { items: ["Framework specified", "Pain/desire clear", "Structure followed", "CTA included", "Length appropriate"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["PAS = problem-first", "AIDA = full journey", "BAB = transformation", "Framework + prompt = structure"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Framework in prompt = structured copy. PAS, AIDA, BAB—pick one." })
      ]
    },

    {
      title: "Proofread Your Copy",
      slug: "proofread-your-copy",
      goal: "Use ChatGPT to proofread and polish copy.",
      summary: "Prompt ChatGPT for grammar, clarity, and consistency checks.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M15-L4", title: "Proofread Your Copy", time: "12 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Catch errors and improve clarity with AI proofreading.", real_world: "Typos and clarity issues hurt trust and conversion." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Before publishing. Emails, pages, ads. Need a second set of eyes.", tags: ["proofread", "grammar", "clarity", "editing"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Copy to proofread", "Focus (grammar, clarity, tone)", "Any style guide", "Context"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Proofread this" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "Looks good. (No actual feedback)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No copy pasted", "No focus area", "No output format", "Generic"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Proofread this copy. Check: 1) Grammar and spelling, 2) Clarity (any confusing sentences?), 3) Consistency (tone, tense).\n\nCopy: [paste]\n\nOutput: corrected version + list of changes. Preserve voice.",
          framework_used: "Grammar + Clarity + Consistency"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Corrected: [version]. Changes: 1) Fixed [error]. 2) Clarified [sentence]. 3) Tense consistency in para 2." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "Proofread + style check. Copy: [paste]. Check: grammar, clarity, passive voice, wordiness, consistency with [brand] voice. Output: clean version + change log.", what_changed: "Style, passive, wordiness." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Grammar only", prompt: "Grammar and spelling check. Copy: [paste]. Output: corrected + errors listed." },
            { title: "Clarity", prompt: "Clarity check. Copy: [paste]. Flag confusing sentences. Suggest rewrites." },
            { title: "Tone", prompt: "Tone consistency check. Copy: [paste]. Voice: [X]. Flag off-voice phrases." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Proofread: [copy]. Check: grammar, clarity, consistency. Output: corrected + change list. Preserve voice.", notes: "Always review AI changes—don't blindly accept." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Paste copy", "Run prompt", "Review each change", "Accept or reject"], task: "Proofread 5 pieces this week." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "Intentionally add 3 errors. Run proofread. Did it catch all?", hint: "AI is good but not perfect." }),
        sec("CBM-14_CHECKLIST", { items: ["Grammar checked", "Clarity improved", "Consistency verified", "Voice preserved", "Changes reviewed"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["AI catches most errors", "Clarity often needs human + AI", "Review changes—AI can over-edit", "Consistency matters"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Grammar + clarity + consistency. ChatGPT catches; you approve." })
      ]
    },

    {
      title: "Rewrite in 3 Styles System",
      slug: "rewrite-in-3-styles-system",
      goal: "Get 3 style variants of copy for A/B testing.",
      summary: "Use ChatGPT to rewrite copy in different tones: formal, casual, urgent.",
      sections: [
        sec("CBM-00_LESSON_ID", { code: "M15-L5", title: "Rewrite in 3 Styles System", time: "15 min", difficulty: "Beginner" }),
        sec("CBM-01_OUTCOME_GOAL", { headline: "Get 3 style variants (e.g., formal, casual, urgent) for A/B testing.", real_world: "Tone tests can lift conversions 15-40%." }),
        sec("CBM-02_WHERE_YOU_USE_IT", { scenario: "Need variants for testing. Same message, different tone.", tags: ["rewrite", "A/B test", "tone", "variants"] }),
        sec("CBM-03_INPUTS_YOU_NEED", { items: ["Original copy", "3 styles to test", "Audience", "Format"] }),
        sec("CBM-04_BAD_PROMPT", { prompt: "Rewrite this differently" }),
        sec("CBM-05_BAD_OUTPUT_EXAMPLE", { output: "(One random variant)" }),
        sec("CBM-06_WHY_IT_FAILED", { reasons: ["No style specified", "Only one variant", "Inconsistent message", "Unusable"] }),
        sec("CBM-07_GOOD_PROMPT", {
          prompt: "Rewrite this copy in 3 distinct styles:\n\n1) Formal/professional\n2) Casual/friendly\n3) Urgent/scarcity-driven\n\nCopy: [paste]\n\nKeep the same message and CTA. Only tone and phrasing change. Output: 3 versions with style labels.",
          framework_used: "3 Styles + Same message"
        }),
        sec("CBM-08_GOOD_OUTPUT_EXAMPLE", { output: "Formal: [version]. Casual: [version]. Urgent: [version]." }),
        sec("CBM-09_UPGRADE_PROMPT_PRO", { prompt: "3 style variants + headline variants for each. Styles: [formal, casual, urgent]. Copy: [paste]. Add recommendation for [audience/product].", what_changed: "Headlines, recommendation." }),
        sec("CBM-10_3_VARIATIONS", {
          variants: [
            { title: "Tone test", prompt: "3 tones: professional, playful, bold. Rewrite [copy]. Same message. Label each." },
            { title: "Length test", prompt: "3 lengths: short (50%), medium (100%), long (150%). Same [copy]. Same message." },
            { title: "Angle test", prompt: "3 angles: benefit-led, pain-led, social proof-led. Rewrite [copy]. Same CTA." }
          ]
        }),
        sec("CBM-11_PROMPT_CARD_FINAL", { template: "Rewrite [copy] in 3 styles: [style 1], [style 2], [style 3]. Same message, CTA. Only tone changes. Label each.", notes: "Test which style converts for your audience." }),
        sec("CBM-12_GUIDED_PRACTICE", { steps: ["Pick copy to test", "Choose 3 styles", "Run prompt", "A/B/C test"], task: "Create 3 variants and run test for 2 weeks." }),
        sec("CBM-13_CHALLENGE_TASK", { description: "A/B/C test 3 style variants. Declare winner at 95% confidence.", hint: "Use calculator for sample size." }),
        sec("CBM-14_CHECKLIST", { items: ["3 distinct styles", "Same message", "Same CTA", "Ready for test", "Labeled clearly"] }),
        sec("CBM-15_WHAT_YOU_LEARNED", { points: ["Tone affects conversion", "3 variants = test options", "Same message, different delivery", "Data beats opinion"] }),
        sec("CBM-16_ONE_LINE_TAKEAWAY", { line: "Same message, 3 styles. Test. Winner informs future copy." })
      ]
    }

  ]
}

];

module.exports = { MODULES_M11_M15 };
