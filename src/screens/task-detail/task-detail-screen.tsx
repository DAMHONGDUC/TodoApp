import {useRoute, useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  TaskDetailScreenRouteProp,
  MainStackNavigationProp,
} from 'navigation/types';
import {COLORS} from 'constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {converTimeStampToDateTime} from 'helper';
import TaskRow from 'components/task-row';
import {ITask} from 'services/task/task-model';
import SelectDropdown from 'react-native-select-dropdown';
import {useEffect, useState} from 'react';

const data = [
  {
    id: 1,
    category: 1,
    name: 'task 1',
    description: 'playing game 1',
    createdAt: 1677652762470,
    status: 'Progress',
  },
  {
    id: 2,
    category: 1,
    name: 'task 2',
    description: 'playing game 2',
    createdAt: 1677652762470,
    status: 'Progress',
  },
  {
    id: 3,
    category: 1,
    name: 'task 3',
    description: 'playing game 3',
    createdAt: 1677652762470,
    status: 'Progress',
  },
  {
    id: 4,
    category: 1,
    name: 'task 4',
    description: 'playing game 4',
    createdAt: 1677652762470,
    status: 'Done',
  },
  {
    id: 5,
    category: 1,
    name: 'task 5',
    description: 'playing game 5',
    createdAt: 1677652762470,
    status: 'Progress',
  },
  {
    id: 6,
    category: 1,
    name: 'task 6',
    description: 'playing game 6',
    createdAt: 1677652762470,
    status: 'Progress',
  },
  {
    id: 7,
    category: 1,
    name: 'task 7',
    description: 'playing game 7',
    createdAt: 1677652762470,
    status: 'Done',
  },
];

const options: string[] = ['Done', 'Progress', 'All'];
const defaultOption = 2;

type Props = {
  item: ITask;
  index: number;
};

export default function TaskDetailScreen(): JSX.Element {
  const route = useRoute<TaskDetailScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const navigation = useNavigation<MainStackNavigationProp>();
  const [option, setOption] = useState(defaultOption);
  const [showingData, setShowingData] = useState([]);

  const handleBackButton = () => {
    navigation.pop();
  };

  useEffect(() => {
    data &&
      setShowingData(
        option === defaultOption
          ? data
          : data.filter(e => e.status === options[option]),
      );
  }, [option, data]);

  const renderItem = ({item}: Props) => {
    return <TaskRow data={item}></TaskRow>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>{categoryName} tasks</Text>
      </View>
      <View style={styles.dropDown}>
        <SelectDropdown
          data={options}
          onSelect={(selectedItem, index) => {
            setOption(index);
          }}
          defaultValue={options[defaultOption]}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
      </View>
      <FlatList
        data={showingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.notiText}>{'You have no task'}</Text>
        }></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitle: {
    color: COLORS.black,
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 20,
  },
  notiText: {
    color: COLORS.primary,
  },
  rowStyle: {backgroundColor: COLORS.white},
  rowTextStyle: {fontSize: 14},
  buttonStyle: {
    width: 150,
    borderColor: COLORS.black,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  buttonTextStyle: {fontSize: 14},
  dropDown: {marginBottom: 15, marginTop: 20},
});
