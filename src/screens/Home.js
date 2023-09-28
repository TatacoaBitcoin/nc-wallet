import React from 'react';
import {Text, Button} from 'react-native';
import {BalanceCard, ScreenTemplate} from '../atoms';
import {useAccountState} from '../context/account.provider';

const Home = ({navigation}) => {
  const {balance} = useAccountState();

  return (
    <ScreenTemplate>
      <BalanceCard balance={balance} />
      <Button title="Scan QR" onPress={() => navigation.navigate('Scanner')} />
      <Button title="Send" onPress={() => navigation.navigate('Send')} />
      <Button title="Receive" onPress={() => navigation.navigate('Receive')} />
    </ScreenTemplate>
  );
};

export {Home};
