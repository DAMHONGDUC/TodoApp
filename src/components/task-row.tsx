import {COLORS} from 'constant/theme';
import {TASK_DONE} from 'constant/values';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ITask} from 'services/task/task-model';
import {converTimeStampToDateTime} from 'helper';

type Props = {
  data: ITask;
};

export default function TaskRow({data}: Props) {
  const [color, setColor] = useState('');
  const [borderColor, setBorderColor] = useState('');

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
  }, [data]);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          borderColor: borderColor,
        },
      ]}>
      <View
        style={[
          styles.circle,
          {
            backgroundColor: borderColor,
          },
        ]}></View>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.time}>
        {converTimeStampToDateTime(data.createdAt)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.taskDoneColor,
    marginBottom: 20,
    height: 100,
    width: '100%',
    padding: 10,
    borderColor: COLORS.taskDoneColorBorder,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  time: {
    color: COLORS.title,
    fontSize: 13,
  },
  circle: {
    backgroundColor: COLORS.primary,
    height: 15,
    width: 15,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 7,
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
});
