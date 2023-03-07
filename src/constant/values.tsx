import RNFS from 'react-native-fs';

export const USER_ID = 'USER_ID';

export const TASK_DONE = 'Done';

export const TASK_PROGRESS = 'Progress';

export const UPDATE_TASK_MODE = 1;

export const CREATE_TASK_MODE = 2;

export const AFTER_CREATE_TASK_MODE = 3;

export const TASK_TABLE = 'tasks';

export const TaskFilterOption: string[] = ['Done', 'Progress', 'All'];
export const defaultTaskOption = 2;

export const DateFilterOption: string[] = [
  'Today',
  'Yesterday',
  'Last Week',
  'All',
];
export const defaultDateOption = 3;

export const CAMERA_AUTHORIZED = 'authorized';

export const CAMERA_NOT_DETERMINED = 'not-determined';

export const CAMERA_DENIED = 'denied';

export const CAMERA_PERMISSION = 'CAMERA_PERMISSION';

export const IMAGE_PATH = RNFS.DocumentDirectoryPath + '/Images';
