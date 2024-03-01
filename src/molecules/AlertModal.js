import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';
import {parseSats} from '../utils/parsing';

const AlertModal = ({isVisible, onClose, message}) => {
  const {t} = useTranslation();

  if (message?.includes('should be more than')) {
    const amounts = message?.match(/\d+/g);
    const minFee = parseSats(amounts[0]);

    return (
      <Modal isVisible={isVisible} onClose={onClose} size="xs">
        <ScrollView contentContainerStyle={styles.container}>
          <Icon name="alert-decagram-outline" color={'red'} size={fonts.xxxl} />
          <Text size={fonts.md} align="center">
            {t('errors.minFee', {minFee})}
          </Text>
        </ScrollView>
      </Modal>
    );
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="xs">
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="alert-decagram-outline" color={'red'} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          {t(message)}
        </Text>
      </ScrollView>
    </Modal>
  );
};

export {AlertModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.sm,
  },
});
