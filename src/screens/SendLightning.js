import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';
import {useTranslation} from 'react-i18next';

import {ScreenTemplate, Text, Button} from '../atoms';
import {useLoading} from '../hooks/useLoading';
import {fonts, margin} from '../styles/spacing';
import {parseTime, invoiceDuration} from '../utils/parsing';

const SendLightning = ({navigation, route}) => {
  const {t} = useTranslation();
  const {data} = route.params;
  const [isLoading, withLoading] = useLoading();
  const [pending, setPending] = useState(true);
  const isExpired = Date.now() / 1000 - data.timestamp > data.expiry;

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
                  {data.note ? data.description : t('sendln.nodescription')}
                </Text>
              </View>
              <Text size={fonts.sm} align="center">
                {isExpired
                  ? t('sendln.expired')
                  : `${t('sendln.expiry')}: ${invoiceDuration(data.expiry)}`}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={t('sendln.paybtn')}
                variant="primary"
                onPress={payInvoice}
                disabled={isExpired}
              />
              <Button
                text={t('sendln.cancelbtn')}
                variant="outline"
                onPress={() => navigation.goBack()}
              />
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
    flex: 6,
    marginHorizontal: margin.md,
  },
  content: {
    gap: margin.md,
    flex: 4,
    justifyContent: 'center',
  },
  buttonContainer: {
    gap: margin.md,
    flex: 2,
    justifyContent: 'center',
  },
});
