import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';

const SuccessModal = ({isVisible, onClose, message}) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} size="xs">
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="check-decagram-outline" color={'green'} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          {message}
        </Text>
      </ScrollView>
    </Modal>
  );
};

export {SuccessModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.sm,
  },
});
