import {configureStore} from '@reduxjs/toolkit';
import authSlide from 'redux/slices/auth-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import categorySlide from 'redux/slices/category-slice';
import taskSlice from 'redux/slices/task-slice';

export const store = configureStore({
  reducer: {
    auth: authSlide,
    category: categorySlide,
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
