import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as BaseModal} from 'react-native-modal';

import colors from '../styles/colors';
import {fonts, margin, padding} from '../styles/spacing';

const sizes = {
  xs: 0.3,
  sm: 0.5,
  md: 0.8,
  lg: 1,
};

const VARIANTS = {
  primary: {
    backgroundColor: colors.black,
    iconColor: colors.yellow,
  },
};

const Modal = ({
  isVisible,
  onClose,
  children,
  size = 'sm',
  variant = 'primary',
}) => {
  return (
    <BaseModal
      isVisible={isVisible}
      style={{margin: 0, justifyContent: 'flex-end'}}
      backdropColor={colors.gray}>
      <View
        style={[
          styles.container,
          {
            flex: sizes[size],
            backgroundColor: VARIANTS[variant].backgroundColor,
          },
        ]}>
        <View style={styles.closeButton}>
          <Pressable onPress={onClose}>
            <Icon
              name="close"
              color={VARIANTS[variant].iconColor}
              size={fonts.md}
            />
          </Pressable>
        </View>
        <View style={[styles.content, {flex: sizes[size]}]}>{children}</View>
      </View>
    </BaseModal>
  );
};

export {Modal};

const styles = StyleSheet.create({
  container: {
    borderTopStartRadius: padding.md,
    borderTopEndRadius: padding.md,
    padding: padding.md,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  content: {
    marginVertical: margin.sm,
    alignItems: 'center',
    flexGrow: 1,
  },
});
