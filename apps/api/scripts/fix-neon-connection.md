# Fix Neon Connection Issues

## Problem: ECONNRESET / Connection Timeout

Your network/firewall is blocking connections to Neon. Here's how to fix:

### Option 1: Check Windows Firewall (Recommended)

1. Open **Windows Defender Firewall** → **Advanced settings**
2. Click **Outbound Rules** → **New Rule**
3. Select **Port** → **TCP** → **Specific local ports**: `5432`
4. Allow the connection → Apply to all profiles → Name it "PostgreSQL"
5. Try connecting again: `node scripts/test-connection.js`

### Option 2: Use Direct Connection URL

If using pooler (`-pooler` in URL), switch to **Direct connection**:

1. Go to Neon dashboard → Your project → **Connection Details**
2. Copy the **Direct connection** URL (not pooler)
3. Update `apps/api/.env`: `DATABASE_URL=<direct-url>`
4. Test: `node scripts/test-connection.js`

### Option 3: Use Local PostgreSQL

If Neon still doesn't work, use local PostgreSQL:

1. **Install PostgreSQL** from https://www.postgresql.org/download/windows/
2. During install, set password for `postgres` user
3. Create database: Open **pgAdmin** or run: `createdb expograph`
4. Update `apps/api/.env`:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/expograph
   ```
5. Test: `node scripts/test-connection.js`
6. Run migrations: `npm run migrate` then `npm run seed`

### Option 4: Check VPN/Corporate Network

If you're on a corporate network/VPN:
- Try disconnecting VPN temporarily
- Or ask IT to whitelist `*.neon.tech` domains
- Or use local PostgreSQL (Option 3)

---

**After fixing, run:**
```powershell
node scripts/test-connection.js  # Should show ✓ Connection successful!
npm run migrate
npm run seed
npm run dev
```
