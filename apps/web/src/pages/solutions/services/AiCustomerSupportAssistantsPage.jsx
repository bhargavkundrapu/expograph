import ServicePageTemplate from "../../../Components/solutions/ServicePageTemplate";
import SolutionsShell from "../../../Components/solutions/SolutionsShell";
import { SERVICES_BY_SLUG } from "../../../content/solutions/services";

export default function AiCustomerSupportAssistantsPage() {
  return (
    <SolutionsShell>
      <ServicePageTemplate service={SERVICES_BY_SLUG["ai-customer-support-assistants"]} />
    </SolutionsShell>
  );
}
