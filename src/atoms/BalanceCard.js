import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';
import {fiatConversion, parseSats} from '../utils/parsing';
import {useRate} from '../hooks/useRate';
import {useBreezState} from '../context/breez.provider';
import {usePreferencesState} from '../context/preferences.provider';

const BalanceCard = () => {
  const {
    balance: {lightning, btc},
  } = useBreezState();
  const {currency} = usePreferencesState();
  const {rate} = useRate(currency.value);
  const [isFiat, setIsFiat] = useState(false);

  const lnSatsBalance = lightning;
  const btcStasBalance = btc;
  const totalStasBalance = lnSatsBalance + btcStasBalance;

  const toggleCurrency = () => setIsFiat(!isFiat);

  const totalBalance = isFiat
    ? fiatConversion(totalStasBalance, rate, currency.decimals)
    : parseSats(totalStasBalance);

  const lnBalance = isFiat
    ? fiatConversion(lnSatsBalance, rate, currency.decimals)
    : parseSats(lnSatsBalance);

  const btcBalance = isFiat
    ? fiatConversion(btcStasBalance, rate, currency.decimals)
    : parseSats(btcStasBalance);

  const unit = isFiat ? currency.value : 'sats';

  return (
    <View style={styles.container}>
      <Pressable style={styles.totalBalanceContainer} onPress={toggleCurrency}>
        <Icon name="swap-vertical" color={colors.yellow} size={20} />
        <>
          <Text style={styles.totalAmount}>{totalBalance}</Text>
          <Text style={styles.amount}>{unit}</Text>
        </>
      </Pressable>
      <View style={styles.balanceContainer}>
        <Icon name="lightning-bolt-circle" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{`${lnBalance} ${unit}`}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Icon name="bitcoin" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{`${btcBalance} ${unit}`}</Text>
      </View>
    </View>
  );
};

export {BalanceCard};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  totalBalanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  totalAmount: {
    fontSize: 50,
    color: 'white',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  amount: {
    fontSize: 20,
    color: 'white',
  },
});
