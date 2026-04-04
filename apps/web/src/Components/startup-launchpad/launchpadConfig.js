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
