import {getAPI2, putAPI2, deleteAPI2} from 'helper/network';
import {ITask, ITaskRequest} from './task-model';

const endpoint = {
  allTasks: '/tasks/'.trim(),
};

export const TaskService = {
  getTaskByCategoryId: async (input: ITaskRequest) => {
    // mockAPI.io only support get data by id, in this case we need filter data by categoryId
    // so i have to do it manual like this:

    let result: ITask[] = [];
    const res = await getAPI2(endpoint.allTasks);

    if (res?.data) {
      const data: ITask[] = res.data;
      result = data.filter(e => e.category.toString() === input.categoryId);
    }

    return result;
  },
  changeTaskStatus: async (input: ITaskRequest) => {
    const res = await putAPI2(endpoint.allTasks + input.id, {
      status: input.status,
    });

    return res;
  },
  deleteTask: async (input: ITaskRequest) => {
    const res = await deleteAPI2(endpoint.allTasks + input.id);

    return res;
  },
};
