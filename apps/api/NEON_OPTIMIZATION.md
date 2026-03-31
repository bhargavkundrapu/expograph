## Environment variables

- **ENABLE_AUTO_APPROVAL_POLLER**: `false`
  - Set to `true` only if you need background approval processing.
  - When enabled, the poller queries Postgres on an interval and can prevent Neon scale-to-zero.

- **AUTO_APPROVE_INTERVAL_MS**: `300000`
  - Poller interval in milliseconds.
  - Default is **5 minutes** (was 60 seconds).

- **DB_POOL_MAX**: `5`
  - Database connection pool size.
  - Keep small (3–5) for Neon serverless to allow proper scale-to-zero.

- **DATABASE_URL**
  - For Neon in production, use the **pooled** connection string where the host ends with **`-pooler.neon.tech`**.
  - Direct connection strings can keep compute active longer and interfere with scale-to-zero.

## Neon Console Manual Checklist

- Set minimum CU to **0.25** in Neon Console → Branches → main → Computes → Edit
- Enable **Scale to Zero = ON** in the same location
- Delete any unused branches in Neon Console → Branches
- Reduce restore window to **1 day** in Project Settings
- Check for unexpected external connections in Neon Console → Connection Details and revoke any unknown clients
- Check for read replicas and delete any unused ones

---

## Safe deployment order (production)

Do these in order so you do not break the live app.

### 1) Run the DB indexes migration first

**Option A - use the same migration runner as the rest of the app (simplest)**

From your machine (with production `DATABASE_URL` in `apps/api/.env`) or from Render’s **Shell**:

```bash
cd apps/api
# Ensure DATABASE_URL points at production (pooled Neon URL ending in -pooler.neon.tech)
npm run migrate
```

This applies `db/migrations/041_neon_optimization_indexes.sql` if it has not been applied yet. It creates a **composite index** on `approvals(tenant_id, status, created_at)` inside a normal transaction (brief lock while the index builds; usually fine for small/medium tables).

**Option B - manual `psql` with `CREATE INDEX CONCURRENTLY` (zero blocking writes)**

Use this only if you need the index built without blocking writes on a very large `approvals` table. Run **one statement** from `apps/api/src/db/migrations/add_neon_optimization_indexes.sql` against production using a **direct** connection string (Neon console often labels “direct” vs “pooled”; pooler sometimes disallows `CONCURRENTLY` - if it errors, use direct for this one-off job).

```bash
psql "YOUR_PRODUCTION_DATABASE_URL" -c "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_approvals_tenant_status_created ON approvals (tenant_id, status, created_at DESC);"
```

If you already ran **Option A**, the index may already exist - `IF NOT EXISTS` makes it safe.

### 2) Set Render environment variables

In Render → your **API** service → **Environment**:

| Variable | Suggested production value |
|----------|----------------------------|
| `ENABLE_AUTO_APPROVAL_POLLER` | `false` |
| `AUTO_APPROVE_INTERVAL_MS` | `300000` (only relevant if poller is `true`) |
| `DB_POOL_MAX` | `5` |
| `DATABASE_URL` | Pooled Neon URL (host ends with `-pooler.neon.tech`) |

Click **Save**. Render will redeploy or you can **Manual Deploy** after saving.

### 3) Deploy / restart the API

Trigger a deploy or restart so the new code and env vars load (poller off by default, smaller pool, 5‑minute RBAC cache, etc.).

### 4) Verify after deploy

1. **Health** - open or `curl` your API base URL:

   ```bash
   curl -sS https://YOUR_API_HOST/health
   ```

   Expect: `OK` (or `200`).

2. **Razorpay flows** - run a **test payment** in Razorpay test mode (or a small real payment) and confirm the user still lands correctly and approvals still complete (callback + webhook). No UI change is expected unless something was misconfigured.

3. **Neon active connections** - in Neon Console → your project → **Monitoring** or **Branches** → connection / activity views: after a few minutes with **no traffic**, active connections should drop toward **0** (scale-to-zero may take a short idle period).

---

## What you will notice in the UI / product behavior

Most changes are **backend cost and performance**; the app should look the same.

| Change | What you might notice |
|--------|------------------------|
| Poller disabled by default | **No visible change** for normal checkout. Approvals still run when payment **callback/webhook** fires. Only if you relied on the **background** poller to approve stale rows would those need the poller turned on. |
| Smaller DB pool | **No visible change** under normal load. Under heavy traffic you’d only notice if you under-provisioned (rare at pool size 5). |
| Pooled `DATABASE_URL` | **No UI change**; fewer connection issues and better Neon idle behavior. |
| RBAC cache 5 minutes | **Rare**: if an admin changes a user’s role/permissions, that user might see old permissions for **up to ~5 minutes** until they **refresh** or **log out/in**. |
| New approvals index | **Faster** Super Admin approvals list when there are many rows; usually **no visible change** for small data. |

**Simple example:** Before and after, a student still pays, gets enrolled, and sees courses the same way. The only difference you might feel is **slightly snappier** admin approvals page with lots of pending rows, and **permission changes** taking effect within minutes instead of seconds unless the user relogs in.

