import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Button,
  View,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAccountState} from '../context/account.provider';
import {ScreenTemplate} from '../atoms';

const RECOVERY_WORD_COUNT = 2;

const Recovery = () => {
  const {t} = useTranslation();
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

  return (
    <ScreenTemplate>
      <ScrollView>
        {words.map((word, idx) => (
          <View style={styles.inputContainer} key={idx}>
            <Text style={styles.inputLabel}>{idx + 1}.</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange(value, idx)}
              value={word}
              autoCapitalize={'none'}
            />
          </View>
        ))}
        <Button
          title="Recover Account"
          onPress={onContinue}
          disabled={wordsAreComplete()}
        />
      </ScrollView>
    </ScreenTemplate>
  );
};

export {Recovery};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    width: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: '50%',
    paddingBottom: 5,
  },
});
