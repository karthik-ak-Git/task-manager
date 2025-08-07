import React, { useState, useEffect } from 'react';
import { Task, Comment, CreateTaskRequest, CreateCommentRequest, UpdateCommentRequest } from '../types';
import { taskApi, commentApi } from '../services/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState({
    tasks: false,
    comments: false,
    creatingTask: false,
    creatingComment: false,
    updatingComment: false,
    deletingComment: false
  });
  const [error, setError] = useState<string | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Load comments when a task is selected
  useEffect(() => {
    if (selectedTaskId) {
      loadComments(selectedTaskId);
    } else {
      setComments([]);
    }
  }, [selectedTaskId]);

  const loadTasks = async () => {
    setLoading(prev => ({ ...prev, tasks: true }));
    setError(null);
    
    try {
      const tasksData = await taskApi.getTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  };

  const loadComments = async (taskId: number) => {
    setLoading(prev => ({ ...prev, comments: true }));
    setError(null);
    
    try {
      const commentsData = await commentApi.getCommentsByTask(taskId);
      setComments(commentsData);
    } catch (err) {
      setError('Failed to load comments. Please try again.');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(prev => ({ ...prev, comments: false }));
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    setLoading(prev => ({ ...prev, creatingTask: true }));
    setError(null);
    
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setLoading(prev => ({ ...prev, creatingTask: false }));
    }
  };

  const handleCreateComment = async (commentData: CreateCommentRequest) => {
    setLoading(prev => ({ ...prev, creatingComment: true }));
    setError(null);
    
    try {
      const newComment = await commentApi.createComment(commentData);
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      setError('Failed to create comment. Please try again.');
      console.error('Error creating comment:', err);
    } finally {
      setLoading(prev => ({ ...prev, creatingComment: false }));
    }
  };

  const handleUpdateComment = async (commentId: number, commentData: UpdateCommentRequest) => {
    setLoading(prev => ({ ...prev, updatingComment: true }));
    setError(null);
    
    try {
      const updatedComment = await commentApi.updateComment(commentId, commentData);
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId ? updatedComment : comment
        )
      );
    } catch (err) {
      setError('Failed to update comment. Please try again.');
      console.error('Error updating comment:', err);
    } finally {
      setLoading(prev => ({ ...prev, updatingComment: false }));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setLoading(prev => ({ ...prev, deletingComment: true }));
    setError(null);
    
    try {
      await commentApi.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Failed to delete comment. Please try again.');
      console.error('Error deleting comment:', err);
    } finally {
      setLoading(prev => ({ ...prev, deletingComment: false }));
    }
  };

  const handleTaskSelect = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task & Comment Manager</h1>
          <p className="mt-2 text-gray-600">Manage your tasks and their comments efficiently</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex text-red-400 hover:text-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Tasks */}
          <div className="space-y-6">
            <TaskForm 
              onSubmit={handleCreateTask} 
              isLoading={loading.creatingTask} 
            />
            <TaskList 
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onTaskSelect={handleTaskSelect}
              isLoading={loading.tasks}
            />
          </div>

          {/* Right Column - Comments */}
          <div className="space-y-6">
            {selectedTask ? (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {selectedTask.title}
                  </h2>
                  <p className="text-gray-600 mb-3">{selectedTask.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedTask.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : selectedTask.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedTask.status.replace('_', ' ')}
                    </span>
                    <span>Created: {new Date(selectedTask.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <CommentForm 
                  taskId={selectedTask.id}
                  onSubmit={handleCreateComment}
                  isLoading={loading.creatingComment}
                />

                <CommentList 
                  comments={comments}
                  onUpdateComment={handleUpdateComment}
                  onDeleteComment={handleDeleteComment}
                  isLoading={loading.comments || loading.updatingComment || loading.deletingComment}
                />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Task</h3>
                  <p className="text-gray-500">Choose a task from the list to view and manage its comments</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage; 