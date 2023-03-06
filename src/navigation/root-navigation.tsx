import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './main-stack';
import AuthenStack from './authen-stack';
import {USER_ID} from 'constant/values';
import {getAsyncStorageData} from 'helper';
import {useAppSelector} from 'redux/store';
import LoadingComponent from 'components/loading-component';
import {useDispatch} from 'react-redux';
import {setIsLogged} from 'redux/slices/auth-slice';
import {RootStackNavigatorParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

export default function RootNavigation(): JSX.Element {
  const {isAuthLoading, isLogged} = useAppSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setUpAsyncStorageData = async () => {
      const userId = await getAsyncStorageData(USER_ID);

      dispatch(setIsLogged(userId ? true : false));
    };

    setUpAsyncStorageData();
  }, [dispatch]);

  if (isAuthLoading) {
    return <LoadingComponent />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <>
          {isLogged ? (
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
  );
}
