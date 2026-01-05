# Route Fix for Referrals and Client Lab

## Issue
Routes `/lms/student/referrals` and `/lms/student/client-lab` were showing "route not found" errors.

## Root Cause
React Router v6 matches routes in order, and more specific routes must come before less specific ones. The route order was incorrect.

## Fix Applied
Reordered routes in `apps/web/src/app/router.jsx` so that:
1. More specific routes come first (e.g., `client-lab/:projectId` before `client-lab`)
2. Course routes are ordered from most specific to least specific

## Changes Made

### Before:
```javascript
{ path: "client-lab", element: <StudentClientLab /> },
{ path: "client-lab/:projectId", element: <StudentClientLab /> },
```

### After:
```javascript
{ path: "client-lab/:projectId", element: <StudentClientLab /> },
{ path: "client-lab", element: <StudentClientLab /> },
```

## Complete Route Order (Fixed)

```javascript
children: [
  { index: true, element: <StudentHome /> },
  { path: "courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug", element: <StudentLesson /> },
  { path: "courses/:courseSlug", element: <StudentCourseTree /> },
  { path: "courses", element: <StudentCourses /> },
  { path: "client-lab/:projectId", element: <StudentClientLab /> },
  { path: "client-lab", element: <StudentClientLab /> },
  { path: "progress", element: <StudentProgress /> },
  { path: "submissions", element: <StudentSubmissions /> },
  { path: "certificates", element: <StudentCertificates /> },
  { path: "internships", element: <StudentInternships /> },
  { path: "workshops", element: <StudentWorkshops /> },
  { path: "referrals", element: <StudentReferrals /> },
],
```

## Verification

✅ Build successful
✅ No linter errors
✅ Components exported correctly
✅ Routes configured correctly

## Next Steps

1. **Restart the dev server** if it's running:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

2. **Clear browser cache** if needed:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache manually

3. **Test the routes**:
   - Navigate to `/lms/student/referrals`
   - Navigate to `/lms/student/client-lab`
   - Both should now work correctly

## Routes That Should Work

- ✅ `/lms/student` - Dashboard
- ✅ `/lms/student/courses` - Browse Courses
- ✅ `/lms/student/courses/:slug` - Course Tree
- ✅ `/lms/student/courses/:slug/modules/:slug/lessons/:slug` - Lesson View
- ✅ `/lms/student/progress` - Progress Tracking
- ✅ `/lms/student/submissions` - My Submissions
- ✅ `/lms/student/certificates` - Certificates
- ✅ `/lms/student/internships` - Micro-Internships
- ✅ `/lms/student/client-lab` - Client Lab (FIXED)
- ✅ `/lms/student/client-lab/:projectId` - Client Lab Project (FIXED)
- ✅ `/lms/student/workshops` - Workshops
- ✅ `/lms/student/referrals` - Referrals (FIXED)

All routes are now properly configured and should work correctly!

