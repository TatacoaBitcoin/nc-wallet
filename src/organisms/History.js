import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {listPayments} from '@breeztech/react-native-breez-sdk';

const History = () => {
  const [txs, setTxs] = useState([]);
  //   useEffect(() => {
  //     fetchHistory();
  //   }, []);

  const fetchHistory = async () => {
    try {
      const response = await listPayments('all');
      setTxs(response.slice(0, 3));
      console.log(response.slice(0, 3));
    } catch (error) {
      console.log('fetch history error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="History" onPress={fetchHistory} />
      {txs.map(item => (
        <View key={item.id}>
          <Text>PaymentType: {item.paymentType}</Text>
          <Text>Type: {item.details.type}</Text>
          <Text>Amount: {item.amountMsat / 1000} sats</Text>
          <Text>Pending: {item.pending.toString()}</Text>
          <Text>Date: {item.paymentTime}</Text>
        </View>
      ))}
    </View>
  );
};

export {History};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
