@echo off
REM Premium Setup Installation Script for Windows
REM Installs TypeScript, Three.js, and Next.js dependencies

echo 🚀 Installing Premium Setup...
echo.

REM Frontend dependencies
echo 📦 Installing frontend dependencies (TypeScript + Three.js)...
cd apps\web
call npm install
cd ..\..

REM Backend dependencies
echo 📦 Installing backend dependencies (TypeScript)...
cd apps\api
call npm install
cd ..\..

REM Next.js dependencies (optional)
set /p installNext="Do you want to install Next.js dependencies? (y/n): "
if /i "%installNext%"=="y" (
    echo 📦 Installing Next.js dependencies...
    cd apps\nextjs
    call npm install
    cd ..\..
)

echo.
echo ✅ Premium Setup Installation Complete!
echo.
echo 📚 Next Steps:
echo   1. Read QUICK_START.md for usage examples
echo   2. Read SETUP_GUIDE.md for comprehensive documentation
echo   3. Start using TypeScript, Three.js, and Next.js!
echo.
echo 🎉 Happy coding!
pause
