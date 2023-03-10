import React from 'react';
import {COLORS} from 'constant/theme';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {changeOpacityRGBA} from 'helper';
import {ICategory} from 'services/category/category-model';

type Props = {
  key: number;
  data: ICategory;
  onPress: () => void;
};

export default function CategoryCard({data, onPress}: Props) {
  const percent =
    Math.round((data.done / (data.done + data.progress)) * 100) || 0;
  const backgroundCustom = changeOpacityRGBA(data.color, 0.2);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={COLORS.selectedColor}
      style={[styles.container]}>
      <View>
        <AnimatedCircularProgress
          size={40}
          width={4}
          fill={percent}
          tintColor={data.color}
          backgroundColor={COLORS.grey}
          children={() => <Text style={styles.percentText}>{percent}%</Text>}
        />
        <View style={[styles.circle, {backgroundColor: data.color}]}></View>
        <Text style={styles.mainText}>{data.name}</Text>
        <Text style={styles.text}>{data.done + data.progress} tasks</Text>
        <View style={styles.row}>
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: backgroundCustom, marginRight: 10},
            ]}>
            <Text style={[styles.statusText, {color: data.color}]}>
              {data.done} completed
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: 'rgba(235,69,95, 0.2)'},
            ]}>
            <Text style={[styles.statusText, {color: COLORS.primary}]}>
              {data.progress} left
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(211,206,223, 0.3)',
    height: 140,
    width: 140,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
  },
  mainText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
  },
  text: {
    color: COLORS.black,
    fontSize: 14,
  },
  percentText: {
    color: COLORS.black,
    fontSize: 10,
  },
  circle: {
    backgroundColor: COLORS.primary,
    height: 12,
    width: 12,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 6,
  },
  statusContainer: {
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  statusText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
