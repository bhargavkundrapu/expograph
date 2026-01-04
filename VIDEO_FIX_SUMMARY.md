# Video Player Fix - Summary & Deployment Steps

## 🔍 Root Cause Analysis

**Problem:** "Video not attached to lesson" (409 Conflict)

**Root Cause:**
1. Backend code (`apps/api/src/modules/media/media.repo.js`) only checked `video_assets` table
2. Lesson has `video_id` directly on `lessons` table (not in `video_assets`)
3. Production backend hasn't been updated with the fix

**Database Schema:**
- `lessons` table has: `video_id`, `video_provider`, `video_asset_id`
- `video_assets` table has: `uid`, `status`
- Old code: Only checked `video_assets` via `video_asset_id`
- New code: Checks both `video_assets.uid` AND `lessons.video_id` (fallback)

---

## ✅ What I Fixed

### 1. Backend Fix (`apps/api/src/modules/media/media.repo.js`)

**Changed:**
- Query now uses `COALESCE(v.uid, l.video_id)` to check both sources
- Handles cases where `video_provider` is NULL or 'cloudflare_stream'
- Returns `uid` from either `video_assets` table OR `lessons.video_id` directly

**File:** `apps/api/src/modules/media/media.repo.js`
**Lines:** 15-48

### 2. Frontend Error Handling (`apps/web/src/pages/lms/student/StudentLesson.jsx`)

**Changed:**
- Better error messages
- Doesn't break page if token fetch fails
- Shows helpful error message to user

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend Fix

**You MUST deploy the backend fix to production for it to work!**

```powershell
# 1. Commit backend changes
cd C:\Users\USER\expograph-main
git add apps/api/src/modules/media/media.repo.js
git commit -m "fix: Support video_id directly on lessons table (fallback to video_assets)"
git push

# 2. Wait for Render to auto-deploy (1-2 minutes)
# OR manually trigger deployment in Render dashboard
```

**After deployment:**
- Backend will check both `video_assets` table AND `lessons.video_id`
- Should find your video with UID: `307c46060178bcc34af3500c286de5cf`

---

### Step 2: Test After Deployment

1. **Wait 1-2 minutes** for Render to deploy
2. **Refresh** the lesson page
3. **Check console** - should NOT see "Video not attached" error
4. **Video should load** with signed token

---

## 🔧 Alternative: Quick Fix (If You Can't Deploy Now)

If you need it working immediately, you can create a `video_assets` entry:

```sql
-- Connect to your Neon database
-- Replace <tenant_id> and <lesson_id> with actual values

-- 1. Insert video_assets entry
INSERT INTO video_assets (tenant_id, provider, uid, status)
VALUES (
  '<your-tenant-id>',
  'cloudflare_stream',
  '307c46060178bcc34af3500c286de5cf',
  'ready'
)
RETURNING id;

-- 2. Link lesson to video_asset
UPDATE lessons
SET video_asset_id = '<video_asset_id_from_step_1>'
WHERE id = '<your-lesson-id>'
  AND tenant_id = '<your-tenant-id>';
```

**But the proper fix is to deploy the backend code change!**

---

## 📋 Files Changed

### Backend:
- ✅ `apps/api/src/modules/media/media.repo.js` - Updated query to check both sources

### Frontend:
- ✅ `apps/web/src/pages/lms/student/StudentLesson.jsx` - Better error handling

### Other:
- ✅ `apps/api/src/server/createApp.js` - Added localhost:5173 to CORS (already done)

---

## 🎯 Expected Result After Deployment

1. ✅ Backend finds video using `lessons.video_id` directly
2. ✅ Returns signed token from Cloudflare
3. ✅ Frontend loads video in iframe
4. ✅ Video plays without 401 errors

---

## ⚠️ Important Notes

1. **Backend MUST be deployed** - The fix won't work until production backend is updated
2. **Video must be published** - Lesson status must be 'published'
3. **User must have membership** - Backend checks `isMemberActive()`
4. **CORS is already fixed** - localhost:5173 is in allowlist (needs deployment too)

---

## 🐛 If Still Not Working After Deployment

**Check:**
1. Backend logs (Render dashboard) - Look for errors
2. Database - Verify `lessons.video_id` is set correctly
3. Membership - User must have active membership
4. Lesson status - Must be 'published'

**Debug Query:**
```sql
SELECT id, video_id, video_provider, video_asset_id, status
FROM lessons
WHERE id = '<lesson-id>' AND tenant_id = '<tenant-id>';
```

---

**Ready to deploy? Run the git commands above!**

