import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {Button, ScreenTemplate} from '../atoms';
import {margin, padding} from '../styles/spacing';
import {WordsInput} from '../molecules';

const RECOVERY_WORD_COUNT = 12;

const Recovery = () => {
  const {t} = useTranslation();
  const [words, setWords] = useState(Array(RECOVERY_WORD_COUNT).fill(''));
  const {clearSavingError, isSavingAccount, saveAccount, savingAccountError} =
    useAccountState();

  const wordsAreComplete = () => {
    return words.filter(item => item !== '').length === RECOVERY_WORD_COUNT;
  };

  const onContinue = () => {
    const listStr = words.join(' ');
    saveAccount(listStr);
  };

  const getButtonVariant = () => {
    return !wordsAreComplete()
      ? 'disabled'
      : isSavingAccount
      ? 'loading'
      : 'primary';
  };

  return (
    <ScreenTemplate clearError={clearSavingError} error={savingAccountError}>
      <View style={styles.screenContainer}>
        <WordsInput words={words} setWords={setWords} />
        <Button
          text={t('recovery.btn.recover')}
          onPress={onContinue}
          disabled={!wordsAreComplete()}
          const
          variant={getButtonVariant()}
        />
      </View>
    </ScreenTemplate>
  );
};

export {Recovery};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: padding.md,
    marginBottom: margin.lg,
  },
});
