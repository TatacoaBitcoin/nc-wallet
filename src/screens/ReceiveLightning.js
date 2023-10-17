import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {receivePayment} from '@breeztech/react-native-breez-sdk';
import QRCode from 'react-native-qrcode-svg';

import {useLoading} from '../hooks/useLoading';
import {ScreenTemplate, Button, Text} from '../atoms';
import {margin, padding, fonts} from '../styles/spacing';
import colors from '../styles/colors';

const ReceiveLightning = ({navigation}) => {
  const [isLoading, withLoading] = useLoading();
  const [invoice, setInvoice] = useState();
  const [amount, setAmount] = useState('');

  const getInvoice = sats => {
    withLoading(async () => {
      try {
        const response = await receivePayment({
          amountSats: sats,
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
        <View style={styles.inputContainer}>
          <Text style={styles.text} align="center">
            Enter amount
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
            sats
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            text="Generate QR Code"
            variant="primary"
            onPress={() => getInvoice(Number(amount))}
            disabled={!amount}
          />
          <Button
            text={'Cancel'}
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
        {isLoading && <Text style={styles.text}>Creating invoice ...</Text>}
        {invoice && (
          <View style={styles.qrContainer}>
            <QRCode value={invoice} size={300} backgroundColor="transparent" />
          </View>
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
  },
});
