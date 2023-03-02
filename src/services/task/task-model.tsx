export interface ITaskRequest {
  categoryId?: string;
  status?: string;
  id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
}

export interface ITask {
  id: string;
  category: number;
  name: string;
  description: string;
  createdAt: number;
  status: string;
}
