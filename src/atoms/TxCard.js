import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {parseDate} from '../utils/parsing';

const TxCard = ({data}) => {
  const navigation = useNavigation();
  const {paymentType, details, amountMsat, pending, paymentTime, description} =
    data;

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Details', {data})}>
      <View style={styles.content}>
        <Icon
          name={details.type === 'ln' ? 'lightning-bolt' : 'bitcoin'}
          color="black"
          size={25}
        />
        <View>
          <Text numberOfLines={1} style={{width: 150}}>
            {description ? description : 'No memo'}
          </Text>
          <Text>{parseDate(paymentTime)}</Text>
        </View>
      </View>
      <View style={styles.content}>
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
          size={15}
        />
      </View>
    </Pressable>
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
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
