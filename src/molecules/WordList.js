import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Chip} from '../atoms';
import {margin} from '../styles/spacing';

const WordList = ({list}) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return <Chip key={index} number={index + 1}>{`${item}`}</Chip>;
      })}
    </View>
  );
};

export {WordList};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: margin.xl,
    marginVertical: margin.xxl,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: margin.md,
    // justifyContent: 'center',
  },
});
