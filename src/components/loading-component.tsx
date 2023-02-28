import {COLORS} from 'constant/theme';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingComponent = (): JSX.Element => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingComponent;
