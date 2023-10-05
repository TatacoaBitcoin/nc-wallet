import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {TxCard} from '../atoms';

const TxList = ({route}) => {
  const {data} = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <TxCard data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export {TxList};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
