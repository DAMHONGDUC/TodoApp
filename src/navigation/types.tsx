import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootStackNavigatorParamList = {
  MainStack: MainStackNavigatorParamList;
  AuthenStack: AuthenStackNavigatorParamList;
};

export type MainStackNavigatorParamList = {
  BottomTabStack: BottomTabNavigatorParamList;
  TaskDetailScreen: {categoryId: number};
};

export type AuthenStackNavigatorParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type BottomTabNavigatorParamList = {
  HomeScreen: undefined;
  UserDetailScreen: undefined;
};

export type MainStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackNavigatorParamList, 'TaskDetailScreen'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'HomeScreen'>
>;

export type TaskDetailScreenRouteProp = RouteProp<
  MainStackNavigatorParamList,
  'TaskDetailScreen'
>;
