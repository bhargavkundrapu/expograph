import { Link } from "react-router-dom";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";

export default function TenantAdminHome() {
  const { isEnabled } = useFeatureFlags();

  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_SETTINGS)) {
    quickActions.push({
      title: "Tenant Settings",
      desc: "Manage tenant configuration and branding",
      to: "/lms/admin/settings",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_USERS)) {
    quickActions.push({
      title: "User Management",
      desc: "Manage users and permissions",
      to: "/lms/admin/users",
    });
  }

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>TenantAdmin Portal</h1>
              <p>Manage your tenant configuration</p>
            </div>
          </div>
        </div>
      </div>

      {quickActions.length > 0 && (
        <div>
          <h2>Quick Actions</h2>
          <div>
            {quickActions.map((action, idx) => {
              return (
                <Link key={action.to} to={action.to}>
                  <Card
                    variant="elevated"
                  >
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{action.title}</CardTitle>
                        <CardDescription>{action.desc}</CardDescription>
                      </div>
                      <div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {quickActions.length === 0 && (
        <Card variant="elevated">
          <CardTitle>No Features Available</CardTitle>
          <CardDescription>All tenant admin features are currently disabled. Contact your administrator.</CardDescription>
        </Card>
      )}
    </div>
  );
}
