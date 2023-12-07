import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text, Button} from '../atoms';
import {fonts, margin} from '../styles/spacing';
import {useAccountState} from '../context/account.provider';

const ExitModal = ({isVisible, onClose}) => {
  const {t} = useTranslation();
  const {resetAccount} = useAccountState();

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="sm">
      <View style={styles.container}>
        <Icon name="alert-decagram-outline" color={'red'} size={fonts.xxxl} />
        <Text size={fonts.md} align="center">
          Are you sure you want to delete your account? Make sure to save your
          seed words.
        </Text>
        <Button
          text={t('settings.btn.reset')}
          variant="primary"
          onPress={() => resetAccount()}
        />
      </View>
    </Modal>
  );
};

export {ExitModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.xl,
  },
});
