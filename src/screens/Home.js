import React from 'react';
import {Text} from 'react-native';

import {ScreenTemplate} from '../atoms';
import {useAccountState} from '../context/account.provider';


const Home = () => {
  const {balance} = useAccountState();

  return (
    <ScreenTemplate>
      <Text>Balance</Text>
      <Text>LN: {balance.lightning} msats</Text>
      <Text>BTC: {balance.btc} sats</Text>
    </ScreenTemplate>
  );
};

export {Home};
