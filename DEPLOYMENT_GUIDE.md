# 🚀 Complete Deployment Guide

This guide covers deploying both **Frontend (Vercel)** and **Backend (Render/Node.js)**.

---

## 📋 Prerequisites

- ✅ GitHub repository connected
- ✅ Vercel account (for frontend)
- ✅ Render/Railway/Heroku account (for backend)
- ✅ Database (Neon Postgres) configured
- ✅ Cloudflare Stream account (for videos)
- ✅ Environment variables ready

---

## 🎯 Part 1: Frontend Deployment (Vercel)

### Step 1.1: Prepare Frontend Build

```bash
# Navigate to web directory
cd apps/web

# Install dependencies
npm install

# Test build locally
npm run build

# If build succeeds, you're ready!
```

### Step 1.2: Configure Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project** (if not already connected):
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository
   - **Root Directory**: Set to `apps/web`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 1.3: Set Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `https://api.expograph.in` | Production, Preview, Development |

### Step 1.4: Deploy

**Option A: Auto-Deploy (Recommended)**
- Push to `main` branch → Vercel auto-deploys
- Check deployment status in Vercel dashboard

**Option B: Manual Deploy**
```bash
# From project root
git add apps/web
git commit -m "feat: Deploy frontend updates"
git push origin main
```

**Option C: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

### Step 1.5: Verify Frontend

- ✅ Visit: https://expograph.in
- ✅ Check console for errors
- ✅ Test login functionality
- ✅ Verify API calls work

---

## 🔧 Part 2: Backend Deployment (Render)

### Step 2.1: Prepare Backend

```bash
# Navigate to API directory
cd apps/api

# Install dependencies
npm install

# Test locally
npm start
```

### Step 2.2: Configure Render Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Create New Web Service**:
   - Connect GitHub repository
   - **Name**: `expograph-api`
   - **Environment**: Node
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Paid (as needed)

### Step 2.3: Set Environment Variables in Render

Go to **Environment** tab in Render dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Required |
| `PORT` | `10000` | Render auto-assigns, but set default |
| `DATABASE_URL` | `postgresql://...` | Your Neon Postgres URL |
| `JWT_SECRET` | `your-secret-key` | Strong random string |
| `JWT_EXPIRES_IN` | `7d` | Optional, defaults to 7d |
| `CORS_ORIGINS` | `https://expograph.in,https://www.expograph.in` | Comma-separated |
| `DEFAULT_TENANT_SLUG` | `expograph` | Your tenant slug |
| `CF_ACCOUNT_ID` | `your-account-id` | Cloudflare Stream |
| `CF_API_TOKEN` | `your-api-token` | Cloudflare Stream |
| `CF_STREAM_CUSTOMER_CODE` | `customer-xxxxx` | Cloudflare Stream |

### Step 2.4: Run Database Migrations

**Option A: Manual Migration Script**

Create a migration script or run manually:

```bash
# Connect to your database
psql $DATABASE_URL

# Run migrations in order
\i apps/api/db/migrations/001_init.sql
\i apps/api/db/migrations/002_constraints.sql
# ... continue for all migrations
```

**Option B: Automated Migration (Recommended)**

Create `apps/api/scripts/migrate.js`:

```javascript
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const migrationsDir = path.join(__dirname, '../db/migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    console.log(`✅ Completed: ${file}`);
  }

  await pool.end();
  console.log('🎉 All migrations completed!');
}

migrate().catch(console.error);
```

Then add to `package.json`:
```json
{
  "scripts": {
    "migrate": "node scripts/migrate.js"
  }
}
```

Run migrations on Render:
- Add **Build Command**: `npm install && npm run migrate`
- Or run manually via Render Shell

### Step 2.5: Deploy Backend

**Option A: Auto-Deploy (Recommended)**
- Push to `main` branch → Render auto-deploys
- Check deployment logs in Render dashboard

**Option B: Manual Deploy**
```bash
git add apps/api
git commit -m "feat: Deploy backend updates"
git push origin main
```

### Step 2.6: Verify Backend

- ✅ Check health endpoint: `https://api.expograph.in/health`
- ✅ Test API endpoints
- ✅ Check logs in Render dashboard
- ✅ Verify CORS is working

---

## 🔄 Part 3: Full Deployment Workflow

### Complete Deployment Steps

```bash
# 1. Test locally first
cd apps/web
npm run build

cd ../api
npm start  # Test in another terminal

# 2. Commit all changes
cd ../..
git add .
git commit -m "feat: Deploy UI/UX improvements and layout enhancements"

# 3. Push to trigger auto-deploy
git push origin main

# 4. Monitor deployments
# - Vercel: https://vercel.com/dashboard
# - Render: https://dashboard.render.com

# 5. Wait for builds (2-5 minutes)

# 6. Verify
# - Frontend: https://expograph.in
# - Backend: https://api.expograph.in/health
```

---

## 🔐 Part 4: Environment Variables Checklist

### Frontend (Vercel)

