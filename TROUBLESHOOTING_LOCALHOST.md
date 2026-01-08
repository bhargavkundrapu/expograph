# Troubleshooting Localhost Issues

## 🔴 "Failed to fetch" Error While Logging In

This error means the **API server is not running** or not accessible.

### Quick Diagnosis

1. **Check if API server is running:**
   - Open the PowerShell window where you started the API server
   - Look for: `✅ ExpoGraph API running on port 4000`
   - If you see errors, the server didn't start properly

2. **Check browser console:**
   - Press F12 → Console tab
   - Look for: `🔧 API Base URL: http://localhost:4000`
   - If you see `❌ UNDEFINED`, the `.env` file is missing

3. **Test API connection:**
   - Open: http://localhost:4000/health
   - Should show: `OK`
   - If page doesn't load, API server is not running

### ✅ Solution Steps

#### Step 1: Check API Server Status

**Option A: Check PowerShell Window**
- Look for the PowerShell window that started the API server
- If it's closed or shows errors, restart it

**Option B: Test Port**
```powershell
Test-NetConnection -ComputerName localhost -Port 4000
```
- If `TcpTestSucceeded: False`, the server is not running

#### Step 2: Fix Database Configuration

The API server won't start if `DATABASE_URL` is not configured:

1. **Open:** `apps/api/.env`
2. **Check:** Is `DATABASE_URL` still `your_database_url_here`?
3. **Update:** Replace with your actual database connection string

**Example:**
```
DATABASE_URL=postgresql://user:password@host:port/database
```

#### Step 3: Restart API Server

1. **Stop the current server:**
   - In the API PowerShell window, press `Ctrl+C`
   - Or close the window

2. **Start it again:**
   ```powershell
   cd apps/api
   npm run dev
   ```

3. **Look for these messages:**
   - ✅ `Database connection successful` (good!)
   - ✅ `ExpoGraph API running on port 4000` (good!)
   - ❌ Any error messages (fix those first)

#### Step 4: Verify Web Server

1. **Check web server is running:**
   - Should be on: http://localhost:5173
   - Check the PowerShell window for web server

2. **Check `.env` file:**
   - Open: `apps/web/.env`
   - Should have: `VITE_API_URL=http://localhost:4000`

3. **Restart web server if needed:**
   ```powershell
   cd apps/web
   npm run dev
   ```

### 🔍 Common Issues & Fixes

#### Issue 1: "Missing required env: DATABASE_URL"
**Fix:** Update `apps/api/.env` with your database connection string

#### Issue 2: "Database connection failed"
**Fix:** 
- Verify your `DATABASE_URL` is correct
- Check database is running and accessible
- For Neon: Make sure connection string includes `?sslmode=require`

#### Issue 3: "Cannot connect to API server"
**Fix:**
- Make sure API server is running (`npm run dev` in `apps/api`)
- Check port 4000 is not used by another app
- Verify firewall isn't blocking port 4000

#### Issue 4: CORS Errors
**Fix:** Already configured in code for `localhost:5173`, but verify:
- API server is running
- Web server is on port 5173
- Both are on `localhost` (not `127.0.0.1`)

#### Issue 5: "Connection terminated due to connection timeout"
**Fix:** This is a database connection issue:
- Update `DATABASE_URL` in `apps/api/.env`
- Restart API server
- Check database is accessible

### 📋 Quick Checklist

Before trying to login, verify:

- [ ] API server is running (check PowerShell window)
- [ ] API health check works: http://localhost:4000/health
- [ ] Web server is running: http://localhost:5173
- [ ] `apps/api/.env` has correct `DATABASE_URL`
- [ ] `apps/api/.env` has correct `JWT_SECRET`
- [ ] `apps/web/.env` has `VITE_API_URL=http://localhost:4000`
- [ ] Browser console shows: `🔧 API Base URL: http://localhost:4000`
- [ ] No errors in API server console

### 🚀 Quick Start Commands

**Terminal 1 - API Server:**
```powershell
cd apps/api
npm run dev
```

**Terminal 2 - Web Server:**
```powershell
cd apps/web
npm run dev
```

**Then:**
1. Wait for both to start
2. Check http://localhost:4000/health (should show "OK")
3. Open http://localhost:5173
4. Check browser console for API URL
5. Try logging in

### 💡 Still Not Working?

1. **Check all error messages:**
   - API server console
   - Web server console
   - Browser console (F12)

2. **Verify environment files:**
   ```powershell
   # Check API .env
   Get-Content apps\api\.env
   
   # Check Web .env
   Get-Content apps\web\.env
   ```

3. **Test database connection:**
   - If using production database, verify it's accessible
   - If using local database, make sure it's running

4. **Check ports:**
   - Port 4000: API server
   - Port 5173: Web server
   - Make sure nothing else is using these ports

---

**Need more help?** Check the specific error message in your browser console or API server logs!

