# Testing Guide - Video Player Feature

## ✅ Build Status: SUCCESS
The code compiles without errors!

---

## 🧪 STEP 1: Test Locally

### 1.1 Start Development Server

Open a terminal and run:

```powershell
cd C:\Users\USER\expograph-main\apps\web
npm run dev
```

**Expected Output:**
```
  VITE v7.2.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 1.2 Open Browser

1. Open: **http://localhost:5173**
2. Login as a **Student** user
3. Navigate to: **Courses** → Select a course → Select a lesson

### 1.3 Test Video Player

**Prerequisites:**
- Lesson must have `video_provider = "cloudflare_stream"`
- Lesson must have `video_id` set (Cloudflare Stream UID)
- Lesson must be **published**

**What to Check:**

1. **Video Player Appears:**
   - ✅ Should see "Video Lesson" section
   - ✅ 16:9 aspect ratio video player
   - ✅ Cloudflare Stream player controls visible

2. **Video Plays:**
   - ✅ Click play button
   - ✅ Video starts playing
   - ✅ Controls work (pause, volume, fullscreen)

3. **Resume Functionality:**
   - ✅ Watch video for 30-60 seconds
   - ✅ Refresh the page (F5)
   - ✅ Video should resume from where you left off
   - ✅ Should see message: "Resuming from X:XX"

4. **Progress Tracking:**
   - ✅ Open DevTools (F12) → **Network** tab
   - ✅ Filter by "progress"
   - ✅ Should see POST requests to `/api/v1/lms/lessons/:id/progress`
   - ✅ Requests should happen every ~10 seconds while playing

5. **Console Check:**
   - ✅ Open DevTools (F12) → **Console** tab
   - ✅ Should see NO errors (warnings are OK)

### 1.4 Test Edge Cases

1. **No Video:**
   - Lesson without `video_id` → Should NOT show video player
   - Lesson with different provider → Should show "Video format not supported"

2. **LocalStorage:**
   - DevTools → **Application** → **Local Storage**
   - Should see keys like: `expograph_progress_<lessonId>`
   - Contains: `{"lastPositionSeconds": X, "updatedAt": timestamp}`

---

## 🚀 STEP 2: Deploy to Production

### 2.1 Check Git Status

```powershell
cd C:\Users\USER\expograph-main
git status
```

**Expected:** Should see `StudentLesson.jsx` as modified

### 2.2 Stage Changes

```powershell
git add apps/web/src/pages/lms/student/StudentLesson.jsx
```

### 2.3 Commit

```powershell
git commit -m "feat: Add video player with resume functionality to StudentLesson"
```

### 2.4 Push to GitHub

```powershell
git push origin main
```

(Replace `main` with your branch name if different)

### 2.5 Wait for Vercel Deployment

1. Go to: **https://vercel.com/dashboard**
2. Find your **expograph** project
3. Check **Deployments** tab
4. Wait for build to complete (usually 1-2 minutes)
5. Status should show: **✅ Ready**

---

## 🌐 STEP 3: Test on Production URL

### 3.1 Visit Production Site

- **URL:** https://expograph.in
- Or: https://www.expograph.in

### 3.2 Login & Navigate

1. **Login** as a student
2. Go to: **LMS** → **Student** → **Courses**
3. Select a course → Select a lesson with video

### 3.3 Verify Video Player

**Same checks as local testing:**

1. ✅ Video player appears
2. ✅ Video plays
3. ✅ Resume works (watch → refresh → resume)
4. ✅ Progress tracking works (Network tab)
5. ✅ No console errors

### 3.4 Production-Specific Checks

1. **API Connection:**
   - Verify `VITE_API_URL` is set in Vercel
   - Should point to: `https://api.expograph.in`

2. **CORS:**
   - If you see CORS errors, check backend CORS allowlist
   - Should include: `https://expograph.in` and `https://www.expograph.in`

3. **Cloudflare Stream:**
   - Video should load from Cloudflare CDN
   - Check Network tab for `*.cloudflarestream.com` requests

---

## 🔍 Troubleshooting

### Issue: Video Player Not Showing

**Check:**
1. Lesson has `video_provider = "cloudflare_stream"`?
2. Lesson has `video_id` set?
3. Lesson is published?
4. Browser console for errors?

**Solution:**
- Admin needs to attach video via admin panel
- Or update database directly

### Issue: Resume Not Working

**Check:**
1. Backend endpoint: `/api/v1/lms/lessons/:id/start` returns `last_position_seconds`?
2. localStorage has progress? (DevTools → Application)
3. Browser console for errors?

**Solution:**
- Check backend logs (Render dashboard)
- Verify `startLesson` returns progress data

### Issue: Build Fails on Vercel

**Check:**
1. Vercel build logs
2. Missing dependencies?
3. Environment variables?

**Solution:**
- Verify `VITE_API_URL` in Vercel settings
- Check build logs for specific errors

### Issue: CORS Errors

**Check:**
- Backend CORS allowlist includes your domain?

**Solution:**
- Update `apps/api/src/server/createApp.js` CORS config

---

## 📋 Quick Checklist

### Local Testing:
- [ ] `npm run dev` starts without errors
- [ ] Video player appears on lesson page
- [ ] Video plays correctly
- [ ] Resume works (watch → refresh → resume)
- [ ] Progress tracking works (Network tab shows updates)
- [ ] No console errors

### Production Deployment:
- [ ] Code committed to git
- [ ] Pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Production site loads correctly
- [ ] Video player works on production
- [ ] Resume works on production

---

## 🎯 Success Criteria

You'll know it's working when:
- ✅ Video player appears and plays smoothly
- ✅ Refreshing page resumes from last position
- ✅ Network tab shows progress updates every 10 seconds
- ✅ No console errors
- ✅ Works on both local and production

---

**Ready to test? Start with Step 1 (local testing)!**

