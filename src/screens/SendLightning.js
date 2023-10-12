import React, {useState} from 'react';
import {Button} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';

import {ScreenTemplate, Text} from '../atoms';
import {useLoading} from '../hooks/useLoading';
import {fonts} from '../styles/spacing';
import {parseTime, invoiceDuration} from '../utils/parsing';

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
          <Text align="center">Amount</Text>
          <Text variant="title" size={fonts.lg} align="center">
            {data.amountMsat / 1000} sats
          </Text>
          <Text>Note: {data.note ? data.description : 'No description'}</Text>
          <Text>Date: {parseTime(data.timestamp)}</Text>
          <Text>Expiry: {invoiceDuration(data.expiry)}</Text>
          <Button title="Pay Invoice" onPress={payInvoice} />
          {isLoading && <Text>Payment is being processed...</Text>}
          {!pending && <Text>Payment successful</Text>}
        </>
      )}
    </ScreenTemplate>
  );
};

export {SendLightning};
