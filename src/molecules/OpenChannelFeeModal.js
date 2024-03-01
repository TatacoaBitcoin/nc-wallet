import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openChannelFee} from '@breeztech/react-native-breez-sdk';
import {MaterialIndicator} from 'react-native-indicators';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';
import Colors from '../styles/colors';
import {parseSats} from '../utils/parsing';

const OpenChannelFeeModal = ({isVisible, onClose}) => {
  const [fee, setFee] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getFee = async () => {
    try {
      const response = await openChannelFee({});
      setFee(response.feeParams.minMsat);
    } catch (err) {
      console.log('error fetching channel openning fee', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFee();
  }, []);

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="xs">
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="information" color={Colors.yellow} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          Channel openning fees:
        </Text>
        {isLoading ? (
          <MaterialIndicator color={Colors.purple} size={fonts.lg} />
        ) : (
          <Text size={fonts.md} align="center">
            {parseSats(fee)} sats
          </Text>
        )}
      </ScrollView>
    </Modal>
  );
};

export {OpenChannelFeeModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.sm,
  },
});
