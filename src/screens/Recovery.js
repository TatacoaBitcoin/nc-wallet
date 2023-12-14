import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Wordlists} from '@dreson4/react-native-quick-bip39';

import {usePreferencesState} from '../context/preferences.provider';
import {useAccountState} from '../context/account.provider';
import {Button, ScreenTemplate} from '../atoms';
import {margin, padding} from '../styles/spacing';
import colors from '../styles/colors';

const RECOVERY_WORD_COUNT = 12;

const Recovery = () => {
  const {t} = useTranslation();
  const {lang} = usePreferencesState();
  const {saveAccount} = useAccountState();
  const [words, setWords] = useState(Array(RECOVERY_WORD_COUNT).fill(''));

  const handleInputChange = (value, index) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const wordsAreComplete = () => {
    return words.filter(item => item !== '').length < RECOVERY_WORD_COUNT;
  };

  const onContinue = () => {
    const listStr = words.join(' ');
    saveAccount(listStr);
  };

  const isValidWord = word => {
    if (Wordlists[lang].includes(word)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          {words.map((word, idx) => (
            <View
              key={idx}
              style={[
                styles.inputContainer,
                word.length > 3
                  ? isValidWord(word)
                    ? styles.inputContainerValid
                    : styles.inputContainerInvalid
                  : styles.inputContainerEmpty
              ]}
            >
              <Text>{idx + 1}.</Text>
              <TextInput
                style={styles.input}
                onChangeText={value => handleInputChange(value, idx)}
                value={word}
                autoCapitalize={'none'}
              />
            </View>
          ))}
        </ScrollView>
        <Button
          text={t('recovery.btn.recover')}
          onPress={onContinue}
          disabled={wordsAreComplete()}
          // variant={isSavingAccount ? 'loading' : 'primary'}
          variant={'primary'}
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
  scrollView: {
    marginVertical: margin.md,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: margin.md,
    justifyContent: 'space-around'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    paddingHorizontal: padding.md,
    paddingVertical: padding.xs,
    borderRadius: margin.lg,
    alignItems: 'center',
    gap: margin.xs,
  },
  inputContainerEmpty: {
    borderColor: colors.gray,
  },
  inputContainerInvalid: {
    borderColor: 'red',
  },
  inputContainerValid: {
    borderColor: 'green',
  },
  input: {
    width: '80%',
  },
});
