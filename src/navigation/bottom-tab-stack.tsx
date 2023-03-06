import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from 'constant/theme';
import HomeScreen from 'screens/home/home-screen';
import UserDetailScreen from 'screens/user/user-detail-screen';
import {BottomTabNavigatorParamList} from './types';

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

export default function BottomTabStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          elevation: 0,
          backgroundColor: COLORS.tabBarColor,
        },
        tabBarItemStyle: {paddingVertical: 5},
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'home'} color={color} size={size - 2} />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
      <BottomTab.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'user'} color={color} size={size - 2} />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </BottomTab.Navigator>
  );
}
