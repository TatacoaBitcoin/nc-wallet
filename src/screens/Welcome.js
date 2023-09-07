import React from 'react';
import {View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Recovery"
        onPress={() => navigation.navigate('Recovery')}
      />
    </View>
  );
};

export {Welcome};
