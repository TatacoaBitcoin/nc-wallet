import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {TxCard, ScreenTemplate} from '../atoms';

const TxList = ({route}) => {
  const {data} = route.params;

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => <TxCard data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </ScreenTemplate>
  );
};

export {TxList};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
