import os
import sys
import subprocess
import time
import requests

def start_backend():
    print("Starting Flask Backend...")
    print("=" * 50)
    
    # Change to server directory
    os.chdir("server")
    
    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("❌ Virtual environment not found!")
        print("Please run: python -m venv venv")
        return False
    
    # Activate virtual environment and start server
    try:
        if sys.platform == "win32":
            # Windows
            activate_cmd = "venv\\Scripts\\activate"
            python_cmd = "venv\\Scripts\\python.exe"
        else:
            # Unix/Linux/Mac
            activate_cmd = "source venv/bin/activate"
            python_cmd = "venv/bin/python"
        
        print(f"✅ Using Python: {python_cmd}")
        
        # Start the Flask server
        print("🚀 Starting Flask server...")
        subprocess.run([python_cmd, "main.py"], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting server: {e}")
        return False
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        return True
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    start_backend() 