import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {parseDate} from '../utils/parsing';

const TxCard = ({data}) => {
  const {paymentType, details, amountMsat, pending, paymentTime, description} =
    data;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon
          name={details.type === 'ln' ? 'lightning-bolt' : 'bitcoin'}
          color="black"
          size={25}
        />
        <View>
          <Text>{description}</Text>
          <Text>{parseDate(paymentTime)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>
          {paymentType === 'received' ? '+' : '-'}
          {amountMsat / 1000} sats
        </Text>
        <Icon
          name={
            pending
              ? 'checkbox-blank-circle-outline'
              : 'checkbox-marked-circle-outline'
          }
          color="black"
          size={15}
        />
      </View>
    </View>
  );
};

export {TxCard};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
