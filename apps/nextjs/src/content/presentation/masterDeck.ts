/**
 * Master product presentation - ExpoGraph Academy.
 * Copy is aligned with the live product; no invented metrics or outcomes.
 */

import type { ScreenshotMap } from './screenshotMap';

export type ActId = 1 | 2 | 3 | 4 | 5 | 6;

export type SectionId =
  | 'cover'
  | 'problem'
  | 'why-now'
  | 'what-is'
  | 'promise'
  | 'tracks'
  | 'lms'
  | 'smart-prompts'
  | 'client-lab'
  | 'career-tools'
  | 'launchpad'
  | 'trust'
  | 'pricing'
  | 'standout'
  | 'closing';

export type SectionVariant =
  | 'cover'
  | 'statement'
  | 'split'
  | 'grid-4'
  | 'screenshot'
  | 'triple'
  | 'pricing'
  | 'trust'
  | 'closing'
  | 'timeline';

export interface DeckSection {
  id: SectionId;
  act: ActId;
  actLabel: string;
  variant: SectionVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lines?: string[];
  /** Short label for nav / chapter rail */
  navLabel: string;
  screenshotKey?: keyof ScreenshotMap;
}

export const ACT_LABELS: Record<ActId, string> = {
  1: 'Attention',
  2: 'Why now',
  3: 'The product',
  4: 'Depth',
  5: 'Trust & value',
  6: 'Conviction',
};

