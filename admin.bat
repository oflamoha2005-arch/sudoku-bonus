@echo off
title Oufella - Admin Dashboard
cd /d "%~dp0"

echo ===================================================
echo     Oufella Activity Books - Admin Dashboard
echo ===================================================
echo.
echo   [1/2] Kay-demari l-Admin Server...
echo   [2/2] Ghadi yt7ell l-browser 3la: http://localhost:3001
echo.
echo   * Ila bghiti t-qfel l-program: dir Ctrl + C
echo ===================================================
echo.

:: Open browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3001"

:: Start the admin server
node admin-server.mjs

pause
