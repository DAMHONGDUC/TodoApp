import axios from 'axios';
import {showAlert} from 'helper';

const BASE_URL = 'https://63fd6b32859df29986cebd74.mockapi.io/api/v1';

export const getAPI = async (endpoint: string) => {
  try {
    const res = await axios.get(BASE_URL + endpoint);

    return res;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};
