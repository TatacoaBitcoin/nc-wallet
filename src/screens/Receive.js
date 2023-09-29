import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {receivePayment} from '@breeztech/react-native-breez-sdk';
import QRCode from 'react-native-qrcode-svg';

import {useLoading} from '../hooks/useLoading';

const Receive = () => {
  const [isLoading, withLoading] = useLoading();
  const [invoice, setInvoice] = useState();
  const [amount, setAmount] = useState('');

  const getInvoice = sats => {
    withLoading(async () => {
      try {
        const response = await receivePayment({
          amountSats: sats,
          description: `Invoice for ${sats} sats`,
        });
        setInvoice(response['lnInvoice']['bolt11']);
      } catch (error) {
        console.log('get invoice error: ', error);
      }
    });
  };

  return (
    <View>
      <Text style={styles.text}>Enter amount</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={'black'}
        inputMode="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button
        title="Generate QR Code"
        onPress={() => getInvoice(Number(amount))}
        disabled={!amount}
      />
      {isLoading && <Text style={styles.text}>Creating invoice ...</Text>}
      {invoice && (
        <QRCode value={invoice} size={250} backgroundColor="transparent" />
      )}
    </View>
  );
};

export {Receive};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  input: {
    color: 'black',
    marginBottom: 20,
  },
});
