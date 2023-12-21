import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';
import {fiatConversion} from '../utils/parsing';
import {useRate} from '../hooks/useRate';
import {useBreezState} from '../context/breez.provider';
import {usePreferencesState} from '../context/preferences.provider';

const BalanceCard = () => {
  const {balance} = useBreezState();
  const {currency} = usePreferencesState();
  const {rate} = useRate(currency.value);
  const [isFiat, setIsFiat] = useState(false);
  const lnBalance = balance.lightning / 1000;
  const btcBalance = balance.btc / 1000;
  const totalBalance = lnBalance + btcBalance;

  const toggleCurrency = () => setIsFiat(!isFiat);

  const getTotalBalance = () => {
    return isFiat
      ? fiatConversion(totalBalance, rate, currency.decimals)
      : totalBalance.toFixed(0);
  };

  const getLnBalance = () => {
    return isFiat
      ? fiatConversion(lnBalance, rate, currency.decimals)
      : lnBalance.toFixed(0);
  };

  const getBtcBalance = () => {
    return isFiat
      ? fiatConversion(btcBalance, rate, currency.decimals)
      : btcBalance.toFixed(0);
  };

  const getUnit = () => {
    return isFiat ? currency.value : 'sats';
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.totalBalanceContainer} onPress={toggleCurrency}>
        <Icon name="swap-vertical" color={colors.yellow} size={20} />
        <>
          <Text style={styles.totalAmount}>{getTotalBalance()}</Text>
          <Text style={styles.amount}>{getUnit()}</Text>
        </>
      </Pressable>
      <View style={styles.balanceContainer}>
        <Icon name="lightning-bolt-circle" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{`${getLnBalance()} ${getUnit()}`}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Icon name="bitcoin" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{`${getBtcBalance()} ${getUnit()}`}</Text>
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
