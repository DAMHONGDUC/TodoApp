import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uid: null,
};

export const appSlide = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const {setUid} = appSlide.actions;

export default appSlide.reducer;
