import React, { useState } from 'react';
import { CreateCommentRequest } from '../types';

interface CommentFormProps {
  taskId: number;
  onSubmit: (commentData: CreateCommentRequest) => void;
  isLoading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ taskId, onSubmit, isLoading = false }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment content is required');
      return;
    }
    
    setError('');
    onSubmit({
      task_id: taskId,
      content: content.trim()
    });
    
    setContent('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            value={content}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write your comment here..."
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isLoading || !content.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm; 