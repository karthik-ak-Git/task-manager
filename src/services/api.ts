import axios from 'axios';
import { Task, Comment, CreateTaskRequest, CreateCommentRequest, UpdateCommentRequest } from '../types';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API calls
export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  // Create a new task
  createTask: async (taskData: CreateTaskRequest): Promise<Task> => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  },

  // Get a single task
  getTask: async (taskId: number): Promise<Task> => {
    const response = await api.get(`/api/tasks/${taskId}`);
    return response.data;
  },

  // Update a task
  updateTask: async (taskId: number, taskData: Partial<CreateTaskRequest>): Promise<Task> => {
    const response = await api.put(`/api/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (taskId: number): Promise<void> => {
    await api.delete(`/api/tasks/${taskId}`);
  },
};

// Comment API calls
export const commentApi = {
  // Get comments for a specific task
  getCommentsByTask: async (taskId: number): Promise<Comment[]> => {
    const response = await api.get(`/api/comments/${taskId}`);
    return response.data;
  },

  // Create a new comment
  createComment: async (commentData: CreateCommentRequest): Promise<Comment> => {
    const response = await api.post('/api/comments', commentData);
    return response.data;
  },

  // Update a comment
  updateComment: async (commentId: number, commentData: UpdateCommentRequest): Promise<Comment> => {
    const response = await api.put(`/api/comments/${commentId}`, commentData);
    return response.data;
  },

  // Delete a comment
  deleteComment: async (commentId: number): Promise<void> => {
    await api.delete(`/api/comments/${commentId}`);
  },
};

export default api; 