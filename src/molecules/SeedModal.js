import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';
import {useAccountState} from '../context/account.provider';

const SeedModal = ({isVisible, onClose}) => {
  const {t} = useTranslation();

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="sm">
      <View style={styles.container}>
        <Icon name="alert-decagram-outline" color={'red'} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          Seed Words
        </Text>
      </View>
    </Modal>
  );
};

export {SeedModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.xl,
  },
});
