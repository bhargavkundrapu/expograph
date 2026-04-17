import ServicePageTemplate from "../../../Components/solutions/ServicePageTemplate";
import SolutionsShell from "../../../Components/solutions/SolutionsShell";
import { SERVICES_BY_SLUG } from "../../../content/solutions/services";

export default function WhatsappSalesSupportSystemsPage() {
  return (
    <SolutionsShell>
      <ServicePageTemplate service={SERVICES_BY_SLUG["whatsapp-sales-support-systems"]} />
    </SolutionsShell>
  );
}
