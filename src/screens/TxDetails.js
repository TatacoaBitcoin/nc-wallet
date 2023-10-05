import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {parseTime} from '../utils/parsing';

const TxDetails = ({route}) => {
  const {data} = route.params;
  const {
    amountMsat,
    paymentType,
    description,
    details,
    paymentTime,
    feeMsat,
    pending,
  } = data;

  return (
    <View>
      <Text>
        {paymentType === 'received' ? '+' : '-'}
        {amountMsat / 1000}
      </Text>
      <Text>sats</Text>
      <Text>Time: {parseTime(paymentTime)}</Text>
      <Text>Status: {pending ? 'PENDING' : 'PAID'}</Text>
      <Text>
        Type: {details.type === 'ln' ? 'Lightning Network' : 'Bitcoin'}
      </Text>
      <Text>Fee: {feeMsat / 1000} sats</Text>
      <Text>Note: {description}</Text>
      <Text>Invoice: {details.bolt11}</Text>
      <Text>Payment hash: {details.paymentHash}</Text>
    </View>
  );
};

export {TxDetails};

const styles = StyleSheet.create({});
