import React from 'react';
import {StyleSheet, View} from 'react-native';

import {BalanceCard, CircleIconButton, ScreenTemplate} from '../atoms';
import {useAccountState} from '../context/account.provider';
import {History} from '../organisms';

const Home = ({navigation}) => {
  const {balance} = useAccountState();

  return (
    <ScreenTemplate>
      <View style={styles.topContainer}>
        <BalanceCard balance={balance} />
        <View style={styles.buttonsContainer}>
          <CircleIconButton
            icon="arrow-collapse-up"
            onPress={() => navigation.navigate('Scanner')}
          />
          <CircleIconButton
            icon="qrcode-scan"
            onPress={() => navigation.navigate('Scanner')}
          />
          <CircleIconButton
            icon="arrow-collapse-down"
            onPress={() => navigation.navigate('Receive')}
          />
        </View>
      </View>
      <History />
    </ScreenTemplate>
  );
};

export {Home};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'purple',
    paddingTop: 20,
    paddingBottom: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    position: 'relative',
    top: 35,
  },
});
