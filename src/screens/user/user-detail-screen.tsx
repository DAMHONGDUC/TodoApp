import {AuthContext} from 'constant/values';
import {useContext} from 'react';
import {View, Text, Button} from 'react-native';

export default function UserDetailScreen() {
  const {handleAfterSignOut} = useContext(AuthContext);
  const handleSignOut = () => {
    handleAfterSignOut();
  };

  return (
    <View>
      <Text>hello user detail screen</Text>
      <Button onPress={handleSignOut} title="Sign Out"></Button>
    </View>
  );
}
