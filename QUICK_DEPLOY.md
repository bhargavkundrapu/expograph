# ⚡ Quick Deploy - 5 Minutes

## 🎯 Fastest Way to Deploy

### Step 1: Commit All Changes

```bash
# From project root
git add .
git commit -m "deploy: UI/UX improvements and layout enhancements"
git push origin main
```

### Step 2: Wait for Auto-Deploy

- **Frontend (Vercel)**: Auto-deploys in ~2 minutes
- **Backend (Render)**: Auto-deploys in ~3 minutes

### Step 3: Verify

- Frontend: https://expograph.in
- Backend: https://api.expograph.in/health

---

## ✅ That's It!

If your GitHub is connected to Vercel and Render, pushing to `main` triggers automatic deployment.

**Check deployment status:**
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com

---

## 🔧 If Auto-Deploy Not Set Up

### Frontend (Vercel)

1. Go to: https://vercel.com/new
2. Import your GitHub repo
3. Set **Root Directory** to `apps/web`
4. Set **Build Command** to `npm run build`
5. Add env var: `VITE_API_URL=https://api.expograph.in`
6. Deploy!

### Backend (Render)

1. Go to: https://dashboard.render.com/new/web-service
2. Connect GitHub repo
3. Set **Root Directory** to `apps/api`
4. Set **Start Command** to `npm start`
5. Add all environment variables (see DEPLOYMENT_GUIDE.md)
6. Deploy!

---

**Need detailed steps? See `DEPLOYMENT_GUIDE.md`**

