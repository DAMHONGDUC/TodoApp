import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isBusy: false,
};

export const authSlide = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsBusy: (state, action) => {
      state.isBusy = action.payload;
    },
  },
});

export const {setUserInfo, setIsBusy} = authSlide.actions;

export default authSlide.reducer;
