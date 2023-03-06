import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from 'screens/authen/sign-in-screen';
import SignUpScreen from 'screens/authen/sign-up-screen';
import {AuthenStackNavigatorParamList} from './types';

const Stack = createNativeStackNavigator<AuthenStackNavigatorParamList>();

export default function AuthenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