export const MASTER_DECK: DeckSection[] = [
  {
    id: 'cover',
    act: 1,
    actLabel: ACT_LABELS[1],
    variant: 'cover',
    eyebrow: 'ExpoGraph Academy',
    title: 'Stop learning to code. Start building with AI.',
    subtitle:
      'ExpoGraph is built for students who want real skills, real projects, real proof, and real momentum - not passive watching.',
    navLabel: 'Cover',
    screenshotKey: 'hero',
  },
  {
    id: 'problem',
    act: 1,
    actLabel: ACT_LABELS[1],
    variant: 'split',
    eyebrow: 'The gap',
    title: 'Students are learning more. But building less.',
    lines: [
      'Tutorials are everywhere.',
      'Certificates are easy to list.',
      'What still cuts through is proof - what you shipped, and can show.',
      'Many students still struggle to demonstrate real output.',
    ],
    navLabel: 'Problem',
  },
  {
    id: 'why-now',
    act: 2,
    actLabel: ACT_LABELS[2],
    variant: 'statement',
    eyebrow: 'Why now',
    title: 'The AI era changed the rules.',
    lines: [
      'AI-native workflows are the default for many teams.',
      'Speed and iteration beat memorization.',
      'Practical output beats theory-only study.',
      'Your portfolio and visible capability matter more than ever.',
    ],
    navLabel: 'Why now',
  },
  {
    id: 'what-is',
    act: 3,
    actLabel: ACT_LABELS[3],
    variant: 'timeline',
    eyebrow: 'What ExpoGraph is',
    title: 'A student-first AI build platform',
    lines: [
      'Structured AI skill tracks - not random playlists.',
      'A real student LMS with progress and momentum.',
      'Smart prompts that reduce blank-page friction.',
      'Pathways into real work, career tools, and founder support.',
    ],
    navLabel: 'Platform',
  },
  {
    id: 'promise',
    act: 3,
    actLabel: ACT_LABELS[3],
    variant: 'split',
    eyebrow: 'Core promise',
    title: 'From learning to real-world doing',
    subtitle: 'Where learning meets real-world doing.',
    lines: [
      'Watch less. Build more.',
      'Move from concepts to output you can show.',
      'Pair completion with proof - projects, portfolio, and certificates.',
    ],
    navLabel: 'Promise',
  },
  {
    id: 'tracks',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'grid-4',
    eyebrow: 'Learning tracks',
    title: 'AI-native skill tracks for today’s students',
    lines: [],
    navLabel: 'Tracks',
  },
  {
    id: 'lms',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'screenshot',
    eyebrow: 'Product depth',
    title: 'A real LMS - not just a content list',
    lines: [
      'Dashboard with your next steps front and center.',
      'Progress, streaks, XP, and levels to sustain momentum.',
      'Structured lesson flow designed around building.',
    ],
    navLabel: 'LMS',
    screenshotKey: 'dashboard',
  },
  {
    id: 'smart-prompts',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'screenshot',
    eyebrow: 'Differentiation',
    title: 'Build faster with Smart Prompts',
    lines: [
      'Less blank-page fear - prompts live next to lessons.',
      'Faster practical output with copy-ready snippets.',
      'Support for real AI-assisted workflows as you learn.',
    ],
    navLabel: 'Smart Prompts',
    screenshotKey: 'lessonPrompts',
  },
  {
    id: 'client-lab',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'screenshot',
    eyebrow: 'Proof',
    title: 'Where learning becomes real work',
    lines: [
      'Real tasks and project-style work - not toy exercises alone.',
      'Mentor review for quality feedback.',
      'Portfolio-grade output you can stand behind.',
    ],
    navLabel: 'Client Lab',
    screenshotKey: 'clientLab',
  },
  {
    id: 'career-tools',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'triple',
    eyebrow: 'Opportunity',
    title: 'Learning connected to opportunity',
    subtitle: 'India-first career command center - job search helpers that open the portals you already use.',
    lines: [
      'Resume Builder - structured, export-ready.',
      'Certificates - completion and verification flow in the product.',
      'Jobs Search Hub - presets, keyword control, and redirects (you apply on the original site).',
    ],
    navLabel: 'Career',
    screenshotKey: 'jobsHub',
  },
  {
    id: 'launchpad',
    act: 4,
    actLabel: ACT_LABELS[4],
    variant: 'screenshot',
    eyebrow: 'Founders',
    title: 'For students who want to build beyond jobs',
    subtitle: 'Your startup path, in the right order.',
    lines: [
      'Startup LaunchPad - readiness, staged path, and founder-oriented tools.',
      'Legal timing guidance appears when it makes sense in the journey.',
      'Access is tied to your course pack rules in the LMS.',
    ],
    navLabel: 'LaunchPad',
    screenshotKey: 'launchpad',
  },
  {
    id: 'trust',
    act: 5,
    actLabel: ACT_LABELS[5],
    variant: 'trust',
    eyebrow: 'Trust',
    title: 'Built with visible trust signals',
    lines: [
      'MCA recognition narrative as presented on ExpoGraph Academy.',
      'Certificate flow: complete lessons, then request and verify.',
      'Curriculum positioning: designed with strong industry practitioners.',
    ],
    navLabel: 'Trust',
    screenshotKey: 'certificates',
  },
  {
    id: 'pricing',
    act: 5,
    actLabel: ACT_LABELS[5],
    variant: 'pricing',
    eyebrow: 'Accessibility',
    title: 'Premium learning. Unbeatable price.',
    lines: [
      'Individual courses at an entry price designed for students.',
      'All-access pack for breadth and bundled value.',
      'AI Automations positioned as a bonus with the pack in the product.',
    ],
    navLabel: 'Pricing',
    screenshotKey: 'pricing',
  },
  {
    id: 'standout',
    act: 6,
    actLabel: ACT_LABELS[6],
    variant: 'statement',
    eyebrow: 'Summary',
    title: 'Why ExpoGraph stands out',
    lines: [
      'Build-first AI learning with a real LMS layer.',
      'Smart Prompts, Real Client Lab, Resume Builder, Jobs Hub, Startup LaunchPad.',
      'Affordable entry - strength, not compromise.',
    ],
    navLabel: 'Stand out',
  },
  {
    id: 'closing',
    act: 6,
    actLabel: ACT_LABELS[6],
    variant: 'closing',
    eyebrow: 'Next step',
    title: 'Build, prove, and move forward.',
    subtitle: 'Affordable AI learning. Real projects. Real tools. Real momentum.',
    lines: ['Start building with ExpoGraph.'],
    navLabel: 'Close',
    screenshotKey: 'hero',
  },
];

export const TRACK_CARDS = [
  {
    title: 'Vibe Coding',
    description: 'Build with AI-assisted workflows - ship, don’t only study.',
    accent: 'from-violet-500/30 to-fuchsia-500/20',
  },
  {
    title: 'Prompt Engineering',
    description: 'Think in prompts - clarity, structure, and iteration.',
    accent: 'from-indigo-500/30 to-blue-500/20',
  },
  {
    title: 'Prompt to Profit',
    description: 'Connect prompting to practical value and outcomes.',
    accent: 'from-amber-500/25 to-orange-500/15',
  },
  {
    title: 'AI Automations',
    description: 'Automate workflows with intelligence - bonus depth with the pack.',
    accent: 'from-emerald-500/25 to-teal-500/15',
  },
] as const;
