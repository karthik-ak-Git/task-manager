import requests
import json

def test_backend():
    base_url = "http://localhost:5000"
    
    print("Testing Flask Backend...")
    print("=" * 50)
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{base_url}/")
        print(f"✅ Server is running: {response.status_code}")
        print(f"Response: {response.json()}")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running or not accessible")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    # Test 2: Test tasks endpoint
    try:
        response = requests.get(f"{base_url}/api/tasks")
        print(f"✅ Tasks endpoint: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Tasks endpoint error: {e}")
    
    # Test 3: Create a test task
    try:
        task_data = {
            "title": "Test Task",
            "description": "This is a test task",
            "status": "pending"
        }
        response = requests.post(f"{base_url}/api/tasks", json=task_data)
        print(f"✅ Create task: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            task_id = response.json().get('id')
            
            # Test 4: Create a comment for the task
            comment_data = {
                "task_id": task_id,
                "content": "This is a test comment"
            }
            response = requests.post(f"{base_url}/api/comments", json=comment_data)
            print(f"✅ Create comment: {response.status_code}")
            print(f"Response: {response.json()}")
            
            # Test 5: Get comments for the task
            response = requests.get(f"{base_url}/api/comments/{task_id}")
            print(f"✅ Get comments: {response.status_code}")
            print(f"Response: {response.json()}")
    
    except Exception as e:
        print(f"❌ Create task/comment error: {e}")
    
    print("=" * 50)
    print("Backend test completed!")
    return True

if __name__ == "__main__":
    test_backend() 