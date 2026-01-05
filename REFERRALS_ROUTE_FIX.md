# Referrals Route Fix - Backend Deployment Required

## Issue
Frontend is calling `/api/v1/referrals/me/referral-code` but getting 404 errors.

## Root Cause
The backend route was registered at `/api/v1` instead of `/api/v1/referrals`, causing a path mismatch.

## Fix Applied (Backend)

**File:** `apps/api/src/server/createApp.js`

**Change:**
```javascript
// BEFORE:
app.use("/api/v1", referralsRoutes);

// AFTER:
app.use("/api/v1/referrals", referralsRoutes);
```

## Route Structure

**Backend Route Registration:**
- Mount point: `/api/v1/referrals`
- Route handler: `/me/referral-code` (in referrals.routes.js)
- **Full path:** `/api/v1/referrals/me/referral-code` ✅

**Frontend API Call:**
- Calling: `/api/v1/referrals/me/referral-code` ✅

**Status:** Frontend and backend now match!

## Deployment Required

The backend change needs to be deployed to production for the route to work.

### Steps to Deploy Backend:

1. **Commit the change:**
   ```bash
   git add apps/api/src/server/createApp.js
   git commit -m "Fix referrals route: mount at /api/v1/referrals"
   git push origin main
   ```

2. **Deploy to Render** (or your backend hosting):
   - The backend should auto-deploy from the main branch
   - Or manually trigger a deployment

3. **Verify deployment:**
   - Check backend logs to ensure the route is registered
   - Test the endpoint: `GET https://api.expograph.in/api/v1/referrals/me/referral-code`

## Current Status

- ✅ Frontend code is correct
- ✅ Backend code is fixed locally
- ❌ Backend needs to be deployed to production

Once the backend is deployed, the referrals page will work correctly.

## Alternative: Temporary Workaround

If you can't deploy immediately, you could temporarily change the frontend to call the old route path, but this is not recommended as it would break once you deploy the backend fix.

**Don't do this** - just deploy the backend fix instead:
```javascript
// DON'T DO THIS - just deploy backend
const json = await apiFetch("/api/v1/me/referral-code", { token, signal });
```

## Verification

After deploying, test:
1. Navigate to `/lms/student/referrals`
2. The page should load without 404 errors
3. The referral code should display correctly

