# Video Player Testing Checklist

## ✅ Login: SUCCESS!

Now let's test the video player feature.

---

## 🎬 Step-by-Step Testing

### Step 1: Navigate to a Lesson with Video

1. After login, go to: **LMS** → **Student** → **Courses**
2. Select a **course**
3. Select a **lesson** that has a video attached

**Note:** The lesson must have:
- `video_provider = "cloudflare_stream"`
- `video_id` set (Cloudflare Stream UID)
- Status = **published**

---

### Step 2: Check if Video Player Appears

**What to look for:**
- ✅ Should see a section titled **"Video Lesson"**
- ✅ Should see a **16:9 aspect ratio video player**
- ✅ Should see **Cloudflare Stream player controls** (play, pause, volume, fullscreen)
- ✅ If lesson has no video: Should NOT show video player (or show "Video format not supported")

**If video player doesn't appear:**
- Check browser console (F12) for errors
- Verify lesson has `video_id` set in database
- Check if lesson is published

---

### Step 3: Test Video Playback

1. **Click the play button**
2. **Video should start playing**
3. **Test controls:**
   - ✅ Pause/Play works
   - ✅ Volume control works
   - ✅ Fullscreen works
   - ✅ Progress bar works

---

### Step 4: Test Resume Functionality ⭐ (Main Feature)

1. **Watch the video for 30-60 seconds**
   - Note the time position (e.g., "I watched until 45 seconds")

2. **Refresh the page** (Press F5 or click refresh)

3. **Expected Result:**
   - ✅ Video should **automatically resume** from where you left off
   - ✅ Should see a message: **"Resuming from 0:45"** (or similar)
   - ✅ Video player should load with `startTime` set to your last position

**If resume doesn't work:**
- Check browser console for errors
- Check Network tab → Look for `/api/v1/lms/lessons/:id/start` request
- Check if it returns `last_position_seconds`

---

### Step 5: Test Progress Tracking ⭐ (Main Feature)

1. **Open DevTools** (Press F12)
2. **Go to Network tab**
3. **Filter by "progress"** (type "progress" in the filter box)
4. **Play the video**
5. **Watch for API calls:**

**Expected:**
- ✅ Should see **POST requests** to: `/api/v1/lms/lessons/:id/progress`
- ✅ Requests should happen **every ~10 seconds** while video is playing
- ✅ Each request should have:
  - `watchSecondsDelta`: small number (0-10)
  - `lastPositionSeconds`: current video position

**Example Network Request:**
```
POST /api/v1/lms/lessons/123/progress
Body: {
  "watchSecondsDelta": 10,
  "lastPositionSeconds": 45
}
```

---

### Step 6: Check LocalStorage

1. **Open DevTools** (F12)
2. **Go to Application tab** (or Storage tab)
3. **Click on Local Storage** → `http://localhost:5173`
4. **Look for keys like:** `expograph_progress_<lessonId>`

**Expected:**
- ✅ Should see a key with lesson ID
- ✅ Value should be JSON like:
  ```json
  {
    "lastPositionSeconds": 45,
    "updatedAt": 1234567890
  }
  ```

---

## 🔍 What to Check in Console

**Open Console (F12 → Console tab):**

**Good signs:**
- ✅ No red errors
- ✅ Should see: `🔧 API Base URL: https://api.expograph.in`
- ✅ Yellow warnings are OK (not critical)

**Bad signs:**
- ❌ Red errors about video player
- ❌ CORS errors
- ❌ Network errors

---

## 📋 Quick Test Checklist

Fill this out as you test:

- [ ] Navigated to a lesson with video
- [ ] Video player appears
- [ ] Video plays correctly
- [ ] Controls work (play, pause, volume, fullscreen)
- [ ] Resume works (watch → refresh → resume)
- [ ] Progress tracking works (Network tab shows updates every 10s)
- [ ] LocalStorage saves progress
- [ ] No console errors

---

## 🎯 Success Criteria

**Everything works if:**
- ✅ Video player appears and plays smoothly
- ✅ Refreshing page resumes from last position
- ✅ Network tab shows progress updates every 10 seconds
- ✅ LocalStorage has progress data
- ✅ No console errors

---

## 🐛 Common Issues

### Issue: Video Player Not Showing

**Check:**
- Lesson has `video_id`?
- Lesson is published?
- Console errors?

**Fix:**
- Admin needs to attach video to lesson
- Or check database directly

### Issue: Resume Not Working

**Check:**
- Network tab → `/api/v1/lms/lessons/:id/start` returns `last_position_seconds`?
- LocalStorage has progress?
- Console errors?

**Fix:**
- Check backend logs
- Verify progress endpoint is working

### Issue: Progress Not Updating

**Check:**
- Network tab → Are POST requests happening?
- Console errors?
- Backend endpoint working?

**Fix:**
- Check backend logs
- Verify CORS is working
- Check rate limiting

---

**Ready to test? Navigate to a lesson with video!**

