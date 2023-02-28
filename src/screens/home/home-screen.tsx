import {View, StyleSheet} from 'react-native';
import HeaderSection from './header-section';
import WelcomeSection from './welcome-section';
import BodySection from './body-section';
import {COLORS} from 'constant/theme';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <HeaderSection></HeaderSection>
      <WelcomeSection></WelcomeSection>
      <BodySection></BodySection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
  },
});
