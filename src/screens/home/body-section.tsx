import {COLORS} from 'constant/theme';
import {View, Text, StyleSheet} from 'react-native';
import CategoryCard from 'components/category-card';

const data = [
  {
    id: 1,
    name: 'Personal',
    tasks: [1, 2],
    color: '#0E1AEF',
  },
  {
    id: 2,
    name: 'Work',
    tasks: [3, 4],
    color: COLORS.primary,
  },
  {
    id: 3,
    name: 'Personal',
    tasks: [1, 2],
    color: '#0E1AEF',
  },
  {
    id: 4,
    name: 'Work',
    tasks: [3, 4],
    color: COLORS.primary,
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
    marginTop: 20,
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
  },
});
