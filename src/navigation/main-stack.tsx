import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './bottom-tab-stack';

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
}
