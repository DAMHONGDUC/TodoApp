import {configureStore} from '@reduxjs/toolkit';
import authSlide from 'redux/slices/auth-slide';

export const store = configureStore({
  reducer: {
    auth: authSlide,
  },
});
