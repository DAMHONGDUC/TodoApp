import {COLORS} from 'constant/theme';
import {View, Text, StyleSheet} from 'react-native';
import CategoryCard from 'components/category-card';
import {useAppSelector} from 'redux/store';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationProp} from 'navigation/types';

export default function BodySection(): JSX.Element {
  const {allCategory} = useAppSelector(state => state.category);
  const navigation = useNavigation<MainStackNavigationProp>();

  const navToTaskDetail = (categoryId: string, categoryName: string) => {
    navigation.navigate('TaskDetailScreen', {
      categoryId: categoryId,
      categoryName: categoryName,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Progress</Text>
      <View style={styles.body}>
        {allCategory.map(e => (
          <CategoryCard
            key={e.id}
            data={e}
            onPress={() =>
              navToTaskDetail(e.id.toString(), e.name)
            }></CategoryCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    height: 360,
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
