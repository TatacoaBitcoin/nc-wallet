import React from 'react';
import {View, Text} from 'react-native';

import {Scanner, ScreenTemplate} from '../atoms';

const Send = () => {
  return (
    <ScreenTemplate>
      <Text>Send</Text>
      <Scanner />
    </ScreenTemplate>
  );
};

export {Send};
