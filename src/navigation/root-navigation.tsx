import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './main-stack';
import AuthenStack from './authen-stack';
import {AuthContext, USER_ID} from 'constant/values';
import {setAsyncStorageData, getAsyncStorageData} from 'helper';

const RootStack = createNativeStackNavigator();

export default function RootNavigation(): JSX.Element {
  const [isSignedIn, setisSignedIn] = useState(false);

  useEffect(() => {
    const setUpAsyncStorageData = async () => {
      const userId = await getAsyncStorageData(USER_ID);

      if (userId) {
        setisSignedIn(true);
      }
    };

    setUpAsyncStorageData();
  }, []);

  const handleAfterSignIn = async () => {
    setisSignedIn(true);
  };

  const handleAfterSignOut = async () => {
    setisSignedIn(false);

    await setAsyncStorageData(USER_ID, '');
  };

  return (
    <AuthContext.Provider
      value={{
        handleAfterSignIn,
        handleAfterSignOut,
      }}>
      <NavigationContainer>
        <RootStack.Navigator>
          <>
            {isSignedIn ? (
              <RootStack.Screen
                name="MainStack"
                component={MainStack}
                options={{headerShown: false}}
              />
            ) : (
              <RootStack.Screen
                name="AuthenStack"
                component={AuthenStack}
                options={{headerShown: false}}
              />
            )}
          </>
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
