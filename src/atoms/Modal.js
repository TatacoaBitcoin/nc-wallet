import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as BaseModal} from 'react-native-modal';

import colors from '../styles/colors';
import {fonts, margin, padding} from '../styles/spacing';

const sizes = {
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
  close,
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
          <Pressable onPress={close}>
            <Icon
              name="close"
              color={VARIANTS[variant].iconColor}
              size={fonts.lg}
              style={styles.icon}
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
    marginTop: margin.xxl,
    borderTopStartRadius: padding.md,
    borderTopEndRadius: padding.md,
    padding: padding.lg,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: margin.sm,
  },
});
