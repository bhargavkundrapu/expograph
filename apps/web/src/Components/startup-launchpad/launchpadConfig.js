/** @typedef {'locked' | 'available' | 'active' | 'completed'} StageState */

export const STAGE_SLUGS = [
  "idea",
  "problem",
  "customer",
  "validation",
  "business-model",
  "mvp",
  "branding",
  "launch",
  "first-users",
  "revenue",
  "legal-setup",
  "growth",
];

export const READINESS_QUESTIONS = [
  {
    id: "q1",
    prompt: "Do you already have a startup idea?",
    options: [
      { value: "no", label: "Not yet" },
      { value: "maybe", label: "Still forming it" },
      { value: "yes", label: "Yes, clearly" },
    ],
  },
  {
    id: "q2",
    prompt: "Have you spoken to anyone who may use it?",
    options: [
      { value: "no", label: "Not yet" },
      { value: "few", label: "A few people" },
      { value: "many", label: "Several conversations" },
    ],
  },
  {
    id: "q3",
    prompt: "Do you know who your first users are?",
    options: [
      { value: "no", label: "Not really" },
      { value: "vague", label: "Rough idea" },
      { value: "yes", label: "Yes, a clear niche" },
    ],
  },
  {
    id: "q4",
    prompt: "Have you decided how it may make money?",
    options: [
      { value: "no", label: "Not yet" },
      { value: "idea", label: "A rough direction" },
      { value: "yes", label: "Yes, a clear model" },
    ],
  },
  {
    id: "q5",
    prompt: "Have you built anything yet?",
    options: [
      { value: "no", label: "Nothing yet" },
      { value: "prototype", label: "Prototype / demo" },
      { value: "mvp", label: "A working MVP" },
    ],
  },
  {
    id: "q6",
    prompt: "Have you launched anything yet?",
    options: [
      { value: "no", label: "Not yet" },
      { value: "soft", label: "Soft launch / beta" },
      { value: "yes", label: "Yes, publicly" },
    ],
  },
  {
    id: "q7",
    prompt: "Have you earned any revenue yet?",
    options: [
      { value: "no", label: "Not yet" },
      { value: "small", label: "A small amount" },
      { value: "yes", label: "Yes, recurring or repeat" },
    ],
  },
  {
    id: "q8",
    prompt: "Are you already thinking about registration?",
    options: [
      { value: "no", label: "Not a priority" },
      { value: "research", label: "Researching options" },
      { value: "ready", label: "Ready to formalize" },
    ],
  },
  {
    id: "q9",
    prompt: "Are you building alone or with a team?",
    options: [
      { value: "solo", label: "Solo" },
      { value: "small", label: "Small team" },
      { value: "larger", label: "Larger team" },
    ],
  },
];

/** Maps weighted score to display stage label */
export const READINESS_STAGE_LABELS = [
  "Idea Stage",
  "Validation Stage",
  "MVP Stage",
  "Launch Stage",
  "Revenue Stage",
  "Registration-Ready Stage",
];

/**
 * @param {Record<string, string>} answers
 */
export function computeReadinessResult(answers) {
  let score = 0;
  const vals = Object.values(answers);
  for (const v of vals) {
    if (v === "yes" || v === "many" || v === "mvp" || v === "ready") score += 12;
    else if (v === "maybe" || v === "few" || v === "vague" || v === "idea" || v === "prototype" || v === "soft" || v === "small" || v === "research") score += 7;
    else score += 3;
  }
  score = Math.min(100, Math.round(score));

  let stageLabel = READINESS_STAGE_LABELS[0];
  let stageIndexHint = 0;
  if (score >= 85) {
    stageLabel = READINESS_STAGE_LABELS[5];
    stageIndexHint = 10;
  } else if (score >= 70) {
    stageLabel = READINESS_STAGE_LABELS[4];
    stageIndexHint = 9;
  } else if (score >= 55) {
    stageLabel = READINESS_STAGE_LABELS[3];
    stageIndexHint = 7;
  } else if (score >= 40) {
    stageLabel = READINESS_STAGE_LABELS[2];
    stageIndexHint = 5;
  } else if (score >= 25) {
    stageLabel = READINESS_STAGE_LABELS[1];
    stageIndexHint = 3;
  }

  const exampleValidation = {
    headline: "You are in the Validation Stage",
    subheadline:
      "Your idea has potential, but you need real user proof before building further.",
    nextActions: [
      "Talk to 5 target users",
      "Write down the top 3 repeated problems",
      "Compare 3 existing solutions",
    ],
  };

  if (stageLabel === READINESS_STAGE_LABELS[0]) {
    return {
      score,
      stageLabel,
      stageIndexHint,
      headline: "You are in the Idea Stage",
      subheadline: "Clarify the problem and your first user before heavy building.",
      nextActions: ["Write a one-line idea", "Name the pain", "Pick one narrow audience"],
    };
  }
  if (stageLabel === READINESS_STAGE_LABELS[1]) {
    return { score, stageLabel, stageIndexHint, ...exampleValidation };
  }
  if (stageLabel === READINESS_STAGE_LABELS[2]) {
    return {
      score,
      stageLabel,
      stageIndexHint,
      headline: "You are in the MVP Stage",
      subheadline: "Focus on the smallest version that proves demand.",
      nextActions: ["Pick one must-have feature", "Cut scope aggressively", "Define your first release"],
    };
  }
  if (stageLabel === READINESS_STAGE_LABELS[3]) {
    return {
      score,
      stageLabel,
      stageIndexHint,
      headline: "You are in the Launch Stage",
      subheadline: "Ship small, learn fast, and tighten your feedback loop.",
      nextActions: ["Publish a first version", "Share with real users", "Capture feedback"],
    };
  }
  if (stageLabel === READINESS_STAGE_LABELS[4]) {
    return {
      score,
      stageLabel,
      stageIndexHint,
      headline: "You are in the Revenue Stage",
      subheadline: "Turn attention into paid offers and repeatable sales.",
      nextActions: ["Define your first paid offer", "Test pricing", "Track first revenue"],
    };
  }
  return {
    score,
    stageLabel,
    stageIndexHint,
    headline: "You are Registration-Ready",
    subheadline: "Formalize when your model and traction are clear—use guidance, not guesswork.",
    nextActions: ["Compare structures", "Prepare documents", "Get registration help"],
  };
}

