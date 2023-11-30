import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

import colors from '../styles/colors';
import {padding, fonts} from '../styles/spacing';

const VARIANTS = {
  primary: {
    backgroundColor: colors.yellow,
    color: colors.black,
    paddingHorizontal: padding.xxl,
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.yellow,
    paddingHorizontal: padding.xxl,
    borderColor: colors.yellow,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  loading: {
    backgroundColor: colors.yellow,
    color: colors.black,
    paddingHorizontal: padding.xxl,
  },
  disabled: {
    backgroundColor: colors.gray,
    color: colors.blue,
    paddingHorizontal: padding.xxl,
  },
};

const Button = ({text, onPress, variant, disabled = false, icon}) => (
  <Pressable
    style={[
      styles.button,
      {
        backgroundColor: VARIANTS[variant].backgroundColor,
        borderColor: VARIANTS[variant].borderColor,
        borderWidth: VARIANTS[variant].borderWidth,
        borderStyle: VARIANTS[variant].borderStyle,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}>
    <Text
      style={[
        styles.buttonText,
        {
          color: VARIANTS[variant].color,
          paddingHorizontal: VARIANTS[variant].paddingHorizontal,
          textDecorationLine: VARIANTS[variant].textDecorationLine,
          fontWeight: VARIANTS[variant].fontWeight,
        },
      ]}>
      {variant === 'loading' ? (
        <MaterialIndicator color={colors.purple} size={fonts.lg} />
      ) : (
        text
      )}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: padding.sm,
    borderRadius: padding.md,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: fonts.sm,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});

export {Button};
