import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useMnemonics} from '../hooks/useMnemonics';
import {useAccountState} from '../context/account.provider';
import {WordList} from '../molecules';
import {Button, ScreenTemplate} from '../atoms';
import {margin} from '../styles/spacing';

const Register = ({navigation}) => {
  const {t} = useTranslation();
  const {randomWords, generateWords} = useMnemonics();
  const {
    clearSavingError,
    isSavingAccount,
    saveAccount,
    savingAccountError,
  } = useAccountState();

  return (
    <ScreenTemplate clearError={clearSavingError} error={savingAccountError}>
      {randomWords && (
        <ScrollView><WordList list={randomWords.split(' ')} /></ScrollView>
      )}
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => saveAccount(randomWords)}
          text={t('register.btn.continue')}
          variant={isSavingAccount ? "loading" : "primary"}
        />
        <Button
          onPress={generateWords}
          text={t('register.btn.refresh')}
          variant="outline"
        />
      </View>
    </ScreenTemplate>
  );
};

export {Register};

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: margin.md,
    marginBottom: margin.xxl,
  },
});
