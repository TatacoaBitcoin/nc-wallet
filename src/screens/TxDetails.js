import React from 'react';
import {StyleSheet, View} from 'react-native';

import {parseTime} from '../utils/parsing';
import {ScreenTemplate, Text} from '../atoms';
import {padding} from '../styles/spacing';

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
    <ScreenTemplate>
      <View style={styles.container}>
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
    </ScreenTemplate>
  );
};

export {TxDetails};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.sm,
  },
});
