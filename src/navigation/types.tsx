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
  ListTasksScreen: {categoryId: string; categoryName: string};
  TaskDetailScreen: {
    id: string;
    name: string;
    description: string;
    status: string;
  };
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
  NativeStackNavigationProp<MainStackNavigatorParamList, 'ListTasksScreen'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'HomeScreen'>
>;

export type ListTaskNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackNavigatorParamList, 'ListTasksScreen'>,
  NativeStackNavigationProp<MainStackNavigatorParamList, 'TaskDetailScreen'>
>;

export type TaskDetailScreenRouteProp = RouteProp<
  MainStackNavigatorParamList,
  'ListTasksScreen'
>;

export type ListTaskRouteProp = RouteProp<
  MainStackNavigatorParamList,
  'TaskDetailScreen'
>;