export const TOOL_CARDS = [
  { id: "idea-validator", title: "Idea Validator", blurb: "Stress-test your idea in minutes.", tag: "Quick" },
  { id: "interview-script", title: "Customer Interview Script", blurb: "Ask better questions, faster.", tag: "Script" },
  { id: "validation-notes", title: "Validation Notes", blurb: "Capture patterns from real conversations.", tag: "Notes" },
  { id: "mvp-checklist", title: "MVP Checklist", blurb: "Ship the smallest useful version.", tag: "Checklist" },
  { id: "pricing-sheet", title: "Pricing Sheet", blurb: "Sketch price points and rationale.", tag: "Sheet" },
  { id: "launch-checklist", title: "Launch Checklist", blurb: "Ship without overthinking polish.", tag: "Checklist" },
  { id: "cofounder-checklist", title: "Co-Founder Checklist", blurb: "Align roles, equity, and expectations.", tag: "Checklist" },
  { id: "registration-prep", title: "Registration Prep Checklist", blurb: "Get ready before you file.", tag: "Prep" },
];

export const FOUNDER_GUIDE_PROMPTS = [
  "Should I register now?",
  "What should my MVP include?",
  "How do I choose between SaaS and service?",
  "What should I charge first?",
  "What do I do after validation?",
  "Do I need a co-founder?",
  "What is my next best step?",
];

/** Shown in Legal, dashboard, and registration CTAs — package scope only */
export const REGISTRATION_SUPPORT_OFFER = {
  price: "₹14,999",
  priceLabel: "Guided startup registration (this package only)",
  blurb:
    "It includes only the features listed below—other legal work, retainers, or add-ons are billed separately.",
  includes: [
    "Structure comparison call",
    "Document checklist and filing prep",
    "Partner handoff for incorporation filing",
    "Status updates on your filing",
  ],
};

/** External partner site for India startup registration & setup (StartRight Advisory) */
export const STARTUP_REGISTRATION_PARTNER_URL = "https://startupregister.vercel.app/";
export const STARTUP_REGISTRATION_PARTNER_NAME = "StartRight Advisory";

/** In-app guide replies (no backend) */
export const GUIDE_RESPONSES = {
  "Should I register now?":
    "Usually after you have clarity on the problem, a simple business model, and validation or revenue signals. If you are still exploring, prioritize learning from users first; incorporate when contracts, liability, or investors require it.",
  "What should my MVP include?":
    "Only what proves your riskiest assumption: one core user outcome, one main flow, and one metric. Ship the smallest version that gives a real yes or no—then iterate.",
  "How do I choose between SaaS and service?":
    "SaaS fits repeatable software value at scale; services fit hands-on delivery and cash flow early. Many founders start with a service or concierge MVP, then productize what repeats.",
  "What should I charge first?":
    "Anchor on value delivered, not hours. Start with a simple paid pilot or deposit so you learn who pays and why—then adjust after a few conversations.",
  "What do I do after validation?":
    "Narrow the promise, simplify the offer, and get a small paid commitment or repeat usage. Then tighten onboarding and measure one north-star metric weekly.",
  "Do I need a co-founder?":
    "You need the skills you lack—sometimes as a co-founder, sometimes as an advisor or hire. Split equity only when someone is committed long-term with aligned incentives.",
  "What is my next best step?":
    "One concrete action that reduces uncertainty: e.g. five targeted conversations, a one-page offer, or a tiny experiment. Pick one and finish it this week.",
};

