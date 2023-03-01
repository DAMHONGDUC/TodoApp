import axios from 'axios';
import {showAlert} from 'helper';
import Config from 'react-native-config';

const BASE_URL1 = Config.BASE_URL1;
const BASE_URL2 = Config.BASE_URL2;

export const getAPI = async (endpoint: string) => {
  try {
    const res = await axios.get(BASE_URL1 + endpoint);

    return res;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};

export const getAPI2 = async (endpoint: string) => {
  try {
    const res = await axios.get(BASE_URL2 + endpoint);

    return res;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};

export const putAPI2 = async (endpoint: string, body: object) => {
  try {
    const res = await axios.put(BASE_URL2 + endpoint, body);

    return res?.status === 200;
  } catch (err) {
    showAlert(`Something wrong, ${err}`);
  }
};
