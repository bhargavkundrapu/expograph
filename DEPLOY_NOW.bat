@echo off
echo ========================================
echo Deploying Video Player Fix
echo ========================================
echo.

cd /d "C:\Users\USER\expograph-main"

echo [1/4] Checking git status...
git status
echo.

echo [2/4] Staging changes...
git add apps/api/src/modules/media/media.repo.js
git add apps/api/src/server/createApp.js
git add apps/web/src/pages/lms/student/StudentLesson.jsx
git add apps/web/vite.config.js
git add apps/web/src/services/api.js
echo.

echo [3/4] Committing changes...
git commit -m "fix: Support video_id directly on lessons table + CORS localhost:5173 + video player with signed tokens"
echo.

echo [4/4] Pushing to GitHub (will trigger auto-deploy)...
git push origin main
echo.

echo ========================================
echo Deployment initiated!
echo ========================================
echo.
echo Next steps:
echo 1. Wait 1-2 minutes for Render to deploy backend
echo 2. Wait 1-2 minutes for Vercel to deploy frontend
echo 3. Refresh your lesson page
echo 4. Video should now load!
echo.
pause

