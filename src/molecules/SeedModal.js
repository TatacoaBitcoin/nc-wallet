import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Modal, Text} from '../atoms';
import {fonts, margin} from '../styles/spacing';
import {useAccountState} from '../context/account.provider';
import {WordList} from './WordList';

const SeedModal = ({isVisible, onClose}) => {
  const {t} = useTranslation();
  const {secureRetrieve} = useAccountState();
  const [seed, setSeed] = useState();

  useEffect(() => {
    getMnemonics();
  }, []);

  const getMnemonics = async () => {
    try {
      const response = await secureRetrieve();
      setSeed(response.split(' '));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose} size="md">
      <View style={styles.container}>
        <Icon name="alert-decagram-outline" color={'red'} size={fonts.xxxl} />
        <Text variant="primary" size={fonts.md}>
          Currency
        </Text>
        {seed && <WordList list={seed} />}
      </View>
    </Modal>
  );
};

export {SeedModal};

const styles = StyleSheet.create({
  container: {
    marginTop: margin.md,
    alignItems: 'center',
    gap: margin.md,
  },
});
