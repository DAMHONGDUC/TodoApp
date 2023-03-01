export interface ICategoryRequest {
  id?: string;
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
  done: number;
  progress: number;
}
