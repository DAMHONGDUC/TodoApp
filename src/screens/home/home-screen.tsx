import {View, StyleSheet, StatusBar} from 'react-native';
import HeaderSection from './header-section';
import WelcomeSection from './welcome-section';
import BodySection from './body-section';
import {COLORS} from 'constant/theme';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {getAllCategoryAction} from 'redux/slices/category-slice';
import LoadingComponent from 'components/loading-component';

export default function HomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.category);

  useEffect(() => {
    const fetchAllCategory = async () => {
      await dispatch(getAllCategoryAction());
    };

    fetchAllCategory();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="light-content" />
      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <>
          <HeaderSection></HeaderSection>
          <WelcomeSection></WelcomeSection>
          <BodySection></BodySection>
        </>
      )}
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
