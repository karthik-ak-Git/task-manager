export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  task_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: string;
}

export interface CreateCommentRequest {
  task_id: number;
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
} 