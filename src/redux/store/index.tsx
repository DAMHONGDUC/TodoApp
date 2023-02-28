import {configureStore} from '@reduxjs/toolkit';
import authSlide from 'redux/slices/auth-slide';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import taskSlide from 'redux/slices/task-slide';

export const store = configureStore({
  reducer: {
    auth: authSlide,
    task: taskSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
