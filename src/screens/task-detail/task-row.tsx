import {COLORS} from 'constant/theme';
import {TASK_DONE, UPDATE_TASK_MODE} from 'constant/values';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ITask} from 'services/task/task-model';
import {converTimeStampToDateTime} from 'helper';
import CheckBox from '@react-native-community/checkbox';
import {useAppDispatch} from 'redux/store';
import {changeTaskStatusAction} from 'redux/slices/task-slice';
import {ListTaskNavigationProp} from 'navigation/types';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: ITask;
};

export default function TaskRow({data}: Props) {
  const navigation = useNavigation<ListTaskNavigationProp>();

  const [color, setColor] = useState<string>('');
  const [borderColor, setBorderColor] = useState<string>('');
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);

  const dispacth = useAppDispatch();

  useEffect(() => {
    setColor(
      data.status === TASK_DONE
        ? COLORS.taskDoneColor
        : COLORS.taskProgressColor,
    );
    setBorderColor(
      data.status === TASK_DONE
        ? COLORS.taskDoneColorBorder
        : COLORS.taskProgressColorBorder,
    );

    setToggleCheckBox(data.status === TASK_DONE);
  }, [data]);

  const onChangeTaskStatus = (newValue: boolean) => {
    setToggleCheckBox(newValue);

    dispacth(
      changeTaskStatusAction({
        status: newValue ? 'Done' : 'Progress',
        id: data.id,
      }),
    );
  };

  const navToTaskDetail = () => {
    navigation.navigate('TaskDetailScreen', {
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: data.createdAt,
      mode: UPDATE_TASK_MODE,
    });
  };

  return (
    <View>
      <TouchableHighlight
        onPress={navToTaskDetail}
        underlayColor={COLORS.white}
        style={styles.container1}>
        <View
          style={[
            styles.container2,
            {
              backgroundColor: color,
              borderColor: borderColor,
            },
          ]}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <Text style={styles.time}>
            {converTimeStampToDateTime(data.createdAt)}
          </Text>
        </View>
      </TouchableHighlight>
      <View style={styles.checkBox}>
        <CheckBox
          value={toggleCheckBox}
          onValueChange={newValue => onChangeTaskStatus(newValue)}></CheckBox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  container2: {
    backgroundColor: COLORS.taskDoneColor,
    height: 100,
    width: '100%',
    padding: 10,
    borderColor: COLORS.taskDoneColorBorder,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  time: {
    color: COLORS.title,
    fontSize: 13,
  },
  name: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 17,
  },
  description: {
    color: COLORS.black,
    fontSize: 14,
  },
  checkBox: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
});
