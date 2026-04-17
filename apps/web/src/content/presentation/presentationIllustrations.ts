/**
 * Illustrations used only on `/presentation` deck slides.
 * Each URL is checked to load (Unsplash `images.unsplash.com`) and is not referenced elsewhere in this app.
 */

const Q = 'w=1600&q=80&auto=format&fit=crop';

export type DeckIllustration = { src: string; alt: string };

export const DECK_ILLUSTRATIONS = {
  whyNowAiEra: {
    src: `https://images.unsplash.com/photo-1620121692029-d088224ddc74?${Q}`,
    alt: 'Abstract flowing light trails suggesting rapid change, representing how the AI era rewrote speed, iteration, and how work gets done',
  },
  problemConsumption: {
    src: `https://images.unsplash.com/photo-1574169208507-84376144848b?${Q}`,
    alt: 'Learner on a sofa with a laptop, representing passive consumption and comfort-zone scrolling',
  },
  problemProof: {
    src: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${Q}`,
    alt: 'Small team gathered around laptops, representing collaboration and tangible work you can show',
  },
  journeyLearn: {
    src: `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?${Q}`,
    alt: 'Python learning book beside a keyboard, representing structured foundations before you build',
  },
  journeyBuild: {
    src: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?${Q}`,
    alt: 'Laptop with code editor and coffee, representing hands-on building and iteration',
  },
  journeyProve: {
    src: `https://images.unsplash.com/photo-1556761175-4b46a572b786?${Q}`,
    alt: 'Team celebrating together in the office, representing outcomes, momentum, and proof people can see',
  },
  trackVibeCoding: {
    src: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?${Q}`,
    alt: 'Dark-themed code editor on a monitor, representing vibe coding and shipping in the editor',
  },
  trackPromptEngineering: {
    src: `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?${Q}`,
    alt: 'Humanoid robot at a laptop, representing structured prompting and human–AI collaboration',
  },
  trackPromptToProfit: {
    src: `https://images.unsplash.com/photo-1555949963-aa79dcee981c?${Q}`,
    alt: 'Mobile phone showing code over a laptop, representing skills turned into real-world value',
  },
  trackAiAutomations: {
    src: `https://images.unsplash.com/photo-1542838132-92c53300491e?${Q}`,
    alt: 'Phone and laptop on a desk with notes, representing connected workflows and intelligent automation',
  },
} as const satisfies Record<string, DeckIllustration>;

export type DeckIllustrationId = keyof typeof DECK_ILLUSTRATIONS;

export type TrackDeckIllustrationId = Extract<
  DeckIllustrationId,
  'trackVibeCoding' | 'trackPromptEngineering' | 'trackPromptToProfit' | 'trackAiAutomations'
>;
