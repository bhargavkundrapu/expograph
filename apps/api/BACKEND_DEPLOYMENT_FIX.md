# Backend Deployment Fix Guide

## ✅ Issues Resolved

### 1. TypeScript Configuration
- ✅ TypeScript is configured but doesn't interfere with JavaScript runtime
- ✅ `allowJs: true` allows gradual migration
- ✅ `checkJs: false` prevents TypeScript from checking JS files

### 2. Nodemon Configuration
- ✅ Created `nodemon.json` for proper file watching
- ✅ Updated `dev` script to use nodemon config
- ✅ Added proper ignore patterns

### 3. Environment Variables
- ✅ Created `.env.example` template
- ✅ Verified `.env` file exists and is properly configured

## 🚀 Quick Start

### Start Backend Server

```bash
cd apps/api
npm run dev
```

The server will start on port 4000 (or PORT from .env).

### Check for Errors

```bash
# TypeScript type checking (optional)
npm run type-check

# Start server
npm run dev
```

## 🔧 Common Issues & Fixes

### Issue 1: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::4000`

**Fix:**
```bash
# Kill process on port 4000
# Windows:
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=4001
```

### Issue 2: Database Connection Error

**Error:** `DATABASE_URL is missing or invalid`

**Fix:**
1. Create `apps/api/.env` file
2. Add your database URL:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### Issue 3: JWT Secret Missing

**Error:** `JWT_SECRET is missing or invalid`

**Fix:**
1. Generate a secure secret:
   ```bash
   # Linux/Mac
   openssl rand -base64 32
   
   # Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```
2. Add to `.env`:
   ```
   JWT_SECRET=your-generated-secret-here
   ```

### Issue 4: Module Not Found

**Error:** `Cannot find module '...'`

**Fix:**
```bash
cd apps/api
npm install
```

### Issue 5: TypeScript Path Aliases

**Note:** TypeScript path aliases (`@/*`) only work during TypeScript compilation, not at runtime. For runtime, use relative paths or configure a module resolver.

**Current Setup:**
- Path aliases work for TypeScript files
- JavaScript files use CommonJS `require()` with relative paths
- This is correct and expected behavior

## 📝 Environment Variables Required

Create `apps/api/.env` with:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secure-secret-key
PORT=4000
NODE_ENV=development
JWT_EXPIRES_IN=7d
CORS_ORIGINS=http://localhost:5173
DEFAULT_TENANT_SLUG=expograph
```

## ✅ Verification

### Check Server is Running

```bash
# Test health endpoint
curl http://localhost:4000/health

# Should return: OK
```

### Check TypeScript

```bash
npm run type-check
# Should complete without errors
```

## 🎯 Next Steps

1. ✅ Backend is configured and ready
2. ✅ TypeScript support added (gradual migration)
3. ✅ Nodemon configured for development
4. ✅ Environment variables template created

Your backend is ready to deploy! 🚀
