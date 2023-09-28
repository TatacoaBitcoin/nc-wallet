import React from 'react';
import {Text, Button} from 'react-native';

import {ScreenTemplate} from '../atoms';

const Home = ({navigation}) => {
  return (
    <ScreenTemplate>
      <Text>Home</Text>
      <Button title="Scan QR" onPress={() => navigation.navigate('Scanner')} />
      <Button title="Send" onPress={() => navigation.navigate('Send')} />
      <Button title="Receive" onPress={() => navigation.navigate('Receive')} />
    </ScreenTemplate>
  );
};

export {Home};
