# Feature Flags Guide

## Overview
All features across all portals (Student, SuperAdmin, Mentor, TenantAdmin) must be controlled through feature flags. This allows SuperAdmin to enable/disable features without code changes.

## Adding a New Feature with Feature Flags

### Step 1: Add Feature Flag Key
Edit `apps/web/src/utils/featureFlags.js`:

```javascript
export const FEATURE_FLAGS = {
  // ... existing flags ...
  
  // Add your new flag
  NEW_FEATURE_NAME: "new_feature_name",
};
```

### Step 2: Add to Feature Flags List
In the same file, add to `getAllFeatureFlags()`:

```javascript
export function getAllFeatureFlags() {
  return [
    // ... existing flags ...
    
    // Add your new flag with description
    { 
      key: FEATURE_FLAGS.NEW_FEATURE_NAME, 
      description: "Portal: Description of what this feature does", 
      category: "Portal Name Portal" 
    },
  ];
}
```

### Step 3: Use Feature Flag in Component
In your component/page:

```javascript
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";

export default function YourComponent() {
  const { isEnabled } = useFeatureFlags();
  
  // Check if feature is enabled
  if (!checkFeatureFlag(isEnabled, FEATURE_FLAGS.NEW_FEATURE_NAME)) {
    return <Navigate to="/lms/student" replace />; // or show disabled message
  }
  
  // Your component code...
}
```

### Step 4: Add to Navigation (if needed)
In `apps/web/src/layouts/PortalLayout.jsx`:

```javascript
// For Student Portal
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  studentNav.push({ to: `${base}/new-feature`, label: "New Feature", flag: FEATURE_FLAGS.STUDENT_NEW_FEATURE });
}

// For SuperAdmin Portal
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.SUPERADMIN_NEW_FEATURE)) {
  items.push({ to: `${base}/new-feature`, label: "New Feature", flag: FEATURE_FLAGS.SUPERADMIN_NEW_FEATURE });
}
```

### Step 5: Add to Dashboard/Home (if needed)
In `apps/web/src/pages/lms/student/StudentHome.jsx` or `SuperAdminHome.jsx`:

```javascript
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  quickLinks.push({
    icon: FaIcon,
    title: "New Feature",
    desc: "Description",
    to: "/lms/student/new-feature",
    color: "from-color-400 to-color-500",
  });
}
```

## Feature Flag Naming Convention

- **Format**: `{portal}_{feature_name}` (snake_case)
- **Examples**:
  - `student_courses` - Student portal courses feature
  - `superadmin_content` - SuperAdmin portal content management
  - `mentor_submissions` - Mentor portal submissions
  - `tenant_admin_settings` - TenantAdmin portal settings

## Category Names

- `"Student Portal"` - For all student-facing features
- `"SuperAdmin Portal"` - For all SuperAdmin features
- `"Mentor Portal"` - For all mentor features
- `"TenantAdmin Portal"` - For all tenant admin features

## Best Practices

1. **Always use feature flags** - Every new feature must have a feature flag
2. **Fail-open approach** - Features show by default unless explicitly disabled
3. **Clear descriptions** - Write descriptive flag descriptions for SuperAdmin
4. **Test both states** - Test feature with flag enabled and disabled
5. **Update documentation** - Keep this guide updated with new patterns

## Quick Checklist

When adding a new feature:
- [ ] Add flag key to `FEATURE_FLAGS` object
- [ ] Add flag to `getAllFeatureFlags()` with description and category
- [ ] Use `checkFeatureFlag()` in component
- [ ] Add to navigation if needed
- [ ] Add to dashboard/home if needed
- [ ] Test with flag enabled/disabled
- [ ] Create flag in database via Feature Flags page

## Example: Adding a New Student Feature

```javascript
// 1. Add to FEATURE_FLAGS
export const FEATURE_FLAGS = {
  // ... existing ...
  STUDENT_NEW_FEATURE: "student_new_feature",
};

// 2. Add to getAllFeatureFlags()
{ 
  key: FEATURE_FLAGS.STUDENT_NEW_FEATURE, 
  description: "Student: Access to new feature", 
  category: "Student Portal" 
}

// 3. Use in component
const { isEnabled } = useFeatureFlags();
if (!checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  return <Navigate to="/lms/student" replace />;
}

// 4. Add to navigation
if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_NEW_FEATURE)) {
  studentNav.push({ to: `${base}/new-feature`, label: "New Feature" });
}
```

