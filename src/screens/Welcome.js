import React from 'react';
import {View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export {Welcome};
