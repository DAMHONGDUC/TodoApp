import axios from 'axios';
import {showAlert} from 'helper';
//import Config from 'react-native-config';

const BASE_URL1 = 'https://63fd6b32859df29986cebd74.mockapi.io/api/v1'; //Config.BASE_URL1;

export const getAPI = async (endpoint: string) => {
  try {
    // const url = BASE_URL1 + endpoint;
    // console.log(url);
    const res = await axios.get(BASE_URL1 + endpoint);

    return res;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};
