import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {listPayments} from '@breeztech/react-native-breez-sdk';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {TxCard, Text} from '../atoms';
import {padding} from '../styles/spacing';

const TxsList = ({list}) => {
  const data = list && list.slice(0, 5);
  return data && data.map(item => <TxCard key={item.id} data={item} />);
};

const History = () => {
  const {t} = useTranslation();
  const [txs, setTxs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await listPayments({filter: 'all'});
      setTxs(response);
    } catch (error) {
      console.log('fetch history error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TxsList list={txs} />
      {txs.length > 5 && (
        <Pressable onPress={() => navigation.navigate('List', {data: txs})}>
          <Text variant="title" align="center" size={20} style={styles.button}>
            {t('home.history.full')}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export {History};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: padding.sm,
  },
  button: {
    padding: padding.sm,
  },
});
