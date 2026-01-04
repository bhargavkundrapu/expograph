# How to Restart Dev Server

## ⚠️ IMPORTANT: Restart Required

The `.env` file was created, but **Vite needs to be restarted** to load environment variables.

## Steps:

1. **Stop the current dev server:**
   - Go to the terminal where `npm run dev` is running
   - Press `Ctrl + C` to stop it

2. **Restart the dev server:**
   ```powershell
   cd C:\Users\USER\expograph-main\apps\web
   npm run dev
   ```

3. **Verify it's working:**
   - Check the terminal output - should show the server starting
   - Open browser: http://localhost:5173
   - Try login again
   - Check console - should NOT see "undefined" in the API URL

## Expected Result:

After restart, the API calls should go to:
- ✅ `https://api.expograph.in/api/v1/auth/login` (correct)
- ❌ NOT `http://localhost:5173/undefined/api/v1/auth/login` (wrong)

