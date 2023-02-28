import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {showAndroidToast, setAsyncStorageData} from 'helper';
import {USER_ID} from 'constant/values';
import {ILoginRequest} from 'services/auth/auth-model';
import {AuthService} from 'services/auth/auth-service';
interface IAuthStore {
  userInfo: object | undefined;
  isAuthLoading: boolean;
  isLogged: boolean;
}

const initialState: IAuthStore = {
  userInfo: undefined,
  isAuthLoading: false,
  isLogged: false,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (input: ILoginRequest, _thunkApi) => {
    const userInfo = await AuthService.signIn({
      username: input.username,
      password: input.password,
    });

    return userInfo;
  },
);

export const logoutAction = createAsyncThunk('auth/logout', async _thunkApi => {
  await setAsyncStorageData(USER_ID, '');

  return true;
});

export const authSlide = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogged = true;
        state.userInfo = action.payload;
      } else {
        showAndroidToast('Username or Password incorrect, try again !');
      }
      state.isAuthLoading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isAuthLoading = false;
      showAndroidToast(action.error?.message ?? 'Something Wrong, try later !');
    });
    builder.addCase(loginAction.pending, state => {
      state.isAuthLoading = true;
    });
    builder.addCase(logoutAction.fulfilled, state => {
      state.isLogged = false;
      state.userInfo = undefined;
    });
  },
});

export const {setUserInfo, setIsLogged} = authSlide.actions;

export default authSlide.reducer;
