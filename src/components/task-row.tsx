import {COLORS} from 'constant/theme';
import {TASK_DONE} from 'constant/values';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ITask} from 'services/task/task-model';
import {converTimeStampToDateTime} from 'helper';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  data: ITask;
};

export default function TaskRow({data}: Props) {
  const [color, setColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
  };

  return (
    <TouchableHighlight
      onPress={() => console.log("go to task's screen")}
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
        <View style={styles.checkBox}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => onChangeTaskStatus(newValue)}></CheckBox>
        </View>

        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.time}>
          {converTimeStampToDateTime(data.createdAt)}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container1: {marginBottom: 10, marginTop: 10, borderRadius: 20},
  container2: {
    backgroundColor: COLORS.taskDoneColor,
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
  name: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 17,
  },
  description: {
    color: COLORS.black,
    fontSize: 14,
  },
  checkBox: {position: 'absolute', right: 10, top: 30},
});
