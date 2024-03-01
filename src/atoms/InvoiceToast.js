import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ButtonSmall, Text} from '../atoms';
import colors from '../styles/colors';
import {fonts} from '../styles/spacing';

const InvoiceToast = ({invoice, onUse, onDiscard}) => {
  const {t} = useTranslation();
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWidth = width - 1;
      if (newWidth < 0) {
        onDiscard()
        return
      }
      setWidth(newWidth);
    }, 20);

    return () => clearInterval(interval);
  }, [width]);

  return(
    <>
      <View style={styles.container}>
        <View>
          <Text variant="title" size={fonts.sm}>
            {t('sendln.invoiceFound')}
          </Text>
          <Text variant="primary" size={fonts.md}>
            {invoice.slice(0, 10)}...{invoice.slice(-10)}
          </Text>
        </View>
        <ButtonSmall text={t('sendln.useInvoice')} onPress={onUse} />
      </View>
      <View style={[styles.indicator, {width: `${width}%`}]}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  indicator: {
    backgroundColor: colors.yellow,
    height: 2,
  }
});

export {InvoiceToast};
