# Database (PostgreSQL) Setup

## Neon (Cloud) – Fixed for ECONNRESET

If you use **Neon** (`DATABASE_URL` contains `neon.tech`), the API uses **@neondatabase/serverless**, which connects over **HTTPS/WebSockets** instead of TCP. This avoids firewall/network blocks on port 5432 and fixes ECONNRESET.

- **API** (`src/db/pool.js`), **migrate**, **seed**, and **test-connection** all use the Neon serverless driver when `DATABASE_URL` points to Neon.
- **channel_binding** is stripped from the URL (it can cause connection issues).
- No code changes needed: keep your Neon `DATABASE_URL` in `.env` and run `npm run migrate`, `npm run seed`, `npm run dev`.

## Quick start (Docker)

If you have [Docker](https://docs.docker.com/get-docker/) installed:

```powershell
cd apps\api
docker compose up -d
```
(Or `docker-compose up -d` if you use the standalone Compose v1.)

Create `apps/api/.env` if it doesn't exist, with at least:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/expograph
JWT_SECRET=your-secret-at-least-32-chars-long-change-in-production
```

Then run migrations and seeds:

```powershell
npm run migrate
npm run seed
npm run dev
```

**Test login:** Email `test@expograph.com`, Password `password123`.

### Without Docker

1. Install [PostgreSQL](https://www.postgresql.org/download/) and create a database: `createdb expograph` (or in pgAdmin: create database `expograph`).
2. In `apps/api/.env` set `DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/expograph` and a `JWT_SECRET`.
3. From `apps/api`: `npm run migrate` then `npm run seed` then `npm run dev`.

---

## "Connection terminated due to connection timeout"

This error means the API cannot reach PostgreSQL before the connection times out (20 seconds). Login and other requests that use `resolveTenant` will return **500** until the database is reachable.

### Fix

1. **PostgreSQL must be running**
   - **Docker (recommended):** `cd apps/api` then `docker-compose up -d`.
   - **Local:** Start PostgreSQL (Windows: Services → start "postgresql"; Mac: `brew services start postgresql`; Linux: `sudo systemctl start postgresql`).
   - **Neon / hosted:** Ensure the URL in `.env` is correct and your network allows outbound connections.

2. **Check `apps/api/.env`**
   - `DATABASE_URL` must be a valid PostgreSQL URL, e.g.:
     - Docker: `postgresql://postgres:postgres@localhost:5432/expograph`
     - Local: `postgresql://postgres:password@localhost:5432/expograph`
     - Neon: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`
   - No placeholders like `your_database_url` or `localhost:5432/database_name`.

3. **Test the connection**
   - `npx pg-isready -h localhost -p 5432` (from `apps/api`; adjust host/port if not local).
   - Or: `psql "YOUR_DATABASE_URL" -c "SELECT 1"`.

4. **Restart the API**
   - After fixing Postgres or `.env`, restart: `cd apps/api` then `npm run dev`.

Once the database is reachable, login and tenant resolution will work.

### "Connection terminated due to connection timeout"

The database server isn't reachable. **Test the connection first:**

```powershell
node scripts/test-connection.js
```

This will show:
- ✓ Connection successful (then proceed with migrate/seed)
- ✗ Connection failed with specific error and troubleshooting steps

**Common fixes:**
- **PostgreSQL not running:** Start it (Windows: Services → PostgreSQL; Docker: `docker compose up -d`; Mac: `brew services start postgresql`)
- **Wrong DATABASE_URL:** Check `apps/api/.env` - should be `postgresql://user:password@host:port/database`
- **Firewall/VPN:** Ensure port 5432 (or your DB port) is open
- **Wrong host/port:** Verify the hostname and port in DATABASE_URL

### "read ECONNRESET" during migrate or seed

The connection is being closed by the server or network. Common causes:

- **Neon / hosted DB:** Use the **pooler** connection string (e.g. host ends with `-pooler` or use the "Pooled connection" URL from the dashboard). Pooler keeps connections alive and reduces resets.
- **Remote DB:** Ensure firewall/VPN allows outbound connections to the DB host/port. Try running migrate/seed again; the scripts retry the connection up to 3 times.
- **SSL:** If using Neon or `sslmode=require`, the scripts enable SSL automatically. If you use a custom URL, ensure it includes `?sslmode=require` if the server requires it.
