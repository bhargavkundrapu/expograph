# Install Git - Quick Steps

## Method 1: Download & Install (Easiest)

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Click "Download for Windows"
   - Run the installer

2. **During Installation:**
   - ✅ Check "Add Git to PATH" (IMPORTANT!)
   - ✅ Use default options for everything else
   - Click "Install"

3. **After Installation:**
   - Close and reopen PowerShell
   - Test: `git --version`

4. **Configure (First Time):**
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

## Method 2: Use VS Code (No Installation Needed!)

**If you have VS Code installed:**

1. Open VS Code
2. Open your project: `File` → `Open Folder` → Select `C:\Users\USER\expograph-main`
3. Press `Ctrl+Shift+G` (Source Control panel)
4. You'll see all changed files
5. Click `+` next to each file to stage them
6. Enter commit message: `fix: Support video_id directly on lessons table + CORS localhost:5173 + video player with signed tokens`
7. Click checkmark (✓) to commit
8. Click `...` menu → `Push` → `Push to origin/main`

**VS Code has Git built-in - no installation needed!**

---

## After Git is Working

Run these commands:
```powershell
cd C:\Users\USER\expograph-main

git add apps/api/src/modules/media/media.repo.js
git add apps/api/src/server/createApp.js
git add apps/web/src/pages/lms/student/StudentLesson.jsx
git add apps/web/vite.config.js
git add apps/web/src/services/api.js

git commit -m "fix: Support video_id directly on lessons table + CORS localhost:5173 + video player with signed tokens"

git push origin main
```

---

**Which do you prefer: Install Git or use VS Code?**

