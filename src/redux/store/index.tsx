import {configureStore} from '@reduxjs/toolkit';
import authSlide from 'redux/slices/auth-slide';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
