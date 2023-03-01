import {getAPI2} from 'helper/network';
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
};
