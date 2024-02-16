import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {useBreezState} from '../context/breez.provider';
import {TxCard, Text} from '../atoms';
import {padding} from '../styles/spacing';

const TxsList = ({list}) => {
  const data = list && list.slice(0, 5);
  return data && data.map(item => <TxCard key={item.id} data={item} />);
};

const History = () => {
  const {t} = useTranslation();
  const {payments} = useBreezState();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TxsList list={payments} />
      {payments.length > 5 && (
        <Pressable
          onPress={() => navigation.navigate('List', {data: payments})}>
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
