import React from 'react';
import {Text, Button} from 'react-native';
import {ScreenTemplate} from '../atoms';
import {useAccountState} from '../context/account.provider';


const Home = () => {
  const {balance} = useAccountState();

  return (
    <ScreenTemplate>
      <Text>Balance</Text>
      <Text>LN: {balance.lightning} msats</Text>
      <Text>BTC: {balance.btc} sats</Text>
      <Button title="Scan QR" onPress={() => navigation.navigate('Scanner')} />
      <Button title="Send" onPress={() => navigation.navigate('Send')} />
      <Button title="Receive" onPress={() => navigation.navigate('Receive')} />
    </ScreenTemplate>
  );
};

export {Home};
