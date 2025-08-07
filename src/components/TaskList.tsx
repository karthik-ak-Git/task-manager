import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: number | null;
  onTaskSelect: (taskId: number) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  selectedTaskId, 
  onTaskSelect, 
  isLoading = false 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-500 text-lg">No tasks found</p>
          <p className="text-gray-400 text-sm">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks ({tasks.length})</h2>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskSelect(task.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTaskId === task.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 line-clamp-1">
                {task.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {task.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Created: {formatDate(task.created_at)}</span>
              {task.updated_at !== task.created_at && (
                <span>Updated: {formatDate(task.updated_at)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 