export const TOOL_MODAL_CONTENT = {
  "idea-validator": {
    title: "Idea Validator",
    description: "Stress-test your idea with these checks.",
    bullets: [
      "Who has the problem, in one sentence?",
      "What do they do today instead?",
      "Why might they switch to you?",
      "What would you measure in the first 2 weeks?",
    ],
  },
  "interview-script": {
    title: "Customer Interview Script",
    description: "Use open prompts; avoid pitching.",
    bullets: [
      "Context: walk me through last time this was painful…",
      "What did you try? What worked or failed?",
      "What would “good enough” look like?",
      "If this existed tomorrow, what would you need to trust it?",
    ],
  },
  "validation-notes": {
    title: "Validation Notes",
    description: "After each conversation, capture patterns.",
    bullets: ["Job/pain in their words", "Current workaround", "Willingness to pay signal", "Objections or fears"],
  },
  "mvp-checklist": {
    title: "MVP Checklist",
    description: "Ship the smallest useful version.",
    bullets: ["One core user outcome", "One happy path", "Basic analytics or feedback loop", "Support path for early users"],
  },
  "pricing-sheet": {
    title: "Pricing Sheet",
    description: "Sketch first pricing without over-optimizing.",
    bullets: ["Segment", "Value metric", "Anchor price", "What is included / not included"],
  },
  "launch-checklist": {
    title: "Launch Checklist",
    description: "Launch without perfection loops.",
    bullets: ["Clear promise in one line", "Landing + waitlist or buy", "3–5 warm intros or channels", "Day-1 support expectation"],
  },
  "cofounder-checklist": {
    title: "Co-Founder Checklist",
    description: "Align before you split equity.",
    bullets: ["Roles and time commitment", "Equity split and vesting", "Decision process", "Exit scenarios"],
  },
  "registration-prep": {
    title: "Registration Prep Checklist",
    description: "Before you file, gather the basics.",
    bullets: ["Chosen structure rationale", "Founder IDs and address proof", "Business activity description", "Cap table intent (if team)"],
  },
};

/**
 * Per–founder-tool AI review prompts (placeholders). Matches TOOL_CARDS ids.
 * Each template references that tool’s job—not a generic startup chat.
 */
