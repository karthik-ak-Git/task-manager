# Task & Comment Management System

A full-stack web application for managing tasks and their associated comments. Built with Flask (Python) backend and React + TypeScript + Tailwind CSS frontend.

## 🏗️ Architecture

- **Backend**: Flask REST API with SQLAlchemy ORM
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: SQLite
- **API Communication**: Axios

## 📁 Project Structure

```
better-1/
├── server/                 # Flask Backend
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Data validation
│   │   ├── services/       # Business logic
│   │   └── __init__.py     # Flask app factory
│   ├── tests/              # Unit tests
│   ├── main.py             # Server entry point
│   └── requirements.txt    # Python dependencies
├── src/                    # React Frontend
│   ├── components/         # React components
│   ├── services/           # API service layer
│   ├── types/              # TypeScript interfaces
│   └── index.tsx           # React entry point
├── public/                 # Static files
├── package.json            # Node.js dependencies
├── tailwind.config.js      # Tailwind CSS config
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python main.py
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 🎯 Features

### Task Management
- ✅ Create new tasks with title, description, and status
- ✅ View all tasks in a clean, organized list
- ✅ Task status tracking (Pending, In Progress, Completed)
- ✅ Responsive design with Tailwind CSS

### Comment Management
- ✅ Add comments to any task
- ✅ View all comments for a selected task
- ✅ Edit existing comments inline
- ✅ Delete comments with confirmation
- ✅ Real-time updates

### User Experience
- ✅ Loading states for all operations
- ✅ Error handling with user-friendly messages
- ✅ Form validation
- ✅ Responsive design for mobile and desktop
- ✅ Clean, modern UI with Tailwind CSS

## 🔧 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/<id>` - Get a specific task
- `PUT /api/tasks/<id>` - Update a task
- `DELETE /api/tasks/<id>` - Delete a task

### Comments
- `GET /api/comments/<task_id>` - Get comments for a task
- `POST /api/comments` - Create a new comment
- `PUT /api/comments/<id>` - Update a comment
- `DELETE /api/comments/<id>` - Delete a comment

## 🎨 Frontend Components

- **TaskPage**: Main page orchestrating all functionality
- **TaskForm**: Form for creating new tasks
- **TaskList**: Displays all tasks with selection
- **CommentForm**: Form for adding comments to tasks
- **CommentList**: Displays comments with edit/delete options

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd server
python -m pytest tests/

# Frontend tests
npm test
```

### Building for Production
```bash
# Frontend build
npm run build
```

## 🔒 Error Handling

The application includes comprehensive error handling:
- Network request failures
- Form validation errors
- Database operation errors
- User-friendly error messages
- Automatic error recovery

## 📱 Responsive Design

The UI is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎯 Future Enhancements

Potential improvements for the system:
- User authentication and authorization
- Task categories and tags
- File attachments for comments
- Real-time notifications
- Task assignment to users
- Advanced filtering and search
- Export functionality
- Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License. 