import SolutionsShell from "../../Components/solutions/SolutionsShell";
import SolutionsBookCtaSection from "../../Components/solutions/home/SolutionsBookCtaSection";
import SolutionsFaqPreviewSection from "../../Components/solutions/home/SolutionsFaqPreviewSection";
import SolutionsHeroSection from "../../Components/solutions/home/SolutionsHeroSection";
import SolutionsIndustriesSection from "../../Components/solutions/home/SolutionsIndustriesSection";
import SolutionsPricingPreviewSection from "../../Components/solutions/home/SolutionsPricingPreviewSection";
import SolutionsProcessPreviewSection from "../../Components/solutions/home/SolutionsProcessPreviewSection";
import SolutionsServicesSection from "../../Components/solutions/home/SolutionsServicesSection";
import SolutionsTrustStripSection from "../../Components/solutions/home/SolutionsTrustStripSection";
import SolutionsWhatWeHelpSection from "../../Components/solutions/home/SolutionsWhatWeHelpSection";
import SolutionsWhySection from "../../Components/solutions/home/SolutionsWhySection";
import { SOLUTIONS_SERVICES } from "../../content/solutions/services";

const categoryOrder = ["Growth", "Automation", "Software"];

export default function SolutionsPage() {
  const servicesByCategory = categoryOrder.map((cat) => ({
    category: cat,
    items: SOLUTIONS_SERVICES.filter((s) => s.category === cat),
  }));

  return (
    <SolutionsShell>
      <SolutionsHeroSection />
      <SolutionsTrustStripSection />
      <SolutionsWhatWeHelpSection />
      <SolutionsServicesSection servicesByCategory={servicesByCategory} />
      <SolutionsIndustriesSection />
      <SolutionsWhySection />
      <SolutionsProcessPreviewSection />
      <SolutionsPricingPreviewSection />
      <SolutionsFaqPreviewSection />
      <SolutionsBookCtaSection />
    </SolutionsShell>
  );
}
