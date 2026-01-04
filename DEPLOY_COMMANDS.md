# Deploy Commands - Run These Manually

Since git is not in PowerShell PATH, run these commands in **Git Bash** or **VS Code Terminal**:

## Quick Deploy (Copy & Paste)

```bash
cd C:/Users/USER/expograph-main

# Stage changes
git add apps/api/src/modules/media/media.repo.js
git add apps/api/src/server/createApp.js
git add apps/web/src/pages/lms/student/StudentLesson.jsx
git add apps/web/vite.config.js
git add apps/web/src/services/api.js

# Commit
git commit -m "fix: Support video_id directly on lessons table + CORS localhost:5173 + video player with signed tokens"

# Push (triggers auto-deploy)
git push origin main
```

## Or Use the Scripts

**Windows:**
- Double-click `DEPLOY_NOW.bat`

**Git Bash / Linux / Mac:**
```bash
chmod +x DEPLOY_NOW.sh
./DEPLOY_NOW.sh
```

## After Deployment

1. **Wait 1-2 minutes** for Render to deploy backend
2. **Wait 1-2 minutes** for Vercel to deploy frontend  
3. **Refresh** your lesson page
4. **Video should load!** ✅

---

**Files being deployed:**
- ✅ Backend: `apps/api/src/modules/media/media.repo.js` (video lookup fix)
- ✅ Backend: `apps/api/src/server/createApp.js` (CORS fix)
- ✅ Frontend: `apps/web/src/pages/lms/student/StudentLesson.jsx` (video player)
- ✅ Frontend: `apps/web/vite.config.js` (env loading)
- ✅ Frontend: `apps/web/src/services/api.js` (debug log)

