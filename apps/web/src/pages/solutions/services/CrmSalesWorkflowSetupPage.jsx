import ServicePageTemplate from "../../../Components/solutions/ServicePageTemplate";
import SolutionsShell from "../../../Components/solutions/SolutionsShell";
import { SERVICES_BY_SLUG } from "../../../content/solutions/services";

export default function CrmSalesWorkflowSetupPage() {
  return (
    <SolutionsShell>
      <ServicePageTemplate service={SERVICES_BY_SLUG["crm-sales-workflow-setup"]} />
    </SolutionsShell>
  );
}
