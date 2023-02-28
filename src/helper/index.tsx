import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const setAsyncStorageData = async (storeKey: string, value: string) => {
  try {
    await AsyncStorage.setItem(storeKey, value);
  } catch (e) {}
};

export const getAsyncStorageData = async (storeKey: string) => {
  try {
    const value = await AsyncStorage.getItem(storeKey);

    return value;
  } catch (e) {}
};

export const showAlert = (err: string) => {
  Alert.alert('Notification', err, [{text: 'OK'}]);
};
