@echo off
title Oufella - Django Demands Backend
cd /d "%~dp0\backend"

echo ===================================================
echo     Oufella Books - Django Demands Backend
echo ===================================================
echo.
echo   [1/2] Kay-demari Django Server f port 8000...
echo   [2/2] Ghadi yt7ell Django Admin f: http://localhost:8000/admin/
echo.
echo   * Login Django Admin:
echo       User: admin
echo       Pass: oufella2026
echo.
echo   * API URL: http://localhost:8000/api/demands/
echo   * Ila bghiti t-qfel: dir Ctrl + C
echo ===================================================
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:8000/admin/"
py manage.py runserver 8000

pause
