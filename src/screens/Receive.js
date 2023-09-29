import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {receivePayment} from '@breeztech/react-native-breez-sdk';

import {useLoading} from '../hooks/useLoading';

const Receive = () => {
  const [isLoading, withLoading] = useLoading();
  const [invoice, setInvoice] = useState();

  const getInvoice = amount => {
    withLoading(async () => {
      try {
        const response = await receivePayment({
          amountSats: amount,
          description: `Invoice for ${amount} sats`,
        });
        setInvoice(response['lnInvoice']['bolt11']);
      } catch (error) {
        console.log('get invoice error: ', error);
      }
    });
  };

  return (
    <View>
      <Text>Enter amount</Text>
      <TextInput />
      <Button title="Generate QR Code" onPress={() => getInvoice(100)} />
    </View>
  );
};

export {Receive};
