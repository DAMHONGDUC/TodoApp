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
import {TaskFilterOption, defaultTaskOption} from 'constant/values';
import {filterData, isDateEqual} from 'helper';
import CalendarStrip from 'react-native-calendar-strip';

type Props = {
  item: ITask;
  index: number;
};

export default function ListTasksScreen(): JSX.Element {
  const route = useRoute<TaskDetailScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const navigation = useNavigation<MainStackNavigationProp>();
  const [taskOption, setTaskOption] = useState(defaultTaskOption);
  const [dateOption, setDateOption] = useState();
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
    tasks &&
      setShowingData(
        dateOption ? filterData(tasks, dateOption, taskOption) : tasks,
      );
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

  const handleDateSelected = (date: Date) => {
    // console.log(isDateEqual(dateOption, date));

    setDateOption(date);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>{categoryName} tasks</Text>

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

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateButton}>
          <Ionicons name="add" color={COLORS.black} size={30} />
        </TouchableOpacity>
      </View>

      <CalendarStrip
        scrollable
        style={styles.calendar}
        calendarColor={COLORS.white}
        calendarHeaderStyle={styles.calendarHeader}
        dateNumberStyle={[styles.dateNumberText, {color: COLORS.black}]}
        dateNameStyle={[styles.dateNameText, {color: COLORS.black}]}
        iconContainer={{flex: 0.1}}
        highlightDateNumberStyle={[
          styles.dateNumberText,
          {color: COLORS.primary},
        ]}
        highlightDateNameStyle={[styles.dateNameText, {color: COLORS.primary}]}
        onDateSelected={date => handleDateSelected(date)}
        // selectedDate={new Date()}
      />

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.container2}>
          <SwipeListView
            data={showingData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
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
    marginLeft: 20,
    marginRight: 20,
  },
  notiText: {
    color: COLORS.primary,
  },
  rowStyle: {backgroundColor: COLORS.white},
  rowTextStyle: {fontSize: 13},
  buttonStyle: {
    width: 100,
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  buttonTextStyle: {fontSize: 13},
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
  calendar: {
    height: 120,
    paddingTop: 20,
    paddingBottom: 20,
  },
  calendarHeader: {
    color: COLORS.primary,
    fontSize: 15,
    marginBottom: 10,
  },
  dateNumberText: {fontSize: 14},
  dateNameText: {fontSize: 10},
});
