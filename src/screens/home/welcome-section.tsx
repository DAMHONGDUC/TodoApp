import {View, Text, StyleSheet} from 'react-native';
import ProgressBar from 'components/progress-bar';
import {COLORS} from 'constant/theme';

export default function WelcomeSection(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={[styles.mainText, {fontSize: 25}]}>Hurrah !</Text>
        <Text style={[styles.mainText, {fontSize: 20}]}>You almost here</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>20 out of 26 task are completed</Text>
        <ProgressBar completed={(20 / 26) * 100}></ProgressBar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(236,195,165, 0.5)',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  mainText: {
    color: COLORS.blueOcean,
    fontWeight: '500',
  },
  image: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    borderRadius: 25,
  },
  text: {
    color: COLORS.black,
    marginBottom: 5,
  },
});
