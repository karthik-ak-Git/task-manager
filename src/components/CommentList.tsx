import React, { useState } from 'react';
import { Comment, UpdateCommentRequest } from '../types';

interface CommentListProps {
  comments: Comment[];
  onUpdateComment: (commentId: number, data: UpdateCommentRequest) => void;
  onDeleteComment: (commentId: number) => void;
  isLoading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  onUpdateComment, 
  onDeleteComment, 
  isLoading = false 
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleSave = (commentId: number) => {
    if (editContent.trim()) {
      onUpdateComment(commentId, { content: editContent.trim() });
      setEditingCommentId(null);
      setEditContent('');
    }
  };

  const handleCancel = () => {
    setEditingCommentId(null);
    setEditContent('');
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comments</h3>
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

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comments</h3>
        <div className="text-center py-6">
          <div className="text-gray-400 text-4xl mb-2">💬</div>
          <p className="text-gray-500">No comments yet</p>
          <p className="text-gray-400 text-sm">Be the first to add a comment!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            {editingCommentId === comment.id ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Edit your comment..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave(comment.id)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-gray-800 leading-relaxed">{comment.content}</p>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {comment.updated_at !== comment.created_at ? (
                    <span>Edited: {formatDate(comment.updated_at)}</span>
                  ) : (
                    <span>Posted: {formatDate(comment.created_at)}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList; 