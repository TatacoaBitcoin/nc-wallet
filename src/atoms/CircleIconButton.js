import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

const CircleIconButton = ({onPress, icon}) => (
  <View>
    <Pressable style={styles.circle} onPress={onPress} activeOpacity={0.8}>
      <Icon name={icon} color={colors.purple} size={30} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    borderColor: colors.purple,
    borderWidth: 1,
  },
});

export {CircleIconButton};
