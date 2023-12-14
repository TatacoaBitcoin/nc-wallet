import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import {fiatConversion} from '../utils/parsing';

const BalanceCard = ({balance, rate, currency}) => {
  const [isFiat, setIsFiat] = useState(false);
  const totalBalance = balance.lightning / 1000 + balance.btc;

  const toggleCurrency = () => setIsFiat(!isFiat);

  return (
    <View style={styles.container}>
      <Pressable style={styles.totalBalanceContainer} onPress={toggleCurrency}>
        <Icon name="swap-vertical" color={colors.yellow} size={20} />
        {isFiat ? (
          <>
            <Text style={styles.totalAmount}>
              {fiatConversion(totalBalance, rate, currency.decimals)}
            </Text>
            <Text style={styles.amount}>{currency.value}</Text>
          </>
        ) : (
          <>
            <Text style={styles.totalAmount}>{totalBalance}</Text>
            <Text style={styles.amount}>sats</Text>
          </>
        )}
      </Pressable>
      <View style={styles.balanceContainer}>
        <Icon name="lightning-bolt-circle" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{balance.lightning / 1000} sats</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Icon name="bitcoin" color={colors.yellow} size={20} />
        <Text style={styles.amount}>{balance.btc} sats</Text>
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
