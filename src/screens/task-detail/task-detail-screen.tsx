import {
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ListTaskNavigationProp, ListTaskRouteProp} from 'navigation/types';
import {COLORS} from 'constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {TASK_DONE, TASK_PROGRESS} from 'constant/values';
import {converTimeStampToDateTime} from 'helper';

export function TaskDetailScreen() {
  const route = useRoute<ListTaskRouteProp>();
  const {id, name, description, status, createdAt} = route.params;
  const navigation = useNavigation<ListTaskNavigationProp>();
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(status);

  const handleBackButton = () => {
    navigation.pop();
  };

  const changeStatus = (isChecked: boolean) => {
    setNewStatus(isChecked ? TASK_DONE : TASK_PROGRESS);
  };

  const handleUpdateTask = () => {
    const newTask = {
      id: id,
      name: newName,
      description: newDescription,
      status: newStatus,
      createdAt: new Date().valueOf(),
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUpdateTask}>
          <Ionicons name="save" color={COLORS.primary} size={35} />
        </TouchableOpacity>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusText}>{newStatus}</Text>
        <BouncyCheckbox
          onPress={changeStatus}
          fillColor={
            newStatus === TASK_DONE
              ? COLORS.taskDoneColorBold
              : COLORS.taskProgressColorBorder
          }
          unfillColor="#FFFFFF"
          isChecked={status === TASK_DONE}
        />
      </View>

      <Text style={styles.modify}>
        Last modified: {converTimeStampToDateTime(createdAt)}
      </Text>

      <TextInput
        style={styles.name}
        onChangeText={setNewName}
        value={newName}
        placeholder="Task name"
      />

      <TextInput
        style={styles.description}
        onChangeText={setNewDescription}
        value={newDescription}
        placeholder="Task description"
        multiline
      />
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
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  name: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 30,
    marginTop: 30,
  },
  description: {
    color: COLORS.black,
    fontSize: 20,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 10,
    fontSize: 15,
    color: COLORS.black,
  },
  modify: {
    marginTop: 15,
    color: COLORS.title,
  },
});