export const TOOL_AI_PROMPTS = {
  "idea-validator": {
    title: "AI review for this template",
    intro:
      "This prompt is built for the Idea Validator only: it stress-tests clarity and measurability. Fill the fields, then copy into ChatGPT. Not legal or investment advice.",
    placeholders: [
      { key: "one_liner", label: "Your one-line idea", hint: "What you might build" },
      { key: "who_hurts", label: "Who has the problem", hint: "Specific user or role" },
      { key: "two_week_metric", label: "What you’d measure in 2 weeks", hint: "One metric or signal" },
    ],
    template: `You are reviewing my answers against the "Idea Validator" template (ExpoGraph Founder Tools).

MY FILLED CONTEXT:
• One-line idea: {{one_liner}}
• Who has the problem: {{who_hurts}}
• 2-week metric I’d track: {{two_week_metric}}

Tasks:
1) Is the one-line idea falsifiable? If not, suggest 2 sharper versions.
2) Score problem clarity 1–5 with one reason.
3) Is the 2-week metric a real learning metric or vanity? Fix if needed.
4) List 3 kill criteria: signals that should make me stop or pivot.

End with: "Ready to test further if…"`,
  },
  "interview-script": {
    title: "AI review for this template",
    intro:
      "Tuned for customer discovery—not sales. The AI will critique your script for bias and leading questions. Copy into ChatGPT.",
    placeholders: [
      { key: "product_context", label: "What you’re exploring (no pitch)", hint: "Topic area, not your solution" },
      { key: "user_type", label: "Who you’ll interview", hint: "Role or situation" },
      { key: "biggest_unknown", label: "Biggest thing you need to learn", hint: "One unknown" },
    ],
    template: `You are improving my customer interview plan. I am using the "Customer Interview Script" template.

CONTEXT:
• Topic / problem space (no pitching my product): {{product_context}}
• Target interviewee: {{user_type}}
• Biggest unknown: {{biggest_unknown}}

Tasks:
1) Write 6 open questions in order (no yes/no, no "would you use…").
2) Flag any question that sneaks in a pitch or fake validation.
3) Suggest a 20-minute flow: warm-up → pain → current behavior → priority → close.
4) What should I listen for to detect politeness vs real pain?

Not a substitute for doing real interviews.`,
  },
  "validation-notes": {
    title: "AI review for this template",
    intro:
      "Paste synthesis from your notes template. The AI looks for patterns vs one-off anecdotes. Copy into ChatGPT.",
    placeholders: [
      { key: "sessions", label: "How many conversations / sessions", hint: "e.g. 5 chats" },
      { key: "patterns", label: "Repeated themes (their words)", hint: "Bullets ok in one line" },
      { key: "contradictions", label: "Surprises or contradictions", hint: "Or 'none yet'" },
    ],
    template: `You are reviewing my "Validation Notes" synthesis.

DATA:
• Sessions so far: {{sessions}}
• Patterns I heard: {{patterns}}
• Surprises / contradictions: {{contradictions}}

Tasks:
1) Is my evidence too thin to conclude anything? Say so bluntly.
2) Separate signal vs noise: what might be selection bias?
3) What ONE follow-up question should I ask next time?
4) Go / pivot / more learning — what would change my mind?

Keep feedback practical.`,
  },
  "mvp-checklist": {
    title: "AI review for this template",
    intro:
      "Aligns with the MVP Checklist: one outcome, one path, one loop. Copy into ChatGPT.",
    placeholders: [
      { key: "core_outcome", label: "One core user outcome", hint: "Job to be done in one line" },
      { key: "happy_path", label: "Happy path you will ship", hint: "Single flow" },
      { key: "explicitly_out", label: "What you will NOT ship", hint: "Explicit cuts" },
    ],
    template: `You are reviewing my MVP scope using the MVP Checklist frame.

SCOPE:
• Core user outcome: {{core_outcome}}
• Happy path (v1): {{happy_path}}
• Explicitly not building: {{explicitly_out}}

Tasks:
1) Is this still too large? Name the smallest slice that tests the riskiest assumption.
2) One success metric for v1 (leading, not vanity).
3) Top 3 failure modes (wrong problem, UX, distribution).
4) Week-1 build order in 5 bullets.

Be direct.`,
  },
  "pricing-sheet": {
    title: "AI review for this template",
    intro:
      "For the Pricing Sheet: segment, value metric, and anchor. Copy into ChatGPT. Not tax or compliance advice.",
    placeholders: [
      { key: "segment", label: "Segment / ICP", hint: "Who pays" },
      { key: "value_metric", label: "Value metric", hint: "What they buy (seat, GB, outcome…)" },
      { key: "anchor", label: "Anchor price or range", hint: "INR or model" },
    ],
    template: `You are reviewing my first pricing sketch (Pricing Sheet template).

INPUTS:
• Segment: {{segment}}
• Value metric: {{value_metric}}
• Anchor price / range: {{anchor}}

Tasks:
1) Is the value metric tied to customer outcome or internal cost?
2) Suggest a simpler packaging if I over-offered.
3) Name 3 objections buyers will raise and a one-line response each.
4) One pricing experiment for the next 14 days.

Not legal, tax, or regulated pricing advice.`,
  },
  "launch-checklist": {
    title: "AI review for this template",
    intro:
      "Checks promise, channel, and support for launch week. Copy into ChatGPT.",
    placeholders: [
      { key: "promise_line", label: "Clear promise (one line)", hint: "What you deliver" },
      { key: "channel", label: "Primary channel this week", hint: "Where people find you" },
      { key: "support", label: "Day-1 support expectation", hint: "How you help early users" },
    ],
    template: `You are reviewing my launch plan against the Launch Checklist.

LAUNCH CONTEXT:
• Promise (one line): {{promise_line}}
• Primary channel: {{channel}}
• Day-1 support: {{support}}

Tasks:
1) Is the promise specific enough that the right user self-selects?
2) Is the channel realistic for my stage (not "every social")?
3) 5-item launch-week checklist in order.
4) Biggest risk: crickets, wrong audience, or broken onboarding?

Short go / adjust verdict.`,
  },
  "cofounder-checklist": {
    title: "AI review for this template",
    intro:
      "Structured alignment prompts—still not legal advice. Use with a lawyer for agreements. Copy into ChatGPT.",
    placeholders: [
      { key: "roles", label: "Roles & time commitment", hint: "Who does what, hours/week" },
      { key: "equity", label: "Equity split (intended)", hint: "Rough %" },
      { key: "decisions", label: "How you decide when you disagree", hint: "CEO tie-break, vote…" },
    ],
    template: `You are a neutral facilitator reviewing co-founder alignment (Co-Founder Checklist). Not legal advice.

CONTEXT:
• Roles & time: {{roles}}
• Equity intent: {{equity}}
• Decision process: {{decisions}}

Tasks:
1) List 5 misalignment risks for this setup.
2) What must be in writing before serious build (bullet list)?
3) Vesting / cliff — flag if we ignored incentives (high-level only).
4) 5 questions we should answer in a founder session this week.

Recommend a lawyer for binding agreements.`,
  },
  "registration-prep": {
    title: "AI review for this template",
    intro:
      "Orientation only—confirm everything with a CA/CS. Copy into ChatGPT.",
    placeholders: [
      { key: "structure", label: "Structure you lean toward", hint: "OPC, LLP, Pvt Ltd…" },
      { key: "activity", label: "Business activity (plain language)", hint: "What you sell or build" },
      { key: "team", label: "Founders / team", hint: "Solo or co-founders" },
    ],
    template: `You are a structured prep assistant for India startup registration—not a lawyer or CA.

USING REGISTRATION PREP CHECKLIST:
• Structure leaning: {{structure}}
• Business activity: {{activity}}
• Team: {{team}}

Tasks:
1) List documents I should gather before a CA consultation.
2) Questions to ask about Pvt Ltd vs LLP vs OPC for my case (high-level).
3) Flag when I must involve a professional (bullet list).
4) Explicit disclaimer: this is not legal advice.

If info is missing, say what to clarify first.`,
  },
};

