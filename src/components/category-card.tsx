import {COLORS} from 'constant/theme';
import {array, number, string} from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

// type Props = {
//   props: {
//     id: number;
//     name: string;
//     tasks: number[];
//     color: string;
//   };
// };

export default function CategoryCard({name, tasks, color}: any) {
  return (
    <View style={[styles.container]}>
      <Text>{name}</Text>
      <Text>{tasks}</Text>
      <Text>{color}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey,
    height: 120,
    width: 120,
    marginTop: 20,
    marginBottom: 20,
  },
});
