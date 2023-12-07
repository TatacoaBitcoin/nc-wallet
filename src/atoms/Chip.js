import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '../atoms';
import {margin, fonts, padding} from '../styles/spacing';
import colors from '../styles/colors';

const Chip = ({children, number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chip}>
        <Text variant="primary" size={fonts.md} bold={false}>
          {number}.
        </Text>
        <Text variant="primary" size={fonts.md} bold={true}>
          {children}
        </Text>
      </View>
    </View>
  );
};

export {Chip};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: padding.md,
    paddingVertical: padding.xs,
    borderRadius: margin.lg,
    borderColor: colors.gray,
    alignItems: 'center',
    gap: margin.sm,
  },
});
