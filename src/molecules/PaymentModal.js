import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';

const PaymentModal = ({isVisible, onClose, message}) => {
  const {t} = useTranslation();

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="xs">
      <View style={styles.container}>
        <Icon name="check-decagram-outline" color={'green'} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          {t('payments.success')}
        </Text>
      </View>
    </Modal>
  );
};

export {PaymentModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.sm,
  },
});
