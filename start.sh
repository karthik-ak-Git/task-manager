#!/bin/bash

echo "Starting Task & Comment Management System..."
echo

echo "Starting Flask Backend..."
cd server
gnome-terminal --title="Flask Backend" -- bash -c "source venv/bin/activate && python main.py; exec bash" &

echo
echo "Starting React Frontend..."
cd ..
gnome-terminal --title="React Frontend" -- bash -c "npm start; exec bash" &

echo
echo "Both servers are starting..."
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo 