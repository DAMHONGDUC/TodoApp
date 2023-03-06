import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './bottom-tab-stack';
import ListTasksScreen from 'screens/task-detail/list-tasks-screen';
import {MainStackNavigatorParamList} from './types';
import {TaskDetailScreen} from 'screens/task-detail/task-detail-screen';
import CameraScreen from 'screens/camera/camera-screen';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListTasksScreen"
        component={ListTasksScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
