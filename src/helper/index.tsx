import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
import {ICategory} from 'services/category/category-model';
import {ITask} from 'services/task/task-model';
import {
  TaskFilterOption,
  DateFilterOption,
  defaultDateOption,
  defaultTaskOption,
} from 'constant/values';

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

export const converTimeStampToDateTime = (timeStamp: number) => {
  const date = new Date(timeStamp);

  const dateConvert =
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ', ' +
    date.toDateString();

  return dateConvert || '';
};

const isToday = (inputDate: number) => {
  const today = new Date();
  const date = new Date(inputDate);

  console.log(today.toDateString());
  console.log(date.toDateString());

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

const isYesterday = (inputDate: number) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(inputDate);

  if (yesterday.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

const isLastWeek = (inputDate: number) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const date = new Date(inputDate);
  const today = new Date();

  console.log(date, date.toDateString() < today.toDateString());
  if (
    date.toDateString() >= lastWeek.toDateString()
    //&& date.toDateString() <= today.toDateString()
  ) {
    return true;
  }

  return false;
};

export const filterData = (
  taskOption: number,
  dateOption: number,
  tasks: ITask[],
) => {
  let result: ITask[] = [];

  // taskOption
  result =
    taskOption === defaultTaskOption
      ? tasks
      : tasks.filter(e => e.status === TaskFilterOption[taskOption]);

  // dateOption

  switch (DateFilterOption[dateOption]) {
    case DateFilterOption[0]:
      result = result.filter(e => isToday(e.createdAt));
      break;
    case DateFilterOption[1]:
      result = result.filter(e => isYesterday(e.createdAt));
      break;
    case DateFilterOption[2]:
      result = result.filter(e => isLastWeek(e.createdAt));
      break;
    case DateFilterOption[3]:
      // do nothing
      break;
  }

  return result;
};
