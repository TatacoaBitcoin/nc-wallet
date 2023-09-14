import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Chip} from '../atoms';

const WordList = ({list}) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return <Chip key={index}>{`${index + 1}. ${item}`}</Chip>;
      })}
    </View>
  );
};

export {WordList};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 40,
    marginVertical: 20,
  },
});
