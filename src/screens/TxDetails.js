import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {parseSats, parseTime} from '../utils/parsing';
import {ScreenTemplate, Text} from '../atoms';
import {fonts, padding} from '../styles/spacing';

const TxDetails = ({route}) => {
  const {t} = useTranslation();
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
        <View>
          <Text variant="title" size={fonts.xl} align="center">
            {paymentType === 'received' ? '+' : '-'}
            {parseSats(amountMsat)}
          </Text>
          <Text variant="title" align="center" size={fonts.md}>
            sats
          </Text>
        </View>
        <Text>
          {t('history.details.time')}: {parseTime(paymentTime)}
        </Text>
        <Text>
          {t('history.details.status')}: {pending ? 'PENDING' : 'PAID'}
        </Text>
        <Text>
          {t('history.details.type')}:{' '}
          {details.type === 'ln' ? 'Lightning Network' : 'Bitcoin'}
        </Text>
        <Text>
          {t('history.details.fee')}: {parseSats(feeMsat)} sats
        </Text>
        <Text>
          {t('history.details.note')}: {description}
        </Text>
        <Text>
          {t('history.details.invoice')}: {details.data.bolt11}
        </Text>
        <Text>
          {t('history.details.hash')}: {details.data.paymentHash}
        </Text>
      </View>
    </ScreenTemplate>
  );
};

export {TxDetails};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.sm,
    gap: 15,
  },
});
