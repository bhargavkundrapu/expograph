/**
 * TEMPLATE: How to add a new feature flag
 * 
 * Copy this template when adding new features to any portal
 */

// ============================================
// STEP 1: Add flag key to FEATURE_FLAGS object
// ============================================
// In apps/web/src/utils/featureFlags.js, add:

export const FEATURE_FLAGS = {
  // ... existing flags ...
  
  // NEW FEATURE - Add your flag here
  STUDENT_NEW_FEATURE: "student_new_feature",  // Format: {PORTAL}_{FEATURE_NAME}
  // or
  SUPERADMIN_NEW_FEATURE: "superadmin_new_feature",
  // or
  MENTOR_NEW_FEATURE: "mentor_new_feature",
  // or
  TENANT_ADMIN_NEW_FEATURE: "tenant_admin_new_feature",
};

// ============================================
// STEP 2: Add to getAllFeatureFlags() function
// ============================================
// In the same file, add to getAllFeatureFlags():

export function getAllFeatureFlags() {
  return [
    // ... existing flags ...
    
    // NEW FEATURE - Add your flag here
    { 
      key: FEATURE_FLAGS.STUDENT_NEW_FEATURE, 
      description: "Student: Description of what this feature does", 
      category: "Student Portal"  // or "SuperAdmin Portal", "Mentor Portal", "TenantAdmin Portal"
    },
  ];
}

// ============================================
// STEP 3: Use in your component
// ============================================
// In your component file:

import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";

export default function YourNewFeaturePage() {
  const { isEnabled } = useFeatureFlags();
  
  // Option 1: Redirect if disabled
  if (!checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
    return <Navigate to="/lms/student" replace />;
  }
  
  // Option 2: Show disabled message
  if (!checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
    return (
      <div>
        <h1>Feature Disabled</h1>
        <p>This feature is currently disabled by the administrator.</p>
      </div>
    );
  }
  
  // Your component code here...
}

// ============================================
// STEP 4: Add to navigation (if needed)
// ============================================
// In apps/web/src/layouts/PortalLayout.jsx:

// For Student Portal:
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  studentNav.push({ to: `${base}/new-feature`, label: "New Feature", flag: FEATURE_FLAGS.STUDENT_NEW_FEATURE });
}

// For SuperAdmin Portal:
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_NEW_FEATURE)) {
  items.push({ to: `${base}/new-feature`, label: "New Feature", flag: FEATURE_FLAGS.SUPERADMIN_NEW_FEATURE });
}

// ============================================
// STEP 5: Add to dashboard/home (if needed)
// ============================================
// In apps/web/src/pages/lms/student/StudentHome.jsx or SuperAdminHome.jsx:

if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  quickLinks.push({
    icon: FaYourIcon,
    title: "New Feature",
    desc: "Description of the feature",
    to: "/lms/student/new-feature",
    color: "from-cyan-400 to-blue-500",
  });
}

// ============================================
// STEP 6: Add route (if needed)
// ============================================
// In apps/web/src/app/router.jsx:

import YourNewFeaturePage from "../pages/lms/student/YourNewFeaturePage";

// Add to routes:
{
  path: "/lms/student",
  children: [
    // ... existing routes ...
    { path: "new-feature", element: <YourNewFeaturePage /> },
  ],
}

// ============================================
// DONE! 
// ============================================
// Now:
// 1. The feature flag will appear in SuperAdmin → Feature Flags
// 2. SuperAdmin can enable/disable it
// 3. The feature will show/hide based on the flag status
// 4. By default, features show (fail-open) unless explicitly disabled

