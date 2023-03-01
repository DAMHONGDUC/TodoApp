export interface ITaskRequest {
  categoryId: string;
}

export interface ITask {
  id: number;
  category: number;
  name: string;
  description: string;
  createdAt: number;
  status: string;
}
