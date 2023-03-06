import {useRoute, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  TaskDetailScreenRouteProp,
  MainStackNavigationProp,
} from 'navigation/types';
import {COLORS} from 'constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskRow from 'screens/task-detail/task-row';
import {ITask} from 'services/task/task-model';
import SelectDropdown from 'react-native-select-dropdown';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {
  deleteTaskAction,
  getTaskByCategoryIdAction,
} from 'redux/slices/task-slice';
import LoadingComponent from 'components/loading-component';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListTaskNavigationProp} from 'navigation/types';
import {CREATE_TASK_MODE} from 'constant/values';
import {
  TaskFilterOption,
  DateFilterOption,
  defaultTaskOption,
  defaultDateOption,
} from 'constant/values';
import {filterData} from 'helper';

type Props = {
  item: ITask;
  index: number;
};

export default function ListTasksScreen(): JSX.Element {
  const route = useRoute<TaskDetailScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const navigation = useNavigation<MainStackNavigationProp>();
  const [taskOption, setTaskOption] = useState(defaultTaskOption);
  const [dateOption, setDateOption] = useState(defaultDateOption);
  const [showingData, setShowingData] = useState([]);
  const dispatch = useAppDispatch();
  const {tasks, isLoading} = useAppSelector(state => state.task);
  const navigation2 = useNavigation<ListTaskNavigationProp>();

  const handleBackButton = () => {
    navigation.pop();
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      await dispatch(getTaskByCategoryIdAction({categoryId: categoryId}));
    };

    fetchAllCategory();
  }, [dispatch, categoryId]);

  useEffect(() => {
    tasks && setShowingData(filterData(taskOption, dateOption, tasks));
  }, [taskOption, dateOption, tasks]);

  const renderItem = ({item}: Props) => {
    return <TaskRow data={item}></TaskRow>;
  };

  const deleteRow = (id: string) => {
    dispatch(deleteTaskAction({id: id}));
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View style={styles.rowBack}>
        {/* <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(props.index)}>
          <Ionicons name={'close'} color={'#6aa84f'} size={33}></Ionicons>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowData.item.id)}>
          <MaterialCommunityIcons
            name={'delete'}
            color={COLORS.primary}
            size={30}></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    );
  };

  const handleCreateButton = () => {
    navigation2.navigate('TaskDetailScreen', {
      mode: CREATE_TASK_MODE,
      categoryId: categoryId,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>{categoryName} tasks</Text>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateButton}>
          <Ionicons name="add" color={COLORS.black} size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.dropDownSection}>
        <View style={styles.dropDown}>
          <SelectDropdown
            data={TaskFilterOption}
            onSelect={(selectedItem, index) => {
              setTaskOption(index);
            }}
            defaultValue={TaskFilterOption[defaultTaskOption]}
            rowStyle={styles.rowStyle}
            rowTextStyle={styles.rowTextStyle}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
          />
        </View>
        <View style={styles.dropDown}>
          <SelectDropdown
            data={DateFilterOption}
            onSelect={(selectedItem, index) => {
              setDateOption(index);
            }}
            defaultValue={DateFilterOption[defaultDateOption]}
            rowStyle={styles.rowStyle}
            rowTextStyle={styles.rowTextStyle}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
          />
        </View>
      </View>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        // <FlatList
        //   data={showingData}
        //   renderItem={renderItem}
        //   keyExtractor={item => item.id.toString()}
        //   ListEmptyComponent={
        //     <Text style={styles.notiText}>{'You have no task'}</Text>
        //   }></FlatList>
        <View style={styles.container2}>
          <SwipeListView
            data={showingData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            // rightOpenValue={-100}
            rightOpenValue={-60}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            ListEmptyComponent={
              <Text style={styles.notiText}>{'You have no task'}</Text>
            }
          />
        </View>
      )}
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
  container2: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitle: {
    color: COLORS.black,
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 30,
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
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    borderRadius: 10,
  },
  backRightBtnLeft: {
    right: 60,
  },
  backRightBtnRight: {
    right: 10,
  },
  createButton: {
    position: 'absolute',
    right: 0,
  },
  dropDownSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
