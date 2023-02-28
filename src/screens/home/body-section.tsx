import {COLORS} from 'constant/theme';
import {View, Text, StyleSheet} from 'react-native';
import CategoryCard from 'components/category-card';

const data = [
  {
    id: 1,
    name: 'Personal',
    tasks: [1, 2],
    color: 'rgba(14,26,239, 1)',
    done: 7,
    progress: 10,
  },
  {
    id: 2,
    name: 'Work',
    tasks: [3, 4],
    color: 'rgba(235,69,95, 1)',
    done: 3,
    progress: 10,
  },
  {
    id: 3,
    name: 'Health',
    tasks: [1, 2],
    color: 'rgba(58,152,185, 1)',
    done: 10,
    progress: 2,
  },
  {
    id: 4,
    name: 'Social',
    tasks: [3, 4],
    color: 'rgba(249,148,23, 1)',
    done: 6,
    progress: 10,
  },
];

export default function BodySection(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Progress</Text>
      <View style={styles.body}>
        {data.map(e => (
          <CategoryCard key={e.id} data={e}></CategoryCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    height: 400,
  },
  title: {
    color: COLORS.black,
    fontSize: 25,
    fontWeight: '500',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
