import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Chip = ({children}) => {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  );
};

export {Chip};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    marginVertical: 10,
    padding: 5,
  },
});
