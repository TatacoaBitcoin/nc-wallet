import React from 'react';
import {Text, Button} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';

import {ScreenTemplate} from '../atoms';

const Send = ({route}) => {
  const {data} = route.params;

  const payInvoice = async () => {
    try {
      await sendPayment(data);
    } catch (error) {
      console.log('handle payment error: ', error);
    }
  };

  return (
    <ScreenTemplate>
      {data && (
        <>
          <Text>Amount: {data.amountMsat}mSat</Text>
          <Text>Expiry: {data.expiry}</Text>
          <Text>Timestamp: {data.timestamp}</Text>
          <Button title="Pay Invoice" onPress={payInvoice} />
        </>
      )}
    </ScreenTemplate>
  );
};

export {Send};
