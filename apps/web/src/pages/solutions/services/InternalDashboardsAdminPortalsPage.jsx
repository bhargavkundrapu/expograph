import ServicePageTemplate from "../../../Components/solutions/ServicePageTemplate";
import SolutionsShell from "../../../Components/solutions/SolutionsShell";
import { SERVICES_BY_SLUG } from "../../../content/solutions/services";

export default function InternalDashboardsAdminPortalsPage() {
  return (
    <SolutionsShell>
      <ServicePageTemplate service={SERVICES_BY_SLUG["internal-dashboards-admin-portals"]} />
    </SolutionsShell>
  );
}
