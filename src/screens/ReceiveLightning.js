import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Keyboard, Pressable} from 'react-native';
import {receivePayment} from '@breeztech/react-native-breez-sdk';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useLoading} from '../hooks/useLoading';
import {ScreenTemplate, Button, Text} from '../atoms';
import {margin, padding, fonts} from '../styles/spacing';
import colors from '../styles/colors';
import {useTranslation} from 'react-i18next';
import {useRate} from '../hooks/useRate';
import {usePreferencesState} from '../context/preferences.provider';
import {fiatConversion, satsConversion} from '../utils/parsing';
import Colors from '../styles/colors';

const ReceiveLightning = ({navigation}) => {
  const {t} = useTranslation();
  const [isLoading, withLoading] = useLoading();
  const [invoice, setInvoice] = useState();
  const [amount, setAmount] = useState('');
  const {currency} = usePreferencesState();
  const {rate} = useRate(currency.value);
  const [isFiat, setIsFiat] = useState(false);

  const toggleCurrency = () => setIsFiat(!isFiat);

  const copyToClipboard = string => {
    Clipboard.setString(string);
  };

  const getInvoice = async sats => {
    Keyboard.dismiss();
    withLoading(async () => {
      try {
        const response = await receivePayment({
          amountMsat: sats * 1000,
          description: `Invoice for ${sats} sats`,
        });
        setInvoice(response['lnInvoice']['bolt11']);
      } catch (error) {
        console.log('get invoice error: ', error);
      }
    });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {invoice ? (
          <>
            <View style={styles.header}>
              <Text
                style={styles.text}
                variant={'title2'}
                size={50}
                align="center">
                {amount}
              </Text>
              <Text
                style={styles.text}
                variant={'title2'}
                size={fonts.md}
                align="center">
                {isFiat ? currency.value : 'sats'}
              </Text>
              <Text
                style={styles.text}
                variant={'primary'}
                size={fonts.md}
                align="center">
                ~{' '}
                {isFiat
                  ? `${satsConversion(amount, rate)} sats`
                  : `${fiatConversion(amount, rate, currency.decimals)} ${
                      currency.value
                    }`}
              </Text>
            </View>
            <View style={styles.qrContainer}>
              <View style={styles.qrBox}>
                <QRCode value={invoice} size={300} backgroundColor="white" />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button
                text={t('receiveln.copybtn')}
                variant="primary"
                onPress={() => copyToClipboard(invoice)}
              />
              {/* TODO: implement share button */}
              <Button
                text={t('receiveln.sharebtn')}
                variant="outline"
                onPress={() => {}}
              />
            </View>
          </>
        ) : (
          <>
            <Pressable style={styles.inputContainer} onPress={toggleCurrency}>
              <Text style={styles.text} align="center">
                {t('receiveln.header')}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={colors.gray}
                inputMode="numeric"
                value={amount}
                onChangeText={setAmount}
                caretHidden={true}
              />
              <Text
                style={styles.text}
                variant={'title2'}
                size={fonts.md}
                align="center">
                {isFiat ? currency.value : 'sats'}{' '}
                <Icon
                  name="swap-vertical-circle"
                  color={Colors.purple}
                  size={fonts.md}
                />
              </Text>
              <Text
                style={styles.text}
                variant={'primary'}
                size={fonts.md}
                align="center">
                ~{' '}
                {isFiat
                  ? `${satsConversion(amount, rate)} sats`
                  : `${fiatConversion(amount, rate, currency.decimals)} ${
                      currency.value
                    }`}
              </Text>
            </Pressable>
            <View style={styles.btnContainer}>
              <Button
                text={t('receiveln.generatebtn')}
                variant={isLoading ? 'loading' : 'primary'}
                onPress={() =>
                  getInvoice(
                    isFiat
                      ? Number(satsConversion(amount, rate))
                      : Number(amount),
                  )
                }
                disabled={isLoading || !amount}
              />
              <Button
                text={t('receiveln.cancelbtn')}
                variant="outline"
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </View>
    </ScreenTemplate>
  );
};

export {ReceiveLightning};

const styles = StyleSheet.create({
  container: {
    padding: padding.md,
    flex: 5,
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  btnContainer: {
    gap: margin.md,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: 'black',
  },
  input: {
    color: colors.purple,
    fontFamily: 'Inter-SemiBold',
    fontSize: 50,
    textAlign: 'center',
    padding: 0,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 4,
    justifyContent: 'center',
  },
  qrBox: {
    backgroundColor: 'white',
    padding: padding.md,
    borderRadius: padding.md,
  },
  header: {
    flex: 1,
  },
});
