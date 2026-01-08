# Localhost Development Setup Guide

## ✅ Environment Files Created

I've created `.env` files for both API and Web. **You need to update them with your actual values:**

### 1. Update `apps/api/.env`

**Required values to update:**
- `DATABASE_URL` - Your PostgreSQL connection string
  - Example: `postgresql://user:password@host:port/database`
  - For Neon: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`
  
- `JWT_SECRET` - A strong random secret (minimum 32 characters)
  - Generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 2. `apps/web/.env` is ready
- Already set to `VITE_API_URL=http://localhost:4000`

## 🚀 Starting the Servers

### Option 1: Start Both Servers (Recommended)

**Terminal 1 - API Server:**
```bash
cd apps/api
npm run dev
```
Server will run on: **http://localhost:4000**

**Terminal 2 - Web Server:**
```bash
cd apps/web
npm run dev
```
Server will run on: **http://localhost:5173**

### Option 2: Use PowerShell Background Jobs

I can start both servers for you. Just make sure your `.env` files are updated first!

## 🔍 Verify Setup

1. **API Health Check:** http://localhost:4000/health
   - Should return: `OK`

2. **Web App:** http://localhost:5173
   - Should load the frontend
   - Check browser console for API connection status

## ⚠️ Common Issues

### Issue: "Missing required env: DATABASE_URL"
- **Fix:** Update `apps/api/.env` with your actual database URL

### Issue: "Missing required env: JWT_SECRET"
- **Fix:** Update `apps/api/.env` with a strong JWT secret (32+ characters)

### Issue: CORS errors
- **Fix:** Already configured in code for localhost:5173, but check if API is running

### Issue: Database connection errors
- **Fix:** Verify your DATABASE_URL is correct and database is accessible

## 📝 Next Steps

1. Update `apps/api/.env` with your actual `DATABASE_URL` and `JWT_SECRET`
2. Start the API server: `cd apps/api && npm run dev`
3. Start the web server: `cd apps/web && npm run dev`
4. Open http://localhost:5173 in your browser

---

**Ready to start? Update your `.env` files and run the commands above!**

