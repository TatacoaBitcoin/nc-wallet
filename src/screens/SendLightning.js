import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {sendPayment} from '@breeztech/react-native-breez-sdk';
import {useTranslation} from 'react-i18next';

import {ScreenTemplate, Text, Button} from '../atoms';
import {SuccessModal} from '../molecules';
import {useLoading} from '../hooks/useLoading';
import {fonts, margin} from '../styles/spacing';
import {parseTime, invoiceDuration} from '../utils/parsing';
import {fiatConversion} from '../utils/parsing';
import {usePreferencesState} from '../context/preferences.provider';
import {useRate} from '../hooks/useRate';

const SendLightning = ({navigation, route}) => {
  const {t} = useTranslation();
  const {data} = route.params;
  const [isLoading, withLoading] = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState('');
  const isExpired = Date.now() / 1000 - data.timestamp > data.expiry;
  const {currency} = usePreferencesState();
  const {rate} = useRate(currency.value);

  const payInvoice = () =>
    withLoading(async () => {
      try {
        await sendPayment({bolt11: data.bolt11});
        setIsModalVisible(true);
      } catch (err) {
        setError(err);
        console.log('invoice payment error: ', err);
      }
    });

  const onClose = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  return (
    <ScreenTemplate clearError={() => setError('')} error={error}>
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
                <Text
                  style={styles.text}
                  variant={'primary'}
                  size={fonts.md}
                  align="center">
                  ~{' '}
                  {fiatConversion(
                    data.amountMsat / 1000,
                    rate,
                    currency.decimals,
                  )}{' '}
                  {currency.value}
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
              {!isExpired && (
                <Button
                  text={t('sendln.paybtn')}
                  variant={isLoading ? 'loading' : 'primary'}
                  onPress={payInvoice}
                  disabled={isLoading}
                />
              )}
              <Button
                text={t('sendln.cancelbtn')}
                variant="outline"
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </View>
      <SuccessModal
        isVisible={isModalVisible}
        onClose={onClose}
        message={t('sendln.success')}
      />
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
