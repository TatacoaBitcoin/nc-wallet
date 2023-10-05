import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {listPayments} from '@breeztech/react-native-breez-sdk';
import {useNavigation} from '@react-navigation/native';

import {TxCard, Text} from '../atoms';

const TxsList = ({list}) => {
  const data = list && list.slice(0, 5);
  return data && data.map(item => <TxCard key={item.id} data={item} />);
};

const History = () => {
  const [txs, setTxs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await listPayments('all');
      setTxs(response);
    } catch (error) {
      console.log('fetch history error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TxsList list={txs} />
      {txs.length > 5 && (
        <Text
          variant="title"
          align="center"
          style={styles.button}
          onPress={() => navigation.navigate('List', {data: txs})}>
          See full history
        </Text>
      )}
    </View>
  );
};

export {History};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
  },
});
