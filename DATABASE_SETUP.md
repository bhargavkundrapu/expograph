# Database Setup for Localhost

## 🔴 Current Issue: Connection Timeout

You're getting "Connection terminated due to connection timeout" because the `DATABASE_URL` in `apps/api/.env` is still set to the placeholder value.

## ✅ Solution: Configure Your Database URL

### Step 1: Get Your Database Connection String

You need a PostgreSQL database. Options:

#### Option A: Use Your Production Database (Neon/Render/etc.)
1. Go to your database provider dashboard (Neon, Render, etc.)
2. Copy the connection string
3. It should look like:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

#### Option B: Use Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database
3. Connection string:
   ```
   postgresql://postgres:password@localhost:5432/expograph
   ```

#### Option C: Use Docker PostgreSQL
```bash
docker run --name expograph-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=expograph -p 5432:5432 -d postgres
```
Connection string:
```
postgresql://postgres:password@localhost:5432/expograph
```

### Step 2: Update `apps/api/.env`

Open `apps/api/.env` and replace:
```
DATABASE_URL=your_database_url_here
```

With your actual connection string:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Step 3: Generate JWT Secret

If you haven't set `JWT_SECRET` yet, generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and update in `apps/api/.env`:
```
JWT_SECRET=your_generated_secret_here
```

### Step 4: Restart API Server

After updating `.env`, restart your API server:
1. Stop the current API server (Ctrl+C in the PowerShell window)
2. Start it again:
   ```bash
   cd apps/api
   npm run dev
   ```

## 🔍 Verify Database Connection

The API server will now:
- ✅ Test the database connection on startup
- ✅ Show "✅ Database connection successful" if working
- ✅ Show clear error messages if connection fails

## 🧪 Test Login Again

1. Make sure API server is running (check for "✅ Database connection successful")
2. Open http://localhost:5173
3. Try logging in again

## ⚠️ Common Issues

### Issue: "Database connection failed: ETIMEDOUT"
- **Cause**: Database URL is incorrect or database is not accessible
- **Fix**: Verify your DATABASE_URL is correct and database is running

### Issue: "Database connection failed: ECONNREFUSED"
- **Cause**: Database server is not running or wrong host/port
- **Fix**: Check database is running and connection string has correct host:port

### Issue: "invalid input syntax for type uuid"
- **Cause**: Database URL placeholder still in use
- **Fix**: Update DATABASE_URL with actual connection string

### Issue: SSL connection errors
- **Cause**: Database requires SSL but connection string doesn't specify it
- **Fix**: Add `?sslmode=require` to your connection string (for Neon, this is automatic)

## 📝 Quick Checklist

- [ ] Updated `apps/api/.env` with actual `DATABASE_URL`
- [ ] Updated `apps/api/.env` with actual `JWT_SECRET`
- [ ] Restarted API server
- [ ] See "✅ Database connection successful" in API server logs
- [ ] Can login at http://localhost:5173

---

**Need help?** Check the API server console for specific error messages - they now provide clear guidance!

