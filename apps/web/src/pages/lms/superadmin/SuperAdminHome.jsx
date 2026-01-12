import { Link } from "react-router-dom";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";

export default function SuperAdminHome() {
  const { isEnabled } = useFeatureFlags();
  
  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CONTENT)) {
    quickActions.push({
      title: "Content Admin",
      desc: "Manage courses and content",
      to: "/lms/superadmin/content",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_ANALYTICS)) {
    quickActions.push({
      title: "Analytics",
      desc: "View platform statistics",
      to: "/lms/superadmin/analytics",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_LEADS)) {
    quickActions.push({
      title: "Leads Management",
      desc: "Manage and track leads",
      to: "/lms/superadmin/leads",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_WORKSHOPS)) {
    quickActions.push({
      title: "Workshops",
      desc: "Create and manage workshops",
      to: "/lms/superadmin/workshops",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CERTIFICATES)) {
    quickActions.push({
      title: "Certificates",
      desc: "Issue certificates to students",
      to: "/lms/superadmin/certificates",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_INTERNSHIPS, "micro_internships", "internships", "micro_internship")) {
    quickActions.push({
      title: "Internships",
      desc: "Manage micro-internship projects",
      to: "/lms/superadmin/internships",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_CLIENT_LAB)) {
    quickActions.push({
      title: "Client Lab",
      desc: "Manage client lab projects",
      to: "/lms/superadmin/client-lab",
    });
  }
  
  quickActions.push({
    title: "Feature Flags",
    desc: "Manage platform features",
    to: "/lms/superadmin/feature-flags",
  });

  return (
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>SuperAdmin Portal</h1>
            <p>Complete platform management dashboard</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
          </div>
          <h2>Quick Actions</h2>
        </div>

        <div>
          {quickActions.map((action, idx) => (
            <Link 
              key={action.title} 
              to={action.to}
            >
              <Card>
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>
                    {action.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
