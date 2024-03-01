import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import colors from '../styles/colors';
import {padding, fonts} from '../styles/spacing';

const ButtonSmall = ({text, onPress}) => (
  <Pressable
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.8}>
    <Text style={styles.text}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: padding.md,
    backgroundColor: colors.yellow,
    paddingHorizontal: padding.sm,
    paddingVertical: 2,
    borderColor: colors.yellow,
    borderWidth: 1,
  },
  text: {
    fontSize: fonts.sm,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    color: colors.black,
  },
});

export {ButtonSmall};
