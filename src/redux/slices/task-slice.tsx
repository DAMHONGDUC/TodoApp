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

    return res;
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
      if (action.payload) showAndroidToast('Update status successfully');
    });
    builder.addCase(changeTaskStatusAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
    });
    builder.addCase(changeTaskStatusAction.pending, state => {
      showAndroidToast('Update status fail');
    });
  },
});

export const {setTasks} = categorySlide.actions;

export default categorySlide.reducer;
