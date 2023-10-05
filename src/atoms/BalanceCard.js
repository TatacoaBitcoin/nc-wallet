import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

const BalanceCard = ({balance}) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalBalanceContainer}>
        <Icon name="swap-vertical" color={colors.yellow} size={20} />
        <Text style={styles.totalAmount}>
          {balance.lightning / 1000 + balance.btc}
        </Text>
        <Text style={styles.amount}>sats</Text>
      </View>
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
