import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {listPayments} from '@breeztech/react-native-breez-sdk';

import {TxCard} from '../atoms';

const History = () => {
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await listPayments('all');
      setTxs(response.slice(0, 3));
    } catch (error) {
      console.log('fetch history error', error);
    }
  };

  return (
    <View style={styles.container}>
      {txs.map(item => (
        <TxCard key={item.id} data={item} />
      ))}
    </View>
  );
};

export {History};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
});
