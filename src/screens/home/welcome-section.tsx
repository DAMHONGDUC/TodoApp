import {View, Text, StyleSheet, Image} from 'react-native';
import ProgressBar from 'components/progress-bar';
import {COLORS} from 'constant/theme';
import {useAppSelector} from 'redux/store';
import {getAllTaskDone, getAllTaskProgress} from 'helper';
import {useEffect, useState} from 'react';

export default function WelcomeSection(): JSX.Element {
  const {allCategory} = useAppSelector(state => state.category);
  const [taskDone, setTaskDone] = useState(0);
  const [allTask, setAllTask] = useState(0);

  useEffect(() => {
    const done = getAllTaskDone(allCategory);
    const progress = getAllTaskProgress(allCategory);

    setTaskDone(done);
    setAllTask(done + progress);
  }, [allCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={[styles.mainText, {fontSize: 25}]}>Hurrah !</Text>
        <Text style={[styles.mainText, {fontSize: 20}]}>You almost here</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>
          {taskDone} out of {allTask} task are completed
        </Text>
        <ProgressBar
          completed={
            allTask === 0 ? 0 : (taskDone / allTask) * 100
          }></ProgressBar>
      </View>
      <Image style={styles.image} source={require('assets/rocket.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(236,195,165, 0.4)',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  column: {
    flexDirection: 'column',
  },
  mainText: {
    color: COLORS.blueOcean,
    fontWeight: '500',
  },
  image: {
    height: 120,
    width: 120,
    position: 'absolute',
    right: 0,
    borderRadius: 25,
    bottom: 40,
  },
  text: {
    color: COLORS.black,
    marginBottom: 5,
  },
});
