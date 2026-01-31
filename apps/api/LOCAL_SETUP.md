# Local PostgreSQL Setup (Bypass Neon Network Issues)

Since Neon connections are being blocked by your network/firewall, here's how to use **local PostgreSQL** instead:

## Quick Setup (Windows)

### Step 1: Install PostgreSQL

1. Download from: https://www.postgresql.org/download/windows/
2. Run installer → Use default settings
3. **Remember the password** you set for `postgres` user (you'll need it)
4. Port: `5432` (default)

### Step 2: Create Database

Open **pgAdmin** (installed with PostgreSQL) or PowerShell:

```powershell
# Add PostgreSQL bin to PATH (adjust version if different)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# Create database
createdb -U postgres expograph
```

Or in pgAdmin:
- Right-click **Databases** → **Create** → **Database**
- Name: `expograph`
- Owner: `postgres`
- Click **Save**

### Step 3: Update .env

Edit `apps/api/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/expograph
JWT_SECRET=your-secret-at-least-32-chars-long-change-in-production
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### Step 4: Test Connection

```powershell
cd apps\api
node scripts/test-connection.js
```

Should show: `✓ Connection successful!`

### Step 5: Run Migrations & Seeds

```powershell
npm run migrate
npm run seed
npm run dev
```

**Test login:** Email `test@expograph.com`, Password `password123`

---

## Alternative: Use Neon from Different Network

If you need Neon (not local):
1. Try from a different network (mobile hotspot, different WiFi)
2. Disable VPN temporarily
3. Check corporate firewall rules
4. Contact IT to whitelist `*.neon.tech` domains

---

## Troubleshooting Local PostgreSQL

**"password authentication failed"**
- Check password in `.env` matches PostgreSQL `postgres` user password
- Reset password: `psql -U postgres -c "ALTER USER postgres PASSWORD 'newpassword';"`

**"database does not exist"**
- Create it: `createdb -U postgres expograph`

**"connection refused"**
- Start PostgreSQL service: Windows Services → PostgreSQL → Start
- Or: `net start postgresql-x64-16` (adjust version)
