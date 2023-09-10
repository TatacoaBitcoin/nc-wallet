import React from 'react';
import {View, Text, Button} from 'react-native';

import {useMnemonics} from '../hooks/useMnemonics';

const Register = () => {
  const {randomWords, generateWords} = useMnemonics();

  return (
    <View>
      <Text>{randomWords.toString()}</Text>
      <Button onPress={generateWords} title="Refresh" />
    </View>
  );
};

export {Register};
