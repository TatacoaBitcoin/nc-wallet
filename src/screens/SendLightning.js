import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';

import {ScreenTemplate, Text} from '../atoms';
import {useLoading} from '../hooks/useLoading';
import {fonts, margin} from '../styles/spacing';
import {parseTime, invoiceDuration} from '../utils/parsing';

const SendLightning = ({navigation, route}) => {
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
      <View style={styles.container}>
        {data && (
          <>
            <View style={styles.content}>
              <View>
                <Text size={fonts.sm} align="center" variant="secondary">
                  {parseTime(data.timestamp)}
                </Text>
                <Text variant="title2" size={50} align="center">
                  {data.amountMsat / 1000} sats
                </Text>
                <Text size={fonts.md} align="center">
                  {data.note ? data.description : 'No description'}
                </Text>
              </View>
              <Text size={fonts.sm} align="center">
                Expiry: {invoiceDuration(data.expiry)}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Pay Invoice" onPress={payInvoice} />
              <Button title="Cancel" onPress={() => navigation.goBack()} />
              {isLoading && <Text>Payment is being processed...</Text>}
              {!pending && <Text>Payment successful</Text>}
            </View>
          </>
        )}
      </View>
    </ScreenTemplate>
  );
};

export {SendLightning};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
    marginHorizontal: margin.md,
  },
  content: {
    gap: margin.md,
  },
  buttonContainer: {
    gap: margin.md,
  },
});
