@echo off
title Running Next.js Project
cd /d "%~dp0"

echo ===================================================
echo   Khdam kaylancé l-projet (npm run dev)...
echo   Ghadin n7llo l-browser 3la: http://localhost:3000
echo ===================================================

:: Open the browser after 3 seconds
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Run Next.js dev server
npm run dev

pause