✅ `VITE_API_URL` = `https://api.expograph.in`

### Backend (Render)

✅ `NODE_ENV` = `production`  
✅ `PORT` = `10000` (or auto-assigned)  
✅ `DATABASE_URL` = Your Neon Postgres connection string  
✅ `JWT_SECRET` = Strong random secret (min 32 chars)  
✅ `JWT_EXPIRES_IN` = `7d`  
✅ `CORS_ORIGINS` = `https://expograph.in,https://www.expograph.in`  
✅ `DEFAULT_TENANT_SLUG` = `expograph`  
✅ `CF_ACCOUNT_ID` = Cloudflare account ID  
✅ `CF_API_TOKEN` = Cloudflare API token  
✅ `CF_STREAM_CUSTOMER_CODE` = Cloudflare Stream customer code  

---

## 🗄️ Part 5: Database Setup

### 5.1: Create Database (Neon)

1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Add to `DATABASE_URL` in Render

### 5.2: Run Migrations

```bash
# Option 1: Via Render Shell
# Go to Render dashboard → Your service → Shell
# Run: npm run migrate

# Option 2: Via local connection
psql $DATABASE_URL < apps/api/db/migrations/001_init.sql
# Repeat for all migrations
```

### 5.3: Seed Data (Optional)

```bash
# Run seed scripts
psql $DATABASE_URL < apps/api/db/seeds/001_seed_tenant_roles.sql
# Repeat for all seeds
```

---

## ✅ Part 6: Post-Deployment Verification

### Frontend Checks

- [ ] Site loads: https://expograph.in
- [ ] No console errors
- [ ] Login works
- [ ] Navigation works
- [ ] API calls succeed
- [ ] Video player works (if applicable)
- [ ] Responsive design works
- [ ] All pages load correctly

### Backend Checks

- [ ] Health check: `https://api.expograph.in/health`
- [ ] Login endpoint works: `POST /api/v1/auth/login`
- [ ] CORS headers present
- [ ] Database connections work
- [ ] JWT tokens generate correctly
- [ ] Video playback tokens work (if applicable)
- [ ] No errors in logs

### Integration Checks

- [ ] Frontend can call backend API
- [ ] Authentication flow works
- [ ] CORS allows frontend domain
- [ ] All features functional

---

## 🐛 Troubleshooting

### Frontend Build Fails

**Error**: Build timeout or memory issues
- **Fix**: Increase Vercel build timeout/memory in settings

**Error**: Missing environment variables
- **Fix**: Check Vercel environment variables are set

**Error**: Module not found
- **Fix**: Run `npm install` locally, commit `package-lock.json`

### Backend Deployment Fails

**Error**: Database connection failed
- **Fix**: Verify `DATABASE_URL` is correct in Render

**Error**: Port already in use
- **Fix**: Render auto-assigns port, use `process.env.PORT`

**Error**: Migrations failed
- **Fix**: Run migrations manually via Render Shell

### CORS Errors

**Error**: CORS policy blocked
- **Fix**: Add frontend domain to `CORS_ORIGINS` in backend env vars

### Video Player Issues

**Error**: 401 Unauthorized
- **Fix**: Check Cloudflare Stream credentials in backend env vars

**Error**: Video not found
- **Fix**: Verify `video_id` is set in lesson, video exists in Cloudflare

---

## 📝 Quick Deploy Commands

### Frontend Only
```bash
cd apps/web
npm run build
git add .
git commit -m "deploy: Frontend updates"
git push origin main
```

### Backend Only
```bash
cd apps/api
git add .
git commit -m "deploy: Backend updates"
git push origin main
```

### Full Stack
```bash
git add .
git commit -m "deploy: Full stack updates"
git push origin main
```

---

## 🎯 Deployment Checklist

Before deploying:

- [ ] All code committed to git
- [ ] Local tests pass
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] CORS origins updated
- [ ] Cloudflare credentials set
- [ ] Domain DNS configured (if custom domain)

After deploying:

- [ ] Frontend loads correctly
- [ ] Backend health check passes
- [ ] Login works
- [ ] API calls succeed
- [ ] No console errors
- [ ] Database queries work
- [ ] Video player works (if applicable)

---

## 🚀 Alternative Deployment Platforms

### Frontend Alternatives

- **Netlify**: Similar to Vercel, supports Vite
- **Cloudflare Pages**: Fast CDN, good for static sites
- **AWS Amplify**: AWS ecosystem integration

### Backend Alternatives

- **Railway**: Easy Node.js deployment
- **Heroku**: Classic PaaS (paid plans)
- **AWS EC2/Elastic Beanstalk**: More control
- **DigitalOcean App Platform**: Simple deployment

---

## 📞 Support

If deployment fails:

1. Check deployment logs (Vercel/Render dashboards)
2. Verify environment variables
3. Test locally first
4. Check database connectivity
5. Verify CORS configuration

---

**Ready to deploy? Start with Part 1 (Frontend) or Part 2 (Backend)!** 🎉

