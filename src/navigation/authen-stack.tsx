import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from 'screens/authen/sign-in-screen';
import SignUpScreen from 'screens/authen/sign-up-screen';

const Stack = createNativeStackNavigator();

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
