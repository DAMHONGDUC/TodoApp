import {COLORS} from 'constant/theme';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useAppSelector} from 'redux/store';

export default function HeaderSection(): JSX.Element {
  const {userInfo} = useAppSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hey, {userInfo?.firstname ?? ''}</Text>
      <Text style={styles.subtext}>Let's make this day productive</Text>
      <Image
        style={styles.image}
        source={require('assets/default_user.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  mainText: {
    color: COLORS.black,
    fontSize: 30,
    fontWeight: '500',
  },
  subtext: {
    marginTop: 5,
    color: COLORS.title,
  },
  image: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    borderRadius: 25,
  },
});
