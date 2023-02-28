import {COLORS} from 'constant/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  completed: number;
};

export default function ProgressBar({completed}: Props): JSX.Element {
  return (
    <View style={styles.conatiner}>
      <View
        style={[
          styles.conatiner,
          {backgroundColor: COLORS.secondary, width: `${completed}%`},
        ]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: COLORS.white,
    height: 16,
    width: '70%',
    borderRadius: 10,
  },
});
