import { Link } from "react-router-dom";
import { Header } from "../../Components/ui/header-2";
import { TubesBackground } from "../../Components/ui/neon-flow";

const LAST_UPDATED = "March 30, 2026";

function Section({ title, children }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="text-sm sm:text-base text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsConditionsPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms &amp; Conditions</h1>
            <p className="text-sm text-white/50">
              Last updated: <span className="text-white/70 font-medium">{LAST_UPDATED}</span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            These Terms &amp; Conditions govern your use of ExpoGraph Academy website and services. By accessing or
            using our services, you agree to these terms.
          </p>

          <Section title="1. Acceptance of terms">
            By using the website and purchasing courses, you agree to be bound by these Terms &amp; Conditions.
          </Section>

          <Section title="2. Eligibility">
            You must be able to form a legally binding contract to use our services. If you are using the
            services on behalf of an organization, you represent that you have authority to agree to these terms.
          </Section>

          <Section title="3. Purchases and access">
            Course access may require account verification and payment. Access rules and availability may depend
            on the specific course or plan you purchase.
          </Section>

          <Section title="4. Payments">
            Payments are processed through third-party payment providers. ExpoGraph is not responsible for payment
            provider failures or delays outside our control.
          </Section>

          <Section title="5. Refunds and cancellations">
            Refunds (if any) are handled according to our refund policy. Replace this section with your official
            refund/cancellation terms.
          </Section>

          <Section title="6. User conduct">
            You agree not to misuse the services, attempt unauthorized access, or interfere with our systems.
            You are responsible for maintaining the confidentiality of your account credentials.
          </Section>

          <Section title="7. Intellectual property">
            All course content, branding, and materials are protected by intellectual property laws. You agree not
            to reproduce, distribute, or create derivative works without permission, except as allowed by law.
          </Section>

          <Section title="8. Limitation of liability">
            To the maximum extent permitted by law, ExpoGraph will not be liable for indirect, incidental, special,
            or consequential damages arising from your use of the services.
          </Section>

          <Section title="9. Changes to these terms">
            We may update these Terms &amp; Conditions from time to time. Updated terms will be posted on this page
            with the revision date.
          </Section>

          <Section title="10. Contact us">
            If you have any questions about these Terms &amp; Conditions, contact us through our website. Replace this
            section with your official support details.
          </Section>

          <p className="text-xs text-white/40 leading-relaxed">
            Note: This is a template for UI purposes and not legal advice. Replace text with your actual legal terms.
          </p>
        </div>
      </main>

      <footer className="w-full min-h-[420px] sm:min-h-[45vh] border-t border-black">
        <TubesBackground className="min-h-[420px] sm:min-h-[45vh] bg-[#0a0a0a]" enableClickInteraction={true}>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[420px] sm:min-h-[45vh] gap-6 text-center px-4">
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-white/50 pointer-events-none">
              <span className="text-xs uppercase tracking-widest">Move the cursor around to interact</span>
              <span className="text-xs text-white/40">&copy; 2025 ExpoGraph Academy</span>
            </div>

            <div className="absolute bottom-8 right-6 flex items-center gap-4 text-white/55 pointer-events-auto">
              <Link to="/privacy-policy" className="text-xs hover:text-white/80 underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-xs hover:text-white/80 underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </TubesBackground>
      </footer>
    </div>
  );
}

