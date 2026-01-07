/**
 * Feature Flag Keys - Centralized list of all feature flags
 * SuperAdmin can control all features through the Feature Flags page
 * 
 * IMPORTANT: When adding new features, ALWAYS:
 * 1. Add the flag key here
 * 2. Add it to getAllFeatureFlags() below with description and category
 * 3. Use checkFeatureFlag() in your component
 * 4. Add to navigation/dashboard if needed
 * 
 * See docs/FEATURE_FLAGS_GUIDE.md for detailed instructions
 */

export const FEATURE_FLAGS = {
  // Student Portal Features
  STUDENT_COURSES: "student_courses",
  STUDENT_PROGRESS: "student_progress",
  STUDENT_SUBMISSIONS: "student_submissions",
  STUDENT_CERTIFICATES: "student_certificates",
  STUDENT_INTERNSHIPS: "micro_internships", // Also: "internships", "micro_internship"
  STUDENT_CLIENT_LAB: "student_client_lab",
  STUDENT_WORKSHOPS: "student_workshops",
  STUDENT_REFERRALS: "student_referrals",

  // SuperAdmin Portal Features
  SUPERADMIN_CONTENT: "superadmin_content",
  SUPERADMIN_ANALYTICS: "superadmin_analytics",
  SUPERADMIN_LEADS: "superadmin_leads",
  SUPERADMIN_WORKSHOPS: "superadmin_workshops",
  SUPERADMIN_CERTIFICATES: "superadmin_certificates",
  SUPERADMIN_INTERNSHIPS: "superadmin_internships",
  SUPERADMIN_CLIENT_LAB: "superadmin_client_lab",
  SUPERADMIN_FEATURE_FLAGS: "superadmin_feature_flags", // Always enabled for SuperAdmin

  // Mentor Portal Features
  MENTOR_SUBMISSIONS: "mentor_submissions",
  MENTOR_CLIENT_LAB: "mentor_client_lab",
  MENTOR_INTERNSHIPS: "mentor_internships",

  // TenantAdmin Portal Features
  TENANT_ADMIN_SETTINGS: "tenant_admin_settings",
  TENANT_ADMIN_USERS: "tenant_admin_users",
};

/**
 * Helper function to check if a feature is enabled
 * Supports multiple flag keys for backward compatibility
 * 
 * IMPORTANT: Fail-open approach - shows feature by default unless explicitly disabled
 * 
 * Logic:
 * - If no flags provided → Show feature (default)
 * - If flag doesn't exist → Show feature (default)
 * - If flag is enabled (true) → Show feature
 * - If flag is disabled (false) → Hide feature
 */
export function checkFeatureFlag(isEnabled, ...flagKeys) {
  // If no flags provided, default to enabled (fail-open)
  if (flagKeys.length === 0) return true;
  
  // Check all provided flag keys
  let foundAnyEnabled = false;
  let foundAnyDisabled = false;
  let foundAnyFlag = false;
  
  for (const key of flagKeys) {
    const flagValue = isEnabled(key);
    
    // If flag doesn't exist (undefined), continue checking other flags
    if (flagValue === undefined) {
      continue;
    }
    
    // Flag exists - mark that we found at least one flag
    foundAnyFlag = true;
    
    // If flag is enabled (true), mark it
    if (flagValue === true) {
      foundAnyEnabled = true;
    }
    
    // If flag is explicitly disabled (false), mark it
    if (flagValue === false) {
      foundAnyDisabled = true;
    }
  }
  
  // If we found at least one enabled flag, show the feature
  if (foundAnyEnabled) {
    return true;
  }
  
  // If we found flags and ALL were disabled, hide the feature
  if (foundAnyFlag && foundAnyDisabled && !foundAnyEnabled) {
    return false;
  }
  
  // Default: Show feature (fail-open)
  // This covers:
  // - No flags found (undefined) - show by default
  // - Flags not loaded yet - show by default
  // - Any other edge case - show by default
  return true;
}

/**
 * Get all feature flags with descriptions for SuperAdmin
 * 
 * IMPORTANT: When adding a new feature flag:
 * 1. Add it to FEATURE_FLAGS object above
 * 2. Add it here with:
 *    - key: The flag key from FEATURE_FLAGS
 *    - description: Clear description of what the feature does (include portal name)
 *    - category: One of "Student Portal", "SuperAdmin Portal", "Mentor Portal", "TenantAdmin Portal"
 * 
 * This list is used by the Feature Flags page to show all available flags.
 */
export function getAllFeatureFlags() {
  return [
    // Student Portal
    { key: FEATURE_FLAGS.STUDENT_COURSES, description: "Student: Browse and access courses", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_PROGRESS, description: "Student: View learning progress and statistics", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_SUBMISSIONS, description: "Student: View submissions and mentor feedback", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_CERTIFICATES, description: "Student: View and verify certificates", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_INTERNSHIPS, description: "Student: Browse and apply to micro-internships", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_CLIENT_LAB, description: "Student: Access client lab projects", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_WORKSHOPS, description: "Student: Register for workshops", category: "Student Portal" },
    { key: FEATURE_FLAGS.STUDENT_REFERRALS, description: "Student: Referral program and rewards", category: "Student Portal" },

    // SuperAdmin Portal
    { key: FEATURE_FLAGS.SUPERADMIN_CONTENT, description: "SuperAdmin: Content management and course builder", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_ANALYTICS, description: "SuperAdmin: Platform analytics and statistics", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_LEADS, description: "SuperAdmin: Lead management", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_WORKSHOPS, description: "SuperAdmin: Workshop management", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_CERTIFICATES, description: "SuperAdmin: Certificate issuance", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_INTERNSHIPS, description: "SuperAdmin: Micro-internship management", category: "SuperAdmin Portal" },
    { key: FEATURE_FLAGS.SUPERADMIN_CLIENT_LAB, description: "SuperAdmin: Client lab project management", category: "SuperAdmin Portal" },

    // Mentor Portal
    { key: FEATURE_FLAGS.MENTOR_SUBMISSIONS, description: "Mentor: Review student submissions", category: "Mentor Portal" },
    { key: FEATURE_FLAGS.MENTOR_CLIENT_LAB, description: "Mentor: Review client lab project tasks", category: "Mentor Portal" },
    { key: FEATURE_FLAGS.MENTOR_INTERNSHIPS, description: "Mentor: Review internship deliverables", category: "Mentor Portal" },

    // TenantAdmin Portal
    { key: FEATURE_FLAGS.TENANT_ADMIN_SETTINGS, description: "TenantAdmin: Tenant settings and configuration", category: "TenantAdmin Portal" },
    { key: FEATURE_FLAGS.TENANT_ADMIN_USERS, description: "TenantAdmin: User management and permissions", category: "TenantAdmin Portal" },
  ];
}

