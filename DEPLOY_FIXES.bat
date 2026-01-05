@echo off
echo ========================================
echo  Deploy Import Path Fixes
echo ========================================
echo.
echo This will commit and push the import fixes
echo to trigger Vercel auto-deployment.
echo.
pause

echo.
echo Staging changes...
git add apps/web/src/pages/auth/LoginPage.jsx
git add apps/web/src/pages/academy/AcademyPage.jsx
git add apps/web/src/pages/solutions/SolutionsPage.jsx
git add apps/web/src/layouts/AppLayout.jsx
git add apps/web/src/pages/lms/student/StudentHome.jsx
git add apps/web/src/pages/lms/student/StudentCourses.jsx
git add apps/web/src/pages/lms/student/StudentCourseTree.jsx
git add apps/web/src/pages/lms/student/StudentLesson.jsx
git add apps/web/src/pages/lms/student/StudentSubmissions.jsx
git add apps/web/src/pages/lms/superadmin/SuperAdminHome.jsx
git add apps/web/src/pages/lms/superadmin/SuperAdminContent.jsx
git add apps/web/src/pages/lms/admin/TenantAdminHome.jsx
git add apps/web/src/pages/lms/mentor/MentorHome.jsx

echo.
echo Committing changes...
git commit -m "fix: Update all imports to use Components (uppercase) for case-sensitive systems - Fixes Vercel deployment errors"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  Deployment Triggered!
echo ========================================
echo.
echo Monitor deployment at:
echo   https://vercel.com/dashboard
echo.
echo Expected deployment time: 2-5 minutes
echo.
pause

