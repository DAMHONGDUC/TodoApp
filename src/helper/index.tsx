import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';

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

export const showAndroidToast = (text: string) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

export const changeOpacityRGBA = (color: string, opacity: number) => {
  let arr = color.split(',');

  arr.splice(3, 1, opacity + ')');

  return arr.join();
};

export const getAllTaskDone = (allCategory: object[]) => {
  const res = allCategory.reduce((total, e) => total + e.done, 0);

  return res || 0;
};

export const getAllTaskProgress = (allCategory: object[]) => {
  const res = allCategory.reduce((total, e) => total + e.progress, 0);

  return res || 0;
};
