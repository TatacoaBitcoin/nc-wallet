import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {parseDate, parseSats} from '../utils/parsing';
import {Text} from './Text';
import colors from '../styles/colors';

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
          color={colors.yellow}
          size={28}
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
          {parseSats(amountMsat)} sats
        </Text>
        <Icon
          name={
            pending
              ? 'checkbox-blank-circle-outline'
              : 'checkbox-marked-circle-outline'
          }
          color={colors.yellow}
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
