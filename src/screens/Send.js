import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';

import {ScreenTemplate} from '../atoms';

const Send = ({route}) => {
  const {data} = route.params;
  const [pending, setPending] = useState(true);

  const payInvoice = async () => {
    try {
      const response = await sendPayment(data['bolt11']);
      setPending(response.pending);
    } catch (error) {
      console.log('invoice payment error: ', error);
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
          {!pending && <Text>Payment successful</Text>}
        </>
      )}
    </ScreenTemplate>
  );
};

export {Send};
