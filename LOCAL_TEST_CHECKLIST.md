# Local Testing Checklist - Video Player

## 🚀 Server Status

**Frontend Dev Server:** Starting...
- **URL:** http://localhost:5173 (or check terminal for exact port)
- **Status:** Check terminal output

**Backend API:**
- **Production:** https://api.expograph.in (CORS updated - needs deployment)
- **Local:** http://localhost:3000 (if running locally)

---

## ✅ Step-by-Step Testing

### 1. Open Browser
- Go to: **http://localhost:5173**
- (If port is different, check terminal output)

### 2. Check Console for Errors
- Press **F12** to open DevTools
- Go to **Console** tab
- Should see NO red errors
- (Yellow warnings are OK)

### 3. Test Login
- Try to login with student credentials
- If login fails, check:
  - **Network tab** → Look for failed requests
  - **Console tab** → Look for CORS errors
  - **Backend URL** → Should be `https://api.expograph.in` or local

### 4. Navigate to Lesson with Video
- After login: **LMS** → **Student** → **Courses**
- Select a course
- Select a lesson that has video attached

### 5. Test Video Player

**Check if video player appears:**
- ✅ Should see "Video Lesson" section
- ✅ 16:9 video player with Cloudflare Stream controls
- ✅ If no video: Should NOT show player (or show "Video format not supported")

**Test video playback:**
- ✅ Click play button
- ✅ Video should start playing
- ✅ Controls should work (pause, volume, fullscreen)

**Test resume functionality:**
- ✅ Watch video for 30-60 seconds
- ✅ Note the time position
- ✅ Refresh page (F5)
- ✅ Video should resume from where you left off
- ✅ Should see message: "Resuming from X:XX"

**Test progress tracking:**
- ✅ Open **Network tab** (F12 → Network)
- ✅ Filter by "progress"
- ✅ While video is playing, should see POST requests to:
  - `/api/v1/lms/lessons/:id/progress`
- ✅ Requests should happen every ~10 seconds

### 6. Check LocalStorage
- DevTools → **Application** tab → **Local Storage**
- Should see keys like: `expograph_progress_<lessonId>`
- Contains: `{"lastPositionSeconds": X, "updatedAt": timestamp}`

---

## 🔍 Troubleshooting

### Issue: Can't Login

**Check:**
1. Backend is running? (Check `api.expograph.in` or local backend)
2. CORS error in console?
3. Network tab shows failed requests?

**Fix:**
- If using production backend: CORS is updated but needs deployment
- If using local backend: Make sure it's running on port 3000

### Issue: Video Player Not Showing

**Check:**
1. Lesson has `video_provider = "cloudflare_stream"`?
2. Lesson has `video_id` set?
3. Lesson is published?
4. Console errors?

**Fix:**
- Admin needs to attach video to lesson
- Or check database directly

### Issue: Resume Not Working

**Check:**
1. Network tab → `/api/v1/lms/lessons/:id/start` returns `last_position_seconds`?
2. LocalStorage has progress data?
3. Console errors?

**Fix:**
- Check backend logs
- Verify progress endpoint is working

---

## 📋 Quick Test Results

Fill this out as you test:

- [ ] Dev server running (http://localhost:5173)
- [ ] No console errors
- [ ] Login works
- [ ] Can navigate to lesson page
- [ ] Video player appears (if lesson has video)
- [ ] Video plays
- [ ] Resume works (watch → refresh → resume)
- [ ] Progress tracking works (Network tab shows updates)
- [ ] LocalStorage saves progress

---

## 🎯 Expected Behavior

**When everything works:**
- ✅ Video player appears and plays smoothly
- ✅ Refreshing page resumes from last position
- ✅ Network tab shows progress updates every 10 seconds
- ✅ No console errors
- ✅ LocalStorage has progress data

---

**Ready to test? Open http://localhost:5173 in your browser!**

