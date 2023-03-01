import {useRoute} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {TaskDetailScreenRouteProp} from 'navigation/types';

export default function TaskDetailScreen(): JSX.Element {
  const route = useRoute<TaskDetailScreenRouteProp>();
  const {categoryId} = route.params;

  return (
    <View>
      <Text>Task detail screen {categoryId}</Text>
    </View>
  );
}
