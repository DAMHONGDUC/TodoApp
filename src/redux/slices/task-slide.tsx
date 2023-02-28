import {showAndroidToast} from 'helper';
import {CategoryService} from 'services/category/category-model';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface ITaskStore {
  allCategory: object[] | null;
  isLoading: boolean;
}

const initialState: ITaskStore = {
  allCategory: null,
  isLoading: false,
};

export const getAllCategoryAction = createAsyncThunk(
  'task/getAllCategory',
  async _thunkApi => {
    const res = await CategoryService.getAllCategory();

    return res;
  },
);

export const taskSlide = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCategoryAction.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCategoryAction.rejected, (state, action) => {
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
      state.isLoading = false;
    });
    builder.addCase(getAllCategoryAction.pending, state => {
      state.isLoading = true;
    });
  },
});

export const {setAllCategory} = taskSlide.actions;

export default taskSlide.reducer;
