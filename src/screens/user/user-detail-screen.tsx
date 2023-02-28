import {View, Text, Button} from 'react-native';
import {logoutAction} from 'redux/slices/auth-slide';
import {useAppDispatch} from 'redux/store';

export default function UserDetailScreen() {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <View>
      <Text>hello user detail screen</Text>
      <Button onPress={handleSignOut} title="Sign Out"></Button>
    </View>
  );
}