/** Full stage content keyed by slug */
export const STAGES = {
  idea: {
    order: 1,
    slug: "idea",
    shortLabel: "Idea",
    title: "Define your startup idea",
    subtitle: "Write your startup in one simple sentence.",
    purpose: "Clarity before you build or brand.",
    warning: "Do not think about logo, app design, or company registration yet.",
    expected: ["A one-line startup idea", "A basic problem statement", "A first target user group"],
    actions: [
      { title: "Define your idea", description: "What are you trying to build?" },
      { title: "Problem first", description: "What problem does this solve?" },
      { title: "Who is this for?", description: "Pick the people who need it most." },
    ],
  },
  problem: {
    order: 2,
    slug: "problem",
    shortLabel: "Problem",
    title: "Focus on the real problem",
    subtitle: "Strong startups solve painful problems clearly.",
    purpose: "Pain clarity beats feature lists.",
    warning: "If the problem is weak, the startup will be weak.",
    expected: ["Problem summary", "Pain level", "Current alternatives"],
    actions: [
      { title: "What hurts today?", description: "Describe the real problem your user faces." },
      { title: "How painful is it?", description: "Is it small, medium, or urgent?" },
      { title: "What do people use now?", description: "Every startup competes with something." },
    ],
  },
  customer: {
    order: 3,
    slug: "customer",
    shortLabel: "Customer",
    title: "Choose your first users",
    subtitle: "Do not build for everyone.",
    purpose: "Narrow focus creates stronger execution.",
    warning: "Broad target users create weak execution.",
    expected: ["Customer profile", "First niche", "First target list"],
    actions: [
      { title: "Pick your first user group", description: "Name one segment you will win first." },
      { title: "Start narrow", description: "Smaller audience, sharper feedback." },
      { title: "List your first 10 target users", description: "People you can actually reach." },
    ],
  },
  validation: {
    order: 4,
    slug: "validation",
    shortLabel: "Validation",
    title: "Validate before you build",
    subtitle: "Talk to real people before writing more code.",
    purpose: "Evidence before engineering depth.",
    warning: "Do not build the full product before validation.",
    expected: ["Validation score", "Repeated problem patterns", "Decision to continue or rethink"],
    actions: [
      { title: "Talk to 5 users", description: "Conversations beat assumptions." },
      { title: "Ask the right questions", description: "Learn pains, habits, and alternatives." },
      { title: "Capture repeated pain", description: "Look for patterns, not one-offs." },
      { title: "Decide go or no-go", description: "Be honest about what you learned." },
    ],
  },
  "business-model": {
    order: 5,
    slug: "business-model",
    shortLabel: "Business Model",
    title: "Decide how this can make money",
    subtitle: "Clarity first. Complexity later.",
    purpose: "Pick a direction you can test.",
    warning: "Do not create too many plans or options too early.",
    expected: ["Business model snapshot", "Pricing direction", "Monetization path"],
    actions: [
      { title: "Pick your startup type", description: "Product, service, marketplace, or hybrid." },
      { title: "Choose B2B or B2C", description: "Who pays, and how they buy." },
      { title: "Choose a pricing model", description: "Subscription, usage, one-time, or bundles." },
      { title: "Estimate your first revenue path", description: "What is the first rupee path?" },
    ],
  },
  mvp: {
    order: 6,
    slug: "mvp",
    shortLabel: "MVP",
    title: "Build the smallest version that proves the idea",
    subtitle: "Your MVP is not your final product.",
    purpose: "Learn faster with less surface area.",
    warning: "A heavy MVP delays learning.",
    expected: ["MVP plan", "Must-have feature set", "Chosen build path"],
    actions: [
      { title: "Choose your must-have feature", description: "One core promise, delivered." },
      { title: "Remove extra features", description: "Cut ruthlessly for v1." },
      { title: "Choose how you will build", description: "No-code, low-code, or code—pick speed." },
      { title: "Define your first version clearly", description: "What ships in week one?" },
    ],
  },
  branding: {
    order: 7,
    slug: "branding",
    shortLabel: "Branding",
    title: "Create the basics people will remember",
    subtitle: "Keep it simple and clear.",
    purpose: "Enough identity to launch and iterate.",
    warning: "Do not waste weeks polishing branding before launch.",
    expected: ["Startup name direction", "One-line pitch", "Basic identity kit"],
    actions: [
      { title: "Pick a simple name", description: "Clear beats clever for v1." },
      { title: "Write your one-line pitch", description: "Who it is for and what it does." },
      { title: "Check domain availability", description: "Secure a sane primary domain." },
      { title: "Define your startup message", description: "What promise do you repeat?" },
    ],
  },
  launch: {
    order: 8,
    slug: "launch",
    shortLabel: "Launch",
    title: "Launch small and learn fast",
    subtitle: "Your first launch is for learning, not perfection.",
    purpose: "Get real usage and feedback fast.",
    warning: "Do not wait for the perfect launch.",
    expected: ["Launch checklist", "First feedback loop", "Product improvement notes"],
    actions: [
      { title: "Publish your first version", description: "Ship something usable." },
      { title: "Share it with real people", description: "Direct outreach beats passive posts." },
      { title: "Collect quick feedback", description: "Short loops, fast fixes." },
      { title: "Improve what matters most", description: "Prioritize the next learning." },
    ],
  },
  "first-users": {
    order: 9,
    slug: "first-users",
    shortLabel: "First Users",
    title: "Get your first real users",
    subtitle: "Start with direct conversations, not big marketing.",
    purpose: "Manual traction before automation.",
    warning: "Do not hide behind product polish when users are the real missing piece.",
    expected: ["First-user tracker", "Outreach log", "Early user feedback"],
    actions: [
      { title: "Reach out to your first users", description: "Warm intros and direct DMs." },
      { title: "Run demos or share access", description: "Show the product in context." },
      { title: "Track every conversation", description: "Notes beat memory." },
      { title: "Ask for referrals", description: "Your best users know similar people." },
    ],
  },
  revenue: {
    order: 10,
    slug: "revenue",
    shortLabel: "Revenue",
    title: "Turn attention into real money",
    subtitle: "A startup becomes stronger the moment someone pays.",
    purpose: "Prove willingness to pay.",
    warning: "Do not underprice only because you feel early.",
    expected: ["First offer", "Pricing test", "Revenue readiness"],
    actions: [
      { title: "Define your first paid offer", description: "What is sold, exactly?" },
      { title: "Test your pricing", description: "Two options beat ten." },
      { title: "Send your first proposal or payment ask", description: "Close a real transaction." },
      { title: "Track first revenue", description: "Even small wins count." },
    ],
  },
  "legal-setup": {
    order: 11,
    slug: "legal-setup",
    shortLabel: "Legal Setup",
    title: "Make it official at the right time",
    subtitle: "Startup setup should come after clarity, not before it.",
    purpose: "Formalize when the model is real.",
    warning: "Do not register just because it feels official.",
    expected: ["Formalization status", "Structure comparison", "Setup readiness"],
    actions: [
      { title: "Do you need registration now?", description: "Decision-first, not fear-first." },
      { title: "Compare startup structures", description: "Sole prop, partnership, Pvt Ltd, LLP." },
      { title: "Understand basic setup requirements", description: "Docs, timelines, and roles." },
      { title: "Get guided setup help", description: "Partner handoff when you are ready." },
    ],
    legalPanel: true,
  },
  growth: {
    order: 12,
    slug: "growth",
    shortLabel: "Growth",
    title: "Grow with systems, not chaos",
    subtitle: "Now build repeatable operations.",
    purpose: "Scale what works, fix what breaks.",
    warning: "Do not scale a broken system.",
    expected: ["Growth roadmap", "Key metrics view", "Next-stage priorities"],
    actions: [
      { title: "Improve retention", description: "Keep what you earn." },
      { title: "Track the right metrics", description: "Fewer numbers, clearer decisions." },
      { title: "Build simple systems", description: "Repeatable playbooks, not heroics." },
      { title: "Plan your next growth move", description: "One focus per quarter." },
    ],
  },
};

