import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BalanceCard, CircleIconButton, ScreenTemplate} from '../atoms';
import {useAccountState} from '../context/account.provider';
import {History} from '../organisms';
import colors from '../styles/colors';

const Home = ({navigation}) => {
  const {balance} = useAccountState();

  return (
    <ScreenTemplate>
      <LinearGradient
        style={styles.topContainer}
        colors={[colors.purple, colors.black]}
      >
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
      </LinearGradient>
      <History />
    </ScreenTemplate>
  );
};

export {Home};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: colors.purple,
    paddingTop: 20,
    paddingBottom: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: colors.purple,
    borderWidth: 1,
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
