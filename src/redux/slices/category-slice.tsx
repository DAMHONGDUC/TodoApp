import {showAndroidToast} from 'helper';
import {CategoryService} from 'services/category/category-service';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategory} from 'services/category/category-model';

interface ICategoryStore {
  allCategory: ICategory[];
  isLoading: boolean;
}

const initialState: ICategoryStore = {
  allCategory: [],
  isLoading: false,
};

export const getAllCategoryAction = createAsyncThunk(
  'category/getAllCategory',
  async _thunkApi => {
    const res = await CategoryService.getAllCategory();

    return res;
  },
);

export const categorySlide = createSlice({
  name: 'category',
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

export const {setAllCategory} = categorySlide.actions;

export default categorySlide.reducer;
