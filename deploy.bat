@echo off
REM 🚀 Quick Deploy Script for Windows
REM This script helps you deploy both frontend and backend

echo 🚀 ExpoGraph Deployment Script
echo ================================
echo.

REM Check if git is available
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git or use Git Bash
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "apps\web" (
    echo ❌ Please run this script from the project root
    pause
    exit /b 1
)

if not exist "apps\api" (
    echo ❌ Please run this script from the project root
    pause
    exit /b 1
)

echo 📋 Pre-deployment checks...
echo.

REM Test frontend build
echo 🔨 Testing frontend build...
cd apps\web
call npm run build >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend build failed!
    echo Please fix build errors before deploying
    cd ..\..
    pause
    exit /b 1
)
echo ✅ Frontend build successful
cd ..\..

REM Check current branch
for /f "tokens=2" %%b in ('git branch --show-current 2^>nul') do set current_branch=%%b
echo.
echo 📍 Current branch: %current_branch%
echo.

REM Ask for confirmation
set /p confirm="Ready to push to %current_branch%? This will trigger auto-deploy (y/n): "
if /i not "%confirm%"=="y" (
    echo Deployment cancelled
    pause
    exit /b 0
)

REM Push to remote
echo.
echo 📤 Pushing to GitHub...
git push origin %current_branch%
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Push failed!
    pause
    exit /b 1
)

echo.
echo ✅ Pushed successfully!
echo.
echo 🎉 Deployment triggered!
echo.
echo 📊 Monitor deployments:
echo    Frontend: https://vercel.com/dashboard
echo    Backend:  https://dashboard.render.com
echo.
echo ⏱️  Expected deployment time: 2-5 minutes
echo.
echo ✅ Verify after deployment:
echo    Frontend: https://expograph.in
echo    Backend:  https://api.expograph.in/health
echo.
pause

