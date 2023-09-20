import React from 'react';
import {View, Text, Button} from 'react-native';

import {useAccountState} from '../context/account.provider';

const Settings = () => {
  const {resetAccount} = useAccountState();

  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => resetAccount()} title="Reset" />
    </View>
  );
};

export {Settings};