/**
 * Generic ChatGPT-style stress-test prompts per stage. Uses {{key}} placeholders;
 * users fill custom values in the UI—templates are not tied to any one startup idea.
 */
export const STAGE_VALIDATION_PROMPTS = {
  idea: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Fill in your details. The prompt stays generic; only your answers change. Copy into ChatGPT (or any AI). This is a thinking review—not legal, tax, or investment advice.",
    placeholders: [
      { key: "one_liner", label: "Your one-line idea", hint: "What you might build, in one sentence" },
      { key: "problem_hint", label: "Problem you think exists", hint: "Who hurts and why" },
      { key: "first_who", label: "First target user", hint: "Narrow group, not 'everyone'" },
    ],
    template: `Act as a skeptical startup advisor. Find weak assumptions; be direct.

I am at the IDEA stage. Use only the context below.

MY CONTEXT (I filled this in):
• One-line idea: {{one_liner}}
• Problem I believe exists: {{problem_hint}}
• First target user: {{first_who}}

Tasks:
1) Is the one-liner specific enough to build or test? If not, rewrite it in 2 sharper variants.
2) List the top 3 risks if this problem or user is wrong.
3) What is the smallest experiment to learn in 1–2 weeks (no code or minimal code)?
4) Label each claim as: evidence / assumption / unknown.

End with: "Move forward if…" and "Stop or rethink if…".`,
  },
  problem: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Fill in your details. The prompt stays generic; only your answers change. Copy into ChatGPT. Not professional advice.",
    placeholders: [
      { key: "problem_statement", label: "Problem statement", hint: "What goes wrong today for the user" },
      { key: "pain_level", label: "How painful (your view)", hint: "e.g. occasional / weekly / daily / revenue-critical" },
      { key: "alternatives", label: "What they use today", hint: "Tools, habits, competitors, or 'nothing'" },
    ],
    template: `Act as a skeptical product strategist. Challenge weak problem definitions.

I am at the PROBLEM stage.

MY CONTEXT:
• Problem: {{problem_statement}}
• Pain level (my view): {{pain_level}}
• Current alternatives: {{alternatives}}

Tasks:
1) Is this a vitamin or a painkiller? Justify briefly.
2) Who feels this pain first and pays or changes behavior?
3) What evidence would falsify this problem (i.e. prove I'm wrong)?
4) Name 2 sharper problem statements if mine is vague.

Output: Verdict (1 line) · Top 3 gaps · Next 2 discovery questions.`,
  },
  customer: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Fill in your details. Generic template; your answers customize it. Copy into ChatGPT.",
    placeholders: [
      { key: "segment", label: "Chosen segment / ICP", hint: "Job title, situation, or niche" },
      { key: "why_you", label: "Why you can reach them", hint: "Channel, community, or network" },
      { key: "anti_segment", label: "Who this is NOT for", hint: "Explicitly exclude someone" },
    ],
    template: `Act as a skeptical GTM advisor. IcPs that are 'everyone' fail.

I am at the CUSTOMER stage.

MY CONTEXT:
• Target segment: {{segment}}
• Why I can reach them: {{why_you}}
• Not for: {{anti_segment}}

Tasks:
1) Is this segment narrow enough to win in 90 days? If not, propose a tighter niche.
2) What does this segment already pay for today (₹ or time)?
3) List 3 ways I could talk to 10 of them this month.
4) What would I learn that would change my product?

End with one line: "Ship when…"`,
  },
  validation: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Paste what you learned from conversations. Template is generic. Copy into ChatGPT.",
    placeholders: [
      { key: "conversations", label: "What you heard (summary)", hint: "Patterns from user chats" },
      { key: "surprise", label: "What surprised you", hint: "Or 'nothing yet'" },
      { key: "decision", label: "Lean: continue, pivot, or stop?", hint: "Your current lean" },
    ],
    template: `Act as a skeptical researcher. Evidence beats optimism.

I am at the VALIDATION stage.

MY CONTEXT:
• Conversation summary: {{conversations}}
• Surprises: {{surprise}}
• My current decision lean: {{decision}}

Tasks:
1) Is my evidence qualitative depth or just a few polite chats? Be blunt.
2) What pattern repeats across people?
3) What did I fail to ask that I should ask next?
4) Go / no-go / more learning: what would change my mind in each case?

Output a short "evidence score" (weak/medium/strong) with reasons.`,
  },
  "business-model": {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Describe your model in your words. Generic prompt; you customize. Copy into ChatGPT.",
    placeholders: [
      { key: "model_type", label: "Startup type / model", hint: "SaaS, services, marketplace, etc." },
      { key: "who_pays", label: "Who pays", hint: "User, employer, advertiser…" },
      { key: "first_rupee", label: "First rupee path (guess)", hint: "How money might flow first" },
    ],
    template: `Act as a skeptical business-model reviewer.

I am at the BUSINESS MODEL stage.

MY CONTEXT:
• Model type: {{model_type}}
• Who pays: {{who_pays}}
• First revenue path (my guess): {{first_rupee}}

Tasks:
1) Is the payer clear? If not, list 2 clearer options.
2) What is the simplest pricing experiment in 14 days?
3) What metric proves willingness to pay?
4) Name 2 risks (market, execution, regulation) for this model in India.

Not legal or tax advice.`,
  },
  mvp: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Describe scope in your words. Generic template. Copy into ChatGPT.",
    placeholders: [
      { key: "mvp_scope", label: "What v1 must do", hint: "One core job to be done" },
      { key: "cut_list", label: "What you are NOT building yet", hint: "Explicit cuts" },
      { key: "build_path", label: "How you will build", hint: "No-code, low-code, code, agency…" },
    ],
    template: `Act as a skeptical product lead. Scope creep kills MVPs.

I am at the MVP stage.

MY CONTEXT:
• v1 must deliver: {{mvp_scope}}
• Explicitly not building: {{cut_list}}
• Build approach: {{build_path}}

Tasks:
1) Is v1 still too big? If yes, cut to a smaller slice with one sentence.
2) What is the single success metric for v1?
3) What failure mode is most likely (wrong problem, wrong UX, wrong channel)?
4) Week-1 plan in 5 bullets.

Be direct.`,
  },
  branding: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Your name and pitch—generic prompt shell. Copy into ChatGPT.",
    placeholders: [
      { key: "name_direction", label: "Name or direction", hint: "Working name or 2 options" },
      { key: "pitch_line", label: "One-line pitch", hint: "Who it's for + what it does" },
      { key: "differentiator", label: "Why you vs alternatives", hint: "One differentiator" },
    ],
    template: `Act as a skeptical messaging reviewer (not a lawyer—no trademark clearance).

I am at the BRANDING stage.

MY CONTEXT:
• Name direction: {{name_direction}}
• One-line pitch: {{pitch_line}}
• Differentiator: {{differentiator}}

Tasks:
1) Is the pitch clear in 5 seconds? If not, give 2 alternatives.
2) Is the differentiator a feature or an outcome? Fix if needed.
3) What would confuse a first-time visitor?
4) Checklist: name spellable? pitch has who+what? avoid jargon?

Short verdict + 3 fixes.`,
  },
  launch: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Your launch context fills the blanks. Generic template. Copy into ChatGPT.",
    placeholders: [
      { key: "what_ships", label: "What you are shipping", hint: "Link or description" },
      { key: "channel", label: "Primary channel", hint: "Where first users come from" },
      { key: "launch_goal", label: "Goal for first 7 days", hint: "One metric" },
    ],
    template: `Act as a skeptical launch reviewer.

I am at the LAUNCH stage.

MY CONTEXT:
• Shipping: {{what_ships}}
• Primary channel: {{channel}}
• 7-day goal: {{launch_goal}}

Tasks:
1) Is the launch goal measurable? If not, propose one.
2) What is the smallest launch that still learns (vs perfectionism)?
3) Day-1–3 checklist (5 items).
4) Biggest risk: crickets, wrong audience, or product gap?

Output: go / adjust with reasons.`,
  },
  "first-users": {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Describe outreach in your words. Generic prompt. Copy into ChatGPT.",
    placeholders: [
      { key: "outreach", label: "What you are doing for outreach", hint: "DMs, intros, communities" },
      { key: "blocker", label: "Main blocker", hint: "No replies, no time, etc." },
      { key: "feedback", label: "Feedback so far", hint: "Themes from users" },
    ],
    template: `Act as a skeptical early-traction coach.

I am at the FIRST USERS stage.

MY CONTEXT:
• Outreach: {{outreach}}
• Blocker: {{blocker}}
• Feedback themes: {{feedback}}

Tasks:
1) Is my outreach repeatable or one-off heroics?
2) Suggest 3 higher-conversion next actions.
3) Who should I ask for intros (profile)?
4) What metric proves I'm not stuck in 'building'?

Be specific.`,
  },
  revenue: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Your offer and pricing—generic shell. Copy into ChatGPT. Not tax advice.",
    placeholders: [
      { key: "offer", label: "What you sell (exactly)", hint: "Package or SKU" },
      { key: "price", label: "Price or range", hint: "INR or model" },
      { key: "proof", label: "Proof of demand so far", hint: "LOI, verbal yes, pilot…" },
    ],
    template: `Act as a skeptical revenue reviewer.

I am at the REVENUE stage.

MY CONTEXT:
• Offer: {{offer}}
• Price: {{price}}
• Proof so far: {{proof}}

Tasks:
1) Is the offer one clear SKU or a buffet? Simplify if needed.
2) Is pricing aligned with value and segment? Challenge if too low/high.
3) What is the next commit step (deposit, pilot, annual)?
4) List 3 objections buyers will have and how I answer them.

Not legal or accounting advice.`,
  },
  "legal-setup": {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Your situation fills the blanks. Use for orientation only—verify with a CA/CS. Copy into ChatGPT.",
    placeholders: [
      { key: "structure_lean", label: "Structure you consider", hint: "Sole prop, LLP, Pvt Ltd…" },
      { key: "team_reality", label: "Team & equity (roughly)", hint: "Solo or co-founders" },
      { key: "revenue_stage", label: "Revenue / contracts status", hint: "Pre-revenue, pilots, paying…" },
    ],
    template: `Act as a structured checklist assistant—not a lawyer or CA. Flag when professional advice is required.

I am at the LEGAL SETUP stage (India context, general).

MY CONTEXT:
• Structure I'm considering: {{structure_lean}}
• Team: {{team_reality}}
• Revenue/contracts: {{revenue_stage}}

Tasks:
1) List questions I should ask a CA/CS before filing (bullet list).
2) Common mismatch: when is Pvt Ltd vs LLP vs OPC more typical? (high-level only).
3) What documents should I gather before a consultation?
4) Explicitly state: "This is not legal advice."

If anything is unclear, say what I must clarify with a professional.`,
  },
  growth: {
    title: "Stress-test this stage (ChatGPT)",
    intro:
      "Your metrics and bottleneck—generic template. Copy into ChatGPT.",
    placeholders: [
      { key: "north_star", label: "North-star metric", hint: "One number you track" },
      { key: "bottleneck", label: "Biggest bottleneck", hint: "Acquisition, retention, ops…" },
      { key: "next_bet", label: "Next growth bet", hint: "One initiative this quarter" },
    ],
    template: `Act as a skeptical growth advisor.

I am at the GROWTH stage.

MY CONTEXT:
• North-star metric: {{north_star}}
• Bottleneck: {{bottleneck}}
• Next bet: {{next_bet}}

Tasks:
1) Is the metric leading or lagging? Suggest one paired metric.
2) Am I scaling a broken funnel? How would I know?
3) One experiment to validate the next bet (hypothesis, success, kill criteria).
4) What not to scale yet?

Short verdict + priority order (3 items).`,
  },
};

/**
 * @param {{ template: string, placeholders: Array<{ key: string, label: string }> }} def
 * @param {Record<string, string>} values
 */
export function buildPromptFromDefinition(def, values) {
  if (!def?.template) return "";
  let out = def.template;
  for (const ph of def.placeholders || []) {
    const raw = values[ph.key];
    const v = typeof raw === "string" ? raw.trim() : "";
    out = out.split(`{{${ph.key}}}`).join(v || `[${ph.label}]`);
  }
  return out;
}

/**
 * @param {string} slug
 * @param {Record<string, string>} values
 */
export function buildStageValidationPrompt(slug, values) {
  const def = STAGE_VALIDATION_PROMPTS[slug];
  if (!def) return "";
  return buildPromptFromDefinition(def, values);
}

/**
 * @param {string} toolId
 * @param {Record<string, string>} values
 */
export function buildToolPrompt(toolId, values) {
  const def = TOOL_AI_PROMPTS[toolId];
  if (!def) return "";
  return buildPromptFromDefinition(def, values);
}
