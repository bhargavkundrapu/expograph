# Git Setup Guide for PowerShell

## Step 1: Check if Git is Installed

Run this in PowerShell:
```powershell
Test-Path "C:\Program Files\Git\bin\git.exe"
```

**If it returns `True`:** Git is installed! Skip to Step 3.

**If it returns `False`:** Git is not installed. Go to Step 2.

---

## Step 2: Install Git (If Not Installed)

### Option A: Download Git for Windows
1. Go to: https://git-scm.com/download/win
2. Download the installer
3. Run the installer
4. **Important:** During installation, select "Add Git to PATH" option
5. Complete installation
6. Restart PowerShell

### Option B: Install via Winget (Windows 10/11)
```powershell
winget install --id Git.Git -e --source winget
```

### Option C: Install via Chocolatey (if you have it)
```powershell
choco install git
```

---

## Step 3: Add Git to PATH (If Already Installed)

If Git is installed but not in PATH, add it:

### Method 1: Temporary (Current Session Only)
```powershell
$env:PATH += ";C:\Program Files\Git\bin"
```

### Method 2: Permanent (Recommended)
1. Press `Win + X` → System → Advanced system settings
2. Click "Environment Variables"
3. Under "System variables", find "Path" → Edit
4. Click "New" → Add: `C:\Program Files\Git\bin`
5. Click OK on all dialogs
6. **Restart PowerShell**

---

## Step 4: Verify Git Works

After installation/PATH setup, test:
```powershell
git --version
```

Should show: `git version 2.x.x` or similar

---

## Step 5: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 6: Now You Can Deploy!

Once git works, run:
```powershell
cd C:\Users\USER\expograph-main

git add apps/api/src/modules/media/media.repo.js
git add apps/api/src/server/createApp.js
git add apps/web/src/pages/lms/student/StudentLesson.jsx
git add apps/web/vite.config.js
git add apps/web/src/services/api.js

git commit -m "fix: Support video_id directly on lessons table + CORS localhost:5173 + video player with signed tokens"

git push origin main
```

---

## Quick Check Script

Run this to check everything:
```powershell
Write-Host "=== Git Setup Check ===" -ForegroundColor Cyan
Write-Host ""

# Check if git exists
$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
)

$found = $false
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        Write-Host "✅ Git found at: $path" -ForegroundColor Green
        Write-Host "   Version: $(& $path --version)" -ForegroundColor Green
        $found = $true
        break
    }
}

if (-not $found) {
    Write-Host "❌ Git not found. Please install Git." -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== PATH Check ===" -ForegroundColor Cyan
$inPath = Get-Command git -ErrorAction SilentlyContinue
if ($inPath) {
    Write-Host "✅ Git is in PATH" -ForegroundColor Green
    Write-Host "   Location: $($inPath.Source)" -ForegroundColor Green
} else {
    Write-Host "❌ Git not in PATH" -ForegroundColor Red
    Write-Host "   Add to PATH or use full path" -ForegroundColor Yellow
}
```

---

## Alternative: Use VS Code Git UI

If PowerShell setup is complicated, use VS Code:
1. Open VS Code
2. Open your project folder
3. Press `Ctrl+Shift+G` (Source Control)
4. Stage, commit, and push from the UI

---

**Let me know what the check script shows and I'll help you proceed!**

