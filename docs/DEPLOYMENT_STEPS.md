# How to See Your Changes Live

## 🚀 Quick Steps Overview

1. **Test Locally** (recommended first)
2. **Commit & Push to GitHub**
3. **Vercel Auto-Deploys** (if connected)
4. **Verify on Live Site**

---

## Step 1: Test Locally First

### 1.1 Navigate to Web App Directory
```bash
cd apps/web
```

### 1.2 Check Environment Variable
Make sure you have a `.env` file (or check Vercel settings):
```bash
# Create .env file if it doesn't exist
echo "VITE_API_URL=https://api.expograph.in" > .env
```

**OR** for local backend testing:
```bash
echo "VITE_API_URL=http://localhost:3000" > .env
```

### 1.3 Install Dependencies (if needed)
```bash
npm install
```

### 1.4 Start Development Server
```bash
npm run dev
```

This will start Vite dev server (usually at `http://localhost:5173`)

### 1.5 Test the Video Player
1. Open browser: `http://localhost:5173`
2. Login as a student
3. Navigate to a lesson that has a video attached
4. Check:
   - ✅ Video player appears
   - ✅ Video plays
   - ✅ Resume works (watch a bit, refresh, should resume)
   - ✅ Progress tracking (check browser console for updates)

---

## Step 2: Commit & Push to GitHub

### 2.1 Check What Changed
```bash
# From project root
git status
```

You should see:
- `apps/web/src/pages/lms/student/StudentLesson.jsx` (modified)

### 2.2 Stage Changes
```bash
git add apps/web/src/pages/lms/student/StudentLesson.jsx
```

### 2.3 Commit
```bash
git commit -m "feat: Add video player with resume functionality to StudentLesson"
```

### 2.4 Push to GitHub
```bash
git push origin main
# or your branch name
```

---

## Step 3: Vercel Auto-Deployment

### 3.1 Vercel Should Auto-Deploy
If your GitHub repo is connected to Vercel:
- ✅ Vercel detects the push
- ✅ Builds automatically
- ✅ Deploys to production

### 3.2 Check Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Find your `expograph` project
3. Check "Deployments" tab
4. Wait for build to complete (usually 1-2 minutes)

### 3.3 If Not Auto-Deployed
**Manual Deploy:**
1. Go to Vercel dashboard
2. Click "Deploy" → "Deploy from Git"
3. Select your branch (usually `main`)
4. Click "Deploy"

---

## Step 4: Verify on Live Site

### 4.1 Visit Your Site
- Production: https://expograph.in
- Or: https://www.expograph.in

### 4.2 Test Video Player
1. **Login** as a student user
2. **Navigate** to a course → module → lesson
3. **Check** if lesson has video:
   - Admin should have set `video_provider = "cloudflare_stream"`
   - Admin should have set `video_id = "<cloudflare-uid>"`
4. **Verify:**
   - ✅ Video player appears (16:9 aspect ratio)
   - ✅ Video plays when clicked
   - ✅ Resume works (watch 30 seconds, refresh page, should resume)
   - ✅ Progress updates (check Network tab in DevTools for `/progress` calls)

### 4.3 Check Browser Console
Open DevTools (F12) → Console tab:
- Should see no errors
- Progress updates logged (if any warnings, that's OK)

### 4.4 Check Network Tab
Open DevTools (F12) → Network tab:
- Look for calls to `/api/v1/lms/lessons/:id/progress`
- Should see POST requests every ~10 seconds when video is playing

---

## 🔧 Troubleshooting

### Issue: Video Player Not Showing

**Check:**
1. Lesson has `video_provider = "cloudflare_stream"`?
2. Lesson has `video_id` set?
3. Lesson is published?
4. Browser console for errors?

**Fix:**
- Admin needs to attach video to lesson via admin panel
- Or manually update in database

### Issue: Resume Not Working

**Check:**
1. Backend progress endpoint working? (`/api/v1/lms/lessons/:id/start`)
2. localStorage has progress? (DevTools → Application → Local Storage)
3. Browser console for errors?

**Fix:**
- Check backend logs (Render dashboard)
- Verify `startLesson` returns `last_position_seconds`

### Issue: Build Fails on Vercel

**Check:**
1. Vercel build logs
2. Missing dependencies?
3. Environment variables set?

**Fix:**
- Check `package.json` has all deps
- Verify `VITE_API_URL` is set in Vercel environment variables

### Issue: CORS Errors

**Check:**
- Backend CORS allowlist includes your domain?
- `https://expograph.in` and `https://www.expograph.in` in allowlist?

**Fix:**
- Update backend CORS config in `apps/api/src/server/createApp.js`

---

## 📋 Pre-Deployment Checklist

Before pushing to production:

- [ ] Tested locally (`npm run dev`)
- [ ] Video player appears for lessons with video
- [ ] Resume works (watch → refresh → resume)
- [ ] Progress tracking works (check Network tab)
- [ ] No console errors
- [ ] Code committed to git
- [ ] Vercel environment variables set (`VITE_API_URL`)

---

## 🎯 Quick Test Commands

```bash
# 1. Test locally
cd apps/web
npm run dev

# 2. Build test (check for errors)
npm run build

# 3. Preview production build
npm run preview

# 4. Check git status
git status

# 5. Push to GitHub
git add .
git commit -m "feat: Add video player"
git push
```

---

## 🚨 Important Notes

1. **Backend Must Be Running**: Make sure `api.expograph.in` is accessible
2. **Video Must Be Attached**: Admin needs to set `video_id` in lesson
3. **Lesson Must Be Published**: Only published lessons show to students
4. **Cloudflare Stream**: Video must be uploaded to Cloudflare Stream first

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Video player appears on lesson page
- ✅ Video plays smoothly
- ✅ Refreshing page resumes from last position
- ✅ Network tab shows progress updates every 10 seconds
- ✅ No console errors

---

**Ready to deploy? Start with Step 1 (local testing) first!**

