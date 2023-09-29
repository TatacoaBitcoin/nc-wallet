import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CircleIconButton = ({onPress, icon}) => (
  <View>
    <Pressable style={styles.circle} onPress={onPress} activeOpacity={0.8}>
      <Icon name={icon} color="green" size={30} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderColor: 'green',
    borderWidth: 1,
  },
});

export {CircleIconButton};
