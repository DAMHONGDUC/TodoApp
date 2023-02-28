import axios from 'axios';
import {showAlert} from 'helper';
import Config from 'react-native-config';

const BASE_URL1 = Config.BASE_URL1;

export const getAPI = async (endpoint: string) => {
  try {
    const res = await axios.get(BASE_URL1 + endpoint);

    return res;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};
