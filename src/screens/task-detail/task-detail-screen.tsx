import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ListTaskRouteProp} from 'navigation/types';

export function TaskDetailScreen() {
  const route = useRoute<ListTaskRouteProp>();
  const {id, name, description, status} = route.params;

  return (
    <View>
      <Text>hello</Text>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{status}</Text>
    </View>
  );
}
