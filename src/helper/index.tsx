import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
import {ICategory} from 'services/category/category-model';
import {ITask} from 'services/task/task-model';
import {
  TaskFilterOption,
  DateFilterOption,
  defaultTaskOption,
} from 'constant/values';
import {Camera} from 'react-native-vision-camera';

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

export const getAllTaskDone = (allCategory: ICategory[]) => {
  const res = allCategory.reduce((total, e) => total + e.done, 0);

  return res || 0;
};

export const getAllTaskProgress = (allCategory: ICategory[]) => {
  const res = allCategory.reduce((total, e) => total + e.progress, 0);

  return res || 0;
};

export const converTimeStampToDateTime = (timeStamp: number | Date) => {
  const date = new Date(timeStamp);

  const dateConvert =
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ', ' +
    date.toDateString();

  return dateConvert || '';
};

export const filterData = (
  tasks: ITask[],
  dateOption: Date,
  taskOption: number,
) => {
  const filterByStatus = filterDataByStatus(tasks, taskOption);

  return filterDataByDate(filterByStatus, dateOption);
};

export const filterDataByStatus = (tasks: ITask[], taskOption: number) => {
  return taskOption === defaultTaskOption
    ? tasks
    : tasks.filter(e => e.status === TaskFilterOption[taskOption]);
};

export const filterDataByDate = (tasks: ITask[], dateOption: Date) => {
  return tasks.filter(e => isDateEqual(dateOption, e.createdAt));
};

export const isDateEqual = (date1: Date, date2: number | Date) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const [month1, day1, year1] = [d1.getMonth(), d1.getDate(), d1.getFullYear()];
  const [month2, day2, year2] = [d2.getMonth(), d2.getDate(), d2.getFullYear()];

  return year1 === year2 && month1 === month2 && day1 === day2;
};

export const requestCameraPermission = async () => {
  const newCameraPermission = await Camera.requestCameraPermission();

  return newCameraPermission;
};

export const getCameraPermission = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();

  return cameraPermission;
};
