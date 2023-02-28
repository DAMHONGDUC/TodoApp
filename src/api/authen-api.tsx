import axios from 'axios';
import {showAlert} from 'helper';

const BASE_URL = 'https://63fd6b32859df29986cebd74.mockapi.io/api/v1';

export const SignIn = async (username: string, password: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/1`);

    if (res?.data) {
      const userInfo = res.data;

      return userInfo.email === username && userInfo.password === password
        ? userInfo
        : null;
    }
  } catch (err) {
    showAlert('Something wrong, try later !');
  }
};
