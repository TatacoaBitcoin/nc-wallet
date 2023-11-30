import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text} from '../atoms';
import colors from '../styles/colors';
import {fonts, margin, padding} from '../styles/spacing';

const AlertModal = ({isVisible, onClose, message}) => {
  const {t} = useTranslation();

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="xs">
      <View style={styles.container}>
        <Icon
          name="alert-decagram-outline"
          color={"red"}
          size={fonts.xxxl}
        />
        <Text size={fonts.md} align="center">{t(message)}</Text>
      </View>
    </Modal>
  );
};

export {AlertModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.sm,
  }
});
