export interface ITaskRequest {
  id?: string;
  categoryId?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  status?: string;
}

export interface ITask {
  id: string;
  category: number;
  name: string;
  description: string;
  createdAt: number;
  status: string;
}
