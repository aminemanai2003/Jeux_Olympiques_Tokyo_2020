@echo off
echo ================================
echo Tokyo 2020 Olympics Website
echo Installation Started
echo ================================
echo.

cd /d "%~dp0"

echo [1/5] Installing dependencies...
call npm install

echo.
echo [2/5] Building application...
call npm run build

echo.
echo [3/5] Initializing git repository...
if not exist .git (
    git init
    git add .
    git commit -m "Initial commit: Tokyo 2020 Olympics Dashboard"
)

echo.
echo [4/5] Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020.git

echo.
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main --force

echo.
echo ================================
echo Installation Complete!
echo ================================
echo.
echo To run locally:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
