import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TxCard = ({data}) => {
  const {paymentType, details, amountMsat, pending, paymentTime, description} =
    data;
  return (
    <View style={styles.container}>
      <Icon
        name={details.type === 'ln' ? 'lightning-bolt' : 'bitcoin'}
        color="black"
        size={20}
      />
      <View>
        <Text>{description}</Text>
        <Text>{paymentTime}</Text>
      </View>
      <Text>
        {paymentType === 'received' ? '+' : '-'}
        {amountMsat / 1000} sats
      </Text>
      <Icon
        name={
          pending
            ? 'checkbox-blank-circle-outline'
            : 'checkbox-marked-circle-outline'
        }
        color="black"
        size={20}
      />
    </View>
  );
};

export {TxCard};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
