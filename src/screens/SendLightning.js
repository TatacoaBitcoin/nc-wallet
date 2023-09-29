import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';

import {ScreenTemplate} from '../atoms';
import {useLoading} from '../hooks/useLoading';

const SendLightning = ({route}) => {
  const {data} = route.params;
  const [isLoading, withLoading] = useLoading();
  const [pending, setPending] = useState(true);

  const payInvoice = () =>
    withLoading(async () => {
      try {
        const response = await sendPayment(data['bolt11']);
        setPending(response.pending);
      } catch (error) {
        console.log('invoice payment error: ', error);
      }
    });

  return (
    <ScreenTemplate>
      {data && (
        <>
          <Text>Amount: {data.amountMsat}mSat</Text>
          <Text>Expiry: {data.expiry}</Text>
          <Text>Timestamp: {data.timestamp}</Text>
          <Button title="Pay Invoice" onPress={payInvoice} />
          {isLoading && <Text>Payment is being processed...</Text>}
          {!pending && <Text>Payment successful</Text>}
        </>
      )}
    </ScreenTemplate>
  );
};

export {SendLightning};
