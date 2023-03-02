import {showAndroidToast} from 'helper';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TaskService} from 'services/task/task-service';
import {ITask, ITaskRequest} from 'services/task/task-model';

interface ITaskStore {
  tasks: ITask[];
  isLoading: boolean;
  // needReload: boolean;
}

const initialState: ITaskStore = {
  tasks: [],
  isLoading: false,
  // needReload: false,
};

export const getTaskByCategoryIdAction = createAsyncThunk(
  'task/getTaskByCategoryId',
  async (input: ITaskRequest, _thunkApi) => {
    const res = await TaskService.getTaskByCategoryId(input);

    return res;
  },
);

export const changeTaskStatusAction = createAsyncThunk(
  'task/changeTaskStatus',
  async (input: ITaskRequest, _thunkApi) => {
    const res = await TaskService.changeTaskStatus(input);

    return {success: res, input};
  },
);

export const deleteTaskAction = createAsyncThunk(
  'task/deleteTask',
  async (input: ITaskRequest, _thunkApi) => {
    const res = await TaskService.deleteTask(input);

    return {success: res, input};
  },
);

export const updateTaskAction = createAsyncThunk(
  'task/updateTask',
  async (input: ITaskRequest, _thunkApi) => {
    const res = await TaskService.updateTask(input);

    return {success: res, input};
  },
);

export const categorySlide = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getTaskByCategoryIdAction.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTaskByCategoryIdAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
      state.isLoading = false;
    });
    builder.addCase(getTaskByCategoryIdAction.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(changeTaskStatusAction.fulfilled, (state, action) => {
      const res = action.payload;

      if (res.success) {
        showAndroidToast('Change status successfully');

        state.tasks.forEach(e => {
          if (e.id === res.input.id) {
            e.status = res.input.status!;
          }
        });
      }
    });
    builder.addCase(changeTaskStatusAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
    });

    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      const res = action.payload;

      if (res.success) {
        showAndroidToast('Delete task successfully');

        state.tasks = state.tasks.filter(e => e.id !== res.input.id);
      }
    });
    builder.addCase(deleteTaskAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
    });

    builder.addCase(updateTaskAction.fulfilled, (state, action) => {
      const res = action.payload;

      if (res.success) {
        state.tasks.forEach(e => {
          if (e.id === res.input.id) {
            e.name = res.input.name!;
            e.description = res.input.description!;
            e.status = res.input.status!;
            e.createdAt = res.input.createdAt!;
          }
        });

        showAndroidToast('Update task successfully');
      }
    });
    builder.addCase(updateTaskAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
    });
  },
});

export const {setTasks} = categorySlide.actions;

export default categorySlide.reducer;