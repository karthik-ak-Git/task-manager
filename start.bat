@echo off
echo Starting Task & Comment Management System...
echo.

echo Starting Flask Backend...
cd server
start "Flask Backend" cmd /k "venv\Scripts\activate && python main.py"

echo.
echo Starting React Frontend...
cd ..
start "React Frontend" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
pause 