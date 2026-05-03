import { Header } from "../../Components/ui/header-2";
import { TubesBackground } from "../../Components/ui/neon-flow";
import FlowTubesFooterInner from "../../Components/ui/FlowTubesFooterInner";

const LAST_UPDATED = "March 30, 2026";

function Section({ title, children }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="text-sm sm:text-base text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen relative w-full overflow-x-hidden"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "#0a0a0a",
        color: "var(--text-secondary)",
      }}
    >
      <Header />

      <main className="pt-24 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-7">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="text-sm text-white/50">
              Last updated: <span className="text-white/70 font-medium">{LAST_UPDATED}</span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            This Privacy Policy explains how ExpoGraph collects, uses, and protects information when you use our
            website and services.
          </p>

          <Section title="1. Who we are">
            ExpoGraph Academy ("we", "us", "our") provides education-related services and course access. If you have
            questions about privacy, contact us using the details on our website.
          </Section>

          <Section title="2. Information we collect">
            We may collect information you provide directly (such as name and email) and information generated during
            use (such as usage analytics). For payments, payment-related information is handled by our payment
            providers.
          </Section>

          <Section title="3. How we use information">
            We use information to provide and operate our services, manage accounts, process purchases, send
            verification emails, and improve user experience. We may also use information to comply with legal
            obligations.
          </Section>

          <Section title="4. Sharing and disclosures">
            We do not sell your personal information. We may share information with service providers (such as
            analytics and email delivery) who help us operate our services, and with authorities when required by law.
          </Section>

          <Section title="5. Data security">
            We use reasonable technical and organizational safeguards designed to protect information from
            unauthorized access, alteration, disclosure, or destruction.
          </Section>

          <Section title="6. Your choices and rights">
            Depending on your location, you may have rights related to your personal information (such as access,
            correction, or deletion). You can also request changes by contacting us.
          </Section>

          <Section title="7. Cookies and similar technologies">
            We may use cookies or similar technologies to make the site work, remember preferences, and understand usage.
          </Section>

          <Section title="8. Contact us">
            If you have any questions about this Privacy Policy, contact us through our website. Replace this section
            with your official contact details.
          </Section>

          <p className="text-xs text-white/40 leading-relaxed">
            Note: This is a template for UI purposes and not legal advice. Replace text with your actual legal policy.
          </p>
        </div>
      </main>

      <footer className="w-full min-h-[420px] sm:min-h-[45vh] border-t border-black">
        <TubesBackground className="min-h-[420px] sm:min-h-[45vh] bg-[#0a0a0a]" enableClickInteraction={true}>
          <FlowTubesFooterInner
            shellClassName="min-h-[420px] sm:min-h-[45vh]"
            hideTitle
            interactionHint="Move the cursor around to interact"
          />
        </TubesBackground>
      </footer>
    </div>
  );
}

