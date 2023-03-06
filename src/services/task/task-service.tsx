import {TASK_TABLE} from 'constant/values';
import {getAPI2, putAPI2, deleteAPI2, postAPI2} from 'helper/network';
import {ITask, ITaskRequest} from './task-model';

const endpoint = {
  allTasks: `/${TASK_TABLE}/`.trim(),
};

export const TaskService = {
  getTaskByCategoryId: async (input: ITaskRequest) => {
    // mockAPI.io only support get data by id, in this case we need filter data by categoryId
    // so i have to do it manual, like this:

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
  updateTask: async (input: ITaskRequest) => {
    const res = await putAPI2(endpoint.allTasks + input.id, {
      name: input.name,
      status: input.status,
      description: input.description,
      createdAt: input.createdAt,
    });

    return res;
  },
  createTask: async (input: ITaskRequest) => {
    const res = await postAPI2(`/${TASK_TABLE}`, {
      id: input.id,
      category: input.categoryId,
      name: input.name,
      description: input.description,
      createdAt: input.createdAt,
      status: input.status,
    });

    return res;
  },

  getMaxTasksId: async () => {
    let maxId: string = '';
    const res = await getAPI2(endpoint.allTasks);

    if (res?.data) {
      const data: ITask[] = res.data;

      maxId = data[data.length - 1].id;
    }

    return maxId;
  },
};
