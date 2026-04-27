import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ExpoGraph Presentation - Student-First AI Build Platform',
  description:
    'Explore ExpoGraph: an affordable AI-first learning and build platform with real projects, smart prompts, career tools, and founder pathways.',
  openGraph: {
    title: 'ExpoGraph Presentation - Student-First AI Build Platform',
    description:
      'Explore ExpoGraph: affordable AI-first learning with real projects, smart prompts, career tools, and founder pathways.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExpoGraph Presentation',
    description:
      'Student-first AI build platform - smart prompts, real client work, career tools, Startup LaunchPad.',
  },
};

export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
