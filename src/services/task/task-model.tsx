export interface ITaskRequest {
  categoryId?: string;
  status?: string;
  id?: number;
}

export interface ITask {
  id: number;
  category: number;
  name: string;
  description: string;
  createdAt: number;
  status: string;
}
